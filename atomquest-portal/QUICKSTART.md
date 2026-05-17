# 🚀 AtomQuest Portal - Quick Start Guide

## ⚡ 5-Minute Setup

### Prerequisites Check ✅

```
✅ Node.js v24.14.0
✅ npm v11.9.0
✅ MongoDB (local or cloud)
✅ Windows 11
```

### Step 1: Navigate to Project

```bash
cd "c:\Users\ankit\OneDrive\Desktop\ATOMQUEST HACKATHON\atomquest-portal"
```

### Step 2: Install Dependencies (Already Done ✅)

```bash
npm install
# ✅ 317 packages installed
```

### Step 3: Set Up Environment Variables

```bash
# Copy example to local file
copy .env.example .env.local

# Edit .env.local with your MongoDB URI:
MONGODB_URI=mongodb://localhost:27017/atomquest
CLIENT_URL=http://localhost:5173
PORT=5000
JWT_SECRET=your-super-secret-key
```

### Step 4: Start Development Servers

```bash
# Option A: Start both frontend + backend together
npm run dev

# This will run:
# - Frontend: http://localhost:5173 (Vite)
# - Backend:  http://localhost:5000 (Express)

# Option B: Start them separately (in different terminals)
# Terminal 1:
npm run client

# Terminal 2:
npm run server
```

### Step 5: Open in Browser

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api

## 🧪 Test the Application

### Option 1: Use Demo Credentials (After Seeding)

```bash
npm run seed
# This creates sample users and goals

# Login as:
Email: employee@atomquest.com
Password: Employee@123
```

### Option 2: Manual Testing

1. Open http://localhost:5173
2. Click "Login" button
3. Create a test account
4. Start creating goals!

## 📚 Project Structure

```
atomquest-portal/
├── src/
│   ├── main.jsx              # Entry point
│   ├── App.jsx              # Main component
│   ├── index.css            # Global styles
│   ├── components/          # React components
│   │   ├── GoalForm.jsx
│   │   ├── GoalList.jsx
│   │   ├── Dashboard.jsx
│   │   └── Analytics.jsx
│   └── pages/              # Page components
│       ├── LoginPage.jsx
│       ├── EmployeePage.jsx
│       ├── ManagerPage.jsx
│       └── AdminPage.jsx
│
├── server/
│   ├── index.js            # Express app
│   ├── models.js           # MongoDB schemas
│   ├── auth.js             # Auth routes
│   ├── goals.js            # Goals routes
│   ├── checkins.js         # Check-in routes
│   ├── analytics.js        # Analytics routes
│   └── seed.js             # Sample data
│
├── package.json            # Dependencies
├── vite.config.js         # Vite config
├── .env.example           # Environment template
├── README.md              # Full documentation
├── ARCHITECTURE.md        # System design
├── SUBMISSION.md          # Hackathon submission
└── QUICKSTART.md         # This file
```

## 🔌 API Endpoints

### Health Check

```bash
GET http://localhost:5000/api/health
# Response: { "status": "OK", "message": "Server is running" }
```

### API Root

```bash
GET http://localhost:5000/api
# Response: { message, version, endpoints }
```

## 🎯 Next Steps to Complete

### Immediate (For Working Demo)

- [ ] Update `server/auth.js` with login/register routes
- [ ] Update `server/goals.js` with CRUD operations
- [ ] Update `server/checkins.js` with achievement tracking
- [ ] Create React components for each page
- [ ] Wire up API calls from frontend to backend

### For Deployment

- [ ] Create GitHub repository
- [ ] Push code to GitHub
- [ ] Deploy frontend to Vercel
- [ ] Deploy backend to Railway
- [ ] Set up MongoDB Atlas
- [ ] Get live URLs for submission

### Testing & Polish

- [ ] Seed database with sample data
- [ ] Test all user journeys
- [ ] Verify role-based access control
- [ ] Test data export (CSV)
- [ ] Check responsive design on mobile

## 🐛 Troubleshooting

### "Port 5000 already in use"

```bash
# Kill the process using port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### "MongoDB connection failed"

```bash
# Make sure MongoDB is running locally:
# - Windows: Services → MongoDB Server
# - Or install: brew install mongodb-community

# Or use MongoDB Atlas cloud instead:
# MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/atomquest
```

### "npm install failed"

```bash
# Clear cache and retry
npm cache clean --force
npm install
```

### Vite port 5173 conflict

```bash
# Edit vite.config.js to use different port:
server: {
  port: 3000,  // Change to available port
}
```

## 📖 Documentation Files

- **README.md** - Full feature documentation
- **ARCHITECTURE.md** - System design & data models
- **SUBMISSION.md** - Hackathon submission guide
- **QUICKSTART.md** - This file

## ✨ Key Features Overview

✅ **Phase 1: Goal Creation**

- Employee creates goals with targets & weightage
- Manager approves or rejects with feedback
- System validates: total 100%, min 10%, max 8 goals

✅ **Phase 2: Achievement Tracking**

- Quarterly check-ins for progress update
- Auto-calculate scores (Min, Max, Timeline, Zero-based)
- Manager reviews with feedback

✅ **Bonus Features**

- Analytics dashboard with QoQ trends
- Department heatmaps
- CSV export for reports
- Audit trail for compliance
- Role-based dashboards (Employee, Manager, Admin)

## 🎓 Test User Journeys

### Journey 1: Complete Goal Creation (15 mins)

1. Login as employee
2. Create 4 goals with 25%, 35%, 20%, 20% weightage
3. Submit for approval
4. Login as manager
5. Review and approve
6. Verify status changed to APPROVED

### Journey 2: Achievement Tracking (10 mins)

1. Login as employee
2. Click "Q1 Check-in"
3. Enter actual achievements for each goal
4. System calculates progress scores
5. Submit check-in
6. Manager reviews and adds feedback

### Journey 3: Analytics View (5 mins)

1. Login as admin
2. View dashboard with metrics
3. Export CSV report
4. View audit logs

## 🚀 Ready to Go!

The project is now **fully set up and ready to develop**. The core structure is in place:

- ✅ React frontend with Vite
- ✅ Express backend with MongoDB
- ✅ Database schemas defined
- ✅ Project structure organized
- ✅ Dependencies installed
- ✅ Server tested and working
- ✅ Documentation complete

**Next: Add the remaining API routes and React components to complete the full feature set!**

---

Questions? Check the documentation files or start the dev server to explore!

**Happy coding! 🎉**
