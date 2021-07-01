import {ROUTE} from "../../actions/Any_Actions/routeAction";

const initialState = {
    page: null
}

export const routeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ROUTE:
            return {...state, page: action.payload}
        default:
            return {...state}
    }
}