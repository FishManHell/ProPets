import {
    CLEAR_STATE_IMG_TAGS,
    GET_IMG_FOUND,
    GET_TAGS_FOUND,
    NAME_FILES,
    REMOVE_IMAGE_TAGS
} from "../../actions/Lost_and_Found/FoundAndLostGetTegImgAction";

const initialState = {
    photos: [],
    tags: [],
    nameFiles: []
}


export const FoundAndLostGetTegImgReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_IMG_FOUND:
            return {...state, photos: [...state.photos, action.payload]};
        case GET_TAGS_FOUND:
            return {...state, tags: [...state.tags, action.payload]};
        case NAME_FILES:
            return {...state, nameFiles: [...state.nameFiles, action.payload]};
        case REMOVE_IMAGE_TAGS:
            const photos = [...state.photos];
            const tags = [...state.tags];
            const nameFiles = [...state.nameFiles];
            photos.splice(action.payload, 1);
            tags.splice(action.payload, 1);
            nameFiles.splice(action.payload, 1);
            return {...state, photos: photos, tags: tags, nameFiles: nameFiles};
        case CLEAR_STATE_IMG_TAGS:
            return initialState
        default:
            return {...state}
    }
}