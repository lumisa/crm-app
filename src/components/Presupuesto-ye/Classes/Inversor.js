export default class Inversor {

    constructor(tension, potencia) {

        this.concepto = 'Inversor '

        this.inversor = {
            monofasico: {
                3000 : {
                    ud: 1,
                    concepto: this.concepto,
                    descripcion: this.concepto+
                    'Huawei 2KTL-L1',
                    importe: 583.99,
                },
                4500 : {
                    ud: 1,
                    concepto: this.concepto,
                    descripcion: this.concepto+
                    'Huawei 3KTL-L1',
                    importe: 794,
                },
                5520 : {
                    ud: 1,
                    concepto: this.concepto,
                    descripcion: this.concepto+
                    'Huawei 3.68KTL-L1',
                    importe: 854.45,
                },
                6000 : {
                    ud: 1,
                    concepto: this.concepto,
                    descripcion: this.concepto+
                    'Huawei 4KTL-L1',
                    importe: 989,
                },
                6900 : {
                    ud: 1,
                    concepto: this.concepto,
                    descripcion: this.concepto+
                    'Huawei 4.6KTL-L1',
                    importe: 949.61,
                },
                7500 : {
                    ud: 1,
                    concepto: this.concepto,
                    descripcion: this.concepto+
                    'Huawei 5KTL-L1',
                    importe: 1009,
                    ud: 1,
                },
                9000 : {
                    ud: 1,
                    concepto: this.concepto,
                    descripcion:this.concepto+
                    'Huawei 6KTL-L1',
                    importe: 1424.95,
                },
            },
            trifasico: {
                4500 : {
                    ud: 1,
                    concepto: this.concepto,
                    descripcion: this.concepto+
                    'Huawei 3KTL-M1',
                    importe: 1000.72,
                },
                6000 : {
                    ud: 1,
                    concepto: this.concepto,
                    descripcion: this.concepto+
                    'Huawei 4KTL-M1',
                    importe: 1045.44,
                },
                7500 : {
                    ud: 1,
                    concepto: this.concepto,
                    descripcion: this.concepto+
                    'Huawei 5KTL-M1',
                    importe: 1053.99,
                },
                9000 : {
                    ud: 1,
                    concepto: this.concepto,
                    descripcion: this.concepto+
                    'Huawei 6KTL-M1',
                    importe: 1234.78,
                },
                12000 : {
                    ud: 1,
                    concepto: this.concepto,
                    descripcion: this.concepto+
                    'Huawei 8KTL-M1',
                    importe: 1612.72,
                },
                15000 : {
                    ud: 1,
                    concepto: this.concepto,
                    descripcion: this.concepto+
                    'Huawei 10KTL-M1',
                    importe: 1654.79,
                },
                18000 : {
                    ud: 1,
                    concepto: this.concepto,
                    descripcion: this.concepto+
                    'Huawei 12KTL-M1',
                    importe: 1762.36,
                },
                22500 : {
                    ud: 1,
                    concepto: this.concepto,
                    descripcion: this.concepto+
                    'Huawei 15KTL-M1',
                    importe: 1877.88,
                },
                25500 : {
                    ud: 1,
                    concepto: this.concepto,
                    descripcion: this.concepto+
                    'Huawei 17KTL-M1',
                    importe: 1916.68,
                },
                30000 : {
                    ud: 1,
                    concepto: this.concepto,
                    descripcion: this.concepto+
                    'Huawei 30KTL',
                    importe: 2399.44,
                },
                36000 : {
                    ud: 1,
                    concepto: this.concepto,
                    descripcion: this.concepto+
                    'Huawei 36KTL',
                    importe: 2658.05,
                },
                40000 : {
                    ud: 1,
                    concepto: this.concepto,
                    descripcion: this.concepto+
                    'Huawei 40KTL',
                    importe: 2859.20,
                },
                60000 : {
                    ud: 1,
                    concepto: this.concepto,
                    descripcion: this.concepto+
                    'Huawei 60KTL',
                    importe: 3388.90,
                },
                100000 : {
                    ud: 1,
                    concepto: this.concepto,
                    descripcion: this.concepto+
                    'Huawei 100KTL',
                    importe: 4873.60,
                },
                185000 : {
                    ud: 1,
                    concepto: this.concepto,
                    descripcion:this.concepto+
                    'Huawei 185KTL',
                    importe: 6638.90,
                },
                200000 : {
                    ud: 1,
                    concepto: this.concepto,
                    descripcion: this.concepto+
                    'Huawei 215KTL',
                    importe: 7055.56,
                },
            },
        }

        this.tension = tension
        this.potencia = potencia




        this.rangoPotencia = {
            monofasico : [
                3000,
                4500,
                5520,
                6000,
                6900,
                7500,
                9000,
            ],
            trifasico : [
                4500,
                6000,
                7500,
                9000,
                12000,
                15000,
                18000,
                22500,
                25500,
                30000,
                36000,
                40000,
                60000,
                100000,
                185000,
                200000,

            ],

        }

        this.potenciaInversor = 0




    }

    getPrecio() {

        let inversor = new Object();

        console.log(this.rangoPotencia[this.tension].length);


        if (this.potencia < this.rangoPotencia[this.tension][this.rangoPotencia[this.tension].length - 1] ) {
            this.getRango(this.potencia)
            
            inversor = this.inversor[this.tension][this.potenciaInversor]
            console.log(inversor);
            inversor.ud = 1
            
            console.log(inversor);
            
        } else if (this.potencia >= this.rangoPotencia[this.tension][this.rangoPotencia[this.tension].length - 1] ){
            
            
            let mitadPotencia = this.potencia / 2
            this.getRango(mitadPotencia)
            inversor = this.inversor[this.tension][this.potenciaInversor]
            console.log(inversor);
            inversor.ud = 2

            

        }


        

        return inversor;

    }

    getRango(potencia) {

        let i = 0

        return this.checkRango(potencia, i)


    }

    checkRango(potencia, i) {


        if ( potencia <= this.rangoPotencia[this.tension][i] ) {


            this.potenciaInversor = this.rangoPotencia[this.tension][i]
            
            
        } else if (i < this.rangoPotencia[this.tension].length) {
            i++
            
            this.checkRango(potencia, i)
            
        }



    }



}