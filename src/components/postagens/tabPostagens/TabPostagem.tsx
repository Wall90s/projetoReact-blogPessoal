import React from 'react'
import './TabPostagem.css'
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import ListaPostagens from '../listaPostagens/ListaPostagens';
import { Box, Grid } from '@material-ui/core';

function TabPostagem() {
    const [value, setValue] = React.useState('1')

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue)
    }

    return (
        <TabContext value={value}>
            <AppBar position="static">
                <TabList centered onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Postagens" value="1" />
                    <Tab label="Sobre mim" value="2" />
                </TabList>
            </AppBar>
            <TabPanel value="1"><ListaPostagens /></TabPanel>
            <TabPanel value="2">texto com o sobre</TabPanel>
        </TabContext>
    )
}

export default TabPostagem