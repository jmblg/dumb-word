// -------------- CANVAS

let canvas_plank; let canvas_water;
let canvascontext2D_plank; let canvascontext2D_water;
let canvas_plank_width = window.innerWidth, canvas_plank_height = window.innerHeight - window.innerHeight/5, canvas_water_width = window.innerWidth, canvas_water_height = window.innerHeight/5;

let scene_plank = new Array();
let scene_water = new Array();

let amibes_progression = 0;
let score = 0;

let bgcolor = "black";

function initialisation2() {
	canvas_plank = document.getElementById('canvas-plank'); canvas_water = document.getElementById('canvas-water');

	canvascontext2D_plank = canvas_plank.getContext('2d'); canvascontext2D_water = canvas_water.getContext('2d');

	canvas_plank_width = window.innerWidth; canvas_plank_height = window.innerHeight - window.innerHeight/5; canvas_water_width = window.innerWidth; canvas_water_height = window.innerHeight/5;

	scene_plank = new Array(); scene_water = new Array();

	scene_plank.amibe1 = new Array(); scene_plank.amibe1.imgt = new Array(); scene_plank.amibe2 = new Array(); scene_plank.amibe2.imgt = new Array();
	scene_plank.amibe1.imgt[0] = new Image(); scene_plank.amibe1.imgt[0].src = "img/amibe1a.png"; scene_plank.amibe1.imgt[1] = new Image(); scene_plank.amibe1.imgt[1].src = "img/amibe1b.png";
	scene_plank.amibe2.imgt[0] = new Image(); scene_plank.amibe2.imgt[0].src = "img/amibe2a.png"; scene_plank.amibe2.imgt[1] = new Image(); scene_plank.amibe2.imgt[1].src = "img/amibe2b.png";
	scene_plank.amibe1.sprite = 0; scene_plank.amibe1.x = 0; scene_plank.amibe1.y = 0; scene_plank.amibe1.walk = 0; scene_plank.amibe1.fall = false; scene_plank.amibe1.jump = false; scene_plank.amibe1.jump_to = "-";
	scene_plank.amibe2.sprite = 0; scene_plank.amibe2.x = 0; scene_plank.amibe2.y = 0; scene_plank.amibe2.walk = 0; scene_plank.amibe2.ready = false; scene_plank.amibe2.moveback = false; scene_plank.amibe2.moveback_startx = 0;

	scene_plank.plank = new Array(); scene_plank.plank.img = new Image(); scene_plank.plank.img.src = "img/plank.png";
	scene_plank.plank.x = 0; scene_plank.plank.y = 0;
	
	scene_water.water = new Array(); scene_water.water.imgt = new Array();
	scene_water.water.imgt[0] = new Image(); scene_water.water.imgt[0].src = "img/water1.png"; scene_water.water.imgt[1] = new Image(); scene_water.water.imgt[1].src = "img/water2.png"; scene_water.water.imgt[2] = new Image(); scene_water.water.imgt[2].src = "img/water3.png";
	scene_water.water.sprite = 0, scene_water.water.time_initial = 15, scene_water.water.time = scene_water.water.time_initial;
	scene_water.shark = new Array(); 
	scene_water.shark.img = new Image(); scene_water.shark.img.src = "img/shark.png";
	scene_water.shark.orientation = 1, scene_water.shark.x = 0, scene_water.shark.y = 0;
	scene_water.plouf = new Array(); scene_water.plouf.imgt = new Array();
	scene_water.plouf.imgt[0] = new Image(); scene_water.plouf.imgt[0].src = "img/plouf1.png"; scene_water.plouf.imgt[1] = new Image(); scene_water.plouf.imgt[1].src = "img/plouf2.png"; scene_water.plouf.imgt[2] = new Image(); scene_water.plouf.imgt[2].src = "img/plouf3.png";
	scene_water.plouf.sprite = 0, scene_water.plouf.time_initial = 3, scene_water.plouf.time = 0, scene_water.plouf.go = false;
	
	amibes_progression = canvas_plank_width/14;
	score = 9;
	
	$("#txt").css("color","black");
	$("#txt").css("transform","scale(1.25)");
	}

