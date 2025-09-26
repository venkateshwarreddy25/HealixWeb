const express = require('express');
const app = express();
const path = require('path');
const Doctor = require('./data/doc');
const mongoose = require('mongoose');
const Port=process.env.PORT ||8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/images', express.static('images'));
require('dotenv').config();



app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'DViews'));

// mongoose.connect('mongodb://localhost:27017/doctorclinic');
mongoose.connect(process.env.MONGODB_URI);
const db=mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});


function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}


const doctors = [
  'Smith', 'Johnson', 'Lee', 'Patel', 'Garcia',
  'Brown', 'Martinez', 'Davis', 'Clark', 'Rodriguez',
  'Miller', 'Lopez', 'Gonzalez', 'Taylor', 'Anderson',
  'Thomas', 'Jackson', 'White', 'Harris', 'Lewis',
  'Walker', 'Young', 'Allen', 'King', 'Wright',
  'Scott', 'Green', 'Baker', 'Adams', 'Nelson',
  'Hill', 'Campbell', 'Mitchell', 'Carter', 'Roberts',
  'Phillips', 'Evans', 'Turner', 'Torres', 'Parker',
  'Collins', 'Edwards', 'Stewart', 'Sanchez', 'Morris',
  'Rogers', 'Reed', 'Cook', 'Morgan', 'Bell'
];

const patients = [
  'Alice', 'Bob', 'Charlie', 'David', 'Eva',
  'Frank', 'Grace', 'Hannah', 'Isaac', 'Julia',
  'Kevin', 'Lily', 'Mike', 'Nora', 'Oliver',
  'Paul', 'Quinn', 'Rachel', 'Steve', 'Tina',
  'Uma', 'Victor', 'Wendy', 'Xavier', 'Yara',
  'Zane', 'Diana', 'Ethan', 'Bella', 'George',
  'Henry', 'Ivy', 'Jack', 'Kylie', 'Leo',
  'Mia', 'Noah', 'Olivia', 'Penny', 'Ray',
  'Sophia', 'Tom', 'Ursula', 'Violet', 'Will',
  'Zara', 'Aiden', 'Brooke', 'Cameron', 'Delilah'
];

const locations = [
  'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
  'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
  'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte',
  'San Francisco', 'Indianapolis', 'Seattle', 'Denver', 'Washington',
  'Boston', 'El Paso', 'Nashville', 'Detroit', 'Oklahoma City',
  'Portland', 'Las Vegas', 'Memphis', 'Louisville', 'Baltimore',
  'Milwaukee', 'Albuquerque', 'Tucson', 'Fresno', 'Sacramento',
  'Kansas City', 'Mesa', 'Atlanta', 'Omaha', 'Raleigh',
  'Miami', 'Cleveland', 'Tulsa', 'Oakland', 'Minneapolis',
  'Arlington', 'Wichita', 'Bakersfield', 'Aurora', 'Tampa'
];


const doctorImages = [
  "/images/doc(1).avif",
  "/images/doc(2).jpg",
  "/images/doc(3).webp",
  "/images/doc(4).avif",
  "/images/doc(5).webp",
  "/images/doc(6).webp",
  "/images/doc(7).avif",
  "/images/doc(8).avif",
  "/images/doc(9).avif",
  "/images/doc(10).avif",
  "/images/doc(11).avif",
  "/images/doc(12).avif",
  "/images/doc(13).avif",
  "/images/doc(14).avif",
];

const doctorImages2 = [
  "/images2/i1.avif",
  "/images2/i2(1).avif",
  "/images2/i2(2).jpg",
  "/images2/i2(3).webp",
  "/images2/i2(4).avif",
  "/images2/i2(5).webp",
  "/images2/i2(6).avif",
  "/images2/i2(7).jpg",
  "/images2/i2(8).jpg",
  "/images2/i2(9).avif",
  "/images2/i2(10).avif",
  "/images2/i2(11).jpg",
  "/images2/i2(12).avif",
  "/images2/i2(13).avif",
  "/images2/i2(14).avif"
];



