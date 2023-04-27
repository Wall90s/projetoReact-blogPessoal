import React, { useEffect, useState } from 'react'
import './ListaPostagens.css'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Postagem } from '../../../models/Postagem'
import { Link, useNavigate } from 'react-router-dom';
import { getAll } from '../../../services/Service'
import { useSelector } from 'react-redux'
import { TokenState } from '../../../store/tokens/tokensReducer'
import { toast } from 'react-toastify'

function ListaPostagem() {
    const [postagens, setPostagens] = useState<Postagem[]>([])
    const history = useNavigate()
    
    const token = useSelector<TokenState, TokenState['token']>(
        (state) => state.token
    )

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
        getAllPostagens()
    }, [])

    async function getAllPostagens() {
        await getAll('/postagens', setPostagens, {
            headers: {
                Authorization: token
            }
        })
    }

    return (
        <>
            {
                postagens.map((postagem) => (
                    <Card sx={{ minWidth: 275 }} style={{ margin: '1% 2%', background: 'var(--tea-rose-red)', color: 'white' }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {postagem.titulo}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }}>
                                {postagem.texto}
                            </Typography>
                            <Typography variant="body2">
                                {postagem.tema?.descricao}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Link to={`/formulario-postagem/${postagem.id}`}>
                                <Button variant='contained' size="small">editar</Button>
                            </Link>
                            <Link to={`/deletar-postagem/${postagem.id}`}>
                                <Button style={{ color: 'red' }} color='error' variant='outlined' size="small">deletar</Button>
                            </Link>
                        </CardActions>
                    </Card >
                ))
            }
        </>
    )
}

export default ListaPostagem