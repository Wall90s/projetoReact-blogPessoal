import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addToken } from '../../../store/tokens/action'
import { useDispatch, useSelector } from 'react-redux'
import { TokenState } from '../../../store/tokens/tokensReducer'
import { toast } from 'react-toastify'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import './Navbar.css'


function Navbar() {
    const history = useNavigate()
    const dispatch = useDispatch()

    const token = useSelector<TokenState, TokenState['token']>(
        (state) => state.token
    )

    function goLogout() {
        dispatch(addToken(''))
        toast.info('usuário deslogado', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "colored",
        })
        history('/login')
    }

    let navbarComponent

    if (token !== '') {
        navbarComponent =
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" className="bgColor">
                    <Toolbar >
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Blog Pessoal
                            <Link to='/home'>
                                <Button className='colorWhite' style={{ marginLeft: '1rem' }}>início</Button>
                            </Link>
                            <Link to='/posts'>
                                <Button className='colorWhite'>postagens</Button>
                            </Link>
                            <Link to='/temas'>
                                <Button className='colorWhite' >temas</Button>
                            </Link>
                            <Link to='/formulario-tema'>
                                <Button className='colorWhite' >cadastrar tema</Button>
                            </Link>
                        </Typography>
                        <Button onClick={goLogout} type='submit' variant='outlined' style={{ color: 'white', borderColor: 'var(--mauve)' }}>sair</Button>
                    </Toolbar>
                </AppBar>
            </Box>
    }

    return (
        <>
            {navbarComponent}
        </>
    );
}

export default Navbar