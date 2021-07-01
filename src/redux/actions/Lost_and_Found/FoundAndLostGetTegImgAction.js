export const GET_IMG_FOUND = 'GET_IMG_FOUND'
export const GET_TAGS_FOUND = 'GET_TAGS_FOUND'
export const REMOVE_IMAGE_TAGS = 'REMOVE_IMAGE_TAGS'
export const NAME_FILES = 'NAME_FILES'

export const getImages = photos => {
    return {
        type: GET_IMG_FOUND,
        payload: photos
    }
}

export const getTags = tags => {
    tags = tags.map(item => item.tag.en)
    return {
        type: GET_TAGS_FOUND,
        payload: tags
    }
}

export const removeImageTags = index => {
    return {
        type: REMOVE_IMAGE_TAGS,
        payload: index
    }
}

export const getNameFiles = state => {
    return {
        type: NAME_FILES,
        payload: state
    }
}

export const CLEAR_STATE_IMG_TAGS = 'CLEAR_STATE_IMG_TAGS'
export const clearStateImgTags = () => {
    return {
        type: CLEAR_STATE_IMG_TAGS,
    }
}