const experience=[
  "Treating patients with various illnesses and conditions",
  "Performing surgeries or assisting in operations",
  "Working long hours during hospital shifts",
  "Handling emergency cases in the ER",
  "Diagnosing rare or complex diseases",
  "Communicating diagnoses and treatment plans to patients",
  "Breaking bad news to patients or their families",
  "Monitoring patients in critical care or ICU",
  "Managing chronic conditions like diabetes or hypertension",
  "Conducting routine physical examinations",
  "Prescribing and adjusting medications",
  "Supervising and mentoring medical students or interns",
  "Participating in medical research and publishing papers",
  "Presenting case studies at medical conferences",
  "Collaborating with nurses, specialists, and technicians",
  "Using advanced medical equipment and technology",
  "Responding to mass casualty events or natural disasters",
  "Volunteering for medical missions or free clinics",
  "Dealing with end-of-life care and palliative treatments",
  "Supporting patients' mental and emotional health",
  "Adapting to new medical guidelines and protocols",
  "Managing infectious disease outbreaks (e.g., COVID-19)",
  "Learning new surgical or diagnostic techniques",
  "Balancing multiple patients with different needs",
  "Traveling to remote areas to provide care",
  "Attending continuous medical education (CME) courses",
  "Building long-term relationships with patients",
  "Handling medical legal issues or malpractice concerns",
  "Participating in health education and awareness programs",
  "Improving hospital policies or patient care systems"
]

const specalist=[
  "Expert knowledge in a specific medical field",
  "Advanced diagnostic skills",
  "Precision in performing specialized procedures",
  "Interpreting complex lab results and imaging",
  "Developing specialized treatment plans",
  "Use of advanced medical equipment",
  "Consulting and referring to other specialists",
  "Leading multidisciplinary medical teams",
  "Staying updated with the latest research in their specialty",
  "Conducting or participating in clinical trials",
  "Providing second opinions on complex cases",
  "Teaching and training junior doctors in their specialty",
  "Performing risk assessments and preventive care",
  "Monitoring patient progress in long-term cases",
  "High-level decision-making under pressure",
  "Patient education specific to their condition",
  "Strong communication with patients and families",
  "Managing ethical issues related to specialty treatments",
  "Handling rare or difficult cases",
  "Customizing care based on individual patient needs",
  "Performing or supervising complex surgeries (if surgical specialist)",
  "Interpreting genetic or molecular test results (for fields like oncology or genetics)",
  "Maintaining detailed and accurate patient records",
  "Contributing to specialist medical publications or journals",
  "Participating in international medical conferences",
  "Applying evidence-based medicine in practice",
  "Collaborating with researchers and pharmaceutical companies",
  "Ensuring compliance with medical laws and ethical standards",
  "Managing specialist clinics or departments",
  "Providing follow-up and rehabilitation planning"
]


const Techniques=[
  "Taking a detailed patient medical history",
  "Conducting physical examinations",
  "Interpreting lab tests and imaging results",
  "Making accurate medical diagnoses",
  "Prescribing appropriate medications",
  "Administering injections and vaccines",
  "Wound care and dressing changes",
  "Performing minor surgical procedures",
  "Monitoring vital signs",
  "Providing lifestyle and dietary advice",
  "Developing personalized treatment plans",
  "Managing chronic diseases (e.g., diabetes, hypertension)",
  "Providing pain management strategies",
  "Ordering and interpreting diagnostic tests (e.g., blood tests, X-rays)",
  "Coordinating with specialists for advanced care",
  "Using evidence-based treatment approaches",
  "Performing CPR and emergency response techniques",
  "Educating patients about their condition and treatment",
  "Following up on patient progress",
  "Adjusting treatments based on patient response",
  "Using telemedicine for remote patient care",
  "Handling mental health issues alongside physical health",
  "Ensuring medication safety and managing side effects",
  "Teaching self-care and home care techniques",
  "Providing rehabilitation referrals and guidance",
  "Using electronic health records to track care",
  "Practicing infection control and hygiene protocols",
  "Supporting patients emotionally during treatment",
  "Addressing social or environmental factors affecting health",
  "Evaluating treatment outcomes and modifying plans"
]


