import React, { useState } from 'react'
import LoadingPage from './LoadingPage'

const NoPageFound = () => {
    const [loading, setLoading] = useState(true)

    setTimeout(() => {
        setLoading(false)
    },5000)

    return (
        <>
        {(loading) ? 
            <LoadingPage />
        :   <h5>Page does not exists. </h5>
        }
            
        </>
    )
}

export default NoPageFound