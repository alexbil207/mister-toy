

const initialState = {
    user: JSON.parse(localStorage.getItem('user')),
};

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_USER':
            return { ...state, user: action.user };
        case 'LOGOUT_USER':
            return { user: null };
        default:
            return state;
    }
}