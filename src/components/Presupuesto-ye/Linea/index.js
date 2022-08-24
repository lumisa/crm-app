
import { useState } from react

const Linea = () => {

    const [products, setProducts] = useState([
        {key: "trinaSolar", concepto: "Trina Solar", precio: 150, ud: 1, total: 150},
        {concepto: "Inversor", precio: 200, ud: 1, total: 200},

    ])


    const onChangeUd = (key, e) => {

        const { name, value } = e.target;

        products.forEach((product) => {

            if (product.key === key)
            {
                setProducts({...products, [name]: value})

            }
        })

    }


    return (

        {products.map( (value, i) => (

            <div class="row form-group">
                <div class="col-6"><span id="concepto-${key}">${value.concepto} </span></div>
                    <div class="col-1">
                        <input type="number" name="ud" onChange={onChangeUd(value.key, )} step="1" class="form-control" value="${presupuestoUd[modalidad][key].ud}" id="ud-${key}" name="ud-${key}" title="Completar" placeholder="" style="width:100%;"/>
                    </div>
                    <div class="col-3">
                        <input type="number" step="0.01" class="form-control" value="${value.importe}" id="importe-${key}" name="importe-${key}" title="Completar" placeholder="" style="width:100%;"/>
                        </div>
                        <div class="col-2">
                        <input type="number" step="0.01" class="form-control" disabled value="${presupuestoUd[modalidad][key].ud * value.importe}" id="total-${key}" name="total-${key}" title="Completar" placeholder="" style="width:100%;"/>
                        
                    </div>
                </div>
            </div>

        ) )}


    )
}

export default Linea;