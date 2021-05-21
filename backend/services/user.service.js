const fs = require('fs');
const utilService = require('./util.service');
const gUsers = require('../data/user.json');


function getUser(credentials) {
    const { email, password } = credentials;
    const user = gUsers.find(user => {
        return user.email === email &&
            user.password === password
    });
    if (user) {
        let userWithoutPass = { ...user }
        delete userWithoutPass.password;
        return Promise.resolve(userWithoutPass);
    } else {
        return Promise.resolve();
    }
}


function saveUser(userInfo) {
    if (userInfo._id) {
        getUserById(userInfo._id, true)
            .then(idx => {
                gUsers[idx] = { ...userInfo, createdAt: Date.now() }
            });
    } else {
        gUsers.push(_createUser(userInfo))
    }
    return _saveUsersToFIle()
        .then(res => {
            let userWithoutPass = gUsers.find(user => user.email === userInfo.email);
            delete userWithoutPass.password;
            return userWithoutPass;
        })
        .catch(err => err)
};


function _createUser(userInfo) {
    const { fullName, email, password } = userInfo;
    return {
        _id: utilService.makeId(),
        fullName,
        email,
        password,
        createdAt: Date.now(),
        isAdmin: false
    }
}

function getUserById(userId, isIdx = false) {
    if (isIdx) return Promise.resolve(gUsers.findIndex(user => userId === user._id));
    return Promise.resolve(gUsers.find(user => userId === user._id));
};


function _saveUsersToFIle() {
    return new Promise((reslove, reject) => {
        fs.writeFile('data/user.json', JSON.stringify(gUsers, null, 2), (err) => {
            if (err) {
                reject('Writing to file failed!')
            } else {
                reslove('Wrote Successfully!')
            }
        })

    })
}






module.exports = {
    getUser,
    saveUser,
}