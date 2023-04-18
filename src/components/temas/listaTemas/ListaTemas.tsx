import React from 'react'
import './ListaTemas.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function ListaTemas() {
    return (
        <Card sx={{ minWidth: 275 }} style={{ margin: '1% 2%' }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} gutterBottom>
                    tema
                </Typography>
                <Typography variant="h5" component="div">
                    título do Tema
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant='contained' size="small">editar</Button>
                <Button variant='outlined' color='error' size="small">deletar</Button>
            </CardActions>
        </Card >
    )
}

export default ListaTemas