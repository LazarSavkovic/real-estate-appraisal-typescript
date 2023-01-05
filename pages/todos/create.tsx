import { useRouter } from "next/router"
import { FormEvent, FormEventHandler, useRef, FC } from "react"
import { TodoType } from "../../utils/types"
import { GetStaticProps } from 'next'

// Define props
interface CreateProps {
  url: string
}

// Define Component
const Create: FC<CreateProps> = (props: CreateProps) => {
  // get the next route
  const router = useRouter()

  // since there is just one input we will use a uncontrolled form
  const item = useRef<HTMLInputElement>(null)

  // Function to create new todo
  const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault()

    // construct new todo, create variable, check it item.current is not null to pass type checks
    let todo: TodoType = { item: "", completed: false }
    if (null !== item.current) {
      todo = { item: item.current.value, completed: false }
    }

    // Make the API request
    await fetch(props.url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    })

    // after api request, push back to main page
    router.push("/todos")
  }

  return (
    <div>
      <h1>Create a New Todo</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={item}></input>
        <input type="submit" value="create todo"></input>
      </form>
    </div>
  )
}

// export getStaticProps to provie API_URL to component
export const getStaticProps: GetStaticProps = async (context: any) => {
  return {
    props: {
      url: process.env.API_URL,
    },
  }
}

// export component
export default Create