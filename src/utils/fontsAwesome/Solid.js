import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowUp,
    faBullhorn, faCamera, faDog, faEdit,
    faEllipsisH, faEnvelopeSquare, faExchangeAlt, faEye, faEyeSlash,
    faHome, faHotel, faHouseUser, faMapMarker,
    faPaw, faPencilAlt, faPhoneSquareAlt,
    faPlus, faSave,
    faSearch,
    faSignOutAlt, faStar, faStethoscope, faStoreAltSlash, faTimes, faTrashAlt, faWalking
} from "@fortawesome/free-solid-svg-icons";

export const homeIcon = <FontAwesomeIcon icon={faHome}/>;
export const lostIcon = <FontAwesomeIcon icon={faSearch}/>;
export const foundIcon = <FontAwesomeIcon icon={faPaw}/>;
export const servicesIcon = <FontAwesomeIcon icon={faBullhorn}/>;
export const signOutAltIcon = <FontAwesomeIcon icon={faSignOutAlt}/>
export const ellipsis = <FontAwesomeIcon icon={faEllipsisH}/>
export const plus = <FontAwesomeIcon icon={faPlus}/>
export const times = <FontAwesomeIcon icon={faTimes}/>
export const eye = <FontAwesomeIcon icon={faEye}/> // при нажатие меняется с другим
export const eyeSlash = <FontAwesomeIcon icon={faEyeSlash}/>

export const walking = <FontAwesomeIcon icon={faWalking}/>
export const stethoscope = <FontAwesomeIcon icon={faStethoscope}/>
export const hotel = <FontAwesomeIcon icon={faHotel}/>
export const dog = <FontAwesomeIcon icon={faDog}/>
export const pencil = <FontAwesomeIcon icon={faPencilAlt}/>
export const save = <FontAwesomeIcon icon={faSave}/>
export const map_marker = <FontAwesomeIcon icon={faMapMarker}/>
export const phone = <FontAwesomeIcon icon={faPhoneSquareAlt}/>
export const messages = <FontAwesomeIcon icon={faEnvelopeSquare}/>
export const signOutAlt = <FontAwesomeIcon icon={faSignOutAlt} style={{transform: 'rotate(-90deg)'}}/>
export const camera = <FontAwesomeIcon icon={faCamera}/>
export const trash = <FontAwesomeIcon icon={faTrashAlt}/>
export const edit = <FontAwesomeIcon icon={faEdit}/>
export const starSolid = <FontAwesomeIcon icon={faStar}/>
export const arrow_up = <FontAwesomeIcon icon={faArrowUp}/>
export const exchange = <FontAwesomeIcon icon={faExchangeAlt}/>
export const store_alt = <FontAwesomeIcon icon={faStoreAltSlash}/>
export const house = <FontAwesomeIcon icon={faHouseUser}/>
