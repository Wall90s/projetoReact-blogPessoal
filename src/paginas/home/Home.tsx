import { Button, Grid, Typography } from '@material-ui/core'
import './Home.css'
import { Box } from '@mui/material'
import TabPostagem from '../../components/postagens/tabPostagens/TabPostagem'
import ModalPostagem from '../../components/postagens/modalPostagem/ModalPostagem'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import useLocalStorage from 'react-use-localstorage'

function Home() {

    const history = useNavigate()
    const [token] = useLocalStorage('token')

    useEffect(() => {
        if (token === '') {
            alert('faça login para acessar essa página')
            history('/login')
        }
    }, [token])

    return (
        <>
            <Grid style={{ background: 'var(--mauve)'}} container direction="row" justifyContent="center" alignItems="center" className='caixa'>
                <Grid alignItems="center" item xs={6}>
                    <Box paddingX={20} >
                        <Typography variant="h3" gutterBottom color="textPrimary" component="h3" align="center" className='titulo'>Seja bem vindo(a)!</Typography>
                        <Typography variant="h5" gutterBottom color="textPrimary" component="h5" align="center" className='titulo'>expresse aqui os seus pensamentos e opiniões!</Typography>
                    </Box>
                    <Box display="flex" justifyContent="center">
                        <Box marginRight={1}>
                            <ModalPostagem/>
                        </Box>
                        <Button variant="outlined" className='botao'>Ver Postagens</Button>
                    </Box>
                </Grid>
                <Grid item xs={6} >
                    <img src="https://ik.imagekit.io/wall90gifs/BlogPessoal/Playful_cat-cuate.svg?updatedAt=1681317495331" alt="" width="500px" height="500px" />
                </Grid>
                <Grid xs={12} className='postagens' >
                    <TabPostagem />
                </Grid>
            </Grid>
        </>
    )
}

export default Home