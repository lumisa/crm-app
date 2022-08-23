<?php
include_once '../../include/nav.php';


?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <script src="js/form-autoconsumo.js" type="module"></script>
    
</head>
<body>
    
    <div class="container">      
        <form enctype="multipart/form-data" action="../src/controller/autoconsumoController.php" method="POST" class="col-12" style="padding-top: 30px; padding-bottom: 30px;">
            <input type="hidden" id="data" name="data" value="">
            <input type="hidden" id="totalizadorData" name="totalizadorData" value="">
            <input type="hidden" id="csvData" name="csvData" value="">
            <div class="text-center"><h2>Presupuesto Instalación paneles solares</h2></div>  
              
            <div>
                <div class="row">
                    <div class="form-group col-4">
                        <label>Tensión</label>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="tension" value="monofasico" checked>
                            <label class="form-check-label" for="flexRadioDefault1">
                                Monofásico
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="tension" value="trifasico" id="trifasico">
                            <label class="form-check-label" for="flexRadioDefault2">
                                Trifásico
                            </label>
                        </div>
                    </div>
    
                    <div class="form-group col-4">
                        <label>Tejado</label>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="tejado" id="plano" value="plano" checked>
                            <label class="form-check-label" for="flexRadioDefault1">
                                Plano
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="tejado" value="inclinado" id="inclinado">
                            <label class="form-check-label" for="flexRadioDefault2">
                                inclinado
                            </label>
                        </div>
                    </div>
                </div>

                <div id="js">
                <h4>Desglose Presupuesto</h4>
                    
    
                </div>
                <div class="row">
                    <div class="form-group col-6">
                        <label>Desglose Presupuesto</label>
                        <select class="form-select" name="desglosePresupuesto">
                            <option value="1" selected>Con desglose</option>
                            <option value="2">Sin desglose</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-6">
                    <label>Precio Venta</label>
                        <input class="form-control" type="number" step="0.01" name="precioVenta" id="precioVenta" value="0.08">
                    </div>
                    <div class="form-group col-6">
                    <label>Precio Compra</label>
                        <input class="form-control" type="number" step="0.01" name="precioCompra" id="precioCompra" value="0.35">
                    </div>
                </div>
                
                
                <div class="row">
                    <div class="col-2 offset-10 text-right" style="position: fixed; right: 0; bottom: 0; z-index: 3000; background-color: white;">
                        <h2 id="total"></h2>
                        <p>basico orientativo <span id="orientativo"></span></p>
                        <p id="potencia"></p>
                    </div>
                </div>
            </div>


            <div style="padding:40px 0px">
                <h4>Datos el cliente</h4>
                <div class="row">
                    <div class="form-group col-12 col-lg-9">
                        <label>Razón social</label>
                        <input id="razonSocial" name="razonSocial" class="form-control" type="text" title="Completar" placeholder="Razón social" style="width:100%;"/>
                    </div>
                    <div class="form-group col-12 col-lg-3">
                        <label>NIF/NIE</label>
                        <input type="text" name="nif" onKeyUp="this.value = this.value.toUpperCase();" maxlength="9" minlength="9" class="form-control" id="cif" placeholder="NIF/NIE" style="width:100%" pattern="[a-zA-Z0-9]{1}[0-9]{7}[a-zA-Z0-9]{1}"/>
                    </div>

                    <div class="form-group col-12 col-lg-7">
                        <label>Email</label>
                        <input name="email" class="form-control" id="email" type="email" title="Es necesario email válido" placeholder="Email"  style="width:100%" />
                    </div>

                    <div class="form-group col-12 col-lg-5">
                        <label>Teléfono</label>
                        <input type="text" class="form-control" id="tel" name="tel" placeholder="Teléfono" pattern="(6|7)[0-9]{8}$" title="debe ser un móvil para recibir un SMS" maxlength="9" minlength="9" style="width:100%" />
                    </div>
                </div>


                <h4>Datos de la Instalación</h4>

                <div class="row">
                    <div class="form-group col-12 col-lg-2">
                        <label for="tipoVia">Tipo Vía</label>
                        <select name="tipoVia" id="tipoVia" class="form-control custom-select">
                            <option selected="selected" value="Calle">Calle</option>
                            <option value="Avenida">Avenida</option>
                            <option value="Plaza">Plaza</option>
                            <option value="Acceso">Acceso</option>
                            <option value="Afueras">Afueras</option>
                            <option value="Agrupación">Agrupación</option>
                            <option value="Alameda">Alameda</option>
                            <option value="Arrabal">Arrabal</option>
                            <option value="Autopista">Autopista</option>

                            <option value="Barranco">Barranco</option>
                            <option value="Barriada">Barriada</option>
                            <option value="Bloque">Bloque</option>
                            <option value="Barrio">Barrio</option>
                            <option value="Colonia">Colonia</option>
                            <option value="Callejón">Callejon</option>
                            <option value="Carril">Carril</option>

                            <option value="Complejo">Complejo</option>
                            <option value="Camino">Camino</option>
                            <option value="Cooperativa">Cooperativa</option>
                            <option value="Carretera">Carretera</option>
                            <option value="Casa">Casa</option>
                            <option value="Cuesta">Cuesta</option>
                            <option value="Diseminado">Diseminado</option>
                            <option value="Edificio">Edificio</option>
                            <option value="Entrada">Entrada</option>
                            <option value="Finca">Finca</option>
                            <option value="Ficticio">Ficticio</option>
                            <option value="Glorieta">Glorieta</option>
                            <option value="Grupo">Grupo</option>
                            <option value="Masia">Masia</option>
                            <option value="Muelle">Muelle</option>
                            <option value="Manzana">Manzana</option>
                            <option value="Nucleo">Nucleo</option>
                            <option value="Parque">Parque</option>
                            <option value="Poblado">Poblado</option>
                            <option value="Partida">Partida</option>
                            <option value="Paseo">Paseo</option>
                            <option value="Pol">Pol</option>
                            <option value="Paraje">Paraje</option>
                            <option value="Pantalan">Pantalan</option>
                            <option value="Poligono">Poligono</option>
                            <option value="Prolongacion">Prolongacion</option>
                            <option value="Pasaje">Pasaje</option>
                            <option value="Plazoleta">Plazoleta</option>
                            <option value="Playa">Playa</option>

                            <option value="Rambla">Rambla</option>
                            <option value="Ronda">Ronda</option>
                            <option value="Residencial">Residencial</option>
                            <option value="Senda">Senda</option>
                            <option value="Travesia">Travesia</option>
                            <option value="Urbanizacion">Urbanizacion</option>
                            <option value="Vial">Vial</option>
                            <option value="Zona">Zona</option>
                        </select>
                    </div>
                    <div class="form-group col-12 col-lg-5">
                        <label for="address">Dirección del suministro</label>
                        <input type="text" class="form-control" id="direccionInstalacion" name="direccionInstalacion">
                    </div>
                    <div class="form-group col-12 col-lg-2">
                        <label for="cp">Código postal</label>
                        <input type="text" class="form-control" id="cpInstalacion" name="cpInstalacion">
                    </div>
                    <div class="form-group col-12 col-lg-3">
                        <label for="municipio">Localidad</label>
                        <input type="text" class="form-control" id="municipioInstalacion" name="municipioInstalacion">
                    </div>
                </div>

                <div class="row">
                    <div class="form-group col-6">
                        <label for="m2">m2</label>
                        <input type="text" class="form-control" id="m2" name="m2">
                    </div>

                    <div class="form-group col-6">
                        <label>Tipo Autoconsumo</label>
                        <select id="tipo" name="tipo" class="form-control custom-select">
                            <option selected value="Autoconsumo con excedentes con compensación de excedentes">Autoconsumo con excedentes con compensación de excedentes</option>
                            <option value="Autoconsumo con excedentes sin compensación de excedentes">Autoconsumo con excedentes sin compensación de excedentes</option>
                            <option value="Autoconsumo sin excedentes">Autoconsumo sin excedentes</option>
                        </select>
                    </div>
                </div>



                <h4>Forma de pago</h4>
                <div class="row">
                    <div class="form-group col-6">
                        <label>IVA</label>
                        <select name="iva" id="iva" class="form-control custom-select">
                            <option selected value="">Escoge una opción</option>
                            <option name="iva21" id="iva21" value="21" selected>21 %</option>
                            <option name="iva10" id="iva10" value="10">10 %</option>
                            <option name="iva5" id="iva5" value="5">5 %</option>
                        </select>
                    </div>
                    <div class="form-group col-6">
                        <label>Forma de pago</label>
                        <select name="pago" id="pago" class="form-control custom-select">
                            <option selected value="">Escoge una opción</option>
                            <option name="financiado" id="financiado" value="financiado">Financiado</option>
                            <option name="contado" id="contado" value="contado">Al contado</option>
                        </select>
