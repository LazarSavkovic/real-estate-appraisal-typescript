import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { useState, FC } from 'react'
import { useSession, signOut } from 'next-auth/react'
import AuthLayout from '../components/AuthLayout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { GetStaticProps } from 'next'

const Guest: FC = () => {
  const { t } = useTranslation('index')
  return (
    <div className='container mx-auto text-center py-20'>
      <h3 className='text-3xl font-bold py-5'>
        <span className='text-3xl text-indigo-600 mr-1 pt-2'>
          {/* <ion-icon name="logo-ionic"></ion-icon> */}
        </span>
        {t("real estate appraisal")}
      </h3>
      <div className='flex justify-center'>
        <Link href='/flats/predict' legacyBehavior><a className='mt-5 px-10 py-3 w-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md text-gray-50'>{t("evaluate the property")}</a></Link>
      </div>
      <div className='flex justify-center'>
        <Link href='/login' legacyBehavior><a className='mt-5 px-10 py-3 w-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md text-gray-50'>{t("sign in")}</a></Link>
      </div>
    </div>
  )
}

const User: FC = ({ session, handleSignOut }) => {
  const { t } = useTranslation('index')
  return (
    <div className='container mx-auto text-center py-20'>
      <h3 className='text-3xl font-bold py-5'>
        <span className='text-3xl text-indigo-600 mr-1 pt-2'>
          {/* <ion-icon name="logo-ionic"></ion-icon> */}
        </span>
        {t("real estate appraisal")}
      </h3>
      <div className='details'>
        {<h5>{session.user.name}</h5> ||
          <h5>{session.user.email}</h5>}

        <img src={session.user.image} alt="" className="w-16 h-16 m-auto rounded-full object-cover lg:w-16 lg:h-16 inline" />
      </div>
      <div className='flex justify-center'>
        <Link href='/flats/new' legacyBehavior><a className='hover:scale-105 focus:scale-95 transition-all mt-5 px-10 py-3 w-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md text-gray-50'>{t("new property")}</a></Link>
      </div>
      <div className='flex justify-center'>
        <Link href='/flats' legacyBehavior><a className='hover:scale-105 focus:scale-95 transition-all mt-5 px-10 py-3 w-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md text-gray-50'>{t("my properties")}</a></Link>
      </div>
    </div>
  )
}


const Home: FC = () => {

  const { data: session } = useSession();

  function handleSignOut() {
    signOut()
  }

  return (
    <AuthLayout>
      <div className={styles.container}>
        {session ? User({ session, handleSignOut }) : Guest()}
      </div>
    </AuthLayout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['index', 'common'])),
      // Will be passed to the page component as props
    },
  }
}


export default Home
