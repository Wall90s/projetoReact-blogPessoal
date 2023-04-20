import React from 'react'
import './ListaPostagens.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function ListaPostagens() {
    return (
        <Card sx={{ minWidth: 275 }} style={{ margin: '1% 2%', background: 'var(--tea-rose-red)', color: 'white'}}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Título
                </Typography>
                <Typography sx={{ mb: 1.5 }}>
                    Texto da postagem
                </Typography>
                <Typography variant="body2">
                    Tema
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant='contained' size="small">editar</Button>
                <Button style={{color: 'red'}} color='error' variant='outlined' size="small">deletar</Button>
            </CardActions>
        </Card >
    )
}

export default ListaPostagens