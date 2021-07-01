import React, {useEffect} from 'react';
import Posts from "../FoundPage/Posts";
import '../../../css/Main/Lost.css';
import {useDispatch, useSelector} from "react-redux";
import Map from "../../Map/Map";
import {
    all_i_losts_post,
    getFetchingLost,
    postPageByPageLost
} from "../../../redux/actions/Lost_Posts_Action/Lost_Posts_Action";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";
import LoaderDownPage from "../LoaderSpinner/LoaderDownPage";
import NoPosts from "../../404/NoPosts";

const PostsAndMap = ({getSortedArr}) => {
    const dispatch = useDispatch();
    const posts_losts = useSelector(state => state.lostReducer.lost_posts);
    const fetching_lost = useSelector(state => state.lostReducer.fetching_lost);
    const isLoadingContent = useSelector(state => state.loadingReducer.loading_content);

    const inputType = useSelector(state => state.modalReducer.search_type);
    const inputBreed = useSelector(state => state.modalReducer.search_breed);
    const inputTag = useSelector(state => state.modalReducer.search_features);
    const inputCit = useSelector(state => state.modalReducer.search_location);

    const itemsPage = useSelector(state => state.lostReducer.itemsPage);
    const itemsTotal = useSelector(state => state.lostReducer.itemsTotal);
    const currentPage = useSelector(state => state.lostReducer.currentPage);
    const loading_scroll = useSelector(state => state.loadingReducer.loading_scroll);
    const pageCount = Math.ceil(itemsTotal / itemsPage);

    const scrollHandler = e => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            dispatch(getFetchingLost(true))
        }
    }

    useEffect(() => {
        dispatch(all_i_losts_post())
    }, [])

    useEffect(() => {
        if (!inputType.length && !inputBreed.length && !inputTag.length && !inputCit.length) {
            if (fetching_lost) {
                dispatch(postPageByPageLost(currentPage))
            }
        } else {
            dispatch(getFetchingLost(false))
        }
    }, [fetching_lost])

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

    const postLost = () => {
        return (
            inputType.length || inputBreed.length || inputTag.length || inputCit.length ?
                getSortedArr().map((item, index) => <Posts key={index} item={item}/>)
                :
                posts_losts.map((item, index) => <Posts key={index} item={item}/>)
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
                        {postLost()}
                        { !inputType.length || !inputBreed.length || !inputTag.length || !inputCit.length
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
                </div>
            }

        </section>
    );
};

export default PostsAndMap;