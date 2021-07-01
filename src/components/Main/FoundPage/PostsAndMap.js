import React, {useEffect} from 'react';
import Posts from "./Posts";
import '../../../css/Main/Lost.css';
import {useDispatch, useSelector} from "react-redux";
import {postPageByPageFound, all_i_found_post, getFetchingFound} from "../../../redux/actions/Found_Posts_Action/Found_Posts_Action";
import Map from "../../Map/Map";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";
import LoaderDownPage from "../LoaderSpinner/LoaderDownPage";
import NoPosts from "../../404/NoPosts";

const PostsAndMap = ({getSortedArr}) => {
    const dispatch = useDispatch();
    const isLoadingContent = useSelector(state => state.loadingReducer.loading_content);
    const postsFond = useSelector(state => state.foundReducer.found_posts);

    const inputType = useSelector(state => state.modalReducer.search_type);
    const inputBreed = useSelector(state => state.modalReducer.search_breed);
    const inputTag = useSelector(state => state.modalReducer.search_features);
    const inputCit = useSelector(state => state.modalReducer.search_location);

    const itemsPage = useSelector(state => state.foundReducer.itemsPage);
    const itemsTotal = useSelector(state => state.foundReducer.itemsTotal);
    const currentPage = useSelector(state => state.foundReducer.currentPage);
    const fetching_found = useSelector(state => state.foundReducer.fetching_found);
    const loading_scroll = useSelector(state => state.loadingReducer.loading_scroll);
    const pageCount = Math.ceil(itemsTotal / itemsPage);

    const scrollHandler = e => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            dispatch(getFetchingFound(true))
        }
    }

    useEffect(() => {
        dispatch(all_i_found_post());
    }, [])

    useEffect(() => {
        if (!inputType.length && !inputBreed.length && !inputTag.length && !inputCit.length) {
            if (fetching_found) {
                dispatch(postPageByPageFound(currentPage))
            }
        } else {
            dispatch(getFetchingFound(false))
        }
    }, [fetching_found])

    useEffect(() => {
        if (currentPage <= pageCount) {
            window.addEventListener('scroll', scrollHandler)
            return function () {
                window.removeEventListener('scroll', scrollHandler)
            }
        } else {
            return null
        }
    }, [currentPage])

    const postFound = () => {
        return (
            inputType.length || inputBreed.length || inputTag.length || inputCit.length ?
                getSortedArr().map((item, index) => <Posts key={index} item={item}/>)
                :
                postsFond.map((item, index) => <Posts key={index} item={item}/>)
        )
    }

    return (
        <section className={`d-flex ${isLoadingContent ? 'justify-content-center vh-100' : null}`}>
            {isLoadingContent
                ?
                <LoaderSpinner/>
                :
                <div className={'d-flex'}>
                <div>
                    {postFound()}
                    {!inputType.length || !inputBreed.length || !inputTag.length || !inputCit.length
                        ?
                        loading_scroll && <LoaderDownPage/>
                        :
                        null

                    }
                    {!(currentPage <= pageCount)
                        ?
                        <NoPosts/>
                        :
                        null
                    }
                </div>

                <div className={'map_lost_found'}>
                    <Map/>
                </div>
            </div>}
        </section>
    );
};

export default PostsAndMap;