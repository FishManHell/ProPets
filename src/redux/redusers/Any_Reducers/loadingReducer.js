import {
    LITTLE_SCROLL,
    LOADING_CONTENT_ACTION,
    LOADING_EVERYTHING,
    LOADING_SCROLL,
} from "../../actions/Any_Actions/loadingAction";

const initialState = {
    loading: null,
    loading_content: null,
    loading_scroll: null,
    little_lading: null,
}

export const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_EVERYTHING:
            return{...state, loading: action.payload};
        case LOADING_CONTENT_ACTION:
            return {...state, loading_content: action.payload};
        case LOADING_SCROLL:
            return {...state, loading_scroll: action.payload};
        case LITTLE_SCROLL:
            return {...state, little_lading: action.payload}
        default:
            return {...state};
    }
}

