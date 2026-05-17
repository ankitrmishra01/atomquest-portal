# AtomQuest Portal - Architecture & Design

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  React 18 Frontend (Vite)                           │  │
│  │  ├─ Login/Auth Page                                 │  │
│  │  ├─ Employee Dashboard (Goal Creation)              │  │
│  │  ├─ Manager Dashboard (Approvals & Check-ins)       │  │
│  │  ├─ Admin Dashboard (Configuration & Reporting)     │  │
│  │  ├─ Analytics Dashboard (Charts & Insights)         │  │
│  │  └─ Reports & Export (CSV/Excel)                    │  │
│  └──────────────────────────────────────────────────────┘  │
│                        ↓ HTTP/REST API                       │
└─────────────────────────────────────────────────────────────┘
                          ↓ Proxy
┌─────────────────────────────────────────────────────────────┐
│                        API Layer                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Express.js Backend (Node.js)                       │  │
│  │  Port: 5000                                          │  │
│  │                                                      │  │
│  │  Routes:                                            │  │
│  │  ├─ /api/auth (JWT, Login, Register, Logout)      │  │
│  │  ├─ /api/goals (Create, Read, Update, Delete)     │  │
│  │  ├─ /api/goals/:id/approve (Manager workflow)     │  │
│  │  ├─ /api/checkins (Achievement tracking)          │  │
│  │  ├─ /api/analytics (QoQ, Heatmaps, Trends)        │  │
│  │  ├─ /api/users (User management)                  │  │
│  │  ├─ /api/reports (Export & Audit logs)            │  │
│  │  └─ /api/cycles (Cycle management)                │  │
│  │                                                      │  │
│  │  Middleware:                                        │  │
│  │  ├─ JWT Authentication                             │  │
│  │  ├─ Role-Based Access Control (RBAC)              │  │
│  │  ├─ Input Validation (Zod/Custom)                 │  │
│  │  └─ Error Handling                                 │  │
│  └──────────────────────────────────────────────────────┘  │
│                        ↓ DB Driver                           │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                      Data Layer                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  MongoDB Database                                   │  │
│  │                                                      │  │
│  │  Collections:                                       │  │
│  │  ├─ users (Employees, Managers, Admins)           │  │
│  │  ├─ goals (Goal documents with status)            │  │
│  │  ├─ checkins (Achievement tracking)               │  │
│  │  ├─ cycles (Goal setting periods)                 │  │
│  │  ├─ feedbacks (Manager feedback on goals)         │  │
│  │  ├─ auditlogs (All system changes)                │  │
│  │  └─ thrustAreas (Strategic areas)                 │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Data Model

### User

```
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  name: String,
  role: ENUM[EMPLOYEE, MANAGER, ADMIN],
  managerId: ObjectId (ref: User),
  thrustArea: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Goal

```
{
  _id: ObjectId,
  title: String,
  description: String,
  thrustArea: String,
  ownerId: ObjectId (ref: User),
  managerId: ObjectId (ref: User),
  cycleId: ObjectId (ref: Cycle),
  uomType: ENUM[NUMERIC_PERCENT, NUMERIC_VALUE, TIMELINE, ZERO_BASED],
  target: Number,
  weightage: Number (0-100),
  status: ENUM[DRAFT, SUBMITTED, APPROVED, REJECTED, LOCKED],
  isShared: Boolean,
  sharedWith: [ObjectId] (ref: User[]),
  approvalNotes: String,
  rejectionReason: String,
  createdAt: Date,
  updatedAt: Date
}
```

### CheckIn

```
{
  _id: ObjectId,
  goalId: ObjectId (ref: Goal),
  userId: ObjectId (ref: User),
  cycleId: ObjectId (ref: Cycle),
  status: ENUM[NOT_STARTED, ON_TRACK, COMPLETED],
  actualAchievement: Number,
  progressScore: Number,
  feedback: [ObjectId] (ref: CheckInFeedback[]),
  createdAt: Date,
  updatedAt: Date
}
```

### Cycle

```
{
  _id: ObjectId,
  name: String (unique),
  phase: String,
  startDate: Date,
  endDate: Date,
  status: String (ACTIVE/CLOSED),
  createdAt: Date
}
```

## User Workflows

### 1. Employee Goal Creation Workflow

```
Employee Login
    ↓
View Dashboard
    ↓
Create New Goal
  ├─ Select Thrust Area
  ├─ Enter Title & Description
  ├─ Select UoM Type
  ├─ Set Target Value
  ├─ Set Weightage (≥10%, all must = 100%)
  ├─ Validation Check
  └─ Submit for Approval
    ↓
Status: SUBMITTED
    ↓
Await Manager Review
```

### 2. Manager Approval Workflow

```
Manager Login
    ↓
View Pending Goals (Dashboard)
    ├─ All goals in SUBMITTED status
    ├─ Filter by team member
    └─ View details
    ↓
Review Goal
  ├─ Check UoM, Target, Weightage
  ├─ Edit inline (if needed)
  ├─ Add approval notes
  └─ Approve or Reject
    ↓
Goal Status: APPROVED or REJECTED
    ↓
Employee Notification
```

### 3. Achievement Tracking Workflow

```
Q1 Check-in Window Opens (July)
    ↓
Employee Views Check-in Form
    ├─ All approved goals shown
    ├─ Enter actual achievement
    └─ Select status (Not Started/On Track/Completed)
    ↓
