import { actions } from '../actions';
import axios from "axios";
import $ from "jquery";


// const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJveDk4OVlEV3NZUHB6eVVnR2Vqc2NQRnRiV1QyIiwiZW1haWwiOiJ0em9maXlhQGxlYWRlci5jb2RlcyIsImlhdCI6MTYxMTA1OTE3N30.e7jS-4tnzJ1YxdCIAofmOHstlCYM_IsL4slczV9tLkU'
function checkPermission2(result) {
    console.log(result)
    return new Promise((resolve, reject) => {
        if (result.response.data.status == "401") {
            result.routes ?
                window.location.assign(`https://dev.leader.codes/login?des=${result.response.data.des}'&routes='${result.routes}`) :
                window.location.assign(`https://dev.leader.codes/login?des=${result.response.data.des}`)
            reject(false)
        }
        resolve(true)
    })
}

function checkPermission(result) {

    if (result.status == "401") {
        window.location.href = result.routes ?
            `https://dev.accounts.codes/quiz/login?routes=${result.routes}` :
            `https://dev.accounts.codes/quiz/login`;
        return false
    }
    return true
}

//update tests that teacher need to check
export const setSolvedTestToStudent = ({ dispatch, getState }) => next => action => {

    if (action.type === 'SET_SOLVED_TEST_TO_STUDENT') {

        const info = {
            solvedTest: action.payload.solvedTest,
            contact_email: action.payload.email,
            test_creator: getState().testReducer.test.creator,
            name: action.payload.name,
        }

        // axios.post(`https://quiz.leader.codes/api/${getState().funnelReducer.userName}/user/setSolvedTestToStudent/${action.payload.contact_email}`, action.payload.solvedTest,
        axios.post(`https://quiz.leader.codes/api/${getState().funnelReducer.userName}/user/setSolvedTestToStudent`, info,
            {
                // headers: { 'authorization': getState().user.tokenFromCookies }
                headers: { 'authorization': getState().funnelReducer.jwt }
            })
            .then(res => {
                console.log(res.data);
                // window.history.back()
                // window.close();
                dispatch(actions.setStudentFinish(true))
                dispatch(actions.sendEmailWithGrade(res.data))
                dispatch(actions.boxSystemWave(action.payload.name))
            })
            .catch(err => {
                console.log(err)
                console.log("err")
            });
    }
    return next(action);
};
export const sendEmailWithGrade = ({ dispatch, getState }) => next => action => {

    if (action.type === 'SEND_EMAIL_WITH_GRADE') {
        console.log("enter to send grade")
        const resArray = action.payload[0]
        console.log(resArray, "resArray")
        console.log(action.payload, "action.payload")
        console.log(resArray.userName, "resArray.userName")
        var details = {
            body: resArray.kind === "quiz" ?
                `<div><p>Hello ${resArray.userName} </p>
                        <p>Your grade in ${resArray.testName} is ${parseInt(resArray.grade)}</p>
                        <a href='https://quiz.leader.codes/'>Create your own quiz</a>
                        </div>`
                : resArray.kind === "survey" ?
                    `<div><p>Hello ${resArray.userName} </p>
                        <p>Thank you for taking ${resArray.testName}survey</p>
                        <a href='https://quiz.leader.codes/'>Create your own survey</a>
                        </div>`
                    :
                    `<div><p>Hello ${resArray.userName} </p>
                        <p>Thank you for attending to ${resArray.testName} position</p>
                        <a href='https://quiz.leader.codes/'>Create your own quiz</a>
                        </div>`,
            list: `${resArray.email}`,
            subject: resArray.kind === "quiz" ? `Your grade in ${resArray.testName} is ready`
                : `<p>Thank you for taking ${resArray.testName}survey</p>`
        }


        axios.post(`https://quiz.leader.codes/api/${getState().funnelReducer.userName}/sendMessage`, details,
            {
                headers: {
                    'authorization': getState().funnelReducer.jwt
                }
            })
            .then(res => {
                console.log(res.data);
            })
            .catch(err =>
                console.log(err));
    }
    return next(action);
};


export const boxSystemWave = ({ dispatch, getState }) => next => action => {

    if (action.type === 'BOX_SYSTEM_WAVE') {
        console.log("enter to boxSystemWave")

        var details = {
            subject: `${action.payload} has submitted your quiz`,
            body: `<div> <p>Hello, ${action.payload} has submitted your quiz.</p>
            <p> Enter to <a href='https://quiz.leader.codes/'>Quiz</a> to see the data </p> </div>`,
            to: [`${getState().funnelReducer.userName}`],
            from: "quiz@noreply.leader.codes",
            source: "Quiz",
            files: null
        }
        //https://api.dev.leader.codes/createSystemWave
        // https://api.dev.leader.codes/USERNAME/createSystemWave
        axios.post(`https://api.dev.leader.codes/createSystemWave`, details)
            .then(res => {
                console.log(res.data);
            })
            .catch(err =>
                console.log(err));
    }
    return next(action);
};

