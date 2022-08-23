<?php
include "../../../hermesFunctions/include/nav.php";


?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
    <title>Presupuesto Autoconsumo</title>
    <link rel="stylesheet" href="style-presupuesto.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    
</head>
<body>
    
    <div class="container">      
    <div class="col-12" style="padding-top: 30px; padding-bottom: 30px;">
        <!-- FORM ANEXO -->
        <div class="text-center"><h2>Anexo al presupuesto</h2></div>  
 
            <form action="presupuesto-anexo.php" method="post" style="padding:40px 0px">
                <h4>Datos el cliente</h4>
                <div class="form-group">       
                    <div class='swith-row38'>
                            <div class="switch col-12 col-lg-6">
                            <input type="radio" class="switch-input" onClick="tipoCliente();tipoImporte()" id="radioParticular" name="empresaParticular" value="Particular" checked/>
                                    <label for="radioParticular" class="switch-label38 switch-label-off">
                                        <span>Particular</span>
                                    </label>
                            <input type="radio" class="switch-input" onClick="tipoCliente();tipoImporte()" id="radioEmpresa" name="empresaParticular" value="Empresa"/>
                                    <label for="radioEmpresa" class="switch-label38 switch-label-on">
                                        <span>Empresa</span>
                                    </label>
                                    <span class="slider2"></span>
                            </div>
                        </div>
                </div>
                    <div id="divEmpresa" style="display: none;">
                        <div class="form-row">
                            <div class="form-group col-12 col-lg-7">
                                <label>Razón social</label>
                                <input id="RazonEmpresa" name="RazonEmpresa" class="form-control" type="text" title="Completar" placeholder="Razón social" style="width:100%;"/>
                            </div>
                            <div class="form-group col-12 col-lg-5">
                                <label>CIF*</label>
                                <input type="text" name="cif" onKeyUp="this.value = this.value.toUpperCase();" class="form-control" id="cif" placeholder="CIF" style="width:100%;" pattern="[a-zA-Z0-9]{1}[0-9]{7}[a-zA-Z0-9]{1}"/>
                            </div>
                        </div>
                    </div>


                <div class="form-row">
                    <div class="form-group col-12 col-lg-4">
                        <label>Nombre<span id="datos-administrador" style="display: none; overflow:hidden;"></span></label>
                        <input type="text" name="nombre" class="form-control" id="nombre" placeholder="Nombre" style="width:100%;" />
                    </div>
                    <div class="form-group col-12 col-lg-5">
                        <label>Apellidos</label>
                        <input id="apellidos" name="apellidos" class="form-control" type="text" title="Completar" placeholder="Apellidos"  style="width:100%;" />
                    </div>
                    <div class="form-group col-12 col-lg-3">
                        <label>NIF/NIE</label>
                        <input type="text" name="CIFadministrador" onKeyUp="this.value = this.value.toUpperCase();" maxlength="9" minlength="9" class="form-control" id="cif" placeholder="NIF/NIE" style="width:100%"   pattern="[a-zA-Z0-9]{1}[0-9]{7}[a-zA-Z0-9]{1}"/>
                    </div>			
                </div>
     
                <h4>Datos de la Instalación</h4>

                <div class="form-row">
                    <div class="form-group col-8">
                        <label for="address">Dirección del suministro</label>
                        <input type="text" class="form-control" id="address" name="address">
                    </div>
                    <div class="form-group col-4" >
                    <label>Fecha validez </label>
                    <input type="date" onChange="controlFecha(this, 15);" id="fechaValido" name="fechaValido" min="<?php echo( date('d-m-Y')); ?>" max="<?php echo( date('d-m-Y', strtotime(' +15 day'))); ?>" class="form-control" title="Es necesario completar" required>
            </div>
                </div>
                
                <h4>Datos presupuesto</h4>

                <div class="form-row">
                    <div class="form-group col-6">
                    <label>Producto</label>
                    <input type="text" class="form-control" id="producto" name="producto">
                    </div>            
                    <div class="form-group col-6">
                    <label>Descripción</label>
                    <input type="text" class="form-control" id="descripcion" name="descripcion">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-check form-switch">
                    <input class="form-check-input" onClick="añadirProducto2();" type="checkbox" id="checkProducto2">
                    <label class="form-check-label" for="checkProducto2" style="margin-left:25px;">Añadir producto 2</label>
                    </div>
                </div>

                
               <div id="divProducto2" style="display:none">
                    <div class="form-row">
                        <div class="form-group col-6">
                        <label>Producto 2</label>
                        <input type="text" class="form-control" id="producto2" name="producto2">
                        </div>            
                        <div class="form-group col-6">
                        <label>Descripción 2</label>
                        <input type="text" class="form-control" id="descripcion2" name="descripcion2">
                        </div>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-check form-switch">
                    <input class="form-check-input" onClick="añadirProducto3();" type="checkbox" id="checkProducto3">
                    <label class="form-check-label" for="checkProducto3" style="margin-left:25px;">Añadir producto 3</label>
                    </div>
                </div>

                <div id="divProducto3" style="display:none">
                    <div class="form-row">
                        <div class="form-group col-6">
                        <label>Producto 3</label>
                        <input type="text" class="form-control" id="producto3" name="producto3">
                        </div>            
                        <div class="form-group col-6">
                        <label>Descripción 3</label>
                        <input type="text" class="form-control" id="descripcion3" name="descripcion3">
                        </div>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-check form-switch">
                    <input class="form-check-input" onClick="añadirProducto4();" type="checkbox" id="checkProducto4">
                    <label class="form-check-label" for="checkProducto4" style="margin-left:25px;">Añadir producto 4</label>
                    </div>
                </div>


                <div id="divProducto4" style="display:none">
                    <div class="form-row">
                        <div class="form-group col-6">
                        <label>Producto 4</label>
                        <input type="text" class="form-control" id="producto4" name="producto4">
                        </div>            
                        <div class="form-group col-6">
                        <label>Descripción 4</label>
                        <input type="text" class="form-control" id="descripcion4" name="descripcion4">
                        </div>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-check form-switch">
                    <input class="form-check-input" onClick="añadirProducto5();" type="checkbox" id="checkProducto5">
                    <label class="form-check-label" for="checkProducto5" style="margin-left:25px;">Añadir producto 5</label>
                    </div>
                </div>


                <div id="divProducto5" style="display:none">
                    <div class="form-row">
                        <div class="form-group col-6">
                        <label>Producto 5</label>
                        <input type="text" class="form-control" id="producto5" name="producto5">
                        </div>            
                        <div class="form-group col-6">
                        <label>Descripción 4</label>
                        <input type="text" class="form-control" id="descripcion5" name="descripcion5">
                        </div>
                    </div>
                </div>

                <h4 style="margin-top: 20px;">Importe presupuesto</h4>
                <div id="divImporteP">
                    <div class="form-row">
                        <div class="form-group col-4">
                        <label>Base imponible</label>
                        <input type="text" class="form-control" id="baseP" name="baseP" title="Completar" placeholder="Base" style="width:100%;">
                        </div>            
                        <div class="form-group col-4">
                        <label>IVA (10%)</label>
                        <input type="text" class="form-control" id="ivaP" name="ivaP" title="Completar" placeholder="IVA" style="width:100%;">
                        </div>
                        <div class="form-group col-4">
                        <label>Total importe</label>
                        <input type="text" class="form-control" id="totalP" name="totalP" title="Completar" placeholder="Total" style="width:100%;">
                        </div>
                    </div>
                </div>
                
                <div id="divImporteE" style="display: none;">
                    <div class="form-row">
                        <div class="form-group col-4">
                        <label>Base imponible</label>
                        <input type="text" class="form-control" id="baseE" name="baseE" title="Completar" placeholder="Base" style="width:100%;">
                        </div>            
                        <div class="form-group col-4">
                        <label>IVA (21%)</label>
                        <input type="text" class="form-control" id="ivaE" name="ivaE" title="Completar" placeholder="IVA" style="width:100%;">
                        </div>
                        <div class="form-group col-4">
                        <label>Total importe</label>
                        <input type="text" class="form-control" id="totalE" name="totalE" title="Completar" placeholder="Total" style="width:100%;">
                        </div>
                    </div>
                </div>

            <center><button type="submit" class="btn btn-primary">Generar Anexo</button></center>
        </form>
    </div> 
