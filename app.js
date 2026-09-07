// ⚙️ SUPABASE SETUP করো:
// ▶️ Step 1: https://app.supabase.com/ এ যাও
// ▶️ Step 2: "New Project" এ ক্লিক করো
// ▶️ Step 3: Project Settings > API থেকে এই দুইটি copy করো:
//
//    🔴 1️⃣ PROJECT URL (নিচের মতো দেখাবে):
//       https://xxxxxxxxxxxx.supabase.co
//       এটি "YOUR_SUPABASE_URL" -এর জায়গায় পেস্ট করো
//
//    🔴 2️⃣ ANON PUBLIC KEY (বড় একটি string যা eyJhb... দিয়ে শুরু হয়):
//       eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
//       এটি "YOUR_SUPABASE_ANON_KEY" -এর জায়গায় পেস্ট করো
//
// ▶️ Step 4: supabase.sql ফাইলের সব SQL run করো SQL Editor-এ
// ▶️ Step 5: নিচে YOUR_SUPABASE_URL এবং YOUR_SUPABASE_ANON_KEY replace করো

const SUPABASE_URL = "YOUR_SUPABASE_URL"; // 👈 এখানে project URL বসাও
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY"; // 👈 এখানে anon key বসাও

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
let me = null, selected = null;

const $ = id => document.getElementById(id);

// User refresh করো
async function refresh() {
  const { data } = await sb.auth.getUser();
  me = data.user;
  $('auth').hidden = !!me;
  $('chat').hidden = !me;
  $('logout').hidden = !me;
  if (me) loadUsers();
}

// Sign up
$('signup').onclick = async () => {
  const email = $('email').value.trim();
  const password = $('password').value.trim();
  if (!email || !password) {
    $('authMsg').textContent = 'Email এবং Password দুটোই দাও!';
    return;
  }
  const { error } = await sb.auth.signUp({ email, password });
  $('authMsg').textContent = error ? '❌ ' + error.message : '✅ Account তৈরি হয়েছে! Email verify করতে হতে পারে।';
  if (!error) {
    $('email').value = '';
    $('password').value = '';
  }
};

// Login
$('login').onclick = async () => {
  const email = $('email').value.trim();
  const password = $('password').value.trim();
  if (!email || !password) {
    $('authMsg').textContent = 'Email এবং Password দুটোই দাও!';
    return;
  }
  const { error } = await sb.auth.signInWithPassword({ email, password });
  if (error) {
    $('authMsg').textContent = '❌ ' + error.message;
  } else {
    $('authMsg').textContent = '';
    $('email').value = '';
    $('password').value = '';
    refresh();
  }
};

// Logout
$('logout').onclick = async () => {
  await sb.auth.signOut();
  refresh();
};

// Load users list
async function loadUsers() {
  const { data, error } = await sb.from('profiles').select('id,email').neq('id', me.id);
  if (error) {
    $('users').textContent = '❌ ' + error.message;
    return;
  }
  const searchVal = $('search').value.toLowerCase();
  const filtered = data.filter(x => !searchVal || x.email.toLowerCase().includes(searchVal));
  $('users').innerHTML = '';
  filtered.forEach(u => {
    const d = document.createElement('div');
    d.className = 'user' + (selected && selected.id === u.id ? ' active' : '');
    d.textContent = u.email;
    d.onclick = () => selectUser(u);
    $('users').appendChild(d);
  });
}

// Search input
$('search').oninput = loadUsers;

// Select user
async function selectUser(u) {
  selected = u;
  $('current').textContent = u.email;
  loadUsers();
  await loadMessages();
}

// Load messages
async function loadMessages() {
  if (!selected) return;
  const { data, error } = await sb.from('messages')
    .select('*')
    .or(`and(sender_id.eq.${me.id},receiver_id.eq.${selected.id}),and(sender_id.eq.${selected.id},receiver_id.eq.${me.id})`)
    .order('created_at');
  
  if (error) {
    $('messages').textContent = '❌ ' + error.message;
    return;
  }
  
  $('messages').innerHTML = '';
  data.forEach(m => {
    const d = document.createElement('div');
    d.className = 'msg ' + (m.sender_id === me.id ? 'mine' : '');
    d.textContent = m.body;
    $('messages').appendChild(d);
  });
  $('messages').scrollTop = $('messages').scrollHeight;
}

// Send message
$('sendForm').onsubmit = async e => {
  e.preventDefault();
  const body = $('message').value.trim();
  if (!body || !selected) return;
  
  const { error } = await sb.from('messages')
    .insert({ sender_id: me.id, receiver_id: selected.id, body });
  
  if (error) {
    alert('❌ Message পাঠাতে পারেনি: ' + error.message);
  } else {
    $('message').value = '';
    loadMessages();
  }
};

// Real-time auth state change
sb.auth.onAuthStateChange(() => setTimeout(refresh, 0));

// Initial load
refresh();