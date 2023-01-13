import Link from 'next/link'
import Button from '../Button'
import AptMaps from './AptMaps'
import { useTranslation } from 'next-i18next'
import { FC, MouseEventHandler } from 'react'
import { AptType } from 'utils/types'


// Define props
interface AptBigCardProps {
    apt: AptType,
    handleDelete: MouseEventHandler
  }
  

const AptBigCard: FC<AptBigCardProps> = ({ apt, handleDelete }: AptBigCardProps) => {

    const {t} = useTranslation('apts')

    return (
        <div className="max-w-lg bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 m-5">
            <a href="#">
                <img className="rounded-t-lg" src={apt.image} alt={apt.title} />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{apt.title}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{t('short description')}: {apt.short_description}</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{t('area')}: {apt.sq_mt} m<sup>2</sup></p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{t('rooms')}: {apt.rooms}</p>
                <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{apt.price} €</span>
                </div>
                <div className="flex justify-between items-center rounded-lg">
                    <AptMaps latitude={apt.lat} longitude={apt.long} />
                </div>

                <div className='flex gap-5 mt-4'>
                    <Link href="/apts/[id]/edit" as={`/apts/${apt._id}/edit`} legacyBehavior><a className="button grow">{t('edit')}</a></Link>
                    <button onClick={handleDelete} className='button grow'>
                    {t('delete')}
                    </button>
                </div>
            </div>
        </div>
    )
}


export default AptBigCard