import { getSession } from 'next-auth/react'
import FlatCard from '../../components/FlatComponents/FlatCard'
import { dehydrate, QueryClient, useQuery, UseQueryResult } from 'react-query';
import Dashboard from '../../components/Dashboard'
import { getFlats } from '../../utils/ApiCalls'
import { useEffect, useState, FC } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'
import { Session } from 'next-auth'
import { FlatType } from 'utils/types';
import Head from 'next/head'
import { useTranslation } from 'next-i18next'

interface FlatsProps {
  session: Session
}

const Flats: FC<FlatsProps> = ({ session }: FlatsProps) => {

  const [flats, setFlats] = useState<FlatType[]>([])
  const { isLoading, isError, error }: UseQueryResult<FlatType[], Error> = useQuery<FlatType[], Error, FlatType[], string>('flats', () => getFlats(session.user._id),  {onSuccess: setFlats})
  const [searchInput, setSearchInput] = useState<string>('')

  const [filteredFlats, setFilteredFlats] = useState<FlatType[]>([])


  useEffect(() => {
    const newFlats = flats.filter((flat) => {
      if (flat.title.toLowerCase().includes(searchInput.toLowerCase())) {
        return flat
      }
    })

    setFilteredFlats(newFlats)
  }, [flats, searchInput])

  
  const { t } = useTranslation('flats');
  
  if (isLoading) {
    return <div>Učitava se</div>
  }

  if (isError) {
    return<div>{error.message}</div>
  }


  return (

    <>
      <Head>
               <title>{t('properties')}</title>
           </Head>
        {session && filteredFlats && <Dashboard session={session} setSearchInput={setSearchInput} searchInput={searchInput}>
          <div className='flex flex-col items-center'>
            {filteredFlats && filteredFlats.map((flat) => (
              <FlatCard key={flat._id?.toString()} flat={flat} />
            ))}
          </div>
        </Dashboard>}
</>

  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, locale }) => {
  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery('flats', () => getFlats(session.user._id))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      session: session,
      ...(await serverSideTranslations(locale!, ['dashboard', 'common', 'flats'])),
      // Will be passed to the page component as props
    },
  }
}


export default Flats