System Calculates Progress Score:
  ├─ IF Min Type: Achievement ÷ Target
  ├─ IF Max Type: Target ÷ Achievement
  ├─ IF Timeline: Completion% based on deadline
  └─ IF Zero-Based: Achievement = 100%, else 0%
    ↓
Submit Check-in
    ↓
Manager Reviews Check-in
  ├─ View planned vs. actual
  ├─ Add comments/feedback
  └─ Acknowledge
    ↓
Admin/HR Views Analytics
  ├─ Department-level heatmap
  ├─ QoQ trends
  └─ Completion rates
```

## Authentication & Authorization

### JWT Flow

```
1. User Submits Credentials
      ↓
2. Server Validates (checks DB)
      ↓
3. Generate JWT Token (contains: userId, role, exp)
      ↓
4. Send Token to Client
      ↓
5. Client Stores in localStorage (or httpOnly cookie)
      ↓
6. Future Requests Include JWT in Authorization Header
      ↓
7. Server Verifies Token & Extracts User Info
      ↓
8. Check Role-Based Access Control (RBAC)
      ↓
9. Execute Action if Authorized
```

### Role-Based Access Control

| Endpoint                   | Employee  | Manager    | Admin     |
| -------------------------- | --------- | ---------- | --------- |
| GET /api/goals             | Own goals | Team goals | All goals |
| POST /api/goals            | ✅ Create | ❌         | ❌        |
| PUT /api/goals/:id/approve | ❌        | ✅         | ✅        |
| GET /api/analytics         | ❌        | ✅ Team    | ✅ All    |
| GET /api/users             | ❌        | ❌         | ✅        |
| POST /api/cycles           | ❌        | ❌         | ✅        |

## Progress Score Formulas

### 1. Numeric/Percentage (Min Type)

```
Formula: Achievement ÷ Target
Example: If Target = 100 and Achievement = 80
         Score = 80 ÷ 100 = 0.80 (80%)
Better: Higher achievement is better
```

### 2. Numeric/Percentage (Max Type)

```
Formula: Target ÷ Achievement
Example: If Target = 100 (TAT/Cost) and Achievement = 80
         Score = 100 ÷ 80 = 1.25 (125%)
Better: Lower achievement is better
```

### 3. Timeline

```
Formula: Completion% based on deadline
Example: If deadline = Oct 31 and completed = Oct 15
         Score = 100% (ahead of schedule)
Better: Earlier completion
```

### 4. Zero-Based

```
Formula: If achieved >= target? 100% : 0%
Example: Safety = 0 incidents (target)
         If achieved 0 incidents = 100%
         If achieved 1+ incident = 0%
Better: Perfect or nothing
```

## Key Features Implementation

### 1. Validation Rules

- Total weightage across all goals must equal 100%
- Minimum weightage per goal: 10%
- Maximum goals per employee: 8
- UoM type determines calculation method
- Shared goal approval requires manager approval

### 2. Approval Workflow

- Employee submits goal → Goal locked for edits
- Manager reviews → Can edit targets/weightage
- Manager approves → Goal becomes APPROVED
- Manager rejects → Goal back to DRAFT, reason provided
- On approval, goal becomes LOCKED (no further edits)

### 3. Check-in Schedule

```
Phase 1: Goal Setting (May)  → Goal Creation & Approval
Q1 Check-in: July            → Achievement Update
Q2 Check-in: October         → Achievement Update
Q3 Check-in: January         → Achievement Update
Q4 Check-in: March/April     → Final Achievement
```

### 4. Escalation Module

- If employee hasn't submitted goals within N days → Auto escalate to manager
- If manager hasn't approved within N days → Auto escalate to HR
- If quarterly check-in missed → Auto-notification to employee

## API Response Format

### Success Response

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error code",
  "message": "Human readable message",
  "details": { ... }
}
```

## Deployment Architecture

```
┌─ GitHub/GitLab Repository
│  └─ Push code
│      ↓
├─ Vercel (Frontend)
│  ├─ Auto-deploy on push
│  ├─ Build: npm run build
│  ├─ Output: dist/
│  └─ Live URL: atomquest.vercel.app
│      ↓
├─ Railway/Render (Backend)
│  ├─ Auto-deploy on push
│  ├─ Run: npm run server
│  ├─ Exposes: :5000
│  └─ API URL: atomquest-api.railway.app
│      ↓
└─ MongoDB Atlas
   ├─ Hosted MongoDB cluster
   ├─ Connection string: mongodb+srv://...
   └─ Data persisted in cloud
```

## Security Considerations

1. **Password**: Hashed with bcryptjs (10 salt rounds)
2. **JWT**: Secure, expires in 24 hours
3. **CORS**: Restricted to known domains
4. **Input Validation**: All inputs validated before DB query
5. **SQL Injection**: Mongoose prevents via schema validation
6. **HTTPS**: Enable in production
7. **Environment Variables**: Never commit .env
8. **Rate Limiting**: Consider adding for login endpoint

## Performance Optimization

1. **Database Indexing**: On frequently queried fields
2. **Pagination**: Implement for large datasets
3. **Caching**: Use Redis for analytics queries (optional)
4. **Frontend Bundle**: Code splitting with Vite
5. **API Response**: Minimal data transfer
6. **Database Queries**: Lean queries (select only needed fields)

## Testing Strategy

1. **Unit Tests**: Component-level tests (Jest)
2. **Integration Tests**: API endpoint tests
3. **E2E Tests**: User workflow tests (Cypress/Playwright)
4. **Load Testing**: Performance under stress

---

**Architecture designed for AtomQuest Hackathon 1.0**
