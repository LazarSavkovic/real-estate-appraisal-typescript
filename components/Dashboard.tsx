import Link from 'next/link'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'
import styles from '../styles/Dashboard.module.css'
import { useEffect, useState, FC, ReactNode } from 'react'
import { useTranslation } from 'next-i18next'
import { Session } from 'next-auth'

interface DashboardProps {
    children: ReactNode,
    session: Session,
    setSearchInput: Function,
    searchInput: string
}

const Dashboard: FC<DashboardProps> = ({ children, session, setSearchInput, searchInput }: DashboardProps ) => {

    const {t} = useTranslation('dashboard');

    let [open, setOpen] = useState(false);
    let [flat, setFlat] = useState(false);

    const router = useRouter();

    function handleSignOut() {
        signOut()
    }

    const handleInputChange = (e) => {
        setSearchInput(e.target.value)
    }

    const getPlace = () => {
        switch (router.pathname) {
            case '/flats':
                return t('properties');
            case '/flats/new':
                return t('new property');
            case '/flats/maps':
                return t('map of properties');
            default:
                return '';
        }
    }


    const variants = {
        open: { opacity: 1, y: 0 },
        closed: { opacity: 0, y: "-100%" },
      }    

    return (
        <>
            <aside 
       className={`fixed bg-blue-400 z-10 top-14 pb-3 px-6 w-full flex flex-col h-screen border-r bg-white transition-all duration-300 w-6/12  sm:w-5/12 md:w-4/12  lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%] ${open ? '' : 'ml-[-100%] '}`}>
                <div >
                    <div className="mt-16 text-center">
                        <img src={session.user.image} alt="" className="w-10 h-10 m-auto rounded-full object-cover lg:w-24 lg:h-24" />
                        <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{session.user.name}</h5>
                        <h5 className="hidden my-2 text-sm text-gray-600 lg:block">{session.user.email}</h5>
                        <span className="hidden text-gray-400 lg:block">{t('guest')}</span>
                    </div>
                    <div onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-10 cursor-pointer lg:hidden'>
                        <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
                    </div>

                    <ul className="space-y-2 tracking-wide mt-8">
                        <li>
                            <Link legacyBehavior href="/flats" >
                                <a aria-label="dashboard" className={router.pathname === '/flats' ? styles.active_dashboard_btn : styles.inactive_dashboard_btn}>
                                    <svg className="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
                                        <path d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z" className="fill-current text-cyan-400 dark:fill-slate-600"></path>
                                        <path d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z" className="fill-current text-cyan-200 group-hover:text-cyan-300"></path>
                                        <path d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z" className="fill-current group-hover:text-sky-300"></path>
                                    </svg>
                                    <span className="-mr-1 font-medium">{t('properties')}</span>
                                </a></Link>
                        </li>
                        <li>
                            <Link legacyBehavior href="/flats/new" >
                                <a className={router.pathname === '/flats/new' ? styles.active_dashboard_btn : styles.inactive_dashboard_btn}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path className="fill-current text-gray-300 group-hover:text-cyan-300" fillRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clipRule="evenodd" />
                                        <path className="fill-current text-gray-600 group-hover:text-cyan-600" d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
                                    </svg>
                                    <span className="group-hover:text-gray-700">{t('new property')}</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link legacyBehavior href="/flats/maps" >
                                <a href="#" className={router.pathname === '/flats/maps' ? styles.active_dashboard_btn : styles.inactive_dashboard_btn}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path className="fill-current text-gray-600 group-hover:text-cyan-600" d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                                        <path className="fill-current text-gray-300 group-hover:text-cyan-300" d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                                    </svg>
                                    <span className="group-hover:text-gray-700">{t('map of properties')}</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link legacyBehavior href="/apts" >
                                <a href="#" className={router.pathname === '/apts' ? styles.active_dashboard_btn : styles.inactive_dashboard_btn}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path className="fill-current text-gray-600 group-hover:text-cyan-600" fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                                        <path className="fill-current text-gray-300 group-hover:text-cyan-300" d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                                    </svg>
                                    <span className="group-hover:text-gray-700">{t('market')}</span>
                                </a>
                            </Link>
                        </li>

                    </ul>
                </div>

                <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
                    <button onClick={handleSignOut} className="hover:scale-105 focus:scale-95 transition-all px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className="group-hover:text-gray-700">{t('sign out')}</span>
                    </button>
                </div>
            </aside>
            <div className="lg:ml-auto mb-6 lg:w-[68%] xl:w-[74%] 2xl:w-[81%]">
                <div className="sticky z-5 top-0 h-16 border-b bg-white lg:py-2.5">
                    <div className="pl-6 flex items-center justify-between space-x-4 2xl:container">
                        <h5 hidden className="text-2xl text-gray-600 font-medium lg:block">{getPlace()}</h5>
                        <button onClick={() => setOpen(!open)} className="w-12 h-16 -mr-2 border-r lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        {(router.pathname === '/flats') && <div className="flex grow justify-end space-x-4">
                            {/* search bar  */}
                            <div hidden className="md:block grow">
                                <div className="relative flex items-center text-gray-400 focus-within:text-cyan-400 ">
                                    <span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                                        <svg xmlns="http://ww50w3.org/2000/svg" className="w-4 fill-current" viewBox="0 0 35.997 36.004">
                                            <path id="Icon_awesome-search" data-name="search" d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"></path>
                                        </svg>
                                    </span>
                                    <input onChange={handleInputChange} value={searchInput} type="search" name="leadingIcon" id="leadingIcon" placeholder={t('type property here')} className="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-cyan-300 transition" />
                                </div>
                            </div>
                            {/* /search bar  */}
                            <button aria-label="search" className="w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200 md:hidden">
                                <svg xmlns="http://ww50w3.org/2000/svg" className="w-4 mx-auto fill-current text-gray-600" viewBox="0 0 35.997 36.004">
                                    <path id="Icon_awesome-search" data-name="search" d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"></path>
                                </svg>
                            </button>
                            <button aria-label="chat" className="w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 m-auto text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                </svg>
                            </button>
                            <button onClick={() => setFlat(!open)} aria-label="notification" className="w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 m-auto text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                                </svg>
                            </button>
                        </div>}
                    </div>
                </div>

                <div className="px-6 pt-6 2xl:container">
                    {children}

                </div>
            </div>
        </>
    )

}

export default Dashboard