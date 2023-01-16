import { useState, FC } from 'react'
import { useRouter } from 'next/router'
import FlatBigCard from '../../../components/FlatComponents/FlatBigCard'
import { getSession } from 'next-auth/react'
import Dashboard from '../../../components/Dashboard'
import { dehydrate, QueryClient, useQuery, useMutation, useQueryClient, UseQueryResult } from 'react-query';
import { getFlat, getApts, deleteFlat } from '../../../utils/ApiCalls'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { Session } from 'next-auth'
import { AptType, FlatType } from 'utils/types'

interface FlatPageProps {
  session: Session,
  userId: string,
  flatId: string
}


/* Allows you to view apt card info and delete apt card*/
const FlatPage: FC<FlatPageProps> = ({ session, userId, flatId }: FlatPageProps) => {

  const { t } = useTranslation('flats')

  const router = useRouter()
  const [message, setMessage] = useState<string>('')
  const [apts, setApts] = useState<AptType[]>([]);

  const { data: apartments }: UseQueryResult<AptType[], Error> = useQuery<AptType[], Error, AptType[], string>('apts', () => getApts(100))

  const showApts = (): void => {
    if (apartments) {
      setApts(apartments)
    }
  }

  const removeApts = () => {
    setApts([])
  }

  const queryClient = useQueryClient()

  const deleteFlatMutation = useMutation(deleteFlat
    , {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['flats'] })
      }
    }
  )

  const { data: flat }: UseQueryResult<FlatType, Error> = useQuery<FlatType, Error, FlatType, string[]>(['flats', flatId], () => getFlat({ userId, flatId }))

  const handleDelete = async () => {

    try {
      deleteFlatMutation.mutate(flatId)

      // Throw error with status code in case Fetch API req failed
      if (deleteFlatMutation.isError) {
        throw new Error(deleteFlatMutation.error.message)
      }

      router.push('/')
    } catch (error) {
      setMessage('Failed to delete the flat.')
    }
  }

  return (

    <div className='container mx-auto my-28 w-3/4' >
      <div className='grid grid-cols-1'>

        {session && flat && <Dashboard session={session}>
          <div className='flex pb-3 w-[100%] justify-self-end'>
            {!apts[0] && <button onClick={showApts} className='button'>{t('show properties on market')}</button>}
            {apts[0] && <button onClick={removeApts} className='button'>{t('remove properties on market')}</button>}
          </div>
          <FlatBigCard key={flat._id?.toString()} flat={flat} handleDelete={handleDelete} apts={apts} />
        </ Dashboard>}

        {message && <p>{message}</p>}

      </div>
    </div >
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

    await queryClient.prefetchQuery(['flats', id], () => getFlat({ userId: session.user._id, flatId: id }))

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        session: session,
        userId: session.user._id,
        flatId: params.id,
        ...(await serverSideTranslations(locale!, ['dashboard', 'common', 'flats'])),
        // Will be passed to the page component as props
      },
    }


  } else {
    return {
      props: {}
    }
  }
}

export default FlatPage
