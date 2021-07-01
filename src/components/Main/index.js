import React, {useEffect} from 'react';
import Header from "./Header";
import Main from "./Foundation/Main";
import {useDispatch} from "react-redux";
import {routeAction} from "../../redux/actions/Any_Actions/routeAction";

const StartMain = (props) => {
    const dispatch = useDispatch();
    const content = props.match.params.content;


    useEffect(() => {
        dispatch(routeAction(content));
    }, [props.match.params])



    return (
        <div className={'wrapper'}>
            <Header/>
            <Main/>
        </div>
    );
};

export default StartMain;