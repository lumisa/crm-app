const DatosPago = () => {

    const input = [
        {label: "IVA", name="iva"},
        {label: "Forma de pago", name="forma-pago"},
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

export default DatosPago