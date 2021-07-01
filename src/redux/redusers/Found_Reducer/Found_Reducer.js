import {
    PAGE_BY_PAGE_POST_FOUND, ALL_POST_FOUND, CLEAR_STATE_FOUND, FETCHING_FOUND,
    GET_CURRENT_PAGE, GET_ALL_POST_CURRENT_PAGES, GET_ITEM_TOTAL, SEARCH_ARR_FOR_MAP_FOUND_POST
} from "../../actions/Found_Posts_Action/Found_Posts_Action";

const initialState = {
    found_posts: [],
    all_post_found: [],
    search_arr_for_map: [],
    currentPage: 0, // какая страница
    allPostCurrentPages: 0,
    itemsPage: 5,
    itemsTotal: null,
    fetching_found: true,
}

export const foundReducer = (state = initialState, action) => {
    switch (action.type) {
        case PAGE_BY_PAGE_POST_FOUND:
            return {...state, found_posts: [...state.found_posts, ...action.payload]};
        case GET_CURRENT_PAGE:
            return {...state, currentPage: action.payload};
        case GET_ITEM_TOTAL:
            return {...state, itemsTotal: action.payload};
        case FETCHING_FOUND:
            return {...state, fetching_found: action.payload};
        case ALL_POST_FOUND:
            return {...state, all_post_found: [...state.all_post_found, ...action.payload]}
        case GET_ALL_POST_CURRENT_PAGES:
            return {...state, allPostCurrentPages: action.payload};
        case SEARCH_ARR_FOR_MAP_FOUND_POST:
            return {...state, search_arr_for_map: action.payload};
        case CLEAR_STATE_FOUND:
            return initialState;
        default:
            return {...state}
    }
}