</div>

<script>

//Particular

function CalculoIvaP(baseP, ivaP, totalP) {
  
  basePParse = parseFloat(baseP.value);
  
  if (typeof basePParse === 'number' && !isNaN(basePParse)) {
    
      var ivaPCalc   = basePParse * 0.10;
      var totalPCalc = basePParse + ivaPCalc;
    
      ivaP.value   = ivaPCalc.toFixed(2).replace('.', ',');
      totalP.value = totalPCalc.toFixed(2).replace('.', ',');
    
  } else {
    
      ivaP.value   = '';
      totalP.value = '';
      baseP.value = '';
      console.log('Introduce un numero válido');
  }
}

var baseP = document.getElementById('baseP');
var ivaP   = document.getElementById('ivaP');
var totalP = document.getElementById('totalP');


baseP.onchange = function(){ CalculoIvaP(baseP, ivaP, totalP); }

/*Empresa*/

function CalculoIvaE(baseE, ivaE, totalE) {
  
  baseEParse = parseFloat(baseE.value);
  
  if (typeof baseEParse === 'number' && !isNaN(baseEParse)) {
    
      var ivaECalc   = baseEParse * 0.21;
      var totalECalc = baseEParse + ivaECalc;
    
      ivaE.value   = ivaECalc.toFixed(2).replace('.', ',');
      totalE.value = totalECalc.toFixed(2).replace('.', ',');
    
  } else {
    
      ivaE.value   = '';
      totalE.value = '';
      baseE.value = '';
      console.log('Introduce un numero válido');
  }
}

