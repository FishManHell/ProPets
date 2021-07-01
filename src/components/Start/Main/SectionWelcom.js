import React from 'react';
import dog from '../../../img/Welcom/Image 2.png'
import searchImg from '../../../img/Welcom/Group 11.png'
import '../../../css/Start/WelcomSection.css'
import {changeModal} from "../../../redux/actions/Modal/modalAndOtherActions";
import {useDispatch, useSelector} from "react-redux";

import {changeTextGreen, changeTextYellow} from "../../../redux/actions/Any_Actions/startChangeTextButton";
import {useHistory} from "react-router-dom";

const SectionWelcom = () => {
    const dispatch = useDispatch();
    const history = useHistory ()
    const yellowSearch = useSelector(state => state.modalReducer.yellow_button);
    const greenSearch = useSelector(state => state.modalReducer.green_button);

    return (
        <section className={'welcom_section'}>
                <div className={'container'}>
                    <div className={'row flex-nowrap align-items-center'}>
                        <aside className={'aside_left col-xl-6'}>
                            <h1>Welcome to your <span>pawfessional</span> community</h1>
                            <div className={'findPets btn_wrap_yellow'}>
                                <button className={'d-flex align-items-center justify-content-between'} onClick={() => {dispatch(changeModal(true))
                                    history.push('/main/lost')}}
                                        onMouseOver={() => dispatch(changeTextYellow('Click tot find'))}
                                        onMouseOut={() => dispatch(changeTextYellow('I lost my pet!'))}>
                                    <span>{yellowSearch}</span>
                                    <div className={'search_img_block'} >
                                        <img src={searchImg} alt={searchImg}/>
                                    </div>
                                </button>
                            </div>

                            <div className={'what_to_do btn_wrap_green'}>
                                <button className={'d-flex align-items-center'} onClick={() => {dispatch(changeModal(true))
                                    history.push('/main/found')}}
                                        onMouseOut={() => dispatch(changeTextGreen('I found a pet'))}
                                        onMouseOver={() => dispatch(changeTextGreen('What to do?'))}>
                                    <span>{greenSearch}</span>
                                </button>
                            </div>

                            <div className={'join_block'}>
                                <h6>I’m okay, just want to <span className={'text-uppercase'} onClick={() => {
                                    dispatch(changeModal(true))
                                    history.push('/main/home');
                                }}>join</span> the pawsome community!</h6>
                            </div>
                        </aside>
                        <aside className={'aside_right d-flex justify-content-end col-xl-6'}>
                            <img src={dog} alt={dog}/>
                        </aside>
                    </div>
                </div>
        </section>
    );
};
export default SectionWelcom;