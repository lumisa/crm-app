const DatosInstalacion = () => {

    const input = [
        {label: "Dirección del suministro", name="direccion-suministro"},
        {label: "Código Postal", name="cp"},
        {label: "Localidad", name="localidad"},
    ]


    return (
        <>
        {input.map((el) => (

            <>
                <label>{el.label}</label>
                <input name={el.name} />            
            </>
            ))}
        </>

    )
}

export default DatosInstalacion