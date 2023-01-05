import { useRouter } from 'next/router'
import AptForm from '../../../components/AptComponents/AptForm'
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { getApt } from '../../../utils/ApiCalls'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { FC } from 'react';
import { GetServerSideProps } from 'next'



const EditApt: FC = ({id}) => {
  const router = useRouter()

  const { data: apt, error } = useQuery(['apts', id], () => getApt(id))


  if (error) return <p>Failed to load</p>
  if (!apt) return <p>Loading...</p>

  const aptForm = {
    title: apt.title,
    price: apt.price,
    short_description: apt.short_description,
    sq_mt: apt.sq_mt,
    floor: apt.floor,
    rooms: apt.rooms,
    lat: apt.lat,
    long: apt.long,
  }

  return (
    <div className="container mx-auto my-40 w-2/4" >
      <div className='grid grid-cols-1'>
        <AptForm formId="edit-apt-form" aptForm={aptForm} forNewApt={false} />
      </div>
    </div>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ params, locale }) => {

  const id = params.id;

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


export default EditApt
