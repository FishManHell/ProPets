import {
    CHANGE_I_FOUND_PAGE,
    CHANGE_MODAL,
    CLOSE_AND_OPEN,
    DRAG_AND_DROP,
    FORM_STATE
} from "../../actions/Modal/modalAndOtherActions";
import {
    CHANGE_TEXT_GREEN,
    CHANGE_TEXT_YELLOW,
    CLEAR_STATE_SEARCH,
    FIND_BREED,
    FIND_FEATURES,
    FIND_LOCATION,
    FIND_TYPE,
} from "../../actions/Any_Actions/startChangeTextButton";

const initialState = {
    modal: null,
    form_state: null,
    yellow_button: 'I lost my pet!',
    green_button: 'I found a pet!',
    change: null,
    i_found: null,
    DnD: null,
    invisible: null,
    search_type: '',
    search_breed: '',
    search_features: '',
    search_location: ''
}

export const modalAndOtherReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_MODAL:
            return {...state, modal: action.payload};
        case FORM_STATE:
            return {...state, form_state: action.payload};
        case CLOSE_AND_OPEN:
            return {...state, change: action.payload}
        case CHANGE_I_FOUND_PAGE:
            return {...state, i_found: action.payload};
        case DRAG_AND_DROP:
            return{...state, DnD: action.payload};
        case CHANGE_TEXT_YELLOW:
            return {...state, yellow_button: action.payload};
        case CHANGE_TEXT_GREEN:
            return {...state, green_button: action.payload};

        case FIND_TYPE:
            return {...state, search_type: action.payload};
        case FIND_BREED:
            return {...state, search_breed: action.payload};
        case FIND_FEATURES:
            return {...state, search_features: action.payload};
        case FIND_LOCATION:
            return {...state, search_location: action.payload};
        case CLEAR_STATE_SEARCH:
            return {...state, search_type : '', search_breed : '', search_features : '', search_location : ''}
        default:
            return state;
    }
}