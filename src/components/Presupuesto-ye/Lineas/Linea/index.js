import React, { useState, useEffect } from 'react';

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
            <div class="row form-group">
                <div class="col-6"><span id="concepto-${key}">${value.concepto} </span>
                    <div class="col-1">
                        <input type="number" name="ud" onChange={onChangeUd(Linea.id, e)} step="1" class="form-control" value={Linea.ud} id="ud-${key}" title="Completar" placeholder=""/>
                    </div>
                    <div class="col-3">
                        <input type="number" name="precio" step="0.01" class="form-control" value={Linea.precio} id="importe-${key}" title="Completar" placeholder=""/>
                        </div>
                        <div class="col-2">
                        <input type="number" step="0.01" class="form-control" disabled value={Linea.ud * Linea.precio} id="total-${key}" name="total-${key}" title="Completar" placeholder=""º/>
                        
                    </div>
                </div>
            </div>
    )
}

export default Linea;