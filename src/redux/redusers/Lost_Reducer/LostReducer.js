import {
    PAGE_BY_PAGE_POST_LOST,
    CLEAR_STATE_LOST,
    GET_CURRENT_PAGE_LOST,
    GET_ITEM_TOTAL_LOST, ALL_POST_LOST, SEARCH_ARR_FOR_MAP_LOST_POST, GET_ALL_POST_CURRENT_PAGES_LOST, FETCHING_LOST,
} from "../../actions/Lost_Posts_Action/Lost_Posts_Action";

const initialState = {
    lost_posts: [],
    all_post_lost: [],
    search_arr_for_map: [],
    currentPage: 0, // какая страница
    allPostCurrentPages: 0,
    itemsPage: 5,
    itemsTotal: null,
    fetching_lost: true,
}

export const lostReducer = (state = initialState, action) => {
    switch (action.type) {
        case PAGE_BY_PAGE_POST_LOST:
            return {...state, lost_posts: [...state.lost_posts, ...action.payload]};
        case GET_ALL_POST_CURRENT_PAGES_LOST:
            return {...state, allPostCurrentPages: action.payload};
        case SEARCH_ARR_FOR_MAP_LOST_POST:
            return {...state, search_arr_for_map: action.payload};
        case GET_CURRENT_PAGE_LOST:
            return {...state, currentPage: action.payload};
        case ALL_POST_LOST:
            return {...state, all_post_lost: [...state.all_post_lost, ...action.payload]};
        case GET_ITEM_TOTAL_LOST:
            return {...state, itemsTotal: action.payload};
        case FETCHING_LOST:
            return {...state, fetching_lost: action.payload};
        case CLEAR_STATE_LOST:
            return initialState
        default:
            return{...state};
    }
}