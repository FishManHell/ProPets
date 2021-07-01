import React from 'react';
import {
    homeIcon,
    lostIcon,
    foundIcon,
    servicesIcon,
    signOutAltIcon,
    dog,
    hotel,
    walking,
    stethoscope,
    starSolid, arrow_up
} from "../../../utils/fontsAwesome/Solid";
import '../../../css/Main/LeftContent.css'
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../../redux/actions/Accounting/accountingAction";
import {Link} from "react-router-dom";
import {closeAndOpen} from "../../../redux/actions/Modal/modalAndOtherActions";
import {animateScroll} from 'react-scroll';
import {return_clear_search_state} from "../../../redux/actions/Any_Actions/startChangeTextButton";

const Navigation = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.regReducer.user);
    const invisibleBlock = useSelector(state => state.modalReducer.change);
    const pageHome = useSelector(state => state.homeReducers.currentPage);
    const pageLost = useSelector(state => state.lostReducer.currentPage);
    const pageFound = useSelector(state => state.foundReducer.currentPage);

    const scrollTest = () => {
        animateScroll.scrollToTop();
    }

    return (
        <div className={'left-sidebar col-2 pt-4 pr-0'}>
            <div className={'menu_position'}> {/*{/*Блок затыка - чтоб работал position стик */}
                <nav className={'d-flex flex-column'}>
                    <div className={'item_block'}>
                        <Link className={'home_item d-flex align-items-center'} to={'/main/home'}
                              onClick={() => {
                                  dispatch(closeAndOpen(false))
                                  dispatch(return_clear_search_state())
                              }}>
                            <span className={'icon_item border-0'}>{homeIcon}</span>
                            <span className={'main_icon_item border-0'}>Home</span>
                        </Link>
                    </div>
                    <div className={'item_block'}>
                        <Link className={'d-flex align-items-center lost_item'} to={'/main/lost'}
                              onClick={() => {
                                  dispatch(closeAndOpen(false))
                                  dispatch(return_clear_search_state())
                              }}>
                            <span className={'icon_item border-0'}>{lostIcon}</span>
                            <span className={'main_icon_item border-0'}>Lost</span>
                        </Link>
                    </div>
                    <div className={'item_block'}>
                        <Link className={'found_item d-flex align-items-center'} to={'/main/found'}
                              onClick={() => {
                                  dispatch(closeAndOpen(false))
                                  dispatch(return_clear_search_state())
                              }}>
                            <span className={'icon_item border-0'}>{foundIcon}</span>
                            <span className={'main_icon_item border-0'}>Found</span>
                        </Link>
                    </div>
                    <div
                        className={`item_block ${!invisibleBlock ? 'active_margin_bottom' : 'not_active_margin_bottom'}`}>
                        <Link to={'/main/services'} className={'services_item d-flex align-items-center'}
                              onClick={() => {
                                  dispatch(closeAndOpen(true))
                                  dispatch(return_clear_search_state())
                              }}>
                            <span className={'icon_item border-0'}>{servicesIcon}</span>
                            <span className={'main_icon_item border-0'}>Services</span>
                        </Link>
                    </div>
                    <div className={`invisible_main_menu mb-3  ${invisibleBlock ? 'active_menu' : 'not_active_menu'}`}>
                        <div className={'mb-2 mt-4'}>
                            <Link onClick={() => dispatch(return_clear_search_state())} to={'/main/services/hotels'}>
                                <span className={'icon_item'}>{hotel}</span>
                                <span>Hotels</span>
                            </Link>
                        </div>
                        <div className={'mb-2 ml-1'}>
                            <Link onClick={() => dispatch(return_clear_search_state())} to={'/main/services/walking'}>
                                <span className={'icon_item'}>{walking}</span>
                                <span>Walking</span>
                            </Link>
                        </div>
                        <div className={'mb-2'}>
                            <Link onClick={() => dispatch(return_clear_search_state())} to={'/main/services/fostering'}>
                                <span className={'icon_item'}>{dog}</span>
                                <span>Fostering</span>
                            </Link>
                        </div>
                        <div className={'mb-2'}>
                            <Link onClick={() => dispatch(return_clear_search_state())} to={'/main/services/vetHelp'}>
                                <span className={'icon_item'}>{stethoscope}</span>
                                <span>VetHelp</span>
                            </Link>
                        </div>
                    </div>
                    <div className={'item_block'}>
                        <Link className={'favorites_item d-flex align-items-center'} to={'/main/favorites'}
                              onClick={() => {
                                  dispatch(closeAndOpen(false))
                                  dispatch(return_clear_search_state())
                              }}>
                            <span className={'icon_item border-0'}>{starSolid}</span>
                            <span className={'main_icon_item border-0'}>Favorites</span>
                        </Link>
                    </div>
                </nav>
                <div className={'invisible_button_to_top'}>
                    {
                        pageHome > 1
                        || pageLost > 1
                        || pageFound > 1
                            ?
                            <button
                                className={'button_scroll_Top'}
                                onClick={() => scrollTest()}><span>{arrow_up}</span>GO_TOP</button>
                            : null
                    }
                </div>
                <div className={'nick_block'}>
                    <Link className={'profile_block d-flex align-items-center'} to={'/main/profile'}
                          onClick={() => {
                              dispatch(closeAndOpen(false))
                              dispatch(return_clear_search_state())
                          }}>
                        <div className={'photo_profile_block'}>
                            <img src={user.avatar} alt={user.name}/>
                        </div>
                        <p className={'m-0'}>{user.name}</p>
                    </Link>
                    <Link to={'/start'} className={'exit_in_start'} onClick={() => {
                        dispatch(logout())
                        dispatch(return_clear_search_state())
                    }}>
                        <span className={'icon_item icon_sing_out border-0'}>{signOutAltIcon}</span>
                        <span className={'logout_content border-0'}>Logout</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navigation;