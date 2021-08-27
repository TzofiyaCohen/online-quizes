import React, { useState, useEffect, useCallback } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        user: state.funnelReducer.jwt,
        userName: state.funnelReducer.userName
    }
}

function redirectToLogin() {
    window.location.href =
        `https://dev.accounts.codes/quiz/login`;

}

const ProtectedRoute = ({ component: Component, user, userName, ...rest }) => {
    console.log(userName)

    if (userName == "") {
        redirectToLogin()
    }

    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const isLocal = window.location.hostname == "localhost"
        const url = `https://quiz.leader.codes/${userName}/isPermission?isLocal=${isLocal}`;
        const isPermission = async () => {
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: user,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            if (response.status == 401) {
                setIsLoading(false)
                setIsLoggedIn(true)
            }
            else {
                setIsLoading(false)
            }
        }
        isPermission()
    }, [])

    return isLoading ? null : isLoggedIn ?

        redirectToLogin()
        : <Route {...rest} render={props => { return <Component {...rest} {...props} /> }} />
}

export default connect(mapStateToProps)(ProtectedRoute)


// import React, { useState, useEffect, useCallback } from 'react'
// import { Route, Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';
// import axios from "axios";


// function mapStateToProps(state) {
//     return {
//         jwt: state.funnelReducer.jwt,
//         userName: state.funnelReducer.userName
//     }
// }

// function redirectToLogin() {
//     window.location.href =
//         `https://dev.accounts.codes/quiz/login`;
// }

// const ProtectedRoute = ({ component: Component, jwt, userName, ...rest }) => {
//     const [isLoading, setIsLoading] = useState(true);
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     // useEffect(() => {
//     //     const isLocal = window.location.hostname == "localhost"
//     //     const url = `https://quiz.leader.codes/${userName}/isPermission?isLocal=${isLocal}`;
//     //     const isPermission = async () => {
//     //         let response = await fetch(url, {
//     //             method: 'GET',
//     //             headers: {
//     //                 Authorization: jwt,
//     //                 Accept: 'application/json',
//     //                 'Content-Type': 'application/json'
//     //             },
//     //         })
//     //         console.log(response)
//     //         if (response.status == 401) {
//     //             setIsLoading(false)
//     //             setIsLoggedIn(true)
//     //             redirectToLogin()
//     //         }
//     //         else {
//     //             setIsLoading(false)
//     //         }
//     //     }
//     //     isPermission()
//     // }, [])


//     useEffect(() => {
//         const isLocal = window.location.hostname == "localhost"
//         const url = `https://quiz.leader.codes/${userName}/isPermission?isLocal=${isLocal}`;
//         const isPermission = async () => {
//             axios.get(`https://quiz.leader.codes/${userName}/isPermission?isLocal=${isLocal}`,
//                 {
//                     headers: {
//                         'authorization': jwt,
//                         Accept: 'application/json',
//                         'Content-Type': 'application/json'
//                     }
//                 })
//                 .then(res => {
//                     console.log(res.data)
//                     setIsLoading(false)
//                 })
//                 .catch(result => {
//                     console.log(result)
//                     console.log(jwt)

//                     if (result.response.status == "401") {
//                         setIsLoading(false)
//                         setIsLoggedIn(true)
//                         window.location =
//                             //   `https://dev.accounts.codes/quiz/login?routes=${result.routes}` :
//                             `https://dev.accounts.codes/quiz/login`;
//                     }
//                     else {
//                         setIsLoading(false)
//                         console.log("in else")
//                     }
//                 });

//         }
//         isPermission()
//     }, [])


//     return isLoading ? null : isLoggedIn ?

//         redirectToLogin()
//         : <Route {...rest} render={props => { return <Component {...rest} {...props} /> }} />
// }

// export default connect(mapStateToProps)(ProtectedRoute)