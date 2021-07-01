import React from 'react';
import PreviewIFound from "./PreviewIFound";
import {useSelector} from "react-redux";
import IFound from "./iFound";

const RegisterIFound = () => {
    const preview = useSelector(state => state.FoundAndLostReducer.preview);

    if (preview) {
        return (
            <PreviewIFound/>
        )
    } else {
        return (
            <IFound/>
        )
    }

};

export default RegisterIFound;