import {loadingAction, loadingContentAction} from "../Any_Actions/loadingAction";

export const PUT_USER = 'PUT_USER';
export const X_TOKEN = 'X_TOKEN';
export const LOGOUT = 'LOGOUT';

export const putUser = user => {
    return {
        type: PUT_USER,
        payload: {user}
    }
}

export const x_Token = x_token => {
    return {
        type: X_TOKEN,
        payload: {x_token}
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}

export const registerUser = user => {
    return dispatch => {
        dispatch(loadingAction(true)) // прогрузка в стайте изначально false а потом меняем на true
        fetch(`https://pro-pets-router.herokuapp.com/account/en/v1`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                if (response.ok) {
                    const x_token = response.headers.get('x-token');
                    localStorage.setItem('x-token', x_token);
                    dispatch(x_Token(x_token));
                    return response.json()
                } else {
                    throw new Error(response.status + '');
                }
            })
            .then(profile => {
                localStorage.setItem('login', profile.email);
                dispatch(putUser(profile));
                dispatch(loadingAction(false))
            })
            .catch(e => {
                console.log(e.message);
            })
    }
}

export const loginUser = token => {
    return dispatch => {
        dispatch(loadingAction(true))
        fetch(`https://pro-pets-router.herokuapp.com/account/en/v1/login`, {
            method: 'POST',
            headers: {
                Authorization: token,
            }
        })
            .then(response => {
                if (response.ok) {
                    const x_token =  response.headers.get('x-token');
                    localStorage.setItem('x-token', x_token)
                    dispatch(x_Token(x_token));
                    return response.json()
                } else {
                    throw new Error(response.status + '')
                }
            })
            .then(profile => {
                localStorage.setItem('login', profile.email)
                dispatch(putUser(profile))
                dispatch(loadingAction(false))
            })
            .catch(e => {
                console.log(e.message)
            })
    }
}

export const getUser = (x_token, login) => {
    return (dispatch) => {
        dispatch(loadingAction(true))
        fetch(`https://pro-pets-router.herokuapp.com/account/en/v1/${login}/info`, {
            method: 'GET',
            headers: {
                'X-Token': x_token,
            }
        })
            .then(response => {
                if (response.ok) {
                    const x_token =  response.headers.get('x-token');
                    localStorage.setItem('x-token', x_token)
                    dispatch(x_Token(x_token));
                    return response.json()
                } else {
                    throw new Error(response.status + '')
                }
            })
            .then(profile => {
                localStorage.setItem('login', profile.email)
                dispatch(putUser(profile))
                dispatch(loadingAction(false))
            })
            .catch(e => {
                console.log(e.message)
            })
    }
}

export const editUser = (user) => {
    return  (dispatch, getState) => {
        dispatch(loadingContentAction(true))
        fetch(`https://pro-pets-router.herokuapp.com/account/en/v1/${getState().regReducer.user.email}`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
                'X-Token': getState().regReducer.x_token,
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                if (response.ok) {
                    const x_token =  response.headers.get('x-token');
                    localStorage.setItem('x-token', x_token)
                    dispatch(x_Token(x_token));
                    return response.json()
                } else {
                    throw new Error(response.status + '')
                }
            })
            .then(profile => {
                localStorage.setItem('login', profile.email)
                dispatch(putUser(profile))
                dispatch(loadingContentAction(false))
            })
            .catch(e => {
                console.log(e.message)
            })
    }
}

export const getImg = (user) => {
    return (dispatch) => {
    fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
            Authorization: 'Client-ID 955afae64956fa3',
            Accept: 'application/json'
        },
        body: user.avatar
    })
        .then(response => {
            if (response.ok) {
                return response.json()
            }else
                throw new Error(response.status + '')
        })
        .then(result => {
           user.avatar = result.data.link
            console.log(result.data.link)
            dispatch(editUser(user))
        })
        .catch(e => console.log(e.message))
}
}

