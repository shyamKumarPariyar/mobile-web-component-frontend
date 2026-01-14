import React from 'react'
import { useEffect } from 'react';
import { useHeader } from '../common/HeaderContext';

const ExternalDashboard = () => {
    const { setTitle, setHeader } = useHeader()
        useEffect(() => {
            setTitle("DKN SYSTEM | Client");
            setHeader("External Dashboard");
        }, [setTitle, setHeader]); 
    return (
        <div>
        External Dashboard
        </div>
    )
}

export default ExternalDashboard