const patience=[
  "Listening carefully to a patient’s lengthy explanation of symptoms",
  "Repeating medical instructions multiple times for better understanding",
  "Calmly handling anxious or fearful patients",
  "Waiting for a patient to gather their thoughts before answering",
  "Explaining complex medical terms in simple language",
  "Dealing patiently with uncooperative or difficult patients",
  "Managing long waiting times without showing frustration",
  "Taking extra time to comfort a worried family member",
  "Staying calm during emergency situations",
  "Handling repetitive questions without irritation",
  "Supporting patients through slow recovery processes",
  "Encouraging patients to adhere to treatment plans despite challenges",
  "Listening to emotional or distressed patients without interruption",
  "Guiding elderly patients who need more time to understand",
  "Responding gently to children who are scared or uncooperative",
  "Giving patients time to make informed decisions",
  "Working with patients who have communication difficulties",
  "Explaining preventive measures patiently during routine check-ups",
  "Providing reassurance during uncertain diagnoses",
  "Managing administrative delays without showing impatience",
  "Teaching lifestyle changes step-by-step over multiple visits",
  "Waiting through lengthy procedures with steady focus",
  "Helping patients overcome fear of medical procedures",
  "Calmly addressing misinformation or myths patients believe",
  "Handling multiple questions during consultations with composure",
  "Adapting to patients’ slow learning curves",
  "Listening to family disputes related to patient care",
  "Remaining composed during sudden changes in patient condition",
  "Encouraging hesitant patients to undergo necessary tests",
  "Spending extra time with patients who need emotional support"
];

const doctorSpecialties = [
  "Cardiologist",
  "Interventional Cardiologist",
  "Electrophysiologist",
  "Vascular Surgeon",
  "Neurologist",
  "Neurosurgeon",
  "Psychiatrist",
  "Psychologist",
  "Pulmonologist",
  "Thoracic Surgeon",
  "Gastroenterologist",
  "Hepatologist",
  "Endocrinologist",
  "Gynecologist (OB-GYN)",
  "Obstetrician",
  "Reproductive Endocrinologist",
  "Urologist",
  "Andrologist",
  "Orthopedic Surgeon",
  "Rheumatologist",
  "Physiatrist (PM&R)",
  "Ophthalmologist",
  "Optometrist",
  "ENT (Otolaryngologist)",
  "Dentist",
  "Orthodontist",
  "Oral Surgeon",
  "Pediatrician",
  "Pediatric Surgeon",
  "Neonatologist",
  "Dermatologist",
  "Hematologist",
  "Oncologist",
  "Immunologist",
  "Nephrologist",
  "General Surgeon",
  "Plastic Surgeon",
  "Trauma Surgeon",
  "Colorectal Surgeon",
  "General Practitioner (GP)",
  "Family Medicine Doctor",
  "Internal Medicine Doctor",
  "Preventive Medicine Doctor",
  "Emergency Medicine Doctor",
  "Intensivist / Critical Care Doctor"
];


