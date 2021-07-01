import {test_two_url} from "../../../utils/constants";
import {loadingContentAction, loadingScroll} from "../Any_Actions/loadingAction";

export const ALL_POST_LOST = 'ALL_POST_LOST';
export const GET_CURRENT_PAGE_LOST = 'GET_CURRENT_PAGE_LOST'
export const CLEAR_STATE_LOST = 'CLEAR_STATE_LOST'
export const GET_ITEM_TOTAL_LOST = 'GET_ITEM_TOTAL_LOST'
export const PAGE_BY_PAGE_POST_LOST = 'PAGE_BY_PAGE_POST_LOST'
export const SEARCH_ARR_FOR_MAP_LOST_POST = 'SEARCH_ARR_FOR_MAP_LOST_POST'
export const GET_ALL_POST_CURRENT_PAGES_LOST = 'GET_ALL_POST_CURRENT_PAGES_LOST'
export const FETCHING_LOST = 'FETCHING_LOST'

export const allPostLost = posts => {
    return {
        type: ALL_POST_LOST,
        payload: posts
    }
}

export const getCurrentPageLost = page => {
    return {
        type: GET_CURRENT_PAGE_LOST,
        payload: page
    }
}

export const getItemTotalLost = total => {
    return {
        type: GET_ITEM_TOTAL_LOST,
        payload: total

    }
}

export const clearStateLost = () => {
    return {
        type: CLEAR_STATE_LOST
    }
}


export const search_arr_for_map_lost = state => {
    return {
        type: SEARCH_ARR_FOR_MAP_LOST_POST,
        payload: state
    }
}


export const getFetchingLost = state => {
    return {
        type: FETCHING_LOST,
        payload: state
    }
}

export const allGetPostCurrentPagesLost = page => {
    return {
        type: GET_ALL_POST_CURRENT_PAGES_LOST,
        payload: page
    }
}


export const pageByPagePostLost = posts => {
    return {
        type: PAGE_BY_PAGE_POST_LOST,
        payload: posts
    }
}

export const postPageByPageLost = (currentPage) => {
    return async (dispatch, getState) => {
        try {
            const state = getState()
            if (state.lostReducer.lost_posts.length === 0) {
                dispatch(loadingContentAction(true))
            }
            await dispatch(loadingScroll(true))
            const resp = await fetch(`${test_two_url}/lostfound/en/v1/losts?currentPage=${currentPage}`, {
                method: 'GET',
                headers: {
                    'X-Token': getState().regReducer.x_token
                }
            })
            const response = await resp.json()
            console.log(response)
            dispatch(pageByPagePostLost(response.posts))
            dispatch(getItemTotalLost(response.itemsTotal))
            dispatch(getCurrentPageLost(currentPage + 1))
        } catch (e) {
            console.log(e.message);
        } finally {
            dispatch(getFetchingLost(false))
            dispatch(loadingContentAction(false))
            dispatch(loadingScroll(false))
        }
    }
}

export const all_i_losts_post = () => {
    return (dispatch, getState) => {
        fetch(`${test_two_url}/lostfound/en/v1/losts?currentPage=${getState().lostReducer.allPostCurrentPages}`, {
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
                if (getState().lostReducer.allPostCurrentPages !== page) {
                    dispatch(allPostLost(data.posts))
                    dispatch(allGetPostCurrentPagesLost(getState().lostReducer.allPostCurrentPages + 1))
                    dispatch(all_i_losts_post())
                }
            })
            .catch(e => console.log(e.message))
    }
}