export const addTestToStudent = ({ dispatch, getState }) => next => action => {
    if (action.type === 'ADD_TEST_TO_STUDENT') {
        console.log("addtesttostudent enter", action.payload, "payload")
        axios.post(`https://quiz.leader.codes/api/${getState().funnelReducer.userName}/user/addTestToStudent/` + action.payload.email, action.payload.test,
            {
                headers: {
                    'authorization': getState().funnelReducer.jwt
                }
            })
            .then(res => {
                console.log(res.data);
                window.location = `/${getState().funnelReducer.userName}/`;
            })
            .catch(result => {
                console.log(result.response)
                if (result.response.status == "401") {
                    window.location =
                        //   `https://dev.accounts.codes/quiz/login?routes=${result.routes}` :
                        `https://dev.accounts.codes/quiz/login`;
                    return false
                }
                return true
            });
    }
    return next(action);
};

export const uploudFile = ({ dispatch, getState }) => next => action => {
    if (action.type === 'UPLOUD_FILE') {
        console.log("'UPLOUD_FILE' enter", action.payload, "payload")
        var formData = new FormData
        var files = action.payload.file//this.state.uploadFile
        var myFiles = Object.values(files)
        if (myFiles.length < 1) alert("ooops... not files to upload")
        else
            myFiles.forEach((file, index) => {
                formData.append("files" + index, file)
                if ((file.size) > 64634689) {//
                    alert(
                        `sorry, the file ${file.name} is too big file, Please try smaller file`
                    );
                    dispatch(actions.setIsFileBig(true))
                }
            })
        if (!getState().funnelReducer.isFileBig && !!formData.entries().next().value === true) {
            $.ajax({
                xhr: () => {
                    let xhr = new XMLHttpRequest();

                    xhr.upload.onloadstart = function () {
                        if (action.payload.type === 'video')
                            dispatch(actions.setIsProgressBar(true))
                        if (action.payload.type === 'image') {
                            var index = action.payload.index
                            var value = ''
                            dispatch(actions.inputImageQuestion({ index, value }))
                            dispatch(actions.isLoaderUploadImg({ type: 'quest', index: action.payload.index }))
                            dispatch(actions.isLoaderUpload(true))
                            // dispatch(actions.setIsProgressBarImage({ index: action.payload.index, value: true }))
                        }
                        if (action.payload.type === 'imageAns') {
                            var questIndex = action.payload.index
                            var value = ''
                            var ansIndex = action.payload.ansIndex
                            dispatch(actions.AnswerPicture({ questIndex, ansIndex, value }))
                            dispatch(actions.isLoaderUploadImg({ type: 'ans', index: ansIndex, questIndex: questIndex }))
                            dispatch(actions.isLoaderUpload(true))
                        }
                        console.log("Upload has started.");
                    };
                    xhr.upload.onprogress = (event) => {
                        let uploadedBytes = (event.loaded / event.total) * 100;
                        console.log(`Uploaded ${uploadedBytes} bytes 072-2467000
                      `);
                        dispatch(actions.setLoadedAjax1(uploadedBytes))
                        //this.setState({ loadedAjax1: uploadedBytes });
                        if (uploadedBytes > 90) {
                            dispatch(actions.setLoadedAjax1(90))
                            //this.setState({ loadedAjax1: 90 });
                        }
                        if (uploadedBytes === 100) {
                            // dispatch(actions.setIsProgressBar(false));

                            // if (action.payload.type == 'image')
                            //     dispatch(actions.setIsProgressBarImage({ index: action.payload.index, value: false }));
                            if (action.payload.type === 'video')
                                dispatch(actions.setDisplayVideo(true));

                        }


                        // if (this.state.cancel == true) {
                        //     xhr.abort();
                        // }
                    };

                    xhr.upload.onload = function () {
                        console.log("Upload completed successfully.");
                    };

                    xhr.upload.onerror = function () {
                        console.log(`Error during the upload: ${xhr.status}.`);
                    };
                    return xhr;
                },
                url: "https://files.codes/api/" + getState().funnelReducer.userName + "/uploadMultipleFiles",
                method: 'post',
                contentType: false,
                processData: false,
                headers: { "authorization": "liveChat/userWithOutJwt" },
                data: formData,
                success: (data) => {
                    var myData = { "files": data.filesData }
                    console.log("finish first ajax  " + JSON.stringify(myData));
                    if (action.payload.type === 'video') {
                        dispatch(actions.setIsProgressBar(false));
                        dispatch(actions.setVideo(myData.files.files0.url))
                    }
                    if (action.payload.type === 'cv')
                        dispatch(actions.setCvFile(myData.files.files0.url))
                    if (action.payload.type === 'image') {
                        var index = action.payload.index
                        var value = myData.files.files0.url
                        // dispatch(actions.setIsProgressBarImage({ index: action.payload.index, value: false }));
                        dispatch(actions.inputImageQuestion({ index, value }))
                        dispatch(actions.isLoaderUpload(false))
                    }
                    if (action.payload.type === 'imageAns') {
                        var questIndex = action.payload.index
                        var value = myData.files.files0.url
                        var ansIndex = action.payload.ansIndex
                        dispatch(actions.AnswerPicture({ questIndex, ansIndex, value }))
                        dispatch(actions.isLoaderUpload(false))
                    }
                    // console.log("myData", myData)
                    // console.log("url" ,myData.files.files0.url)
                    setTimeout(() => {
                        $.ajax({
                            xhr: () => {
                                let xhr = new XMLHttpRequest();

                                xhr.upload.onloadstart = function () {
                                    console.log("Upload has started.");
                                };
                                if (xhr.status == 413) {
                                    alert('the file is too big')
                                }
                                xhr.upload.onprogress = (event) => {
                                    let uploadedBytes = (event.loaded / event.total) * 10;
                                    console.log(`Uploaded ${uploadedBytes} bytes`);
                                    dispatch(actions.setLoadedAjax2(uploadedBytes))
                                    //   this.setState({
                                    //     loadedAjax2: uploadedBytes,
                                    //     progressColor: "success",
                                    //   });
                                };

                                xhr.upload.onload = () => {
                                    console.log("Upload completed successfully.");

                                };

                                xhr.upload.onerror = function () {
                                    console.log(`Error during the upload: ${xhr.status}.`);
                                };
                                return xhr;
                            },
                            url: "https://files.codes/api/" + getState().funnelReducer.userName + "/savedMultiFilesDB",
                            method: 'POST',
                            headers: { "authorization": "liveChat/userWithOutJwt" },
                            data: myData,
                            success: (data) => {
                                // alert("upload success");
                                console.log("upload success", data)
                            }
                        })
                    }, 2000);
                }
            })
        }
    }
    return next(action);
};

