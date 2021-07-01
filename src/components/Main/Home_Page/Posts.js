import React, {useState} from 'react';
import {ellipsis, eyeSlash, pencil, plus, starSolid, store_alt, times, trash} from "../../../utils/fontsAwesome/Solid";
import {starIcon} from "../../../utils/fontsAwesome/Regular"
import ImagesCheck from "../Images_CheckEverywhere/Images_Check";
import {useDispatch, useSelector} from "react-redux";
import {
    activitiesFlag,
    addCommit, commentsFlag, delComments,
    favorites_post,
    flag_favorites, getComments, putComments,
    removeActivitiesUserPost,
    removeFavoritesPost
} from "../../../redux/actions/Home/homeAction";
import ShowMoreText from 'react-show-more-text';

const Posts = ({item}) => {
    const dispatch = useDispatch();
    const content = useSelector(state => state.routeReducer.page);
    const [invisible, setInvisible] = useState(false);
    const [commentOpen, setCommentOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(true);
    const [comment, setComment] = useState('');
    const [editComment, setEditComment] = useState('');
    const [changeStart, setChangeStart] = useState(false);

    const comments = useSelector(state => state.homeReducers.comments);
    const favorites = useSelector(state => state.homeReducers.favorites_post);
    const star = favorites?.filter(post => post.id === item.id);

    let filterCommentsId = comments?.filter(i => i.id === item.id).map(i => i.anotherComments);

    const invisibleBlock_button = () => {
        if (content === 'home') {
            return (
                <button
                    className={' icon-main-inform border-0'}
                    onClick={() => setInvisible(!invisible)}>{ellipsis}</button>
            )
        } else {
            return null
        }
    }

    const handleComment = () => {
        const addComment = {
            text: comment,
            username: item.username,
            avatar: item.avatar
        }
        if (comment) {
            dispatch(addCommit(addComment, item.id))
        } else {
            alert('ERROR')
        }
    }

    const putHandleComment = (id, commentID) => {
        const text_comment = {
            text: editComment
        }
        dispatch(putComments(id, commentID, text_comment))
    }

    return (
        <div className={`${content === 'profile' ? 'margin_block' : 'not_margin'}`}>
            <div className={'second_post d-flex justify-content-between'}>
                <div className={`main_comment_block ${commentOpen ? 'open' : 'close'}`}>
                    <div className={'comment_block'}>
                        <input type="text" placeholder={'Enter your commit'} value={comment}
                               onChange={e => setComment(e.target.value)}/>
                        {
                            commentOpen
                                ?
                                <div>
                                    <button className={'plus_commit'} onClick={() => {
                                        handleComment()
                                        dispatch(commentsFlag(true));
                                    }}>{plus}</button>
                                    <button onClick={() => setCommentOpen(false)}>{store_alt}</button>
                                </div>
                                :
                                null
                        }
                    </div>
                    <div>
                        <ul>
                            {comments.length ? filterCommentsId[0]?.map((comment, index) =>
                                <div key={index} className={'d-flex'}>
                                    {isEdit ?
                                        <li>
                                            {comment.text}
                                            <button
                                                onClick={() => dispatch(delComments(item.id, comment.id))}>{times}</button>
                                        </li>
                                        :
                                        <input type="text" value={editComment}
                                               onChange={e => setEditComment(e.target.value)}/>
                                    }
                                    <button onClick={() => {
                                        putHandleComment(item.id, comment.id)
                                        setIsEdit(!isEdit)
                                    }}>{pencil}</button>
                                </div>
                            ) : null}
                        </ul>
                    </div>
                </div>
                {
                    invisible ?
                        <div className={'invisible_window_main'}>
                            <div>
                                <span className={'invisible_icon'}>{eyeSlash}</span>
                                <span className={'invisible_text'}>Unfollow</span>
                            </div>
                            <div>
                                <span className={'invisible_icon'}>{times}</span>
                                <span className={'invisible_text'}>Hide from feed</span>
                            </div>
                        </div>
                        :
                        null
                }
                <div>
                    <div className={'photo_inform'}>
                        <img className={'img_log_info'} src={item.avatar} alt={item.username}/>
                    </div>
                </div>
                <div className={'center_inform_main'}>
                    <div className={'d-flex flex-column post_block_name_hour'}>
                        <span>{item.username}</span>
                        {content === 'home' ?
                            <span className={'data_home_post'}>{item.datePost.split('T')[0]}</span>
                            :
                            <span className={'data_home_post'}>{item.datePost.split(' ')[0]}</span>}
                    </div>
                    <div className={'img_block_inform w-100'}>
                        <ImagesCheck item={item}/>
                    </div>
                    <ShowMoreText
                        lines={4}
                        more='more'
                        less='less'
                        className='content-css'
                        anchorClass='my-anchor-css-class'
                        expanded={false}
                    >
                        {item.text}
                    </ShowMoreText>
                </div>
                {
                    content === 'profile'
                        ?
                        <div className={'icon_activities_head d-flex align-items-start justify-content-center'}>
                            <button>{pencil}</button>
                            <button onClick={() => {
                                dispatch(activitiesFlag(true))
                                dispatch(removeActivitiesUserPost(item.id))
                            }}>{trash}</button>
                        </div>
                        :
                        null
                }
                <div className={'d-flex flex-column justify-content-between point_Star_block'}>
                    {invisibleBlock_button()}
                    {content === 'home' ? commentOpen ? null :
                        <button onClick={() => {
                            setCommentOpen(!commentOpen)
                            dispatch(getComments(item.id))
                        }}>{plus}</button> : null}
                    {content === 'profile' ? null : !changeStart && !star?.length
                        ?
                        <button className={'icon-main-inform icon-main-inform_star border-0'} onClick={() => {
                            setChangeStart(!changeStart)
                            dispatch(flag_favorites(true))
                            dispatch(favorites_post([item.id]))
                        }}>{starIcon}</button>
                        :
                        <button className={'icon-main-inform border-0 icon-main-inform_green'} onClick={() => {
                            dispatch(flag_favorites(true))
                            setChangeStart(!changeStart)
                            dispatch(removeFavoritesPost([item.id]))
                        }}>{starSolid}</button>}
                </div>
            </div>
        </div>
    );
};

export default Posts;