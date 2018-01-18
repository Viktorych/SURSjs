var DATA = new Data();
var gr = new Gr(770, 490, "Вес.");
gr.x_ = DATA.netto;
var paper = 0;
var gr_s = new Gr(770, 250, "Скорость.");
gr_s.value_y.max = 20;
gr_s.value_y.min = 0;
gr_s.value_y.step = 5;

var paper_s = 0;

$(document).ready(function () {

	paper = Snap("#svg_wight").attr({
		width: gr.w,
		height: gr.h
	});
	paper_s = Snap("#svg_speed").attr({
		width: gr_s.w,
		height: gr_s.h
	});

	/*$('#netto').val(DATA.netto);
	$("#wight1").val(DATA.steps.wight1);
	$("#speed1").val(DATA.steps.speed1);
	$("#wight2").val(DATA.steps.wight2);
	$("#speed2").val(DATA.steps.speed2);
    */
	$("#netto").change(function () {
		Calc();
	});
	$("#netto").change(function () {
		Calc();
	});
	$("#wight1").change(function () {
		Calc();
	});
	$("#wight2").change(function () {
		Calc();
	});
	$("#speed1").change(function () {
		Calc();
	});
	$("#speed2").change(function () {
		Calc();
	});
	
	$('#netto').NumBox({
		symbol: ' кг.',
		location: 'r',
		type: 'integer'
	});
	$('#wight1').NumBox({
		symbol: ' кг.',
		location: 'r',
		type: 'integer'
	});
	$('#wight2').NumBox({
		symbol: ' кг.',
		location: 'r',
		type: 'integer'
	});
	$('#speed1').NumBox({
		symbol: ' кг/c',
		location: 'r',
		type: 'integer'
	});
	$('#speed2').NumBox({
		symbol: ' кг/c',
		location: 'r',
		type: 'integer'
	});


	var steel = [{
			name: "Сталь1",
			value: 10
			},
		{
			name: "Сталь2",
			value: 1
			},
		{
			name: "Сталь3",
			value: 2
			},
		{
			name: "Сталь4",
			value: 4
			}
		];
	
	Calc();
}); //Конец $



function repaint() {
	gr.value_y.max = DATA.netto;
	gr.value_y.min = DATA.netto - DATA.brutto;
	gr.time_1 = DATA.time_1;
	gr.paint(paper);
	gr_s.paint(paper_s);

	paper.polyline(gr.convert_coord_line(0, gr.grid_ko_y * (DATA.netto - gr.y_min_to_Grid), gr.grid_ko_x * DATA.time_1, gr.grid_ko_y * (DATA.netto - DATA.steps.wight1 - gr.y_min_to_Grid))).attr({
		stroke: gr.line_wight.color,
		strokeWidth: gr.line_wight.thickness
	});
	paper.polyline(gr.convert_coord_line(gr.grid_ko_x * DATA.time_1, gr.grid_ko_y * (DATA.netto - DATA.steps.wight1 - gr.y_min_to_Grid), gr.grid_ko_x * DATA.time_all, gr.grid_ko_y * (DATA.netto - DATA.steps.wight1 - DATA.steps.wight2 - gr.y_min_to_Grid))).attr({
		stroke: gr.line_wight.color,
		strokeWidth: gr.line_wight.thickness
	});
	paper_s.polyline(gr_s.convert_coord_line(0, gr_s.grid_ko_y * DATA.steps.speed1, gr.grid_ko_x * DATA.time_1, gr_s.grid_ko_y * DATA.steps.speed1)).attr({
		stroke: gr.line_wight.color,
		strokeWidth: gr.line_wight.thickness
	});
	paper_s.polyline(gr_s.convert_coord_line(gr.grid_ko_x * DATA.time_1, gr_s.grid_ko_y * DATA.steps.speed1, gr.grid_ko_x * DATA.time_1, gr_s.grid_ko_y * DATA.steps.speed2)).attr({
		stroke: gr.line_wight.color,
		strokeWidth: gr.line_wight.thickness
	});
	paper_s.polyline(gr_s.convert_coord_line(gr.grid_ko_x * DATA.time_1, gr_s.grid_ko_y * DATA.steps.speed2, gr.grid_ko_x * DATA.time_all, gr_s.grid_ko_y * DATA.steps.speed2)).attr({
		stroke: gr.line_wight.color,
		strokeWidth: gr.line_wight.thickness
	});
}

function Calc() {

	DATA.netto = $("#netto").NumBox('getRaw');
	DATA.steps.wight1 = $("#wight1").NumBox('getRaw');
	DATA.steps.wight2 = $("#wight2").NumBox('getRaw');
	DATA.steps.speed1 = $("#speed1").NumBox('getRaw');
	DATA.steps.speed2 = $("#speed2").NumBox('getRaw');
	DATA.CalcData()
	gr.value_y.max = DATA.netto;
	gr.value_y.min = DATA.netto - DATA.brutto;
	gr.value_x.max = DATA.time_all;
	gr.value_x.min = 0;
	gr_s.value_x.max = DATA.time_all;
	gr_s.value_x.min = 0;
	$("#brutto").html(DATA.brutto + " кг.");
	$("#time_all").html(seс_to_min(DATA.time_all));
	$("#time_1").html(seс_to_min(DATA.time_1));
	$("#time_2").html(seс_to_min(DATA.time_2));
	repaint();
}

function seс_to_min(sec) {
	m = Math.floor(sec / 60);
	s = Math.floor(sec - m * 60);
	if (m < 10) m = "0" + m;
	if (s < 10) s = "0" + s;
	return m + ":" + s + " (" + Math.round(sec) + " сек.)";
}
