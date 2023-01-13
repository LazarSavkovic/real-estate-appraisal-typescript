import { FC, useState, useEffect } from "react"
import { useQuery, UseQueryResult } from 'react-query';
import { getApts } from '../utils/ApiCalls';
import { AptType } from "utils/types";

const Trial: FC = () => {

    const [posts, setPosts] = useState<AptType[]>([]);
    const {data,  isLoading, isError, error }: UseQueryResult<AptType[], Error> = useQuery<AptType[], Error, AptType[], string>('apts', getApts, {onSuccess: setPosts})
  
    useEffect(() => {
        console.log("gahahahahahh")
        console.log(posts)
    }, [posts])


    if(isLoading) {
        return (
            <h1 className="text-4xl mt-32">loading</h1>
        )
    }

    if(isError){
        <h1>{error.message}</h1>
    }

    return (
        <>
        {posts.map(post => {
            return <h2 key={post._id?.toString()}>{post.price}</h2>
        })}
        {/* <h1 className="text-4xl mt-32">Trial</h1> */}
        </>
    )
}


export default Trial