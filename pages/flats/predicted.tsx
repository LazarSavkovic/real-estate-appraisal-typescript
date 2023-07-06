import styles from '../../styles/Home.module.css'
import { getSession } from 'next-auth/react'
import FlatCard from '../../components/FlatComponents/FlatCard'
import { useEffect, useState, FC } from 'react'
import { GetServerSideProps } from 'next'
import { FlatType } from 'utils/types'


const PredictedFlats: FC = () => {

    const [flats, setFlats] = useState<FlatType[]>([])

    useEffect(() => {
        const flatsArrayString = localStorage.getItem('flatsArray')
        let oldFlats: FlatType[]
        if (flatsArrayString) {
            oldFlats = JSON.parse(flatsArrayString);
        } else {
            oldFlats = [];
        }
        setFlats([...oldFlats])
    }, [])

    return (
        <div className="container mx-auto my-28 w-3/4" >
            <div className='grid grid-cols-1'>
                <div className={styles.container}>
                    {flats.map((flat) => {
                        if (flat) {
                            return <FlatCard key={flat._id?.toString()} flat={flat} predicted={true} />
                        }
                    })}
                </div>

            </div>
        </div>


    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req })

    if (session) {
        return {
            redirect: {
                destination: '/flats',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }

}


export default PredictedFlats
