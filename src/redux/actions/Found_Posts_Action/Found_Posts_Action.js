import {test_two_url} from "../../../utils/constants";
import {loadingContentAction, loadingScroll} from "../Any_Actions/loadingAction";

export const GET_CURRENT_PAGE = 'GET_CURRENT_PAGE'
export const PAGE_BY_PAGE_POST_FOUND = 'PAGE_BY_PAGE_POST_FOUND';
export const CLEAR_STATE_FOUND = 'CLEAR_STATE_FOUND'
export const ALL_POST_FOUND = 'ALL_POST_FOUND'
export const GET_ALL_POST_CURRENT_PAGES = 'GET_ALL_POST_CURRENT_PAGES'
export const GET_ITEM_TOTAL = 'GET_ITEM_TOTAL'
export const FETCHING_FOUND = 'FETCHING_FOUND'
export const SEARCH_ARR_FOR_MAP_FOUND_POST = 'SEARCH_ARR_FOR_MAP_FOUND_POST'


export const allPostFound = posts => {
    return {
        type: ALL_POST_FOUND,
        payload: posts
    }
}

export const allGetPostCurrentPages = page => {
    return {
        type: GET_ALL_POST_CURRENT_PAGES,
        payload: page
    }
}


export const pageByPagePostFound = posts => {
    return {
        type: PAGE_BY_PAGE_POST_FOUND,
        payload: posts
    }
}

export const getCurrentPage = page => {
    return {
        type: GET_CURRENT_PAGE,
        payload: page
    }
}

export const getItemTotal = total => {
    return {
        type: GET_ITEM_TOTAL,
        payload: total

    }
}

export const getFetchingFound = state => {
    return {
        type: FETCHING_FOUND,
        payload: state
    }
}

export const search_arr_for_map_found = state => {
    return {
        type: SEARCH_ARR_FOR_MAP_FOUND_POST,
        payload: state
    }
}

export const clearFoundState = () => {
    return {
        type: CLEAR_STATE_FOUND
    }
}


export const postPageByPageFound= (currentPage) => {
    return async (dispatch, getState) => {
        try {
            const state = getState()
            if (state.foundReducer.found_posts.length === 0) {
                dispatch(loadingContentAction(true))
            }
            await dispatch(loadingScroll(true))
            const resp = await fetch(`${test_two_url}/lostfound/en/v1/founds?currentPage=${currentPage}`, {
                method: 'GET',
                headers: {
                    'X-Token' : getState().regReducer.x_token
                }
            })
            const response = await resp.json()
            console.log(response)
            dispatch(pageByPagePostFound(response.posts))
            dispatch(getItemTotal(response.itemsTotal))
            dispatch(getCurrentPage(currentPage + 1))
        } catch (e) {
            console.log(e.message)
        } finally {
            dispatch(getFetchingFound(false))
            dispatch(loadingContentAction(false))
            dispatch(loadingScroll(false))
        }
    }
}

export const all_i_found_post = () => {
    return (dispatch, getState) => {
        fetch(`${test_two_url}/lostfound/en/v1/founds?currentPage=${getState().foundReducer.allPostCurrentPages}`, {
            method: 'GET',
            headers: {
                'X-Token' : getState().regReducer.x_token
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }else
                    throw new Error(response.status + '')
            })
            .then(data => {
                let page = Math.ceil(data.itemsTotal / 5)
                    if (getState().foundReducer.allPostCurrentPages !== page) {
                        dispatch(allPostFound(data.posts))
                        dispatch(allGetPostCurrentPages(getState().foundReducer.allPostCurrentPages + 1))
                        dispatch(all_i_found_post())
                    }
            })
            .catch(e => console.log(e.message))
    }
}