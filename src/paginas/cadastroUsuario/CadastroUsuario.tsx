import React, { ChangeEvent, useEffect, useState } from 'react'
import User from '../../models/User';
import { cadastroUsuario } from '../../services/Service';
import { Grid, Typography, Button, TextField } from '@material-ui/core';
import { Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './CadastroUsuario.css';
import { toast } from 'react-toastify';

function CadastroUsuario() {
    const history = useNavigate();

    const [confirmarSenha, setConfirmarSenha] = useState<String>("")

    const [user, setUser] = useState<User>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: ''
    })

    const [userResult, setUserResult] = useState<User>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: ''
    })

    useEffect(() => {
        if (userResult.id != 0) {
            history("/login")
        }
    }, [userResult])

    function confirmarSenhaHandle(event: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(event.target.value)
    }

    function updatedModel(event: ChangeEvent<HTMLInputElement>) {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })

    }

    async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault()
        if (confirmarSenha === user.senha) {
            try {
                await cadastroUsuario(`/usuarios/cadastrar`, user, setUserResult)
                toast.success('usuário cadastrado com sucesso', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "colored"
                })
            } catch (error) {
                toast.error('por favor verifique os campos', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "colored"
                })
            }
        } else {
            toast.error('dados inconsistentes. por favor verifique os campos', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored"
            })
        }
    }

    return (
        <>
            <Grid container direction='row' justifyContent='center' alignItems='center'>
                <Grid item xs={6} style={{
                    backgroundImage: `url(https://ik.imagekit.io/wall90gifs/BlogPessoal/adorable-kitty-with-monochrome-wall-her.jpg?updatedAt=1681438971679)`,
                    backgroundRepeat: 'no-repeat', width: '100vh', minHeight: '100vh', backgroundSize: 'cover', backgroundPosition: 'center',
                }}>
                </Grid>

                <Grid item xs={6} alignItems='center'>
                    <Box style={{ padding: '0 15%' }}>
                        <form onSubmit={onSubmit}>
                            <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' style={{ fontWeight: 'bold' }}>Cadastre-se</Typography>
                            <TextField value={user.nome} onChange={(event: ChangeEvent<HTMLInputElement>) => updatedModel(event)} id='nome' label='nome' variant='outlined' name='nome' margin='normal' fullWidth></TextField>
                            <TextField value={user.usuario} onChange={(event: ChangeEvent<HTMLInputElement>) => updatedModel(event)} id='usuario' label='e-mail' variant='outlined' name='usuario' margin='normal' fullWidth></TextField>
                            <TextField value={user.senha} onChange={(event: ChangeEvent<HTMLInputElement>) => updatedModel(event)} id='senha' label='senha' variant='outlined' name='senha' margin='normal' fullWidth type='password'></TextField>
                            <TextField value={confirmarSenha} onChange={(event: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(event)} id='confirmarSenha' label='confirmar senha' variant='outlined' name='confirmarSenha' margin='normal' fullWidth type='password'></TextField>
                            <Box marginTop={2} textAlign='center'>
                                <Button type='submit' variant='contained' color='primary'>
                                    cadastrar
                                </Button>
                            </Box>
                        </form>

                        <Box justifyContent='center' marginTop={2}>
                            <Box marginRight={1}>
                                <Typography variant='subtitle1' gutterBottom align='center'>Já possui uma conta?</Typography>
                            </Box>
                            <Link to='/login'>
                                <Typography variant='subtitle1' align='center' style={{ fontWeight: 'bold', color: 'black' }}>Faça login</Typography>
                            </Link>
                        </Box>

                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default CadastroUsuario
