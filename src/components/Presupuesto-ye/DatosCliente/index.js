const DatosCliente = () => {

    const input = [
        {label: "Razon Social", name: "razon-social"},
        {label: "NIF", name: "nif"},
        {label: "email", name: "email"},
        {label: "Teléfono", name: "telefono"},
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

export default DatosCliente