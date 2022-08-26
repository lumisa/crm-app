
export default class CalculadoraSolar {

    constructor(csv) {

        this.csv = csv;

        this.keyObj = {
            'Mes': 'mes',
            'Rendimiento energético [kWh]': 'rendimientoEnergeticokWh',
            'Rendimiento energético porcentual [%]': 'rendimientoEnergeticoPorcentual', 
            'Coeficiente de rendimiento [%]': 'coeficienteRentimiento', 
            'Consumo [kWh]':  'consumo',
            'Autoconsumo [kWh]':  'autoconsumo',
            'Cuota de autoconsumo [%]': 'cuotaAutoconsumo', 
            'Toma de red [kWh]': 'tomaRed',
            'Inyección a la red [kWh]':  'inyeccionRed',
            'Potencia de consumo de la red máx. [kW]':  'PotenciaConsumoRedMax',
            'Cuota autárquica [%]':  'coutaAutarquica',
            
            
        }
        
    }

    
    getTotalizador() {

        let keyArray = {
            'Mes': [],
            'Rendimiento energético [kWh]': [],
            'Rendimiento energético porcentual [%]': [], 
            'Coeficiente de rendimiento [%]': [], 
            'Consumo [kWh]': [],
            'Autoconsumo [kWh]': [],
            'Cuota de autoconsumo [%]': [], 
            'Toma de red [kWh]': [],
            'Inyección a la red [kWh]': [],
            'Potencia de consumo de la red máx. [kW]':  [],
            'Cuota autárquica [%]': [],


        }
        

        this.csv.forEach(function(mes) {

            Object.entries(mes).forEach(function([key, value]) {

                key = key.replaceAll('"', '')
                key = key.replaceAll('\r', '')
                key === 'es' ? key = 'Mes' : key = key
                if (typeof value === 'string')
                {
                    value = value.replaceAll('"', '')
                    value = value.replaceAll('\r', '')
        
                }
                keyArray[key].push(parseInt(value, 10))


                
    
    
            })


        })



        return {
            'RendimientoEnergetico':  this.sumArray(keyArray['Rendimiento energético [kWh]']),
            'RendimientoEnergeticoPorcentual': this.promedioArray(keyArray['Rendimiento energético porcentual [%]']), 
            'CoeficientRendimiento': this.promedioArray(keyArray['Coeficiente de rendimiento [%]']), 
            'Consumo': this.sumArray(keyArray['Consumo [kWh]']),
            'Autoconsumo':this.sumArray(keyArray['Autoconsumo [kWh]']),
            'CuotaAutoconsumo': this.promedioArray(keyArray['Cuota de autoconsumo [%]']), 
            'TomaRed': this.sumArray(keyArray['Toma de red [kWh]']),
            'InyeccionRed': this.sumArray(keyArray['Inyección a la red [kWh]']),
            'CuotaAutarquica': this.promedioArray(keyArray['Cuota autárquica [%]']), 

        }
    }

    getArray() {
        let keyArray = {
            'Mes': [],
            'Rendimiento energético [kWh]': [],
            'Rendimiento energético porcentual [%]': [], 
            'Coeficiente de rendimiento [%]': [], 
            'Consumo [kWh]': [],
            'Autoconsumo [kWh]': [],
            'Cuota de autoconsumo [%]': [], 
            'Toma de red [kWh]': [],
            'Inyección a la red [kWh]': [],
            'Potencia de consumo de la red máx. [kW]':  [],
            'Cuota autárquica [%]': [],


        }

        this.csv.forEach(function(mes) {

            Object.entries(mes).forEach(function([key, value]) {

                key = key.replaceAll('"', '')
                key = key.replaceAll('\r', '')
                key === 'es' ? key = 'Mes' : key = key

                if (typeof value === 'string')
                {
                    value = value.replaceAll('"', '')
                    value = value.replaceAll('\r', '')
        
                }
                keyArray[key].push(parseInt(value, 10))

                
    
    
            })


        })


        return {
            'RendimientoEnergetico':  keyArray['Rendimiento energético [kWh]'],
            'RendimientoEnergeticoPorcentual': keyArray['Rendimiento energético porcentual [%]'], 
            'CoeficientRendimiento': keyArray['Coeficiente de rendimiento [%]'], 
            'Consumo': keyArray['Consumo [kWh]'],
            'Autoconsumo':keyArray['Autoconsumo [kWh]'],
            'CuotaAutoconsumo': keyArray['Cuota de autoconsumo [%]'], 
            'TomaRed': keyArray['Toma de red [kWh]'],
            'InyeccionRed': keyArray['Inyección a la red [kWh]'],
            'CuotaAutarquica': keyArray['Cuota autárquica [%]'], 

        }





    }

    sumArray(array) {
        let sum = 0
        for (let i = 0; i < array.length; i++) {
            sum += array[i]
        }
        return sum
    }

    promedioArray(array) {
        let sum = 0
        let promedio = 0
        for (let i = 0; i < array.length; i++) {
            sum += array[i];
            

        }
        promedio = sum / array.length
        return promedio
    }



}