export const getStudentUser = ({ dispatch, getState }) => next => action => {

    if (action.type === 'GET_STUDENT_USER') {
        //find the teacher that send the test
        axios.get(`https://quiz.leader.codes/api/${getState().funnelReducer.userName}/user/getStudentUser`,
            {
                headers: {
                    'authorization': getState().funnelReducer.jwt
                }
            })
            .then(response => {
                console.log(response.data)
                dispatch(actions.setSolvedTestToStudent(
                    {
                        solvedTest: action.payload,
                        studentUser_id: response.data._id
                    }))
            })
            .catch(result => {
                console.log(result.response)
                if (result.response.status === "401") {
                    window.location =
                        //   `https://dev.accounts.codes/quiz/login?routes=${result.routes}` :
                        `https://dev.accounts.codes/quiz/login`;
                    return false
                }
                return true
            });
    }
    return next(action);
};

//get the teacher from mongo and set in store
export const setUserAsTeacher = ({ dispatch, getState }) => next => action => {

    if (action.type === 'SET_USER_AS_TEACHER') {

        const userName = {
            userName: action.payload
        }
        //add the teacher if not exist
        axios.get(`https://quiz.leader.codes/api/${getState().funnelReducer.userName}/teacher/add`,
            {
                headers: {
                    'authorization': getState().funnelReducer.jwt
                }
            })
            .then(res => console.log(res.data))
            .catch(result => {
                console.log(result.response)
                if (result.response.status == "401") {
                    window.location =
                        //   `https://dev.accounts.codes/quiz/login?routes=${result.routes}` :
                        `https://dev.accounts.codes/quiz/login`;
                    return false
                }
                return true
            });

        //get the teacher and save in reducer
        axios.get(`https://quiz.leader.codes/api/${getState().funnelReducer.userName}/teacher/getTeacher`,
            {
                headers: {
                    'authorization': getState().funnelReducer.jwt
                }
            })
            .then(response => {
                dispatch(actions.setTeacher({
                    id: response.data._id,
                    userName: response.data.userName,
                    testToCheck: response.data.testToCheck,
                    checkedTest: response.data.checkedTest
                }))
            })
            .catch(result => {
                console.log(result.response)
                if (result.response.status == "401") {
                    window.location =
                        //   `https://dev.accounts.codes/quiz/login?routes=${result.routes}` :
                        `https://dev.accounts.codes/quiz/login`;
                    return false
                }
                return true
            });
    }
    return next(action);
};

//remove test form to check list and add to checked
export const changeTestList = ({ dispatch, getState }) => next => action => {

    if (action.type === 'CHANGE_TEST_LIST') {
        const checkedTest = getState().teacherReducer.teacher.checkedTest;
        checkedTest.push(action.payload.currentTest)
        const details = {
            testID: action.payload.testID,
            checkedTest: checkedTest
        }
        axios.post(`https://quiz.leader.codes/api/${getState().funnelReducer.userName}/teacher/changeTestList/` + action.payload.teacherID, details,
            {
                headers: {
                    'authorization': getState().funnelReducer.jwt
                }
            })
            .then(res => {
                console.log(res.data);
                // window.location = `/${getState().funnelReducer.userName}/`;
            })
            .catch(err => console.log(err));
    }
    return next(action);
};

export const importImgFromPexels = ({ dispatch, getState }) => next => action => {

    if (action.type === 'IMPORT_IMG_FROM_PEXELS') {
        const url = 'https://api.pexels.com/v1/search?query=' + action.payload + '&per_page=' + '12'
        const access_token = '563492ad6f91700001000001c9aa1c9c299140868ad7dbc9800cace2';
        axios.get(url,
            {
                headers: {
                    'authorization': `${access_token}`
                }
            })
            .then(data => {
                console.log(data);
                dispatch(actions.setTestArrImg(data.data.photos))
                // window.location = `/${getState().funnelReducer.userName}/`;
            })
            .catch(err => {
                console.log(err)
            });
    }
    return next(action);
};


