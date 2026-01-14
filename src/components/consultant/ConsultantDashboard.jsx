import React from 'react'
import { useEffect } from 'react';
import { useHeader } from '../common/HeaderContext';

const ConsultantDashboard = () => {
    const { setTitle, setHeader } = useHeader()
        useEffect(() => {
            setTitle("DKN SYSTEM | Client");
            setHeader("Consultant Dashboard");
        }, [setTitle, setHeader]); 
  return (
    <div>
      Consultrant Dashboard
    </div>
  )
}

export default ConsultantDashboard