var baseE = document.getElementById('baseE');
var ivaE   = document.getElementById('ivaE');
var totalE = document.getElementById('totalE');


baseE.onchange = function(){ CalculoIvaE(baseE, ivaE, totalE); }

</script>
<script>

function añadirProducto2() {
    var checkProducto2 = document.getElementById("checkProducto2");
    var divProducto2 = document.getElementById("divProducto2");
    var producto2 = document.getElementById("producto2");
    var descripcion2 = document.getElementById("descripcion2");
 
 
    if (checkProducto2.checked == true) {
        divProducto2.style.display = "block";
        producto2.setAttribute("required", "required");
        descripcion2.setAttribute("required", "required");
    } else {
        divProducto2.style.display = "none";
        producto2.removeAttribute("required");
        descripcion2.removeAttribute("required");
        
    }
}

function añadirProducto3() {
    var checkProducto3 = document.getElementById("checkProducto3");
    var divProducto3 = document.getElementById("divProducto3");
    var producto3 = document.getElementById("producto3");
    var descripcion3 = document.getElementById("descripcion3");
 
 
    if (checkProducto3.checked == true) {
        divProducto3.style.display = "block";
        producto3.setAttribute("required", "required");
        descripcion3.setAttribute("required", "required");
    } else {
        divProducto3.style.display = "none";
        producto3.removeAttribute("required");
        descripcion3.removeAttribute("required");
        
    }
}

function añadirProducto4() {
    var checkProducto4 = document.getElementById("checkProducto4");
    var divProducto4 = document.getElementById("divProducto4");
    var producto4 = document.getElementById("producto4");
    var descripcion4 = document.getElementById("descripcion4");
 
 
    if (checkProducto4.checked == true) {
        divProducto4.style.display = "block";
        producto4.setAttribute("required", "required");
        descripcion4.setAttribute("required", "required");
    } else {
        divProducto4.style.display = "none";
        producto4.removeAttribute("required");
        descripcion4.removeAttribute("required");
        
    }
}

