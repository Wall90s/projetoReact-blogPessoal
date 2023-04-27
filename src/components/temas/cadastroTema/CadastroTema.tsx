import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, Container, TextField, Typography } from '@material-ui/core'
import { useNavigate, useParams } from 'react-router-dom'
import { Tema } from '../../../models/Tema'
import { getId, post, put } from '../../../services/Service'
import { useSelector } from 'react-redux'
import { TokenState } from '../../../store/tokens/tokensReducer'
import { toast } from 'react-toastify'

function CadastroTema() {
    const history = useNavigate()
    const { id } = useParams<{ id: string }>()
    const token = useSelector<TokenState, TokenState['token']>(
        (state) => state.token
    )

    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: ''
    })

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

    useEffect(() => {
        if (id !== undefined) {
            findById(id)
        }
    }, [id])

    async function findById(id: string) {
        getId(`/temas/${id}`, setTema, {
            headers: {
                'Authorization': token
            }
        })
    }

    function updatedTema(event: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [event.target.name]: event.target.value,
        })
    }

    async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault()

        if (id !== undefined) {
            await put(`/temas`, tema, setTema, {
                headers: {
                    'Authorization': token
                }
            })
            toast.success('tema atualizado com sucesso', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored"
            })
            history('/temas')
        } else {
            await post(`/temas`, tema, setTema, {
                headers: {
                    'Authorization': token
                }
            })
            toast.success('tema cadastrado com sucesso', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored"
            })
            history('/temas')
        }
    }

    return (
        <>
            <Container maxWidth="sm">
                <form onSubmit={onSubmit}>
                    <Typography variant="h3" color="textSecondary" component="h1" align="center" >
                        {tema.id !== 0 ? 'Editar tema' : 'Cadastrar tema'}
                    </Typography>
                    <TextField value={tema.descricao} onChange={(event: ChangeEvent<HTMLInputElement>) => updatedTema(event)} id="descricao" label="descricao" variant="outlined" name="descricao" margin="normal" fullWidth />
                    <Button type="submit" variant="contained" color="primary">
                        Finalizar
                    </Button>
                </form>
            </Container>
        </>
    )
}

export default CadastroTema