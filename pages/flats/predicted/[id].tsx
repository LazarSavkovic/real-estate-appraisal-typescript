import { useEffect, useState, FC } from 'react'
import { useRouter } from 'next/router'
import FlatBigCard from '../../../components/FlatComponents/FlatBigCard'
import { getSession } from 'next-auth/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'
import { FlatType } from 'utils/types'


const PredictedFlatPage: FC = () => {
  const router = useRouter()
  const [message, setMessage] = useState<string>('')
  const [flat, setFlat] = useState<false | FlatType>(false)

  useEffect( () => {
    const flatID = router.query.id;
    
    const flatsArrayString = localStorage.getItem('flatsArray')
    let oldFlats: FlatType[]
    if (flatsArrayString) {
        oldFlats = JSON.parse(flatsArrayString);
    } else {
         oldFlats =  [];
    }

    const filtered = oldFlats.filter(oldFlat => oldFlat._id === flatID);
    setFlat(filtered[0])
  }, [router.query.id])


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
        {flat && <FlatBigCard key={flat._id?.toString()} flat={flat} handleDelete={handleDelete} />}
      {message && <p>{message}</p>}
    </div>
    </div >
  )
}




export const getServerSideProps: GetServerSideProps = async ({  req, locale }) => {

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
      ...(await serverSideTranslations(locale!, ['dashboard', 'common', 'flats'])),
      // Will be passed to the page component as props
  } }
}

export default PredictedFlatPage
