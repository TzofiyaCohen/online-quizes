const express = require('express')
const router = express.Router();
const { checkPermission } = require('./auth')
const { createIfnotExist, getTeacherByUsername, changeTestList, removeFromChecked, removeFromToCheck, getTeachersName } = require('../controllers/teacher')
const { getAllTests, addTest, getTest, deleteTest, updateTest, copyTest, copySelected, deleteSelected, average, getAllTrash, toTrash, toListFromTrash } = require('../controllers/test')
const { sendMessage } = require('../controllers/sendMail')
const { getStudentUser, addTestToStudent, numOfTested, getSolvedTests, deleteSolvedTest, deleteSelectedSolvedTest,
    setSolvedTestToStudent, saveAnonymousDetails, populateUserContact, getSolved_add2contact, getUser, deleteAdd2Contact, getUserContactsEmail } = require('../controllers/user')

//teacher controller 
router.get('/:userName/teacher/getTeacher', checkPermission, getTeacherByUsername)
router.get('/:userName/teacher/add', checkPermission, createIfnotExist)
router.post('/:userName/teacher/changeTestList/:id', changeTestList)
router.get('/:userName/teacher/getTeachersName', checkPermission, getTeachersName)
// router.post('/:userName/teacher/removeFromToCheck/:id', removeFromToCheck)
// router.post('/:userName/teacher/removeFromChecked/:id', removeFromChecked)

//test controller
router.get('/:userName/tests', checkPermission, getAllTests)
router.get('/:userName/tests/getAllTrash/', checkPermission, getAllTrash)
router.get('/:userName/tests/average', checkPermission, average)
router.get('/:userName/tests/:id', getTest)
router.post('/:userName/tests/add', checkPermission, addTest)
router.post('/:userName/tests/copy/:id', checkPermission, copyTest)
router.post('/:userName/tests/update/:id', checkPermission, updateTest)
router.post('/:userName/tests/toTrash/:id', checkPermission, toTrash)
router.post('/:userName/tests/toListFromTrash/:id', checkPermission, toListFromTrash)
router.post('/:userName/tests/copySelected', checkPermission, copySelected)
router.post('/:userName/tests/deleteSelected', checkPermission, deleteSelected)
router.delete('/:userName/tests/:id', checkPermission, deleteTest)

//user controller
router.get('/:userName/user/getStudentUser', checkPermission, getStudentUser)
router.get('/:userName/user/numOfTested', checkPermission, numOfTested)
router.get('/:userName/user/getSolvedTests', checkPermission, getSolvedTests)
router.get('/:userName/user/getSolved_add2contact', checkPermission, getSolved_add2contact)
router.get('/:userName/user/saveAnonymousDetails', saveAnonymousDetails)
router.get('/:userName/user/populateUserContact', populateUserContact)
router.get('/:userName/user/getUserContactsEmail', getUserContactsEmail)
router.post('/:userName/user/addTestToStudent/:email', checkPermission, addTestToStudent)
router.post('/:userName/user/deleteSolvedTest/:testID', checkPermission, deleteSolvedTest)
router.post('/:userName/user/deleteSelectedSolvedTest', checkPermission, deleteSelectedSolvedTest)
// router.post('/:userName/user/setSolvedTestToStudent', checkPermission, setSolvedTestToStudent)
router.post('/:userName/user/setSolvedTestToStudent', setSolvedTestToStudent)
router.get('/:userName/user/getUser', getUser)
router.delete('/:userName/user/deleteAdd2Contact/:id', checkPermission, deleteAdd2Contact)

//mail controller
router.post('/:userName/sendMessage', sendMessage)


module.exports = router;



