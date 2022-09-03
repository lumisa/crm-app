import React, { useState, useEffect } from 'react';
import { RowStyle } from './styles'
const Linea = ({id, concepto, ud, precio, updateProduct, addProduct}) => {

    const [Linea, setLinea] = useState({})

    useEffect(() => {
        setLinea({id, concepto, ud, precio, total: ud * precio})
        }, [id, concepto, ud, precio])

    const onChangeUd = (e) => {
        const { name, value } = e.target;
        updateProduct(name, value)
    }

    const handleAdd = (Linea) => {
        addProduct(Linea)

    }

    return (

            <RowStyle>
                <div>{Linea.concepto}</div>
                <input type="number" step="1" name="ud" defaultValue={Linea.ud} onChange={(e)=>onChangeUd(e)}/>
                <input type="number" step="0.01" name="precio" defaultValue={Linea.precio}  onChange={(e)=>onChangeUd(e)}/>
                <input type="number" name="total" disabled defaultValue={Linea.total}/>
                <button onClick={()=> handleAdd(Linea)}>Añadir</button>
            </RowStyle>

    )
}

export default Linea;