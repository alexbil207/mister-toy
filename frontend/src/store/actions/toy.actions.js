import { toyService } from '../../services/toy.service.js'

export function loadToys(filterBy) { // Action Creator
    return dispatch => {
        dispatch({ type: 'LOADING_TOYS', isLoading: true })
        return toyService.query(filterBy)
            .then(toys => {
                const action = {
                    type: 'SET_TOYS',
                    toys
                }
                dispatch(action)
            })
            .catch(err => {
                dispatch({ type: 'TOY_ERR', err })
            })
    }
}
export function removeToy(toyId) { // Action Creator
    return dispatch => {
        return toyService.remove(toyId)
            .then(() => {
                const action = {
                    type: 'REMOVE_TOY',
                    toyId
                }
                dispatch(action)
            })
    }
}

export function saveToy(toy) { // Action Creator
    return dispatch => {
        return toyService.save(toy)
            .then((savedToy) => {
                const action = {
                    type: 'SET_TOYS',
                    toy: savedToy
                }
                dispatch(action)
            })
    }
}