import React from 'react';
import BounceLoader from "react-spinners/BounceLoader";
import {useLocation} from "react-router-dom";
import {ClipLoader} from "react-spinners";

const LoadingLittle = () => {
    const location = useLocation()
    return (
        <div className={'location_i_found d-flex flex-column pt-2'}>
            <div className={'loader_block'}>
                {location.pathname === '/main/home' || location.pathname === '/main/favorites'
                    ?
                    <ClipLoader color={'#000000'} size={30}/>
                    :
                    <BounceLoader color={"#669885"} size={100}/>
                }
            </div>
        </div>
    );
};

export default LoadingLittle;