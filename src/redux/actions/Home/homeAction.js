import {loadingContentAction, loadingLittle, loadingScroll} from "../Any_Actions/loadingAction";

export const HOME_POSTS = 'HOME_POSTS';
export const SET_IS_CURRENT_PAGE_HOME = 'SET_IS_CURRENT_PAGE_HOME';
export const ITEMS_TOTAL = 'ITEMS_TOTAL';
export const FETCHING_HOME = 'FETCHING_HOME';
export const FLAG_FAVORITES = 'FLAG_FAVORITES'
export const FAVORITES_POST = 'FAVORITES_POST'
export const CLEAR_HOME_STATE = 'CLEAR_HOME_STATE'
export const ACTIVITIES_POSTS = 'ACTIVITIES_POSTS'
export const REMOVE_STATE_ACTIVITIES = 'REMOVE_STATE_ACTIVITIES'
export const COMMENTS = 'COMMENTS'
export const COMMENTS_FLAG = 'COMMENTS_FLAG'

export const homeAction = posts => {
    return {
        type: HOME_POSTS,
        payload: posts
    }
}

export const setCurrentPage = page => {
    return {
        type: SET_IS_CURRENT_PAGE_HOME,
        payload: page
    }
}

export const setItemsTotal = total => {
    return {
        type: ITEMS_TOTAL,
        payload: total
    }
}

export const setFetching = state => {
    return {
        type: FETCHING_HOME,
        payload: state
    }
}

export const posts_favorites = favorites => {
    return {
        type: FAVORITES_POST,
        payload: favorites
    }
}

export const flag_favorites = flag => {
    return {
        type: FLAG_FAVORITES,
        payload: flag
    }
}

export const clearStateHome = () => {
    return {
        type: CLEAR_HOME_STATE
    }
}

export const removeStateActivities = state => {
    return {
        type: REMOVE_STATE_ACTIVITIES,
        payload: state
    }
}

export const comments = (id, state) => {
    return {
        type: COMMENTS,
        payload: {id, state}
    }
}

export const commentsFlag = state => {
    return {
        type: COMMENTS_FLAG,
        payload: state
    }
}

export const activitiesPost = post => {
    return {
        type: ACTIVITIES_POSTS,
        payload: post
    }
}

export const ACTIVITIES_FLAG = 'ACTIVITIES_FLAG'
export const activitiesFlag = state => {
    return {
        type: ACTIVITIES_FLAG,
        payload: state
    }
}

export const putComments = (id, idComment, text) => {
    return (dispatch, getState) => {
        fetch(`https://pro-pets-router.herokuapp.com/message/en/v1/post/${id}/comment/${idComment}`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
                'X-Token' : getState().regReducer.x_token
            },
            body: JSON.stringify(text)
        })
            .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw Error (response.status + '')
            }
        })
            .then(data => {
                console.log(data)
            })
    }
}

export const delComments = (id, idComment) => {
    return (dispatch, getState) => {
        fetch(`https://pro-pets-router.herokuapp.com/message/en/v1/post/${id}/comment/${idComment}`, {
            method: 'DELETE',
            headers: {
                'X-Token' : getState().regReducer.x_token
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw Error (response.status + '')
                }
            })
            .then(data => {
                console.log(data)
            })
    }
}

export const getComments = (id) => {
    return (dispatch, getState) => {
        fetch(`https://pro-pets-router.herokuapp.com/message/en/v1/post/${id}/comments`, {
            method: 'GET',
            headers: {
                'X-Token' : getState().regReducer.x_token
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw Error (response.status + '')
                }
            })
            .then(data => {
                console.log(data)
                dispatch(comments(id, data))
                dispatch(commentsFlag(false));
            })
    }
}
export const addCommit = (comment, id) => {
    return (dispatch, getState) => {
        dispatch(loadingLittle(true))
        fetch(`https://pro-pets-router.herokuapp.com/message/en/v1/${getState().regReducer.user.email}/post/${id}/comment`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'X-Token' : getState().regReducer.x_token
            },
            body: JSON.stringify(comment)
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw Error (response.status + '')
                }
            })
            .then(data => {
                console.log(data)
                dispatch(loadingLittle(false))
            })
            .catch(e => console.log(e.message))
    }
}

    export const removeActivitiesUserPost = id => {
        return (dispatch, getState) => {
            fetch(`https://pro-pets-router.herokuapp.com/message/en/v1/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type' : 'application/json',
                    'X-Token' : getState().regReducer.x_token
                }
            })
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw Error(response.status + '')
                    }
                })
                .then(data => {
                    console.log(data)
                    dispatch(activitiesFlag(false))
                })
                .catch(e => console.log(e.message))
        }
    }

export const removeActivitiesLostFoundPost = id => {
    return (dispatch, getState) => {
        dispatch(loadingLittle(true))
        fetch(`https://pro-pets-router.herokuapp.com/lostfound/en/v1/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json',
                'X-Token' : getState().regReducer.x_token
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw Error(response.status + '')
                }
            })
            .then(data => {
                console.log(data)
                dispatch(loadingLittle(true))
            })
            .catch(e => console.log(e.message))
    }
}

    export const activitiesUserPost = () => {
    return (dispatch, getState) => {
        // dispatch(loadingContentAction(true))
        fetch(`https://pro-pets-router.herokuapp.com/postdata/en/v1/${getState().regReducer.user.email}/activities`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'X-Token' : getState().regReducer.x_token
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw Error(response.status + '')
                }
            })
            .then(data => {
                console.log(data)
                dispatch(activitiesPost(data))
                // dispatch(loadingContentAction(false))
            })
            .catch(e => console.log(e.message))
    }
}


