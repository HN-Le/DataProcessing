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

		// 2013
		var internetInterval = [ internet[0], internet[5], internet[10], internet[15] ]
		var pcInterval = [ pc[0],pc[5], pc[10], pc[15] ]
		var laptopInterval = [ laptop[0],laptop[5], laptop[10], laptop[15] ]
		var tabletInterval = [ tablet[0],tablet[5], tablet[10], tablet[15] ]
		var phoneInterval =[ phone[0],phone[5], phone[10], phone[15] ]

		data = [internetInterval, pcInterval, laptopInterval,tabletInterval, phoneInterval]

		var data2013 = returnData2013(internet, pc, laptop, tablet, phone);
		var data2014 = returnData2014(internet, pc, laptop, tablet, phone);
		var data2015 = returnData2015(internet, pc, laptop, tablet, phone);
		var data2016 = returnData2016(internet, pc, laptop, tablet, phone);
		var data2017 = returnData2017(internet, pc, laptop, tablet, phone);


		makeGroupBarchart(dataTotaal, dataGroep, data)
		makeBarchart(data)

}

function retrieveClickedData(year, category, group){
	yearID = year;
	categoryID = category
	groupID = group



	if (yearID == 0){
		data = data2013
	}

	else if (yearID == 1){
		data = data2014
	}

	else if (yearID == 2){
		data = data2015
	}

	else if (yearID == 3){
		data = data2016
	}

	else {
		data = data2017
	}

	console.log(data)

	update(data, category, groupID )
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

var yearID;
var categoryID;
var groupID;

var data;
var data2013;
var data2014;
var data2015;
var data2016;
var data2017;
