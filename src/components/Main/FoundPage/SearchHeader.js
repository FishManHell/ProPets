import React from 'react';
import {useDispatch} from "react-redux";
import {
    findBreed,
    findFeatures,
    findLocation,
    findType
} from "../../../redux/actions/Any_Actions/startChangeTextButton";


const SearchHeader = () => {
    const dispatch = useDispatch()

    const find_type = e => {
        dispatch(findType(e.target.value))
    }

    const find_breed = e => {
        dispatch(findBreed(e.target.value))
    }

    const find_features = e => {
        dispatch(findFeatures(e.target.value))
    }

    const find_location = e => {
        dispatch(findLocation(e.target.value))
    }


    return (
        <header className={'d-flex justify-content-between align-items-center pl-3 pr-3 pt-4'}>
            <input className={'input_lost_found input_type'} name={'type'} type="search" placeholder={'Type'} onChange={(e) => find_type(e)}/>
            <input className={'input_lost_found input_bread'} name={'bread'} type="search" placeholder={'Breed'} onChange={e => find_breed(e)}/>
            <input className={'input_lost_found input_search'} name={'features'} type="search" placeholder={'Additional features'} onChange={e => find_features(e)}/>
            <input className={'input_lost_found input_location'} name={'location'} type="search" placeholder={'Location'} onChange={e => find_location(e)}/>
        </header>
    )
};

export default SearchHeader;