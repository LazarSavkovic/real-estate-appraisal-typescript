import AptCard from '../../components/AptComponents/AptCard'
import { useEffect, useState, FC } from "react";
import Pagination from "../../components/Pagination";
import { paginate } from "../../utils/paginate";
import { dehydrate, QueryClient, useQuery, UseQueryResult } from 'react-query';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getApts } from '../../utils/ApiCalls';
import { useTranslation } from 'next-i18next';
import { GetServerSideProps } from 'next'
import { AptType } from 'utils/types';


const Index: FC = () => {

  const { t } = useTranslation('apts')

  const [posts, setPosts] = useState<AptType[]>([]);

  const { isLoading, isError, error }: UseQueryResult<AptType[], Error> = useQuery<AptType[], Error, AptType[], string>('apts', () => getApts(100), { onSuccess: setPosts })

  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const paginatedPosts: AptType[] = paginate(posts, currentPage, pageSize);

  useEffect(() => {
    console.log('here')
    console.log(posts, isLoading, isError)
  }, [posts, isLoading, isError]
  )

  if (isLoading) {
    return <div>Učitava se</div>
  }

  if (isError) {
    return <div>{error.message}</div>
  }

  return (

    <div className="mx-auto min-h-screen w-[100vw] flex flex-col pt-24 items-center bg-gradient-to-r from-blue-400 to-indigo-500" >
      <div className='flex flex-col justify-center w-[90%] md:w-[75%] lg:w-[60%]  bg-slate-100 shadow-md rounded'>
        <div className="flex flex-col items-center justify-center h-20 space-x-4 bg-gradient-to-r from-blue-500 to-indigo-600">
          <h5 className="text-2xl text-white text-shadow font-medium lg:block">{t('properties in belgrade')}</h5>
        </div>
        <div className='p-6 flex justify-center flex-col'>
          {paginatedPosts && <>
            <div className='grid lg:grid-cols-2 m-auto pt-10 justify-center'>
              {paginatedPosts.map((apt) => (
                <AptCard key={apt._id?.toString()} apt={apt} />
              ))}

            </div>

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
    </div>

  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {

  const queryClient = new QueryClient()
  console.log(locale)

  await queryClient.prefetchQuery('apts', () => getApts(100))

  if (locale) {
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        ...(await serverSideTranslations(locale, ['common', 'apts'])),
        // Will be passed to the page component as props
      },
    }
  } else {
    return {
      props: {}
    }
  }
}

export default Index
