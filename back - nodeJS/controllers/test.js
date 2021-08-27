// const commonmodels = require('@leadercodes/modelsnpm');
// const User = commonmodels.models.user
// const Test = commonmodels.models.test
// const add2contact = commonmodels.models.add2contact

const router = require('express').Router();
const { json, Router } = require('express');
var currentDate = require("current-date")

var Test = require('../models/test.model');
var User = require('../models/user.model');
var add2contact = require('../models/add2contact')

const getAllTests = ((req, res) => {
    console.log("entered to get all test")
    Test.find({ 'deleted': false, 'creator': req.params.userName })
        .then(tests => {
            console.log(tests);
            res.json(tests)
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

const getAllTrash = ((req, res) => {
    Test.find({ 'deleted': true, 'creator': req.params.userName })
        .then(tests =>
            res.json(tests))
        .catch(err => res.status(400).json('Error: ' + err));
});

const addTest = ((req, res) => {
    console.log("entered to add test")
    const questions = req.body.questions;
    const test_name = req.body.test_name;
    const openTest = req.body.openTest;
    // const duration = Number(req.body.duration);
    const time_days = Number(req.body.time_days);
    const time_hours = Number(req.body.time_hours);
    const time_minutes = Number(req.body.time_minutes);
    const description = req.body.description;
    const creator = req.body.creator
    const backgroundImage = req.body.backgroundImage
    const deleted = req.body.deleted
    const lastOpened = currentDate('date')
    const kind = req.body.kind
    const targetAudience = req.body.targetAudience
    const status = req.body.status
    const color = req.body.color
    const displayVideo = req.body.displayVideo;
    const video = req.body.video
    const newTest = new Test({ video, displayVideo, status, backgroundImage, color, questions, test_name, openTest, time_days, time_hours, time_minutes, lastOpened, description, creator, deleted, kind, targetAudience });
    newTest.save()
        .then((test) =>
            res.json(test))
        // res.json(test))
        .catch(err => res.status(400).json('Error: ' + err));
});

const getTest = ((req, res) => {
    console.log("in get test ")
    Test.findById(req.params.id)
        .then(test => { console.log(test); res.json(test) })
        .catch(err => res.status(400).json('Error: ' + err));
});

const deleteTest = ((req, res) => {
    Test.findByIdAndDelete(req.params.id)
        .then((test) => {
            if (test == null)
                res.json('test Not Exist')
            else
                res.json('Test deleted')
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


const toTrash = ((req, res) => {
    console.log(req.params.id)

    Test.findById(req.params.id)
        .then(test => {
            if (test == null)
                res.json('test Not Exist')
            else {
                test.deleted = true;
                test.save()
                    .then(() => res.json('test passed to trash'))
                    .catch(err => res.status(400).json('Error: ' + err));
            }
        })

});
const toListFromTrash = ((req, res) => {
    console.log(req.params.id)

    Test.findById(req.params.id)
        .then(test => {
            if (test == null)
                res.json('test Not Exist')
            else {
                test.deleted = false;
                test.save()
                    .then(() => res.json('test passed to list'))
                    .catch(err => res.status(400).json('Error: ' + err));
            }
        })

});
const updateTest = ((req, res) => {
    Test.findById(req.params.id)
        .then(test => {
            if (test == null)
                res.json('test Not Exist')
            else {
                test.questions = req.body.questions;
                test.test_name = req.body.test_name;
                // test.duration = req.body.duration;
                test.time_days = req.body.time_days;
                test.time_hours = req.body.time_hours;
                test.time_minutes = req.body.time_minutes;
                test.openTest = req.body.openTest;
                test.description = req.body.description;
                test.lastOpened = currentDate('date')
                test.backgroundImage = req.body.backgroundImage
                test.color = req.body.color
                test.kind = req.body.kind
                test.targetAudience = req.body.targetAudience
                test.status = req.body.status
                test.displayVideo = req.body.displayVideo;
                test.video = req.body.video
                test.save()
                    .then(() => res.json(test))
                    .catch(err => res.status(400).json('Error: ' + err));
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

const copyTest = ((req, res) => {
    Test.findById(req.params.id)
        .then(test => {
            if (test == null)
                res.json('test Not Exist')
            else {
                const questions = test.questions ? test.questions : []
                const test_name = test.test_name + " copy";
                const openTest = test.openTest;
                // const duration = Number(test.duration);
                const time_days = Number(test.time_days);
                const time_hours = Number(test.time_hours);
                const time_minutes = Number(test.time_minutes);
                const description = test.description;
                const lastOpened = currentDate('date')
                const creator = test.creator
                const backgroundImage = test.backgroundImage
                const deleted = test.deleted
                const kind = test.kind
                const targetAudience = test.targetAudience
                const status = test.status
                const copied = req.params.id
                const color = req.params.color
                const displayVideo = test.displayVideo;
                const video = test.video
                const newTest = new Test({ video, displayVideo, copied, status, targetAudience, kind, deleted, color, backgroundImage, questions, test_name, openTest, time_days, time_hours, time_minutes, description, lastOpened, creator });

                newTest.save()
                    .then((test) => res.json(test._id))
                    .catch(err => res.status(400).json('Error: ' + err));
            }
        });
});

const copySelected = ((req, res) => {
    console.log(req.body)
    let resArray = []
    let index = 0

    req.body.forEach(element => {
        Test.findById(element)
            .then(test => {
                console.log(test, element)
                if (test == null) {
                    resArray.push({ id: element, mgs: 'test Not Exist' })
                    if (index == req.body.length - 1) {
                        res.json(resArray)
                    }
                    index++
                }
                else {
                    const questions = test.questions;
                    const test_name = test.test_name + " copy";
                    const openTest = test.openTest;
                    // const duration = Number(test.duration);
                    const time_days = Number(test.time_days);
                    const time_hours = Number(test.time_hours);
                    const time_minutes = Number(test.time_minutes);
                    const description = test.description;
                    const lastOpened = currentDate('date')
                    const creator = test.creator
                    const backgroundImage = test.backgroundImage
                    const deleted = test.deleted
                    const kind = test.kind
                    const targetAudience = test.targetAudience
                    const status = test.status
                    const copied = element
                    const color = test.color
                    const displayVideo = test.displayVideo;
                    const video = test.video
                    const newTest = new Test({ displayVideo, video, copied, status, targetAudience, kind, deleted, color, backgroundImage, questions, test_name, openTest, time_days, time_hours, time_minutes, description, lastOpened, creator });

                    newTest.save()
                        .then((c_test) => {
                            if (index < req.body.length - 1) {
                                console.log(req.body.length, "req.body.length", index, "index")
                                resArray.push(c_test._id);
                                console.log(resArray, "resArray")
                                index++
                                console.log(index, "index")
                            }
                            else {
                                resArray.push(c_test._id);
                                console.log(resArray, "resArray")
                                console.log(index, "index final")
                                res.json(resArray)
                            }
                        })
                        .catch(err => res.status(400).json('Error: ' + err));
                }
            });
        //  .catch(err => res.status(400).json('Error: ' + err));
    })
});

const deleteSelected = ((req, res) => {
    console.log(req.body)
    var resArray = []
    let index = 0

    req.body.forEach(element => {
        Test.findByIdAndDelete(element)
            .then((test) => {
                if (test == null) {
                    resArray.push({ id: element, mgs: 'test Not Exist' })
                    index++
                }
                else {
                    resArray.push({ id: element, mgs: 'Test deleted' })
                    index++
                }
                if (index == req.body.length)
                    res.json(resArray)
            })
            .catch(err => res.status(400).json('Error: ' + err));
    });
});

const average = ((req, res) => {
    console.log("enter average")
    var sum = 0
    var index = 0
    var resArray = []

    Test.find()
        .then((tests) => {
            tests.forEach(test => {

                User.find({ "quizes.testID": test._id })
                    .then(users => {
                        users.forEach(user => {
                            var quiz = user.quizes.filter(el => el.testID == test._id)[0]
                            if (quiz.multyQuestion_grade) {
                                sum += quiz.multyQuestion_grade / users.length
                                console.log(sum, test.test_name)
                            }
                        });
                        resArray.push({ testID: test._id, average: sum })
                        if (index == tests.length - 1)
                            res.send(resArray)
                        index++
                        sum = 0
                    })
                    .catch(err => res.status(400).json('Error: ' + err));
            });
        })
        .catch(err => res.status(400).json('Error: ' + err));
})


module.exports = {
    getAllTests, addTest, getTest, deleteTest, updateTest,
    copyTest, copySelected, deleteSelected, average, getAllTrash, toTrash, toListFromTrash
};