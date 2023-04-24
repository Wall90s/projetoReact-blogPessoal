import React, { useEffect, useState } from 'react'
import './ListaPostagens.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Postagem } from '../../../models/Postagem';
import useLocalStorage from 'react-use-localstorage';
import { Link, useNavigate } from 'react-router-dom';
import { getAll } from '../../../services/Service';

function ListaPostagem() {
    const [postagens, setPostagens] = useState<Postagem[]>([])
    const [token] = useLocalStorage('token')
    const history = useNavigate()

    useEffect(() => {
        if (token === '') {
            alert('faça login para acessar essa página')
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
            {console.log(postagens)}
        </>
    )
}

export default ListaPostagem