const freepikDoctorImages = [
  "https://images.pexels.com/photos/8460041/pexels-photo-8460041.jpeg",
  "https://images.pexels.com/photos/8460043/pexels-photo-8460043.jpeg",
  "https://images.pexels.com/photos/8376295/pexels-photo-8376295.jpeg",
  "https://images.pexels.com/photos/3845766/pexels-photo-3845766.jpeg",
  "https://images.pexels.com/photos/6129232/pexels-photo-6129232.jpeg",
  "https://images.pexels.com/photos/5721679/pexels-photo-5721679.jpeg",
  "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg",
  "https://images.pexels.com/photos/8460047/pexels-photo-8460047.jpeg",
  "https://images.pexels.com/photos/5452203/pexels-photo-5452203.jpeg",
  "https://images.pexels.com/photos/6129042/pexels-photo-6129042.jpeg",
  "https://images.pexels.com/photos/5452202/pexels-photo-5452202.jpeg",
  "https://images.pexels.com/photos/5452200/pexels-photo-5452200.jpeg",
  "https://images.pexels.com/photos/6129040/pexels-photo-6129040.jpeg",
  "https://images.pexels.com/photos/5452205/pexels-photo-5452205.jpeg",
  "https://images.pexels.com/photos/8376326/pexels-photo-8376326.jpeg",
  "https://images.pexels.com/photos/8376316/pexels-photo-8376316.jpeg",
  "https://images.pexels.com/photos/6129236/pexels-photo-6129236.jpeg",
  "https://images.pexels.com/photos/5452211/pexels-photo-5452211.jpeg",
  "https://images.pexels.com/photos/8460045/pexels-photo-8460045.jpeg",
  "https://images.pexels.com/photos/8460049/pexels-photo-8460049.jpeg",
  "https://images.pexels.com/photos/8376314/pexels-photo-8376314.jpeg",
  "https://images.pexels.com/photos/8376310/pexels-photo-8376310.jpeg",
  "https://images.pexels.com/photos/6129038/pexels-photo-6129038.jpeg",
  "https://images.pexels.com/photos/5452206/pexels-photo-5452206.jpeg",
  "https://images.pexels.com/photos/5452210/pexels-photo-5452210.jpeg",
  "https://images.pexels.com/photos/8376324/pexels-photo-8376324.jpeg",
  "https://images.pexels.com/photos/8376320/pexels-photo-8376320.jpeg",
  "https://images.pexels.com/photos/8376308/pexels-photo-8376308.jpeg",
  "https://images.pexels.com/photos/8376312/pexels-photo-8376312.jpeg",
  "https://images.pexels.com/photos/7088526/pexels-photo-7088526.jpeg",
  "https://images.pexels.com/photos/8460041/pexels-photo-8460041.jpeg",
  "https://images.pexels.com/photos/8460043/pexels-photo-8460043.jpeg",
  "https://images.pexels.com/photos/8376295/pexels-photo-8376295.jpeg",
  "https://images.pexels.com/photos/3845766/pexels-photo-3845766.jpeg",
  "https://images.pexels.com/photos/6129232/pexels-photo-6129232.jpeg",
  "https://images.pexels.com/photos/5721679/pexels-photo-5721679.jpeg",
  "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg",
  "https://images.pexels.com/photos/8460047/pexels-photo-8460047.jpeg",
  "https://images.pexels.com/photos/5452203/pexels-photo-5452203.jpeg",
  "https://images.pexels.com/photos/6129042/pexels-photo-6129042.jpeg",
  "https://images.pexels.com/photos/5452202/pexels-photo-5452202.jpeg",
  "https://images.pexels.com/photos/5452200/pexels-photo-5452200.jpeg",
  "https://images.pexels.com/photos/6129040/pexels-photo-6129040.jpeg",
  "https://images.pexels.com/photos/5452205/pexels-photo-5452205.jpeg",
  "https://images.pexels.com/photos/8376326/pexels-photo-8376326.jpeg",
  "https://images.pexels.com/photos/8376316/pexels-photo-8376316.jpeg",
  "https://images.pexels.com/photos/6129236/pexels-photo-6129236.jpeg",
  "https://images.pexels.com/photos/5452211/pexels-photo-5452211.jpeg",
  "https://images.pexels.com/photos/8460045/pexels-photo-8460045.jpeg",
  "https://images.pexels.com/photos/8460049/pexels-photo-8460049.jpeg",
  "https://images.pexels.com/photos/8376314/pexels-photo-8376314.jpeg",
  "https://images.pexels.com/photos/8376310/pexels-photo-8376310.jpeg",
  "https://images.pexels.com/photos/6129038/pexels-photo-6129038.jpeg",
  "https://images.pexels.com/photos/5452206/pexels-photo-5452206.jpeg",
  "https://images.pexels.com/photos/5452210/pexels-photo-5452210.jpeg",
  "https://images.pexels.com/photos/8376324/pexels-photo-8376324.jpeg",
  "https://images.pexels.com/photos/8376320/pexels-photo-8376320.jpeg",
  "https://images.pexels.com/photos/8376308/pexels-photo-8376308.jpeg",
  "https://images.pexels.com/photos/8376312/pexels-photo-8376312.jpeg"
];




