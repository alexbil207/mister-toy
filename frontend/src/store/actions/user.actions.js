import { userService } from '../../services/user.service';



export function onLoadUser(credentials) {
    return dispatch => {
        return userService.getUser(credentials)
            .then(user => {
                dispatch({ type: `LOGIN_USER`, user: user })
            })
    }
}

export function onLogOut() {
    return dispatch => {
        return userService.logOut()
            .then(() => {
                const user = { user: '' }
                dispatch({ type: `LOGOUT_USER`, user: user })
            })
    }
}



export function onSignUp(userInfo) {
    return dispatch => {
        return userService.signUp(userInfo)
            .then(user => {
                dispatch({ type: `LOGIN_USER`, user: user })
            })
    }
}