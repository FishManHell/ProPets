import React from 'react';
import '../../css/Main/ErrorPage.css'
import {house} from "../../utils/fontsAwesome/Solid";
import {useHistory} from "react-router-dom";

const Error = () => {
    const history = useHistory();

    return (
        <div className={'error_page'}>
            <div className={'block_text_error_page'}>
                <span>404</span>
                <span>Not - Found</span>
            </div>

            <div className={'button_block_error_page'}>
                <button onClick={() => history.push('/main/home')}>{house}</button>
                <p>click on the house or select one of the menu items on the left</p>
            </div>
        </div>
    );
};

export default Error;