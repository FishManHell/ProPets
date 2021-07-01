import React, {useState} from 'react';
import {GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api";
import {useSelector} from "react-redux";
import mapsThem from "../../utils/mapsThem";


const Map = () => {
    const Type = useSelector(state => state.modalReducer.search_type);
    const Breed = useSelector(state => state.modalReducer.search_breed);
    const Tag = useSelector(state => state.modalReducer.search_features);
    const City = useSelector(state => state.modalReducer.search_location);


    const location_arr_found = useSelector(state => state.foundReducer.search_arr_for_map);
    const location_arr_lost = useSelector(state => state.lostReducer.search_arr_for_map);

    const posts_found = useSelector(state => state.foundReducer.found_posts);
    const posts_lost = useSelector(state => state.lostReducer.lost_posts);

    const content = useSelector(state => state.routeReducer.page);
    const [selected, setSelected] = useState(null);

    const location_content = content === 'found' ? posts_found : posts_lost
    const location_arr_market = content === 'found' ? location_arr_found : location_arr_lost
    const search_content  = Type.length || Breed.length || Tag.length || City.length ? location_arr_market : location_content

    const libraries = ["places"];
    const mapContainerStyle = {
        width: "400px",
        height: "100vh"
    }
    const center = {
        lat: 31.674891,
        lng: 34.575039
    }
    const options = {
        styles: mapsThem,
        disableDefaultUI: true
    }
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
        libraries,
    })

    if (loadError) return 'Error loading maps';
    if (!isLoaded) return 'Loading maps';

    return (
        <div>
            <GoogleMap mapContainerStyle={mapContainerStyle}
                       zoom={3}
                       center={center}
                       options={options}
                       onClick={(e) => {
                           console.log(e)
                       }}>

                {search_content.map((item, index) => (
                    item.location !== null ?
                        item.location.lat !== null && item.location.lon ?
                    <Marker
                        key={index}
                        position={{lat: item.location.lat, lng: item.location.lon}}
                        icon={{
                            url: '/bear.svg',
                            scaledSize: new window.google.maps.Size(33, 45),
                            origin: new window.google.maps.Point(0, 0)
                        }}
                        onClick={() => {
                            setSelected(item.location)
                        }}
                    >
                        {selected === item.location ?
                            <InfoWindow position={{lat: selected.lat, lng: selected.lon}}
                                        onCloseClick={() => setSelected(null)}>
                                <div className={'d-flex flex-column'}>
                                    <span>id: {item.id}</span>
                                    <span>type: {item.type}</span>
                                    <span>sex: {item.sex}</span>
                                    <span>bread: {item.breed}</span>
                                    <span>date-post: {item.datePost.split(' ')[0]}</span>
                                </div>
                            </InfoWindow> : null}
                    </Marker>
                : null : null))}
            </GoogleMap>
        </div>
    )
}
export default Map;