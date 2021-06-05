export var t 
export const createNotification = (content, t) => {
    
    return async dispatch => {
        dispatch(
            {
                type: 'SET_NOTIFICATION',
                data: content,
            }
        )

       t = setTimeout(() => {
            dispatch(deleteNotification())
        }, t * 1000)
    }
}

export const deleteNotification = () => {
    return {
        type: 'DELETE_NOTIFICATION',
    }
}

const notificationReducer = (state = "", action) => {
    //console.log(action.type, 'notification reducer')
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data
        case 'DELETE_NOTIFICATION':
            return ""
        default:
            return state
    }
}

export default notificationReducer