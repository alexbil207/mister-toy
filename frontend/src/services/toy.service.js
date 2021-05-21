import axios from 'axios';

const STORAGE_KEY = 'toy'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getStatisticts
}
const BASE_URL = process.env.NODE_ENV === 'production' ? '/api/toy' : 'http://localhost:3030/api/toy'

function query(filterBy) {
    return axios.get(BASE_URL, { params: filterBy }).then(toys => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toys.data));
        return toys.data;
    })
}

function getById(toyId) {
    return axios.get(`${BASE_URL}/${toyId}`).then(toy => {
        return toy.data;
    })
}


function remove(toyId) {
    return axios.delete(`${BASE_URL}/${toyId}`).then(status => {
        return status.data;
    })
}


function save(toyInfo) {
    if (toyInfo._id) {
        return axios.put(`${BASE_URL}`, toyInfo).then(status => status.data);
    } else {
        return axios.post(`${BASE_URL}`, toyInfo).then(toy => toy.data);
    }
}

function getStatisticts() {
    return axios.get(`${BASE_URL}/statisticts`).then(Statisticts => {
        return Statisticts.data;
    })
}


