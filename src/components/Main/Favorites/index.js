import React, {useEffect} from 'react';
import '../../../css/Main/Favorites.css'
import {useDispatch, useSelector} from "react-redux";
import {getFavoritesPost} from "../../../redux/actions/Home/homeAction";
import Posts from "../Home_Page/Posts";
import {arrow_up} from "../../../utils/fontsAwesome/Solid";
import {useHistory} from "react-router-dom";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";

const Favorites = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const favorites_post = useSelector(state => state.homeReducers.favorites_post);
    const favorites_flag = useSelector(state => state.homeReducers.favorites_flag);
    const isLoadingContent = useSelector(state => state.loadingReducer.loading_content);

    useEffect(() => {
        if (!favorites_post.length) {
            dispatch(getFavoritesPost())
        }
    }, [])

    useEffect(() => {
        if (favorites_flag) {
            dispatch(getFavoritesPost())
        }
    }, [favorites_flag])

    const printFavoritesPost = () => {
        if (favorites_post.length) {
            return favorites_post.map((item, index) => <Posts key={index} item={item}/>)
        } else {
            return(
                <div className={'block_post_favorites'}>
                    <button onClick={() => history.push('/main/home')} className={'arrow_favorites'}>{arrow_up}</button>
                    <span className={'post_favorites_dont_have'}>NO MORE POSTS</span>
                    <span className={'post_favorites_text'}>Click on the arrow go to Home</span>
                </div>
            )
        }
    }

    return (
        <section className={'inform_pets_main'}>
            <p className={'favorites_paragraph'}>
                <span className={'favorites_paragraph_span'}>Your favorites.</span>
                Find them here anytime.
            </p>
            {isLoadingContent ? <LoaderSpinner/> : printFavoritesPost()}
        </section>
    )
};

export default Favorites;