import { Grid, Right, Left } from './styles'
import PrecioEnergia from '../PrecioEnergia'
import Adjuntos from '../Adjuntos'
import { useState } from 'react'

const Rendimiento = () => {

    let keyArray = {
        'Mes':                                          [],
        'Rendimiento energético [kWh]':                 [],
        'Rendimiento energético porcentual [%]':        [], 
        'Coeficiente de rendimiento [%]':               [], 
        'Consumo [kWh]':                                [],
        'Autoconsumo [kWh]':                            [],
        'Cuota de autoconsumo [%]':                     [], 
        'Toma de red [kWh]':                            [],
        'Inyección a la red [kWh]':                     [],
        'Potencia de consumo de la red máx. [kW]':      [],
        'Cuota autárquica [%]':                         [],

    }

    const [csvData, setCsvData] = useState(keyArray)

    const handleOnChange = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader();

        reader.onload = (e) => {
            const text = e.target.result
            const data = csvToArray(text)
            
            let tempObj = keyArray
            
            data.forEach((mes) => {
                
                Object.entries(mes).forEach(([key, value]) => {
                    key = key.replaceAll('"', '')
                    key = key.replaceAll('\r', '')
                    key === 'es' ? key = 'Mes' : key = key
                    if (typeof value === 'string')
                    {
                        value = value.replaceAll('"', '')
                        value = value.replaceAll('\r', '')
                        
                    }
                    tempObj[key].push(parseInt(value, 10))


                    setCsvData({...csvData, [key]: [...tempObj[key], parseInt(value, 10)] })
                    
                    
                })
                
            })
            

            
        }
        
        reader.readAsText(file);


    }

    const deleteTableValue = () => {

    }


    const csvToArray = (str, delimiter = ';') => {
        // slice from start of text to the first \n index
        // use split to create an array from string by delimiter
        const headers = str.slice(1, str.indexOf("\n")).split(delimiter);

        // slice from \n index + 1 to the end of the text
        // use split to create an array of each csv value row
        const rows = str.slice(str.indexOf('\n') + 1).split('\n');

        // Map the rows
        // split values from each row into an array
        // use headers.reduce to create an object
        // object properties derived from headers:values
        // the object passed as an element of the array
        const arr = rows.map(function (row) {
            const values = row.split(delimiter);
            const el = headers.reduce(function (object, header, index) {
            object[header] = values[index];
            return object;
            }, {});
            return el;
        });

        // return the array
        return arr;

    }


    return (
        <Grid>
            <Right>
                <PrecioEnergia/>
                <Adjuntos/>

                <>
                    <label>csv</label>
                    <input type="file" name="csv" onChange={(e) => handleOnChange(e)}/>
                </>

            </Right>

            <Left>

                <table cellPadding={'1rem'}>
                    {
                        Object.entries(csvData).map(([key, value]) => {

                            return (
                                <tr>
                                    <td>{key}</td>
                                    {value.map((el) => (
                                        <td>{el}</td>
                                    ))}

                                </tr>

                            )
            

                        })
                    }



                </table>

                <button onClick={deleteTableValue()}>Borrar Datos</button>



            </Left>

        </Grid>

    )
}

export default Rendimiento