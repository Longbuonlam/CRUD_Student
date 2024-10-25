// Filename : api.js

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const StudentModel = require('./studentschema');
require('dotenv').config();

// Connecting to database
const db = (process.env.DB_URL);
mongoose.Promise = global.Promise;

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB: " + error);
    });
module.exports = router;

router.get('/add', (req, res) => {
    res.render('addUser'); // Render trang thêm sinh viên
});

router.get('/findall', function (req, res) {
    StudentModel.find()
    .then(data => {
        res.render('index', { students: data });
    })
    .catch(err => {
        console.log(err);
        res.status(500).send("Error fetching data");
    });
  });

router.post('/save', function (req, res) {
    const newStudent = new StudentModel();
    //newStudent.StudentId = req.body.StudentId;
    newStudent.Name = req.body.Name;
    newStudent.Address = req.body.Address;
    newStudent.Birthday = req.body.Birthday;
  
    newStudent.save()
    .then(data => {
        res.redirect('/findall');
    })
    .catch(error => {
        console.log(error);
        res.status(500).send("Error inserting data");
    });
  }); 

router.post('/delete', function (req, res) {
    StudentModel.findByIdAndDelete(req.body.id)
    .then(data => {
        res.redirect('/findall');
    })
    .catch(err => {
        console.log(err);
        res.status(500).send("Error deleting data");
    });
  });
  
  router.get('/edit/:id',function(req,res){
    StudentModel.findById(req.params.id)
    .then(student=>{
        res.render('editUser',{student});
    })
    .catch(err =>{
        console.log(err);
        res.status(500).send("Error feching data");
    });
  });

  router.post('/update', function (req, res) {
    const studentID = req.body.id;
    StudentModel.findByIdAndUpdate(studentID, {
      Name: req.body.Name,
      Address: req.body.Address,
      Birthday: req.body.Birthday
    })
    .then(data => {
        res.redirect('/findall');
    })
    .catch(err => {
        console.log(err);
        res.status(500).send("Error updating data");
    });
  });