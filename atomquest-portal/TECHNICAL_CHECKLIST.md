# ✅ ATOMQUEST HACKATHON - TECHNICAL CHECKLIST

## PHASE 1: Foundation (COMPLETE ✅)

### System Setup

- ✅ Node.js v24.14.0 verified
- ✅ npm v11.9.0 verified
- ✅ Windows 11 environment verified
- ✅ Git initialized
- ✅ Project directory created

### Frontend Setup

- ✅ React 18.3.1 installed
- ✅ Vite 5.1.0 configured
- ✅ Tailwind CSS 3.4.1 ready
- ✅ Entry point (main.jsx) created
- ✅ App component created
- ✅ Global styles (index.css) configured
- ✅ vite.config.js optimized
- ✅ index.html configured
- ✅ Component directories ready

### Backend Setup

- ✅ Express.js 4.18.2 installed
- ✅ MongoDB/Mongoose 8.2.0 ready
- ✅ Server (index.js) created and verified working
- ✅ Port 5000 configured
- ✅ CORS enabled
- ✅ Error handling middleware ready
- ✅ Health check endpoint working

### Database Setup

- ✅ MongoDB connection configured
- ✅ 6 Mongoose schemas created:
  - ✅ User (with RBAC roles)
  - ✅ Goal (with full lifecycle)
  - ✅ CheckIn (achievement tracking)
  - ✅ Cycle (quarterly periods)
  - ✅ AuditLog (compliance)
  - ✅ ThrustArea (strategic areas)

### Dependencies

- ✅ 317 packages installed
- ✅ All core packages verified:
  - react, react-dom, react-router-dom
  - express, cors, dotenv
  - mongoose, bcryptjs, jsonwebtoken
  - recharts, lucide-react, date-fns

### Configuration

- ✅ .env.example template created
- ✅ .env.local ready for local config
- ✅ .gitignore configured
- ✅ package.json with all scripts
- ✅ vite.config.js optimized

### Documentation

- ✅ README.md (comprehensive)
- ✅ START_HERE.md (entry point)
- ✅ QUICKSTART.md (5-minute setup)
- ✅ ARCHITECTURE.md (system design)
- ✅ SUBMISSION.md (hackathon guide)
- ✅ PROJECT_SUMMARY.md (overview)

---

## PHASE 2: Backend API (TODO - 3-4 HOURS)

### Authentication Routes (server/auth.js)

- [ ] POST /api/auth/register
  - Accept: email, password, name
  - Hash password with bcryptjs
  - Create user in DB
  - Return JWT token
  - Validate: email unique, password strong

- [ ] POST /api/auth/login
  - Accept: email, password
  - Find user by email
  - Compare password with bcryptjs
  - Return JWT token
  - Error: Invalid credentials

- [ ] POST /api/auth/logout
  - Accept: JWT token
  - Invalidate token (or just client-side)
  - Return success

- [ ] GET /api/auth/me
  - Require: JWT token (middleware)
  - Return: Current user details
  - Verify token valid and not expired

### Goals Routes (server/goals.js)

- [ ] GET /api/goals
  - Filter by user role:
    - Employee: own goals only
    - Manager: team goals
    - Admin: all goals
  - Add pagination
  - Add sorting/filtering

- [ ] POST /api/goals
  - Require: JWT token (employee)
  - Accept: title, description, thrustArea, uomType, target, weightage
  - Validate: weightage 10-100, total = 100%, max 8 per employee
  - Create goal in DB
  - Status: DRAFT

- [ ] PUT /api/goals/:id
  - Require: JWT token (owner or manager)
  - Accept: title, description, target, weightage
  - Validate same as create
  - Only editable if status != LOCKED
  - Update in DB

- [ ] DELETE /api/goals/:id
  - Require: JWT token (owner or manager)
  - Only deletable if status = DRAFT
  - Delete from DB

- [ ] POST /api/goals/:id/approve
  - Require: JWT token (manager)
  - Accept: approvalNotes (optional), can edit targets
  - Update status: SUBMITTED → APPROVED
  - Lock goal
  - Notify employee

- [ ] POST /api/goals/:id/reject
  - Require: JWT token (manager)
  - Accept: rejectionReason
  - Update status: SUBMITTED → REJECTED
  - Return to DRAFT for resubmission
  - Notify employee

### Check-in Routes (server/checkins.js)

- [ ] GET /api/checkins
  - Filter by user and cycle
  - Include goal details
  - Include progress scores
  - Add pagination

