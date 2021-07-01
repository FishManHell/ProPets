import React, {useEffect} from 'react';
import '../../../css/Main/InformPetsMain.css'
import '../../../css/Main/HomePage.css'
import Posts from "./Posts";
import {useDispatch, useSelector} from "react-redux";
import {allPostTestHome, getFavoritesPost, setFetching} from "../../../redux/actions/Home/homeAction";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";
import LoaderDownPage from "../LoaderSpinner/LoaderDownPage";
import NoPosts from "../../404/NoPosts";

const HomePage = () => {
    const dispatch = useDispatch();
    const homePosts = useSelector(state => state.homeReducers.home_posts);
    const isLoadingContent = useSelector(state => state.loadingReducer.loading_content);

    const itemsPage = useSelector(state => state.homeReducers.itemsPage);
    const itemsTotal = useSelector(state => state.homeReducers.itemsTotal);
    const currentPage = useSelector(state => state.homeReducers.currentPage);
    const fetching_home = useSelector(state => state.homeReducers.fetching_home);

    const loading_scroll = useSelector(state => state.loadingReducer.loading_scroll);
    const favorites_flag = useSelector(state => state.homeReducers.favorites_flag);

    const pagesCount = Math.ceil(itemsTotal / itemsPage);

    const scrollHandler = e => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            dispatch(setFetching(true))
        }
    }

    useEffect(() => {
        if (fetching_home) {
            dispatch(allPostTestHome(currentPage))
        }
    }, [fetching_home])

    useEffect(() => {
        if (favorites_flag) {
            dispatch(getFavoritesPost())
        }
    }, [favorites_flag])

    useEffect(() => {
        if (currentPage <= pagesCount) {
            window.addEventListener('scroll', scrollHandler)
            return () => {
                window.removeEventListener('scroll', scrollHandler)
            }
        } else {
            return null
        }
    }, [currentPage])

    useEffect(() => {
        window.scroll(0,0)
    }, [])


    const mapHomePosts = () => {
        if (homePosts) {
            return homePosts.map((item, index) => <Posts key={index} item={item}/>)
        } else {
            return null
        }
    }

    return (
        <section className={`inform_pets_main ${isLoadingContent ? 'vh-100' : null}`}>
            {
                isLoadingContent
                    ?
                    <LoaderSpinner/>
                    :
                    <div>
                        {mapHomePosts()}
                        {loading_scroll && <LoaderDownPage/>}
                    </div>
            }
            {!(currentPage <= pagesCount) ? <NoPosts/> : null}
        </section>
    );
};

export default HomePage;