import FlatForm from '../../components/FlatComponents/FlatForm'
import { getSession } from 'next-auth/react'
import { FC } from 'react'
import { GetServerSideProps } from 'next'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const PredictNewFlat: FC = () => {

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
    <div className="mx-auto h-screen p-10 w-[100vw] flex justify-center items-center bg-gradient-to-r from-blue-400 to-indigo-500" >
      <div className='flex justify-center w-[90%] md:w-[75%] lg:w-[60%] py-16 bg-slate-50 rounded'>
          <FlatForm formId="add-flat-form" flatForm={flatForm} justPredict={true} />
      </div>
    </div>
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
      ...(await serverSideTranslations(locale!, [ 'common', 'flats', 'flatForm'])),
      // Will be passed to the page component as props
    }
  }
}


export default PredictNewFlat