//delete test to check from teacher
export const deleteToCheckTest = ({ dispatch, getState }) => next => action => {

    if (action.type === 'DELETE_TO_CHECK_TEST') {
        const details = {
            testID: action.payload.testID,
        }
        axios.post(`https://quiz.leader.codes/api/${getState().funnelReducer.userName}/teacher/removeFromToCheck/` + action.payload.teacherID, details,
            {
                headers: {
                    'authorization': getState().funnelReducer.jwt
                }
            })
            .then(res => console.log(res.data, dispatch(actions.deleteToCheckTest(action.payload.testID))))
            .catch(err => console.log(err));
    }
    return next(action);
};

//delete test to check from teacher
export const deleteSolvedTest = ({ dispatch, getState }) => next => action => {

    if (action.type === 'DELETE_SOLVED_TEST') {

        axios.post(`https://quiz.leader.codes/api/${getState().funnelReducer.userName}/user/deleteSolvedTest/${action.payload}`,
            {
                headers: {
                    'authorization': getState().funnelReducer.jwt
                }
            })
            .then(res => {
                console.log(res.data, "delete solved test")
                dispatch(actions.updateSolvedTest(action.payload))
                // dispatch(actions.deleteCheckedTest(action.payload.testID))
            })
            .catch(result => {
                console.log(result.response)
                if (result.response.status == "401") {
                    window.location =
                        //   `https://dev.accounts.codes/quiz/login?routes=${result.routes}` :
                        `https://dev.accounts.codes/quiz/login`;
                    return false
                }
                return true
            });
    }
    return next(action);
};

export const addTest = ({ dispatch, getState }) => next => action => {
    if (action.type === 'ADD_TEST') {
        axios.post(`https://quiz.leader.codes/api/${getState().funnelReducer.userName}/tests/add`, action.payload,
            {
                headers: {
                    'authorization': getState().funnelReducer.jwt
                }
            })
            .then((res) => {
                console.log(res.data)
                //update id of the current test
                dispatch(actions.setIdTest(res.data._id))
                //if inprogress and saved
                dispatch(actions.setStatusSaved(true))
                //if the test need to be send
                if (getState().testReducer.test.sendTo_email.list.length > 0) {
                    const mailInfo = {
                        // body: `<h1><a href="https://quiz.leader.codes/${getState().funnelReducer.userName}/answerTest/${res.data._id}/${getState().testReducer.test.sendTo_email.list}"> please take a test in ${res.data.test_name}</a ></h1 >`,
                        body: `<h1><a href="https://quiz.leader.codes/${getState().funnelReducer.userName}/answerTest/${res.data._id}"> please take a test in ${res.data.test_name}</a ></h1 >`,
                        list: getState().testReducer.test.sendTo_email.list,
                        subject: "Hello, you need to take a test"
                    }
                    dispatch(actions.sendMail(mailInfo))
                    dispatch(actions.createContact())
                    dispatch(actions.addTestToStudent({
                        test: getState().testReducer.test,
                        email: getState().testReducer.test.sendTo_email.list
                    }))
                }
                //                 
                else if (getState().funnelReducer.numStep === "3" && !getState().funnelReducer.isFinishTest && getState().funnelReducer.isOnPopUp)
                    window.location = `/${getState().funnelReducer.userName}/`;
            })
            .catch(result => {
                console.log(result.response)
                if (result.response.status == "401") {
                    window.location =
                        //   `https://dev.accounts.codes/quiz/login?routes=${result.routes}` :
                        `https://dev.accounts.codes/quiz/login`;
                    return false
                }
                return true
            });
    }
    return next(action);
};

export const sendMail = ({ dispatch, getState }) => next => action => {

    if (action.type === 'SEND_MAIL') {
        console.log("sending email..")
        axios.post(`https://quiz.leader.codes/api/${getState().funnelReducer.userName}/sendMessage`, action.payload,
            {
                headers: {
                    'authorization': getState().funnelReducer.jwt
                }
            })
            .then(res => {
                console.log(res.data, "email has send")
                dispatch(actions.setSendMail({ value: true, from: "from crud" }))
            })
            .catch(err => {
                console.log(err)
            })
    }
    return next(action);
};
export const getTest = ({ dispatch, getState }) => next => action => {

    if (action.type === 'GET_TEST') {

        axios.get(`https://quiz.leader.codes/api/${getState().funnelReducer.userName}/tests/` + action.payload,
            {
                headers: {
                    'authorization': getState().funnelReducer.jwt
                }
            })
            .then(response => {
                dispatch(actions.setTest(
                    {
                        id: action.payload,
                        testName: response.data.test_name,
                        // duration: response.data.duration,
                        time_days: response.data.time_days,
                        time_hours: response.data.time_hours,
                        time_minutes: response.data.time_minutes,
                        questions: response.data.questions,
                        openTest: response.data.openTest,
                        description: response.data.description,
                        userName: getState().funnelReducer.userName,
                        backgroundImage: response.data.backgroundImage,
                        targetAudience: response.data.targetAudience,
                        kind: response.data.kind,
                        status: response.data.status,
                        creator: response.data.creator,
                        color: response.data.color,
                        date: response.data.lastOpened,
                        displayVideo: response.data.displayVideo,
                        video: response.data.video,
                    }
                ))
                dispatch(actions.setTestToStudent(
                    {
                        id: action.payload,
                        testName: response.data.test_name,
                        // duration: response.data.duration,
                        time_days: response.data.time_days,
                        time_hours: response.data.time_hours,
                        time_minutes: response.data.time_minutes,
                        questions: response.data.questions,
                        openTest: response.data.openTest,
                        description: response.data.description,
                        backgroundImage: response.data.backgroundImage,
                        cheating: response.data.cheating,
                        targetAudience: response.data.targetAudience,
                        kind: response.data.kind,
                        color: response.data.color,
                        displayVideo: response.data.displayVideo,
                        video: response.data.video,
                        creator: response.data.creator,
                    }
                ))
            })
            .catch(result => {
                console.log(result)
                // if (result.response.status == "401") {
                //     window.location =
                //         //   `https://dev.accounts.codes/quiz/login?routes=${result.routes}` :
                //         `https://dev.accounts.codes/quiz/login`;
                //     return false
                // }
                // return true
            });
    }
    return next(action);
};

