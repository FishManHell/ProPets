import {
    CLEAR_HOME_STATE, COMMENTS, COMMENTS_FLAG,
    FAVORITES_POST,
    FETCHING_HOME, FLAG_FAVORITES,
    HOME_POSTS,
    ITEMS_TOTAL,
    SET_IS_CURRENT_PAGE_HOME
} from "../../actions/Home/homeAction";

const initialState = {
    home_posts: [],
    favorites_post: [],
    comments: [],
    currentPage: 0,
    itemsPage: 5,
    itemsTotal: null,
    fetching_home: true,
    favorites_flag: true,
    comment_flag: true
}

export const homeReducers = (state = initialState, action) => {
    switch (action.type) {
        case HOME_POSTS:
            return{...state, home_posts: [...state.home_posts, ...action.payload]};
        case FLAG_FAVORITES:
            return {...state, favorites_flag: action.payload};
        case FAVORITES_POST:
            return {...state, favorites_post: action.payload.reverse()};
        case SET_IS_CURRENT_PAGE_HOME:
            return {...state, currentPage: action.payload}
        case ITEMS_TOTAL:
            return {...state, itemsTotal: action.payload};
        case FETCHING_HOME:
            return {...state, fetching_home: action.payload};
        case COMMENTS:
            return {...state, comments: [...state.comments, {id: action.payload.id, anotherComments: [...action.payload.state]}]};
        case COMMENTS_FLAG:
            return {...state, comment_flag: action.payload};
        case CLEAR_HOME_STATE:
            return initialState
        default:
            return {...state}
    }
}