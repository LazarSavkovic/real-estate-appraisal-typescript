import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'

const AptCard: FC = ({ apt }) => {
    const {t} = useTranslation('apts')

    return (
        <div className="mb-10 w-[80%] md:w-[60%] lg:w-[80%] justify-self-center bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 ">
            {apt.image && <a href="#">
            <img className="rounded-t-lg" src={apt.image} alt={apt.title} style={{width: '100%', height: '200px'}} />
        </a>}

        <div className="p-5">
            <a href="#">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-800 dark:text-white">{apt.title}</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{apt.short_description}</p>
            <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-gray-800 dark:text-white">{apt.price} €</span>
            <Link href={`/apts/${apt._id}`} legacyBehavior><a  className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
               {t('more details')}
                <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg></a></Link>
            </div>
        </div>
    </div>
    )
}


export default AptCard