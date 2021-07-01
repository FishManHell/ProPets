import React from 'react';
import {map_marker, pencil, trash} from "../../../utils/fontsAwesome/Solid";
import ImagesCheck from "../Images_CheckEverywhere/Images_Check";
import {useDispatch, useSelector} from "react-redux";
import {removeActivitiesLostFoundPost} from "../../../redux/actions/Home/homeAction";

const Posts = ({item}) => {
    const dispatch = useDispatch()
    const content = useSelector(state => state.routeReducer.page);

    return (
    <section className={'section_activities preview_block_i_found  d-flex'}>
        <div className={'profile_post_img i_found_img_post'}>
            <ImagesCheck item={item}/>
        </div>
        <div className={'profile_post_inform i_found_post_inform '}>
            <div className={'first_block d-flex justify-content-between'}>
                <p className={'activities_head'}>{item.type}, <span>{item.breed}</span></p>
                {
                    content === 'profile'
                        ?
                        <div className={'icon_activities_head'}>
                            <button>{pencil}</button>
                            <button onClick={() => {
                                dispatch(removeActivitiesLostFoundPost(item.id))
                            }}>{trash}</button>
                        </div>
                        :
                        null
                }
            </div>
            <div className={'second_block d-flex justify-content-between'}>
                <div>
                    <p className={'m-0'}> Color: <span>{item.tags[0]}</span></p>
                    <p className={'m-0'}>Sex: <span>{item.sex}</span></p>
                    <p className={'m-0'}>Height: <span>{item.tags[1]}</span></p>
                </div>
            </div>
            <div className={'third_block third_block_i_found_preview'}>
                <p>
                    Description:
                    {item.tags.map((tag, index) => {
                        if(index !== item.tags.length - 1) {
                            return <span className={'tags'} key={index}>{tag.concat(', ')}</span>
                        }
                        if (index === item.tags.length - 1) {
                            return <span className={'tags'} key={index}>{tag.concat('. ')}</span>
                        }
                    })}
                </p>
            </div>
            <div className={'border_i_found_block_end'}>
                <div>
                    <span className={'marker_i_found'}>{map_marker}</span>
                    <span>{item.address.street}, <span>{item.address.building}</span>, {item.address.city}</span>
                </div>
                <div className={'d-flex mt-2 align-items-center'}>
                    <div className={'photo_inform i_found_prof_photo'}>
                        <img src={item.avatar} alt={item.avatar}/>
                    </div>
                    <div className={'inform_user_i_found'}>
                        <p className={'m-0'}>{item.username}</p>
                        <p className={'m-0'}>{item.datePost.split(' ')[0]}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
};

export default Posts;