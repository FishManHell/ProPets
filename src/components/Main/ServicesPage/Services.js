import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import HotelsPage from "./HotelsPage";
import FosteringPage from "./FosteringPage";
import WalkingPage from "./WalkingPage";
import VetHelpPage from "./VetHelpPage";

const Services = () => {
    return (
       <Switch>
           <Route path={'/main/services/hotels'} component={HotelsPage}/>
           <Route path={'/main/services/walking'} component={WalkingPage}/>
           <Route path={'/main/services/fostering'} component={FosteringPage}/>
           <Route path={'/main/services/vetHelp'} component={VetHelpPage}/>
           <Redirect from={"**"} to={'/main/services/hotels'}/>
       </Switch>
    );
};

export default Services;