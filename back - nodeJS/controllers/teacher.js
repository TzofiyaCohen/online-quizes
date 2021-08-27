// const commonmodels = require('@leadercodes/modelsnpm');
// const User = commonmodels.models.user
// const Teacher = commonmodels.models.teacher

const router = require('express').Router();
const { json, Router } = require('express');
var currentDate = require("current-date")

var Teacher = require('../models/teacher.model');
var User = require('../models/user.model');

const createIfnotExist = ((req, res) => {
    console.log("in create teacher")
    const userName = req.params.userName;
    const newTaecher = new Teacher({ userName });

    console.log("userName ->   ", userName)
    User.findOne({ "username": userName })
        .then((user) => {
            if (user == null) {
                res.json('user not exsit!')
            }
            else {
                Teacher.findOne({ "userName": userName })
                    .then((teacher) => {
                        console.log(teacher)
                        if (teacher == null) {
                            newTaecher.save()
                                .then(() => res.json('Teacher added!'))
                                .catch(err => res.status(400).json('Error: ' + err));
                        }
                        else {
                            console.log(userName, " exist")
                            res.json('Teacher exsit!')
                        }
                    })
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

const getTeacherByUsername = ((req, res) => {
    console.log("enter to get teacher by userName")
    const userName = req.params.userName;
    console.log(userName, " get")
    Teacher.findOne({ "userName": userName })
        .then(teacher => res.json(teacher))
        .catch(err => res.status(400).json('Error: ' + err));
});



const changeTestList = ((req, res) => {
    Teacher.findById(req.params.id)
        .then(teacher => {
            teacher.checkedTest = req.body.checkedTest
            teacher.testToCheck = teacher.testToCheck.filter(test => test._id != req.body.testID)

            teacher.save()
                .then(() => res.json('teacher updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

const removeFromToCheck = ((req, res) => {
    Teacher.findById(req.params.id)
        .then(teacher => {
            teacher.testToCheck = teacher.testToCheck.filter(test => test.id !== req.body.testID)

            teacher.save()
                .then(() => res.json('teacher updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

const removeFromChecked = ((req, res) => {
    Teacher.findById(req.params.id)
        .then(teacher => {
            teacher.checkedTest = teacher.checkedTest.filter(test => test.id !== req.body.testID)

            teacher.save()
                .then(() => res.json('teacher updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

const getTeachersName = ((req, res) => {
    var result = []
    Teacher.find()
        .then((teachers => {
            teachers.forEach(element => {
                result.push(element.userName)
            });
            res.json(result)
        }))
        .catch(err => res.status(400).json('Error: ' + err));
})



module.exports = { createIfnotExist, getTeacherByUsername, changeTestList, removeFromChecked, removeFromToCheck, getTeachersName };

/*
router.route('/:id').get((req, res) => {
    Teacher.findById(req.params.id)
        .then(teacher => res.json(teacher))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').get((req, res) => {
    Teacher.find()
        .then(teachers => res.json(teachers))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Teacher.findByIdAndDelete(req.params.id)
        .then(() => res.json('Teacher deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Teacher.findById(req.params.id)
        .then(teacher => {
            teacher.firstName = req.body.firstName;
            teacher.lastName = req.body.lastName;
            teacher.testToCheck = req.body.testToCheck;
            teacher.checkedTest = req.body.checkedTest;

            teacher.save()
                .then(() => res.json('teacher updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

*/