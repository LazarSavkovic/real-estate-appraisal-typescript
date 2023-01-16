import FlatForm from '../../../components/FlatComponents/FlatForm'
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { getFlat } from '../../../utils/ApiCalls'
import { getSession, } from 'next-auth/react'
import Dashboard from '../../../components/Dashboard'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { FC } from 'react';
import { GetServerSideProps } from 'next'
import { Session } from 'next-auth'

interface EditFlatProps {
  session: Session,
  userId: string,
  flatId: string
}



const EditFlat: FC<EditFlatProps> = ({ session, userId, flatId }: EditFlatProps) => {

  const { data: flat, error } = useQuery(['flats', flatId], () => getFlat({ userId, flatId }))


  if (error) return <p>Failed to load</p>
  if (!flat) return <p>Loading...</p>

  const flatForm = {
    title: flat.title,
    location: flat.location,
    short_description: flat.short_description,
    sq_mt: flat.sq_mt,
    floor: flat.floor,
    rooms: flat.rooms
  }

  return (
    <div className="container mx-auto my-28 w-3/4" >
      <div className='grid grid-cols-1'>
        <Dashboard session={session} >
          <div className='flex items-center justify-center'>
            <FlatForm formId="edit-flat-form" flatForm={flatForm} forNewFlat={false} />
          </div>
        </Dashboard>
      </div>
    </div>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ params, req, locale }) => {


  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
  let id: string;
  if (params?.id) {
    if (typeof params?.id === 'string') {
      id = params.id;
    } else {
      id = params?.id[0]
    }
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery(['flat', id], () => getFlat({ userId: session.user._id, flatId: id }))
  
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        session: session,
        userId: session.user._id,
        flatId: params.id,
        ...(await serverSideTranslations(locale!, ['dashboard', 'common', 'flats', 'flatForm'])),
        // Will be passed to the page component as props
      },
    }
  } else {
    return {
      props: {}
    }
  }

}




export default EditFlat
