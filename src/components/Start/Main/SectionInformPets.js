import React from 'react';
import pets from '../../../img/Welcom/8347.png'
import '../../../css/Start/InformPets.css'

const SectionInformPets = () => {
    return (
        <section className={'inform_pets'}>
            <div className={'container'}>
                <div className={'row pt-5 pb-5'}>
                        <div className={'col-xl-5 col-lg-6 col-md-12'}>
                            <img src={pets} alt={pets}/>
                        </div>
                        <div className={'p-0 pt-4 pl-3 col-xl-7 col-lg-6  col-md-12'}>
                            <h5>Here is collected everything that your pet needs:</h5>
                            <ul className={'inform_pets_item'}>
                                <li><span>professional veterinarian tips;</span></li>
                                <li><span>useful information about education and care;</span></li>
                                <li><span>fostering home search;</span></li>
                                <li><span>information about pet-sitting and walking service</span></li>
                                <li><span>and of course, great communication with new <br/> friends in your social network!</span></li>
                            </ul>
                        </div>
                </div>
            </div>
        </section>
    );
};

export default SectionInformPets;


