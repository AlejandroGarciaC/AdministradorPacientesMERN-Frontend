import React from 'react'
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState} from 'react';
import axios from 'axios';
import Alerta from '../components/Alerta.jsx';
import clienteAxios from '../config/axios.jsx';

const ConfirmarCuenta = () => {

  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});

  const params = useParams();

  const {id} = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${id}`
        const {data} = await clienteAxios.get(url)

        setCuentaConfirmada(true)
        setAlerta({
          msg: data.msg
        })
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        });
      }
      setCargando(false);
    }
    confirmarCuenta();
  }, []);


  return (
    <>
      <div className="mb-20">
            <h1 className="text-indigo-600 font-black text-6xl">Confirma tu cuenta y comienza a administrar tus <span className="text-black">Pacientes</span> </h1>
      </div>
      <div className="shadow-lg px-5 py-10 rounded-xl bg-white">
            {!cargando && <Alerta 
              alerta={alerta}
            />}

            {cuentaConfirmada && (
              <Link className="block text-center my-5 text-gray-500 " to="/">Iniciar Sesión</Link>
            )}
      </div>
    </>
  )
};

export default ConfirmarCuenta