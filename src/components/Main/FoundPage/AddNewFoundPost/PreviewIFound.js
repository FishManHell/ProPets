import React from 'react';
import {edit, foundIcon, map_marker, messages, phone} from "../../../../utils/fontsAwesome/Solid";
import '../../../../css/Main/I_found.css'
import {useDispatch, useSelector} from "react-redux";
import {allInform, preveiwShow} from "../../../../redux/actions/Lost_and_Found/FoundAndLostAction";
import {useHistory, useLocation} from "react-router-dom";
import ImagesCheck from "../../Images_CheckEverywhere/Images_Check";
import {drag_and_drop} from "../../../../redux/actions/Modal/modalAndOtherActions";
import {facebook} from "../../../../utils/fontsAwesome/Regular";

const PreviewIFound = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const location = useLocation()
    const animal = useSelector(state => state.FoundAndLostReducer.animal)
    const user = useSelector(state => state.regReducer.user);

    const printArrTags = () => {
       return  animal.tags.map((item, index) => {
            if (index !== animal.tags.length-1){
                return <span key={index}>{item.concat(', ')}</span>
            }
            if (index === animal.tags.length-1) {
                return <span key={index}>{item.concat('. ')}</span>
            }
        })
    }

    const changeLocationButton = () => {
        if (location.pathname === '/main/lost/i_lost') {
            history.push('/main/lost')
        } else {
            history.push('/main/found')
        }
    }

    const postDate = () => {
        const d = new Date();
        const monthNames = [
            "Jan", "Feb", "Mar",
            "Apr", "May", "Jun",
            "Jul", "Aug", "Sept",
            "Oct", "Nov", "Dec"
        ];
        return `${monthNames[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    };

    const handleClickPushAll = () => {
        dispatch(allInform(animal))
    }

    return (
        <div className={'wrapper_i_found col-9 p-0'}>
            <p className={'preview_and_publish_text'}><span>Preview and Publish.</span> Please share the post to your FB to be more effective.</p>
            <section className={'section_activities preview_block_i_found d-flex'}>
                <div className={'profile_post_img i_found_img_post'}>
                    <ImagesCheck item={animal}/>
                </div>
                <div className={'profile_post_inform i_found_post_inform'}>
                    <div className={'first_block d-flex justify-content-between'}>
                        <p className={'activities_head'}>{animal.type}, <span>{animal.breed}</span></p>
                    </div>
                    <div className={'second_block d-flex justify-content-between'}>
                        <div>
                            <p className={'m-0'}> Color: <span>{animal.tags[0]}</span></p>
                            <p className={'m-0'}>Sex: <span>{animal.sex}</span></p>
                            <p className={'m-0'}>Height: <span>{animal.tags[1]}</span></p>
                        </div>
                    </div>
                    <div className={'third_block third_block_i_found_preview'}>
                        <p>
                            Description: {printArrTags()}
                        </p>
                    </div>
                    <div className={'border_i_found_block_end'}>
                        <div>
                            <span className={'marker_i_found'}>{map_marker}</span>
                            <span>{animal.address.street}, <span>{animal.address.building}</span>, {animal.address.city}</span>
                        </div>
                        <div className={'d-flex justify-content-between align-items-center mt-2'}>
                            <div className={'d-flex align-items-center'}>
                                <div className={'photo_inform i_found_prof_photo'}>
                                    <img src={user.avatar} alt={user.avatar}/>
                                </div>
                                <div className={'inform_user_i_found'}>
                                    <p className={'m-0'}>{user.name}</p>
                                    <p className={'m-0'}>{postDate()}</p>
                                </div>
                            </div>
                            <div>
                                <span className={'icon_inform_preview pl-3'}>{phone}</span>
                                <span className={'icon_inform_preview pl-3'}>{facebook}</span>
                                <span className={'icon_inform_preview pl-3'}>{messages}</span>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <div className={'inform_end_i_found'}>
                <p>Fingers crossed. We wish your fluffy to be found as soon as possible. Your post will expire in two weeks. To make it active again follow the instructions you’ll get in email.</p>
            </div>
            <div className={'d-flex justify-content-end button_preview'}>
                <button onClick={() => {
                    dispatch(preveiwShow(false))
                    dispatch(drag_and_drop(true))
                }} className={'edit_i_found'}><span className={'preview_icon'}>{edit}</span> <span className={'preview_icon preview_icon_span'}>Edit</span></button>
                <button className={'i_found_button d-flex align-items-center'} onClick={() => {
                    handleClickPushAll()
                    changeLocationButton()
                }}>
                    <span className={'found_add i_found_add_icon'}>{foundIcon}</span>
                    <span className={'text_add i_found_text_button d-flex justify-content-center w-100'}>Publish</span>
                </button>
            </div>
            <p className={'end_publish_text'}>By clicking “Publish”, you agree to us processing your information in accordance with these terms.</p>
        </div>
    );
};

export default PreviewIFound;