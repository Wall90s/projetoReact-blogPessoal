import './App.css'
import Home from './paginas/home/Home';
import Navbar from './components/estaticos/Navbar/Navbar';
import Footer from './components/estaticos/Footer/Footer';
import Login from './paginas/login/Login';
import CadastroUsuario from './paginas/cadastroUsuario/CadastroUsuario';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListaTemas from './components/temas/listaTemas/ListaTemas';
import ListaPostagem from './components/postagens/listaPostagens/ListaPostagem';

function App() {
  return (
    <BrowserRouter >
      <Navbar />
      <div style={{ minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
          <Route path='/temas' element={<ListaTemas/>}></Route>
          <Route path='/posts' element={<ListaPostagem/>}></Route>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter >
  )
}

export default App