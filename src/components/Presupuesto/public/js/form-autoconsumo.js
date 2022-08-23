import Presupuesto from './Presupuesto.js'
import CalculadoraSolar from './CalculadoraSolar.js'
import TimeFormatter from '../../../../utils/TimeFormatter'
import NumberFormatter from '../../../../utils/NumberFormatter.js'
import Navbar from '../../../Navbar/Navbar';
import Profile from '../../../Profile.js';
import PanelAccounts from '../../../PanelAccounts';
import Login from '../../../Login.js'
import AccountDetail from '../../../AccountDetail';
import OpportunityList from '../../../OpportunityList';
import OpportunityDetail from '../../../OpportunityDetail';
import Contact from '../../../Contact';
import React, { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Auth from '../../../../services/ServiceAuth'
import { Main, Page } from '../css'
import Sidebar from '../../../Sidebar'
import Parametrizable from '../../../Parametrizable';

const nf = new NumberFormatter();
const tf = new TimeFormatter();


window.addEventListener('load',function() {



    const potencia = document.getElementById('potencia')
    const orientativo = document.getElementById('orientativo')
    const tension = document.getElementsByName('tension');
    const tejado = document.getElementsByName('tejado');
    const totalizadorData = document.getElementById('totalizadorData')
    const csvData = document.getElementById('csvData')


    //Inicial

    let presupuestoUd = {
        basic : {
            modulos: {
                ud: 5,
                importe: 160
            },
            inversor: {
                ud: 1,
                tension: tension[0].value,
                importe: 0,
                modelo: ''

            },
            legalizacion: {
                ud: 1,
                importe: 0,
            },
            manoObra: {
                ud: 1,
                importe: 0,
            },
            estructura: {
                ud: 1,
                tejado: tejado[0].value,
                importe: 0,
            },
            kitElectric: {
                ud: 1,
                importe: 500,
            },
            meter: {
                ud: 1,
                importe: 0,
            },
            bateriaPotencia: {
                ud: 0,
                importe: 826,
            },
            bateria: {
                ud: 0,
                importe: 2000,
            },
            bateriaInstalacion: {
                ud: 0,
                importe: 484,
            },
            visitaObra: {
                ud: 1,
                importe: 0,
            },
            gestion: {
                ud: 1,
                importe: 0,
            },
            descuento: {
                ud: -1,
                importe: 0,
            },
        },
        standard : {
            comunicacionObra: {
                ud: 0,
                importe: 211.5,
            },
        },
        premium : {
            ibi: {
                ud: 0,
                importe: 390,
            },
        },

    }

    let update = false
    let presupuestoClass = new Presupuesto(presupuestoUd, update)
    const jsDom = document.getElementById('js')
    const totalValue = document.getElementById('total')
    let conceptos = []
    let total = 0

    initialLoad()
    getPresupuesto(update)





    for (var i = 0; i < tejado.length; i++) {
        tejado[i].onchange = function() {
            console.log(this.value);
        }
    }

    for (var i = 0; i < tension.length; i++) {
        tension[i].onchange = function() {
            presupuestoUd.basic.inversor.tension = this.value
            getPresupuesto(update = true)
        }
    }

    for (let concepto of conceptos) {
        let ud = 'ud-'+concepto
        document.getElementById(ud).onchange = function() {

            Object.keys(presupuestoUd).forEach(function(key) {

                if (presupuestoUd[key].hasOwnProperty(concepto)) {
                    presupuestoUd[key][concepto].ud = document.getElementById(ud).value
    
                }
            })

            getPresupuesto(update = false)
            
            onChange(concepto)
        }

        let importe = 'importe-'+concepto
        document.getElementById(importe).onchange = function() {

            Object.keys(presupuestoUd).forEach(function(key) {

                if (presupuestoUd[key].hasOwnProperty(concepto)) {
                    presupuestoUd[key][concepto].importe = document.getElementById(importe).value
    
                }
            })

            getPresupuesto(update = true)
            
            onChange(concepto)
        }

        if (concepto == 'modulos') {

            onChange("inversor")
            onChange("manoObra")
        }


    }

    function initialLoad() {//render

        let localCsv = localStorage.getItem('csvData') ? localStorage.getItem('csvData') : null

        csvData.value = JSON.stringify(localCsv)

        Object.keys(presupuestoClass.getPresupuesto(update = false).package).forEach(modalidad => {
            jsDom.innerHTML += `<h5>${modalidad}</h5>`
    
            Object.entries(presupuestoClass.getPresupuesto(update = false).package[modalidad]).forEach(entry => {
                const [key, value] = entry
    
                jsDom.innerHTML += /*html*/`
                <div class="row form-group">
                <div class="col-6"><span id="concepto-${key}">${value.concepto} </span></div>
                    <div class="col-1">
                        <input type="number" step="1" class="form-control" value="${presupuestoUd[modalidad][key].ud}" id="ud-${key}" name="ud-${key}" title="Completar" placeholder="" style="width:100%;">
                    </div>
                    <div class="col-3">
                        <input type="number" step="0.01" class="form-control" value="${value.importe}" id="importe-${key}" name="importe-${key}" title="Completar" placeholder="" style="width:100%;">
                        </div>
                        <div class="col-2">
                        <input type="number" step="0.01" class="form-control" disabled value="${presupuestoUd[modalidad][key].ud * value.importe}" id="total-${key}" name="total-${key}" title="Completar" placeholder="" style="width:100%;">
                        
                    </div>
                </div>
                `
                conceptos.push(key)
    
                total += presupuestoUd[modalidad][key].ud * value.importe
            })

            
            totalValue.innerHTML = nf.currencyFormatDE(total)
            
        })

    }


    function getPresupuesto(update) {

        presupuestoClass = new Presupuesto(presupuestoUd, update)

        let data = document.getElementById('data')
        
        data.value = JSON.stringify(presupuestoClass)


        potencia.innerHTML = presupuestoClass.getPotencia()+' W'

        orientativo.innerHTML = nf.numberFormat(presupuestoClass.desglosePresupuesto.orientativo.fee, 2)+ ' €'
        orientativo.innerHTML += '<br>comisión 5%: '+nf.numberFormat((presupuestoClass.desglosePresupuesto.orientativo.fee*0.05), 2)+ ' €'

        for (let concepto in conceptos) {
            let totalConcepto = document.getElementById('total-'+conceptos[concepto])
            total += Number(totalConcepto.value)
        }

        onChange("inversor")
        onChange("manoObra")
        onChange("estructura")
        onChange("legalizacion")
        onChange("meter")



    }



    function onChange(name) {

        let udInput = document.getElementById('ud-'+name)
        let importeInput = document.getElementById('importe-'+name)
        let totalInput = document.getElementById('total-'+name)
        let concepto = document.getElementById('concepto-'+name)

        Object.keys(presupuestoClass.desglosePresupuesto.package).forEach(function(key) {

            if (presupuestoClass.desglosePresupuesto.package[key].hasOwnProperty(name)) {

                udInput.value = presupuestoClass.desglosePresupuesto.package[key][name].ud

                importeInput.value = presupuestoClass.desglosePresupuesto.package[key][name].importe
        
                concepto.innerHTML = presupuestoClass.desglosePresupuesto.package[key][name].descripcion
            }
        })




        totalInput.value = udInput.value * importeInput.value


        total = 0

        for (let concepto in conceptos) {
            let totalConcepto = document.getElementById('total-'+conceptos[concepto])
            total += Number(totalConcepto.value)
        }

        totalValue.innerHTML = nf.currencyFormatDE(total)
    }



    let csv = document.getElementById('csv')

    csv.addEventListener('change', function(){
        csvJSON()
    })
    
    
    function csvJSON(){
        
        const input = csv.files[0];
        const reader = new FileReader();
        
        reader.onload = function (e) {
            const text = e.target.result;
            const data = csvToArray(text);
            
            localStorage.setItem('csvData', JSON.stringify(data))

            csvData.value = JSON.stringify(data)

            const calculadoraSolar = new CalculadoraSolar(data)

            totalizadorData.value = JSON.stringify(calculadoraSolar.getTotalizador())
            csvData.value = JSON.stringify(calculadoraSolar.getArray())
            
            
        };

        reader.readAsText(input);
    }

    function csvToArray(str, delimiter = ';') {
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

  
  })