import { Button, Grid, Typography } from '@material-ui/core'
import './Home.css'
import { Box } from '@mui/material'
import TabPostagem from '../../components/postagens/tabPostagens/TabPostagem'
import ModalPostagem from '../../components/postagens/modalPostagem/ModalPostagem'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { TokenState } from '../../store/tokens/tokensReducer'
import { toast } from 'react-toastify'

function Home() {
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

    return (
        <>
            <Grid style={{ background: 'var(--mauve)' }} container direction="row" justifyContent="center" alignItems="center" className='caixa'>
                <Grid alignItems="center" item xs={6}>
                    <Box paddingX={20} >
                        <Typography variant="h3" gutterBottom color="textPrimary" component="h3" align="center" className='titulo'>Seja bem vindo(a)!</Typography>
                        <Typography variant="h5" gutterBottom color="textPrimary" component="h5" align="center" className='titulo'>expresse aqui os seus pensamentos e opiniões!</Typography>
                    </Box>
                    <Box display="flex" justifyContent="center">
                        <Box marginRight={1}>
                            <ModalPostagem />
                        </Box>
                        <Link to='/posts'>
                            <Button variant="outlined" className='botao'>Ver Postagens</Button>
                        </Link>
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