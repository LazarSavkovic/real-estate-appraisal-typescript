import Head from 'next/head'
import AuthLayout from '../components/AuthLayout'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Form.module.css'
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from 'react-icons/hi'
import { useState, FC } from 'react'
import { useFormik } from 'formik'
import { registerValidate } from '../utils/validate'
import { useRouter } from 'next/router'
// import { motion } from 'framer-motion'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

const Register: FC = () => {

    const {t} = useTranslation('register')

    const [show, setShow] = useState({ password: false, cpassword: false });
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            cpassword: ''
        },
        validate: registerValidate,
        onSubmit
    })

    async function onSubmit(values) {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        }
        await fetch('http://localhost:3000/api/auth/signup', options)
            .then(res => res.json())
            .then((data) => {
                if (data) router.push('/')
            })

    }

    return (
        <AuthLayout>
            <Head>
                <title>{t('register')}</title>
            </Head>
            <section
                // initial={{ opacity: 0, scale: 0.7 }}
                // animate={{ opacity: 1, scale: 1 }}
                // exit={{ opacity: 0, scale: 0.7 }}
                // transition={{
                //     duration: 0.5,
                //     delay: 0.3,
                //     ease: [0, 0.71, 0.2, 1.01]
                // }}
                className='w-3/4 mx-auto flex flex-col gap-5'>
                <div className='title'>
                    <h1 className='text-gray-800 text-2xl font-bold py-2 tracking-wider'>{t('register')}</h1>
                </div>
                <form onSubmit={formik.handleSubmit} className='flex flex-col gap-5'>
                    <div className={styles.input_group}>
                        <input
                            type='text'
                            name='username'
                            placeholder={t('username')}
                            className={styles.input_text}
                            {...formik.getFieldProps('username')} />
                        <span className='icon flex items-center px-4' >
                            <HiOutlineUser size={25} />
                        </span>
                    </div>
                    {formik.errors.username && formik.touched.username ? <span className='text-rose-500'>{t(formik.errors.username)}</span> : <></>}
                    <div className={styles.input_group}>
                        <input
                            type='email'
                            name='email'
                            placeholder={t('email')}
                            className={styles.input_text}
                            {...formik.getFieldProps('email')} />
                        <span className='icon flex items-center px-4' >
                            <HiAtSymbol size={25} />
                        </span>
                    </div>
                    {formik.errors.email && formik.touched.email ? <span className='text-rose-500'>{t(formik.errors.email)}</span> : <></>}
                    <div className={styles.input_group}>
                        <input
                            type={show.password ? 'text' : 'password'}
                            name='password'
                            placeholder={t('password')}
                            className={styles.input_text}
                            {...formik.getFieldProps('password')} />
                        <span className='icon flex items-center px-4' onClick={() => setShow({ ...show, password: !show.password })}>
                            <HiFingerPrint size={25} />
                        </span>
                    </div>
                    {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{t(formik.errors.password)}</span> : <></>}
                    <div className={styles.input_group}>
                        <input
                            type={show.cpassword ? 'text' : 'password'}
                            name='cpassword'
                            placeholder={t('confirm password')}
                            className={styles.input_text}
                            {...formik.getFieldProps('cpassword')} />
                        <span className='icon flex items-center px-4' onClick={() => setShow({ ...show, cpassword: !show.cpassword })}>
                            <HiFingerPrint size={25} />
                        </span>
                    </div>
                    {formik.errors.cpassword && formik.touched.cpassword ? <span className='text-rose-500'>{t(formik.errors.cpassword)}</span> : <></>}
                    <div className={styles.button}>
                        <button type='submit'>
                            {t('register')}
                        </button>
                    </div>
                </form>
                <p className='text-center text-gray-400'>
                    {t('have account?')}<Link href='/login' legacyBehavior><a className='text-blue-700'>{t('log in')}</a></Link>
                </p>
            </section>
        </AuthLayout>
    )
}


export async function getStaticProps({ locale }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['register', 'common'])),
        // Will be passed to the page component as props
      },
    }
  }
  

export default Register