export const getAllTests = ({ dispatch, getState }) => next => action => {
    if (action.type === 'GET_ALL_TESTS') {
        axios.get(`https://quiz.leader.codes/api/${getState().funnelReducer.userName}/tests`,
            {
                headers: {
                    'authorization': getState().funnelReducer.jwt

                }
            })
            .then(response => {
                dispatch(actions.setAllTests(response.data))
                if (getState().funnelReducer.displayTest === "all") {
                    dispatch(actions.setFilteredTests({ data: response.data, from: "getall" }))
                    dispatch(actions.setSortTestsCopy())
                }
                if (action.payload.copy) //if copy is true
                    dispatch(actions.setCopyTest(false))
            })
            .catch(result => {
                console.log(result.response)
                console.log({ result })
                if (result.response.status == "401") {
                    window.location.href = result.routes ?
                        `https://dev.accounts.codes/quiz/login?routes=${result.routes}` :
                        `https://dev.accounts.codes/quiz/login`;
                    return false
                }
                return true
            });
    }
    return next(action);
};
export const deleteTest = ({ dispatch, getState }) => next => action => {
    if (action.type === 'DELETE_TEST') {
        axios.delete(`https://quiz.leader.codes/api/${getState().funnelReducer.userName}/tests/` + action.payload,
            {
                headers: {
                    'authorization': getState().funnelReducer.jwt
                }
            })
            .then(response => {
                console.log(response.data)
                dispatch(actions.updateTrashedTest(action.payload))
            })
            .catch(result => {
                console.log(result.response)
                console.log(typeof (result))
                if (result.response.status == "401") {
                    window.location.href = result.routes ?
                        `https://dev.accounts.codes/quiz/login?routes=${result.routes}` :
                        `https://dev.accounts.codes/quiz/login`;
                    return false
                }
                return true
            });
    }
    return next(action);
};

export const deleteAddContact = ({ dispatch, getState }) => next => action => {
    if (action.type === 'DELETE_ADD_CONTACT') {
        axios.delete(`https://quiz.leader.codes/api/${getState().funnelReducer.userName}/user/deleteAdd2Contact/` + action.payload,
            {
                headers: {
                    'authorization': getState().funnelReducer.jwt
                }
            })
            .then(response => {
                console.log(response.data)
                dispatch(actions.updateTrashedTest(action.payload))
            })
            .catch(result => {
                console.log(result.response)
                console.log(typeof (result))
                if (result.response.status == "401") {
                    window.location.href = result.routes ?
                        `https://dev.accounts.codes/quiz/login?routes=${result.routes}` :
                        `https://dev.accounts.codes/quiz/login`;
                    return false
                }
                return true
            });
    }
    return next(action);
};

export const copyTest = ({ dispatch, getState }) => next => action => {
    if (action.type === 'COPY_TEST') {
        axios.post(`https://quiz.leader.codes/api/${getState().funnelReducer.userName}/tests/copy/` + action.payload,
            {
                headers: {
                    'authorization': getState().funnelReducer.jwt
                }
            })
            .then(response => {
                dispatch(actions.setCopyTest(true))
                dispatch(actions.getAllTests())
                dispatch(actions.numOfTested())
                dispatch(actions.average())
            })
            .catch(result => {
                console.log(result.response)
                console.log(typeof (result))
                if (result.response.status == "401") {
                    window.location.href = result.routes ?
                        `https://dev.accounts.codes/quiz/login?routes=${result.routes}` :
                        `https://dev.accounts.codes/quiz/login`;
                    return false
                }
                return true
            });
    }
    return next(action);
};

export const copySolvedTest = ({ dispatch, getState }) => next => action => {
    if (action.type === 'COPY_SOLVED_TEST') {
        axios.post(`https://quiz.leader.codes/api/${getState().funnelReducer.userName}/user/copySolvedTest/${action.payload}`,
            {
                headers: {
                    'authorization': getState().funnelReducer.jwt
                }
            })
            .then(response => {
                dispatch(actions.setCopyTest(true))
            })
            .catch(result => {
                console.log(result.response)
                if (result.response.status == "401") {
                    window.location =
                        //   `https://dev.accounts.codes/quiz/login?routes=${result.routes}` :
                        `https://dev.accounts.codes/quiz/login`;
                    return false
                }
                return true
            });
    }
    return next(action);
};

