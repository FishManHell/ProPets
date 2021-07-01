import React, {useEffect} from 'react';
import '../../../css/Main/Activities.css'
import {useDispatch, useSelector} from "react-redux";
import {activitiesUserPost} from "../../../redux/actions/Home/homeAction";
import Posts from "../FoundPage/Posts";
import PostsHomes from '../Home_Page/Posts'
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";
import NoPosts from "../../404/NoPosts";

const Activities = () => {
    const dispatch = useDispatch()
    const post_activities = useSelector(state => state.activitiesReducer.activities_post);
    const isLoadingContent = useSelector(state => state.loadingReducer.loading_content);
    const activitiesFlag = useSelector(state => state.activitiesReducer.activities_flag);
    const post_sort = post_activities.sort((a, b) => {
        return new Date(a.datePost) - new Date(b.datePost)
    })

    useEffect(() => {
        if (activitiesFlag) {
            dispatch(activitiesUserPost())
        }
    }, [activitiesFlag])

    const get_Activities_Post = () => {
        if (!post_sort.length) {
            return <NoPosts/>
        } else {
            return post_sort.reverse().map((item, index) =>
                post_sort[index].tags
                    ?
                    <Posts key={index} item={item}/>
                    :
                    <PostsHomes key={index} item={item}/>
            )
        }
    }

    return (
        <div className={'wrapper_activities'}>
            {isLoadingContent ? <LoaderSpinner/> : get_Activities_Post()}
        </div>
    );
};

export default Activities;