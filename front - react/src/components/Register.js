//*********integration to leader authentication system*******
//*********last modified by shir nassim 29.11.2020*************

//########important#######
//In all Ajax calls:
//If you have a stand alone server, you need to use your app url. 
//If you need to inegrate to leader system, use: https://api.leader.codes
//########important#######
import firebase from "firebase/app"
import "firebase/auth";
import "firebase/firestore";
import React, { useState } from "react"
import $ from "jquery";
import { connect } from 'react-redux';
import { actions } from '../store/actions'

//Global Variable
let userName
let provider

const firebaseConfig = { //here you insert your firbase configuration json=> you can get ot on your firebase app console.
    apiKey: "AIzaSyBfZ4ae-W40v1mPivzlPZ7g1ctjls3VwrM",
    authDomain: "leader-5fc0d.firebaseapp.com",
    databaseURL: "https://leader-5fc0d.firebaseio.com",
    projectId: "leader-5fc0d",
    storageBucket: "leader-5fc0d.appspot.com",
    messagingSenderId: "1014543713524",
    appId: "1:1014543713524:web:e76b414c151e7525888aa1",
    measurementId: "G-ZER890028H",
};

firebase.initializeApp(firebaseConfig);
// firebase.auth.Auth.Persistence.LOCAL;

function SignIn(e) {
    e.preventDefault();
    let password = $("input.password").val();
    let email = $("input.email").val();
    if (password != "" && email != "") {
        let res = firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(function (error) {
                alert(error);
                res.catch(function (error) {
                    let errorCode = error.code;
                    let errorMessage = error.message;
                    console.log(errorMessage);
                    console.log(errorCode);
                });
            });
    }
};

function SignUp(e) {
    let password = $("input#password").val();
    let email = $("input#email").val();
    userName = $("input#username").val();
    if (password != "" && email != "" && userName != "") {
        userNameAvailability(userName).then((res) => {
            console.log("enter to firebase", password, email)
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .catch(function (error) {
                    alert(error);
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(error);
                });
        }).catch((err) => {
            if (err == false)
                alert("This user name is already taken, please choose another one.")
            else
                alert("There was an error, please try again")
        })
    }
    else
        alert("Email and Password are required")
};



function onClick_google(e) {
    provider = new firebase.auth.GoogleAuthProvider();
    signInWithProvider(provider);
};

function signInWithProvider(base_provider) {
    firebase
        .auth()
        .signInWithPopup(base_provider)
        .then(function (result) {
            console.log(result);
            console.log("success");
        })
        .catch(function (err) {
            console.log(err);
            console.log("failed");
        });
}

firebase.auth().onAuthStateChanged(function (user) {
    {
        if (user) {
            firebase
                .auth()
                .currentUser.getIdToken(true)
                .then((firebaseToken) => {
                    $.ajax({
                        url: "api.dev.leader.codes/register/getAccessToken",
                        method: "post",
                        dataType: "json",
                        contentType: "application/json",
                        data: JSON.stringify({
                            action: "firebaseloginwithcredentials",
                            jwt: firebaseToken,
                        }),
                        success: function (data) {

                            checkPremission(data);
                        },
                    });
                })
                .catch(function (error) {
                    alert(error);
                });
        }
    }
});


function checkPremission(data) {
    let TokenToString = data.accessToken.toString();
    let dataToProfilePage = {
        action: "loginCheckPermission",
        token: TokenToString,
        username: userName
    };
    $.ajax({
        url: "https://api.dev.leader.codes/register/checkPremission",
        headers: {
            Authorization: TokenToString
        },
        method: "post",
        dataType: "json",
        contentType: "application/json",
        withCradentials: true,
        data: JSON.stringify(dataToProfilePage),
        success: function (data) {
            console.log(data)
            let jsonWebToken = data.jwt;
            let uid = data.uid;
            let noQuotesJwtData = jsonWebToken.split('"').join("");
            //save the jwt in cookie-
            //exchange ".{yourDomain}" with your app domain. 
            //don't forget to add "." before your domain name, in order to include all sub domains.
            let now = new Date();
            now.setMonth(now.getMonth() + 1);
            document.cookie = "jwt=" + noQuotesJwtData + ";domain=.{yourDomaim}" + "; path=/; Expires=" + now.toUTCString() + ";"
            //lines 150-163 are in order to handle redirect scenarios-> you will have to add a middleware to your sever side
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const des = urlParams.get('des')
            const routes = urlParams.get('routes')
            let redirectUrl = ''
            if (des) {
                redirectUrl = "https://" + des + '/' + userName;
                if (routes) {
                    redirectUrl += '/' + routes
                }
                window.location.href = redirectUrl
            } else {
                window.location.href = "https://lobby.leader.codes/" + userName
            }
        }
    });
}

function userNameAvailability(uName) {
    let userName = uName
    console.log(userName)
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "https://api.dev.leader.codes/register/usernameCheck",
            method: "post",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({ action: "userNameCheck", usernameToCheck: userName }),
            success: function (data) {
                console.log(data)
                if (!data.availability) {

                    reject(false)
                }
                else {
                    resolve(true)
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                reject(errorThrown)
            }
        });
    })
}

function mapStateToProps(state) {
    return {
        status: state.funnelReducer.status,
    };
}

const mapDispatchToProps = (dispatch) => ({
    changeStatus: (value) => dispatch(actions.changeStatus(value)),
})

function Register(props) {
    const [user, setUser] = useState("")
    return (
        <div className="d-flex container p-4" style={{ "width": "690px", "height": "874px", "border-radius": "0px 16px 16px 0px" }}>
            <form>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                            <a class="nav-item nav-link" href="#" onClick={(e) => props.changeStatus("sign in")}>
                                Sing In </a>
                            <a class="nav-item nav-link" href="#" onClick={(e) => props.changeStatus("sign up")} > Sign Up</a>
                        </div>
                    </div>
                </nav>

                <h2>Welcome to Quiz!</h2>
                <h2> Sign In to see latest updates.</h2>

                <div style={{ "font-feature-settings": "normal", "text-align": "-webkit-center", }}>
                    <button className="row mb-3" style={{ "border": "1px solid var(--unnamed-color-8d8d8d)", "border": "1px solid #8D8D8D", "border-radius": "7px", "opacity": "1" }}
                        onClick={(e) => onClick_google(e)}>
                        <img href="./assets/googleIcon.png" />
                        Sign In With Google
                </button>

                    <input
                        className="row mb-3"
                        type="email"
                        placeholder="Enter Email"
                        id="eamil"
                    // onChange={(e) => setUser(e.target.value)}
                    />
                    <input
                        className="row mb-3"
                        type="text"
                        placeholder="Enter Password"
                        id="password" />

                    {props.status == "sign up" &&
                        <input
                            className="row mb-3"
                            type="text"
                            placeholder="Enter  UserName"
                            id="username" />
                    }

                    <button className="btn" style={{ "backgroundColor": "#1AFFFC" }}
                        onClick={(e) => props.status == "sign in" ? SignIn(e) : SignUp(e)}>
                        Sign</button>
                </div>
            </form>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)