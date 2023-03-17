import { createContext , useEffect, useState} from "react";
import clienteAxios from "../config/axios";
import Swal from 'sweetalert2';
import useAuth from "../hooks/useAuth";

const PacientesContext = createContext()

const PacientesProvider = ({children}) => {

    
    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});
    const { auth } = useAuth();

    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token) return;

                const config = {
                    headers: {
                        'Content-Type': "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await clienteAxios('/pacientes', config)
                setPacientes(data);
            } catch (error) {
                console.log(error);
            }
        }

        obtenerPacientes()
    },[auth])

    const guardarPaciente = async (paciente) => {

        const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        'Content-Type': "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

        if (paciente.id) {
            try {
                const {data} = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config);

                const pacientesActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)
                setPacientes(pacientesActualizado);
            } catch (error) {
                
            }
        }else{
            
            try {
                
                const {data} = await clienteAxios.post('/pacientes', paciente, config)
                const {createAt, updateAt, __v, ...pacienteAlmacenado} = data

                setPacientes([pacienteAlmacenado, ...pacientes]);
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }

        
    }

    const setEdicion = paciente => {
        setPaciente(paciente);
    }

    const eliminarPaciente = async id => {
        Swal.fire({
            title: 'Estas seguro que quieres eliminar?',
            text: "Se eliminara permanentemente!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
          }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    const token = localStorage.getItem('token');
                    const config = {
                        headers: {
                            'Content-Type': "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    }

                    const {data} = await clienteAxios.delete(`/pacientes/${id}`, config);
                    const pacientesActualizado = pacientes.filter(pacientesState => pacientesState._id !== id);
                    setPacientes(pacientesActualizado);
                } catch (error) {
                    console.log(error);
                }


              Swal.fire(
                'Eliminado!',
                'El registro ha sido eliminado.',
                'success'
              )
            }
          })
    }


    return(
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}
export {PacientesProvider}
export default PacientesContext

