import React, {useState} from 'react';
import {camera, pencil, save} from "../../../utils/fontsAwesome/Solid";
import {useDispatch, useSelector} from "react-redux";
import {defaultPhone} from "../../../utils/constants";
import {editUser, getImg} from "../../../redux/actions/Accounting/accountingAction";
import {useHistory} from "react-router-dom";

const MyProfile = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.regReducer.user);
    //Ислопльзуется
    const [nameOne, setName] = useState('');
    const [phoneOne, setPhone] = useState('');
    const [avatarOne, setAvatar] = useState('');
    const [src, setSrc] = useState('');
    ///////////////////////////////////////////////////
    //Не используется
    const [urlText, setUrlText] = useState('');
    const [email, setEmail] = useState('');
    ///////////////////////////////////////////////////
    const [isEdit, setIsEdit] = useState(true);

    const handleAvatarChange = img => {
        if (img && img.type.match('image.*')) {
            setSrc(URL.createObjectURL(img));
            setAvatar(img);
            console.log(URL.createObjectURL(img))
        }
    };

    const handleEdit = () => {
        const userOne = {
            name: nameOne || user.name,
            avatar: avatarOne || user.avatar,
            phone: phoneOne || user.phone
        };
        if (avatarOne) {
            dispatch(getImg(userOne))
        } else {
            dispatch(editUser(userOne))
        }
    }

    return (
        <section className={'section_profile'}>
            <div className={'profile_block_form'}>
                <div className={'form_filling'}>
                    <div className={'block_img_name_profile d-flex align-items-center'}>
                        <div className={'photo_inform'}>
                            <label>
                                <div className={'camera_button_block'}>
                                    <span className={'camera_button'}>{camera}</span>
                                </div>
                                <input
                                    type="file" accept={"image/jpeg,image/png,image/gif"}
                                    onChange={e => handleAvatarChange(e.target.files[0])}/>
                            </label>
                            <img src={src || user.avatar} alt={user.name}/>
                        </div>
                        {
                            isEdit ?
                            <p className={'m-0 mr-1'}>{nameOne || user.name}</p>
                            :
                            <input type="text" placeholder={user.name} value={nameOne} onChange={e => setName(e.target.value)}/>
                        }
                            <button onClick={() => setIsEdit(!isEdit)}>{pencil}</button>
                    </div>
                    <div className={'input_profile d-flex'}>
                        <div className={'block_label d-flex flex-column justify-content-around'}>
                            <label className={'m-0'}>Email:</label>
                            <label className={'m-0'}>Phone:</label>
                            <label className={'m-0'}>FB link:</label>
                        </div>
                        <div className={'block_input profile_block_input'}>
                            <input
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                                type="email"
                                readOnly="readonly"
                                placeholder={'helenjohnson@gmail.com'}/>
                            <input
                                onChange={e => setPhone(e.target.value)}
                                value={phoneOne}
                                type="tel"
                                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                placeholder={defaultPhone}/>
                            <input
                                type="url"
                                readOnly="readonly"
                                onChange={e => setUrlText(e.target.value)}
                                value={urlText}
                                placeholder={'https://www.facebook.com/anna.smith908430'}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={'block_button_footer_modal profile_button_block'}>
                <button className={'cancel_model'} onClick={() => {
                    history.push('/main/home')
                }}>Cancel</button>
                <button onClick={() => {
                    handleEdit()
                }} className={'submit_model'}><span className={'icon_found_modal icon_profile'}>{save}</span>Save changes</button>
            </div>
        </section>
    );
};

export default MyProfile;