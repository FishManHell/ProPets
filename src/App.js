import React, {useEffect} from "react";
import './App.css';
import Start from "./components/Start/Start";
import StartMain from "./components/Main";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "./redux/actions/Accounting/accountingAction";
import {Route, Switch} from 'react-router-dom';
import HashLoader from "react-spinners/HashLoader";

const App = () => {
    const dispatch = useDispatch();
    const x_token = useSelector(state => state.regReducer.x_token);
    const isLoading = useSelector(state => state.loadingReducer.loading);

    useEffect(() => {
        const login_local = localStorage.getItem('login')
        const x_token_local = localStorage.getItem('x-token');
        if (x_token_local && login_local) {
            dispatch(getUser(x_token_local, login_local));
        }
    }, []);

    if (isLoading) {
        return (
            <div className="sweet-loading">
                <HashLoader color={"#669885"} size={400}/>
            </div>
        )
    } else {
        return (
            <div className={'wrapper'}>
                <Switch>
                    {
                        x_token ?
                            <Route exact
                                   path={['/', '/start', '/main', '/main/:content', '/main/:content/:services', '/main/:content/:services/:publish']}
                                   render={routeProps => <StartMain {...routeProps}/>}/>
                            :
                            <Route path={['/', '/start']} component={Start}/>
                    }
                </Switch>
            </div>
        )
    }
};

export default App;