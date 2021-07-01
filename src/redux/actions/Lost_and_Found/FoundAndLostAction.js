import {test_two_url} from "../../../utils/constants";
import {loadingContentAction, loadingLittle} from "../Any_Actions/loadingAction";
import {getImages, getTags} from "./FoundAndLostGetTegImgAction";

export const ANIMAL = 'ANIMAL';
export const URL_IMG = 'URL_IMG'
export const TAGS = 'TAGS';
export const LOCATION = 'LOCATION';
export const SHOW_PREVIEW = 'SHOW_PREVIEW';
export const ALL_INFORM_LOCATION = 'ALL_INFORM_LOCATION';
export const GET_COLOR = 'GET_COLOR'
export const GET_HEIGHT = 'GET_HEIGHT'

export const found = animal => {
    return {
        type: ANIMAL,
        payload: animal
    }
}

export const urlImg = photos => {
    return {
        type: URL_IMG,
        payload: photos
    }
}

export const tagImg = tags => {
    tags = tags.map(item => item.tag.en)
    console.log(tags);
    return {
        type: TAGS,
        payload: tags
    }
}

export const locationInform = state => {
    return {
        type: LOCATION,
        payload: state
    }
}

export const preveiwShow = status => {
    return {
        type: SHOW_PREVIEW,
        payload: status
    }
}

export const allLocationInform = state => {
    return {
        type: ALL_INFORM_LOCATION,
        payload: state
    }
}

export const getColor = state => {
    return {
        type: GET_COLOR,
        payload: state
    }
}

export const getHeight = state => {
    return {
        type: GET_HEIGHT,
        payload: state
    }
}

export const CLEAR_STATE = 'CLEAR_STATE'
export const clearStateFoundLost = () => {
    return {
        type: CLEAR_STATE
    }
}

export const navigator_geolocation = (lat, lon) => {
    return (dispatch) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                    lat = position.coords.latitude;
                    lon = position.coords.longitude;
                const location = {
                    lon: lon,
                    lat: lat
                }
                dispatch(locationInform(location))
                dispatch(postLocationInform(location))
                console.log(location)
            })
        } else {
            console.log('ERROR')
        }
    }
}

export const postLocationInform = location => {
    return (dispatch) => {
        dispatch(loadingLittle(true))
        fetch(`${test_two_url}/externaldata/en/v1/location`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(location)
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }else
                    throw new Error(response.status + '')
            })
            .then(data => {
                    dispatch(allLocationInform(data))
                    console.log(data);
                dispatch(loadingLittle(false))
            })
            .catch(e => {
                console.log(e.message)
            })
    }
}


export const allInform = (all) => {
    return (dispatch, getState) => {
        const found_are_lost = getState().routeReducer.page === 'found' ? 'found' : 'lost'
        dispatch(loadingContentAction(true))
        fetch(`${test_two_url}/lostfound/en/v1/${found_are_lost}/${getState().regReducer.user.email}`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'X-Token' : getState().regReducer.x_token
            },
            body: JSON.stringify(all)
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }else
                    throw new Error(response.status + '')
            })
            .then(data => {
                console.log(data);
                dispatch(loadingContentAction(false))
            })
            .catch(e => console.log(e.message))
    }

}

export const postLocation = address => {
    return (dispatch) => {
        dispatch(loadingContentAction(true))
        fetch(`${test_two_url}/externaldata/en/v1/address`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(address)
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }else
                    throw new Error(response.status + '')
            })
            .then(data => {
                dispatch(locationInform(data));
                console.log(data);
                dispatch(loadingContentAction(false))
            })
            .catch(e => console.log(e.message))
    }
}

export const getImgFound = (image) => {
    return (dispatch) => {
        fetch(`https://propets-app.herokuapp.com/lostfound/en/v1/tagscolors/?image_url=${image}`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }else
                    throw new Error(response.status + '')
            })
            .then(data => {
                dispatch(tagImg(data))
                console.log(data)
            })
            .catch(e => console.log(e.message))
    }
}


export const getImg =  (image) => {
 return (dispatch) => {
    fetch('https://api.imgur.com/3/image', {
            method: 'POST',
            headers: {
                Authorization: 'Client-ID 955afae64956fa3',
                'Content-Type': 'application/json'
            },
            body: image
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }else
                    throw new Error(response.status + '')
            })
            .then(result => {
                image = result.data.link
                dispatch(urlImg(image));
                dispatch(getImgFound(image))
                console.log(result.data.link)
            })
            .catch(e => console.log(e.message))
    }
}

export const getTagsImagga = (...links) => {
    return (dispatch) => {
        const arr = [];
        for (let i = 0; i < links.length; i++) {
            arr.push(  fetch(`https://api.imagga.com/v2/tags?threshold=20.0&image_url=${links[i]}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic YWNjXzYyOTEyMDk1NmVkZjA3OToyMmRlZWZiYjQyOGRkOWNiYjMxODE1OGE2NDExN2IwNA=='
                },
            }))
        }
        Promise.all(arr)
            .then(responses => responses.map(response => response.json()))
            .then(results => Promise.all(results))
            .then(data => data.map(item => item.result.tags))
            .then(tag => tag.forEach(item => {
                dispatch(getTags(item))
            }))
            .catch(e => console.log(e.message))
    }
}

export const getImgFor = (...images) => {
    return (dispatch, getState) => {
        const arr = [];
        for (let i = 0; i < images.length; i++) {
            arr.push( fetch('https://api.imgur.com/3/image', {
                method: 'POST',
                headers: {
                    Authorization: 'Client-ID 955afae64956fa3',
                    'Content-Type': 'application/json'
                },
                body: images[i]
            }))
        }
        Promise.all(arr)
            .then(responses => responses.map(response => response.json()))
            .then(results => Promise.all(results))
            .then(data => data.map(item => item.data.link))
            .then(links => links.forEach(item => {
                dispatch(getImages(item))
                if (getState().routeReducer.page === 'found' || getState().routeReducer.page === 'lost') {
                    dispatch(getTagsImagga(item))
                }
            }))
            .catch(e => console.log(e.message))
    }
}