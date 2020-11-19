/******************
Code by Vamoss
Original code link:
https://www.openprocessing.org/sketch/830633

Author links:
http://vamoss.com.br
http://twitter.com/vamoss
http://github.com/vamoss
******************/

const gridSize = 50;
const zoom = 1.1;
const rate = 0.5;//lower values will increase number of shapes
let data = {};
let buildings = [1,5,2,4,3,9,7,8,24,17,12,20,15,46,26,21,13,26,6,36,23,30,29,31,35,52,'MP5','MP4','MP2','MP6','MP1',200,201];
let campus = {
    'MAIN': [1,5,2,4,3,9,7,8,24,17,12,20,15,46,26,21,13,26,6,36,23,30,29,31,35,52],
    'MP': ['MP5','MP4','MP2','MP6','MP1'],
    'SOUTH' : [200,201]
};
// Show 28 bldgs
let mapping = {}
let x_arr = [22,22,28,23,19,20,28,30,17,30,24,22,24,26,29,30,28,27,30,  60,58,57,55,54,68,10,69,  15,14,14,16,18,18,20,22,24,30,    25,22,19]
let y_arr = [1, 5, 2, 9, 18,25,28,28,34,34,36,38,41,40,40,43,45,44,49,  32,36,38,46,49,40,40,43,  50,46,42,37,42,45,50,48,49,55,    72,71,72]

function setup() {
	createCanvas(windowWidth, windowHeight);
	stroke(0);
    noFill();
    loadJSON('apl_people.json', setData)
}

function setData(_data){
    data = _data['elements']
    data.forEach(x=>x['building_num'] = buildings[Math.floor(Math.random() * buildings.length)])
    data.forEach(function(x){
        if (x['building_num'] in campus['MAIN']) x['campus_site'] = 'MAIN'
        if (x['building_num'] in campus['MP']) x['campus_site'] = 'MP'
        if (x['building_num'] in campus['SOUTH']) x['campus_site'] = 'SOUTH'
    })
    console.log(data)
}

function draw() {
    background(255);
    for(let ii=0; ii<x_arr.length; ii++){
        drawRandomPattern(x_arr[ii]*5, y_arr[ii]*5);
    }
}

function drawRandomPattern(x, y) {
    push();
    // console.log(x)
	translate(x, y);
	//scale
	translate(gridSize, gridSize*2);
	// scale(zoom);
	// translate(-gridSize/2, -gridSize/2);
	
	let size = map(noise(x/gridSize/2, y/gridSize/2, millis()/8500), 0.2, 0.6, gridSize/8, gridSize/2);
	let mill = millis();
    mainColor = color(40, 204, 0);
    mainColor.setAlpha(100);
    mpColor = color(0, 10, 160);
    mpColor.setAlpha(100);
    baseCol = color(255,100,0);
    baseCol.setAlpha(100);
	for(let j = 0 ; j < 3; j++){
		// if(noise(x/gridSize/2 + j * 4, y/gridSize/2 + j * 3.45, mill/8500)<rate) continue;
        strokeWeight(7);
        if (data.length > 0){
            if (data[x]['campus_site'] == 'MAIN') stroke(mainColor);
            else if (data[x]['campus_site'] == 'SOUTH') stroke(baseCol);
            else if (data[x]['campus_site'] == 'MP') stroke(mpColor);
            else stroke(baseCol)
        }
		circle(x, y, j/4*size*4);
	}
	pop();
}