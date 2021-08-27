// const commonmodels = require('@leadercodes/modelsnpm');
// const User = commonmodels.models.user

const { keys } = require(`../config/keys`)

var request = require('request');
var router = require('express').Router();
var User = require('../models/user.model');

checkPermission = async (req, res, next) => {
    console.log("in checkPermission")

    const host = req.get('host');
    const isLocal = (req.query.isLocal == 'true');
    console.log(req.query)
    console.log("newIsLocal", isLocal);
    if (isLocal) {
        // let userName = req.originalUrl.split("/")[1];
        // let currentUser = await User.findOne({ username: userName })
        // let redirectUrl = host
        // let apiFlag = false
        // let urlRoute
        // console.log(currentUser, "->currentUser")
        // if (!currentUser)
        //     return res.status(401).json({ des: redirectUrl, routes: urlRoute, apiFlag: apiFlag, status: 401 })
        // else
        console.log("next!!  ", next)
        // return next();
    }
    console.log("in checkPermission", req.originalUrl.split("/"));
    let userName = req.originalUrl.split("/")[1];
    let apiFlag = false
    let urlRoute
    let redirectUrl = host //+ "/admin";
    if (userName == "api") {
        userName = req.originalUrl.split("/")[2];
        apiFlag = true
    }
    if (!apiFlag) urlRoute = req.originalUrl.split("/")[3]
    if (!userName) {
        console.log("no uid");
        return res.status(401).json({ des: redirectUrl, routes: urlRoute, apiFlag: apiFlag, status: 401 })
    }
    else {
        console.log(req.cookies);
        // const jwt = req.cookies.devJwt ? req.cookies.devJwt : req.headers['authorization'] ? req.headers['authorization'] : null
        // const jwt = req.cookies && req.cookies.devJwt ? req.cookies.devJwt : req.body.headers ? req.body.headers.authorization : req.headers['authorization']
        const jwt = req.cookies && req.cookies[keys(req.get('host')).JWT] ? req.cookies[keys(req.get('host')).JWT] : req.body.headers ? req.body.headers.authorization : req.headers['authorization']
        // const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJJV3hwYXFrV3RLYkl5TU1pWUxoSkR0NzVvUjkzIiwiZW1haWwiOiJ0em9maXlhQGxlYWRlci5jb2RlcyIsImlhdCI6MTYyMzMwNjY1NX0.m7H22KfDcMqtNE_OVuJ4-082Yt2T7UhB5zeq9aRUug0"
        const cookie = request.cookie(`jwt=${jwt}`)
        console.log("req.cookies.devJwt:  ", req.cookies.devJwt, "cookie:  ", cookie)
        console.log("jwt:  ", jwt)
        console.log(req.headers['authorization'], "req.headers['authorization']")
        const options = {
            method: "GET",
            url: `${keys(req.get('host')).API_URL_ACCOUNT}/isPermission/${userName}`,
            headers: { Cookie: cookie }
        };
        request(options, (error, response, body) => {
            console.log("response.statusCode", response.statusCode)
            console.log("body", typeof (body), body)
            if (error || response.statusCode != 200) {
                return res.status(401).json({ des: redirectUrl, routes: urlRoute, apiFlag: apiFlag, status: 401 })
            }
            else {
                console.log("userName", userName)
                if (body == 'true') {
                    console.log("no error!!!!!!!");
                    return next();
                }
                return res.status(401).json({ des: redirectUrl, routes: urlRoute, apiFlag: apiFlag, status: 401 })
            }
        });
    }
};


isPermission = async (req, res, next) => {
    console.log("in isPermission")
    let currentUser = await User.findOne({ username: req.params.userName })
    console.log("!!!!!!!!!!! " + currentUser)
    if (!currentUser) {
        let newUser = new User();
        const jwt = req.cookies.devJwt ? req.cookies.devJwt : req.headers['authorization'] ? req.headers['authorization'] : null
        const cookie = request.cookie(`jwt=${jwt}`)

        const options = {
            method: "GET",
            url: `${keys(req.get('host')).API_URL_ACCOUNT}/api/${req.params.userName}`,
            headers: { Cookie: cookie }
        };
        request(options, async (error, response, body) => {
            console.log("response.statusCode", response.statusCode)
            if (error || response.statusCode != 200) {
                return res.status(401).json({ des: redirectUrl, routes: urlRoute, apiFlag: apiFlag, status: 401 })
            }
            else {
                console.log("userName", req.params.userName)
                newUser.username = req.params.userName;
                newUser.email = JSON.parse(body).user.email
                await newUser.save();
            }
        });
    }
    res.status(200).send()
};



module.exports = {
    checkPermission, isPermission
}

// const leaderCheckPermission = async (req, res, next) => {
//     console.log("enter")
//     let userName = req.originalUrl.split("/")[1];
//     let redirectUrl = req.get('host')
//     let apiFlag = false
//     let urlRoute
//     console.log("req.originalUrl ", req.originalUrl)
//     console.log(userName, redirectUrl, urlRoute)
//     if (req.originalUrl.includes('sendGmailApi') || req.originalUrl.includes('saveContactsGoogle') || req.originalUrl.includes('ifGoogleContacts'))
//         return next();
//     if (userName == "api") {
//         userName = req.originalUrl.split("/")[2];
//         apiFlag = true
//         console.log("api", userName)
//     }
//     if (!apiFlag) urlRoute = req.originalUrl.split("/")[3]
//     console.log(req.headers["authorization"], "authorization")
//     if (req.headers["authorization"] == "null" || !req.headers["authorization"]) {
//         console.log("there is no authorization")
//         if (req.cookies && req.cookies.jwt) {
//             console.log("cookie");
//             req.headers["authorization"] = req.cookies.jwt
//         }
//         else {
//             console.log("error1 ", apiFlag, " ", urlRoute)
//             return res.status(401).json({ des: redirectUrl, routes: urlRoute, apiFlag: apiFlag, status: 401 })
//         }
//     }
//     if (!userName || !req.headers["authorization"]) {
//         {
//             console.log("error2 ", req.cookies.jwt)
//             return res.status(401).json({ des: redirectUrl, routes: urlRoute, apiFlag: apiFlag, status: 401 })
//         }

//     } else {
//         console.log(req.cookies.jwt, req.headers["authorization"])
//         const options = {
//             method: "GET",
//             url: `https://api.dev.leader.codes/isPermission/${userName}`,
//             headers: { Authorization: req.headers["authorization"] },
//         };
//         request(options, (error, response, body) => {
//             if (error || response.statusCode != 200) {
//                 {
//                     console.log("error3 ", req.cookies.jwt)
//                     // return urlRoute?
//                     // res.redirect('https://leader.codes/login'+'?des='+redirectUrl+'&routes='+urlRoute):
//                     // res.redirect('https://leader.codes/login'+'?des='+redirectUrl);}
//                     console.log("result", res.status(401).json({ des: redirectUrl, routes: urlRoute, apiFlag: apiFlag, status: 401 }))
//                     return res.status(401).json({ des: redirectUrl, routes: urlRoute, apiFlag: apiFlag, status: 401 })
//                 }
//             } else {
//                 console.log(body)
//                 // if(body==userName)
//                 if (body == "true")
//                     return next();
//                 else {
//                     return res.status(401).json({ des: redirectUrl, routes: urlRoute, apiFlag: apiFlag, status: 401 })
//                 }
//             }
//         }
//         );
//     }
// };






