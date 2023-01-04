import FlatForm from '../../components/FlatComponents/FlatForm'
import { getSession } from 'next-auth/react'
import Dashboard from '../../components/Dashboard'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const PredictNewFlat = () => {
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
    <div className="container mx-auto my-28 w-3/4" >
      <div className='flex justify-center'>
          <FlatForm formId="add-flat-form" flatForm={flatForm} justPredict={true} />
      </div>
    </div>
  )
}


export async function getServerSideProps({ req, locale }) {
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
    }
  }
}


export default PredictNewFlat
