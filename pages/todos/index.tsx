import { TodoType } from "../../utils/types"
import Link from "next/link"
import { FC } from 'react'
import { GetServerSideProps } from 'next'

// Define the components props
interface IndexProps {
  todos: Array<TodoType>
}

// define the page component
const Index: FC<IndexProps> = (props: IndexProps) => {
  const { todos } = props

  return (
    <div>
      <h1>My Todo List</h1>
      <h2>Click On Todo to see it individually</h2>
      <Link href="/todos/create"><button>Create a New Todo</button></Link>
      {/* MAPPING OVER THE TODOS */}
      {todos.map(t => (
        <div key={t._id}>
          <Link href={`/todos/${t._id}`}>
            <h3 style={{ cursor: "pointer" }}>
              {t.item} - {t.completed ? "completed" : "incomplete"}
            </h3>
          </Link>
        </div>
      ))}
    </div>
  )
}

// GET PROPS FOR SERVER SIDE RENDERING
export const getServerSideProps: GetServerSideProps = async () => {
  // get todo data from API
  const res = await fetch(process.env.API_URL as string)
  const todos = await res.json()

  // return props
  return {
    props: { todos },
  }
}

export default Index