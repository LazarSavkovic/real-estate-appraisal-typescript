import Map, { Marker, Popup } from 'react-map-gl';
import { useState, FC } from 'react'
import { AptType } from 'utils/types';

interface FlatMapsProps {
    longitude: number,
    latitude: number,
    apts: AptType[]
}


const FlatMaps: FC<FlatMapsProps> = ({ longitude, latitude, apts }: FlatMapsProps) => {

    const [showPopup, setShowPopup] = useState(false);

    const [viewState, setViewState] = useState({
        longitude: longitude,
        latitude: latitude,
        zoom: 14
    });


    return (<Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{ width: '100%', height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}>
        {/* <Source id="my-data" type="geojson" data={geojson}>
                <Layer {...layerStyle} />
            </Source> */}
        <Marker
            longitude={longitude}
            latitude={latitude}
            anchor='bottom'
        >
            <p
                role='img'
                onClick={(e) => {
                    e.stopPropagation();
                    setShowPopup(!showPopup)
                }}
                className='cursor-pointer text-2xl animate-bounce'
                aria-label='push-pin'>🏠</p>

        </Marker>{showPopup &&
            <Popup
                onClose={() => setShowPopup(false)}
                closeOnClick={true}
                longitude={longitude}
                latitude={latitude}
                anchor='bottom'
                offset={25}
            >Vaša nekretnina
            </Popup>}

        {apts && apts.map(apt => (
            <div key={apt._id?.toString()}>
                <Marker
                    longitude={apt.long}
                    latitude={apt.lat}
                    anchor='bottom'
                >
                    <p
                        role='img'
                        // onClick={(e) => {
                        //     e.stopPropagation();
                        //     changeSelectedFlat(flat)
                        // }}
                        className='cursor-pointer text-2xl animate-bounce'
                        aria-label='push-pin'>🏢</p>

                </Marker>
            </div>
        ))}
        {/* {showPopup &&
            <Popup
                onClose={closePopup}
                closeOnClick={true}
                longitude={selectedLocation.longitude}
                latitude={selectedLocation.latitude}
                anchor='bottom'
                offset={25}
            >
                {selectedLocation.title}
            </Popup>} */}

    </Map >
    )
}


export default FlatMaps

