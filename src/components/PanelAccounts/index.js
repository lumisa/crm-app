import React, {useState, useEffect } from 'react';
import AccountCard from './AccountCard'
import SearchBar from '../SearchBar';
import Account from '../../services/ServiceAccount'
import {Container, Header, Cards, ButtonDiv, Grid, AccountForm, Table } from '../UI/Layout/styles'
import CreateNewForm from '../UI/CreateNewForm';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';


function PanelAccounts() {

    const [accounts, setAccounts] = useState([])
    const [resetFilter, setResetFilter] = useState(false)
    const [search, setSearch] = useState("")
    const [view, setView] = useState('Card')

    const columns = [
        {
            field: 'title',
            headerName: 'Titulo',
            width: 200,
            editable: true,
        },
        {
            field: 'description',
            headerName: 'Descripción',
            width: 200,
            editable: true,
        },
        {
            field: 'address',
            headerName: 'Dirección completa',
            width: 350,
            editable: true,
        },
        {
            field: 'representation',
            headerName: 'Representación',
            width: 200,
            editable: true,
        },
        {
            field: 'activity_description',
            headerName: 'Actividad',
            width: 200,
            editable: true,
        },
        {
            field: 'commission',
            headerName: 'Comisión',
            width: 200,
            editable: true,
        },
    ]


    useEffect(() => {
        Account.getAccount().then((accounts) =>{ 
            setAccounts(accounts)
        
        })

    }, [])


    
    const filteredAccount = search === '' ? accounts : accounts.filter(account => account.title.toLowerCase().includes(search))


    const TextFieldEls = [
        {label: 'Titulo', name: 'title', required: true},
        {label: 'Descripción', name: 'description', required: true},
        {label: 'Dirección completa', name: 'address', required: true},
        {label: 'CUPS', name: 'cups_number', required: false},
        {label: 'Tension', name: 'tension', required: false},
        {label: 'Representación', name: 'representation', required: false},
        {label: 'Consumo Anual', name: 'consumption_yearly', required: false},
        {label: 'Comisión', name: 'commission', required: false},
        {label: 'Actividad', name: 'activity_description', required: false},
    
    
    ]
    
    const InputFileEls = [
/*         {label: 'Imagen', name: 'imagen', required: false},
        {label: 'Proyecto técnico', name: 'project_file', required: false},
        {label: 'Memoria técnica', name: 'memoria_file', required: false},
 */    ]
    
    const SelectFieldEls  = [
/*         {label: 'Cliente', name: 'contact_id', required: true, options: contacts.map((contact) => {return {value: contact.id, label: contact.full_name}})},
        {label: 'Tipo Autoconsumo', name: 'autoconsumo_type_id', required: true, options: contacts.map((contact) => {return {value: contact.id, label: contact.full_name}})},
 */    ]


    const onSubmit = (data) => {
        Account.create(data).then((account) => {
            setAccounts([...accounts, account])
        })
        .catch((error) => {
            console.error(error)
        }
        )
    }

    const deleteAccount = (id) => {
        Account.remove(id).then(() => {
            let without = accounts.filter((account) => { return account.id !== id})
            setAccounts(without)
        }
        ).catch((error) => {
            console.error(error)
        }
        )
    }

    return (
        <Container>
            <Header>
                <button onClick={() => setView('Card')}>Card</button>
                <button onClick={() => setView('Table')}>Tabla</button>
                <Grid>
                    <h2>Cuentas</h2>
                    <ButtonDiv>

                        <CreateNewForm
                        boton='Crear nueva cuenta'
                        titulo='Crear cuenta nueva'
                        TextFieldEls={TextFieldEls}
                        InputFileEls={InputFileEls}
                        SelectFieldEls={SelectFieldEls}
                        onSubmit={onSubmit}
                        
                        />

                    </ButtonDiv>

                    <SearchBar
                    search={search}
                    setSearch={setSearch}
                    resetFilter={resetFilter}
                    setResetFilter={setResetFilter}
                    />
                </Grid>



            </Header>

                <Cards>

                    <div 
                    style={{display: view == 'Card' ? 'contents': 'none'}}>


                        {filteredAccount.length > 0 ?
                            (
                            <>
                                {filteredAccount.map((searchedAccounts, index) => 
                                
                                (
                                    
                                    <AccountCard
                                        
                                        key={index}
                                        title={searchedAccounts.title}
                                        createdAt={searchedAccounts.createdAt}
                                        image={searchedAccounts.image}
                                        address={searchedAccounts.address}
                                        contactId={searchedAccounts.contact_id}
                                        id={searchedAccounts.id}
                                        deleteAccount={deleteAccount}
                                    />

                                )

                                )}
                            </>
                            
                            )  : 'Loading...'
                        
                        }
                    </div>

                </Cards>

                <Table>

                    <div
                    style={{display: view == 'Table' ? 'contents': 'none'}}>

                        <Box sx={{ height: 800, width: '100%' }}>

                            <DataGrid
                            rows={filteredAccount}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                            disableSelectionOnClick
                        />

                        </Box>



                    </div>

                </Table>


            <AccountForm/>

        
        </Container>
    )
        
}


export default PanelAccounts