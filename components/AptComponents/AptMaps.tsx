
import Map, { Source, Layer } from 'react-map-gl';
import { useState, FC } from 'react'

const AptMaps: FC = ({ longitude, latitude }) => {

    const geojson = {
        type: 'FeatureCollection',
        features: [
            { type: 'Feature', geometry: { type: 'Point', coordinates: [longitude, latitude] } }
        ]
    };

    const layerStyle = {
        id: 'point',
        type: 'circle',
        paint: {
            'circle-radius': 10,
            'circle-color': '#007cbf'
        }
    };

    const [viewState, setViewState] = useState({
        longitude: longitude,
        latitude: latitude,
        zoom: 14
    });


    return (<Map
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            style={{ width: '100%', height: 350 }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}>
            <Source id="my-data" type="geojson" data={geojson}>
                <Layer {...layerStyle} />
            </Source>

        </Map>
    )
}


export default AptMaps

