import { useState, useEffect } from 'react'
import Linea from "./Linea";
import { Grid, Right, Left } from './styles'
import String from './String'

const WATIO = 450

const Lineas = () => {

    const initialProducts = [
        {id: "Legal",               concepto: "Legalización",       precio: 850,    ud: 1},
        {id: "ManoObra",            concepto: "Instalación",        precio: 1500,   ud: 1},
        {id: "Estructura",          concepto: "Estructura",         precio: 750,    ud: 1},
        {id: "KitElectrico",        concepto: "KitElectrico",       precio: 500,    ud: 1},
        {id: "PowerMeter",          concepto: "PowerMeter",         precio: 100,    ud: 1},
        {id: "BateriaModulo",       concepto: "BateríaModulo",      precio: 800,    ud: 0},
        {id: "Baterias",            concepto: "Baterias",           precio: 2000,   ud: 0},
        {id: "InstalacionBat",      concepto: "InstalcionBat",      precio: 480,    ud: 0},
        {id: "Visita",              concepto: "VisitaObra",         precio: 0,      ud: 1},
        {id: "Gestiones",           concepto: "Gestiones",          precio: 0,      ud: 1},
        {id: "Descuento",           concepto: "Descuento",          precio: 0,      ud: -1},
        {id: "ComunicacionObra",    concepto: "ComunicacionObra",   precio: 210,    ud: 0},
        {id: "TramtacionIBI",       concepto: "TramtacionIBI",      precio: 390,    ud: 0},

    ]

    const [products, setProducts] = useState(initialProducts)
    const [carrito, setCarrito] = useState([])
    const [total, setTotal] = useState(0)
    const [strings, setStrings] = useState([{potenciaW: 450}])

    useEffect(() => {
        
        let totalAcum = 0
        
        carrito.map((el) => {
            totalAcum+= (el.ud * el.precio)
        })

        setTotal(totalAcum)
    }, [carrito])

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
        
    }

    const addProduct = (product) => {
        console.log(product)
        setCarrito([...carrito, product])

    }

    const updateString = (index, watios) => {
        setStrings(prevState => {

            strings[index-1].potenciaW = watios
            const newState = prevState.map((string, i) => {
                if (i === index-1) {
                    return {...string, potenciaW: watios}
                }
                return string
            })
            return newState
        })
    }

    const addString = () => {
        const newString = {potenciaW: 450}
        setStrings([...strings, newString])
    }

    return (

        <Grid>

            <Right>

                {strings.map((string, i) => (
                    <String
                    key={'string-'+i}
                    index={i+1}
                    potenciaW={string.potenciaW}
                    updateString={updateString}
                    addProduct={addProduct}
                    />

                ))}

                <button onClick={addString}>Añadir string</button>

                
                {products.map( (product) => (
                    <Linea 
                    key={product.id} 
                    id={product.id} 
                    concepto={product.concepto} 
                    precio={product.precio} 
                    ud={product.ud} 
                    updateProduct={(name, value) => updateProduct(product.id, name, value)}
                    addProduct={addProduct}
                    />
                ))}


            </Right>
            
            <Left>


                <p>Carrito</p>
                {carrito.map((product) => (
                    <>
                    <p>{product.concepto} {product.ud} x {product.precio} = {product.ud * product.precio}</p>
                    </>
                ))}

                <p>total: {total}</p>
            </Left>

        
        </Grid>
    )
}

export default Lineas;