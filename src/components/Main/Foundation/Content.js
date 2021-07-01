import React, {useEffect} from 'react';
import HomePage from "../Home_Page/HomePage";
import LostPage from "../LostPage";
import Found from "../FoundPage";
import ProfilePage from "../Profile/ProfilePage";
import AddNewPage from "../AddNewPage/AddNewPage";
import {Redirect, Route, Switch, useLocation} from "react-router-dom";
import Services from "../ServicesPage/Services";
import {useDispatch, useSelector} from "react-redux";
import Register_i_found from "../FoundPage/AddNewFoundPost/Register_i_found";
import Favorites from "../Favorites";
import {clearStateFoundLost} from "../../../redux/actions/Lost_and_Found/FoundAndLostAction";
import {clearFoundState, search_arr_for_map_found} from "../../../redux/actions/Found_Posts_Action/Found_Posts_Action";
import {clearStateHome, removeStateActivities} from "../../../redux/actions/Home/homeAction";
import {clearStateImgTags} from "../../../redux/actions/Lost_and_Found/FoundAndLostGetTegImgAction";
import {clearStateLost, search_arr_for_map_lost} from "../../../redux/actions/Lost_Posts_Action/Lost_Posts_Action";
import Error from "../../404/Error";

const Content = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const content = useSelector(state => state.routeReducer.page);

    const all_post_found = useSelector(state => state.foundReducer.all_post_found);
    const all_post_lost = useSelector(state => state.lostReducer.all_post_lost);

    const inputType = useSelector(state => state.modalReducer.search_type);
    const inputBreed = useSelector(state => state.modalReducer.search_breed);
    const inputTags = useSelector(state => state.modalReducer.search_features);
    const inputCity = useSelector(state => state.modalReducer.search_location);

    let tmp = location.pathname === '/main/found' ? [...all_post_found] : [...all_post_lost];

    const getHasType = (arr, testOne, testTwo, testThree) => {
        const array = []
        if (testThree) {
            if (testTwo.length > 0) {
                arr.map(ell => {
                    const has = ell[testOne][testThree]?.toLowerCase().indexOf(testTwo.toLowerCase().trim())
                    if (has > -1) {
                        array.push(ell)
                    }
                })
            }
        } else {
            if (testTwo.length > 0) {
                arr.map(ell => {
                    const has = ell[testOne]?.toLowerCase().indexOf(testTwo.toLowerCase().trim())
                    if (has > -1) {
                        array.push(ell)
                    }
                })
            }
        }
        return array
    }

    const getHasTag = arr => {
        const array = []
        if (inputTags.length > 0) {
            arr.map(ell => {
                if (ell.hasOwnProperty('tags')) {
                    ell.tags.map(tag => {
                        const has = tag.toLowerCase().indexOf(inputTags.toLowerCase().trim())
                        if (has > -1) {
                            array.push(ell)
                        }
                    })
                }
            })
        }
        return array
    }

    const getSortedArr = () => {
        let arr = []
        const sortedArr =
            [
                ...getHasType(tmp, 'type', inputType),
                ...getHasType(tmp, 'breed', inputBreed),
                ...getHasTag(tmp),
                ...getHasType(tmp, 'address', inputCity, 'city')
            ]
        sortedArr.map(ell => {
            if (!arr.includes(ell)) {
                arr = [...arr, ell]
            }
        })
        let obj = {
            type: inputType.toLowerCase().trim(),
            breed: inputBreed.toLowerCase().trim(),
            tags: inputTags.toLowerCase().trim(),
            city: inputCity.toLowerCase().trim()
        }
        arr = arr.filter(el => {
            return el.type?.toLowerCase().includes(obj.type)
                &&
                el.breed?.toLowerCase().includes(obj.breed)
                &&
                el.tags?.join('').toLowerCase().includes(obj.tags)
                &&
                el.address.city?.toLowerCase().includes(obj.city)
        })

        if (location.pathname === '/main/found') {
            dispatch(search_arr_for_map_found(arr))
        } else {
            dispatch(search_arr_for_map_lost(arr))
        }
        return arr
    }

    useEffect(() => {
        if (location.pathname) {
            dispatch(clearStateHome())
            dispatch(clearFoundState())
            dispatch(clearStateLost())
            dispatch(clearStateFoundLost())
            dispatch(clearStateImgTags())
            dispatch(removeStateActivities())
        }
    }, [location.pathname])

    return (
        <div
            className={`wrapper_central_block_main ${content === 'found' || content === 'lost' ? 'col-10 pr-0' : 'col-8'}`}>
            <div className={'h-100 background_block'}>
                <Switch>
                    <Route exact path={'/main/home'} component={HomePage}/>
                    <Route exact path={'/main/lost'} render={() => <LostPage getSortedArr={getSortedArr}/>}/>
                    <Route exact path={'/main/found'} render={() => <Found getSortedArr={getSortedArr}/>}/>
                    <Route exact path={['/main/found/i_fond', '/main/lost/i_lost']} component={Register_i_found}/>
                    <Route path={'/main/services/'} component={Services}/>
                    <Route exact path={'/main/favorites'} component={Favorites}/>
                    <Route exact path={'/main/profile'} component={ProfilePage}/>
                    <Route exact path={'/main/addNew'} component={AddNewPage}/>
                    <Redirect exact from='/' to='/main/home'/>
                    <Redirect exact from='/main' to='/main/home'/>
                    <Route path={"/"} to={'/main/404'} component={Error}/>
                </Switch>
            </div>
        </div>
    );
};
export default Content;