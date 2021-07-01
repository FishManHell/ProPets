import React from 'react';
import {logo, viewBox, xmlns} from "../../utils/constants";
import '../../css/Main/MainHeader.css'
import {foundIcon, lostIcon, plus} from "../../utils/fontsAwesome/Solid";
import {Link, useHistory, useLocation} from "react-router-dom";
import {closeAndOpen} from "../../redux/actions/Modal/modalAndOtherActions";
import {useDispatch, useSelector, } from "react-redux";
import {clearFoundState} from "../../redux/actions/Found_Posts_Action/Found_Posts_Action";
import {clearStateLost} from "../../redux/actions/Lost_Posts_Action/Lost_Posts_Action";

const Header = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const content = useSelector(state => state.routeReducer.page);
    const location = useLocation()

    const showingButtons = () => {
        if (content === 'found' || content === 'lost') {
            return (
                <div className={`two_button d-flex `}>
                    {location.pathname === '/main/found/i_fond' || location.pathname === '/main/lost/i_lost' ? null :
                        <button onClick={() => {
                            history.push('/main/lost/i_lost')
                        }} className={`main_add_button d-flex align-items-center yellow_button mr-4`}>
                            <span className={'lost_add'}>{lostIcon}</span>
                            <span className={'text_add d-flex justify-content-center w-100'}>I lost my pet</span>
                        </button>
                    }
                    {location.pathname === '/main/found/i_fond' || location.pathname === '/main/lost/i_lost' ? null :
                        <button onClick={() => {
                            history.push('/main/found/i_fond')
                        }} className={'main_add_button d-flex align-items-center green_button'}>
                            <span className={'found_add'}>{foundIcon}</span>
                            <span className={'text_add d-flex justify-content-center w-100'}>I found a pet</span>
                        </button>
                    }
                </div>
            )
        } else {
            if (content === 'addNew' || content === 'profile') {
                return null
            } else {
                return (
                    <div className={`main_add_button d-flex`}>
                        <Link className={`d-flex w-100 align-items-center p-0 border-0 one_button `} to={'/main/addNew'}
                              onClick={() => dispatch(closeAndOpen(false))}>
                            <span className={'plus_add'}>{plus}</span>
                            <span className={'text_add d-flex justify-content-center w-100'}>Add new</span>
                        </Link>
                    </div>
                )
            }
        }
    }

    return (
        <header className={'header_main d-flex align-items-center'}>
            <div className={'container'}>
                <div className={'row align-items-center justify-content-between'}>
                    <div className={'logo_main_block col-2'}>
                        <svg className={'logo_main_header'} xmlns={xmlns} viewBox={viewBox}>
                            <path className={'a'} d={logo.first.path} transform={logo.first.translate}/>
                            <path className={'a'} d={logo.second.path} transform={logo.second.translate}/>
                            <path className={'a'} d={logo.third.path} transform={logo.third.translate}/>
                            <path className={'a'} d={logo.fourth.path} transform={logo.fourth.translate}/>
                            <path className={'a'} d={logo.fifth.path} transform={logo.fifth.translate}/>
                            <path className={'a'} d={logo.sixth.path} transform={logo.sixth.translate}/>
                            <path className={'a'} d={logo.seventh.path} transform={logo.seventh.translate}/>
                            <path className={'a'} d={logo.eighth.path} transform={logo.eighth.translate}/>
                            <path className={'a'} d={logo.ninth.path} transform={logo.ninth.translate}/>
                            <path className={'a'} d={logo.tenth.path} transform={logo.tenth.translate}/>
                            <path className={'a'} d={logo.eleventh.path} transform={logo.eleventh.translate}/>
                            <path className={'a'} d={logo.twelfth.path} transform={logo.twelfth.translate}/>
                        </svg>
                    </div>
                    <div className={`main_add_block col-2 p-0 d-flex justify-content-end`}>
                        {showingButtons()}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;