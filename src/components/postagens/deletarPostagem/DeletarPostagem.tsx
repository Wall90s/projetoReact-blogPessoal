import React, { useEffect, useState } from 'react'
import { Typography, Button, Card, CardActions, CardContent } from '@material-ui/core'
import { Box } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { Postagem } from '../../../models/Postagem'
import { getId, deleteId } from '../../../services/Service'
import { useSelector } from 'react-redux'
import { TokenState } from '../../../store/tokens/tokensReducer'

function DeletarPostagem() {
    const history = useNavigate()
    const { id } = useParams<{ id: string }>()
    const token = useSelector<TokenState, TokenState['token']>(
        (state) => state.token
    )

    const [postagem, setPostagem] = useState<Postagem>()

    useEffect(() => {
        if (token === '') {
            alert('faça login para acessar essa página')
            history('/login')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            findById(id)
        }
    }, [id])

    async function findById(id: string) {
        getId(`/postagens/${id}`, setPostagem, {
            headers: {
                'Authorization': token
            }
        })
    }

    function opcaoSim() {
        history('/posts')
        deleteId(`/postagens/${id}`, {
            headers: {
                'Authorization': token
            }
        })
        alert('Postagem deletada com sucesso')
    }

    function opcaoNao() {
        history('/posts')
    }
    return (
        <>
            <Box m={2}>
                <Card variant="outlined" >
                    <CardContent>
                        <Box justifyContent="center">
                            <Typography color="textSecondary" gutterBottom>
                                Deseja deletar a Postagem:
                            </Typography>
                            <Typography color="textSecondary" >
                                {postagem?.titulo}
                            </Typography>
                        </Box>

                    </CardContent>
                    <CardActions>
                        <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
                            <Box mx={2}>
                                <Button onClick={opcaoSim} variant="contained" className="marginLeft" size='large' color="primary">
                                    Sim
                                </Button>
                            </Box>
                            <Box>
                                <Button onClick={opcaoNao} variant="contained" size='large' color="secondary">
                                    Não
                                </Button>
                            </Box>
                        </Box>
                    </CardActions>
                </Card>
            </Box>
        </>
    )
}

export default DeletarPostagem