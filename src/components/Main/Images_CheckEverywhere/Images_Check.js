import React from 'react';
import Carousel from "react-bootstrap/Carousel";
import default__image from "../../../img/Main/no_images.png";

const ImagesCheck = ({item}) => {
    if (item.images) {
        if (item.images.length >= 2) {
            return (
                <Carousel fade interval={null}>
                    {
                        item.images.map((item, index) =>
                            <Carousel.Item key={index}>
                                <img className={'w-100'} src={item} alt={item}/>
                            </Carousel.Item>)
                    }
                </Carousel>
            )
        } else if (item.images.length === 1) {
            return (
                <img className={'w-100'} src={item.images} alt={item.images}/>
            )

        } else {
            return (
                <img className={'w-100'} src={default__image} alt={default__image}/>
            )
        }
    } else if (item.photos) {
        if (item.photos.length >= 2) {
            return (
                <Carousel fade interval={null}>
                    {
                        item.photos.map((item, index) =>
                            <Carousel.Item key={index} >
                                <img src={item} alt={item}/>
                            </Carousel.Item>)
                    }
                </Carousel>
            )
        } else if (item.photos.length === 1) {
            return (
                <img className={'w-100'} src={item.photos} alt={item.photos}/>
            )
        } else {
            return (
                <img className={'w-100'} src={default__image} alt={default__image}/>
            )
        }
    } else {
        return null
    }

};

export default ImagesCheck;