- [ ] POST /api/checkins
  - Require: JWT token (employee)
  - Accept: goalId, cycleId, status, actualAchievement
  - Calculate progressScore based on formula:
    - Min (Numeric/%): achievement ÷ target
    - Max (Numeric/%): target ÷ achievement
    - Timeline: date-based completion %
    - Zero-based: 100% if target met, else 0%
  - Create in DB
  - Calculate weighted average

- [ ] PUT /api/checkins/:id
  - Require: JWT token (employee)
  - Accept: status, actualAchievement
  - Recalculate progressScore
  - Update in DB
  - Update weighted average

- [ ] POST /api/checkins/:id/feedback
  - Require: JWT token (manager)
  - Accept: comment
  - Add manager feedback
  - Notify employee

### Analytics Routes (server/analytics.js)

- [ ] GET /api/analytics/dashboard
  - Total goals
  - Approval rate
  - Average achievement
  - Completion rate
  - Department breakdown

- [ ] GET /api/analytics/qoq
  - Quarter-on-quarter trends
  - Achievement comparison
  - Improvement percentage
  - Department trends

- [ ] GET /api/analytics/heatmap
  - Department × UoM matrix
  - Color coding (red/yellow/green)
  - Average scores per department
  - By thrust area

- [ ] GET /api/analytics/export
  - Generate CSV with:
    - Employee, Goal, Target, Actual, Score, Status
  - Return CSV file
  - Or JSON for frontend to handle

### Middleware

- [ ] Auth middleware (server/middleware/auth.js)
  - Verify JWT token
  - Extract user from token
  - Check role authorization
  - Return 401/403 errors

- [ ] Validation middleware
  - Input validation
  - Error message formatting
  - 400 bad request responses

### Error Handling

- [ ] Global error handler
  - Catch all errors
  - Format error responses
  - Log errors
  - Return appropriate status codes

---

## PHASE 3: React Components (TODO - 2-3 HOURS)

### Authentication Components

- [ ] LoginPage.jsx
  - Email & password inputs
  - Validation
  - Call /api/auth/login
  - Store JWT token
  - Redirect to dashboard

- [ ] RegisterPage.jsx
  - Email, name, password inputs
  - Password confirmation
  - Role selection
  - Call /api/auth/register
  - Redirect to login

### Goal Management Components

- [ ] GoalForm.jsx
  - Multi-step form
  - Step 1: Thrust Area, Title, Description
  - Step 2: UoM type, Target, Weightage
  - Step 3: Review & Submit
  - Validation feedback
  - Submit to /api/goals

- [ ] GoalList.jsx
  - Display all goals
  - Table or card view
  - Filter by status
  - Sort by deadline
  - Edit/delete actions (if owner)
  - Link to details

- [ ] GoalDetail.jsx
  - Full goal details
  - Edit form (if allowed)
  - Manager approval panel (if manager)
  - Check-in history
  - Audit log

### Manager Components

- [ ] ManagerDashboard.jsx
  - Pending approvals card
  - Team performance overview
  - Check-ins to review
  - Direct links to actions

- [ ] ApprovalPanel.jsx
  - Goal details
  - Edit targets/weightage inline
  - Add approval notes
  - Approve/Reject buttons
  - Notification sent

- [ ] CheckInReview.jsx
  - Employee name and goals
  - Actual achievements
  - Progress scores
  - Add comments
  - Mark as reviewed

### Employee Components

- [ ] EmployeeDashboard.jsx
  - Personal goals overview
  - Achievement status
  - Pending approvals
  - Next check-in date
  - Performance score

- [ ] CheckInForm.jsx
  - List approved goals
  - Input actual achievement per goal
  - Select status
  - System calculates progress score
  - Show calculation
  - Submit

### Admin Components

- [ ] AdminDashboard.jsx
  - Organization metrics
  - Department overview
  - User management
  - Cycle management
  - Audit logs

- [ ] AnalyticsDashboard.jsx
  - Dashboard metrics
  - QoQ trend charts (Recharts)
  - Department heatmap
  - Distribution analysis

- [ ] ReportExport.jsx
  - Export CSV button
  - Export PDF button
  - Date range selection
  - Field selection
  - Download

### Shared Components

- [ ] Header.jsx
  - Logo
  - Navigation
  - User profile dropdown
  - Logout button

- [ ] Sidebar.jsx (optional)
  - Navigation menu
  - Collapsible
  - Active link highlighting

- [ ] LoadingSpinner.jsx
  - Show during API calls
  - Centered on page

