import React, { use, useState } from 'react';

const Countries = ({ countriesPromise }) => {
    const countriesData = use(countriesPromise)
    const countries = countriesData.countries;

    const [visitedCountries, setVisitedCountries] = useState([]);

    const handleVisitedCountries = (country) => {
        // const newVisitedCountries = [...visitedCountries, country]
        // setVisitedCountries(newVisitedCountries)

        // setVisitedCountries((prev) => [...prev, country])

        setVisitedCountries((prev) => {
            if (prev.find(c => c.name.common === country.name.common)) {
                return prev.filter((c) => c.name.common !== country.name.common)
            }

            else {
                return [...prev, country]
            }
        })
    }

    return (
        <div className='grid grid-cols-3 items-center justify-center gap-10' >
            <div className='col-span-3 space-y-4'>
                <h1 className='text-xl font-bold'>Visited Countries: {visitedCountries.length}</h1>
                <ol className='list-decimal space-y-3'>
                    {
                        visitedCountries.map((country, i) => <li key={i} className='text-xl'>{country.name.common}</li>)
                    }
                </ol>
            </div>

            {
                countries.map((country) => <Country
                    key={country.ccn3.ccn3}
                    country={country}
                    handleVisitedCountries={handleVisitedCountries}
                ></Country>)
            }
        </div>
    );
};

const Country = ({ country, handleVisitedCountries }) => {
    // console.log(country);

    const [visited, setVisited] = useState(false);

    const handleVisited = () => {
        setVisited(!visited)
        handleVisitedCountries(country)
    }

    return (
        <div className={`text-center space-y-3 border p-4 rounded-xl hover:bg-cyan-400/10 transition duration-200
         ${visited && 'bg-cyan-400/20'}`}>
            <img className='w-44 mx-auto' src={country.flags.flags.svg} alt={country.flags.flags.alt} />
            <h3 className='font-bold text-xl'>{country.name.common}</h3>
            <p className='font-medium text-xl'>Capital: {country.capital.capital}</p>
            <p className='font-medium'>Continents: {country.continents.continents}</p>
            <p className='font-medium'>Population: {country.population.population}</p>
            <button onClick={handleVisited}>{visited ? "Visited" : "Not Visited"}</button>
        </div>
    )
}

export default Countries;