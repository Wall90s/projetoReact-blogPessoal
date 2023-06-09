import React, { useEffect, useState } from 'react'
import './ListaTemas.css'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Tema } from '../../../models/Tema'
import { Link, useNavigate } from 'react-router-dom'
import { getAll } from '../../../services/Service'
import { useSelector } from 'react-redux'
import { TokenState } from '../../../store/tokens/tokensReducer'

function ListaTemas() {
    const [temas, setTemas] = useState<Tema[]>([])
    const history = useNavigate()

    const token = useSelector<TokenState, TokenState['token']>(
        (state) => state.token
    )

    useEffect(() => {
        if (token === '') {
            alert('faça login para acessar essa página')
            history('/login')
        }
    }, [token])

    async function getAllTemas() {
        await getAll('/temas', setTemas, {
            headers: {
                Authorization: token
            }
        })
    }

    useEffect(() => {
        getAllTemas()
    }, [temas.length])

    return (
        <>
            {
                temas.map((tema) => (
                    <Card sx={{ minWidth: 275 }} style={{ margin: '1% 2%' }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} gutterBottom>
                                tema
                            </Typography>
                            <Typography variant="h5" component="div">
                                {tema.descricao}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Link to={`/formulario-tema/${tema.id}`}>
                                <Button variant='contained' size="small">editar</Button>
                            </Link>
                            <Link to={`/deletar-tema/${tema.id}`}>
                                <Button variant='outlined' style={{ color: 'red' }} color='error' size="small">deletar</Button>
                            </Link>
                        </CardActions>
                    </Card >
                ))
            }
        </>
    )
}

export default ListaTemas