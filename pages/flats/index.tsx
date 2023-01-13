import { getSession } from 'next-auth/react'
import FlatCard from '../../components/FlatComponents/FlatCard'
import { dehydrate, QueryClient, useQuery } from 'react-query';
import Dashboard from '../../components/Dashboard'
import { getFlats } from '../../utils/ApiCalls'
import { useEffect, useState, FC } from 'react';
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'
import { Session } from 'next-auth'

interface FlatsProps {
  session: Session
}


const Flats: FC<FlatsProps> = ({ session }: FlatsProps) => {

  const [flats, setFlats] = useState([])
  const { isLoading, isError, error } = useQuery('flats', () => getFlats(session.user._id),  {onSuccess: setFlats})
  const [searchInput, setSearchInput] = useState('')

  const [filteredFlats, setFilteredFlats] = useState([])


  useEffect(() => {
    const newFlats = flats.filter((flat) => {
      if (flat.title.toLowerCase().includes(searchInput.toLowerCase())) {
        return flat
      }
    })

    setFilteredFlats(newFlats)
  }, [flats, searchInput])

  const { locale, locales, push  } = useRouter()
  
  if (isLoading) {
    return <div>Učitava se</div>
  }

  if (isError) {
    return<div>{error}</div>
  }


  return (
    <div className="container mx-auto my-28 w-3/4" >
      <div className='grid grid-cols-1'>
        {session && filteredFlats && <Dashboard session={session} setSearchInput={setSearchInput} searchInput={searchInput}>
          <div className='flex flex-col items-center'>
            {filteredFlats && filteredFlats.map((flat, i) => (
              <FlatCard key={flat._id} flat={flat} />
            ))}
          </div>
        </Dashboard>}

      </div>
    </div>

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
      ...(await serverSideTranslations(locale, ['dashboard', 'common', 'flats'])),
      // Will be passed to the page component as props
    },
  }
}


export default Flats
