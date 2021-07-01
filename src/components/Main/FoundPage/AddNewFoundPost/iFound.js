import React, {useEffect, useState} from 'react';
import '../../../../css/Main/I_found.css'
import i_found from '../../../../img/Main/Group_43.png';
import {foundIcon, signOutAlt, times} from "../../../../utils/fontsAwesome/Solid";
import {useDispatch, useSelector} from "react-redux";
import {found, getColor, getHeight, getImgFor, navigator_geolocation, postLocation, preveiwShow} from "../../../../redux/actions/Lost_and_Found/FoundAndLostAction";
import {getNameFiles, removeImageTags} from "../../../../redux/actions/Lost_and_Found/FoundAndLostGetTegImgAction";
import {drag_and_drop} from "../../../../redux/actions/Modal/modalAndOtherActions";
import {regJustLetters, regJustPositive} from "../../../../utils/constants";
import {useLocation} from "react-router-dom";
import LoadingLittle from "../../LoaderSpinner/loadingLittle";

const IFound = () => {
    const dispatch = useDispatch();
    const location = useLocation()
    const user = useSelector(state => state.regReducer.user);
    const animal = useSelector(state => state.FoundAndLostReducer.animal);
    const tag = useSelector(state => state.FoundAndLostGetTegImgReducer.tags);
    const photos = useSelector(state => state.FoundAndLostGetTegImgReducer.photos);
    const heightFound = useSelector(state => state.FoundAndLostReducer.height);
    const colorFound = useSelector(state => state.FoundAndLostReducer.color);
    const DnD = useSelector(state => state.modalReducer.DnD);
    const little_lading = useSelector(state => state.loadingReducer.little_lading);

    const fileNames = useSelector(state => state.FoundAndLostGetTegImgReducer.nameFiles);

    const [changeType, setChangeType] = useState(false);
    const [changeHeight, setChangeHeight] = useState(false);

    const [type, setType] = useState(animal.type || '');
    const [sex, setSex] = useState(animal.sex || '');
    const [breed, setBreed] = useState(animal.breed || '');

    const [height, setHeight] = useState(heightFound || '');
    const [color, setColor] = useState(colorFound || '');

    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [building, setBuilding] = useState('');

    const [dis, setDis] = useState(tag || []);

    const [typeDirt, setTypeDirt] = useState(false);
    const [sexDirt, setSexDirt] = useState(false);
    const [breedDirt, setBreedDirt] = useState(false);
    const [heightDirt, setHeightDirt] = useState(false);
    const [colorDirt, setColorDirt] = useState(false);
    const [countryDirt, setCountryDirt] = useState(false);
    const [cityDirt, setCityDirt] = useState(false);
    const [streetDirt, setStreetDirt] = useState(false);
    const [buildingDirt, setBuildingDirt] = useState(false);

    const [typeError, setTypeError] = useState('Fill');
    const [sexError, setSexError] = useState('Fill');
    const [breedError, setBreedError] = useState('Fill');
    const [heightError, setHeightError] = useState('Fill');
    const [colorError, setColorError] = useState('Fill');
    const [countryError, setCountryError] = useState('Fill');
    const [cityError, setCityError] = useState('Fill');
    const [streetError, setStreetError] = useState('Fill');
    const [buildingError, setBuildingError] = useState('Fill');

    useEffect(() => {
        setCountry(animal.address.country);
        setCity(animal.address.city)
        setStreet(animal.address.street);
        setBuilding(animal.address.building);
    }, [animal])


    useEffect(() => {
        if (!animal.address.country.length) {
            dispatch(navigator_geolocation())
        }
        // setDis([...tag])
        setDis(() => {
            const t = []
            tag.forEach(i => i.forEach(j => t.push(j)))
            const filter = [... new Set(t)]
            return filter.join(',')
        })
    }, [tag])

    const handleChangeAll = e => {
        if (e.target.name === 'type') setType(e.target.value)
        if (e.target.name === 'sex') setSex(e.target.value)
        if (e.target.name === 'height') setHeight(e.target.value)

        if (e.target.value === 'Empty') {
            if (e.target.name === 'type') setTypeError('*')
            if (e.target.name === 'sex') setSexError('*')
            if (e.target.name === 'height') setHeightError('*')

            if (!e.target.value) {
                if (e.target.name === 'type') setTypeError('*')
                if (e.target.name === 'sex') setSexError('*')
                if (e.target.name === 'height') setHeightError('*')
            }

        } else {
            if (e.target.name === 'type') setTypeError('')
            if (e.target.name === 'sex') setSexError('')
            if (e.target.name === 'height') setHeightError('')
        }
    }

    const handleChangeBuilding = e => {
        setBuilding(e.target.value)
        if (!regJustPositive.test(e.target.value)) {
            setBuildingError('Only Positive')
            if (!e.target.value) {
                setBuildingError('*')
            }
        } else {
            setBuildingError('')
        }
    }

    const handleChangeBreed = e => {
        setBreed(e.target.value)
        if (!regJustLetters.test(e.target.value)) {
            setBreedError('Min 3')
            if (!e.target.value) {
                setBreedError('*')
            }
        } else {
            setBreedError('')
        }
    }

    const handleChangeColor = e => {
        setColor(e.target.value)
        if (!regJustLetters.test(e.target.value)) {
            setColorError('Min 3')
            if (!e.target.value) {
                setColorError('*')
            }
        } else {
            setColorError('')
        }
    }

    const handleChangeCountry = e => {
        setCountry(e.target.value)
        if (!regJustLetters.test(e.target.value)) {
            setCountryError('Min 3')
            if (!e.target.value) {
                setCountryError('*')
            }
        } else {
            setCountryError('')
        }
    }

    const handleChangeCity = e => {
        setCity(e.target.value)
        if (!regJustLetters.test(e.target.value)) {
            setCityError('Min 3')
            if (!e.target.value) {
                setCityError('*')
            }
        } else {
            setCityError('')
        }
    }

    const handleChangeStreet = e => {
        setStreet(e.target.value)
        if (!regJustLetters.test(e.target.value)) {
            setStreetError('Min 3')
            if (!e.target.value) {
                setStreetError('*')
            }
        } else {
            setStreetError('')
        }
    }

    const blurHandler = e => {
        switch (e.target.name) {
            case 'type' :
                setTypeDirt(true);
                break
            case 'sex':
                setSexDirt(true)
                break
            case 'breed':
                setBreedDirt(true)
                break
            case 'color':
                setColorDirt(true)
                break
            case 'height':
                setHeightDirt(true)
                break
            case 'country':
                setCountryDirt(true);
                break
            case 'city':
                setCityDirt(true);
                break
            case 'street':
                setStreetDirt(true)
                break
            case 'building':
                setBuildingDirt(true)
                break
            default:
                return -1
        }
    }

    const handleClickChange = (e) => {
        const files = e.target.files
        for (let i = 0; i < files.length; i++) {
            if (files.length <= 2) {
                if (fileNames.length >= 4) {
                    break
                } else {
                    dispatch(getImgFor(files[i]))
                    dispatch(getNameFiles(files[i]))
                }
            } else {
                dispatch(drag_and_drop(false))
                alert('Not to More')
            }
        }
    }

    const removeFile = (index) => {
        dispatch(removeImageTags(index))
    }

    const onDrop = (e) => {
        e.preventDefault();
        const temp_array = []
        const files = [...e.dataTransfer.files]
        if (files.length <= 2) {
            files.map(i => {
                if (fileNames.length <= 4) {
                    temp_array.push(i)
                    dispatch(getImgFor(i))
                }
            })
        } else {
            dispatch(drag_and_drop(false))
            return alert('Not to More')
        }
        temp_array.forEach(i => dispatch(getNameFiles(i)))
    }

    const dragStart = (e) => {
        e.preventDefault()
        dispatch(drag_and_drop(true))
    }

    const dragFinish = e => {
        e.preventDefault()
        dispatch(drag_and_drop(false))
    }

    const handleClickPublish = () => {
        let tags = []
        let test = [...tags]

        if (typeof dis === 'string') {
            test.unshift(color, height);
            tags = dis.split(',');
            tags = test.concat(tags)
        }

        if (Array.isArray(dis)) {
            dis.forEach(i => i.forEach(j => tags.push(j)))
        }

        const animalTags = {
            type: type,
            sex: sex,
            breed: breed,
            userName: user.name,
            avatar: user.avatar,
            address: {
                country: country || animal.address.country,
                city: city || animal.address.city,
                street: street || animal.address.street,
                building: building || animal.address.building,
            },
            location: {
                latitude: animal.location.latitude,
                longitude: animal.location.longitude,
            },
            photos: photos,
            tags: tags
        }

        if (type && sex && breed && country && city && street && building && height && color) {
            dispatch(preveiwShow(true))
            dispatch(getColor(color));
            dispatch(getHeight(height));
            dispatch(found(animalTags));
            dispatch(postLocation(animalTags.address));
        } else {
            dispatch(preveiwShow(false))
            setTypeDirt(true)
            setSexDirt(true)
            setBreedDirt(true)
            setHeightDirt(true)
            setColorDirt(true)
            if (animal.address.country.length) {
                setCountryDirt(false)
                setCityDirt(false)
                setStreetDirt(false)
                setBuildingDirt(false)
            } else {
                setCountryDirt(true)
                setCityDirt(true)
                setStreetDirt(true)
                setBuildingDirt(true)
            }

        }
    }

    return (
        <div className={'wrapper_i_found col-9 p-0'}>
            {
                location.pathname === '/main/lost/i_lost' ?
                    <p className={'pt-4 pb-4 pl-4 m-0 i_found_header_paragraph'}>
                        <span className={'i_found_header_paragraph_span'}>Lost your buddy?</span> Keep calm and complete the form.</p>
                    :
                    <p className={'pt-4 pb-4 pl-4 m-0 i_found_header_paragraph'}>
                        <span className={'i_found_header_paragraph_span'}>Found a pet?</span>  Please complete the form to help.</p>
            }
            <div className={'section_i_found'}>
                <section className={'d-flex justify-content-between'}>
                    <div className={'left_block_i_found col-6 pl-0'}>
                        <div className={'type_i_found d-flex pt-2'}>
                            <div className={'col-3 text-right p-0'}>
                                <label className={'m-0'}>{(typeDirt && typeError) &&
                                <span className={'red_star'}>{typeError}</span>} Type: </label>
                            </div>
                            <div className={'col-10 select_i_found'}>
                                <select
                                    name={'type'}
                                    value={type}
                                    onBlur={e => blurHandler(e)}
                                    onChange={e => {
                                        e.target.value === 'Other...' ? setChangeType(true) : setChangeType(false)
                                        handleChangeAll(e)
                                    }} required={'required'}>
                                    <option value="Empty" defaultValue="Empty">Empty</option>
                                    <option value="Cat">Cat</option>
                                    <option value="Dog">Dog</option>
                                    <option value={'Other...'}>Other...</option>
                                </select>
                                <input
                                    required={'required'}
                                    type="text"
                                    placeholder={'Other...'}
                                    className={`input_i_found_type ${changeType ? 'd-block' : 'd-none'}`}
                                    onChange={e => setType(e.target.value)}/>
                            </div>
                        </div>
                        <div className={'sex_i_found d-flex pt-2'}>
                            <div className={'col-3 text-right p-0'}>
                                <label className={'m-0'}>{(sexDirt && sexError) &&
                                <span className={'red_star'}>{sexError}</span>} Sex: </label>
                            </div>
                            <div className={'col-10 select_i_found'}>
                                <select
                                    name={'sex'}
                                    value={sex}
                                    onBlur={e => blurHandler(e)}
                                    onChange={e => handleChangeAll(e)}
                                    required={'required'}>
                                    <option value="Empty" defaultValue="Empty">Empty</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>
                        <div className={'breed_i_found d-flex pt-2'}>
                            <div className={'col-3 text-right p-0'}>
                                <label
                                    className={'m-0'}>
                                    {(breedDirt && breedError) &&
                                    <span className={'red_star'}>{breedError}</span>} Breed: </label>
                            </div>
                            <div className={'input_i_found_wrapper col-10 pr-0'}>
                                <input
                                    name={'breed'}
                                    value={breed}
                                    type="text"
                                    placeholder={'Golden Retriever'}
                                    onBlur={e => blurHandler(e)}
                                    onChange={e => handleChangeBreed(e)}
                                    required={'required'}/>
                            </div>
                        </div>
                        <div className={'color_i_found d-flex pt-2'}>
                            <div className={'col-3 text-right p-0'}>
                                <label
                                    className={'m-0'}>
                                    {(colorDirt && colorError) &&
                                    <span className={'red_star'}>{colorError}</span>} Color: </label>
                            </div>
                            <div className={'input_i_found_wrapper col-10 pr-0'}>
                                <input
                                    name={'color'}
                                    value={color}
                                    required={'required'}
                                    type="text"
                                    placeholder={'Color...'}
                                    onBlur={e => blurHandler(e)}
                                    onChange={e => handleChangeColor(e)}/>
                            </div>
                        </div>
                        <div className={'height_i_found d-flex pt-2'}>
                            <div className={'col-3 text-right p-0'}>
                                <label className={'m-0'}>{(heightDirt && heightError) &&
                                <span className={'red_star'}>{heightError}</span>} Height: </label>
                            </div>
                            <div className={'col-10 select_i_found'}>
                                <select
                                    name={'height'}
                                    value={height}
                                    required={'required'}
                                    onBlur={e => blurHandler(e)}
                                    onChange={e => {
                                        handleChangeAll(e)
                                        e.target.value === 'Other...' ? setChangeHeight(true) : setChangeHeight(false)
                                    }}>
                                    <option value="Empty" defaultValue="Empty">Empty</option>
                                    <option value="45-70">45-70</option>
                                    <option value="40-65">30-65</option>
                                    <option value={'Other...'}>Other...</option>
                                </select>
                                <input
                                    required={'required'}
                                    type="text"
                                    placeholder={'Other...'}
                                    className={`input_i_found_height ${changeHeight ? 'd-block' : 'd-none'}`}
                                    onChange={e => setHeight(e.target.value)}/>
                            </div>
                        </div>
                        {
                            little_lading
                                ?
                                <LoadingLittle/>
                                :
                                <div className={'location_i_found d-flex flex-column pt-2'}>
                                    <div className={'d-flex'}>
                                        <div className={'col-3 text-right p-0'}>
                                            <label>{(countryDirt && countryError) &&
                                            <span className={'red_star'}>{countryError}</span>} Country: </label>
                                        </div>
                                        <div className={'input_i_found_wrapper col-10 pr-0'}>
                                            <input
                                                name={'country'}
                                                value={country}
                                                type="text"
                                                placeholder={'Israel'}
                                                onBlur={e => blurHandler(e)}
                                                onChange={e => handleChangeCountry(e)}
                                                required={'required'}/>
                                        </div>
                                    </div>
                                    <div className={'d-flex'}>
                                        <div className={'col-3 text-right p-0'}>
                                            <label>{(cityDirt && cityError) &&
                                            <span className={'red_star'}>{cityError}</span>} City: </label>
                                        </div>
                                        <div className={'input_i_found_wrapper col-10 pr-0'}>
                                            <input
                                                name={'city'}
                                                value={city}
                                                type="text"
                                                placeholder={'Tel Aviv'}
                                                onBlur={e => blurHandler(e)}
                                                onChange={e => handleChangeCity(e)}
                                                required={'required'}/>
                                        </div>
                                    </div>
                                    <div className={'d-flex'}>
                                        <div className={'col-3 text-right p-0'}>
                                            <label>{(streetDirt && streetError) &&
                                            <span className={'red_star'}>{streetError}</span>} Street: </label>
                                        </div>
                                        <div className={'input_i_found_wrapper col-10 pr-0'}>
                                            <input
                                                name={'street'}
                                                value={street}
                                                type="text"
                                                placeholder={'Florentin Street'}
                                                onBlur={e => blurHandler(e)}
                                                onChange={e => handleChangeStreet(e)}
                                                required={'required'}/>
                                        </div>
                                    </div>
                                    <div className={'d-flex'}>
                                        <div className={'col-3 text-right p-0'}>
                                            <label>{(buildingDirt && buildingError) &&
                                            <span className={'red_star'}>{buildingError}</span>} Building: </label>
                                        </div>
                                        <div className={'input_i_found_wrapper col-10 pr-0'}>
                                            <input
                                                name={'building'}
                                                value={+building}
                                                type="number"
                                                placeholder={'6'}
                                                min={'0'}
                                                onBlur={e => blurHandler(e)}
                                                onChange={e => handleChangeBuilding(e)}
                                                required={'required'}/>
                                        </div>
                                    </div>
                                </div>
                        }
                        <div className={'description_i_found d-flex align-items-center pt-2'}>
                            <div className={'col-3 d-flex flex-column p-0 text-right'}>

                                <label>Description: </label>
                                <span>up to 60 char</span>
                            </div>
                            <div className={'col-10 pr-0'}>
                                <textarea
                                    name=""
                                    id=""
                                    cols="30"
                                    rows="5"
                                    maxLength={60}
                                    placeholder={'Please after each word put a comma'}
                                    className={'description_i_found_text'}
                                    defaultValue={dis}
                                    onChange={e => setDis(e.target.value)}>
                                </textarea>
                                {dis.length >= 60 ?<span className={'so_more_text'}>Слишком много тегов</span>: null}
                            </div>
                        </div>
                    </div>
                    <div className={'right_block_i_found col-6 d-flex flex-column align-items-center pr-0'}>
                        <div className={'img_i_found'}>
                            <img src={i_found} alt=""/>
                        </div>
                        <div className={'dnd_i_found d-flex'}>
                            <div className={'block_button_dnd'}>
                                <span className={'signOutAlt'}>{signOutAlt}</span>
                                <p className={'m-0 paragraph_dnd_button'}>Drag and drop photos or</p>
                                <button className={'button_dnd p-0'}>
                                    <label
                                        className={'label_input_file_i_found d-flex align-items-center justify-content-center'}
                                        htmlFor="img_file">
                                        <span onClick={() => dispatch(drag_and_drop(true))}>Browse</span>
                                        <input type="file" id={'img_file'} name={'img_file'} multiple={'multiple'}
                                               accept={"image/jpeg,image/png,image/gif"}
                                               onChange={e => handleClickChange(e)}/>
                                    </label>
                                </button>
                            </div>

                            {DnD ?
                                <div
                                    className={'block_from_img_dnd d-flex flex-column'}
                                    onDragStart={e => dragStart(e)}
                                    onDragLeave={e => dragFinish(e)}
                                    onDragOver={e => dragStart(e)}
                                    onDrop={e => onDrop(e)}>
                                    {fileNames ? fileNames.map((item, index) =>
                                        <div
                                            className={'d-flex justify-content-between align-items-center block_name_img_i_found'}
                                            key={index + 1}>
                                            <span
                                                className={'name_img_i_found'}>{item.name.length > 10 ? item.name.substring(0, 10) + '...'  + item.name.split('.')[item.name.split('.').length - 1] : item.name}</span>
                                            <button className={'remove_button_img_tags'}
                                                    onClick={(e) => removeFile(index)}>{times}</button>
                                        </div>) : null}
                                    {fileNames.length >= 4 ?
                                        <span className={'text-center pt-2'}>не более 4</span> : null}
                                </div>
                                :
                                <div
                                    className={'drag d-flex justify-content-between align-items-center text-center text-uppercase'}
                                    onDragStart={(e) => dragStart(e)}
                                    onDragLeave={(e) => dragFinish(e)}
                                    onDragOver={(e) => dragStart(e)}
                                >
                                    <span>move here and release the file to download</span>
                                </div>}

                        </div>
                    </div>
                </section>
                <footer className={'p-0 footer_i_found'}>
                    <div className={'footer_i_found_top_block d-flex justify-content-between align-items-center'}>
                        <div className={'footer_i_found_block_label'}>
                            <label className={'m-0'}>Contact: </label>
                        </div>
                        <div className={'footer_i_found_input'}>
                            <input type="text" placeholder={'Phone*'} disabled={'disabled'}/>
                        </div>
                        <div className={'footer_i_found_input'}>
                            <input type="text" placeholder={'Email'} disabled={'disabled'}/>
                        </div>
                        <div className={'footer_i_found_input'}>
                            <input type="text" placeholder={'Facebook profile'} disabled={'disabled'}/>
                        </div>
                    </div>
                    <div className={'footer_i_found_button_block d-flex justify-content-between align-items-center'}>
                        <div className={'d-flex align-items-center'}>
                            <div className={'photo_inform'}>
                                <img src={user.avatar} alt=""/>
                            </div>
                            <p className={'m-0 user_name_i_found'}>{user.name}</p>
                        </div>
                        <div>
                            <button
                                className={'i_found_button d-flex align-items-center'}
                                onClick={() => {
                                    handleClickPublish()
                                }}>
                                <span className={'found_add i_found_add_icon'}>{foundIcon}</span>
                                <span
                                    className={'text_add i_found_text_button d-flex justify-content-center w-100'}>Publish</span>
                            </button>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
};

export default IFound;