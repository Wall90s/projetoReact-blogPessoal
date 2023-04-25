import React, { ChangeEvent, useEffect, useState } from 'react'
import './Login.css'
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import UserLogin from '../../models/UserLogin'
import { login } from '../../services/Service'
import { useDispatch } from 'react-redux'
import { addToken } from '../../store/tokens/action'

function Login() {
    const history = useNavigate()

    const dispatch = useDispatch()

    const [token, setToken] = useState('')

    const [userLogin, setUserLogin] = useState<UserLogin>({
        id: 0,
        usuario: '',
        senha: '',
        token: ''
    })

    function updatedModel(event: ChangeEvent<HTMLInputElement>) {
        setUserLogin({
            ...userLogin,
            [event.target.name]: event.target.value
        })
    }

    useEffect(() => {
        if (token != '') {
            dispatch(addToken(token))
            history('/home')
        }
    }, [token])

    async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            await login(`/usuarios/logar`, userLogin, setToken)
            alert('Usuário logado com sucesso');

        } catch (error) {
            alert('Usuário ou senha incorretos');
        }
    }

    return (
        <>
            <Grid container direction='row' justifyContent='center' alignItems='center'>
                <Grid xs={6} alignItems='center'>
                    <Box style={{ padding: '0 15%' }}>
                        <form onSubmit={onSubmit}>
                            <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' style={{ fontWeight: 'bold' }}>Entrar</Typography>
                            <TextField value={userLogin.usuario} onChange={(event: ChangeEvent<HTMLInputElement>) => updatedModel(event)} id='usuario' label='usuário' variant='outlined' name='usuario' margin='normal' fullWidth></TextField>
                            <TextField value={userLogin.senha} onChange={(event: ChangeEvent<HTMLInputElement>) => updatedModel(event)} id='senha' label='senha' variant='outlined' name='senha' margin='normal' fullWidth type='password'></TextField>
                            <Box marginTop={2} textAlign='center'>
                                <Button type='submit' variant='contained' color='primary'>
                                    Logar
                                </Button>
                            </Box>
                        </form>

                        <Box justifyContent='center' marginTop={2}>
                            <Box marginRight={1}>
                                <Typography variant='subtitle1' gutterBottom align='center'>Não tem uma conta?</Typography>
                            </Box>
                            <Link to='/cadastro-usuario'>
                                <Typography variant='subtitle1' align='center' style={{ fontWeight: 'bold', color: 'black' }}>Cadastre-se</Typography>
                            </Link>
                        </Box>
                    </Box>
                </Grid>

                <Grid xs={6} style={{
                    backgroundImage: `url(https://ik.imagekit.io/wall90gifs/BlogPessoal/adorable-kitty-with-monochrome-wall-her.jpg?updatedAt=1681438971679)`,
                    backgroundRepeat: 'no-repeat', width: '100vh', minHeight: '100vh', backgroundSize: 'cover', backgroundPosition: 'center',
                    transform: 'rotateY(180deg)'
                }}>
                </Grid>
            </Grid>
        </>
    )
}

export default Login