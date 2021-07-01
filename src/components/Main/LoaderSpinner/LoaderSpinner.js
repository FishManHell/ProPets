import React from 'react';
import BounceLoader from "react-spinners/BounceLoader";
import {useLocation} from "react-router-dom";

const LoaderTest = () => {
    const location = useLocation()

    return (
        <div className={'wrapper_central_block_main h-100'}>
            <div className={'h-100 w-100 background_block'}>
                <div className={`loader_block ${location.pathname === '/main/profile' ? 'vh-100' : null}`}>
                    <BounceLoader color={"#669885"} size={500}/>
                </div>
            </div>
        </div>
    );
};

export default LoaderTest;