import React from 'react';
import '../../css/Form/Form.css'
import {logo, viewBox, xmlns} from "../../utils/constants";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import {facebook} from "../../utils/fontsAwesome/Regular";
import {useDispatch, useSelector} from "react-redux";
import {changeModal, formModal} from "../../redux/actions/Modal/modalAndOtherActions";
import {useHistory, useLocation} from "react-router-dom";

const Modal = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation()
    const stateModal = useSelector(state => state.modalReducer.modal);
    const formState = useSelector(state => state.modalReducer.form_state);

    const changeScroll = () => {
        if (document.body.style.overflow === "hidden") {
            document.body.style.overflow = "auto";
        }
    }

    const handleDirection = () => {
        if (location.pathname === '/main/lost') {
            history.push('/main/lost')
        } else if (location.pathname === '/main/found') {
            history.push('/main/found')
        } else {
            history.push('/main/home')
        }
    }


    return (
        <div className={`modal__wrapper ${stateModal ? 'open' : 'close'}`}>
            <div className={'modal__body'}>
                <div className={'d-flex justify-content-between align-items-center'}>
                    <svg className={'logo_svg__modal'} xmlns={xmlns} viewBox={viewBox}>
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
                    <button className={'modal__close'} onClick={() => {
                        changeScroll()
                        dispatch(changeModal(false))
                        history.push('/start')
                    }}>x
                    </button>
                </div>
                <div className={'modal_section_welcom d-flex justify-content-between align-items-center'}>
                    <div className={'modal_welcome_block'}>
                        <p className={'m-0'}><span>Welcome!</span> Please sign in / sign up to continue or</p>
                    </div>
                    <div className={'link_facebook d-flex align-items-center'}>
                        <span className={'facebook_icon'}>{facebook}</span>
                        <span className={'text_link_icon'}>Enter with Facebook</span>
                    </div>
                </div>
                <div className={'block_for_form'}>
                    <div className={'button_form d-flex justify-content-between align-items-center'}>
                        <button className={`sing_up ${formState ? 'active' : 'not_active'} m-0 `}
                                onClick={() => dispatch(formModal(true))}>Sign up
                        </button>
                        <button className={`sign_in ${!formState ? 'active' : 'not_active'}  m-0`}
                                onClick={() => dispatch(formModal(false))}>Sign in
                        </button>
                    </div>
                </div>
                {formState
                    ?
                    <SignUp changeScroll={changeScroll} handleDirection={handleDirection}/>
                    :
                    <SignIn changeScroll={changeScroll} handleDirection={handleDirection}/>}
            </div>
        </div>
    );
};

export default Modal;