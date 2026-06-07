require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Doctor = require('./models/Doctor');
const Patient = require('./models/Patient');
const Appointment = require('./models/Appointment');
const Treatment = require('./models/Treatment');
const Prescription = require('./models/Prescription');
const Notification = require('./models/Notification');

const specializations = [
  'Cardiologist', 'Neurologist', 'Pediatrician', 'Dermatologist', 
  'Orthopedic Surgeon', 'General Physician', 'Psychiatrist', 'Ophthalmologist',
  'Oncologist', 'Gastroenterologist', 'Endocrinologist', 'Pulmonologist',
  'Nephrologist', 'Gynecologist', 'ENT Specialist'
];

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const genders = ['Male', 'Female'];

const seedData = async () => {
  try {
    // Connect to DB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/HLApp');
    console.log('Database connected for seeding...');

    // Clear existing collections
    await User.deleteMany();
    await Doctor.deleteMany();
    await Patient.deleteMany();
    await Appointment.deleteMany();
    await Treatment.deleteMany();
    await Prescription.deleteMany();
    await Notification.deleteMany();
    console.log('Database cleared.');

    // 1. Create Admin
    const adminUser = await User.create({
      name: 'System Admin',
      email: 'admin@hlapp.com',
      password: 'admin123',
      role: 'admin'
    });
    console.log('Admin account created (email: admin@hlapp.com, pass: admin123)');

    // 2. Create 15 Doctors
    const doctorsCreated = [];
    for (let i = 1; i <= 15; i++) {
      const docUser = await User.create({
        name: `Dr. ${['Ahmad', 'Fatima', 'Zainab', 'Bilal', 'Sara', 'Hamza', 'Ayesha', 'Mustafa', 'Mariam', 'Usman', 'Khadija', 'Ali', 'Zoya', 'Yahya', 'Sana'][i-1]} Khan`,
        email: `doctor${i}@hlapp.com`,
        password: `doctor123`,
        role: 'doctor'
      });

      const doctor = await Doctor.create({
        user: docUser._id,
        specialization: specializations[i-1],
        experience: Math.floor(Math.random() * 20) + 3, // 3 to 22 years
        phone: `0300-12345${i.toString().padStart(2, '0')}`,
        availability: ['Monday', 'Wednesday', 'Friday'],
        rating: parseFloat((4.0 + Math.random() * 1.0).toFixed(1))
      });

      doctorsCreated.push(doctor);
    }
    console.log('15 Doctor accounts created (doctor1@hlapp.com to doctor15@hlapp.com, pass: doctor123)');

    // 3. Create 15 Patients
    const patientsCreated = [];
    const medicalIssues = ['Hypertension', 'Type 2 Diabetes', 'Mild Asthma', 'Allergic Rhinitis', 'Migraine', 'None', 'None', 'GERD'];
    for (let i = 1; i <= 15; i++) {
      const patUser = await User.create({
        name: `${['Raza', 'Amna', 'Tariq', 'Hira', 'Zahid', 'Nida', 'Kamran', 'Kiran', 'Sajid', 'Maria', 'Fahad', 'Laiba', 'Waqas', 'Fareeha', 'Adnan'][i-1]} Qureshi`,
        email: `patient${i}@hlapp.com`,
        password: `patient123`,
        role: 'patient'
      });

      const issue = medicalIssues[Math.floor(Math.random() * medicalIssues.length)];
      const medicalHistory = issue !== 'None' ? [issue] : [];

      const patient = await Patient.create({
        user: patUser._id,
        age: Math.floor(Math.random() * 50) + 18, // 18 to 67 years
        gender: genders[Math.floor(Math.random() * genders.length)],
        bloodType: bloodTypes[Math.floor(Math.random() * bloodTypes.length)],
        phone: `0321-76543${i.toString().padStart(2, '0')}`,
        address: `House #${10 + i}, Street ${Math.floor(Math.random() * 10) + 1}, Islamabad`,
        medicalHistory,
        assignedDoctor: doctorsCreated[i % 15]._id // Assign a doctor
      });

      // Update Patient reference back in Doctor's assigned patient profiles (conceptually represented in listings)
      patientsCreated.push(patient);
    }
    console.log('15 Patient accounts created (patient1@hlapp.com to patient15@hlapp.com, pass: patient123)');

    // 4. Create some active appointments and treatment records for first couple of patients
    // Let's seed 3 appointments: 1 pending, 2 confirmed (which initializes 2 treatments and 1 prescription)
    
    // Patient 1 with Doctor 1 (index 0)
    const appt1 = await Appointment.create({
      patient: patientsCreated[0]._id,
      doctor: doctorsCreated[0]._id,
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days later
      timeSlot: '10:00 AM',
      status: 'pending',
      symptoms: 'Experiencing regular chest pressure and shortness of breath during light workouts.',
      comments: ''
    });

    // Patient 2 with Doctor 2 (index 1) - Confirmed, has Treatment and Prescription
    const appt2 = await Appointment.create({
      patient: patientsCreated[1]._id,
      doctor: doctorsCreated[1]._id,
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      timeSlot: '11:30 AM',
      status: 'confirmed',
      symptoms: 'Severe headache, fatigue, and occasional blurred vision.',
      comments: 'Appointment confirmed. Please arrive 10 mins early for vitals check.'
    });

    // Create Treatment for appt2
    const treatment2 = await Treatment.create({
      patient: patientsCreated[1]._id,
      doctor: doctorsCreated[1]._id,
      appointment: appt2._id,
      status: 'active',
      diagnosis: 'Neurological examination and fatigue surveillance',
      checkups: [
        {
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          weight: 72,
          height: 176,
          bloodPressure: '135/90',
          pulse: 82,
          notes: 'Patient showed moderate elevation in blood pressure. Advised rest and hydration.'
        }
      ],
      followUps: [
        {
          date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
          status: 'scheduled',
          notes: 'Checkup for blood pressure trends and medication response.'
        }
      ]
    });

    // Create Prescription for treatment2
    await Prescription.create({
      patient: patientsCreated[1]._id,
      doctor: doctorsCreated[1]._id,
      treatment: treatment2._id,
      appointment: appt2._id,
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      medications: [
        {
          name: 'Panadol Extra',
          dosage: '500mg',
          frequency: 'Twice daily (as needed)',
          duration: '5 days'
        },
        {
          name: 'Amlodipine',
          dosage: '5mg',
          frequency: 'Once daily (morning)',
          duration: '30 days'
        }
      ],
      instructions: 'Take Amlodipine after breakfast. Maintain a low sodium diet.'
    });

    // Seed mock notifications for patients to make things lively
    await Notification.create({
      user: patientsCreated[0].user,
      title: 'Appointment Pending',
      message: 'Your appointment request with Dr. Ahmad Khan is pending administrative approval.',
      type: 'appointment'
    });

    await Notification.create({
      user: patientsCreated[1].user,
      title: 'Prescription Added',
      message: 'Dr. Fatima Khan has added a prescription for your hypertension symptoms.',
      type: 'system'
    });

    await Notification.create({
      user: patientsCreated[1].user,
      title: 'Medication Alert: Amlodipine',
      message: 'Medication Reminder: Take Amlodipine (5mg) - Once daily (morning).',
      type: 'medication',
      mobileAlertSent: true
    });

    console.log('Seeder finished successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedData();
