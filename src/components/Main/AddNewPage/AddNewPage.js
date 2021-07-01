import React, {useEffect, useRef, useState} from 'react';
import '../../../css/Main/AddNew.css'
import {defText} from "../../../utils/constants";
import {foundIcon, plus, signOutAlt, times} from "../../../utils/fontsAwesome/Solid";
import {useDispatch, useSelector} from "react-redux";
import {getImgFor} from "../../../redux/actions/Lost_and_Found/FoundAndLostAction";
import {drag_and_drop} from "../../../redux/actions/Modal/modalAndOtherActions";
import {getNameFiles, removeImageTags} from "../../../redux/actions/Lost_and_Found/FoundAndLostGetTegImgAction";
import {createPost} from "../../../redux/actions/Home/homeAction";
import {useHistory} from "react-router-dom";

const AddNewPage = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const user = useSelector(state => state.regReducer.user);
    const DnD = useSelector(state => state.modalReducer.DnD);
    const images = useSelector(state => state.FoundAndLostGetTegImgReducer.photos);
    const fileNames = useSelector(state => state.FoundAndLostGetTegImgReducer.nameFiles);

    const [textTextarea, setTextTextarea] = useState(defText);
    const textareaRef = useRef(null);

    useEffect(() => {
        textareaRef.current.style.height = "auto";
        const scrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = scrollHeight + "px";
    }, [textTextarea]);

    const handleClickPublish = () => {
        const new_post = {
            username: user.name,
            avatar: user.avatar,
            text: textTextarea,
            images: [...images]
        }
        if (textTextarea && images.length) {
            dispatch(createPost(new_post))
            dispatch(drag_and_drop(false))
            history.push('/main/home')

        } else {
            return alert('ERROR')
        }
    }

    const handleClickChange = (e) => {
        const files = e.target.files
        console.log(files);
        if (images.length === 0) {
            dispatch(drag_and_drop(true))
        }
        for (let i = 0; i < files.length; i++) {
            if (files.length <= 2) {
                if (fileNames.length >= 4) {
                    return
                } else {
                    dispatch(getImgFor(files[i]))
                    dispatch(getNameFiles(files[i]))
                }
            } else {
                dispatch(drag_and_drop(false))
                alert('Not to More')
            }
        }
    }

    const onDrop = e => {
        e.preventDefault()
        const file_drop_array = []
        const files = [...e.dataTransfer.files]
        if (files.length <= 2) {
            files.map(i => {
                if (fileNames.length >= 4) {
                    return
                } else {
                    file_drop_array.push(i)
                    dispatch(getImgFor(i))
                }
            })
        } else {
            dispatch(drag_and_drop(false))
            return alert('Not to More')
        }
        file_drop_array.forEach(i => dispatch(getNameFiles(i)))
    }

    const dragStart = e => {
        e.preventDefault()
        dispatch(drag_and_drop(true))
    }

    const dragFinish = e => {
        e.preventDefault()
        dispatch(drag_and_drop(false))
    }

    const removeFile = (index) => {
        dispatch(removeImageTags(index))
    }

    const changePlusBlock = () => {
        const block =
                <label
                    className={'label_input_file_i_found d-flex align-items-center justify-content-center m-0 label_small_block'}
                    htmlFor="img_file">
                    <span onClick={() => dispatch(drag_and_drop(true))}>{plus}</span>
                    <input type="file" id={'img_file'}
                           name={'img_file'}
                           multiple={'multiple'}
                           accept={"image/jpeg,image/png,image/gif"}
                           onChange={e => handleClickChange(e)}/>
                </label>
        const array = [block, block, block];
        return array.map((block, index) =>
            images[index + 1] ?
                <div key={index + 1} className={'small_block'}><img className={'w-100 h-100'} src={images[index + 1]} alt={user.name}/></div>
                :
                <div key={index + 1} className={'small_block'}>{block}</div>)
    }

    return (
        <section className={'inform_pets_main pb-4'}>
            <p className={'head_add_new mb-3'}><span>Your new post! </span>Simply text, add photos and publish.</p>
            <div className={'second_post d-flex flex-column'}>
                <div className={'d-flex add_news'}>
                    <div className={'add_new_text d-flex flex-column pl-0 col-2'}>
                        <label>
                            Text:
                        </label>
                        <span>up to 1500 char</span>
                    </div>
                    <div className={'col-10 p-0'}>
                         <textarea
                             className={'add_new_block_text'}
                             ref={textareaRef}
                             placeholder={textTextarea}
                             value={textTextarea}
                             onChange={e => setTextTextarea(e.target.value)}
                             maxLength={1500}
                         />
                    </div>
                </div>
                <div className={'block_dnd d-flex'}>
                    <div className={'add_new_text d-flex flex-column pl-0 col-2'}>
                        <label>Text:</label>
                        <span>up to 4 images</span>
                    </div>
                    <div className={'block_img_dnd col-4 d-flex justify-content-between p-0'}>
                        <div className={'big_block d-flex align-items-center justify-content-center'}>
                            {
                                !images.length ?
                                    <label
                                        className={'label_input_file_i_found d-flex align-items-center justify-content-center m-0 label_big_block'}
                                        htmlFor="img_file">
                                        <span onClick={() => dispatch(drag_and_drop(true))}>{plus}</span>
                                        <input type="file" id={'img_file'}
                                               name={'img_file'}
                                               multiple={'multiple'}
                                               accept={"image/jpeg,image/png,image/gif"}
                                               onChange={e => handleClickChange(e)}/>
                                    </label>
                                    : <img className={'w-100 h-100'} src={images[0]} alt={user.name}/>
                            }
                        </div>
                        <div className={'big_block_under_small_block'}>
                            {changePlusBlock()}
                        </div>
                    </div>
                    <div className={'block_button_dnd col-3'}>
                        <span className={'signOutAlt'}>{signOutAlt}</span>
                        <p className={'m-0 paragraph_dnd_button'}>Drag and drop photos or</p>
                        <button className={'button_dnd p-0'}>
                            <label
                                className={'label_input_file_i_found d-flex align-items-center justify-content-center m-0'}
                                htmlFor="img_file">
                                <span onClick={() => dispatch(drag_and_drop(true))}>Browse</span>
                                <input type="file" id={'img_file'} name={'img_file'} multiple={'multiple'}
                                       accept={"image/jpeg,image/png,image/gif"} onChange={e => handleClickChange(e)}/>
                            </label>
                        </button>
                    </div>
                    {DnD ?
                        <div
                            className={'block_from_img_dnd d-flex flex-column col-3 p-0'}
                            onDragStart={e => dragStart(e)}
                            onDragLeave={e => dragFinish(e)}
                            onDragOver={e => dragStart(e)}
                            onDrop={e => onDrop(e)}>
                            {fileNames ? fileNames.map((item, index) =>
                                <div className={'d-flex justify-content-between p-1 align-items-center file-name-addNew'}
                                     key={index + 1}>
                                    <span className={'name_img_i_found'}>{item.name.length > 10 ? item.name.substring(0, 10) + '...' : item.name} {item.name.split('.')[item.name.split('.').length - 1]}</span>
                                    <button className={'remove_button_img_tags'}
                                            onClick={(e) => removeFile(index)}>{times}</button>
                                </div>) : null}
                            {fileNames.length >= 4 ?
                                <span className={'text-center pt-2'}>не более 4</span> : null}
                        </div>
                        :
                        <div
                            className={'drag d-flex justify-content-between align-items-center text-center text-uppercase col-3 p-0'}
                            onDragStart={(e) => dragStart(e)}
                            onDragLeave={(e) => dragFinish(e)}
                            onDragOver={(e) => dragStart(e)}
                        >
                            <span>move here and release the file to download</span>
                        </div>}
                </div>
                <div className={'block_dnd_publish d-flex justify-content-between align-items-center'}>
                    <div className={'d-flex align-items-center pl-1'}>
                        <div className={'photo_inform'}>
                            <img src={user.avatar} alt={user.name}/>
                        </div>
                        <span className={'name_profile_dnd'}>{user.name}</span>
                    </div>
                    <button className={'button_publish_dnd d-flex align-items-center'} onClick={() => handleClickPublish()}>
                        <span>{foundIcon}</span>
                        Publish
                    </button>
                </div>
            </div>
        </section>
    );
};

export default AddNewPage;