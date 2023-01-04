import AptCard from '../../components/AptComponents/AptCard'
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import { paginate } from "../../lib/paginate";
import { motion } from 'framer-motion'
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getApts } from '../../lib/ApiCalls';
import { useTranslation } from 'next-i18next';


const Index = () => {

  const {t} = useTranslation('apts')

  const [posts, setPosts] = useState([]);
  const { isLoading, isError, error } = useQuery('apts', getApts, {onSuccess: setPosts})

  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedPosts = paginate(posts, currentPage, pageSize);


  if (isLoading) {
    return <div>Učitava se</div>
  }

  if (isError) {
    return <div>{error}</div>
  }



  return (

    <div className="flex bg-blue-400 min-h-screen">
      <div className="m-auto bg-slate-50 rounded-md w-3/5 mt-24 pt-16  flex justify-center flex-col min-h-screen">
        <h1 className="text-3xl text-center tracking-wider">
         {t('properties in belgrade')}
        </h1>
        {paginatedPosts && <>
          <motion.div className='grid lg:grid-cols-2 m-auto pt-10 justify-center'
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}>


            {paginatedPosts.map((apt) => (
              <AptCard key={apt._id} apt={apt} />
            ))}

          </motion.div>

          <Pagination
            items={posts.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
          }

      </div>
    </div>

  )
}

export async function getServerSideProps({locale}) {

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery('apts', getApts)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale, [ 'common', 'apts'])),
      // Will be passed to the page component as props
    },
  }
}

export default Index
