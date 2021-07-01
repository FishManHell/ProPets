import React from 'react';
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Modal from "../ModalForm/Modal";

const Index = () => {
    return (
        <div className={'block_filter'}>
            <Header/>
            <Main/>
            <Footer/>
            <Modal/>
        </div>
    );
};

export default Index;