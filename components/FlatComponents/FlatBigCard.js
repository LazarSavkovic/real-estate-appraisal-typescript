import Link from 'next/link'
import FlatMaps from './FlatMaps'
import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'

const FlatBigCard = ({ flat, handleDelete, apts }) => {

    const {t} = useTranslation('flats')
    return (

        <motion.div initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col  bg-white border rounded-lg shadow-md md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 w-full m-0">
            <div className="flex justify-between items-center md:w-2/4">
                <FlatMaps latitude={flat.geometry.coordinates[1]} longitude={flat.geometry.coordinates[0]} apts={apts}/>
            </div>
            <div className="flex flex-col justify-between px-4 leading-normal md:w-2/4  py-10">
                <div>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-800 dark:text-white">{flat.title}</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{t('address')}: {flat.location}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{t('short description')}: {flat.short_description}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{t('area')}: {flat.sq_mt} m<sup>2</sup></p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{t('rooms')}: {flat.rooms}</p>
                    <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-gray-800 dark:text-white">{flat.value} €</span>

                    </div></div>
                <div className='flex items-center gap-5'>
                    <Link href="/flats/[id]/edit" as={`/flats/${flat._id}/edit`} legacyBehavior><a className="button grow">{t('edit')}</a></Link>
                    <button onClick={handleDelete} className='button grow'>
                    {t('delete')}
                    </button>
                </div>
            </div>
        </motion.div>
    )
}


export default FlatBigCard