import React, { ChangeEvent, useEffect, useState } from 'react'
import { Container, Typography, TextField, FormControl, InputLabel, Select, FormHelperText, Button, MenuItem } from '@material-ui/core'
import { useNavigate, useParams } from 'react-router-dom'
import { Tema } from '../../../models/Tema'
import { Postagem } from '../../../models/Postagem'
import { put, post, getId } from '../../../services/Service'
import { getAll } from '../../../services/Service'
import { useSelector } from 'react-redux'
import { TokenState } from '../../../store/tokens/tokensReducer'
import { toast } from 'react-toastify'

function CadastroPostagem() {
    const history = useNavigate()
    const { id } = useParams<{ id: string }>()
    const [temas, setTemas] = useState<Tema[]>([])
    const token = useSelector<TokenState, TokenState['token']>(
        (state) => state.token
    )

    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: ''
    })

    const [postagem, setPostagem] = useState<Postagem>({
        id: 0,
        titulo: '',
        texto: '',
        data: '',
        tema: null
    })

    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema
        })
    }, [tema])

    useEffect(() => {
        getTemas()
        if (id !== undefined) {
            findByIdPostagem(id)
        }
    }, [id])

    async function getTemas() {
        await getAll("/temas", setTemas, {
            headers: {
                'Authorization': token
            }
        })
    }

    useEffect(() => {
        if (token === '') {
            toast.error('faça login para acessar essa página', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored"
            })
            history('/login')
        }
    }, [token])

    async function findByIdPostagem(id: string) {
        await getId(`/postagens/${id}`, setPostagem, {
            headers: {
                'Authorization': token
            }
        })
    }

    function updatedPostagem(event: ChangeEvent<HTMLInputElement>) {
        setPostagem({
            ...postagem,
            [event.target.name]: event.target.value,
            tema: tema
        })
    }

    async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault();

        if (id !== undefined) {
            await put('/postagens', postagem, setPostagem, {
                headers: {
                    Authorization: token,
                },
            })
            toast.success('postagem atualizada com sucesso', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored"
            })
            history('/posts')
        } else {
            await post('/postagens', postagem, setPostagem, {
                headers: {
                    Authorization: token,
                },
            });
            toast.success('postagem cadastrada com sucesso', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored"
            })
            history('/posts')
        }
    }

    return (
        <>
            <Container maxWidth="sm" className="topo">
                <form onSubmit={onSubmit}>
                    <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro postagem</Typography>
                    <TextField value={postagem.titulo} onChange={(event: ChangeEvent<HTMLInputElement>) => updatedPostagem(event)} id="titulo" label="titulo" variant="outlined" name="titulo" margin="normal" fullWidth />
                    <TextField value={postagem.texto} onChange={(event: ChangeEvent<HTMLInputElement>) => updatedPostagem(event)} id="texto" label="texto" name="texto" variant="outlined" margin="normal" fullWidth />

                    <FormControl >
                        <InputLabel id="demo-simple-select-helper-label">Tema </InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            onChange={(event) => getId(`/temas/${event.target.value}`, setTema, {
                                headers: {
                                    'Authorization': token
                                }
                            })} >
                            {
                                temas.map((tema) => (
                                    <MenuItem value={tema.id}>{tema.descricao}</MenuItem>
                                ))
                            }
                        </Select>
                        <FormHelperText>Escolha um tema para a postagem</FormHelperText>
                        <Button type="submit" variant="contained" color="primary">
                            Finalizar
                        </Button>
                    </FormControl>
                </form>
            </Container>
        </>
    )
}

export default CadastroPostagem