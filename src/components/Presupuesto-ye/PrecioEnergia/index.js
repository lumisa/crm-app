const PrecioEnergia = () => {

    const input = [
        {label: "Precio de Venta", name: "precio-venta", value: "0.08"},
        {label: "Precio de Compra", name: "precio-compra", value: "0.35"},
    ]

    return (

        <>
        {input.map((el) => (
            <>

            <label>{el.label}</label>
            <input name={el.name} defaultValue={el.value}/>
            </>
            ))}
        </>

    )
}

export default PrecioEnergia