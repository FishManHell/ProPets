export const LOADING_EVERYTHING = 'LOADING_EVERYTHING';
export const LOADING_CONTENT_ACTION = 'LOADING_CONTENT_ACTION';
export const LOADING_SCROLL = 'LOADING_SCROLL';

export const loadingAction = loading => {
    return {
        type: LOADING_EVERYTHING,
        payload: loading
    }
}

export const loadingContentAction = state => {
    return {
        type: LOADING_CONTENT_ACTION,
        payload: state
    }
}

export const loadingScroll = loading => {
    return {
        type: LOADING_SCROLL,
        payload: loading
    }
}

export const LITTLE_SCROLL = 'LITTLE_SCROLL'
export const loadingLittle = state => {
    return {
        type: LITTLE_SCROLL,
        payload: state
    }
}