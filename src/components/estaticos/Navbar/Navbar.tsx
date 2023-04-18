import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import './Navbar.css'

function Navbar() {
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" className="bgColor">
                    <Toolbar >
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Blog Pessoal
                            <Link to={'/home'}>
                                <Button color="inherit" style={{ marginLeft: '1rem' }}>início</Button>
                            </Link>
                            <Link to={'/posts'}>
                                <Button color="inherit">postagens</Button>
                            </Link>
                            <Link to={'/temas'}>
                                <Button color="inherit">temas</Button>
                            </Link>
                            <Button color="inherit">cadastrar tema</Button>
                        </Typography>
                        <Link to='/login' >
                            <Button type='submit' variant='outlined' style={{ color: 'white', borderColor: 'var(--mauve)' }}>sair</Button>
                        </Link>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}

export default Navbar