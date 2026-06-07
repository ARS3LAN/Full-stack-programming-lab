# HLApp Project Walkthrough & Verification Report

This report summarizes the implementation and validation of the **Full-Stack Healthcare Lifecycle App (HLApp)** project, completed in accordance with the Air University Final Term Project requirements.

---

## Technical Accomplishments

We implemented a full-stack, decoupled architecture separated into:
1. **[Express Backend](file:///home/ars3lan/Documents/Uni-Work/6th-Semester/FSD/Lab/Full-stack-programming-lab/Final_Term_Project_HLApp_/backend)**:
   - Configured schemas for [Users](file:///home/ars3lan/Documents/Uni-Work/6th-Semester/FSD/Lab/Full-stack-programming-lab/Final_Term_Project_HLApp_/backend/models/User.js), [Doctors](file:///home/ars3lan/Documents/Uni-Work/6th-Semester/FSD/Lab/Full-stack-programming-lab/Final_Term_Project_HLApp_/backend/models/Doctor.js), [Patients](file:///home/ars3lan/Documents/Uni-Work/6th-Semester/FSD/Lab/Full-stack-programming-lab/Final_Term_Project_HLApp_/backend/models/Patient.js), [Appointments](file:///home/ars3lan/Documents/Uni-Work/6th-Semester/FSD/Lab/Full-stack-programming-lab/Final_Term_Project_HLApp_/backend/models/Appointment.js), [Treatments](file:///home/ars3lan/Documents/Uni-Work/6th-Semester/FSD/Lab/Full-stack-programming-lab/Final_Term_Project_HLApp_/backend/models/Treatment.js), [Prescriptions](file:///home/ars3lan/Documents/Uni-Work/6th-Semester/FSD/Lab/Full-stack-programming-lab/Final_Term_Project_HLApp_/backend/models/Prescription.js), and [Notifications](file:///home/ars3lan/Documents/Uni-Work/6th-Semester/FSD/Lab/Full-stack-programming-lab/Final_Term_Project_HLApp_/backend/models/Notification.js).
   - Designed JWT-based secure authentication routes in [auth.js](file:///home/ars3lan/Documents/Uni-Work/6th-Semester/FSD/Lab/Full-stack-programming-lab/Final_Term_Project_HLApp_/backend/routes/auth.js).
   - Restricted endpoint access utilizing role checking middleware [role.js](file:///home/ars3lan/Documents/Uni-Work/6th-Semester/FSD/Lab/Full-stack-programming-lab/Final_Term_Project_HLApp_/backend/middleware/role.js).
   - Populated the database with **15 Doctor records and 15 Patient records** using [seeder.js](file:///home/ars3lan/Documents/Uni-Work/6th-Semester/FSD/Lab/Full-stack-programming-lab/Final_Term_Project_HLApp_/backend/seeder.js) to meet assignment data constraints.
2. **[Next.js Frontend Client](file:///home/ars3lan/Documents/Uni-Work/6th-Semester/FSD/Lab/Full-stack-programming-lab/Final_Term_Project_HLApp_/frontend)**:
   - Formulated a premium light-themed design system using CSS variables in [globals.css](file:///home/ars3lan/Documents/Uni-Work/6th-Semester/FSD/Lab/Full-stack-programming-lab/Final_Term_Project_HLApp_/frontend/src/app/globals.css) featuring Outfit typography and hover transition overlays.
   - Built a secure routing structure and Auth context manager in [AuthContext.js](file:///home/ars3lan/Documents/Uni-Work/6th-Semester/FSD/Lab/Full-stack-programming-lab/Final_Term_Project_HLApp_/frontend/src/context/AuthContext.js).
   - Designed responsive dashboards:
     - **[Admin Dashboard](file:///home/ars3lan/Documents/Uni-Work/6th-Semester/FSD/Lab/Full-stack-programming-lab/Final_Term_Project_HLApp_/frontend/src/app/admin/page.js)**: Doctor and Patient directories with full CRUD (create, read, edit, delete forms) and appointment approvals.
     - **[Doctor Dashboard](file:///home/ars3lan/Documents/Uni-Work/6th-Semester/FSD/Lab/Full-stack-programming-lab/Final_Term_Project_HLApp_/frontend/src/app/doctor/page.js)**: Schedule slots, vitals logging (height, weight, pulse, blood pressure), and digital prescriptions creator.
     - **[Patient Dashboard](file:///home/ars3lan/Documents/Uni-Work/6th-Semester/FSD/Lab/Full-stack-programming-lab/Final_Term_Project_HLApp_/frontend/src/app/patient/page.js)**: Appointment booking wizard, clinical care logs tracker, medication cabinet, and a real-time notification simulation hud.

---

## How to Run the Project

Ensure you have a local instance of MongoDB running on port `27017` with a database named `HLApp`.

### 1. Run the Backend Server
Navigate to the `backend` folder, install dependencies (if not already done), and launch:
```bash
cd backend
npm install
npm run seed  # Seeds exactly 15 doctors and 15 patients
npm start     # Runs backend on http://localhost:5000
```

### 2. Run the Next.js Frontend
Navigate to the `frontend` folder, install dependencies, and launch:
```bash
cd frontend
npm install
npm run dev   # Runs frontend on http://localhost:3000
```

---

## Test Accounts & Credentials

Use the following pre-seeded logins for verification:

| Role | Email Login | Password | Notes |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@hlapp.com` | `admin123` | Can perform Doctor/Patient CRUD & assign doctors |
| **Doctor** | `doctor1@hlapp.com` | `doctor123` | Dr. Ahmad Khan (Cardiologist) |
| **Doctor** | `doctor2@hlapp.com` | `doctor123` | Dr. Fatima Khan (Neurologist) |
| **Patient** | `patient1@hlapp.com` | `patient123` | Raza Qureshi (Age: 32, Blood: O+) |
| **Patient** | `patient2@hlapp.com` | `patient123` | Amna Qureshi (Age: 45, Blood: A+) |

---

## Verified Workflows

Here is how we verified each of the project requirements:

### I. Authentication System
- **Registration**: Registering a new patient via `/register` successfully adds a User credential AND creates a linked `Patient` profile in MongoDB with age, blood group, address, and phone numbers.
- **Role-based dashboard protection**: Accessing `/admin` while logged in as a patient redirects the page immediately to `/patient`. Requests from unauthenticated clients return a clean `401 Unauthorized` API payload.

### II. Doctor & Patient Management CRUD
- **Seeding validation**: Running the seeder creates exactly **15 doctor records** (doctor1 to doctor15) and **15 patient records** (patient1 to patient15) with valid attributes.
- **Admin CRUD**: Logged in as `admin@hlapp.com`, we successfully added a new doctor (Bilal), edited details for a patient (Raza), and deleted records with automated database deletions for credentials.

### III. Appointment & Treatment Cycles
- **Booking**: A patient books an appointment selecting a doctor and date. This shows as "pending" under `/appointments`.
- **Approval & Assignment**: The Admin approves the slot and assigns the doctor.
- **Continuous Treatment**: Approving the slot automatically creates a `Treatment` cycle in MongoDB.
- **Vitals Logger**: Logged in as the assigned doctor, we appended checkup records (BP, pulse, height, weight, comments) which immediately sync and display inside the patient's Clinical Care Logs tab.

### IV. Prescriptions
- Logged in as `doctor2@hlapp.com`, we wrote a prescription (Panadol 500mg, Amlodipine 5mg) and clicked "Issue Prescription".
- Logged in as patient `patient2@hlapp.com`, the digital medications cabinet loaded the medicines, dosages, and intake frequencies correctly.

### V. Simulated Notifications (Email & Mobile)
- Whenever a checkup is saved, a notification is posted to the patient.
- In the Patient Dashboard, there is a **Simulated Alert Smartphone HUD** that allows manually simulating and triggering pill timers. Clicking "Trigger Mobile Alert" instantly sounds a toast and pushes an alert notification to the header bell drawer.
