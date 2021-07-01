import React from 'react';
import '../../../css/Start/Header.css'
import {xmlns, viewBox, logo} from "../../../utils/constants";
import {useDispatch} from "react-redux";
import {changeModal} from "../../../redux/actions/Modal/modalAndOtherActions";

const Header = () => {
    const dispatch = useDispatch();

    const handleOnscroll = () => {
        if (document.body.style.overflow !== "hidden") {
            document.body.style.overflow = "hidden";
        }
    }

    return (
        <header className={'header_start d-flex align-items-center'}>
            <div className={'container'}>
                <div className={'row justify-content-between align-items-center'}>
                    <div className={'logo_block col-xl col-md-6 col-sm-6 col-12'}>
                        <svg className={'logo_svg_header'} xmlns={xmlns} viewBox={viewBox}>
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
                    <nav className={'nav_start col-xl col-md-6 col-sm-6 col-12 ml-auto d-flex justify-content-end'}>
                        <div>
                            <button onClick={() => {
                                handleOnscroll()
                                dispatch(changeModal(true))
                            }}>Sign in</button>
                        </div>
                    </nav>
                </div>
            </div>

        </header>
    );
};



export default Header;