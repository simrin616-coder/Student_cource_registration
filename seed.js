const mongoose = require('mongoose');
const Course = require('./models/Course');

mongoose.connect('mongodb+srv://02fe23bcs156_db_user:wP50g1JtChL4sWwP@cluster0.uwqrlsp.mongodb.net/?appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('Connected to MongoDB Atlas');
  
  // Insert sample courses
  await Course.insertMany([
    { title: 'Introduction to Node.js', description: 'Learn the basics of Node.js and backend development.', instructor: 'Dr. Smith', duration: '4 weeks' },
    { title: 'Web Development with Express', description: 'Build APIs using Express.', instructor: 'Prof. Johnson', duration: '6 weeks' },
    { title: 'Database Management', description: 'Master MongoDB and data handling.', instructor: 'Ms. Lee', duration: '5 weeks' }
  ]);
  
  console.log('Sample courses inserted');
  process.exit();
}).catch(err => console.error('Error:', err));