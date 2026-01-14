import React from 'react'
import { useEffect } from 'react';
import { useHeader } from '../common/HeaderContext';

const ClientDashboard = () => {
    const { setTitle, setHeader } = useHeader()
    useEffect(() => {
        setTitle("DKN SYSTEM | Client");
        setHeader("Client Dashboard");
    }, [setTitle, setHeader]); 
    return (
        <div>
        Client Dashboard
        </div>
    )
}

export default ClientDashboard
