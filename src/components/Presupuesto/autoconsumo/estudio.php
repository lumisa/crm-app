<?php

require_once("../vendor/autoload.php");

$mpdf = new \Mpdf\Mpdf();

$html = "
<style>

@font-face {
  font-family: SourceSansPro;
  src: url(SourceSansPro-Regular.ttf);
}

.clearfix:after {
  content: '';
  display: table;
  clear: both
}

a {
  color: #f4a83a;
  text-decoration: none;
}

body {
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 12px;
  margin: 0;
  padding: 0;
  color: #474747;
}

header {

  border-bottom: 1px solid #AAAAAA;
}

#logo {
  float: left;
}

#company {
  float: right;
  text-align: right; 
}

.right{
    float:right
}

.left{
    float:left
}

h2.name {
  font-size: 1.4em;
  font-weight: normal;
  margin: 0;
}

titlepre{
  font-size:20px!important;
}

#invoice {
  float: right;
  text-align: right;
}


footer {
  color: #777777;
  width: 100%;
  height: 30px;
  position: absolute;
  bottom: 0;
  border-top: 1px solid #AAAAAA;
  padding: 8px 0;
  font-size: 11pxm;
  margin-top:10px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

.tg {
    border-collapse:collapse;
    border-spacing:0;
    margin-left: auto;
    margin-right: auto;
}
.tg td{
    border-color:#ccc;
    border-style:solid;
    border-width:1px;
    overflow:hidden;
    padding:5px;
    word-break:normal;
    text-align:center;
}
.tg th{
    border-color:#ccc;
    border-style:solid;
    border-width:1px;
    font-weight:normal;
    overflow:hidden;
    padding:5px;
    word-break:normal;
    font-weight:bold;
}

  
table.presupuesto th,
table.presupuesto td {
text-align: left;
}

table.presupuesto th {
padding: 10px 5px;
border-bottom: 1px solid #5D6975;
white-space: nowrap;        
font-weight: normal;
}

table.presupuesto .service,
table.presupuesto .desc {
text-align: left;
}

table.presupuesto .product{
  text-align: left;
}

table.presupuesto td {
padding: 10px 10px 10px 5px;
text-align: right;
}

table.presupuesto td.service,
table.presupuesto td.desc {
vertical-align: top;
}

table.presupuesto td.total {
font-weight: bold;

}

table.presupuesto td.grand {
border-top: 1px solid #5D6975;
font-size:14px
}

table.datos td{
    padding:10px 0px;
}

.tecnico td, th {
  text-align: left;
  padding: 8px;
}

.tecnico td {
  background-color: #dddddd;
  border: 1px solid #fff;
}

.title th{
  background-color: #838080;
  color:#ffffff;
  padding:15px;
}

.subtitle td{
  background-color: #dddddd;
}

</style>";

// Define the Headers before writing anything so they appear on the first page
$mpdf->SetHTMLHeader('
<div id="logo">
<img src="lumisa.svg" style="height:60px;">
</div>
','O');
$mpdf->SetHTMLHeader('<div id="logo">
<img src="lumisa.svg" style="height:60px;">
</div>','E');

$mpdf->SetHTMLFooter('
<table>
<tr>
    <td style="font-size:9px; color:#A9A9A9;">COMPAÑÍA LUMISA ENERGÍAS SL C/Badajoz, 145 3-A, 08018 Barcelona. Inscrita en el Tomo 43048, Folio 136, Hoja B419446, Inscripción 1, CIF B65711855.</td>
    <td style="color:#A9A9A9;text-align:right">{PAGENO}/{nbpg}</td>
    </tr>
    </table>');  // Note that the second parameter is optional : default = 'O' for ODD

$mpdf->SetHTMLFooter('
<table>
<tr>
    <td style="font-size:9px; color:#A9A9A9;">COMPAÑÍA LUMISA ENERGÍAS SL C/Badajoz, 145 3-A, 08018 Barcelona. Inscrita en el Tomo 43048, Folio 136, Hoja B419446, Inscripción 1, CIF B65711855.</td>
    <td style="color:#A9A9A9;text-align:right">{PAGENO}/{nbpg}</td>
    </tr>
    </table>', 'E');

$mpdf->AddPage('', // L - landscape, P - portrait 
'', '', '', '',
15, // margin_left
15, // margin right
35, // margin top
30, // margin bottom
10, // margin header
10  // margin footer
); 

$html .= "";

$html .='
<h4 align="center">ESPECIFICACIONES TÉCNICAS</h4>

<table class="tecnico" style="margin:3px 0px">
  <tr class="title">
    <th colspan="3">1XSUN2000L-3.68KTL</th>
  </tr>
  <tr>
    <td width="33%">Potencia máxima</td>
    <td width="33%">54,0kWp</td>
    <td width="33%" rowspan="10"></td>
  </tr>
  <tr>
    <td>Total de módulos fotovoltaicos</td>
    <td>12</td>

  </tr>
  <tr>
    <td>Cantidad de inversores</td>
    <td>1</td>

  </tr>
  <tr>
    <td>Potencia activa de CA máxima (cosφ=1)</td>
    <td>3,68kW</td>

  </tr>
  <tr>
    <td>Voltaje de la red</td>
    <td>220V</td>

  </tr>
    <tr>
    <td>DC/AC</td>
    <td>14,67</td>
  </tr>
  </table>
  
  <table class="tecnico" style="margin:3px 0px">
    <tr>
    <td colspan="3">Entrada MPPT A : PV Array1</td>
  </tr>
    <tr>
    <td colspan="3">12 x Trina Solar Tallmax TSM-DE17M(II), Acimut : -20°, Inlinación : 30°</td>
  </tr>
  </table>
  
  <table class="tecnico" style="margin:3px 0px">
    <tr class="subtitle">
    <td width="33%"></td>
    <td width="33%">MPPT A</td>
    <td width="33%">MPPT B</td>
  </tr>
    <tr>
    <td>Cantidad de cadenas fotovoltáicas</td>
    <td>1</td>
    <td></td>
  </tr>
    <tr>
    <td>Módulos fotovoltáicos por cadena</td>
    <td>12</td>
    <td></td>
  </tr>
    <tr>
    <td>Potencia máxima de cadena fotvoltáica (entrada</td>
    <td>54,0kWp</td>
    <td></td>
  </tr>  
  <tr>
    <td>Tensión de cadena fotovoltáicanormal</td>
    <td>492,0V</td>
    <td></td>
  </tr>
    <tr>
    <td>Voltaje de inicio de la cadena fotovoltáica</td>
    <td>120,0V</td>
    <td></td>
  </tr>
    <tr>
    <td>Voltaje de arranque del inversor</td>
    <td>120,0V</td>
    <td></td>
  </tr>
    <tr>
    <td>Tensión de cadena fotovoltáica máx</td>
    <td>625,0V</td>
    <td></td>
  </tr>
    <tr>
    <td>Tensión de CC máx del inversor</td>
    <td>625,0V</td>
    <td></td>
  </tr>
      <tr>
    <td>Corriente de cadena fotovoltáica máx</td>
    <td>10,98A</td>
    <td></td>
  </tr>
      <tr>
    <td>Corriente de CC máx del inversor</td>
    <td>11,0A</td>
    <td></td>
  </tr>
</table>

';


$filename = "estudio-autoconsumo.pdf";

$mpdf->mirrorMargins = 1;

$mpdf->SetTitle('Estudio Autoconsumo');

$mpdf->WriteHTML($html);

$mpdf->Output($filename, 'I');

}
?>