function insceptdoctor(){
  const experience_random=experience[Math.floor(Math.random()*experience.length)];
  const specalist_random=specalist[Math.floor(Math.random()*specalist.length)];
  const Techniques_random=Techniques[Math.floor(Math.random()*Techniques.length)];
  const patience_random=patience[Math.floor(Math.random()*patience.length)];
  const doctorSpecialties_random=doctorSpecialties[Math.floor(Math.random()*doctorSpecialties.length)]
  const imagesdoc_random=freepikDoctorImages[Math.floor(Math.random)*freepikDoctorImages.length]
  return{
    Experience:experience_random,
    Specalist:specalist_random,
    Techniques:Techniques_random,
    Patience:patience_random,
    Specialties:doctorSpecialties_random,
    image:imagesdoc_random,
  }
}


app.get(['/', '/Doctors'], async (req, res) => {
  try {
    const findDoctor = await Doctor.find({}).sort({ start: -1 });
    res.render('index', { findDoctor });
  } catch (e) {
    res.status(500).send("Error: " + e.message);
  }
});



function getRandomFreepikImage() {
  return getRandomItem(freepikDoctorImages);
}

function generateRandomDoctor() {
  return {
    DName: `Dr. ${getRandomItem(doctors)}`,
    Pname: getRandomItem(patients),
    Location: getRandomItem(locations),
    Specialties: getRandomItem(doctorSpecialties),
    Bill: Math.floor(Math.random() * 450) + 50,
    image: getRandomFreepikImage() 
  };
}

app.get('/show', (req, res) => {
  const doctorview = {
    image: getRandomFreepikImage()
  };
  res.render('show', { doctorview });
});



app.get('/Doctors/new', (req, res) => {
  res.render('show', { doctorview: { image: getRandomFreepikImage() } });
});

function generateRandomDoctor() {
  return {
    DName: `Dr. ${getRandomItem(doctors)}`,
    Pname: getRandomItem(patients),
    Location: getRandomItem(locations),
    Specialties: getRandomItem(doctorSpecialties),
    Bill: Math.floor(Math.random() * 450) + 50,
    image: getRandomFreepikImage()  
  };
}





app.post('/Doctors', async (req, res) => {
  try {
    const newDoctor = new Doctor({
      DName: req.body.Dname,
      Specialties: req.body.Special,
      Pname: req.body.Pname,
      Location: req.body.lname,
      Bill: req.body.Btotal,
      start: req.body.start || undefined, 
      end: req.body.end || undefined,
      image: req.body.image || doctorImages[Math.floor(Math.random() * doctorImages.length)] ||  freepikDoctorImages[Math.floor(Math.random() * freepikDoctorImages.length)],
      });
    await newDoctor.save();
    res.redirect('/Doctors');
  } catch (err) {
    res.status(400).send("Error saving doctor: " + err.message);
  }
});



  app.post('/Doctors/random', async (req, res) => {
    try {
    const randomDoctor = generateRandomDoctor();
    const newDoctor = new Doctor(randomDoctor);
    await newDoctor.save();
     res.redirect('/Doctors');
  } catch (err) {
    res.status(400).send("Error saving random doctor: " + err.message);
  }
});



