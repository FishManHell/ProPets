import React from 'react';
import Navigation from "./Navigation";
import Content from "./Content";
import Posters from "./Posters";

const Main = () => {
    return (
        <main className={'main_content'}>
                <div className={'container'}>
                    <div className={'row flex-nowrap'}>
                        <Navigation/>
                        <Content/>
                        <Posters/>
                    </div>
                </div>
        </main>
    );
};

export default Main;