function animation2()
	{
	if (scene_plank.amibe1.walk > 0)
		{
		scene_plank.amibe1.x++;
		scene_plank.amibe1.walk--;
		}
	else
		{
		scene_plank.amibe1.walk = 0;
		if ((scene_plank.amibe1.x != scene_plank.amibe2.x)&&(scene_plank.amibe2.ready == true))
			{
			scene_plank.amibe2.walk = scene_plank.amibe1.x-scene_plank.amibe2.x; scene_plank.amibe2.ready = false;
			}
		}
		
	if (scene_plank.amibe2.walk > 0)
		{
		scene_plank.amibe2.sprite = 0;
		scene_plank.amibe2.x++;
		scene_plank.amibe2.walk--;
		}
	else
		{
		scene_plank.amibe2.walk = 0;
		}
		
	if (scene_plank.amibe1.fall == true)
		{
		if (scene_plank.amibe1.walk <= 0)
			{
			scene_plank.amibe1.y += 5;
			if (scene_plank.amibe1.y >= canvas_plank_height - canvas_plank_height/4)
				{
				scene_water.plouf.go = true;
				}
			}
		}
		
	if (scene_plank.amibe1.jump == true)
		{
		if (scene_plank.amibe1.jump_to == "-")
			{
			scene_plank.amibe1.y -= 2.5;
			if (scene_plank.amibe1.y <= -20) { scene_plank.amibe1.jump_to = "+"; }
			}
		else
			{
			scene_plank.amibe1.y += 2.5;
			if (scene_plank.amibe1.y >= 0) { scene_plank.amibe1.jump_to = "-"; }
			}
		}
		
	if (scene_plank.amibe2.moveback == true)
		{
		scene_plank.amibe2.x--;
		if (scene_plank.amibe2.x < scene_plank.amibe2.moveback_startx-20) { scene_plank.amibe2.moveback = false; }
		}
		
	if (scene_water.water.time <= 0)
		{
		switch (scene_water.water.sprite)
			{
			case 0 : scene_water.water.sprite = 1; break;
			case 1 : scene_water.water.sprite = 2; break;
			case 2 : scene_water.water.sprite = 0; break;
			}
		scene_water.water.time = scene_water.water.time_initial;
		}
	else
		{
		scene_water.water.time--;
		}
		
	if (scene_water.shark.orientation == 1)
		{
		scene_water.shark.x+=2;
		if (scene_water.shark.x >= canvas_water_width) { scene_water.shark.x = -canvas_water_width-50; scene_water.shark.orientation = -1; }
		}
	else
		{
		scene_water.shark.x+=2;
		if (scene_water.shark.x >= 0) { scene_water.shark.x = -50; scene_water.shark.orientation = 1; }
		}
		
	if (scene_water.plouf.go == true)
		{
		if (scene_water.plouf.time <= 0)
			{
			scene_water.plouf.sprite++;
			if (scene_water.plouf.sprite > 2)
				{
				scene_water.plouf.go = false;
				$("#txt").html(txt); $("#txt").css("color","red");
				}
			else
				{
				scene_water.plouf.time = scene_water.plouf.time_initial;
				}
			}
		else
			{
			scene_water.plouf.time--;
			}
		}
		
	canvascontext2D_plank.drawImage(scene_plank.plank.img,scene_plank.plank.x,scene_plank.plank.y,canvas_plank_width,canvas_plank_height);
	canvascontext2D_plank.drawImage(scene_plank.amibe2.imgt[scene_plank.amibe2.sprite],scene_plank.amibe2.x,scene_plank.amibe2.y,canvas_plank_width,canvas_plank_height);
	canvascontext2D_plank.drawImage(scene_plank.amibe1.imgt[scene_plank.amibe1.sprite],scene_plank.amibe1.x,scene_plank.amibe1.y,canvas_plank_width,canvas_plank_height);
	canvascontext2D_water.drawImage(scene_water.water.imgt[scene_water.water.sprite],0,0,canvas_water_width,canvas_water_height);
	
	if (scene_water.plouf.go == true)
		{
		canvascontext2D_water.drawImage(scene_water.plouf.imgt[scene_water.plouf.sprite],0,0,canvas_water_width,canvas_water_height);
		}
	
	canvascontext2D_water.save();
	canvascontext2D_water.scale(scene_water.shark.orientation, 1);
	canvascontext2D_water.drawImage(scene_water.shark.img,scene_water.shark.x,scene_water.shark.y,canvas_water_width,canvas_water_height);
	canvascontext2D_water.restore();
	}

var refresh2 = function()	{
							canvascontext2D_plank.clearRect(0, 0, canvas_plank_width, canvas_plank_height);
							canvascontext2D_plank.fillStyle = bgcolor;
							canvascontext2D_plank.fillRect(0, 0, canvas_plank_width, canvas_plank_height);

							canvascontext2D_water.clearRect(0, 0, canvas_water_width, canvas_water_height);
						//	canvascontext2D_water.fillStyle = "red";
						//	canvascontext2D_water.fillRect(0, 0, canvas_water_width, canvas_water_height);

							animation2();
							}

function go2() {
	initialisation2();
	setInterval(refresh2, 25);
	}

// -------------- /CANVAS

let xmlurl = "xml/infos.xml";

let txt = "", txt_hidden = "", txttcb = 0, txtt_idlg = 1;
let word_hidden = "";
let txtt = new Array();

let infos = "";
function load_xml() {
	$.ajax
			({
			type: "GET",
			data: "xml=infos",
			url: xmlurl,
			success: function(answer)
				{
				build_txtts(answer);
					
				reload();
				},
			error: function (error)
				{
				alert("Erreur. Vérifiez si vous avez bien une connexion internet.");
				}
			});
	}
	
