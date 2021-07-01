import {combineReducers} from "redux";
import {modalAndOtherReducer} from "./Any_Reducers/modalAndOtherReducer";
import {regReducer} from "./Accounting/registerReduser";
import {routeReducer} from "./Any_Reducers/routeReduser";
import {FoundAndLostReducer} from "./Lost_and_Found/foundAndLostReducer";
import {loadingReducer} from "./Any_Reducers/loadingReducer";
import {homeReducers} from "./Home/homeReducers";
import {FoundAndLostGetTegImgReducer} from "./Lost_and_Found/FoundAndLostGetTegImgReducer";
import {lostReducer} from "./Lost_Reducer/LostReducer";
import {foundReducer} from "./Found_Reducer/Found_Reducer";
import {activitiesReducer} from "./Activites/ActivitesReducer";

const combine = combineReducers({
    modalReducer: modalAndOtherReducer,
    regReducer,
    routeReducer,
    loadingReducer,
    homeReducers,
    lostReducer,
    foundReducer,
    FoundAndLostReducer,
    FoundAndLostGetTegImgReducer,
    activitiesReducer
})

export default combine;