import { getSession } from 'next-auth/react'
import Dashboard from '../../components/Dashboard'
import Map, { Marker, Popup } from 'react-map-gl';
import { useState, FC, useEffect } from 'react'
import { getCenter } from 'geolib'
import { getFlats } from '../../utils/ApiCalls'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { dehydrate, QueryClient, useQuery, UseQueryResult } from 'react-query';
import { GetServerSideProps } from 'next'
import { Session } from 'next-auth'
import { FlatType } from 'utils/types';

interface MapsProps {
    session: Session
}

const Maps: FC<MapsProps> = ({ session }: MapsProps) => {

    const [selectedLocation, setSelectedLocation] =
        useState<{
            title: string,
            _id: string,
            longitude: number,
            latitude: number
        } | false>(false);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [viewState, setViewState] = useState<{
        longitude: number,
        latitude: number,
        zoom: number
    }>({
        longitude: 0,
        latitude: 0,
        zoom: 14
    });

    const { data: flats }: UseQueryResult<FlatType[], Error> = useQuery<FlatType[], Error, FlatType[], string>('flats', () => getFlats(session.user._id))

    let center: false | { longitude: number; latitude: number; }

    if (flats) {
        let coordinates = flats?.map(flat => ({ longitude: flat?.geometry?.coordinates[0] as number, latitude: flat?.geometry?.coordinates[1] as number }));
        center = getCenter(coordinates);
    } else {
        center = false;
    }

    useEffect(() => {
        if (center) {
            setViewState({
                longitude: center.longitude,
                latitude: center.latitude,
                zoom: 14
            });
        }
        }, [flats])


    const changeSelectedFlat = (flat: FlatType) => {

        try {
            setSelectedLocation({
                title: flat.title,
                _id: flat._id?.toString() as string,
                longitude: flat.geometry?.coordinates[0] as number,
                latitude: flat.geometry?.coordinates[1] as number
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
        <>     <Dashboard session={session}>
                    {center && <Map
                        {...viewState}
                        onMove={evt => setViewState(evt.viewState)}
                        style={{ width: '100%', height: 600 }}
                        mapStyle="mapbox://styles/mapbox/streets-v11"
                        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}>
                        {flats && flats.map(flat => (
                            <div key={flat._id?.toString()}>
                                {flat.geometry && <Marker
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

                                </Marker>}
                            </div>
                        ))}
                        {showPopup && selectedLocation &&
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
                    </Map>}
                </Dashboard>
            </>

    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, locale }) => {
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
            ...(await serverSideTranslations(locale!, ['dashboard', 'common'])),
            // Will be passed to the page component as props
        }
    }
}


export default Maps