<!--                             <div class="form-group col-6" id="inpPago" onchange="showFrac()" style="display: none">
                        <label>Al contado</label>
                        <select name="pagocontado" id="pagocontado" class="custom-select">
                            <option selected value="">Escoge una opción</option>
                            <option name="1" value="1">Al contado (2 plazos)</option>
                            <option name="2" value="2">Fraccionado (3 plazos)</option>
                            <option name="3" value="3">Fraccionado (4 plazos)</option>
                        </select>
                        </div> -->
                    </div>
                </div>

                <div class="row">
                    <div class="form-group col-4">
                        <label for="formFile" class="form-label">csv</label>
                        <input class="form-control" type="file" id="csv" name="csv">
                    </div>
                    <div class="form-group col-4">
                        <label for="formFile" class="form-label">Imagen Ubicación</label>
                        <input class="form-control" type="file" id="ubicacion" name="ubicacion">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-4">
                        <label for="formFile" class="form-label">Rendimiento diario</label>
                        <input class="form-control" type="file" id="rendimientoDiario" name="rendimientoDiario">
                    </div>
                    <div class="form-group col-4">
                        <label for="formFile" class="form-label">Rendimiento mensual</label>
                        <input class="form-control" type="file" id="rendimientoMensual" name="rendimientoMensual">
                    </div>
                </div>

                </div>
                







          <center><input type="submit" class="btn btn-primary" value="Generar pdf"></center> <!-- id="downloadPdf" -->
</form>
    </div>
    </div>
</body>
</html>