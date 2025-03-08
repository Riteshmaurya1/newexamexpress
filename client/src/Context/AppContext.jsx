import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import runChat from "../config/gemini";

export const AppContext = createContext();


export const AppContextProvider = (props) => {


    axios.defaults.withCredentials = true;

    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(false);
    const [subjectData, setSubjectData] = useState([]);
    // for subjects send data for set
    const [branch, setBranch] = useState('');
    const [semester, setSemester] = useState('');
    const [subjectName, setSubjectName] = useState('');
    const [filter, setFilter] = useState('');
    const [error, setError] = useState('');
    const [viewCount, setViewCount] = useState('');

    const [dashboardName, setDashboardName] = useState('Dashboard');

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    // for the user data
    const getUserData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/data')
            data.success ? setUserData(data.userData) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    // For My Subject Data from the 
    const getSubjectData = async () => {
        try {
            console.log("Sending request with:", { branch, semester });

            // Send a POST request to the backend
            const response = await axios.post(
                backendUrl + '/api/subjects', // Ensure this matches the backend endpoint
                {
                    branch,
                    semester,
                    // subjectname: subjectName,
                }
            );

            console.log("Response from backend:", response.data); // Debugging

            if (response.data.success) {
                setSubjectData(response.data.subjectData); // Set the subject data
                setError("");
            } else {
                setError("No data found for the selected criteria.");
                setSubjectData([]);
                // setSubjectData(null);
            }
        } catch (err) {
            console.error("Error fetching subject data:", err); // Debugging
            setError("Error fetching subject data.");
            setSubjectData([]);
        }
    };

    useEffect(() => {
        if (branch && semester) {
            getSubjectData();
        }
    }, [branch, semester]);

    // for user is logged in or not.
    const getAuthState = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/auth/is-auth')

            if (data.success) {
                setIsLoggedin(true)
                getUserData()
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getAuthState();
    }, []);


    /* Gemini API Function  */

    const [inputAi, setInputAi] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");


    /* My UseState function */

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord)
        }, 75 * index)
    }

    const onSent = async (prompt) => {

        setResultData("")
        setLoading(true)
        setShowResult(true)
        setRecentPrompt(inputAi)
        setPrevPrompt(prevPrompt => [...prevPrompt, inputAi])
        const response = await runChat(inputAi)
        let respnseArray = response.split("**");
        let newResponse = "";
        for (let i = 0; i < respnseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += respnseArray[i];
            }
            else {
                newResponse += "<b>" + respnseArray[i] + "</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>")
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ")
        }
        setLoading(false)
        setInputAi("")
    }



    // for the global values getiing at anywhere
    const value = {
        backendUrl,
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData,
        getUserData,
        /* below related to Gemini API */
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        inputAi,
        setInputAi,
        setBranch,
        setSemester,
        setSubjectName,
        setSubjectData,
        branch,
        semester,
        subjectName,
        subjectData,
        getSubjectData,
        error,
        filter,
        setFilter,
        // for Dashboard Name changes
        setDashboardName,
        dashboardName,
        viewCount,
        setViewCount,
    }






    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}