import './App.css'
import Home from './paginas/home/Home';
import Navbar from './components/estaticos/Navbar/Navbar';
import Footer from './components/estaticos/Footer/Footer';
import Login from './paginas/login/Login';
import CadastroUsuario from './paginas/cadastroUsuario/CadastroUsuario';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListaTemas from './components/temas/listaTemas/ListaTemas';
import ListaPostagem from './components/postagens/listaPostagens/ListaPostagem';
import CadastroPostagem from './components/postagens/cadastroPostagem/CadastroPostagem';
import CadastroTema from './components/temas/cadastroTema/CadastroTema';
import DeletarPostagem from './components/postagens/deletarPostagem/DeletarPostagem';
import DeletarTema from './components/temas/deletarTema/DeletarTema';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter >
        <Navbar />
        <div style={{ minHeight: '100vh' }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
            <Route path='/temas' element={<ListaTemas />}></Route>
            <Route path='/posts' element={<ListaPostagem />}></Route>

            <Route path='/formulario-postagem' element={<CadastroPostagem />}></Route>
            <Route path='/formulario-postagem/:id' element={<CadastroPostagem />}></Route>
            <Route path='/formulario-tema' element={<CadastroTema />}></Route>
            <Route path='/formulario-tema/:id' element={<CadastroTema />}></Route>

            <Route path='/deletar-postagem/:id' element={<DeletarPostagem />}></Route>
            <Route path='/deletar-tema/:id' element={<DeletarTema />}></Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter >
    </Provider>
  )
}

export default App