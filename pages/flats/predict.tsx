import FlatForm from '../../components/FlatComponents/FlatForm'
import { getSession } from 'next-auth/react'
import { FC } from 'react'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const PredictNewFlat: FC = () => {

  const { t } = useTranslation('flats');
 

  const flatForm = {
    title: '',
    location: '',
    price: 0,
    short_description: '',
    sq_mt: 0,
    floor: 0,
    rooms: 0,
    lat: 0,
    long: 0,
  }

  return (

    <>
    <Head>
           <title>{t('new property')}</title>
       </Head>
    <div className="mx-auto h-screen w-[100vw] flex justify-center items-center bg-gradient-to-r from-blue-400 to-indigo-500" >
      <div className='flex flex-col justify-center w-[90%] md:w-[70%] lg:w-[50%]  bg-slate-100 shadow-md rounded'>
      <div className="flex flex-col items-center justify-center h-20 space-x-4 bg-gradient-to-r from-blue-500 to-indigo-600">
        <h5 className="text-2xl text-white text-shadow font-medium lg:block">{t('new property')}</h5>
      </div>
      <div className='p-6'>
        <FlatForm formId="add-flat-form" flatForm={flatForm} justPredict={true} />
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
        destination: '/flats/new',
        permanent: false
      }
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'flats', 'flatForm'])),
      // Will be passed to the page component as props
    }
  }
}


export default PredictNewFlat
