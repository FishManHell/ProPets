import React from 'react';
import heartImg from '../../../img/Welcom/\uF004.png'
import '../../../css/Start/SectionComingSoon.css'

const SectionComingSon = () => {
    return (
        <section className={'section_coming_son pt-5 pb-5'}>
            <div className={'container'}>
                <div className={'row align-items-center'}>
                    <h2 className={'col-5'}>Coming Soon</h2>
                    <div className={'coming_son_paragraph col-5'}>
                        <p>We are planing to open a new service, where your cats and dogs can find their love!</p>
                    </div>
                    <div className={'col-2'}>
                        <div className={"heart_block"}>
                            <span>love</span>
                            <img src={heartImg} alt={heartImg}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SectionComingSon;