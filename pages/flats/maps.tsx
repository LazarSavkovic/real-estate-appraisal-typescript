import { getSession } from 'next-auth/react'
import Dashboard from '../../components/Dashboard'
import Map, { Marker, Popup } from 'react-map-gl';
import { useState } from 'react'
import { getCenter } from 'geolib'
import { getFlats } from '../../utils/ApiCalls'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { dehydrate, QueryClient, useQuery } from 'react-query';


const Maps = ({ session }) => {

    const [selectedLocation, setSelectedLocation] = useState({});
    const [showPopup, setShowPopup] = useState(false);

    const { data: flats } = useQuery('flats', () => getFlats(session.user._id))


    const coordinates = flats.map(flat => ({ longitude: flat.geometry.coordinates[0], latitude: flat.geometry.coordinates[1] }));
    const center = getCenter(coordinates);

    const [viewState, setViewState] = useState({
        longitude: center.longitude,
        latitude: center.latitude,
        zoom: 14
    });


    const changeSelectedFlat = (flat) => {
        console.log(flat);
        try {
            setSelectedLocation({
                title: flat.title,
                _id: flat._id,
                longitude: flat.geometry.coordinates[0],
                latitude: flat.geometry.coordinates[1]
            })
            setShowPopup(true)
        } catch (e) {
            console.log(e)
        }

    }
    const closePopup = () => {
        console.log('closing popup')
        setShowPopup(false)
    }


    return (
        <div className="container mx-auto my-28 w-3/4" >
            <div className='grid grid-cols-1'>
                <Dashboard session={session}>
                    <Map
                        {...viewState}
                        onMove={evt => setViewState(evt.viewState)}
                        style={{ width: '100%', height: 600 }}
                        mapStyle="mapbox://styles/mapbox/streets-v11"
                        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}>
                        {flats.map(flat => (
                            <div key={flat._id}>
                                <Marker
                                    longitude={flat.geometry.coordinates[0]}
                                    latitude={flat.geometry.coordinates[1]}
                                    anchor='bottom'
                                >
                                    <p
                                        role='img'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            changeSelectedFlat(flat)
                                        }}
                                        className='cursor-pointer text-2xl animate-bounce'
                                        aria-label='push-pin'>🏠</p>

                                </Marker>
                            </div>
                        ))}
                        {showPopup &&
                            <Popup
                                onClose={closePopup}
                                closeOnClick={true}
                                longitude={selectedLocation.longitude}
                                latitude={selectedLocation.latitude}
                                anchor='bottom'
                                offset={25}
                            >
                                {selectedLocation.title}
                            </Popup>}
                    </Map>

                </Dashboard>

            </div>
        </div>


    )
}

export async function getServerSideProps({ req, locale }) {
    const session = await getSession({ req })

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }


    const queryClient = new QueryClient()

    await queryClient.prefetchQuery('flats', () => getFlats(session.user._id))



    return {
        props: {

            dehydratedState: dehydrate(queryClient),
            session: session,
            ...(await serverSideTranslations(locale, ['dashboard', 'common'])),
            // Will be passed to the page component as props
        }
    }
}


export default Maps
