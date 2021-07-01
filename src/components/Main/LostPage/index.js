import React from 'react';
import PostsAndMap from "./PostsAndMap";
import SearchHeader from "../FoundPage/SearchHeader";

const LostPage = ({getSortedArr}) => {
    return (
        <div className={'wrapper_lost'}>
            <SearchHeader/>
            <PostsAndMap getSortedArr={getSortedArr}/>
        </div>
    );
};

export default LostPage;