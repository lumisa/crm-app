import { useEffect, useState } from "react"
import Linea from "../Linea"

const String = ({index, potenciaW, addProduct, updateString}) => {

    const initialProducts = [
        {id: "Panel" ,    concepto: "Trina Solar",        precio: 150,    ud: 1},

    ]

    const tensionType = [
        {value: "monofasico", checked: true},
        {value: "trifasico", checked: false},
    ]
    const [tension, setTension] = useState("monofasico")
    
    const [products, setProducts] = useState(initialProducts)
    const [watios, setWatios] = useState()
    const [inversor, setInversor] = useState({ })
    const [rangoInversor, setRangoInversor] = useState()

    const inversorHuawei = {
        monofasico: {
            3000 : { descripcion: 'Huawei 2KTL-L1', importe: 583.99 },
            4500 : { descripcion: 'Huawei 3KTL-L1', importe: 794 },
            5520 : { descripcion: 'Huawei 3.68KTL-L1', importe: 854.45 },
            6000 : { descripcion: 'Huawei 4KTL-L1', importe: 989 },
            6900 : { descripcion: 'Huawei 4.6KTL-L1', importe: 949.61 },
            7500 : { descripcion: 'Huawei 5KTL-L1', importe: 1009 },
            9000 : { descripcion:'Huawei 6KTL-L1', importe: 1424.95 },
        },
        trifasico: {
            4500 : { descripcion: 'Huawei 3KTL-M1', importe: 1000.72 },
            6000 : { descripcion: 'Huawei 4KTL-M1', importe: 1045.44 },
            7500 : { descripcion: 'Huawei 5KTL-M1', importe: 1053.99, },
            9000 : { descripcion: 'Huawei 6KTL-M1', importe: 1234.78 },
            12000 : { descripcion: 'Huawei 8KTL-M1', importe: 1612.72 },
            15000 : { descripcion: 'Huawei 10KTL-M1', importe: 1654.79 },
            18000 : { descripcion: 'Huawei 12KTL-M1', importe: 1762.36 },
            22500 : { descripcion: 'Huawei 15KTL-M1', importe: 1877.88 },
            25500 : { descripcion: 'Huawei 17KTL-M1', importe: 1916.68 },
            30000 : { descripcion: 'Huawei 30KTL', importe: 2399.44 },
            36000 : { descripcion: 'Huawei 36KTL', importe: 2658.05 },
            40000 : { descripcion: 'Huawei 40KTL', importe: 2859.20 },
            60000 : { descripcion: 'Huawei 60KTL', importe: 3388.90 },
            100000 : { descripcion: 'Huawei 100KTL', importe: 4873.60 },
            185000 : { descripcion:'Huawei 185KTL', importe: 6638.90 },
            200000 : { descripcion: 'Huawei 215KTL', importe: 7055.56 },
        },
    }

    const rangoPotencia = {
        monofasico : [ 3000, 4500, 5520, 6000, 6900, 7500, 9000 ],
        trifasico : [4500 , 6000 , 7500 , 9000 , 12000 , 15000 , 18000, 
            22500,25500, 30000,36000, 40000, 60000, 100000, 185000, 200000,

        ],

    }

    useEffect(() => {

        const watiosIni = products[0].ud * 450

        setWatios(watiosIni)

        let rango = 3000;
        console.log(rangoPotencia[tension].length)

        for (let i = 0; i < rangoPotencia[tension].length; i++)
        {
            if (watios < rangoPotencia[tension][i])
            {
                rango = rangoPotencia[tension][i]
                console.log(rango)
                break
            }

        }

        setInversor(inversorHuawei[tension][rango])
        
    }, [watios])


    const updateProduct = (id, name, value) => {

        setProducts(prevState => {
            const newState = prevState.map(obj => {
                if (obj.id === id) {
                    return {...obj, [name]: value }
                }
                return obj

            })
            return newState
        })

        if (id === 'Panel' && name === 'ud')
        {
            const newWatios = value * 450

            setWatios(newWatios)
    
            updateString(index, watios)

        }


        
    }

    return (

        <>

            <p>String {index}</p>
            <p>Potencia: {watios}</p>
            {tensionType.map((el) => (
                    <>
                        <input type="radio" name="tension" value={el.value} defaultChecked={el.checked ? true : false}/> {el.value}
                    </>

                ))}
            {products.map((product) => (
                <>
                    <Linea 
                    key={product.id} 
                    id={product.id} 
                    concepto={product.concepto} 
                    precio={product.precio} 
                    ud={product.ud} 
                    updateProduct={(name, value) => updateProduct(product.id, name, value)}
                    addProduct={addProduct}
                    />
                
                </>
            ))}
                <Linea 
                key='inversor'
                id='inversor'
                concepto={inversor.descripcion} 
                precio={inversor.importe} 
                ud={1} 
                updateProduct={(name, value) => updateProduct('inversor', name, value)}
                addProduct={addProduct}
                />
                
        
        </>



    )
}

export default String