app.post('/Doctors/add', (req, res) => {
  const doctor = {
    doctorName: req.body.doctorName,
    patientName: req.body.patientName,
    location: req.body.location,
    specialty: req.body.specialty,
    bill: req.body.bill,
    image: req.body.Image 
  };

  doctors.push(doctor); 
  res.redirect('/index');
});


app.get('/Doctors/add', (req, res) => {
  res.render('show', { doctorview});
});


app.get('/Doctors/inspect/:id', async (req, res) => {
  try {
    const doctorview = await Doctor.findById(req.params.id);
    if (!doctorview) return res.status(404).send('Doctor not found');


    const random = insceptdoctor();

    doctorview.Experience = random.Experience;
    doctorview.Specalist = random.Specalist;
    doctorview.Techniques = random.Techniques;
    doctorview.Patience = random.Patience;

    res.render('inspect', { doctorview });
  } catch (err) {
    res.status(500).send('Error fetching doctor: ' + err.message);
  }
});


app.post('/Doctors/inspect/:id', async (req, res) => {
  try {
    await Doctor.findByIdAndUpdate(req.params.id, {
      Image: req.body.Image || '',
      Experience: req.body.Experience,
      Specalist: req.body.Specalist,
      Techniques: req.body.Techniques,
      Patience: req.body.Patience,
    });

    res.redirect(`/Doctors/inspect/${req.params.id}`);
  } catch (err) {
    res.status(400).send("Error updating doctor: " + err.message);
  }
});

app.get('/Doctors/inspect/:id/appoint', async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);
    if (!doctor) return res.status(404).send('Doctor not found');
    
    const appoint = "Appointment has been booked";
    res.render('appoint', { appoint, doctor });
  } catch (err) {
    res.status(500).send('Error fetching doctor: ' + err.message);
  }
});


app.get('/Doctors/inspect/:id/appoint/makebill', async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);
    if (!doctor) return res.status(404).send('Doctor not found');

    const appoint = "Appointment has been booked";
    const min = 799;
    const max = 4999;
    const makebillrandom = Math.floor(Math.random() * (max - min + 1)) + min;
    doctor.Bill = makebillrandom;
    await doctor.save();


    res.render('appoint', { appoint, doctor, makebillrandom });
  } catch (err) {
    res.status(500).send('Error fetching doctor: ' + err.message);
  }
});

app.get('/Doctors/inspect/:id/makebill/appoint', async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);
    if (!doctor) return res.status(404).send('Doctor not found');

    const appoint = "Appointment has been booked";
    const min = 799;
    const max = 4999;
    const makebillrandom = Math.floor(Math.random() * (max - min + 1)) + min;
    doctor.Bill = makebillrandom;
    await doctor.save();
    res.render('makebill', { appoint, doctor, makebillrandom });
  } catch (err) {
    res.status(500).send('Error fetching doctor: ' + err.message);
  }
});



app.get('/Doctors/edit/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).send('Doctor not found');
    res.render('edit', { doctor });
  } catch (err) {
    res.status(500).send('Error fetching doctor: ' + err.message);
  }
});


app.post('/Doctors/edit/:id', async (req, res) => {
  try {
    await Doctor.findByIdAndUpdate(req.params.id, {
      DName: req.body.Dname,
      Pname: req.body.Pname,
      Location: req.body.lname,
      Bill: req.body.Btotal,
      Image: req.body.Image || ''
    });
    res.redirect('/Doctors');
  } catch (err) {
    res.status(400).send("Error updating doctor: " + err.message);
  }
});


app.post('/Doctors/delete/:id', async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.redirect('/Doctors');
  } catch (err) {
    res.status(500).send("Error deleting doctor: " + err.message);
  }
});

app.listen(Port, () => {
  console.log("Server running on port 8080");
});