import { useEffect, useState } from 'react';

const useData = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)

        fetch('/Data.json')
            .then(res => res.json())
            .then(json => setData(json))
            .catch(err => console.log("Error", err))
            .finally(() => setLoading(false))
    }, [])

    return { data, loading }
}

export default useData;