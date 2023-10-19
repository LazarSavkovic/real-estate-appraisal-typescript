import styles from '../../styles/Home.module.css'
import { getSession } from 'next-auth/react'
import FlatCard from '../../components/FlatComponents/FlatCard'
import { useEffect, useState, FC } from 'react'
import { GetServerSideProps } from 'next'
import { FlatType } from 'utils/types'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'


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

    
  const { t } = useTranslation('flats');

    return (
        
        <>
          <Head>
           <title>{t('predicted properties')}</title>
       </Head>
       <div className="mx-auto min-h-screen w-[100vw] flex flex-col pt-20 items-center bg-gradient-to-r from-blue-400 to-indigo-500" >
      <div className='flex flex-col justify-center w-[90%] md:w-[70%] lg:w-[50%]  bg-slate-100 shadow-md rounded'>
      <div className="flex flex-col items-center justify-center h-20 space-x-4 bg-gradient-to-r from-blue-500 to-indigo-600">
        <h5 className="text-2xl text-white text-shadow font-medium lg:block">Predicted properties</h5>
      </div>
      <div className='p-6'>
        {flats.map((flat) => {
                        if (flat) {
                            return <FlatCard key={flat._id?.toString()} flat={flat} predicted={true} />
                        }
                    })}
                </div>

            </div>
        </div>
        </>


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
        props: {
            ...(await serverSideTranslations(locale!, ['common', 'flats'])),
            // Will be passed to the page component as props
          }
    }

}


export default PredictedFlats
