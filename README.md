# MyChat - WhatsApp Style Real-Time Messaging App

## 🚀 Quick Setup Guide

### 🔴 STEP 1: Supabase Project তৈরি করো
1. https://app.supabase.com/ এ যাও
2. **New Project** বাটনে ক্লিক করো
3. Project name দাও, একটি password সেট করো, Region নির্বাচন করো
4. Project তৈরি হওয়ার জন্য অপেক্ষা করো (1-2 মিনিট)

### 🔴 STEP 2: API Keys copy করো
1. Supabase Dashboard-এ **Settings** > **API** খোলো
2. এখানে দুটি জিনিস খুঁজে বের করো:
   - **Project URL** (নিচের মতো দেখাবে): `https://xxxxxxxxxxxx.supabase.co`
   - **Anon Public Key** (বড় string যা `eyJhb...` দিয়ে শুরু হয়)
3. এই দুটি copy করো (নিচের Step 4-এ লাগবে)

### 🔴 STEP 3: Database Setup করো
1. Supabase Dashboard-এ **SQL Editor** খোলো
2. `supabase.sql` ফাইলের সম্পূর্ণ SQL copy করো
3. SQL Editor-এ paste করো এবং **RUN** করো
4. কোনো error না এলে tables তৈরি হয়ে গেছে

### 🔴 STEP 4: app.js Update করো
1. `app.js` ফাইল খোলো
2. Line 15 এবং 16-এ:
   - `YOUR_SUPABASE_URL` -এর জায়গায় Step 2-এর **Project URL** পেস্ট করো
   - `YOUR_SUPABASE_ANON_KEY` -এর জায়গায় Step 2-এর **Anon Public Key** পেস্ট করো

**Example:**
```javascript
const SUPABASE_URL = "https://abcdef123456.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
```

### 🔴 STEP 5: Test করো
1. `index.html` ব্রাউজারে খোলো (যদি local server না থাকে, তাহলে ফাইল সরাসরি খুলতে পারো)
2. **Sign up** করে একটি account তৈরি করো (example: test1@gmail.com)
3. দ্বিতীয় ব্রাউজার tab-এ আবার `index.html` খোলো
4. অন্য একটি account দিয়ে Sign up করো (example: test2@gmail.com)
5. প্রথম account-এ Login করো
6. Users list-এ দ্বিতীয় account দেখা যাবে
7. সেটি ক্লিক করে message পাঠাও

## 📱 Features

✅ Email/Password Authentication  
✅ Real-time One-to-One Messaging  
✅ User Search & Discovery  
✅ Message History  
✅ Mobile Responsive Design (PC + Android)  
✅ Row-Level Security (শুধু নিজের messages দেখা যায়)  

## 🌐 Deploy করো (Free)

### Option 1: Vercel (সবচেয়ে সহজ)
1. GitHub-এ এই repo push করো
2. https://vercel.com/ এ যাও
3. "Import Project" ক্লিক করো এবং repo select করো
4. Deploy হয়ে যাবে, একটি live URL পাবে

### Option 2: Netlify
1. GitHub-এ repo push করো
2. https://netlify.com/ এ যাও
3. "Connect to Git" ক্লিক করো এবং repo select করো
4. Auto-deploy হবে

### Option 3: GitHub Pages (খুবই সহজ)
1. GitHub repo settings-এ **Pages** খোলো
2. Source হিসেবে `main` branch select করো
3. Save করো - বস.ai শেষ!

## 🎨 UI/UX Details

- **WhatsApp-style design**: Green theme, message bubbles
- **Mobile responsive**: Automatically adjusts for phones
- **Bengali UI**: সব text বাংলায়
- **Real-time updates**: Message instantly পাঠানো হয়
- **User search**: Email দিয়ে users খুঁজে বের করো

## 🔧 Troubleshooting

### Problem: "Cannot read property 'createClient'" 
**Solution**: `@supabase/supabase-js` CDN properly load হয়েছে কিনা check করো. index.html-এ script tag আছে কিনা দেখো.

### Problem: "Project URL or Key invalid"
**Solution**: app.js-এ সঠিক URL এবং Key paste করেছো কিনা check করো. Copy করার সময় space বা extra character আছে কিনা দেখো.

### Problem: "Profiles table doesn't exist"
**Solution**: supabase.sql-এর SQL সঠিকভাবে run করেছো কিনা check করো. SQL Editor-এ কোনো error message আছে কিনা দেখো.

### Problem: "Cannot send message"
**Solution**: 
- Receiver account verify করেছো কিনা check করো (Supabase-এ email verification হতে পারে)
- Receiver account এ Login করেছো কিনা check করো
- Database RLS policies সঠিকভাবে set আছে কিনা check করো

### Problem: "Users list blank"
**Solution**: Authenticated users database-এ save হয়েছে কিনা check করো. দুটি ভিন্ন browser tab-এ দুটি ভিন্ন account দিয়ে login করেছো কিনা দেখো.

## 🚀 Future Features (চাইলে add করতে পারো)

- Typing indicators (যখন কেউ type করছে)
- Online/Offline status
- Image/File sharing
- Group chats
- Message reactions (emoji)
- Read receipts (double tick)
- Push notifications
- Dark mode
- Voice/Video calls

## 🔐 Security Notes

✅ সব messages Supabase-এ encrypted রাখা হয়  
✅ Row-Level Security দিয়ে protect করা  
✅ Users শুধু নিজেদের messages দেখতে পায়  
✅ Production-এ `.env` file ব্যবহার করে API keys hide করো  

## 📞 Support

কোনো সমস্যা হলে GitHub Issues-এ জানিয়ে দাও!
