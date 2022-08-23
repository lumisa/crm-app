<?php

namespace Autoconsumo\controller;



require '../../../vendor/autoload.php';



$data = json_decode($_POST['data']);
$totalizador = json_decode($_POST['totalizadorData']);
$csvData = json_decode($_POST['csvData']);

$fecha = date("d/m/Y");


//print('<pre>'.print_r($csvData, true).'</pre>');
//print('<pre>'.print_r($totalizador, true).'</pre>');
//print('<pre>'.print_r($data->desglosePresupuesto, true).'</pre>');

$precioEnergia = array(
	"venta" => $_POST['precioVenta'],
	"compra" => $_POST['precioCompra']
);

$autoconsumoFloat = floatval($totalizador->Autoconsumo);
$inyeccionRedFloat = floatval($totalizador->InyeccionRed);

$ahorroAutoconsumoAnual = $autoconsumoFloat * $precioEnergia["compra"];
$ingresoExcedentesAnual = $inyeccionRedFloat * $precioEnergia["venta"];

$ahorroAnual = $ahorroAutoconsumoAnual + $ingresoExcedentesAnual;

$rendimiento25anios = array();

for ($i = 0; $i < 25; $i++) {
	$rendimiento25anios[$i] = array(
		"autoconsumo" => $autoconsumoFloat * ($i + 1),
		"ahorro generado" => $ahorroAutoconsumoAnual * ($i + 1),

		"excedentes" => $inyeccionRedFloat * ($i + 1),
		"ingresos por excedentes" => $ingresoExcedentesAnual * ($i + 1),
	);

}

$totalEuro = array(
	"base" => floatval($data->total),
	"iva" => floatval($data->total) * ($_POST['iva'] / 100),
	"baseIva" => floatval($data->total) * ( ($_POST['iva'] / 100) + 1)
);





$rendimientoAnual = array(
	"Consumo de energía anual (kWh)" => $totalizador->Consumo,
	"Rendimiento energético anual (kWh)" => $totalizador->RendimientoEnergetico,
	"Excedentes (kWh)" => $totalizador->InyeccionRed,
	"Toma de Red (kWh)" => $totalizador->TomaRed,
	"Autoconsumo (kWh)" => $totalizador->Autoconsumo,
	"Cuota de autoconsumo (%)" => $totalizador->CuotaAutoconsumo,
	"Cuota de autarquica (%)" => $totalizador->CuotaAutarquica,
);

$rendimientoMensual = array(
	"Rendimiento energético (kWh)" => $csvData->RendimientoEnergetico,
	"Autoconsumo (kWh)" => $csvData->Autoconsumo,
	"Inyección a la Red (kWh)" => $csvData->InyeccionRed,
	"Toma de Red (kWh)" => $csvData->TomaRed,
);

$totalizadorResumen = array(
	"<img src='../../public/img/savings.png' style='height:40px;width:40px;'><br><br>Ahorros anuales estimados" => number_format($ahorroAnual, 2, ',', '.').' €',
	"<img src='../../public/img/calendar.png' style='height:40px;width:40px;'><br><br>Años de retorno inversión" => number_format($totalEuro['base'] / $ahorroAnual, 2, ',', '.').' años',
	"<img src='../../public/img/lighting.png' style='height:40px;width:40px;'><br><br>Energía anual producida" => number_format($totalizador->RendimientoEnergetico, 0, ',', '.').' kWh',
);

$totalizadorSuministro = array(
	"Inversión sin IVA:" => number_format($totalEuro['base'], 2, ',', '.').' €',
	"Módulos instalados:" => $data->desglosePresupuesto->package->basic->modulos->ud.' módulos',
	"Potencia instalada:" => number_format($data->kW, 0, ',', '.').' kW',
);

$direccion = $_POST['tipoVia'].' '.$_POST['direccionInstalacion'].', '.$_POST['cpInstalacion'].', '.$_POST['municipioInstalacion'] ;


$imgSubidas = array(
	"ubicacion" => $_FILES["ubicacion"],
	"rendimientoDiario" => $_FILES["rendimientoDiario"],
	"rendimientoMensual" => $_FILES["rendimientoMensual"],
);

$ubicacionImg = array();

$dir_subida = '../../public/tmp/';

foreach ($imgSubidas as $key => $img) {

	$fichero_subido = $dir_subida.basename($img['name']);

	$ubicacionImg[$key] = $dir_subida.basename($img['name']);

	move_uploaded_file($img['tmp_name'], $fichero_subido);

}
//print('<pre>'.print_r($ubicacionImg, true).'</pre>');


use Mpdf\Config\ConfigVariables;
use Mpdf\Config\FontVariables;

// Get the default font dirs and append the custom path to it
$defaultConfig = (new ConfigVariables())->getDefaults();
$fontDirs = $defaultConfig['fontDir'];
$fontDirs[] = __DIR__.'../../../public/font';
// Get the default font data and add the yahei font
$defaultFontConfig = (new FontVariables())->getDefaults();
$fontData = $defaultFontConfig['fontdata'];
$fontData['yahei'] = [
    'R' => 'yahei.ttf'
];

$mpdf = new \Mpdf\Mpdf([
    'mode' => '+aCJK',
    'setAutoTopMargin' => 'stretch',
    'setAutoBottomMargin' => 'stretch',
    'default_font' => 'yahei',
	"autoScriptToLang" => true,
    "autoLangToFont" => true,
    'fontDir' => $fontDirs,
    'fontdata' => $fontData,
]);
// Define the Headers before writing anything so they appear on the first page

