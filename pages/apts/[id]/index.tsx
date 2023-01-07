import { useState, FC } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import AptBigCard from '../../../components/AptComponents/AptBigCard'
import { getApt } from '../../../utils/ApiCalls'
import { dehydrate, QueryClient, useQuery, useQueryClient, UseQueryResult } from 'react-query';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'
import { AptType } from 'utils/types'

// Define props
interface AptPageProps {
  id: string
}

/* Allows you to view apt card info and delete apt card*/
const AptPage: FC<AptPageProps> = ({id}: AptPageProps) => {

  const router = useRouter()

  const queryClient = useQueryClient()
  
  const { data: apt, isLoading, isError, error }: UseQueryResult<AptType, Error> = useQuery<AptType, Error, AptType, Array<string>>(['apts', id], () => getApt(id))


  const [message, setMessage] = useState('')


  const handleDelete = async () => {
    try {
      await fetch(`/api/apts/${id}`, {
        method: 'Delete',
      })
      router.push('/')
    } catch (error) {
      setMessage('Failed to delete the apt.')
    }
  }

  
  if (isLoading) {
    return <div>Učitava se</div>
  }

  if (isError) {
    return <div>{error.message}</div>
  }


  return (

    <div className="flex bg-blue-400">
      <div className="m-auto bg-slate-50 rounded-md w-3/5 mt-24 pt-16 flex justify-center">

        {apt?._id ? <AptBigCard key={apt._id.toString()} apt={apt} handleDelete={handleDelete} /> : null}


        {message && <p>{message}</p>}
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params, locale }) => {

  const id = params?.id;

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['apts', id], () => getApt(id))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id: id,
      ...(await serverSideTranslations(locale, [ 'common', 'apts'])),
      // Will be passed to the page component as props
    },
  }
}


export default AptPage
