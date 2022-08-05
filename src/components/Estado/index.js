import React from 'react'

const Estado = ({estado}) => {

    const estadoBackground = ['#f8ff30', '#0652d4', '#16fa2d']
    const estadoText = ['sin iniciar', 'pendiente', 'ejecutado']
    const estadoColor = ['#000', '#fff', '#000']




    return (

        <div style={{backgroundColor: estadoBackground[estado], color: estadoColor[estado]}}>{estadoText[estado]}</div>
    )
}

export default Estado;