$mpdf->SetHTMLFooter('
<table>
<tr>
    <td style="font-size:8px;text-align:center">COMPAÑÍA LUMISA ENERGÍAS SL C/Badajoz, 145 3-A, 08018 Barcelona. Inscrita en el Tomo 43048, Folio 136, Hoja B419446, Inscripción 1, CIF B65711855.</td>
    <td style="font-size:10px;text-align:right">{PAGENO}/{nbpg}</td>
    </tr>
    </table>');  // Note that the second parameter is optional : default = 'O' for ODD

$mpdf->SetHTMLFooter('
<table>
<tr>
    <td style="font-size:8px;text-align:center">COMPAÑÍA LUMISA ENERGÍAS SL C/Badajoz, 145 3-A, 08018 Barcelona. Inscrita en el Tomo 43048, Folio 136, Hoja B419446, Inscripción 1, CIF B65711855.</td>
    <td style="font-size:10px;text-align:right">{PAGENO}/{nbpg}</td>
    </tr>
    </table>', 'E');

$mpdf->AddPage('', // L - landscape, P - portrait 
'', '', '', '',
10, // margin_left
10, // margin right
10, // margin top
10, // margin bottom
10, // margin header
7  // margin footer
); 



$mpdf->WriteHTML('
<style>
body{
	font-family: "nunitosans", sans-serif!important;
	color:#ffffff;
	font-size:15px;
}

.title{
	color:#335B7A;
	font-size:60px;
	margin:0;
	font-weight:bold;
}
</style>
<body>
	<div style="position: absolute; left:0; right: 0; top: 0; bottom: 0;">
		<img src="../../public/img/cover.png" style="width: 210mm; height: 297mm; margin: 0;" />
	</div>
	<div style="position:absolute; bottom:90px; right:60px;">
		<img src="../../public/img/logo.png" style="height:35px;">
	</div>
	<div style="position:absolute; top:150px; left:110px;width: 70%;">
		<div style="padding:30px; text-align:center">
			<span class="title">Súmate a la <br>energía solar</span>
		</div>
	</div>
	<div style="position:absolute; bottom:80px; left:80px;width: 100%;">
		<h3>Tu instalación fotovoltaica</h3>
		<table class="datos" style="margin-top:20px;">
			<tr>
				<td width="50%"><b>Razón social:</b> '.($_POST['razonSocial'] ? $_POST['razonSocial'] : '').'</td>
				</tr>
			<tr>
				<td><b>Dirección:</b> '.($direccion ? $direccion : '').'</td>
			</tr>
		</table>
	</div>
	
</body>
');

// Create second page
$mpdf->AddPage();


$html ='<pagebreak/>';

	$html ='

	<h2 class="subtitle">Tu instalación al detalle</h2>
		<div class="form-row">
			<div class="col-xs-5">
				<img src="'.$ubicacionImg['ubicacion'].'" height="280px" width="280" style="object-fit: cover;">
			</div>
			<div class="col-xs-7">
				<div class="informacion3">
					<table class="info">
						<tr>
							<th width="40%">Emplazamiento:</th>
							<td width="60%">'.($direccion ? $direccion : '').'</td>
						</tr>
						<tr>
							<th>Superfície (m2):</th>
							<td> '.($_POST['m2'] ? $_POST['m2'] : '').'</td>
						</tr>
						';
						foreach ( $totalizadorSuministro as $key => $value ) {

							$html .= '
							<tr>
								<th>'.$key.'</th>
								<td>'.$value.'</td>
							</tr>
							
							';
						}

						$html .= '
						<tr>
							<th>Tipo de tejado:</th>
							<td> Tejado '.($_POST['tejado'] ? $_POST['tejado'] : '').'</td>
						</tr>
						
					</table>
				</div>
			</div>
		</div>

		<h2 class="subtitle">Beneficios de la energía solar</h2>
		<p>El servicio de energía solar fotovoltaica ofrece una solución completa, adaptada a tu consumo y optimizando tu rentabilidad y ahorro, para que puedas beneficiarte de la energía que viertas a la red.</p>
		<div class="row" style="text-align:center;">
			<div class="col-xs-4">
				<div class="informacion">
					<img src="../../public/img/coins.png" style="height:40px;width:40px;">
					<h3>Ahorro</h3>
					<p>Recibe una compensación económica por los excedentes que viertas a la red.</p>
				</div>
			</div>
			<div class="col-xs-4">
				<div class="informacion">
					<img src="../../public/img/settings.png" style="height:40px;width:40px;">
					<h3>Instalación a medida</h3>
					<p>Instalación de los paneles solares en tu vivienda financiado en cómodas cuotas mensuales.</p>
				</div>
			</div>
			<div class="col-xs-4">
				<div class="informacion">
					<img src="../../public/img/leaf.png" style="height:40px;width:40px;">
					<h3>Energía 100 % verde</h3>
					<p>Consume energía limpia con tus placas solares ayudando al medio ambiente.</p>
				</div>
			</div>
		</div>

		<h2 class="subtitle">Tu solución ideal</h2>
		<div class="row">
			<div class="informacion" style="margin:0px;">
	';

foreach ( $totalizadorResumen as $key => $value ) {

	$html .= '
	<div class="col-xs-4" style="text-align:center">
		<h4>'.$key.'</h4>
		<h2>'.$value.'</h2>
	</div>
	
	';

}
	
	$html .='
		</div>
	</div>
	';




$html .='<pagebreak/>';



$html .= '
	<h2 class="subtitle">Tus equipos solares</h2>	
	<div class="row" style="margin-top:55px;">
		<div class="col-xs-4 informacion3" style="text-align:center">
			<img src="../../public/img/inversor-huawei.jpg" style="height:100px;margin-top:-55px;">
			<h3>Nuestros inversores</h3>
		</div>
		<div class="col-xs-7" style="margin-left:20px;margin-top:-10px;">
			<h3>Inversor Huawei SUN2000L</h3>	
			<p>El inversor Huawei SUN2000L cuenta con protección activa contra arcos de corriente, mayor rendimiento con hasta un 30% más de energía.</p>		
		</div>
	</div>

	<div class="row" style="margin-top:50px;">
		<div class="col-xs-4 informacion3" style="text-align:center">
			<img src="../../public/img/trina-solar-2.png" style="height:125px; margin-top:-55px;">
			<h3>Nuestros paneles</h3>
		</div>
		<div class="col-xs-7" style="margin-left:20px;margin-top:-10px;">
			<h3>Módulo TrinaSolar TallMax 450W</h3>	
			<p>El módulo TrinaSolar TallMax 450W es uno de los más fiables del sector, integra varias tecnologías con una potencia máxima de hasta 450 W.</p>
			<div class="col-xs-3 btn-autoconsumo"><a href="https://static.trinasolar.com/sites/default/files/ES_Datasheet_TallmaxM_DE17M%28II%29_2021_B.pdf">Ficha técnica</a></div>
		</div>
	</div>';

	if ($_POST['ud-bateriaPotencia'] || $_POST['ud-bateria'] ) {

		$html.= '<div class="row" style="margin-top:50px;">
		<div class="col-xs-4 informacion3" style="text-align:center">
			<img src="../../public/img/Huawei-Luna.gif" style="height:125px; margin-top:-55px;">
			<h3>Nuestra batería</h3>
		</div>
		<div class="col-xs-7" style="margin-left:20px;margin-top:-10px;">
			<h3>Batería Huawei LUNA2000 Modular</h3>	
			<p>La Batería Litio Huawei Luna2000 5kWh + BMS es un acumulador de alto voltaje compatible con los inversores Huawei KTL monofásicos L1 y 
			los KTL Trifásicos M1. Se compone de un controlador o BMS en su parte superior y un módulo acumulador de 5kWh que es ampliable con hasta 2 unidades más. </p>
			<p>Recomendamos evaluar la instalación de las baterías una vez instalados los paneles fotovoltaicos para determinar la capacidad necesaria. 
			Los precios de las baterías son sin IVA.</p>
			<table cellpadding="5" style="width:100%; margin-bottom:20px;text-align:left">
				<tbody>
					<tr>
						<td><b>Módulo potencia + 5 kWh</b></td>
						<td class="total"><h3>3.310 €</h3></td>
					</tr>
					<tr>
						<td><b>Módulo potencia + 5 kWh + 5 kwh</b></td>
						<td class="total"><h3>5.310 €</h3></td>
					</tr>
					<tr>

						<td><b>Módulo potencia + 5 kWh + 5 kwh + 5 kwh</b></td>
						<td><h3>7.310 €</h3></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>';
	}


	$html .='<pagebreak />';

	$html .= '
	
	<h2 class="subtitle">El proceso al detalle</h2>
	<div class="row">
		<div class="col-xs-4 subSquare" style="background-color:#f4f8fb; height:120px;">
			<h3>Formalización del presupuesto</h3>
			<img src="../../public/img/download.png" style="width:12px;margin-top:30px;">
		</div>
		<div class="col-xs-7">
			<ul class="list">
				<li><h4>Visita comercial de la instalación</h4></li>
				<li><h4>Presentación del estudio técnico</h4></li>
				<li><h4>Visita comercial Técnica</h4></li>
				<li><h4>Presentación del presupuesto</h4></li>
				<li><h4>Firma del presupuesto</h4></li>
			</ul>
		</div>
	</div>

	<div class="row" style="margin-top:10px;">
		<div class="col-xs-4 subSquare" style="background-color:#e6eff6; height:120px;">
			<h3>Ejecución de <br>la instalación</h3>
			<img src="../../public/img/download.png" style="width:12px;margin-top:20px;">
		</div>
		<div class="col-xs-7">
			<ul class="list">
				<li><h4>Ejecución de la instalación</h4></li>
				<li><h4>Puesta en marcha de la instalación</h4></li>
				<li><h4>Monitorización y control remoto de la producción</h4></li>
				<li><h4>Legalización de la instalación</h4></li>
				<li><h4>Tramitación de la Bonificación IBI</h4></li>
			</ul>
		</div>
	</div>

	<div class="row" style="margin-top:10px;">
		<div class="col-xs-4 subSquare" style="background-color:#d7e6f1; height:20px;">
			<h3>Finalización de <br>la instalación</h3>
		</div>
		<div class="col-xs-7">
			<ul class="list">
				<li><h4>Mantenimiento de la instalación</h4></li>
				<li><h4>Entrega de documentación final</h4></li>
				<li><h4>Compensación de los excedentes en tu factura de la luz</h4></li>
			</ul>
		</div>
	</div>

	
	';
	
$html .='<pagebreak />';

	
	$html .='	
		<table style="margin-bottom:20px;vertical-align: top;">
			<tr>
				<th width="40%" rowspan="3"><h2 class="subtitle">Presupuesto</h2></th>
				<td width="60%" style="text-align:right;float:right">Fecha del presupuesto: '.$fecha.'</td>
			</tr>
			<tr>
				<td style="text-align:right;float:right">Razón social: '.($_POST['razonSocial'] ? $_POST['razonSocial'] : '').'</td>
			</tr>		
			<tr>
				<td style="text-align:right;float:right">NIF: '.($_POST['nif'] ? $_POST['nif'] : '').'</td>
			</tr>
		</table>
		
		<table class="presupuesto">
			<thead>
				<tr>
					<th>PRODUCTO</th>
					<th>DESCRIPCIÓN</th>
					<th>UD</th>
					'.($_POST['desglosePresupuesto'] == '1' ? '<th>IMPORTE</th>': '').
					($_POST['desglosePresupuesto'] == '1' ? '<th style="text-align:right!important">TOTAL</th>': '').
				'</tr>
			</thead>
		<tbody>';
		
		foreach ( $data->desglosePresupuesto->package->basic as $key => $producto ) {

			if ( $producto->total !== 0 ) {

				$html .= '
				<tr style="border-style: solid; border-width: 1px 0px 1px 0px; border-color: #f4f8fb;">
					<th class="product"><b>'.$producto->concepto.'</b></th>
					<td class="product">'.$producto->descripcion.'</td>
					<td>'.$producto->ud.'</td>
					'.($_POST['desglosePresupuesto'] == '1' ? '<td>'.number_format(floatval($producto->importe), 2, ',', '.').'</td>' : '').'
					'.($_POST['desglosePresupuesto'] == '1' ? '<td>'.number_format(floatval($producto->total), 2, ',', '.').' €</td>' : '').'
				</tr>';
			}
		
		}
		
		foreach ( $data->desglosePresupuesto->package->standard as $key => $producto ) {

			if ( $producto->total !== 0 ) {
				
				$html .= '
				<tr style="border-style: solid; border-width: 1px 0px 1px 0px; border-color: #f4f8fb">
				<th class="product"><b>'.$producto->concepto.'</b></th>
				<td class="product">'.$producto->descripcion.'</td>
				<td>'.$producto->ud.'</td>'
				.($_POST['desglosePresupuesto'] == '1' ? '<td>'.number_format(floatval($producto->importe), 2, ',', '.').'</td>' : '')
				.($_POST['desglosePresupuesto'] == '1' ? '<td>'.number_format(floatval($producto->total), 2, ',', '.').' €</td>' : '')
				.'</tr>';
			}
			
			
		}
		
		foreach ( $data->desglosePresupuesto->package->premium as $key => $producto ) {
			
			if ( $producto->total !== 0 ) {

				$html .= '
				<tr style="border-style: solid; border-width: 1px 0px 1px 0px; border-color: #f4f8fb">
					<th class="product"><b>'.$producto->concepto.'</b></th>
					<td class="product">'.$producto->descripcion.'</td>
					<td>'.$producto->ud.'</td>'
					.($_POST['desglosePresupuesto'] == '1' ? '<td>'.number_format(floatval($producto->importe), 2, ',', '.').'</td>' : '')
					.($_POST['desglosePresupuesto'] == '1' ? '<td>'.number_format(floatval($producto->total), 2, ',', '.').' €</td>' : '')
				.'</tr>';
			}
		}
		
	$html .= '</tbody></table>';
	
	$html .= '
		<table class="presupuesto" style="margin-bottom:20px;">
			<tbody>
				<tr>
				<td colspan="2">Base imponible</td>
				<td class="total"><b>'.number_format($totalEuro['base'], 2, ',', '.').' €</b></td>
				</tr>
				<tr>
				<td colspan="2">IVA ('.$_POST['iva'].' %)</td>
				<td class="total"><b> '.number_format($totalEuro['iva'], 2, ',', '.').' €</b></td>
				</tr>
				<tr>
				<td colspan="2" class="grand total">Total presupuesto</td>
				<td class="grand total"> '.number_format($totalEuro['baseIva'], 2, ',', '.').' €</td>
				</tr>
			</tbody>
		</table>
	';

	$html .='
	<p style="text-align:justify; font-size:11px;line-height:15px;">El presupuesto está basado en una instalación estándar sin complejidades fuera de la norma y <b> tiene una validez de 3 semanas y está sujeto a disponibilidad</b>. Este presupuesto incluye la mano de obra y materiales antes descritos. No se incluye: ICIO, costes de licencia de obras u otros impuestos ni condiciones técnico-administrativas que pueda exigir la Distribuidora. Se estima un margen de error debido a aproximaciones en medidas del 15% debido a los trabajos y materiales adicionales que pudieran surgir, por cualquier situación inesperada, una vez empleado el trabajo. Cualquier trabajo no previsto, fuera de presupuesto o con precio diferente será un extra y será cobrado aparte.</p>
	';
	
	$html .='
		<table style="text-align:center;">
			<tr>
				<td width="40%"><b>EL CLIENTE</b></td>
				<td width="60%"><b>COMPAÑÍA LUMISA ENERGÍAS, S.L.</b></td>    
			</tr>
			<tr>
				<td></td>
				<td><img src="../../public/img/sign-lumisa.jpg" height="100px"></td>    
			</tr>
		</table>
	';



$html .='<pagebreak />';	
	

$html .= '
<h2 class="subtitle">Tu oferta ecónomica</h2>

	<div class="container">
		<div class="row">
			<div class="col-xs-2 subSquare" style="background-color:#f4f8fb; height:50px;">
				<h3>Precio</h3>
			</div>
			<div class="col-xs-9" style="margin-left:20px;">
			<h2 style="margin-bottom:0;">'.number_format($totalEuro['baseIva'], 2, ',', '.').' €</h2>
			<span style="font-weight:bold">con IVA incluido</span>
			</div>
		</div>

		<div class="row" style="margin-top:20px;">
			<div class="col-xs-2 subSquare" style="background-color:#e6eff6; height:340px;">
				<h3>Forma de pago</h3>
			</div>
			<div class="col-xs-9" style="margin-left:20px;">
				<h3>Pago al Contado</h3>
				
				<p>El pago del presupuesto se realizará a través de transferencia bancaria, con los siguientes plazos: primer pago por adelantado y el segundo restante durante la ejecucón de la instalación.</p>
				<p>Para hacer efectivo este pago ponemos a su disposición las entidades que citamos a continuación.</p>
				<table>
					<tr>
						<td>BANCO SABADELL ATLÁNTICO</td>
						<td>ES37 0081 0396 90 0001124423</td>
					</tr>
					<tr>
						<td>LA CAIXA</td>
						<td>ES97 2100 0466 12 0200280331</td>
					</tr>
				</table>

				<div class="hr"></div>

				<h3>Pago Financiado</h3>
				<p>Compañía Lumisa Energías, S.L. a través la entidad Banco Bilbao Vizcaya Argentaria, S.A. y sujeta a su autorización, facilita el pago del coste de la instalación y de los equipamientos.</p>
			</div>
		</div>

		<div class="row" style="margin-top:20px;">
			<div class="col-xs-2 subSquare" style="background-color:#d7e6f1; height:70px;">
				<h3>Garantías</h3>
			</div>
			<div class="col-xs-9">
				<ul class="list">
					<li>Garantía de 2 años en la instalación y la mano de obra</li>
					<li>Garantía de 10 años sobre los paneles solares</li>
					<li>Garantía de producción de al menos el 80% de su potencia etiquetada en 25 años</li>
				</ul>
			</div>
		</div>
	
';

	$html .='
		<div class="row" style="margin-top:20px;">
			<div class="col-xs-2 subSquare" style="background-color:#c9ddeb; height:280px;">
				<h3>Anexos</h3>
			</div>
			<div class="col-xs-9" style="margin-left:20px;">
	';

	$html .='
			<h3>Subvención Next Generation EU</h3>
			<p>En Lumisa te ayudamos a presentar tu solicitud y tramitar la subvención Next Generation EU establecida en el Real Decreto 477/2021 con ayudas en la instalación de hasta un 45 %. Consulta con nuestros asesores para más información.</p>
		</div>
	</div>';


$html .='<pagebreak />';

$html .='

<h2 class="subtitle">Condiciones particulares del autoconsumo</h2>

<p>El contrato tendrá por objeto la ejecución de la siguiente obra: Instalación de placas fotovoltaicas para <b>'.($_POST['tipo'] ? $_POST['tipo'] : '').'</b>.</p>';

$html .='<h3>Objeto de la oferta</h3>
<p>El importe total de la instalación de fotovoltaica es de <b>'.number_format($totalEuro['baseIva'], 2, ',', '.').' €</b> con IVA incluido. La contratación de la solución fotovoltaica ofrece a los clientes la instalación de los paneles solares, con garantías de instalación, de los paneles, del inversor y de la estructura. </p>
<p>También incluye la comunicación de obra, la legalización de la instalación, que en función de la ubicación y la tipología puede incluir el permiso de acceso y conexión, autorización administrativa previa y de construcción, autorización ambiental y de utilidad pública, certificado de fin de obra, autorización de explotación, y cualesquiera que puedan ser exigidos por la Distribuidora o la Administración, la puesta en marcha de la instalación y la tramitación de la bonificación del IBI. Además, ofrecemos a nuestros clientes la configuración gratuita de la APP FUSIÓN SOLAR para controlar la producción y el consumo en tiempo real.</p>
';

$html .='<h3>Datos del cliente</h3>';

$html .='
    <table class="datos">
        <tr>
			<td width="50%">Razón social: <b>'.($_POST['razonSocial'] ? $_POST['razonSocial'] : '').'</b></td>
			<td width="50%">NIF: <b>'.($_POST['nif'] ? $_POST['nif'] : '').'</b></td>
			</tr>
        <tr>
			<td>Correo electrónico: <b>'.($_POST['email'] ? $_POST['email'] : '').'</b></td>
			<td>Teléfono: <b>'.($_POST['tel'] ? $_POST['tel'] : '').'</b></td>
        </tr>
        <tr>
        	<td>Dirección: <b>'.($direccion ? $direccion : '').'</b></td>
        </tr>
    </table>
	<h3>Plazo de ejecución</h3>
	<p>El plazo de ejecución será de 30 días desde la confirmación del presupuesto. El plazo de ejecución que consta en las presentes condiciones particulares será meramente orientativo. El incumplimiento del plazo de entrega no será causa, en ningún caso, de reclamación alguna por parte del Cliente. Los retrasos en la entrega originados por casusas de fuerza mayor, o que no sean directamente imputables a LUMISA, no serán causa justificada para la anulación del Cliente de la instalación de los paneles solares. </p>
	<h3>Forma de pago</h3>';

if($_POST['pago']=='contado'){
	  $html .='
	  <p>El pago del presupuesto se realizará a través de transferencia bancaria, con los siguientes plazos: 50 % por adelantado y el 50% restante al finalizar los trabajos.</p>
	  <p>Para hacer efectivo este pago ponemos a su disposición las entidades que citamos a continuación.</p>
	  <table>
		<tr>
			<td>BANCO SABADELL ATLÁNTICO</td>
			<td>ES37 0081 0396 90 0001124423</td>
		</tr>
		<tr>
			<td>LA CAIXA</td>
			<td>ES97 2100 0466 12 0200280331</td>
		</tr>
	  </table>
	  ';
  }else if($_POST['pago']=='financiado'){
	$html .='<p>Compañía Lumisa Energías, S.L. a través la entidad Banco Bilbao Vizcaya Argentaria, S.A. y sujeta a su autorización, facilita el pago del coste de la instalación y de los equipamientos.</p>';
  }
  

$html .='
	<p>Los abajo firmantes aceptan el importe total reflejado en el presupuesto, las condiciones particulares del autoconsumo así como las condiciones generales del autoconsumo.</p>
	<p>En fecha '.$fecha.'.</p>
	<table style="text-align:center;">
		<tr>
			<td width="40%"><b>EL CLIENTE</b></td>
			<td width="60%"><b>COMPAÑÍA LUMISA ENERGÍAS, S.L.</b></td>    
		</tr>
		<tr>
			<td></td>
			<td><img src="../../public/img/sign-lumisa.jpg" height="90px"></td>    
		</tr>
	</table>
	';


$html .='<pagebreak />';

$html .= '
		<h2 class="subtitle">Rendimiento de la instalación</h2>
		<div class="container">
			<div class="row">
				<div class="col-xs-4">
				<h3>Rendimiento diario</h3>
					<img src="'.$ubicacionImg['rendimientoDiario'].'" style="height:530px;text-align:center">
				</div>
				<div class="col-xs-8">
				<h3>Rendimiento Anual</h3>
					<div class="informacion">
						<table cellpadding="0" class="presupuesto">
						';
									foreach ( $rendimientoAnual as $key=> $value ) {
					
										$html .= '
										<thead>
										<tr>
											<th>'.$key.'</th>';
										
											$html .= '
											<td style:"text-align: right;">'.number_format($value, 2, ',', '.').'</td>
											
											';
										
										$html .= '</tr>
										</thead>';
					
									}
				
				
				$html .='
							</table>
				</div>
				<h3>Rendimiento mensual</h3>
				<table style="width:100%;">
				<tr>
				  <td align="center">
				  <img src="'.$ubicacionImg['rendimientoMensual'].'" style="height:240px; text-align:center;">
				  </td>
				 </tr>
			  </table>

			</div>
		</div>
	</div>
		';


	$html .= '

	
	<div class="informacion" style="margin-top:40px;">
	<table cellpadding="0" style="text-align:right" class="presupuesto-2">
		<thead>
			<tr>
				<th style="text-align:left">Mes</th>
				<th>1</th>
				<th>2</th>
				<th>3</th>
				<th>4</th>
				<th>5</th>
				<th>6</th>
				<th>7</th>
				<th>8</th>
				<th>9</th>
				<th>10</th>
				<th>11</th>
				<th>12</th>
			</tr>
		<thead>
		<tr>

	';

foreach ( $rendimientoMensual as $key=>$value ) {



	$html .= '<tr>
		<td style="width: 40px;text-align:left;font-weight:bold;">'.$key.'</td>';
	
	for ( $i = 0; $i < count($value); $i++) {
		
		$html .= '
		<td>'.number_format($value[$i], 0, ',', '.').'</td>
		
		';
	}
	
	$html .= '</tr>';

}

	$html .='
		</tr>
	</table>
	</div>
	<p>Los valores de rendimiento que se muestran constituyen solo una estimación y se generan de forma matemática. Lumisa Energías, S.L. no asume la responsabilidad del valor real del rendimiento, que puede diferir de los valores aquí mostrados debido a circunstancias externas como por ejemplo, módulos sucios o variaciones en su rendimiento.
	';

$html .= '<pagebreak />';


	$html .= '

	<h3>Rendimiento económico acumulado en 25 años</h3>
	<div class="informacion">
		<table cellpadding="5" style:"text-align: center" class="presupuesto-2">
			<thead>
				<tr>
					<th>Año</th>
					<th>Autoconsumo</th>
					<th>Ahorro por autoconsumo</th>
					<th>Excedentes</th>
					<th>Ingresos por excedentes</th>
				</tr>
			</thead>
		';

				$i = 1;

				foreach ( $rendimiento25anios as $value ) {

					$html .= '<tr>
						
						<td style="font-weight:bold;">'.$i.'</td>
						<td>'.number_format($value['autoconsumo'], 0, '.', ',').' kWh</td>
						<td>'.number_format($value['ahorro generado'], 2, '.', ',').' €</td>
						<td>'.number_format($value['excedentes'], 0, '.', ',').' kWh</td>
						<td>'.number_format($value['ingresos por excedentes'], 2, '.', ',').' €</td>
						
						';
					
					$html .= '</tr>';
					$i ++;

				}

	$html .='
				</table>
	</div>

	<p>Los valores de rendimiento que se muestran constituyen solo una estimación y se generan de forma matemática. Lumisa Energías, S.L. no asume la responsabilidad del valor real del rendimiento, que puede diferir de los valores aquí mostrados debido a circunstancias externas como por ejemplo, módulos sucios o variaciones en su rendimiento.
	';

$html .='<pagebreak />';

	$html .= '
	<h2 class="subtitle">Nuestros proyectos</h2>
	<p>En Lumisa Energías apostamos por la energía solar, es por eso que llevamos a cabo sistemas de autoconsumo fotovoltaico y puntos de recarga. Aquí os dejamos algunos de los proyectos más representativos.</p>

	<div class="container">
		<div class="row">
			<div class="col-xs-2 subSquare" style="background-color:#f4f8fb; height:320px; ">
				<h3>Autoconsumo residencial</h3>
			</div>
			<div class="col-xs-9" style="margin-left:20px;margin-top:20px;">
				<div class="row">
					<div class="col-xs-4">
						<img src="../../public/img/instalacion-1.png" style="height: 150px;width:100%;object-fit: cover;border-image:round;">
					</div>
					<div class="col-xs-4">
						<img src="../../public/img/instalacion-2.png" style="height: 150px;width:100%;object-fit: cover;">
					</div>
					<div class="col-xs-4">
						<img src="../../public/img/instalacion-3.png" style="height: 150px;width:100%;object-fit: cover;">
					</div>
				</div>
				<div class="container">
					<div class="row">
						<div class="col-xs-4">
							<img src="../../public/img/instalacion-4.png" style="height: 150px;width:100%;object-fit: cover;">
						</div>
						<div class="col-xs-4">
							<img src="../../public/img/instalacion-5.png" style="height: 150px;width:100%;object-fit: cover;">
						</div>
						<div class="col-xs-4">
							<img src="../../public/img/instalacion-8.png" style="height: 150px;width:100%;object-fit: cover;">
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="row" style="margin-top:20px;">
			<div class="col-xs-2 subSquare" style="background-color:#e6eff6; height:150px;">
				<h3>Autoconsumo comercial</h3>
			</div>
			<div class="col-xs-9" style="margin-left:20px;margin-top:20px;">
				<div class="col-xs-6">
					<img src="../../public/img/instalacion-6.png" style="height: 150px;width:100%;object-fit: cover;">
				</div>
				<div class="col-xs-6">
					<img src="../../public/img/instalacion-7.png" style="height: 150px;width:100%;object-fit: cover;">
				</div>
			</div>
		</div>
	</div>

	
	';

$html .='<pagebreak />';


$html .='
<h2 class="subtitle" style="margin-bottom:0px!important;">Condiciones generales del Autoconsumo</h2>
<columns column-count="2" vAlign="justify" column-gap="5">
	<div align="justify" style="font-size:10px">
		<b style="color:#335B7A;">1. OBJETO DEL CONTRATO</b><br/>
		Las presentes Condiciones particulares del Autoconsumo tienen por objeto poner a disposición del Cliente las condiciones económicas para el mecanismo de compensación simplificada descrito en el Real Decreto 244/2019 para los puntos de suministro con tarifas de acceso 2.0TD y 3.0TD. Para el resto de las estipulaciones no especificadas en las siguientes condiciones se regirá en base a las Condiciones Generales de la contratación.<br/>
		<b style="color:#335B7A;">2. CONDICIONES DE LA OFERTA</b><br/>
		2.1. Este Contrato se regirá por las estipulaciones contenidas en el mismo y deberá cumplir en todo momento los requisitos y exigencias documentales requeridos por la normativa vigente. Asimismo, sus condiciones especiales de facturación, suministro y medida estarán regidas por lo dispuesto en el Anexo y en los RD 900/2015 y 244/2019 así como otra normativa aplicable.<br/>
		2.2. El usuario ha de estar acogido al mecanismo de compensación simplificada definida en el Real Decreto 244/2019 del 5 de abril por el cual se recompensa con una reducción de su factura de electricidad al autoconsumidor que integre su energía generada y no consumida en la red, no pudiendo simultanear los tipos o modalidades de Autoconsumo en un mismo periodo de tiempo.<br/>
		<b style="color:#335B7A;">3. PERMISOS Y APROBACIONES</b><br/>
		El Cliente, con la ayuda de <strong>LUMISA</strong>, será responsable de obtener los permisos y aprobaciones necesarias de las autoridades pertinentes antes de la Instalación fotovoltaica incluyendo la verificación pertinente de las restricciones o limitaciones derivadas del Plan General de Ordenación Urbana, ordenanzas municipales, patrimonio histórico, permisos de construcción, suministro eléctrico y acuerdos de conexión con el propietario de la red local, y, en su caso y de estar permitido, acuerdos de compraventa de excedentes de electricidad con el suministrador de electricidad del Cliente.<br/>
		<b style="color:#335B7A;">4. PRECIO DE LA INSTALACIÓN</b><br/>
		4.1. El precio ofrecido por <strong>LUMISA</strong> en el Contrato será el precio final del Sistema de Autoconsumo (en adelante, “Instalación fotovoltaica”), siempre que la información relativa al suministro del Cliente sea correcta. Si la información proporcionada por el Cliente fuese errónea o engañosa, <strong>LUMISA</strong> tendrá derecho a ajustar los precios o a suspender el proyecto sin asumir responsabilidad alguna para con el Cliente. La cancelación por parte del cliente ante estos errores conllevará el pago de la tasa de cancelación. El aumento en los costes derivado de información errónea relativa a las condiciones técnicas de la propiedad del Cliente facilitada por el Cliente se facturará íntegramente a éste. Si el Cliente proporciona información errónea, la Instalación fotovoltaica volverá a presupuestarse y se completará.<br/>
		4.2. Los precios y tarifas incluyen la instalación de la Instalación fotovoltaica completa, incluyendo todos los materiales, mano de obra y puesta en marcha del servicio, salvo que se especifique lo contrario en el contrato. Los precios no incluyen los costes relacionados con los requisitos locales de los propietarios de la red pública, de acuerdo con la normativa vigente, así como los gastos del permiso de construcción que cada municipio pueda exigir para la instalación.<br/>
		4.3. <strong>LUMISA</strong> podrá exigir que la instalación se pague parcial o totalmente antes de que ésta se inicie. Los Clientes con financiación deberán informar a <strong>LUMISA</strong> en caso de que dicha financiación sea rechazada.<br/>
		<b style="color:#335B7A;">5. FINANCIACIÓN Y SUBVENCIONES</b><br/>
		5.1. <strong>LUMISA</strong>  a través la entidad Caixabank Payments & Consumer, E.F.C., E.P., S.A.U y sujeta a su autorización, facilita el pago del coste de la instalación y de los equipamientos (importe mínimo 250 € y máximo de 30.000 €) para instalaciones fotovoltaicas de autoconsumo. Caixabank Payments & Consumer ofrece dos tarifas disponibles. Tarifa sin intereses, financiación máxima a 20 meses, TIN 0%, TAE 11,69 %, gastos de apertura. Tarifa con intereses, financiación máxima a 48 meses. TIN 14,9%, TAE 15,96%, coeficiente de interés, sin comisión de apertura.<br/>
		5.2. <strong>LUMISA</strong> no se responsabiliza de la aprobación de subvenciones nacionales o locales o de planes de ayuda al Cliente. Todos los precios podrán ser brutos y netos de subvenciones, el Cliente siempre será responsable del pago del precio bruto en el momento de la instalación de la Instalación fotovoltaica.<br/>
		<b style="color:#335B7A;">6. PRECIO DEL SUMINISTRO ELÉCTRICO</b><br/>
		6.1. El precio del término de potencia y del término de energía se mantendrán fijos durante 12 meses, sin perjuicio de su actualización según la variación correspondiente al IPC el 1 de enero de cada año en que el contrato esté vigente. Las variaciones que se den en los componentes regulados que le son de aplicación, así como nuevos que puedan aparecer, se trasladarán al cliente, tanto al alza como a la baja. Los precios se podrán actualizar, cada 1 de enero, con el valor del IPC real (Último Índice de Precios al Consumo interanual general nacional publicado oficialmente en el momento de la actualización). Se repercutirán en cada momento las variaciones a la baja o al alza en las tarifas y peajes de acceso, cánones y en los valores regulados que puedan ser aprobados por la Administración para su aplicación durante el contrato, tomando como base el Real Decreto 1164/2001 y la Orden IET/2735/2015.<br/>
		6.2. Cualquier tipo de promoción, descuento y/o complemento sobre el precio ofrecido al Cliente por parte de <strong>LUMISA</strong> se limitará a las circunstancias específicas para las que se otorgaron o al tiempo de duración establecido en aquellas sin generar consolidación o derecho alguno al Cliente en el mantenimiento del citado precio. Igualmente, la aplicación del descuento promocional estará condicionada al cumplimiento del periodo de duración del Contrato, perdiendo el Cliente el derecho a los descuentos y promociones aplicadas en caso de terminación del contrato o baja del punto de suministro.<br/>
		<b style="color:#335B7A;">7. PRECIO DE LA ENERGÍA EXCEDENTARÍA</b><br/>
		7.1. La Compensación Simplificada consiste en una compensación económica de la que no podrá resultar un ingreso a favor del Cliente, o mecanismo equivalente según resulte aplicable en cada momento. La compensación únicamente se aplicará al término de energía consumida, y no afectará a los otros costes.<br/>
		7.2. El precio de la energía excedentaria (energía generada y no autoconsumida) se realizará aplicando el precio de 0,08 €/kWh.
		7.3. El precio de compensación pactado en las Condiciones Particulares será actualizado como mínimo anualmente. Estas modificaciones serán comunicadas al Cliente con una antelación mínima de un mes a la aplicación de las modificaciones y, en caso de que supongan una disminución del precio, el Cliente podrá resolver el Contrato comunicándolo a <strong>LUMISA</strong> en el plazo de quince (15) días naturales siguientes a dicha comunicación.<br/>
		<b style="color:#335B7A;">8. PRECIO DEL ALQUILER DEL CONTADOR</b><br/>
		El precio mensual del alquiler del contador de electricidad será el fijado en cada momento por el Ministerio de Industria, Energía y Turismo para la Tarifa de acceso correspondiente y que cobre la Empresa Distribuidora, al que se le incorporará el I.V.A. y será indicado en las facturas emitidas por <strong>LUMISA</strong>.<br/>
		<b style="color:#335B7A;">9. INSTALACIÓN</b><br/>
		9.1. <strong>LUMISA</strong> colabora con empresas externas (en adelante el “Instalador”) en los trabajos de ingeniería, instalación y entrega de la Instalación fotovoltaica. El cliente acepta el uso de empresas externas para llevar a cabo dichas acciones.<br/>
		9.2. El Instalador es quien lleva a cabo la ingeniería, planificación e instalación de la Instalación fotovoltaica, incluyendo los componentes y el diseño eléctrico y mecánico. La ingeniería del proyecto se basa en la información facilitada por el Cliente, tal que la dirección de su suministro y la información relativa al material del tejado y sus dimensiones, pudiendo proponer cambios o modificaciones en la instalación y en los materiales con el fin de conseguir el rendimiento necesario.<br/>
		9.3. El Cliente deberá permitir y asegurar el acceso sin obstáculos a su punto de suministro al Instalador con el fin de instalar la Instalación fotovoltaica.<br/>
		9.4. El Cliente, junto con el Instalador, será el responsable de obtener los permisos y aprobaciones necesarias de las autoridades pertinentes antes de la instalación de la Instalación fotovoltaica. <strong>LUMISA</strong> no se responsabiliza de los procesos de obtención de permisos en nombre del Cliente. <strong>LUMISA</strong> se reserva el derecho a proporcionar información al Cliente para ayudarle en el proceso de obtención de permisos y aprobaciones.<br/>
		9.5. El Cliente será el responsable de notificar a la compañía aseguradora la instalación de la Instalación fotovoltaica en la propiedad del Cliente.<br/>
		<b style="color:#335B7A;">10. DURACIÓN DE LA INSTALACIÓN</b><br/>
		<strong>LUMISA</strong> facilitará al Cliente un plazo y duración estimado de instalación. El Instalador fijará la fecha real de la instalación durante la fase de planificación del proyecto y será comunicado al Cliente. La fecha de instalación podrá modificarse posteriormente por cuestiones relacionadas con las aprobaciones y permisos, entre otras limitaciones. <strong>LUMISA</strong> no es responsable de los tiempos de instalación superiores a los previstos.<br/>
		<b style="color:#335B7A;">11. Puesta en marcha de la instalación</b><br/>
		11.1. La puesta en marcha, incluida la puesta en servicio de la producción de energía, se realiza tras la aprobación por parte de las autoridades locales. En algunos casos, se requiere que el contador eléctrico del propietario se cambie antes de la puesta en marcha de la Instalación fotovoltaica. <strong>LUMISA</strong> no se responsabiliza de los retrasos en la producción de energía de la Instalación fotovoltaica causados por el cambio del contador por parte del propietario de la red.<br/>
		11.2. El Cliente acepta que la Instalación fotovoltaica se entenderá terminada tras la puesta en marcha y entrega de la documentación facilitada por el Instalador.<br/>
		11.3. <strong>LUMISA</strong> enviará una factura al Cliente en el momento de la Entrega de la Instalación fotovoltaica por parte del instalador. El Cliente deberá pagar la factura en un plazo de 10 días a contar desde la recepción de esta. En caso de retraso en el pago, el Cliente deberá pagar intereses de demora de conformidad con la legislación aplicable.<br/>
		<b style="color:#335B7A;">12. FACTURACIÓN</b><br/>
		12.1. En la modalidad de Autoconsumo con Excedentes Acogido a Compensación Simplificada, ya sea individual o colectivo, <strong>LUMISA</strong> facturará al Cliente la cantidad a abonar derivada del presente Contrato en virtud de las lecturas recibidas por la Empresa Distribuidora, y de conformidad a la forma y periodicidad establecida en la normativa vigente.<br/>
		12.2. El importe máximo a compensar por la energía excedentaria en cada factura no podrá superar el importe del término de Energía consumida, compensación que se realizará de conformidad con las curvas horarias recibidas por parte de la Empresa Distribuidora. En ningún caso el resultado de la compensación podrá ser negativo, ni tampoco se podrá compensar con el término de potencia. El término pactado en las Condiciones Particulares para la Energía excedentaria se aplicará sobre las cantidades a facturar previas a los impuestos. En todo caso la compensación se realizará dentro del periodo mensual de facturación.<br/>
		12.3. El precio pactado se aplicará sobre las cantidades a facturar previas a los impuestos. En todo caso la compensación se realizará dentro del periodo mensual de facturación.<br/>
		12.4. <strong>LUMISA</strong> sólo estará obligado a realizar la compensación excedentaria prevista en el apartado anterior una vez haya recibido las correspondientes liquidaciones del Operador del Sistema. En el supuesto en que <strong>LUMISA</strong> no disponga de las lecturas de consumos o curva horaria del Cliente, éste le autoriza expresamente a realizar la facturación en base a un consumo estimado según los datos disponibles, que será regularizado posteriormente en función de los consumos reales que aporte la Empresa Distribuidora.<br/>
		<b style="color:#335B7A;">13. DURACIÓN DEL CONTRATO</b><br/>
		13.1. La duración del presente contrato es de 12 meses desde la fecha de inicio del suministro. El contrato se podrá prorrogar por anualidades sucesivas de acuerdo a las Condiciones Generales.<br/>
		13.2. El Cliente deberá permanecer durante al menos un (1) año en la modalidad de Autoconsumo elegida a contar desde la activación del suministro. Con carácter excepcional, esta obligación de permanencia no resulta de aplicación para los autoconsumos existentes al amparo del Real Decreto 900/2015, de 9 de octubre.<br/>
		13.3. El Contrato entrará en vigor a la fecha de su activación, quedando condicionada su efectividad al cumplimiento de las siguientes obligaciones:<br/>
		A la verificación por <strong>LUMISA</strong> de los datos aportados por el Cliente, reservándose el derecho a rechazar el Contrato en caso de discrepancia o incorreción de datos, en caso de existir deuda anterior pendiente, o en el caso de que el Cliente esté incurso en concurso de acreedores, quiebra o situación análoga.<br/>
		<strong>LUMISA</strong> podrá consultar ficheros relativos al incumplimiento de obligaciones dinerarias para conocer la solvencia del Cliente. Por ende, <strong>LUMISA</strong> se reserva el derecho de rechazar el Contrato si el Cliente está inscrito en un registro de solvencia patrimonial o de crédito.<br/>
		Al momento en el que el Cliente aporta toda la documentación necesaria que legalmente resulte exigible para el suministro de energía o autoconsumo.<br/>
		Al momento en el que las instalaciones, incluida la instalación de generación, en su caso, cumplan los requisitos establecidos por la reglamentación vigente, y se disponga del acceso a la red de distribución y éste se haya hecho efectivo, sin que exista responsabilidad por parte de <strong>LUMISA</strong> de las demoras en la fecha de inicio del suministro.<br/>
		A que la Empresa Distribuidora notifique la aceptación de la modalidad de Autoconsumo escogida por el Cliente.<br/>
		13.4. En el supuesto que el Cliente hubiera establecido en las Condiciones Particulares una fecha prevista de activación del suministro, en todo caso ésta queda condicionada a la aceptación y conexión por parte de la Empresa Distribuidora, exonerando el Cliente a <strong>LUMISA</strong> de cualquier retraso que pudiera producirse.<br/>
		<b style="color:#335B7A;">14. GARANTÍAS</b><br/>
		14.1. Garantía sobre la instalación:<br/>
		Una vez terminada la instalación, el Instalador concede una garantía 2 años sobre el trabajo realizado por el Instalador. Cualquier daño causado por el Instalador dentro del período de garantía será reparado y/o compensado de acuerdo con los presentes Condiciones particulares. El Cliente será el responsable de notificar a <strong>LUMISA</strong> cualquier daño sufrido, dentro del periodo de garantía. Los daños sufridos debido a la falta de comunicación por parte del Cliente no estarán cubiertos por la garantía sobre la Instalación. El período de garantía comienza tras la puesta en marcha y entrega de la documentación facilitada por el Instalador. Cualquier trabajo realizado por el Cliente o un tercero durante el período de garantía de la Instalación anulará dicha garantía.<br/>
		14.2. Garantía sobre los módulos:<br/>
		El Fabricante de los módulos concede una garantía de 10 años sobre los módulos utilizados en la Instalación. Cualquier módulo defectuoso durante su período de garantía será reemplazado o reparado a discreción del Instalador. Cualquier trabajo realizado sobre los módulos instalados por el Cliente o un tercero durante el período de garantía de la Instalación anulará dicha garantía.<br/>
		14.3. Garantía de rendimiento:<br/>
		El Fabricante de los módulos garantiza que los módulos fotovoltaicos producirán al menos el 80% de su potencia etiquetada en 25 años.<br/>
		<b style="color:#335B7A;">15. RESPONSABILIDADES</b><br/>
		15.1. El Cliente será el único responsable de subsanar cualquier anomalía y mantener en adecuadas condiciones sus instalaciones de electricidad, de las Instalaciones fotovoltaicas, de alumbrado de emergencia y de equipos de extintores de incendio.<br/>
		15.2. El Cliente informará a <strong>LUMISA</strong> de cualquier circunstancia que altere la misma y, en particular, cualquier cambio que realice para modificar su conexión y/o posibilitar su aislamiento de la red, así como cualquier modificación en su contrato de compensación de excedentes o en el acuerdo de coeficientes de reparto de la generación compartida entre todos los participantes, según corresponda.<br/>
		15.3. En las modalidades de Autoconsumo con Excedentes cuando las instalaciones de producción próximas y asociadas al consumo compartan infraestructura de conexión a la red de transporte o distribución o se conecte a través de la red interior de un consumidor, los consumidores y productores serán responsables solidarios de las incidencias provocadas a la red de transporte o distribución de conformidad con lo establecido por la Ley 24/2013, RD 1699/2011 y el RD 1955/200, aceptando las consecuencias que la desconexión del punto de suministro pueda conllevar para las partes, como la imposibilidad de verter y/o adquirir energía de la red.<br/>
		15.4. En relación con las incidencias provocadas en la red de transporte o distribución por las instalaciones acogidas a alguna de las modalidades de Autoconsumo se estará a lo dispuesto en la Ley 24/2013, de 26 de diciembre, y en su normativa de desarrollo y en particular a lo recogido en Real Decreto 1699/2011, de 18 de noviembre, por el que se regula la conexión a red de instalaciones de producción de energía eléctrica de pequeña potencia, para instalaciones incluidas en su ámbito de aplicación y en el Real Decreto 1955/2000, de 1 de diciembre.<br/>
		15.5. <strong>LUMISA</strong> no es responsable de ningún daño a la propiedad del Cliente causado por negligencia del Cliente o por el incumplimiento por parte del Cliente de las presentes condiciones.<br/>
		<b style="color:#335B7A;">16. MARKETING</b><br/>
		El Cliente concede a <strong>LUMISA</strong> el derecho a utilizar libremente las imágenes de la propiedad del Cliente, la Instalación fotovoltaica y el proceso de instalación en sus actividades de marketing, incluyendo la cobertura de los medios de comunicación social.<br/>
		<b style="color:#335B7A;">17. LEGISLACIÓN</b><br/>
		El presente Contrato de Suministro se regirá por las estipulaciones contenidas en el mismo y por la normativa vigente en cada momento, especialmente por lo dispuesto en la legislación del Sector Eléctrico, y el RD 244/2019 en lo relativo al Autoconsumo.<br/>
		<b style="color:#335B7A;">18. PROTECCIÓN DE DATOS DE CARÁCTER PERSONAL</b><br/>
		18.1. ¿Quién es el responsable del tratamiento de sus datos? <strong>LUMISA</strong>, sito en c/Badajoz 145 3ª, 08018 BARCELONA con CIF B65711855 es el Responsable del tratamiento de los datos personales del Usuario y le informa que estos datos serán tratados de conformidad con lo dispuesto en las normativas vigentes en protección de datos personales, el Reglamento (UE) 2016/679 de 27 de abril de 2016 (GDPR) y la Ley Orgánica 3/2018, de 5 de diciembre (LOPDGDD), relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos personales y a la libre circulación de estos datos.<br/>
		18.2. ¿A quiénes comunicaremos sus datos? <strong>LUMISA</strong> sólo comunicará los datos a Organismos e Instituciones públicas de la Administración General del Estado, así como la Empresa Distribuidora con el fin de poder contratar en nombre del cliente.<br/>
		18.3. ¿Con qué finalidad tratamos sus datos? A los efectos de lo dispuesto en la normativa vigente relativa a tratamientos de datos de carácter personal, <strong>LUMISA</strong> informa al Cliente que sus datos serán incorporados a un fichero automatizado o manual creado bajo la responsabilidad de <strong>LUMISA</strong>, con la finalidad de realizar el mantenimiento y la gestión de la relación contractual con el Cliente, así como de las labores de información y comercialización de los servicios ofrecidos por <strong>LUMISA</strong> o por terceros y de actividades relacionadas con los mismos para lo que el Cliente consiente en modo expreso, preciso e inequívoco a la firma del Contrato de Suministro.<br/>
		18.4. ¿Por cuánto tiempo conservaremos sus datos? Los datos de carácter personal se conservarán durante no más tiempo del necesario para mantener el fin del tratamiento y cuando ya no sea necesario para tal fin, se suprimirán con medidas de seguridad adecuadas.<br/>
		18.5. ¿Cómo hemos obtenido sus datos? Este tratamiento sólo será realizado si <strong>LUMISA</strong> cuenta con el consentimiento del interesado. Dicho consentimiento se entenderá otorgado si el interesado proporciona sus datos personales para esta finalidad a través del formulario establecido a tal efecto en la presente página web u otros medios. A su vez, a la firma de este Contrato el Cliente consiente expresamente la cesión y tratamiento de los datos de carácter personal contenidos en el fichero a <strong>LUMISA</strong> o sus filiales para que se les pueda remitir por cualquier medio, información comercial, de los productos y servicios comercializados por <strong>LUMISA</strong> y sus filiales o terceros relacionados con el suministro de energía. De la misma forma el Cliente presta su consentimiento para el tratamiento de los datos contenidos en el fichero a aquellas empresas cuya intervención sea necesaria para la prestación del servicio. Cualquier otra utilización de los datos de carácter personal contenidos en el fichero, requerirá el consentimiento del Cliente. Los datos personales objeto de tratamiento por <strong>LUMISA</strong> son los obtenidos del usuario a través del uso de las plataformas digitales o físicos y la contratación de productos o servicios. Por ello, el usuario garantiza que todos los datos facilitados son de su titularidad o bien está autorizado para dicha cesión por el titular de los mismos. El Cliente declara que todos los datos aportados a <strong>LUMISA</strong> son veraces, comprometiéndose a mantenerlos actualizados. El Cliente será responsable de los datos facilitados, tal que si el Cliente proporcionara CUPS erróneo, se estaría dando de alta a un tercero, siendo el Cliente el único responsable de los daños causados por esta situación.<br/>
		18.6. ¿Cuáles son sus derechos en relación al tratamiento de sus datos personales? El Cliente podrá revocar en cualquier momento su consentimiento, así como ejercitar sus derechos de oposición, acceso, portabilidad, rectificación, limitación, y supresión de datos, datos contenidos en los ficheros citados con anterioridad mediante comunicación escrita a <strong>LUMISA</strong> en la siguiente dirección: A/A: Apartado de correos 18002, 08018 Barcelona, España o bien mediante correo electrónico dirigido a protecciondedatos@lumisa.es, adjuntando fotocopia de su DNI. Así como Derecho a presentar una reclamación ante la Agencia Española de Protección de Datos si considera que el tratamiento no se ajusta a la normativa vigente.
	</div>
';

$html .='
<columns column-count="1" vAlign="justify" column-gap="0">
<div class="informacion" style="margin-top:20px;">
	<p style="font-size:11px;line-height:15px;">Este documento ha sido elaborado y es propiedad de COMPAÑÍA LUMISA ENERGÍAS, S.L. (en adelante, Lumisa). El presente documento se destina al uso exclusivamente interno y personal del destinatario al que ha sido entregado por Lumisa y no podrá ser reproducido, publicado o redistribuido, parcial ni totalmente, sin la expresa autorización de Lumisa. La información contenida tiene carácter exclusivamente informativo, en su caso como oferta no vinculante, sin que el mismo suponga un compromiso contractual por ninguna de las partes y su contenido debe ser considerado únicamente como información comercial. Los iconos utilizados son una obra derivada de contenidos obtenidos en www.flaticon.com realizados por Freepik desde www.flaticon.com. Vectores de Logo creados por starline - www.freepik.es.</p>
</div>
';



$stylesheet = file_get_contents('../../public/css/style-presupuesto.css');

$mpdf->WriteHTML($stylesheet, 1);

$filename = "presupuesto-autoconsumo.pdf";

$mpdf->mirrorMargins = 1;

$mpdf->SetTitle('Presupuesto Autoconsumo');

$mpdf->WriteHTML($html);

$mpdf->Output($filename, 'I');

?>
