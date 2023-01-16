import { useRouter } from 'next/router'
import AptForm from '../../../components/AptComponents/AptForm'
import { dehydrate, QueryClient, useQuery, UseQueryResult } from 'react-query';
import { getApt } from '../../../utils/ApiCalls'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { FC } from 'react';
import { GetServerSideProps } from 'next'
import { AptType } from 'utils/types'

interface EditAptProps {
  id: string
}


const EditApt: FC<EditAptProps> = ({ id }: EditAptProps) => {
  const router = useRouter()

  const { data: apt, error }: UseQueryResult<AptType, Error> = useQuery<AptType, Error, AptType, Array<string>>(['apts', id], () => getApt(id))


  if (error) return <p>Failed to load</p>
  if (!apt) return <p>Loading...</p>

  const aptForm: AptType = {
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

  let id: string;
  if (params?.id) {
    if (typeof params?.id === 'string') {
      id = params.id;
    } else {
      id = params?.id[0]
    }
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery(['apts', id], () => getApt(id))

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        id: id,
        ...(await serverSideTranslations(locale!, ['common', 'apts'])),
        // Will be passed to the page component as props
      },
    }
  }
  else {
    return {
      props: {}
    }
  }

}

export default EditApt
