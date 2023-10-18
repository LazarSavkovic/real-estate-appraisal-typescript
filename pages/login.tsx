import Head from 'next/head'
import AuthLayout from '../components/AuthLayout'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Form.module.css'
import { HiAtSymbol, HiFingerPrint } from 'react-icons/hi'
import { useState, FC } from 'react'
import { signIn } from 'next-auth/react'
import { useFormik } from 'formik'
import { loginValidate } from '../utils/validate'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { GetStaticProps } from 'next'

const Login: FC = () => {

    const {t} = useTranslation('login')
    
    const [show, setShow] = useState<boolean>(false)
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate: loginValidate,
        onSubmit
    });
    async function onSubmit(values: {email: string, password: string}) {
        const status = await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password,
            callbackUrl: '/'
        })

        if (status?.ok && status.url ) router.push(status.url)
    }

    async function handleGoogleSignIn() {
        signIn('google', { callbackUrl: 'http://localhost:3000/' })
    }

    return (
        <AuthLayout>
            <Head>
                <title>{t('log in')}</title>
            </Head>
            <section
                className='w-3/4 mx-auto flex flex-col gap-5'>
                <div className='title'>
                    <h1 className='text-gray-800 text-2xl font-bold py-2 tracking-wider'>{t('log in')}</h1></div>
                <form onSubmit={formik.handleSubmit} className='flex flex-col gap-5'>
                    <div>
                    <div className={styles.input_group}>
                        <input
                            type='email'
                            placeholder={t('email') as string}
                            className={styles.input_text}
                            {...formik.getFieldProps('email')} />
                        <span className='icon flex items-center px-4' >
                            <HiAtSymbol size={25} />
                        </span>
                    </div>
                    {formik.errors.email && formik.touched.email ? <span className='text-rose-500 text-xs m-0'>{t(formik.errors.email)}</span> : <></>}
                    </div>
                    <div>
                    <div className={styles.input_group}>
                        <input
                            type={show ? 'text' : 'password'}
                            placeholder={t('password') as string}
                            className={styles.input_text}
                            {...formik.getFieldProps('password')} />
                        <span className='icon flex items-center px-4' onClick={() => setShow(!show)}>
                            <HiFingerPrint size={25} />
                        </span>
                    </div>
                    {formik.errors.password && formik.touched.email ? <span className='text-rose-500  text-xs m-0'>{t(formik.errors.password)}</span> : <></>}
                    </div>
                    <button type='submit' className={styles.button}>
                    {t('log in')}
                    </button>
                    <button type='button' onClick={handleGoogleSignIn} className={styles.button_custom}>
                    {t('log in with google')}<Image src='/images/google.svg' alt='google.svg' width='20' height='20'></Image>
                    </button>
                    <button type='button' className={styles.button_custom}>
                    {t('log in with github')} <Image src='/images/github.svg'  alt='github.svg' width='25' height='25'></Image>
                    </button>
                </form>
                <p className='text-center text-gray-400'>
                {t('dont have account?')} <Link href='/register' legacyBehavior><a className='text-blue-700'>{t('register')}</a></Link>
                </p>
            </section>
        </AuthLayout >
    )
}



export const getStaticProps: GetStaticProps = async ({ locale }) => {
    if(locale){
        return {
            props: {
              ...(await serverSideTranslations(locale, ['login', 'common'])),
              // Will be passed to the page component as props
            },
          }
    } else {
        return {
            props: {}
          }
    }

  }
  
  

export default Login