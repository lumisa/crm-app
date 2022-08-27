import Inversor from './Inversor.js'
import PreciokWh from './PreciokWh.js'

export default class Presupuesto {

    constructor(presupuestoUd, update) {

        this.presupuestoUd = presupuestoUd;

        this.update = update;

        this.modulo = {
            kW : 450,
            precio : 160,
            estructura : 50,
            legalizacion : 50,
            manoObra : 170.51,
        }
        
        this.minInstalation = {
            feePerkW : 1.95,
            modulo : 5,
            estructura : 550,
            manoObra : 1200,
            visitaObra: 0,
            legalizacion : 850,
            reductionPerkW : 0.00506912442397001,
        }

        this.kW = this.presupuestoUd.basic.modulos.ud * this.modulo.kW


        this.modulos = {
            kW : this.presupuestoUd.basic.modulos.ud * this.modulo.kW,
            fee : this.getValor()
        }

        this.desglosePresupuesto = {
            package : {
                basic : {
                    modulos: {
                        ud: this.presupuestoUd.basic.modulos.ud,
                        concepto: 'Módulos',
                        descripcion:'Trina Solar TALLMAX 450W.',
                        importe: this.presupuestoUd.basic.modulos.importe,
                        total: this.presupuestoUd.basic.modulos.ud * this.presupuestoUd.basic.modulos.importe
                    },
                    inversor: this.getPriceInversor(),
                    legalizacion: this.getPriceLegalizacion(),
                    manoObra: this.getPriceManoObra(),
                    estructura: this.getPriceEstructura(),
                    kitElectric: {
                        ud: this.presupuestoUd.basic.kitElectric.ud,
                        concepto: 'Kit eléctrico',
                        descripcion:'Kit material eléctrico y protecciones: Cableado, protecciones CC/CA, caja de protecciones, canalizaciones,fijaciones.',
                        importe: this.presupuestoUd.basic.kitElectric.importe,
                        total: this.presupuestoUd.basic.kitElectric.ud * this.presupuestoUd.basic.kitElectric.importe,
                    },
                    meter: this.getPriceMeter(),
                    bateriaPotencia: {
                        ud: this.presupuestoUd.basic.bateriaPotencia.ud,
                        concepto: 'Bateria Módulo Potencia',
                        descripcion:'Huawei LUNA2000 Módulo Potencia',
                        importe: this.presupuestoUd.basic.bateriaPotencia.importe,
                        total: this.presupuestoUd.basic.bateriaPotencia.ud * this.presupuestoUd.basic.bateriaPotencia.importe,
                    },
                    bateria: {
                        ud: this.presupuestoUd.basic.bateria.ud,
                        concepto: 'Baterias',
                        descripcion:'Huawei LUNA2000 Módulo Bateria',
                        importe: this.presupuestoUd.basic.bateria.importe,
                        total: this.presupuestoUd.basic.bateria.ud * this.presupuestoUd.basic.bateria.importe,
                    },
                    bateriaInstalacion: {
                        ud: this.presupuestoUd.basic.bateriaInstalacion.ud,
                        concepto: 'Instalación Bateria',
                        descripcion:'Material Eléctrico e instalación de bateria',
                        importe: this.presupuestoUd.basic.bateriaInstalacion.importe,
                        total: this.presupuestoUd.basic.bateriaInstalacion.ud * this.presupuestoUd.basic.bateriaInstalacion.importe,
                    },
                    visitaObra: {
                        ud: this.presupuestoUd.basic.visitaObra.ud,
                        concepto: 'Visita de obra',
                        descripcion:'Visita técnica a la instalación fotovoltaica.',
                        importe: this.presupuestoUd.basic.visitaObra.importe,
                        total: this.presupuestoUd.basic.visitaObra.ud * this.presupuestoUd.basic.visitaObra.importe,
                    },
                    gestion: {
                        ud: this.presupuestoUd.basic.gestion.ud,
                        concepto: 'Gestiones',
                        descripcion:'Gestión de todos los trámites conforme la normativa vigente.',
                        importe: this.presupuestoUd.basic.gestion.importe,
                        total: this.presupuestoUd.basic.gestion.ud * this.presupuestoUd.basic.gestion.importe,
                    },
                    descuento: {
                        ud: this.presupuestoUd.basic.descuento.ud,
                        concepto: 'Descuento',
                        descripcion:'Descuento',
                        importe: this.presupuestoUd.basic.descuento.importe,
                        total: this.presupuestoUd.basic.descuento.ud * this.presupuestoUd.basic.descuento.importe,
                    },
                },
                standard : {
                    comunicacionObra: {
                        ud: this.presupuestoUd.standard.comunicacionObra.ud,
                        concepto: 'Comunicación de obra',
                        descripcion:'Comunicación previa de licencia de obra al Ayuntamiento competente.',
                        importe: this.presupuestoUd.standard.comunicacionObra.importe,
                        total: this.presupuestoUd.standard.comunicacionObra.ud * this.presupuestoUd.standard.comunicacionObra.importe,
                    },
                },
                premium : {
                    ibi: {
                        ud: this.presupuestoUd.premium.ibi.ud,
                        concepto: 'Tramitación IBI',
                        descripcion:'Tramitación de la bonificación fiscal en el Impuesto de Bienes Inmuebles (IBI).',
                        importe: this.presupuestoUd.premium.ibi.importe,
                        total: this.presupuestoUd.premium.ibi.ud * this.presupuestoUd.premium.ibi.importe,
                    },
                },
            },
            orientativo : {
                fee : this.getValor()
            }
        }

        this.total = this.getTotal()





    }