export const copySelectedTest = ({ dispatch, getState }) => next => action => {
    if (action.type === 'COPY_SELECTED_TEST') {
        var selectedTest = getState().funnelReducer.selectedTest
        axios.post(`https://quiz.leader.codes/api/${getState().funnelReducer.userName}/tests/copySelected`, selectedTest,
            {
                headers: {
                    'authorization': getState().funnelReducer.jwt
                }
            })
            .then(res => {
                console.log(res.data)
                dispatch(actions.getAllTests())
                dispatch(actions.numOfTested())
                dispatch(actions.average())
            })
            .catch(result => {
                console.log(result.response)
                if (result.response.status == "401") {
                    window.location =
                        //   `https://dev.accounts.codes/quiz/login?routes=${result.routes}` :
                        `https://dev.accounts.codes/quiz/login`;
                    return false
                }
                return true
            });
    }
    return next(action);
};

export const deleteSelectedTest = ({ dispatch, getState }) => next => action => {
    if (action.type === 'DELETE_SELECTED_TEST') {
        var selectedTest = getState().funnelReducer.selectedTest
        axios.post(`https://quiz.leader.codes/api/${getState().funnelReducer.userName}/tests/deleteSelected`, selectedTest,
            {
                headers: {
                    'authorization': getState().funnelReducer.jwt
                }
            })
            .then(res => {
                console.log(res.data)
                selectedTest.forEach(element => {
                    dispatch(actions.updateTrashedTest(element))
                    dispatch(actions.updateFiltered({ restore: false, id: element }))
                });
            })
            .catch(result => {
                console.log(result.response)
                console.log(typeof (result))
                if (result.response.status == "401") {
                    window.location.href = result.routes ?
                        `https://dev.accounts.codes/quiz/login?routes=${result.routes}` :
                        `https://dev.accounts.codes/quiz/login`;
                    return false
                }
                return true
            });
    }
    return next(action);
};

export const deleteSelectedSolvedTest = ({ dispatch, getState }) => next => action => {
    if (action.type === 'DELETE_SELECTED_SOLVED_TEST') {
        var selectedTest = getState().funnelReducer.selectedTest
        axios.post(`https://quiz.leader.codes/api/${getState().funnelReducer.userName}/user/deleteSelectedSolvedTest`, selectedTest,
            {
                headers: {
                    'authorization': getState().funnelReducer.jwt
                }
            })
            .then(res => {
                console.log(res.data)
                selectedTest.forEach(element => {
                    dispatch(actions.updateSolvedTest(element))
                    dispatch(actions.updateFiltered({ restore: false, id: element }))
                });
            })
            .catch(result => {
                console.log(result.response)
                if (result.response.status == "401") {
                    window.location =
                        //   `https://dev.accounts.codes/quiz/login?routes=${result.routes}` :
                        `https://dev.accounts.codes/quiz/login`;
                    return false
                }
                return true
            });
    }
    return next(action);
};
export const toTrash = ({ dispatch, getState }) => next => action => {
    if (action.type === 'TO_TRASH') {
        axios.post(`https://quiz.leader.codes/api/${getState().funnelReducer.userName}/tests/toTrash/` + action.payload,
            {
                headers: {
                    'authorization': getState().funnelReducer.jwt
                }
            })
            .then(res => {
                console.log('passed to trash')
            })
            .catch(result => {
                console.log(result.response)
                console.log(typeof (result))
                if (result.response.status == "401") {
                    window.location.href = result.routes ?
                        `https://dev.accounts.codes/quiz/login?routes=${result.routes}` :
                        `https://dev.accounts.codes/quiz/login`;
                    return false
                }
                return true
            });
    }
    return next(action);
};

export const toListFromTrash = ({ dispatch, getState }) => next => action => {
    if (action.type === 'TO_LIST_FROM_TRASH') {
        axios.post(`https://quiz.leader.codes/api/${getState().funnelReducer.userName}/tests/toListFromTrash/` + action.payload,
            {
                headers: {
                    'authorization': getState().funnelReducer.jwt
                }
            })
            .then(res => {
                console.log('passed to list from trash')
            })
            .catch(result => {
                console.log(result.response)
                console.log(typeof (result))
                if (result.response.status == "401") {
                    window.location.href = result.routes ?
                        `https://dev.accounts.codes/quiz/login?routes=${result.routes}` :
                        `https://dev.accounts.codes/quiz/login`;
                    return false
                }
                return true
            });
    }
    return next(action);
};


// export const toTrashFetch = ({ dispatch, getState }) => next => action => {
//     if (action.type === 'TO_TRASH_FETCH') {

//         fetch(`https://quiz.leader.codes/api/${getState().funnelReducer.userName}/tests/toTrash/`, {
//             method: 'POST', // or 'PUT'
//             headers: {
//                 'authorization': getState().funnelReducer.jwt,
//                 Accept: 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(action.payload), //action.payload
//         })
//             .then(
//                 result => {
//                     //response.json()
//                     console.log(result)
//                     console.log(typeof (result))
//                     if (result.status == "401") {
//                         window.location.href = result.routes ?
//                             `https://dev.accounts.codes/quiz/login?routes=${result.routes}` :
//                             `https://dev.accounts.codes/quiz/login`;
//                         return false
//                     }
//                     return true
//                 })
//             .then(data => {
//                 console.log('passed to trash')
//                 //console.log('Success:', data);
//             })
//             .catch((error) => {
//                 console.error('Error:', error);
//             })