export const removeFavoritesPost = (id) => {
    return (dispatch, getState) => {
        fetch(`https://pro-pets-router.herokuapp.com/account/en/v1/${getState().regReducer.user.email}/favorite/${id}`, {
            method: 'Delete',
            headers: {
                'X-Token' : getState().regReducer.user.x_token,
                'X-ServiceName': 'message'
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw Error (response.status + '')
                }
            })
            .then(data => {
                console.log(data)
            })
            .catch(e => console.log(e.message))
    }
}

// export const getFavoritesPost = () => {
//     return async (dispatch, getState) => {
//        try {
//            const state = getState()
//            if (state.homeReducers.favorites_post.length === 0) {
//                dispatch(loadingContentAction(true))
//            }
//            await dispatch(loadingLittle(true))
//            const resp = await fetch(`https://pro-pets-router.herokuapp.com/postdata/en/v1/${getState().regReducer.user.email}/favorites`, {
//                method: "GET",
//                 headers: {
//                     'Content-Type' : 'application/json',
//                     'X-Token' : getState().regReducer.x_token
//                 }
//            })
//            const response = await resp.json()
//            console.log(response)
//            dispatch(posts_favorites(response.otherPosts))
//        } catch (e) {
//            console.log(e.message)
//        } finally {
//            dispatch(flag_favorites(false))
//            dispatch(loadingContentAction(false))
//            dispatch(loadingLittle(false))
//        }
//     }
// }


export const getFavoritesPost = () => {
    return (dispatch, getState) => {
        fetch(`https://pro-pets-router.herokuapp.com/postdata/en/v1/${getState().regReducer.user.email}/favorites`, {
            method: "GET",
            headers: {
                'Content-Type' : 'application/json',
                'X-Token' : getState().regReducer.x_token
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw Error (response.status + '')
                }
            })
            .then(data => {
                console.log(data)
                dispatch(posts_favorites(data.otherPosts))
                dispatch(flag_favorites(false))
            })
            .catch(e => console.log(e.message))
    }
}

export const favorites_post = id => {
    return (dispatch, getState) => {
        fetch(`https://pro-pets-router.herokuapp.com/account/en/v1/${getState().regReducer.user.email}/favorite/${id}`, {
            method: 'PUT',
            headers: {
                'X-Token' : getState().regReducer.x_token,
                'X-ServiceName' : 'message'
            },
            body: JSON.stringify(id)
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw Error (response.status + '')
                }
            })
            .then(data => {
                console.log(data)
            })
            .catch(e => console.log(e.message))
    }
}

export const createPost = post => {
    return (dispatch, getState) => {
        dispatch(loadingContentAction(true))
        fetch(`https://pro-pets-router.herokuapp.com/message/en/v1/${getState().regReducer.user.email}`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'X-Token': getState().regReducer.x_token
            },
            body: JSON.stringify(post)
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw Error (response.status + '')
                }
            })
            .then(data => {
                console.log(data)
                dispatch(loadingContentAction(false))
            })
            .catch(e => console.log(e.message))
    }
}

export const allPostTestHome = (currentPage) => {
    return async (dispatch, getState) => {
        try {
            const state = getState()
            if (state.homeReducers.home_posts.length === 0) {
                dispatch(loadingContentAction(true))
            }
            await dispatch(loadingScroll(true))
            const resp = await fetch(`https://pro-pets-router.herokuapp.com/message/en/v1/view/?currentPage=${currentPage}`, {
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json',
                    'X-Token' : getState().regReducer.x_token
                }
            })
            const response = await resp.json()
            console.log(response)
            dispatch(setItemsTotal(response.itemsTotal))
            dispatch(homeAction(response.posts))
            dispatch(setCurrentPage(currentPage + 1))
        } catch (e) {
            console.log(e.message)
        } finally {
            dispatch(setFetching(false))
            dispatch(loadingContentAction(false))
            dispatch(loadingScroll(false))
        }
    }
}