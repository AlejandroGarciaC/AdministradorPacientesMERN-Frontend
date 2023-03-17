import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Header from '../components/Header'
import Footer from '../components/Footer'

const RutaProtegida = () => {
    const {auth, cargando} = useAuth();
    const navigate = useNavigate()
    if (cargando) return 'cargando'
  return (
    <>
        <Header/>
            {auth.veterinario?._id ? (
                <main className='container mx-auto mt-10'>
                    <Outlet /> 
                </main>)  : navigate('/')}
        <Footer/>
    </>
  )
}

export default RutaProtegida