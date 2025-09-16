import { Suspense } from 'react'
import './App.css'
import Fetch from './Fetch'
import AsyncAwait from './AsyncAwait'

// Api to json convertion/Api call
const fetchUser = fetch('https://jsonplaceholder.typicode.com/users')
  .then(res => res.json())

const fetchPosts = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  return res.json()
}

function App() {

  const postsPromise = fetchPosts()

  return (
    <>
      <Suspense fallback={<h3>Loading....</h3>}>
        <Fetch fetchUser={fetchUser}></Fetch>
        {/* Pass the props to the component */}
      </Suspense>

      <Suspense fallback={<h3>Loading....</h3>}>
        <AsyncAwait postsPromise={postsPromise}></AsyncAwait>
      </Suspense>
    </>
  )
}

export default App
