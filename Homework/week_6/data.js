/*
	Dataprocessing
	Tiny Le
	11130717

	Week 6: Linked Views
	Creating a linked views visualization

	Aim is to make a general group barchart about the data and when clicked on a bar, that specific group will be viewed
	in the bar chart below for that year.

	Function to send all the data to the functions and start the inital graphs

*/

var yearID;
var categoryID;
var groupID;

var data2013;
var data2014;
var data2015;
var data2016;
var data2017;


function data(dataTotaal, dataGroep){

	dataTotaal.forEach(function(d) {
		d["Toegang tot internet"] = +d["Toegang tot internet"];
		d["Personal Computer (PC) of desktop"] = +d["Personal Computer (PC) of desktop"];
		d["Laptop of netbook"] = +d["Laptop of netbook"];
		d["Tablet"] = +d["Tablet"];
		d["Mobiele telefoon of smartphone"] = +d["Mobiele telefoon of smartphone"];
		});

		var internet = dataGroep.map(function(key, i) { return {key: dataGroep[i]["Kenmerken personen"], value: dataGroep[i]["Toegang tot internet"]}; });
		var pc = dataGroep.map(function(key, i) { return {key: dataGroep[i]["Kenmerken personen"], value: dataGroep[i]["Personal Computer (PC) of desktop"]}; });
		var laptop = dataGroep.map(function(key, i) { return {key: dataGroep[i]["Kenmerken personen"], value: dataGroep[i]["Laptop of netbook"]}; });
		var tablet = dataGroep.map(function(key, i) { return {key: dataGroep[i]["Kenmerken personen"], value: dataGroep[i]["Tablet"]}; });
		var phone = dataGroep.map(function(key, i) { return {key: dataGroep[i]["Kenmerken personen"], value: dataGroep[i]["Mobiele telefoon of smartphone"]}; });

		data2013 = returnData2013(internet, pc, laptop, tablet, phone);
		data2014 = returnData2014(internet, pc, laptop, tablet, phone);
		data2015 = returnData2015(internet, pc, laptop, tablet, phone);
		data2016 = returnData2016(internet, pc, laptop, tablet, phone);
		data2017 = returnData2017(internet, pc, laptop, tablet, phone);

		makeGroupBarchart(dataTotaal, dataGroep, data2013, data2014, data2015, data2016, data2017);

		// make initial chart
		var categoryText = "Toegang tot internet"
		var categoryYear = "2013"
		makeBarchart(data2013, categoryText, categoryYear);

}

function retrieveClickedData(year, category, group){
	yearID = year;
	categoryID = category
	groupID = group
}


function returnData2013(internet, pc, laptop, tablet, phone){

	var internetArray = []
	var pcArray = []
	var laptopArray = []
	var tabletArray = []
	var phoneArray = []

	var data2013 = []

	for (j=0 ; j< 20; j+= 5){
		internetArray.push(internet[j])
		pcArray.push(pc[j])
		laptopArray.push(laptop[j])
		tabletArray.push(tablet[j])
		phoneArray.push(phone[j])
	}

	data2013 = [internetArray, pcArray, laptopArray, tabletArray, phoneArray]

	return data2013;


}

function returnData2014(internet, pc, laptop, tablet, phone){

	var internetArray = []
	var pcArray = []
	var laptopArray = []
	var tabletArray = []
	var phoneArray = []

	var data2014 = []

	for (j=1 ; j< 20; j+= 5){
		internetArray.push(internet[j])
		pcArray.push(pc[j])
		laptopArray.push(laptop[j])
		tabletArray.push(tablet[j])
		phoneArray.push(phone[j])
	}

	data2014 = [internetArray, pcArray, laptopArray, tabletArray, phoneArray]

	return data2014;
}

function returnData2015(internet, pc, laptop, tablet, phone){

	var internetArray = []
	var pcArray = []
	var laptopArray = []
	var tabletArray = []
	var phoneArray = []

	var data2015 = []

	for (j=2 ; j< 20; j+= 5){
		internetArray.push(internet[j])
		pcArray.push(pc[j])
		laptopArray.push(laptop[j])
		tabletArray.push(tablet[j])
		phoneArray.push(phone[j])
	}

	data2015 = [internetArray, pcArray, laptopArray, tabletArray, phoneArray]

	return data2015;
}

function returnData2016(internet, pc, laptop, tablet, phone){

	var internetArray = []
	var pcArray = []
	var laptopArray = []
	var tabletArray = []
	var phoneArray = []

	var data2016 = []

	for (j=3 ; j< 20; j+= 5){
		internetArray.push(internet[j])
		pcArray.push(pc[j])
		laptopArray.push(laptop[j])
		tabletArray.push(tablet[j])
		phoneArray.push(phone[j])
	}

	data2016 = [internetArray, pcArray, laptopArray, tabletArray, phoneArray]

	return data2016;
}

function returnData2017(internet, pc, laptop, tablet, phone){

	var internetArray = []
	var pcArray = []
	var laptopArray = []
	var tabletArray = []
	var phoneArray = []

	var data2017 = []

	for (j=4 ; j< 20; j+= 5){
		internetArray.push(internet[j])
		pcArray.push(pc[j])
		laptopArray.push(laptop[j])
		tabletArray.push(tablet[j])
		phoneArray.push(phone[j])
	}

	data2017 = [internetArray, pcArray, laptopArray, tabletArray, phoneArray]

	return data2017;
}
