const Adjuntos = () => {


const input = [
    {label: "Archivo CSV", name="csv"},
    {label: "Imagen de la ubicación", name="ubicacion"},
    {label: "Rendimiento diario", name="rendimiento-diario"},
    {label: "Rendimiento mensual", name="rendimiento-mensual"},
]


return (
    <>
    {input.map((el) => (

        <>
            <label>{el.label}</label>
            <input type="file" name={el.name} />            
        </>
        ))}
    </>

)}

export default Adjuntos