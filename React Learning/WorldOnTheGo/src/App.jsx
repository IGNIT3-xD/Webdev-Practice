import './App.css'
import Countries from './Component/Countries'
import { Suspense } from 'react';

const countriesPromise = fetch('https://openapi.programming-hero.com/api/all')
  .then(res => res.json())

function App() {
  return (
    <>
      <Suspense fallback={<h1 className='text-center font-medium text-3xl'>Loading....</h1>}>
        <Countries countriesPromise={countriesPromise}></Countries>
      </Suspense>
    </>
  )
}

export default App
