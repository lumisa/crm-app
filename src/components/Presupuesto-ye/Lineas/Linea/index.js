import React, { useState, useEffect } from 'react';
import { RowStyle } from './styles'
const Linea = ({id, concepto, ud, precio}) => {

    const [Linea, setLinea] = useState({})

    useEffect(() => {
        setLinea({id, concepto, ud, precio})
        }, [id, concepto, ud, precio])

    const onChangeUd = (id, e) => {

        const { name, value } = e.target;

        products.forEach((product) => {
            if (product.id === id){
                setProducts({...products, [name]: value})
            }
        })
    }

    return (

            <RowStyle>
                <input type="number" step="0.01" name="ud" defaultValue={ud}/>
                <input type="number" step="0.01" name="precio" defaultValue={precio}/>
                <input type="number" name="total" defaultValue={ud*precio}/>
            </RowStyle>

    )
}

export default Linea;