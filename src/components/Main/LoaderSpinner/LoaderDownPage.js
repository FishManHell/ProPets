import React from 'react';
import PulseLoader from "react-spinners/PulseLoader";

const LoaderDownPage = () => {
    return (
        <div className={'d-flex justify-content-center align-items-center'}>
            <PulseLoader color={"#669885"} size={25}/>
        </div>
    );
};

export default LoaderDownPage;