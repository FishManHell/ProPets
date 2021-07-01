import React from 'react';
import SearchHeader from "./SearchHeader";
import PostsAndMap from "./PostsAndMap";

const Found = ({getSortedArr}) => {

    return (
        <div className={'wrapper_lost'}>
            <SearchHeader/>
            <PostsAndMap getSortedArr={getSortedArr}/>
        </div>
    );
};

export default Found;