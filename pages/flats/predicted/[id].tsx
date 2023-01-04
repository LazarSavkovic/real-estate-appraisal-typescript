import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import FlatBigCard from '../../../components/FlatComponents/FlatBigCard'
import { getSession } from 'next-auth/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'


const PredictedFlatPage = () => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [flat, setFlat] = useState(false)

  useEffect( () => {
    
    const flatID = router.query.id;
    const oldFlats =  JSON.parse(window.localStorage.getItem('flatsArray')) || [];
    const filtered = oldFlats.filter(oldFlat => oldFlat._id === flatID);
    setFlat(filtered[0])
  }, [])


  const handleDelete = async () => {
    const flatID = router.query.id

    // try {
    //   await fetch(`/api/flats/${flatID}`, {
    //     method: 'Delete',
    //   })
    //   router.push('/')
    // } catch (error) {
    //   setMessage('Failed to delete the flat.')
    // }
  }

  return (

    <div className="container mx-auto my-28 w-3/4" >
      <div className='grid grid-cols-1'>

        {flat && <FlatBigCard key={flat._id} flat={flat} handleDelete={handleDelete} />}

      {message && <p>{message}</p>}
    </div>
    </div >
  )
}




export async function getServerSideProps({ params, req, locale }) {

  const session = await getSession({ req })

  if (session) {
    return {
      redirect: {
        destination: '/flats',
        permanent: false
      }
    }
  }

  return { props: { 
      ...(await serverSideTranslations(locale, ['dashboard', 'common', 'flats'])),
      // Will be passed to the page component as props
  } }
}

export default PredictedFlatPage
