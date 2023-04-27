import Home from './paginas/home/Home'
import Navbar from './components/estaticos/Navbar/Navbar'
import Footer from './components/estaticos/Footer/Footer'
import Login from './paginas/login/Login'
import CadastroUsuario from './paginas/cadastroUsuario/CadastroUsuario'
import CadastroPostagem from './components/postagens/cadastroPostagem/CadastroPostagem'
import CadastroTema from './components/temas/cadastroTema/CadastroTema'
import ListaPostagem from './components/postagens/listaPostagens/ListaPostagem'
import ListaTemas from './components/temas/listaTemas/ListaTemas'
import DeletarPostagem from './components/postagens/deletarPostagem/DeletarPostagem'
import DeletarTema from './components/temas/deletarTema/DeletarTema'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <BrowserRouter >
        <Navbar />
        <div style={{ minHeight: '100vh' }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
            <Route path='/posts' element={<ListaPostagem />}></Route>
            <Route path='/temas' element={<ListaTemas />}></Route>

            <Route path='/formulario-postagem' element={<CadastroPostagem />}></Route>
            <Route path='/formulario-postagem/:id' element={<CadastroPostagem />}></Route>
            <Route path='/formulario-tema' element={<CadastroTema />}></Route>
            <Route path='/formulario-tema/:id' element={<CadastroTema />}></Route>

            <Route path='/deletar-postagem/:id' element={<DeletarPostagem />}></Route>
            <Route path='/deletar-tema/:id' element={<DeletarTema />}></Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </Provider>
  )
}

export default App