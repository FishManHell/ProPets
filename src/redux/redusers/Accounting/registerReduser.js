import {LOGOUT, PUT_USER, X_TOKEN} from "../../actions/Accounting/accountingAction";
import {defaultAvatar, defaultPhone} from "../../../utils/constants";

const initialState = {
    x_token: "",
    user: {
        email: "",
        name: "",
        avatar: "",
        phone: null,
        roles: []
    }
}

export const regReducer = (state = initialState, action) => {
    switch (action.type) {
        case X_TOKEN:
            return {...state, x_token: action.payload.x_token};
        case PUT_USER:
            action.payload.user.avatar = action.payload.user.avatar
                ? action.payload.user.avatar !== '5555555.jpg'
                    ? action.payload.user.avatar : defaultAvatar : defaultAvatar
            action.payload.user.phone = action.payload.user.phone
                ? action.payload.user.phone !== 'not specified'
                    ? action.payload.user.phone : defaultPhone : defaultPhone
            return {...state, user: action.payload.user};
        case LOGOUT:
            localStorage.removeItem('login');
            localStorage.removeItem('x-token');
            return {};
        default:
            return state
    }
}