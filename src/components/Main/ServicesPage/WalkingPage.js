import React from 'react';
import walkingImg from '../../../img/Main/14.png'
import dogRadius from '../../../img/Main/3b0045c9cc47b640ddcb43d6d06d1379.png'
import {starIcon} from "../../../utils/fontsAwesome/Regular";

const WalkingPage = () => {
    return (
        <section className={'inform_pets_main'}>
            <p>Walking. No time tonight? We have a solution!</p>

            <div className={'second_post d-flex'}>
                <div>
                    <div className={'photo_inform'}>
                        <img className={'img_log_info'} src={dogRadius} alt=""/>
                    </div>
                </div>
                <div className={'center_inform_main'}>
                    <div className={'d-flex flex-column post_block_name_hour'}>
                        <span>John Goodboi</span>
                        <span>2 h</span>
                    </div>
                    <div className={'img_block_inform w-100'}>
                        <img className={'w-100'} src={walkingImg} alt=""/>
                    </div>
                    <p className={'inform_paragraph m-0'}>
                        Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox.
                        Bright vixens jump; dozy fowl quack<button className={'more_inform_main border-0 p-0'}>…more</button>
                    </p>
                </div>
                <div className={'d-flex flex-column justify-content-between mt-auto'}>
                    <button className={' icon-main-inform border-0'}>{starIcon}</button>
                </div>
            </div>

        </section>
    );
};

export default WalkingPage;