- [ ] ErrorBoundary.jsx
  - Catch errors
  - Show error message
  - Retry option

- [ ] SuccessNotification.jsx
  - Toast notification
  - Auto-dismiss
  - Success icon

---

## PHASE 4: Integration (TODO - 1-2 HOURS)

### Frontend-Backend Connection

- [ ] Set API base URL
  - Use environment variable
  - Handle CORS if needed

- [ ] Implement API calls
  - Login/Register with backend
  - Fetch goals from backend
  - Create/update/delete goals
  - Submit check-ins
  - Fetch analytics data

- [ ] Error handling
  - Network errors
  - 401 unauthorized
  - 403 forbidden
  - Validation errors
  - Server errors

- [ ] Token management
  - Store JWT in localStorage or cookies
  - Include in API headers
  - Refresh if expired
  - Clear on logout

### State Management

- [ ] User state
  - Current user
  - JWT token
  - Role

- [ ] Goals state
  - List of goals
  - Selected goal
  - Goal filter/sort

- [ ] UI state
  - Loading states
  - Error messages
  - Success messages
  - Modal visibility

### Testing

- [ ] Manual testing
  - Login flow
  - Goal creation
  - Manager approval
  - Check-in submission
  - Analytics view

---

## PHASE 5: Styling & Polish (TODO - 1-2 HOURS)

### Tailwind CSS Classes

- [ ] Add utility classes to all components
- [ ] Responsive design (mobile-first)
- [ ] Color scheme (blues, greens, grays)
- [ ] Spacing and typography
- [ ] Buttons and forms

### UX Enhancements

- [ ] Loading spinners
- [ ] Success messages
- [ ] Error messages
- [ ] Confirmation dialogs
- [ ] Empty states
- [ ] Animations/transitions

### Accessibility

- [ ] ARIA labels
- [ ] Keyboard navigation
- [ ] Color contrast
- [ ] Alt text for images

---

## PHASE 6: Testing (TODO - 1-2 HOURS)

### User Journey Testing

- [ ] Employee creates goals
- [ ] Manager approves goals
- [ ] Employee logs achievements
- [ ] Manager reviews check-ins
- [ ] Admin views analytics

### Edge Cases

- [ ] Invalid weightage
- [ ] Duplicate goals
- [ ] Missing required fields
- [ ] Expired tokens
- [ ] Concurrent updates

### Performance

- [ ] Page load time < 2s
- [ ] API response < 500ms
- [ ] No unnecessary re-renders

---

## PHASE 7: Deployment (TODO - 1-2 HOURS)

### GitHub Setup

- [ ] Create GitHub repository
- [ ] Push code with meaningful commits
- [ ] Add README to repo
- [ ] Add .gitignore

### Frontend Deployment (Vercel)

- [ ] Connect GitHub repo to Vercel
- [ ] Configure build: `npm run build`
- [ ] Configure output: `dist/`
- [ ] Deploy
- [ ] Get live URL (e.g., atomquest.vercel.app)

### Backend Deployment (Railway)

- [ ] Create Railway project
- [ ] Connect GitHub repo
- [ ] Add environment variables
- [ ] Deploy
- [ ] Get live API URL (e.g., atomquest-api.railway.app)

### Database (MongoDB Atlas)

- [ ] Create free cluster
- [ ] Create database user
- [ ] Copy connection string
- [ ] Add to Railway environment variables

### Live Testing

- [ ] Test frontend on live URL
- [ ] Test API on live URL
- [ ] Test complete user journeys
- [ ] Verify database connectivity

---

## PHASE 8: Submission (TODO - 1 HOUR)

### Documentation

- [ ] README complete
- [ ] Architecture diagram
- [ ] Setup instructions
- [ ] API documentation
- [ ] Demo user credentials

### Submission Package

- [ ] Live demo URL
- [ ] Source code repository
- [ ] Architecture diagram
- [ ] Login credentials (demo accounts)
- [ ] Brief description

### Hackathon Submission

- [ ] Open Unstop platform
- [ ] Fill out submission form
- [ ] Add all required links
- [ ] Upload any files
- [ ] Submit before deadline

---

## SUMMARY

**Total Tasks: 60+**
**Completed: 20+ (Foundation)**
**Remaining: 40+ (Implementation)**

**Estimated Time Remaining: 8-10 hours**
**Submission Deadline: 18 May 2026, 08:00 AM IST**

**Status: ON TRACK ✅**

---

**Good luck! You've got this! 🚀**
