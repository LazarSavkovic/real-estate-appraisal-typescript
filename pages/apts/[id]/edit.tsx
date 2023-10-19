import { useRouter } from 'next/router'
import AptForm from '../../../components/AptComponents/AptForm'
import { dehydrate, QueryClient, useQuery, UseQueryResult } from 'react-query';
import { getApt } from '../../../utils/ApiCalls'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { FC } from 'react';
import { GetServerSideProps } from 'next'
import { AptType } from 'utils/types'
import { useTranslation } from 'next-i18next'

interface EditAptProps {
  id: string
}


const EditApt: FC<EditAptProps> = ({ id }: EditAptProps) => {
  const router = useRouter()

  const { data: apt, error }: UseQueryResult<AptType, Error> = useQuery<AptType, Error, AptType, Array<string>>(['apts', id], () => getApt(id))


  const { t } = useTranslation('apts');

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
    <div className="mx-auto h-screen w-[100vw] flex flex-col p-20 items-center bg-gradient-to-r from-blue-400 to-indigo-500" >
    <div className='flex flex-col justify-center w-[90%] md:w-[70%] lg:w-[50%]  bg-slate-100 shadow-md rounded'>
    <div className="flex flex-col items-center justify-center h-20 space-x-4 bg-gradient-to-r from-blue-500 to-indigo-600">
      <h5 className="text-2xl text-white text-shadow font-medium lg:block">{t('edit property')}</h5>
    </div>
    <div className='p-6'>
        <AptForm formId="edit-apt-form" aptForm={aptForm} forNewApt={false} />
      </div>
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
