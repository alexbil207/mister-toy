import axios from "axios";


export const userService = {
    getUser,
    signUp,
    logOut,
};

const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3030'


function getUser(credentials) {
    return axios.post(`${BASE_URL}/api/login`, credentials)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user.data))
            return user.data;
        })
};

function logOut() {
    return axios.post(`${BASE_URL}/api/logout`).then(() => {
        localStorage.clear();
    });
};


function signUp(userInfo) {
    return axios.post(`${BASE_URL}/api/signup`, userInfo).then(user => {
        localStorage.setItem('user', JSON.stringify(user.data))
        return user.data
    });
};