function añadirProducto5() {
    var checkProducto5 = document.getElementById("checkProducto5");
    var divProducto5 = document.getElementById("divProducto5");
    var producto5 = document.getElementById("producto5");
    var descripcion5 = document.getElementById("descripcion5");
 
 
    if (checkProducto5.checked == true) {
        divProducto5.style.display = "block";
        producto5.setAttribute("required", "required");
        descripcion5.setAttribute("required", "required");
    } else {
        divProducto5.style.display = "none";
        producto5.removeAttribute("required");
        descripcion5.removeAttribute("required");
        
    }
}
</script>
<script>

window.addEventListener('load',function(){
    const radioParticular = document.getElementById('radioParticular')
    const radioEmpresa = document.getElementById('radioEmpresa')

     radioParticular.addEventListener('change',function(){
      tipoCliente()
    })
    radioEmpresa.addEventListener('change',function(){
      tipoCliente()
    })

    function tipoCliente() {
      var divEmpresa = document.getElementById("divEmpresa");
      var razon = document.getElementById("RazonEmpresa");
      var divCifEmpresa = document.getElementById("divCIF");
      var cifEmpresa = document.getElementById("cifempresa");
      var tituloAdmin = document.getElementById("datos-administrador");
      var empresaParticular = document.getElementsByName("empresaParticular");

    
      if (document.getElementById("radioEmpresa").checked == true) {
          divEmpresa.style.display = "block";
          cifE.setAttribute("required", "required");
          razon.setAttribute("required", "required");
          divCifEmpresa.style.display = "block";
          empresaParticular.value = "Empresa";
          tituloAdmin.style.display = "inline";

      }
      if (document.getElementById("radioParticular").checked == true) {
          divEmpresa.style.display = "none";
          cifE.removeAttribute("required");
          razon.removeAttribute("required");
          divCifEmpresa.style.display = "none";
          empresaParticular.value = "Empresa";
          cifEmpresa.removeAttribute("required");
          tituloAdmin.style.display = "none";
      }
    }

})

/*Importe presupuesto*/

window.addEventListener('load',function(){
    const radioParticular = document.getElementById('radioParticular')
    const radioEmpresa = document.getElementById('radioEmpresa')

     radioParticular.addEventListener('change',function(){
      tipoImporte()
    })
    radioEmpresa.addEventListener('change',function(){
      tipoImporte()
    })

    function tipoImporte() {
      var empresaParticular = document.getElementsByName("empresaParticular");
      var divImporteE = document.getElementById("divImporteE");
      var divImporteP = document.getElementById("divImporteP");
      var baseE = document.getElementById("baseE");
      var ivaE = document.getElementById("ivaE");
      var totalE = document.getElementById("totalE");
      var baseP = document.getElementById("baseP");
      var ivaP = document.getElementById("ivaP");
      var totalP = document.getElementById("totalP");

    
      if (document.getElementById("radioEmpresa").checked == true) {
          empresaParticular.value = "Empresa";
          divImporteE.style.display = "block";
          divImporteP.style.display = "none";
          baseE.setAttribute("required", "required");
          ivaE.setAttribute("required", "required");
          totalE.setAttribute("required", "required");
          baseP.removeAttribute("required");
          ivaP.removeAttribute("required");
          totalP.removeAttribute("required");
      }
      if (document.getElementById("radioParticular").checked == true) {
          empresaParticular.value = "Empresa";
          divImporteE.style.display = "none";
          divImporteP.style.display = "block";
          baseP.setAttribute("required", "required");
          ivaP.setAttribute("required", "required");
          totalP.setAttribute("required", "required");
          baseE.removeAttribute("required");
          ivaE.removeAttribute("required");
          totalE.removeAttribute("required");
      }
    }

})
</script>
</body>
</html>