    getTotal() {
        let totalAcum = 0

        Object.keys(this.desglosePresupuesto.package).forEach(modalidad => {

            Object.keys(this.desglosePresupuesto.package[modalidad]).forEach(concepto => {
                
                Object.entries(this.desglosePresupuesto.package[modalidad][concepto]).forEach(entry => {
                    const [key, value] = entry

                    if (key == 'total') {
                        totalAcum += value

                    }
                    
                })
    
            })
            
        })

        return totalAcum

    }

    getPresupuesto() {

        let presupuesto = this.desglosePresupuesto

        return presupuesto
    }

    getPriceGestion() {

        
    }

    getPriceEstructura() {

        const from5modulo = this.presupuestoUd.basic.modulos.ud - this.minInstalation.modulo
        const value =  ( from5modulo * this.modulo.estructura ) + this.minInstalation.estructura

        let estructura =  this.presupuestoUd.basic.estructura.importe == 0 || this.update == false ? value : Number(this.presupuestoUd.basic.estructura.importe)


        let output = {
            ud: this.presupuestoUd.basic.estructura.ud,
            concepto: 'Estructura',
            descripcion:'Kit estructura NOVOTEGRA coplanar. Incluido fijaciones con epoxi y aislamiento de las perforaciones.',
            importe: estructura.toFixed(2),
            total: this.presupuestoUd.basic.estructura.ud * estructura,
        }


        return output

        
    }

    getPriceLegalizacion () {

        const from5modulo = this.presupuestoUd.basic.modulos.ud - this.minInstalation.modulo

        
        const value =  this.minInstalation.legalizacion
        

        let legalizacion =  this.presupuestoUd.basic.legalizacion.importe == 0 || this.update == false ? value : Number(this.presupuestoUd.basic.legalizacion.importe)



        let output = {
            ud: this.presupuestoUd.basic.legalizacion.ud,
            concepto: 'Legalización',
            descripcion:'Legalización conforme normativa vigente. Certificado de Instalación Eléctrica (CIE).',
            importe: legalizacion.toFixed(2),
            total: this.presupuestoUd.basic.legalizacion.ud * legalizacion,
        }

        return output
    }

    getPriceManoObra() {
        const from5modulo = this.presupuestoUd.basic.modulos.ud - this.minInstalation.modulo
        const value =  ( from5modulo * this.modulo.manoObra ) + this.minInstalation.manoObra

        let manoObra =  this.presupuestoUd.basic.manoObra.importe == 0  || this.update == false ? value : Number(this.presupuestoUd.basic.manoObra.importe)



        let output = {
            ud: this.presupuestoUd.basic.manoObra.ud,
            concepto: 'Mano de obra',
            descripcion:'Instalación y puesta en marcha del sistema fotovoltaico.',
            importe: manoObra.toFixed(2),
            total: this.presupuestoUd.basic.manoObra.ud * manoObra,
        }

        return output
    }

    getPriceInversor() {
        const tension = this.presupuestoUd.basic.inversor.tension
        const potenciaInversor = this.modulos.kW


        const inversor = new Inversor(tension, potenciaInversor);
        let output = new Object();
        
        output = inversor.getPrecio()

        let precioXkW =  this.presupuestoUd.basic.inversor.importe == 0 || this.update == false ? output.importe : Number(this.presupuestoUd.basic.inversor.importe)
        output.importe = precioXkW.toFixed(2)
        output.total = output.ud * precioXkW
        return output;
    }

    getPriceMeter() {

        const tension = this.presupuestoUd.basic.inversor.tension

        const meter = {
            ud: 1,
            descripcion:'',
            importe: 0,
            total: 0,
        }
        
        if (tension === 'monofasico')
        {
            meter.importe = 108
            meter.descripcion = 'Power Meter Monofásico 1 fase 100A toroidales incluidos'
            
        } 
        else if (tension === 'trifasico')
        { 
            meter.importe = 198
            meter.descripcion = 'Power Meter Trifásico 3 fases 250A toroidales incluidos'
        }
        meter.total = meter.ud * meter.importe

        return meter;


    }

    getValor() {

        const potenciaIns = this.kW

        const precioKwh = new PreciokWh(potenciaIns);

        const value = precioKwh.getPrecio().orientativo;

        return value 
    }

    getPotencia() {
        return this.modulos.kW
    }


    getFee() {
        return this.modulos.fee
    }

    getQuote() {
        
    }


}