function build_txtts(answer) {
	$(answer).find("word").each(function(){
		let en = $(this).find("language[lang='en']").text();
		let es = $(this).find("language[lang='es']").text();
		let fr = $(this).find("language[lang='fr']").text();
		// l'emplacement qui est ici NULL sert à mettre des infos dans d'autre jeux
        txtt.push([null,en,es,fr]);
		});
	}

function reload() {
	$("#txt").hide(); $("#txt").fadeIn();

	txttcb = nbralet(0,txtt.length);
	
	txt = txtt[txttcb][txtt_idlg].toUpperCase();
	txt_hidden = txt_to_hide();

	$("#txt").html(txt_hidden);
	
	$(".keyboard-block").css("visibility","visible");
	
	initialisation2();
	
	bgcolor = colorgen("fluo",1);

	$("#content").css("background-color",bgcolor);
	}
	
function txt_to_hide() {
	let answer = "";
	let cpt = txt.length;
	while (cpt != 0)
		{
		answer += "_";
		cpt--;
		}
	return answer;
	}
	
function keyboard(wt) {
	if (remove_accents(txt).includes(remove_accents(wt)) == true)
		{
		let answer = "";
		let cpt = 0;
		while (cpt != txt.length)
			{
			if (txt_hidden[cpt] == "_")
				{
				if (remove_accents(txt[cpt]) == remove_accents(wt))
					{
					answer += txt[cpt];
					scene_plank.amibe1.sprite = 1;
					}
				else { answer += "_"; }
				}
			else
				{
				answer += txt_hidden[cpt];
				}
			cpt++;
			}
		txt_hidden = answer;
		$("#txt").html(txt_hidden);

		if (txt_hidden.includes("_") == false)
			{
			scene_plank.amibe1.jump = true;
			scene_plank.amibe2.moveback = true; scene_plank.amibe2.moveback_startx = scene_plank.amibe2.x;
			$("#txt").css("transform","scale(1.5)");
			$(".keyboard-block").css("visibility","hidden");
			}
		}
	else
		{
		// -- CANVAS ---

		scene_plank.amibe1.sprite = 0; scene_plank.amibe2.sprite = 1;
		scene_plank.amibe1.walk += amibes_progression;
		scene_plank.amibe2.ready = true;

		// !-- /CANVAS ---

		score--;
		if (score <= 0)
			{
			// -- CANVAS ---
			scene_plank.amibe1.fall = true;
			// !-- /CANVAS ---
			$(".keyboard-block").css("visibility","hidden");
			}
		}

	$("#keyboard-block-" + wt).css("visibility","hidden");
	}
	
function change_lg(id_lg) {
	localStorage.setItem('savelg',id_lg);

	switch (id_lg)
		{
		case "EN" :
			txtt_idlg = 1;
		break;
		case "ES" :
			txtt_idlg = 2;
		break;
		case "FR" :
			txtt_idlg = 3;
		break;
		}
	txt = txtt[txttcb][txtt_idlg]; $("#txt").html(txt);
	}

function windowback() {
	$("#windowback").fadeOut(); $("#windowback-close").fadeOut();
	$("#help").fadeOut();
	$("#who").fadeOut();
	}


// Native code :

function mix_array(wt)	{
    for (let i = wt.length - 1; i > 0; i--)
		{
        const j = Math.floor(Math.random() * (i + 1));
        [wt[i], wt[j]] = [wt[j], wt[i]];
		}
    return wt;
	}
	
function remove_accents(wt) {
	wt = wt.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	return wt;
	}
	
function colorgen(type,transparency) {
	var rgb = "";
	switch (type)
		{
		case "dark" :
			rgb = "rgb(" + nbralet(0,200) + "," + nbralet(0,200) + "," + nbralet(0,200) + ")";
		break;
		case "fluo" :
			var the255 = nbralet(0,3);
			var the0 = nbralet(0,3);
			if (the255 == the0) { the0++; } if (the0 == 3) { the0 = 0; }
			
			var rgbt = new Array();
			rgbt[0] = nbralet(0,256); rgbt[1] = nbralet(0,256); rgbt[2] = nbralet(0,256);
			rgbt[the255] = 255; rgbt[the0] = 0;
			rgb = "rgb(" + rgbt[0] + "," + rgbt[1] + "," + rgbt[2] + ")";
		break;
		}

	return rgb;
	}
	
function colorgen_degraded(color,type) {
	var rgb = "";
	switch (type)
		{
		case "fluo" :
			color = color.replace("rgb(","");
			color = color.replace(")","");
			var rgbt = color.split(",");
			
			var cpt = 0;
			rgbt.forEach(function(element)
				{
				element = parseInt(element);
				if ((element != 255)&&(element != 0))
					{
					element += 3;
					if (element >= 255) { element = 255; }
					rgbt[cpt] = element;
					}
				cpt++;
				});

			rgb = "rgb(" + rgbt[0] + "," + rgbt[1] + "," + rgbt[2] + ")";
		break;
		}
	
	return rgb;
	}
	
function nbralet(min,max) {
	return Math.floor(Math.random() * max) + min;
	}