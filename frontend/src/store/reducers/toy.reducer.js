const initialState = {
    err: null,
    isLoading: false,
    toys: [],
    shoppingCart: []
}

export function toyReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_TOYS':
            return { ...state, toys: action.toys, isLoading: false }
        case 'TOY_ERR':
            return { ...state, err: action.err, isLoading: false }
        case 'ADD_TOY':
            return { ...state, toys: [...state.toys, action.toy] }
        case 'REMOVE_TOY':
            return { ...state, toys: state.toys.filter(toy => toy._id !== action.toyId) }
        case 'LOADING_TOYS':
            return { ...state, isLoading: action.isLoading, err: null }
        case 'ADD_TO_CART':
            return { ...state, shoppingCart: [...state.shoppingCart, action.item] }
        default:
            return state
    }
}
