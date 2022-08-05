import React from 'react'
import Estado from '../Estado';
import { DataGrid } from '@mui/x-data-grid';
import Checkbox from '@mui/material/Checkbox';


const Tramites = () => {

    const columns = [
        {
          field: 'nombre',
          headerName: 'Nombre',
          width: 210,
          editable: true,
          onChange: function(e) {
            console.log(e.target.value);
          }
        },
        {
          field: 'contratado',
          headerName: 'Servicio contratado',
          width: 150,
          editable: true,
            renderCell: (params) => {
                const labelId = `checkbox-list-label-${params.row.id}`;
                    return (
                        <Checkbox
                        edge="start"
                        checked={params.row.contratado}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                        onChange={(e) => {console.log(e.target.value)}}
                        />
                    )
            }
        },
        {
            field: 'estado',
            headerName: 'Estado',
            width: 100,
            editable: true,
            renderCell: (params) => {
                    return (
                        <Estado
                        estado={params.row.estado}
                        />
                    )
            }
        },

      ];

    const tramites = [//PPA, autoconsumo
    {
        id: 1,
        clave: "ibi",
        nombre: "Bonificación IBI",
        contratado: true,
        fecha: '01/04/2022',
        estado: 0,
        
    },
    {
        id: 2,
        clave: "subvencion",
        nombre: "subvencion",
        contratado: true,
        fecha: '01/04/2022',
        estado: 0,
    },
    
    {
        id: 3,
        clave: "instalacionProgramada",
        nombre: "Instalación",
        contratado: true,
        fecha: "01/04/2022",
        estado: 1,
    },
    
    {
        id: 4,
        clave: "comunicacionObra",
        nombre: "Comunicación Obra",
        contratado: true,
        fecha: "01/04/2022",
        estado: 1,
    },
    {
        id: 5,
        clave: "declaracionPropietario",
        nombre: "declaracion Propietario",
        contratado: true,
        fecha: "01/04/2022",
        estado: 2,
    },
    
]


    return (

        <>
            <h3>Tramites</h3>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                rows={tramites}
                columns={columns}
                disableSelectionOnClick
                />
            </div>

        </>



    )
}

export default Tramites;