import React, { useState, FC, useEffect } from 'react'
import Button from './Button';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useSession, signOut } from 'next-auth/react'
import { useTranslation } from 'next-i18next'



const Nav: FC = () => {
    const { t } = useTranslation('common');
    let Links = [
        { name: t('my properties'), link: "/flats" },
        { name: t('market'), link: "/apts" },
        { name: t('contact us'), link: "/" },
    ];
    let [open, setOpen] = useState(false);

    const { data: session } = useSession();
    function handleSignOut() {
        signOut()
    }
    const router = useRouter();
    const { locale, locales } = router;
    console.log(locale, locales)
    const oppositeLocale = locales!.filter((loc => loc !== locale))[0]

    const handleLanguageChange = () => {
        router.push(router.asPath, undefined, { locale: oppositeLocale })
    }

    function goToLogin() {
        router.push('/login')
    }
    function goToRegister() {
        router.push('/register')
    }

    const pathname: string = router.pathname;

    useEffect(() => {
        setOpen(false); // Close the navigation panel
    }, [pathname]);

    const genericHamburgerLine = `h-1 w-7  rounded-full bg-black transition ease transform duration-300`;

    return (
        <div
            className='shadow-md w-full fixed top-0 left-0 z-50  '>
            <div className='md:flex items-center justify-between bg-white py-4 h-14 md:px-10 px-7'>
                <Link href='/' legacyBehavior><a className='font-bold text-l cursor-pointer flex items-center text-gray-800'>
                    {/* <span className='text-2xl text-indigo-600 mr-1'>
             
                    </span> */}
                    PROCENA/NEKRETNINE</a>
                </Link>

                <div onClick={() => setOpen(!open)} className='text-2xl absolute right-8 top-1/2 transform -translate-y-1/2 cursor-pointer lg:hidden'>


                    <button
                        className="flex flex-col h-12 w-12 justify-center items-center group">
                        <div className={`${genericHamburgerLine}  ${open
                                    ? "my-1 rotate-45 translate-y-3 opacity-60 group-hover:opacity-100"
                                    : "my-0.5 opacity-60 group-hover:opacity-100"
                                }`} />
                        <div className={`${genericHamburgerLine} ${open ? "opacity-0 my-1" : "my-0.5 opacity-60 group-hover:opacity-100" }`} />
                        <div className={`${genericHamburgerLine} ${open
                                    ? "my-1 -rotate-45 -translate-y-3 opacity-60 group-hover:opacity-100"
                                    : "my-0.5 opacity-60 group-hover:opacity-100"
                                }`} />
                    </button>
                </div>

                <ul className={`lg:flex lg:items-center rounded shadow-md lg:shadow-none lg:pb-0 pb-10 absolute text-sm lg:static bg-white lg:bg-transparent lg:z-auto z-[-1] right-0 w-56 lg:w-auto lg:pl-0 pl-10 transition-all lg:opacity-100 duration-500  ease-in ${open ? 'top-14 opacity-100' : 'top-[-490px] opacity-0'}`}>
                    {
                        Links.map((link) => (
                            <li key={link.name} className='hover:scale-105 focus:scale-95 transition-all lg:ml-8 lg:my-0 my-6'>
                                <Link href={link.link} legacyBehavior><a className='text-gray-800 hover:text-gray-400 duration-500'>{link.name}</a></Link>
                            </li>
                        ))
                    }{session ?
                        <li className='lg:ml-8 lg:my-0 my-6 pr-10 lg:p-0'>
                            <Button function={handleSignOut}>{t('log out')}</Button>
                        </li> :
                        <><li className='lg:ml-8 lg:my-0 my-6 pr-10 lg:p-0'>
                            <Button function={goToLogin}>{t('log in')}</Button>
                        </li>
                            <li className='lg:ml-8 lg:my-0 my-6 pr-10 lg:pr-0'>
                                <Button function={goToRegister}>{t('register')}</Button>
                            </li>
                        </>}
                    <button className='border-t lg:border-t-0 lg:border-l pt-2 lg:pt-0 lg:ml-3 lg:pl-4 flex justify-center items-center gap-1' onClick={handleLanguageChange}>
                        {oppositeLocale}
                        {(oppositeLocale === 'sr') && <img style={{ width: '20px' }} src="/icons/serbia-flag-icon.svg" alt="An SVG of an eye" />}
                        {(oppositeLocale === 'en') && <img style={{ width: '20px' }} src="/icons/united-kingdom-flag-icon.svg" alt="An SVG of an eye" />}
                    </button>

                </ul>
            </div>
        </div>
    )
}

export default Nav