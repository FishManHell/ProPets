export const CHANGE_MODAL = 'CHANGE_MODAL';
export const FORM_STATE = 'FORM_STATE';
export const CLOSE_AND_OPEN = 'CLOSE_AND_OPEN';
export const CHANGE_I_FOUND_PAGE = 'CHANGE_I_FOUND_PAGE'
export const DRAG_AND_DROP = 'DRAG_AND_DROP';


export const drag_and_drop = state => {
    return {
        type: DRAG_AND_DROP,
        payload: state
    }
}

export const changeModal = state => {
    return {
        type: CHANGE_MODAL,
        payload: state
    }
}

export const formModal = state => {
    return {
        type: FORM_STATE,
        payload: state
    }
}

export const closeAndOpen = state => {
    return {
        type: CLOSE_AND_OPEN,
        payload: state
    }
}

export const changeIFoundPage = state => {
    return {
        type: CHANGE_I_FOUND_PAGE,
        payload: state
    }
}
