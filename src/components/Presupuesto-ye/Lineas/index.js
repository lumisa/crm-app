import Linea from "./Linea";

const Lineas = () => {

    const [products, setProducts] = useState([
        {id: "Panel", concepto: "Trina Solar", precio: 150, ud: 1},
        {id: "Inversor", concepto: "Inversor", precio: 794, ud: 1},
        {id: "Legal", concepto: "Legalización", precio: 850, ud: 1},
        {id: "ManoObra", concepto: "Instalación", precio: 1500, ud: 1},
        {id: "Estructura", concepto: "Estructura", precio: 750, ud: 1},
        {id: "KitElectrico", concepto: "KitElectrico", precio: 500, ud: 1},
        {id: "PowerMeter", concepto: "PowerMeter", precio: 100, ud: 1},
        {id: "BateriaModulo", concepto: "BateríaModulo", precio: 800, ud: 0},
        {id: "Baterias", concepto: "Baterias", precio: 2000, ud: 0},
        {id: "InstalacionBat", concepto: "InstalcionBat", precio: 480, ud: 0},
        {id: "Visita", concepto: "VisitaObra", precio: 0, ud: 1},
        {id: "Gestiones", concepto: "Gestiones", precio: 0, ud: 1},
        {id: "Descuento", concepto: "Descuento", precio: 0, ud: -1},
        {id: "ComunicacionObra", concepto: "ComunicacionObra", precio: 210, ud: 0},
        {id: "TramtacionIBI", concepto: "TramtacionIBI", precio: 390, ud: 0},
    ])

    return (
        products.map( (product, id) => (
            <Linea id={product.id} concepto={product.concepto} precio={product.precio} ud={product.ud}/>
        ))
    )
}

export default Lineas;