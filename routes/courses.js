const express = require('express');
const jwt = require('jsonwebtoken');
const Course = require('../models/Course');
const User = require('../models/User');

const router = express.Router();

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ error: 'No token provided' });
  jwt.verify(token, 'secretkey', (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.userId = decoded.id;
    next();
  });
};

// Get all courses
router.get('/', async (req, res) => {
  try { console.log('Adding course:', req.body);
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Enroll in a course
router.post('/enroll/:courseId', verifyToken, async (req, res) => {
  try { console.log('Adding course:', req.body);
    const user = await User.findById(req.userId);
    if (!user.enrolledCourses.includes(req.params.courseId)) {
      user.enrolledCourses.push(req.params.courseId);
      await user.save();
    }
    res.json({ message: 'Enrolled successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get enrolled courses for user
router.get('/enrolled', verifyToken, async (req, res) => {
  try { console.log('Adding course:', req.body);
    const user = await User.findById(req.userId).populate('enrolledCourses');
    res.json(user.enrolledCourses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
// Admin: Add a new course (with logging)
router.post('/add', verifyToken, async (req, res) => {
  try { console.log('Adding course:', req.body);
    const { title, description, instructor, duration } = req.body;
    const course = new Course({ title, description, instructor, duration });
    await course.save();
    res.status(201).json({ message: 'Course added successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

