import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AuthLayout from './layout/AuthLayout.jsx';
import RutaProtegida from './layout/RutaProtegida.jsx';
import Login from './paginas/Login.jsx';
import Registrar from './paginas/Registrar.jsx';
import ConfirmarCuenta from './paginas/ConfirmarCuenta.jsx';
import OlvidePassword from './paginas/OlvidePassword.jsx';
import NuevoPassword from './paginas/NuevoPassword.jsx';
import { AuthProvider } from './context/AuthProvider.jsx';
import { PacientesProvider } from './context/PacientesProvider.jsx';
import AdministrarPacientes from './paginas/AdministrarPacientes.jsx';
import EditarPerfil from './paginas/EditarPerfil.jsx';
import CambiarPassword from './paginas/CambiarPassword.jsx';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path='/' element={<AuthLayout/>}>
              <Route index element={ <Login /> }/>
              <Route path='registrar' element={ <Registrar /> }/>
              <Route path='olvide-password' element={ <OlvidePassword /> }/>
              <Route path='olvide-password/:token' element={ <NuevoPassword /> }/>
              <Route path='confirmar/:id' element={ <ConfirmarCuenta /> }/>
            </Route>
            
            <Route path='/admin' element={ <RutaProtegida />}>
              <Route index element={<AdministrarPacientes />} />
              <Route path='perfil' element={<EditarPerfil/>}/>
              <Route path='cambiar-password' element={<CambiarPassword/>}/>
            </Route>

          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>

  )
}

export default App
