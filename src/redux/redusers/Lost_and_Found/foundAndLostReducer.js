import {
    ANIMAL,
    TAGS,
    LOCATION,
    URL_IMG,
    SHOW_PREVIEW,
    ALL_INFORM_LOCATION,
    GET_COLOR,
    GET_HEIGHT, CLEAR_STATE,
} from "../../actions/Lost_and_Found/FoundAndLostAction";

const initialState = {
    preview: false,
    animal: {
        type: "",
        sex: "",
        breed: "",
        userName: '',
        avatar: "",
        address: {
            country: "",
            city: "",
            street: "",
            building: null,
        },
        location: {
            latitude: null,
            longitude: null,
        },
        photos: [],
        tags : []
    },
        color: '',
        height: '',
}

export const FoundAndLostReducer = (state = initialState, action) => {
    switch (action.type) {
        case ANIMAL:
            return {...state, animal: {...action.payload}};
        case LOCATION:
            return {...state, animal: {...state.animal, location: action.payload}};
        case URL_IMG:
            return {...state, animal: {...state.animal, photos: [...state.animal.photos, action.payload]}}
        case TAGS:
            return {...state, animal: {...state.animal, tags: [...state.animal.tags, ...action.payload]}};
        case ALL_INFORM_LOCATION:
            return {...state, animal: {...state.animal, address: action.payload}};
        case GET_COLOR:
            return {...state, color: action.payload};
        case GET_HEIGHT:
            return {...state, height: action.payload};
        case SHOW_PREVIEW:
            return {...state, preview: action.payload};
        case CLEAR_STATE:
            return initialState;
        default:
            return {...state};
    }
}