import AptForm from '../../components/AptComponents/AptForm'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { FC } from 'react'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'

const NewApt: FC = () => {
  const aptForm = {
    title: '',
    price: 0,
    short_description: '',
    sq_mt: 0,
    floor: 0,
    rooms: 0,
    lat: 0,
    long: 0,
  }

  const { t } = useTranslation('apts');

  return (


<div className="mx-auto h-screen w-[100vw] flex justify-center items-center bg-gradient-to-r from-blue-400 to-indigo-500" >
      <div className='flex flex-col justify-center w-[90%] md:w-[70%] lg:w-[50%]  bg-slate-100 shadow-md rounded'>
      <div className="flex flex-col items-center justify-center h-20 space-x-4 bg-gradient-to-r from-blue-500 to-indigo-600">
        <h5 className="text-2xl text-white text-shadow font-medium lg:block">{t('new property')}</h5>
      </div>
      <div className='p-6'>
          <AptForm formId="add-apt-form" aptForm={aptForm} />
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({locale}) => {
  
  return {
    props: {
      ...(await serverSideTranslations(locale!, [ 'common', 'apts'])),
      // Will be passed to the page component as props
    },
  }
}

export default NewApt
