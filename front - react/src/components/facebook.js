import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import FacebookLoginWithButton from 'react-facebook-login';

export default function App() {
    const [accessTokenUser, setAccessTokenUser] = useState('')
    const [accessTokenPage, setAccessTokenPage] = useState('')
    const [userId, setUserId] = useState('')
    const [pageId, setPageId] = useState('')
    const [formsList, setFormsList] = useState('')
    const [formsToMongo, setformsToMongo] = useState([])
    const [done, setDone] = useState(false)
    const [init, setInit] = useState(false)
    const [alertOnce, setAlertOnce] = useState(true)


    useEffect(() => {
        if (!init) {
            const script = document.createElement("script");
            script.src =
                window.fbAsyncInit = function () {
                    // wait for facebook sdk to initialize before starting the react app
                    window.fbAsyncInit = function () {
                        window.FB.init({
                            appId: 809377206520138,
                            cookie: true,
                            xfbml: true,
                            version: 'v2.0'
                        });
                    };

                    // load facebook sdk script
                    (function (d, s, id) {
                        var js, fjs = d.getElementsByTagName(s)[0];
                        if (d.getElementById(id)) { return; }
                        js = d.createElement(s); js.id = id;
                        js.src = "https://connect.facebook.net/en_US/all.js#xfbml=1&version=v2.0";
                        fjs.parentNode.insertBefore(js, fjs);
                    }(document, 'script', 'facebook-jssdk'));
                }

            script.async = true;

            const script2 = document.createElement("script");
            script2.async = window.defer
            script2.crossorigin = "anonymous"
            script.nonce = "KYdPjcPi"
            script2.src = "https://connect.facebook.net/en_US/sdk.js"
            document.body.appendChild(script);
            document.body.appendChild(script2);
            setInit(true)
        }

        if (done && alertOnce) {
            let formsName = ''
            formsList.map((form) => {
                formsName += form.name + ' AND '
            })
            alert(formsName + " forms data added to mongo")
            setAlertOnce(false)

            return
        }
        else if (alertOnce) {

            if (formsToMongo.length !== 0 && formsToMongo.length > (formsList.length - 1)) {

                // save on mongodb
                axios.post('http://localhost:9001/contactsFacebookForm/add', formsToMongo)
                    .then(res => console.log(res.data))
                    .then(setDone(true))
                    .catch((err) => console.log(err))
            }
            // get the leads of form
            else if (formsList !== '') {
                let tempFormsToMongo = []
                formsList.map((form) => {
                    const url2 = `${form.id}/leads`
                    let form_id = form.id
                    let form_name = form.name
                    window.FB.api(
                        url2,
                        'GET',
                        { access_token: accessTokenUser },
                        function (response) {
                            if (response && !response.error) {
                                let answers = []

                                response.data.map((data) => {
                                    let feeds = []
                                    data.field_data.map((item) => {
                                        feeds = feeds.concat({ [item['name']]: item['values'][0] })
                                    })
                                    const answer = {
                                        facebook_contact_id: data.id,
                                        time_of_submit_form: data.created_time,
                                        feeds: feeds
                                    };
                                    answers = answers.concat(answer)
                                })
                                const contactFacebookForm = {
                                    form_name: form_name,
                                    form_id: form_id,
                                    answers: answers
                                }
                                tempFormsToMongo = tempFormsToMongo.concat(contactFacebookForm)
                                setformsToMongo(formsToMongo => formsToMongo.concat(contactFacebookForm))
                            }
                        });
                })
            }
            //get all the forms of user
            else if (accessTokenPage !== '') {
                const url3 = `${pageId}/leadgen_forms`

                window.FB.api(
                    url3,
                    'GET',
                    { access_token: accessTokenPage },
                    function (response) {
                        if (response && !response.error) {
                            setFormsList(response.data)
                            console.log("formm " + response.data[0].id)
                        }
                    });
            }
            //get accessToken of the page
            else if (pageId !== '') {
                const url1 = `${pageId}/?fields=access_token`
                window.FB.api(
                    url1,
                    'GET',
                    { access_token: accessTokenUser },
                    function (response) {
                        if (response && !response.error) {
                            console.log("page " + response.access_token)
                            setAccessTokenPage(response.access_token)
                        }
                    });
            }
            //get the page of the user
            else if (userId !== '') {
                console.log(userId);
                const url = `${userId}/accounts/?fields=name`
                window.FB.api(
                    url,
                    'GET',
                    { access_token: accessTokenUser },
                    function (response) {
                        if (response && !response.error) {
                            response.data.map((data) => {
                                console.log("get page of user" + data)
                                setPageId(data.id)
                            })
                        }
                    });
            }
        }

    }, [init, userId, pageId, accessTokenPage, formsList, formsToMongo, done]);

    //get userId and accessToken of the user from login
    const responseFacebook = (response) => {
        console.log(response);
        setAccessTokenUser(response.accessToken)
        setUserId(response.userID)
        console.log("access token " + accessTokenUser)
        console.log("user id " + userId)
    }
    const componentClicked = () => {
        console.log("Clicked!")
    }

    return (
        <div>
            <FacebookLoginWithButton
                appId="809377206520138"
                fields="name,email,picture"
                onClick={componentClicked}
                callback={responseFacebook}
                icon="fa-facebook"
                version="3.1"
            />
        </div>
    )
}
