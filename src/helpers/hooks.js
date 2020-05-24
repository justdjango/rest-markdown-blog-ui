import {useState, useEffect} from "react";
import axios from "axios";

function useFetch(url, initialState=null) {
    const [data, setData] = useState(initialState)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const res = await axios.get(url);
                setData(res.data)
                setLoading(false)
            } catch (error) {
                setError(error.message)
                setLoading(false)
            }
        }
        fetchData();
    }, [])

    return {
        data,
        loading,
        error
    }
}

export {useFetch}