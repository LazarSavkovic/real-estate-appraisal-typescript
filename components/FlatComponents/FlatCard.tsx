import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'
import { FlatType } from 'utils/types'


// Define props
interface FlatCardProps {
    flat: FlatType,
    predicted?: boolean
  }

const FlatCard: FC<FlatCardProps> = ({ flat, predicted }: FlatCardProps) => {

    function numberWithCommas(x: number | undefined) {
        if (x){
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        
    }

    const {t} = useTranslation('flats')
    return (
        <div 
            className="max-w-lg bg-white rounded-lg border w-[100%] md:w-[80%] xl:w-3/4 border-gray-200 shadow-md m-5">
            {flat.image && <a href="#">
                <img className="rounded-t-lg" src={flat.image} alt={flat.title} />
            </a>}
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{flat.title}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{flat.location}</p>
                <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{numberWithCommas(flat.value)} <b className='bold normal'>€</b></span>
                    <Link href={`/flats/${predicted ? 'predicted/' : ''}${flat._id}`} legacyBehavior><a className="hover:scale-105 focus:scale-95 transition-all inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                        {t('more details')}
                        <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg></a></Link>
                </div>
            </div>
        </div>
    )
}


export default FlatCard