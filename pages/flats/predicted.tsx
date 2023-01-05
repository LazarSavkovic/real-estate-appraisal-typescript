import styles from '../../styles/Home.module.css'
import { getSession } from 'next-auth/react'
import FlatCard from '../../components/FlatComponents/FlatCard'
import { useEffect, useState, FC } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'


const PredictedFlats: FC = () => {

    const [flats, setFlats] = useState([])

    useEffect(() => {
        const oldFlats = JSON.parse(localStorage.getItem('flatsArray')) || [];
        setFlats([...oldFlats])
    }, [])
    return (
        <div className="container mx-auto my-28 w-3/4" >
            <div className='grid grid-cols-1'>
                <div className={styles.container}>
                    {flats.map((flat) => (
                        <FlatCard key={flat._id} flat={flat} predicted={true}/>
                    ))}
                </div>

            </div>
        </div>


    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, locale }) => {
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
