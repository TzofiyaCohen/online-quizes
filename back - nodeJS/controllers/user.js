// const commonmodels = require('@leadercodes/modelsnpm');
// const User = commonmodels.models.user
// const Contacts = commonmodels.models.contact
// const Test = commonmodels.models.test
// const add2contact = commonmodels.models.add2contact
// const userAnonymousDetails = commonmodels.models.userAnonymousDetails


const router = require('express').Router();
const { json, Router } = require('express');
var currentDate = require("current-date")
const requestIp = require('request-ip');

var User = require('../models/user.model');
var Contacts = require('../models/contact.model');
var Test = require('../models/test.model');
var AnonymousDetails = require('../models/userAnonymousDetails')
var add2contact = require('../models/add2contact')



const populateUserContact = ((req, res) => {
    var username = req.params.userName
    // Contacts.find().then(result=>{
    //     res.send(result)
    // })
    User.findOne({ "username": username }).populate('contacts').find({ 'quizes': { $exists: true } })
        .then(user => {
            console.log(user);
            res.json(user)
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

const getUserContactsEmail = ((req, res) => {
    console.log("in getUserContactsEmail")
    var username = req.params.userName
    var resArray = []
    index = 0
    User.findOne({ "username": username }, { 'contacts': 1, '_id': 0 }).populate('contacts')
        .then(result => {
            result.contacts.forEach(contact => {
                console.log(`${contact.email} contact email`)
                // resArray.push( contact.email );
                resArray.push({ "name": contact.name, "email": contact.email });
                if (index == result.contacts.length - 1) {
                    console.log("get user contact email", resArray.length)
                    res.send(resArray)
                }
                index++

            });

        })
        .catch(err => res.status(400).json('Error: ' + err));
})

const deleteAdd2Contact = ((req, res) => {
    console.log("enter deleteAdd2Contact");
    add2contact.find({ "quizes._id": req.params.id })
        .then((add2contactp) => {
            console.log(add2contactp[0]._id)
            var add2contactId = add2contactp[0]._id;
            console.log(add2contactp[0].quizes.length)
            var tests = add2contactp[0].quizes;
            console.log(tests)
            console.log(add2contactp[0].creator_userName, "username")
            User.findOne({ "username": add2contactp[0].creator_userName }).populate('contacts')
                .then((user) => {
                    console.log(user.contacts.length, "length");
                    user.contacts.forEach((contact, index) => {
                        if (contact.email == add2contactp[0].email) {
                            console.log(contact.quizes.length, "before");
                            contact.quizes = tests
                            console.log(contact.quizes.length, "after");
                            console.log("contact.quizes.concat(tests)");
                            contact.save()
                                .then(() => {
                                    console.log("student contact updated")
                                    add2contact.findByIdAndDelete(add2contactId)
                                        .then((user) => {
                                            console.log(add2contactId, "id")
                                            if (user == null) {
                                                console.log(" user Not Exist In Add2Contact");
                                                user.json('user Not Exist In Add2Contact')
                                            }
                                            else {
                                                console.log(" user deleted In Add2Contact'");
                                                user.json('user deleted In Add2Contact')
                                            }
                                        })
                                        .catch(err => res.status(400).json('Error: ' + err));
                                })
                                .catch(err => {
                                    console.log(err)
                                });

                        }
                    })

                })
                .catch(err => res.status(400).json('Error: ' + err));

        })
        .catch(err => res.status(400).json('Error: ' + err));


});

const addTestToStudent = ((req, res) => {
    console.log("add test to student enter")
    Contacts.findOne({ "email": req.params.email })
        .then(user => {
            if (user == null)
                res.json("this email doesnt belong to any leader contact")
            console.log(user, "user in addtesttostudent")
            var new_test = req.body
            console.log(req.body, " ->req.body")
            new_test.lastOpened = currentDate('date')
            new_test.done = false
            new_test.testID = new_test.id
            new_test.studentUserName = ""
            user.quizes.push(new_test);
            console.log(new_test, "->  new_test")

            user.save()
                .then(() => {
                    console.log("contact student updated")
                    res.json('contact student updated')
                })
                .catch(err => {
                    console.log(err)
                    res.status(400).json('Error: ' + err)
                });
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

const getUser = ((req, res) => {
    User.findOne({ "username": "TzofiyaCohen" })
        .then(user => {
            // console.log(user._id, "-> user id");
            res.json(user)
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

const getStudentUser = ((req, res) => {
    const username = req.params.userName;
    console.log(username, " get")
    User.findOne({ "username": username })
        .then(user => {
            console.log(user._id, "-> user id");
            res.json(user)
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

//how do I know if my user has the contact if he did not add him by email? 
// the user does login, I have his username but it does not contain in contact details
const setSolvedTestToStudent = ((req, res) => {
    //create this user as contact of the creaator. then come here to save the test to the contact 
    var resArray = []
    var i = 0
    var length = 0
    var found = false
    console.log("enter setSolvedTestToStudent")
    console.log(req.body)//solvedTest,contact_email,test_creator, name

    User.findOne({ "username": req.body.test_creator }).populate('contacts')
        .then(contacts => {
            var contatArray = contacts.contacts
            console.log(contatArray.length)
            console.log(req.body.contact_email, "req.body.contact_email")
            length = contatArray.length
            contatArray.forEach((contact, index) => {
                console.log(index, "  index")
                i = index
                // if (contact.username == req.params.userName) {
                console.log(contact.email)
                if (contact.email == req.body.contact_email) {
                    found = true
                    console.log("found!", contact.email, found)
                    var new_test = req.body.solvedTest
                    // contact.quizes = contact.quizes.filter(el => el.testID != new_test.id && el.done == false)
                    // consol.log(contact.quizes.filter(el => el.testID == new_test.id && el.done == false))
                    new_test.lastOpened = currentDate('date')
                    new_test.done = true
                    new_test.testID = new_test.id
                    new_test.studentUserName = req.body.name
                    contact.quizes.push(new_test);

                    resArray.push({
                        "testID": new_test.id, "userName": contact.name, "testName": new_test.test_name,
                        "email": contact.email, "grade": new_test.grade, "cvFile": new_test.cvFile,
                        "kind": new_test.kind
                    })

                    contact.save()
                        .then(() => {
                            console.log("student contact updated")
                            res.json(resArray)
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(400).json('Error: ' + err)
                        });
                }
            });
            if (!found) {
                console.log(`${req.body.contact_email} is not a contact to ${req.body.test_creator}!`)

                var new_test = req.body.solvedTest
                new_test.lastOpened = currentDate('date')
                new_test.done = true
                new_test.testID = new_test.id
                new_test.studentUserName = req.body.contact_email.split("@")[0]

                var quizes = []
                quizes.push(new_test)
                var email = req.body.contact_email
                var creator_userName = req.body.test_creator
                const student = new add2contact({ quizes, email, creator_userName })

                student.save()
                    .then(() => {
                        console.log(`contact2add ${email} updated`)
                        res.json(`contact2add ${email} updated`)
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(400).json('Error: ' + err)
                    });
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

/*
 var resArray = []
    console.log("enter setSolvedTestToStudent")
 
    User.findOne({ "username": req.params.userName }).populate('contacts')
        .then(contacts => {
            var contatArray = contacts.contacts
            console.log(contatArray)
            contatArray.forEach(contact => {
                if (contact.email == req.params.email) {
                    var new_test = req.body
                    contact.quizes = contact.quizes.filter(el => el.testID != new_test.id)
                    new_test.lastOpened = currentDate('date')
                    new_test.done = true
                    new_test.testID = new_test.id
                    new_test.studentUserName = contact.name
                    contact.quizes.push(new_test);
 
                    resArray.push({
                        "testID": new_test.id, "userName": contact.name, "testName": new_test.test_name,
                        "email": contact.email, "grade": new_test.grade
                    })
 
                    contact.save()
                        .then(() => {
                            console.log("student contact updated")
                            res.json(resArray)
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(400).json('Error: ' + err)
                        });
                }
            });
        })
        .catch(err => res.status(400).json('Error: ' + err));
*/

const numOfTested = ((req, res) => {
    var resArray = []
    var index = 0

    Test.find()
        .then(tests => {
            tests.forEach(test => {
                Contacts.find({ "quizes.testID": test._id })
                    .then(users => {
                        var all = users.length
                        var done = 0
                        users.forEach(user => {
                            var quiz = user.quizes.filter(el => el.testID == test._id)[0]
                            if (quiz.done)
                                done += 1
                        });

                        console.log(`${done}/${all} tested in ${test._id}`);
                        resArray.push({ testID: test._id, all: users.length, tested: done })
                        if (index == tests.length - 1)
                            res.send(resArray)
                        index++
                    }
                    )
                    .catch(err => res.status(400).json('Error: ' + err));
            });
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

/*
const getSolvedTests = ((req, res) => {
    console.log("in get solved test")
    var resArray = []
    index = 0
 
    User.findOne({ "username": req.params.userName }, { 'contacts': 1, '_id': 0 }).populate('contacts')
        // .find({ 'quizes': { $exists: true } })
        // Contacts.find({ 'quizes': { $exists: true } })
        .then(users => {
            users.forEach(user => {
                if (user.includes('quizes'))
                    console.log(`${user.name} has quizes`)
                else
                    console.log(`${user.name} doesnot quizes`)
 
                user.quizes.forEach(test => {
                    if (test.done)
                        resArray.push(test)
                });
                if (index == users.length - 1) {
                    console.log("get solved tests", resArray.length)
                    res.send(resArray)
                }
                index++
                // res.json(users)
            });
            // res.send(resArray)
        })
        .catch(err => res.status(400).json('Error: ' + err));
})
*/

const getSolvedTests = ((req, res) => {
    console.log("in get solved test")
    var resArray = []
    index = 0

    User.findOne({ "username": req.params.userName }, { 'contacts': 1, '_id': 0 }).populate('contacts')

        .then(result => {
            console.log(result.contacts.length, "contact length")
            result.contacts.forEach(contact => {
                if (contact.quizes.length > 0) {
                    console.log(`${contact.name} has quizes`)
                    contact.quizes.forEach(test => {
                        if (test.done) {
                            resArray.push(test)
                            console.log(`${contact.name} solved ${test.test_name}`)
                        }
                    });
                }
                else
                    console.log(`${contact.name} has no quizes`)

                if (index == result.contacts.length - 1) {
                    console.log("get solved tests", resArray.length)
                    res.send(resArray)
                }
                index++
            });
            res.send(resArray)
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

const getSolved_add2contact = ((req, res) => {
    console.log("in get solved add2contact test")
    var resArray = []
    index = 0
    add2contact.find({ 'creator_userName': req.params.userName })
        .then(users => {
            console.log("shiri")
            console.log(users)
            users.forEach(user => {
                user.quizes.forEach(test => {
                    test.email = user.email
                    resArray.push(test)
                    console.log(test)
                });
                if (index == users.length - 1) {
                    console.log("get add2contact tests", resArray.length)
                    res.send(resArray)
                }
                index++
            });
            res.send(resArray)
        })
        .catch(err => res.status(400).json('Error: ' + err));
})



const deleteSolvedTest = ((req, res) => {

    Contacts.find({ "quizes._id": req.params.testID })
        .then(users => {
            console.log(users)
            if (users.length == 0)
                res.send(`${req.params.testID} is not exist`)
            else {
                users.forEach(user => {
                    user.quizes = user.quizes.filter(el => el._id != req.params.testID)
                    console.log(user.quizes, user.quizes.includes(req.params.testID))

                    user.save()
                        .then(() => res.send(`${req.params.testID} was deleted from ${user.username}`))
                        .catch(err => res.status(400).json('Error: ' + err));
                });
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

const deleteSelectedSolvedTest = ((req, res) => {
    console.log(req.body)
    var resArray = []
    var index = 0

    req.body.forEach(element => {
        Contacts.find({ "quizes._id": element })
            .then((users) => {
                console.log(users.length, index)
                if (users.length == 0) {
                    resArray.push({ id: element, mgs: 'test Not Exist' })
                    index++
                }
                else {
                    users.forEach(user => {
                        user.quizes = user.quizes.filter(el => el._id != element)
                        resArray.push({ id: element, mgs: `Test deleted from ${user.username}` })
                        index++

                        user.save()
                            .then(() => console.log(`${element} was deleted from ${user.username}`))
                            .catch(err => res.status(400).json('Error: ' + err));
                    });
                }
                console.log(index, users.length)
                if (index >= users.length)
                    res.json(resArray)
            })
            .catch(err => res.status(400).json('Error: ' + err));
    });
});

const saveAnonymousDetails = ((req, res) => {
    console.log("save client details")
    // const request_ip = req.ip;
    const IPAddress = requestIp.getClientIp(req);
    const request_userAgent = req.header('user-agent')
    let _date = new Date()
    let time = (String(_date)).split("T")

    console.log(time)
    console.log(IPAddress, request_userAgent)

    const newDetails = new AnonymousDetails({ ip: IPAddress, user_agent: request_userAgent, time: _date });

    newDetails.save()
        .then((result) => {
            res.json(result)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json('Error: ' + err)
        });

})


module.exports = {
    getStudentUser, addTestToStudent, setSolvedTestToStudent, saveAnonymousDetails, getSolved_add2contact,
    numOfTested, getSolvedTests, deleteSolvedTest, deleteSelectedSolvedTest, populateUserContact, getUser,
    deleteAdd2Contact, getUserContactsEmail,
};


//change the rael object
/*const copySolvedTest = ((req, res) => {
    console.log("enter to copySolvedTest")
    User.findOne({ "quizes._id": req.params.id })
        .then((user) => {
            console.log(user.username)
            let test = user.quizes.filter(el => el._id == req.params.id)[0]
            test._id = undefined
            console.log(test)
            test.test_name = `${test.test_name} copy`
            user.quizes.push(test)

            user.save()
                .then(() => {
                    console.log("copy success")
                    res.json(`${req.params.id} was copy to ${user.username}`)
                })
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
})*/

// const copySelectedSolved = ((req, res) => {
//     console.log(req.body)
//     var resArray = []
//     var index = 0

//     req.body.forEach(element => {
//         User.find({ "quizes._id": element })
//             .then((users) => {
//                 console.log(users.length, index)
//                 if (users.length == 0) {
//                     resArray.push({ id: element, mgs: 'test Not Exist' })
//                     index++
//                 }
//                 else {
//                     users.forEach(user => {
//                         user.quizes = user.quizes.push(element)
//                         resArray.push({ id: element, mgs: `Test deleted from ${user.username}` })

//                         index++

//                         user.save()
//                             .then(() => console.log(`${element} was deleted from ${user.username}`))
//                             .catch(err => res.status(400).json('Error: ' + err));
//                     });
//                 }
//                 console.log(index, users.length)
//                 if (index >= users.length)
//                     res.json(resArray)
//             })
//             .catch(err => res.status(400).json('Error: ' + err));
//     });
// });  