export default class Inversor {

    constructor(panel) {

        this.concepto = 'Inversor Huawei '

        this.gestion = {

            5 : {
                importe: 202.38,
            },
            10 : {
                importe: 855.94,
            },
            20 : {
                importe: 1134.24,
            },
            40 : {
                importe: 798.02,
            },
            44 : {
                importe: 834.79,
            },
        }

        this.panel = panel

        this.indicePanel = 0

        this.rangoPanel = [
                5,
                10,
                20,
                40,
                44,
            ]



    }

    getPrecio() {

        this.getRango()

        

        return this.gestion[this.indicePanel];

    }

    getRango() {

        let i = 0

        return this.checkRango(i)


    }

    checkRango(i) {


        if ( this.panel <= this.rangoPanel[i] ) {


            this.indicePanel = this.rangoPanel[i]
            
            
        } else if (i < this.rangoPanel[i].length) {
            i++
            
            this.checkRango(i)
            
        }



    }



}