//         return next(action);
//     }
// };


export const updateTest = ({ dispatch, getState }) => next => action => {
    if (action.type === 'UPDATE_TEST') {
        axios.post(`https://quiz.leader.codes/api/${getState().funnelReducer.userName}/tests/update/` + action.payload.testID, action.payload.updatedTest,
            {
                headers: {
                    'authorization': getState().funnelReducer.jwt
                }
            })
            .then(res => {
                console.log(res.data)
                dispatch(actions.setSaveWithPopUp(true))

                //if inprogress and saved
                dispatch(actions.setStatusSaved(true))
                if (getState().testReducer.test.sendTo_email.list.length > 0) {
                    const mailInfo = {
                        body: `<h1><a href="https://quiz.leader.codes/${getState().funnelReducer.userName}/answerTest/${res.data._id}"> please take a test in ${res.data.test_name}</a ></h1 >`,
                        //body: `<h1><a href="https://quiz.leader.codes/${getState().funnelReducer.userName}/answerTest/${res.data._id}/${getState().testReducer.test.sendTo_email.list}"> please take a test in ${res.data.test_name}</a ></h1 >`,
                        list: getState().testReducer.test.sendTo_email.list,
                        subject: "Hello, you need to take a test"
                    }
                    dispatch(actions.sendMail(mailInfo))
                    dispatch(actions.createContact())
                    dispatch(actions.addTestToStudent({
                        test: getState().testReducer.test,
                        email: getState().testReducer.test.sendTo_email.list
                    }))
                }
                else
                    //  if (getState().funnelReducer.numStep === 3 && !getState().funnelReducer.isFinishTest)
                    if (getState().funnelReducer.numStep == "3" && !getState().funnelReducer.isFinishTest && getState().funnelReducer.isOnPopUp)
                        window.history.push(`/${getState().funnelReducer.userName}/`)

            })
            .catch(result => {
                console.log(result.response)
                console.log(typeof (result))
                console.log({ result })
                if (result.response.status == "401") {
                    window.location.href = result.routes ?
                        `https://dev.accounts.codes/quiz/login?routes=${result.routes}` :
                        `https://dev.accounts.codes/quiz/login`;
                    return false
                }
                return true
            });
    }
    return next(action);
};

export const numOfTested = ({ dispatch, getState }) => next => action => {
    if (action.type === 'NUM_OF_TESTED') {
        axios.get(`https://quiz.leader.codes/api/${getState().funnelReducer.userName}/user/numOfTested`,
            {
                headers: {
                    'authorization': getState().funnelReducer.jwt
                }
            })
            .then(res => {
                console.log(res.data)
                dispatch(actions.setNumOfTested(res.data))
            })
            .catch(result => {
                console.log(result.response)
                if (result.response.status == "401") {
                    window.location =
                        //   `https://dev.accounts.codes/quiz/login?routes=${result.routes}` :
                        `https://dev.accounts.codes/quiz/login`;
                    return false
                }
                return true
            });
    }
    return next(action);
};

export const average = ({ dispatch, getState }) => next => action => {
    if (action.type === 'AVERAGE') {
        axios.get(`https://quiz.leader.codes/api/${getState().funnelReducer.userName}/tests/average`,
            {
                headers: {
                    'authorization': getState().funnelReducer.jwt
                }
            })
            .then(res => {
                console.log(res.data)
                dispatch(actions.setTestAverage(res.data))
            })
            .catch(result => {
                console.log(result.response)
                if (result.response.status == "401") {
                    window.location =
                        //   `https://dev.accounts.codes/quiz/login?routes=${result.routes}` :
                        `https://dev.accounts.codes/quiz/login`;
                    return false
                }
                return true
            });
    }
    return next(action);
};
export const getTrashTests = ({ dispatch, getState }) => next => action => {

    if (action.type === 'GET_TRASH_TESTS') {
        axios.get(`https://quiz.leader.codes/api/${getState().funnelReducer.userName}/tests/getAllTrash`,
            {
                headers: {
                    'authorization': getState().funnelReducer.jwt
                }
            })
            .then(res => {
                console.log(res.data)
                console.log("trash ", action.payload)
                if (action.payload)
                    dispatch(actions.setTrashTestReducerArray(res.data))
                else {
                    dispatch(actions.setTrashTestReducerArray(res.data))
                    dispatch(actions.initialFilteredTest({ testList: res.data, displayTest: "deleted" }))
                }
            })
            .catch(result => {
                console.log(result.response)
                if (result.response.status == "401") {
                    window.location =
                        //   `https://dev.accounts.codes/quiz/login?routes=${result.routes}` :
                        `https://dev.accounts.codes/quiz/login`;
                    return false
                }
                return true
            });
    }
    return next(action);
};

