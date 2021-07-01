import React from 'react';
import {useLocation} from "react-router-dom";
import {animateScroll} from "react-scroll";

const NoPosts = () => {
    const location = useLocation()

    const scrollTest = () => {
        animateScroll.scrollToTop();
    }

    return (
        <div className={'d-flex align-items-center justify-content-center'}>
            {location.pathname === '/main/profile' ?
                <p className={'text-end-everywhere m-0 '}>{location.pathname === '/main/profile' ? 'There are no active posts yet' :  'No more posts'}</p>
                :
                <p onClick={() => scrollTest()} className={'text-end-everywhere m-0 '}>{location.pathname === '/main/profile' ? 'There are no active posts yet' :  'No more posts'}</p>
            }
        </div>
    );
};

export default NoPosts;