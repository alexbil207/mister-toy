
const STORAGE_KEY = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser
}

function login(credentials) {
    return axios.post('/api/login', credentials).then(res => res.data)
        .then(user => {
            storageService.save(STORAGE_KEY, user)
            return user
        })
}
function signup(userInfo) {
    return axios.post('/api/signup', userInfo).then(res => res.data)
        .then(user => {
            storageService.save(STORAGE_KEY, user)
            return user
        })
}
function logout() {
    return axios.post('/api/logout').then(res => res.data)
        .then(() => {
            storageService.save(STORAGE_KEY, null)
            return null
        })
}

function getLoggedinUser() {
    return storageService.load(STORAGE_KEY)
}