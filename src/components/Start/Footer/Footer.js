import React from 'react';
import '../../../css/Start/Footer.css'
import {logo, viewBox, xmlns} from "../../../utils/constants";
import {dog, foundIcon, hotel, lostIcon, stethoscope, walking} from "../../../utils/fontsAwesome/Solid";
import {facebook, instagram} from "../../../utils/fontsAwesome/Regular"

const Footer = () => {
    return (
        <footer>
            <div className={'container'}>
                <div className={'row justify-content-between align-items-center'}>
                    <div className={'logo_footer col-xl-3'}>
                        <svg className={'logo_svg_footer'} xmlns={xmlns} viewBox={viewBox}>
                            <path className={'a'} d={logo.first.path} transform={logo.first.translate}/>
                            <path className={'a'} d={logo.second.path} transform={logo.second.translate}/>
                            <path className={'a'} d={logo.third.path} transform={logo.third.translate}/>
                            <path className={'a'} d={logo.fourth.path} transform={logo.fourth.translate}/>
                            <path className={'a'} d={logo.fifth.path} transform={logo.fifth.translate}/>
                            <path className={'a'} d={logo.sixth.path} transform={logo.sixth.translate}/>
                            <path className={'a'} d={logo.seventh.path} transform={logo.seventh.translate}/>
                            <path className={'a'} d={logo.eighth.path} transform={logo.eighth.translate}/>
                            <path className={'a'} d={logo.ninth.path} transform={logo.ninth.translate}/>
                            <path className={'a'} d={logo.tenth.path} transform={logo.tenth.translate}/>
                            <path className={'a'} d={logo.eleventh.path} transform={logo.eleventh.translate}/>
                            <path className={'a'} d={logo.twelfth.path} transform={logo.twelfth.translate}/>
                        </svg>
                    </div>
                   <div className={'first_link_footer col-xl-2 pl-0'}>
                       <div className={'d-flex first_icon_footer'}>
                           <span className={'icon_footer social pr-3'}>{facebook}</span>
                           <span className={'icon_footer social pr-3'}>{instagram}</span>
                       </div>
                       <span className={'first_link_footer_text'}>
                           1600 Amphitheatre Pkwy Mountain View, CA 94043, USA
                       </span>
                   </div>
                    <div className={'second_link_footer col-xl-4 d-flex justify-content-around align-items-center'}>
                        <div>
                            <div className={'pb-2'}>
                                <span className={'icon_footer'}>{lostIcon}</span>
                                <span className={'icon_footer_text pl-3'}>Lost</span>
                            </div>
                            <div className={'pb-2'}>
                                <span className={'icon_footer'}>{foundIcon}</span>
                                <span className={'icon_footer_text pl-3'}>Found</span>
                            </div>
                            <div className={'pb-2'}>
                                <span className={'icon_footer'}>{stethoscope}</span>
                                <span className={'icon_footer_text pl-3'}>VetHelp</span>
                            </div>
                        </div>
                        <div>
                            <div className={'pb-2'}>
                                <span className={'icon_footer'}>{hotel}</span>
                                <span className={'icon_footer_text pl-3'}>Hotels</span>
                            </div>
                            <div className={'pb-2'}>
                                <span className={'icon_footer'}>{walking}</span>
                                <span className={'icon_footer_text pl-4'}>Walking</span>
                            </div>
                            <div className={'pb-2'}>
                                <span className={'icon_footer'}>{dog}</span>
                                <span className={'icon_footer_text pl-3'}>Fostering</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;