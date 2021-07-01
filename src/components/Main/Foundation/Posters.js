import React from 'react';
import dental from '../../../img/Main/194578053061e534f7d685209f06144b.png';
import petHotel from '../../../img/Main/4aaf24a92b72b34f20406a424cc82de1.png';
import petHotelTwo from '../../../img/Main/3c736769edb2e030741403fbfcee33f4.png';
import '../../../css/Main/RightContent.css';
import {useSelector} from "react-redux";

const Posters = () => {
         const content = useSelector(state => state.routeReducer.page);

        if (content === 'addNew' || content === 'profile') {
            return (
                <div className={'col-2'}/>
            )
        } else {
            return (
                <section className={`right_sidebar col-2 p-0 pt-4 ${content === 'found' || content === 'lost' ? 'd-none' : 'd-block'}`}>
                    <div className={'poster_position'}>   {/*Блок затыка - чтоб работал position стик */}
                        <div className={'main_right_post_inform'}>
                            <img className={'w-100'} src={dental} alt=""/>
                        </div>
                        <div className={'main_right_post_inform'}>
                            <img className={'w-100'} src={petHotel} alt=""/>
                        </div>
                        <div className={'main_right_post_inform'}>
                            <img className={'w-100'} src={petHotelTwo} alt=""/>
                        </div>
                    </div>
                </section>
            )
        }
};

export default Posters;