export const CHANGE_TEXT_YELLOW ='CHANGE_TEXT_YELLOW';
export const CHANGE_TEXT_GREEN ='CHANGE_TEXT_GREEN'
export const FIND_TYPE = 'FIND_TYPE'
export const FIND_BREED = 'FIND_BREED'
export const FIND_FEATURES = 'FIND_FEATURES'
export const FIND_LOCATION = 'FIND_LOCATION'
export const CLEAR_STATE_SEARCH = 'CLEAR_STATE_SEARCH'

export const changeTextYellow = state => {
    return {
        type: CHANGE_TEXT_YELLOW,
        payload: state
    }
}

export const changeTextGreen = state => {
    return {
        type: CHANGE_TEXT_GREEN,
        payload: state
    }
}


export const findType = type => {
    return {
        type: FIND_TYPE,
        payload: type
    }
}

export const findBreed = state => {
    return {
        type: FIND_BREED,
        payload: state
    }
}

export const findFeatures = state => {
    return {
        type: FIND_FEATURES,
        payload: state
    }
}

export const findLocation = state => {
    return {
        type: FIND_LOCATION,
        payload: state
    }
}

export const return_clear_search_state = () => {
    return {
        type: CLEAR_STATE_SEARCH
    }
}