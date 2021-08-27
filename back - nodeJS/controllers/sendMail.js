// const commonmodels = require('@leadercodes/modelsnpm');
const router = require('express').Router();
const nodemailer = require("nodemailer");
const request = require('request');

const sendMessage = (async (req, res) => {
    const { body, list, subject } = req.body;

    // sendEmail = async (subject, body, emailTo, username) => {

    const email = {
        from: `noReplay@mails.codes`,//`${username}@mails.codes`,
        to: list,
        subject: subject,
        html: body
    }
    const options = {
        url: 'https://mails.codes/mail/sendEmail',
        method: 'POST',
        headers: { Authorization: "secretKEY@2021" },
        json: email,
    };
    return new Promise((resolve, reject) => {
        request(options, (error, res, body) => {
            if (error) {
                console.error("error:" + error);
                reject(error);
            }
            console.log(`statusCode: ${res.statusCode}`);
            console.log(body);
            resolve('sent')
        });
    });
});

module.exports = { sendMessage }

// const sendMessage = ((req, res) => {
//     const { body, list, subject } = req.body;
//     var email = {}
//     console.log(req.body, "email")
//     email = {
//         to: list,
//         from: "noreply@mail.leader.codes",
//         subject: subject,
//         html: body
//     }
//     const options = {
//         url: 'https://api.leader.codes/mail/sendEmail',
//         method: 'POST',
//         headers: { Authorization: "view" },
//         json: email,
//         // "data": JSON.stringify({"json": JSON.stringify(email) }),
//     };
//     return new Promise((resolve, reject) => {
//         request(options, (error, res, body) => {
//             if (error) {
//                 console.error("error:" + error);
//                 reject(error);
//             }
//             console.log(`statusCode: ${res.statusCode}`);
//             console.log(body);
//             resolve('sent')
//         });
//     });
// });