export const getSolvedTests = ({ dispatch, getState }) => next => action => {

    if (action.type === 'GET_SOLVED_TESTS') {
        axios.get(`https://quiz.leader.codes/api/${getState().funnelReducer.userName}/user/getSolvedTests`,
            {
                headers: {
                    'authorization': getState().funnelReducer.jwt
                }
            })
            .then(res => {
                console.log(res.data)
                console.log("solved ", action.payload)
                if (action.payload) {
                    dispatch(actions.setSolvedTestReducerArray(res.data))
                    console.log("the solved test ", res.data)
                }
                else {
                    dispatch(actions.setSolvedTestReducerArray(res.data))
                    dispatch(actions.initialFilteredTest({ testList: [], displayTest: "checked" }))
                    dispatch(actions.getSolvedAddContact())
                }
            })
            .catch(result => {
                console.log(result.response)
                console.log(typeof (result))
                if (result.response.status == "401") {
                    window.location.href = result.routes ?
                        `https://dev.accounts.codes/quiz/login?routes=${result.routes}` :
                        `https://dev.accounts.codes/quiz/login`;
                    return false
                }
                return true
            });
    }
    return next(action);
};

export const getSolvedAddContact = ({ dispatch, getState }) => next => action => {

    if (action.type === 'GET_SOLVED_ADD_CONTACT') {
        axios.get(`https://quiz.leader.codes/api/${getState().funnelReducer.userName}/user/getSolved_add2contact`,
            {
                headers: {
                    'authorization': getState().funnelReducer.jwt
                }
            })
            .then(res => {
                console.log(res.data)
                dispatch(actions.setSolvedAdd2ContactReducer(res.data))
                dispatch(actions.initialFilteredTest({ testList: [], displayTest: "checked" }))
                dispatch(actions.mergeSolved())
            })
            .catch(result => {
                console.log(result.response)
                console.log(typeof (result))
                if (result.response.status == "401") {
                    window.location.href = result.routes ?
                        `https://dev.accounts.codes/quiz/login?routes=${result.routes}` :
                        `https://dev.accounts.codes/quiz/login`;
                    return false
                }
                return true
            });
    }
    return next(action);
};

export const getTeachersName = ({ dispatch, getState }) => next => action => {

    if (action.type === 'GET_TEACHERS_NAME') {
        axios.get(`https://quiz.leader.codes/api/${getState().funnelReducer.userName}/teacher/getTeachersName`,
            {
                headers: {
                    'authorization': getState().funnelReducer.jwt
                }
            })
            .then(res => {
                console.log(res.data)
                dispatch(actions.setTeachersName(res.data))
            })
            .catch(result => {
                console.log(result.response)
                if (result.response.status == "401") {
                    window.location =
                        //   `https://dev.accounts.codes/quiz/login?routes=${result.routes}` :
                        `https://dev.accounts.codes/quiz/login`;
                    return false
                }
                return true
            });
    }
    return next(action);
};

export const getUserContactsEmail = ({ dispatch, getState }) => next => action => {

    if (action.type === 'GET_USER_CONTACTS_EMAIL') {
        axios.get(`https://quiz.leader.codes/api/${getState().funnelReducer.userName}/user/getUserContactsEmail`,
            {
                headers: {
                    'authorization': getState().funnelReducer.jwt
                }
            })
            .then(res => {
                console.log(res.data)
                // alert(res.data.name)
                // dispatch(actions.setContactsEmail([{"All"}].concat(res.data)))
                dispatch(actions.setContactsEmail(res.data))
            })
            .catch(result => {
                console.log(result.response)
                if (result.response.status == "401") {
                    window.location =
                        //   `https://dev.accounts.codes/quiz/login?routes=${result.routes}` :
                        `https://dev.accounts.codes/quiz/login`;
                    return false
                }
                return true
            });
    }
    return next(action);
};


export const saveAnonymousDetails = ({ dispatch, getState }) => next => action => {

    if (action.type === 'SAVE_ANONYMOUS_DETAILS') {
        axios.get(`https://quiz.leader.codes/api/${getState().funnelReducer.userName}/user/saveAnonymousDetails`,
            {
                headers: {
                    'authorization': getState().funnelReducer.jwt
                }
            })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => console.log(err));
    }
    return next(action);
};

//need to send string and not array
export const createContact = ({ dispatch, getState }) => next => action => {

    if (action.type === 'CREATE_CONTACT') {

        const body = {
            "contact": { "email": getState().testReducer.test.sendTo_email.list },
            "withConversation": false,
            "source": { "type": "Quiz" }
        }

        axios.post(`https://api.leader.codes/${getState().funnelReducer.userName}/createContact`, body,
            {
                headers: {
                    'authorization': getState().funnelReducer.jwt
                }
            })
            .then(res => {
                console.log(res.data)
            })
            .catch(result => {
                console.log(result.response)
                if (result.response.status == "401") {
                    window.location =
                        //   `https://dev.accounts.codes/quiz/login?routes=${result.routes}` :
                        `https://dev.accounts.codes/quiz/login`;
                    return false
                }
                return true
            });
    }
    return next(action);
};

export const createContactWithoutCheckPermissin = ({ dispatch, getState }) => next => action => {

    if (action.type === 'CREATE_CONTACT_WITHOUT_CHECK_PERMISSIN') {

        const body = {
            "contact": { "email": action.payload },
            "withConversation": false,
            "source": { "type": "Quiz" }
        }

        axios.post(`https://api.dev.leader.codes/${getState().funnelReducer.userName}/createContactWithoutCheckPermissin`, body,
            {
                headers: {
                    'authorization': 'view'
                }
            })
            .then(res => {
                console.log(res.data)
                dispatch(actions.setnewContact(true))
            })
            .catch(err => {
                console.log(err)
                console.log("err")
            });
    }
    return next(action);
};


