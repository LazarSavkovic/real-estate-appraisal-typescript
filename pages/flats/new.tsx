import FlatForm from '../../components/FlatComponents/FlatForm'
import { getSession } from 'next-auth/react'
import Dashboard from '../../components/Dashboard'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { FC } from 'react'
import { GetServerSideProps } from 'next'
import { Session } from 'next-auth'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'

interface NewFlatProps {
  userId: string,
  session: Session
}

const NewFlat: FC<NewFlatProps> = ({ userId, session }: NewFlatProps) => {
  const flatForm = {
    title: '',
    location: '',
    price: 0,
    short_description: '',
    sq_mt: 0,
    floor: 0,
    rooms: 0,
    lat: 0,
    long: 0,
  }

  const { t } = useTranslation('flats');


  return (
    <>
    <Head>
           <title>{t('new property')}</title>
       </Head>
        <Dashboard session={session} >
          <div className='flex items-center justify-center pt-8'>
            <FlatForm formId="add-flat-form" flatForm={flatForm} userId={userId} />
          </div>
        </Dashboard>
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

  const userId = session.user._id;


  return {
    props: {
      session: session,
      userId: userId,
      ...(await serverSideTranslations(locale!, ['flats', 'flatForm', 'dashboard', 'common'])),
      // Will be passed to the page component as props
    }
  }
}


export default NewFlat
