import {ACTIVITIES_FLAG, ACTIVITIES_POSTS, REMOVE_STATE_ACTIVITIES} from "../../actions/Home/homeAction";

const initialState = {
    activities_post: [],
    activities_flag: true
}

export const activitiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIVITIES_POSTS:
            return {...state, activities_post: [...action.payload.lostFoundPosts, ...action.payload.otherPosts]};
        case ACTIVITIES_FLAG:
            return {...state, activities_flag: action.payload}
        case REMOVE_STATE_ACTIVITIES:
            return initialState

        default:
            return {...state}
    }
}