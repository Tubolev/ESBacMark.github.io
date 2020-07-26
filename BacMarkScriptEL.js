var subjects=["L1", "L2", "MA3", "MA5", "EP", "BI2", "GE2", "HI2", "PH2", "CHI", "PHY", "BI4", "HI4", "GE4", "AR4", "MU4", "PH4", "L3", "ECO", "LAT", "L4","ONL", "AGR", "L1A", "L2A", "MAA", "MU2", "AR2", "ICT", "IEC", "SOC", "SCP", "L5", "LBI", "LCH", "LPH", "SPO"];
var subPeriods, periods, listOpts;
var indexes = [];
var aMarkIDs = [];
var bMarkIDs = [];
var wMarkIDs = [];
var oMarkIDs = [];

function start(){
	check();
	document.getElementById("step1").addEventListener("change", check);
	document.getElementById("step2").addEventListener("change", optErr);
	document.getElementById("step3").addEventListener("keyup", function(){subjectMark(indexes,aMarkIDs, bMarkIDs, wMarkIDs, oMarkIDs)});

}
function check(){
	let total=1;
	let nonComp = 1;
	for(var i = 0; i<subjects.length ;i++){
		if(document.getElementById(subjects[i]).checked){
			subPeriods = document.getElementById(subjects[i]).getAttribute("data-periods");
			periods=parseInt(subPeriods);
			total = total + periods;
			if(i<26){
			nonComp= nonComp + periods;	
			}
		}
	}
	document.getElementById("total").innerHTML= "You have total: "+total +" periods.";
	checkErrors(nonComp, total);
}
function addOptions(){
	checkW1();
	checkW2();
	checkW3();
	optsW4( "CHI", "PHY", "BI4", "HI4", "GE4", "AR4", "MU4", "PH4", "L3", "ECO", "LAT", "L4","ONL", "AGR");
	optsW5( "CHI", "PHY", "BI4", "HI4", "GE4", "AR4", "MU4", "PH4", "L3", "ECO", "LAT", "L4","ONL", "AGR");
	checkO1();
	optsO2("GE2","GE4","HI2","HI4")
	optsO3("BI2", "PH2", "CHI", "PHY", "BI4",  "PH4", "L3", "L4","ONL","MAA")
	optErr();
}
function printSubjects(){
	var aMarkID;
	var bMarkID;
	var wMarkID;
	var oMarkID;
	indexes = [];
	aMarkIDs = [];
	bMarkIDs = [];
	wMarkIDs = [];
	oMarkIDs = [];
	var table = "<tr><td><b>Subject</td><td><b>A-Mark</td><td><b>B-Mark</td><td><b>Written</td><td><b>Oral</td><td><b>Final Note</td></tr>";
	
	for( var i = 0; i<arguments.length; i++){
		if(document.getElementById(arguments[i]).checked){
			aMarkID = i+"A";
			bMarkID = i+"B";
			aMarkIDs.push(aMarkID);
			bMarkIDs.push(bMarkID);
			indexes.push(i);
			table += "<tr><td>"+arguments[i]+"</td>\
			<td><input type='number' id='"+aMarkID+"'  min='0' max='10' step='0.1' style='width: 4em;' onkeydown='javascript: return event.keyCode == 69 ? false : true' ></td>\
			<td><input type='number' id='"+bMarkID+"' min='0' max='10' step='0.1' style='width: 4em;' onkeydown='javascript: return event.keyCode == 69 ? false : true' ></td>";
			var written = false
			var oral = false;
			var idW, idO;
			for(var j = 1; j<6;j++){
				var id = "W"+j;
				if(document.getElementById(id).value===arguments[i]){
					written = true;
					idW = id;
				}
			}
			if(written){ 
				wMarkID = i+idW;
				table += "<td><input type='number' id='"+wMarkID+"'  min='0' max='10' step='0.1' style='width: 4em;' onkeydown='javascript: return event.keyCode == 69 ? false : true' ></td>";
				wMarkIDs.push(wMarkID);
			}else{
				wMarkIDs.push(0);
				table +="<td></td>";}
			
			for(var k = 1; k<4;k++){
				id = "O"+k;
				if(document.getElementById(id).value===arguments[i]){
					oral = true;
					idO=id;
				}	
			}
			if(oral){
				oMarkID = i+idO;
				table += "<td><input type='number' id='"+oMarkID+"' min='0' max='10' step='0.1' style='width: 4em;' onkeydown='javascript: return event.keyCode == 69 ? false : true' ></td>";
				oMarkIDs.push(oMarkID);					
			}else{
				table +="<td></td>";
				oMarkIDs.push(0);
			}	
			var noteID= i+"Note";
			table +="<td id='"+noteID+"'></td></tr>";	
		}
	}
	document.getElementById("step3").style.display="block";
	document.getElementById("marks").innerHTML=table;
	
	subjectMark(indexes,aMarkIDs, bMarkIDs,  wMarkIDs, oMarkIDs);	
	
}
function subjectMark(i,a,b,w,o){
	var note; 
	var aMarks = [];
	var bMarks = [];
	var wMarks = [];
	var oMarks = [];
	
	for(var k=0; k<i.length;k++){
		if(w[k]==0 && o[k]==0){
			aMarks[k]=Number(checkNaN(a[k]).toFixed(2));
			bMarks[k]=Number(checkNaN(b[k]).toFixed(2));
			wMarks[k]=0;
			oMarks[k]=0;
			note = 0.4*aMarks[k]+ 0.6*bMarks[k];
			document.getElementById(i[k]+"Note").innerHTML=Number(note).toFixed(2);
		}
		if(w[k]==0 && o[k] !=0){
			aMarks[k]=Number(checkNaN(a[k]).toFixed(2));
			bMarks[k]=Number(checkNaN(b[k]).toFixed(2));
			wMarks[k]=0;
			oMarks[k]=Number(checkNaN(o[k]).toFixed(2));
			var cMark=aMarks[k]*0.4+bMarks[k]*0.6;
			
			note = (Number(cMark).toFixed(2)*0.5+0.15*oMarks[k])/0.65;
			document.getElementById(i[k]+"Note").innerHTML=Number(note).toFixed(2);
		}
		if(w[k]!=0 && o[k]==0){
			aMarks[k]=Number(checkNaN(a[k]).toFixed(2));
			bMarks[k]=Number(checkNaN(b[k]).toFixed(2));
			wMarks[k]=Number(checkNaN(w[k]).toFixed(2));
			oMarks[k]=0;
			var cMark=aMarks[k]*0.4+bMarks[k]*0.6;
			
			note = (Number(cMark).toFixed(2)*0.5+0.35*wMarks[k])/0.85;
			document.getElementById(i[k]+"Note").innerHTML=Number(note).toFixed(2);
		}
		if(w[k]!=0 && o[k] !=0){
			aMarks[k]=Number(checkNaN(a[k]).toFixed(2));
			bMarks[k]=Number(checkNaN(b[k]).toFixed(2));
			wMarks[k]=Number(checkNaN(w[k]).toFixed(2));
			oMarks[k]=Number(checkNaN(o[k]).toFixed(2));
			var cMark=aMarks[k]*0.4+bMarks[k]*0.6;
			
			note = Number(cMark).toFixed(2)*0.5+0.35*wMarks[k]+0.15*oMarks[k];
			document.getElementById(i[k]+"Note").innerHTML=Number(note).toFixed(2);
		}
	}
	var aSum = 0;
	var cSum = 0;
	var bSum = 0;
	var wSum = 0;
	var oSum = 0;
	for(j = 0; j<i.length; j++){
		
		cSum = cSum+ 0.4*aMarks[j] + 0.6*bMarks[j];
		bSum = bSum + bMarks[j];
		wSum = wSum + wMarks[j];
		oSum = oSum + oMarks[j];
	}
	
	var aAvg = aSum/aMarks.length;
	var bAvg = bSum/bMarks.length;
	var cAvg =cSum/bMarks.length;
	var wAvg = wSum/5;
	var oAvg = oSum/3;
	cAvg = Math.round(cAvg * 100) / 10;
	wAvg = Math.round(wAvg * 100) / 10;
	oAvg = Math.round(oAvg * 100) / 10;
	var BacMark = (cAvg*0.5+wAvg *0.35+oAvg*0.15);
	console.log("C: "+cAvg+ " W: "+wAvg+" O: "+oAvg+" Bac: "+BacMark);
	BacMark = Math.round(BacMark * 100) / 100
	document.getElementById("bacMark").innerHTML="Your Final Bac Mark: "+BacMark;
	
}
function checkNaN(id){
	var a = Number(document.getElementById(id).value);
	
	if(isNaN(a)){
		a = 0;
		
	}
	if(a<0 || a>10 ){
		alert("The mark needs to be between 1 and 10.")
		a = 0;
		document.getElementById(id).value=0
	}
		
	return a;
}
function checkW1(){
	var w1 ="L1";
	if(document.getElementById("L1A").checked){
		w1 = "L1A";
	}
	document.getElementById("W1").value=w1;
	document.getElementById("W1").innerHTML=w1;
}
function checkW2(){
	var w2 = "L2";
	if(document.getElementById("L2A").checked){
		w2 = "L2A";
	}
	document.getElementById("W2").value=w2;
	document.getElementById("W2").innerHTML=w2;
}
function checkW3(){
	var w3 = "MA3";
	if(document.getElementById("MA5").checked){
		w3 = "MA5";
	}
	document.getElementById("W3").value=w3;
	document.getElementById("W3").innerHTML=w3;
}
function optsW4(){
	var w4;
	for(i=0;i<arguments.length; i++){
		if(document.getElementById(arguments[i]).checked){
			w4+="<option>"+arguments[i]+"</option>";
		}
	}	
	document.getElementById("W4").value=w4;
	document.getElementById("W4").innerHTML=w4;
}
function optsW5(){
	var w5;
	for(i=0;i<arguments.length; i++){
		if(document.getElementById(arguments[i]).checked){
			w5+="<option>"+arguments[i]+"</option>";
		}
	}	
	document.getElementById("W5").value=w5;
	document.getElementById("W5").innerHTML=w5;
}
function checkO1(){
	var o1 ="L1";
	if(document.getElementById("L1A").checked){
		o1 = "L1A";
	}
	document.getElementById("O1").value=o1;
	document.getElementById("O1").innerHTML=o1;
}
function optsO2(){
	var o2 ="<option>L2</option>";
	if(document.getElementById("L2A").checked){
		o2 = "<option>L2A</option>";
	}
	for(i=0;i<arguments.length; i++){
		if(document.getElementById(arguments[i]).checked){
		o2+="<option>"+arguments[i]+"</option>";
		}
	}	
	document.getElementById("O2").value=o2;
	document.getElementById("O2").innerHTML=o2;
}
function optsO3(){
	var o3;
	if(document.getElementById("MAA").checked){
		o3+="<option>MAA</option>";
	}else{
		for(i=0;i<arguments.length; i++){
			if(document.getElementById(arguments[i]).checked){
				o3+="<option>"+arguments[i]+"</option>";
			}
		}
	}
	document.getElementById("O3").value=o3;
	document.getElementById("O3").innerHTML=o3;
}
function optErr(){
	var optErrors = 0;
	var errorMsg ="Errors <ol>";
	if(document.getElementById("W4").value===document.getElementById("W5").value){
		optErrors++
		errorMsg+="<li>Written 4 and Written 5 are the same</li>"
		
	}
	if(document.getElementById("W4").value===document.getElementById("O2").value||document.getElementById("W5").value===document.getElementById("O2").value){
		optErrors++
		var o2 = document.getElementById("O2").value;
		errorMsg+="<li>You can't choose " +o2+ " as a written and oral</li>";
	}
	if(document.getElementById("W4").value===document.getElementById("O3").value||document.getElementById("W5").value===document.getElementById("O3").value){
		optErrors++
		var o3 = document.getElementById("O3").value;
		errorMsg+="<li>You can't choose " +o3+ " as a written and oral</li>";
	}
	if(optErrors == 0){
		errorMsg="";
		document.getElementById("optErrors").innerHTML=errorMsg;
		printSubjects("L1", "L2", "MA3", "MA5", "EP", "BI2", "GE2", "HI2", "PH2", "CHI", "PHY", "BI4", "HI4", "GE4", "AR4", "MU4", "PH4", "L3", "ECO", "LAT", "L4","ONL", "AGR", "L1A", "L2A", "MAA", "MU2", "AR2", "ICT", "IEC", "SOC", "SCP", "L5", "LBI", "LCH", "LPH","SPO");
	}
	if(optErrors != 0){
		errorMsg+="</ol>"
		document.getElementById("step3").style.display="none";
		document.getElementById("optErrors").innerHTML=errorMsg;
	}
	
}

function checkErrors(NonComp, Total){
		var errors = 0;
		var errorMsg = "Errors: <ol>";
	
	if(document.getElementById("MA3").checked == false && document.getElementById("MA5").checked == false){
		  errors++
		  errorMsg += "<li>You need to choose either MA3 or MA5";
	   }
	if(document.getElementById("MA3").checked == true && document.getElementById("MA5").checked == true){
		  errors++
		  errorMsg += "<li>You can't choose both MA3 and MA5";
	   }
	if(document.getElementById("MA3").checked == true && document.getElementById("MAA").checked == true){
		  errors++
		  errorMsg += "<li>You can't choose both MA3 and MAA";
	}
	if(document.getElementById("BI2").checked == true && document.getElementById("BI4").checked == true){
		errors++;
		errorMsg += "<li>You can't choose both BI2 and BI4.<br>";
	}	
	if(document.getElementById("HI2").checked == true && document.getElementById("HI4").checked == true){
		errors++;
		errorMsg += "<li>You can't choose both HI2 and HI4.<br>";
	}
	if(document.getElementById("GE2").checked == true && document.getElementById("GE4").checked == true){
		errors++;
		errorMsg += "<li>You can't choose both GE2 and GE4.<br>";
	}
	if(document.getElementById("PH2").checked == true && document.getElementById("PH4").checked == true){
		errors++;
		errorMsg += "<li> You can't choose both PH2 and PH4.<br>";
	}
	if(document.getElementById("BI2").checked == false && document.getElementById("BI4").checked == false && document.getElementById("CHI").checked == false && document.getElementById("PHY").checked == false){
		errors++;
		errorMsg += "<li>You need to choose BI2 or at least one of the 4 period sciences: CHI, PHY or BI4<br>";
	}
	if(document.getElementById("PH2").checked == false && document.getElementById("PH4").checked == false){
		errors++;
		errorMsg += "<li>You need to choose either PH2 or PH4.<br>";
	}

	if(document.getElementById("GE2").checked == false && document.getElementById("GE4").checked == false){
		errors++;
		errorMsg += "<li>You need to choose either GE2 or GE4.<br>";
	}
	if(document.getElementById("HI2").checked == false && document.getElementById("HI4").checked == false){
		errors++;
		errorMsg += "<li>You need to choose either HI2 or HI4.<br>";
	}
	if(document.getElementById("L1").checked == false){
		errors++;
		errorMsg += "<li>You need to choose L1.<br>";
	}
	if(document.getElementById("L2").checked == false){
		errors++;
		errorMsg += "<li>You need to choose L2.<br>";
	}
	if(document.getElementById("EP").checked == false){
		errors++;
		errorMsg += "<li> You need to choose EP.";
	}
	
	if(document.getElementById("L1A").checked == true && document.getElementById("L2A").checked == true
	||document.getElementById("L1A").checked == true && document.getElementById("MAA").checked == true
	||document.getElementById("L2A").checked == true && document.getElementById("MAA").checked == true){
		errors++;
		errorMsg += "<li> You can choose only one advanced course.<br>";
	}
	if(document.getElementById("LBI").checked == true && document.getElementById("LCH").checked == true
	||document.getElementById("LBI").checked == true && document.getElementById("LPH").checked == true
	||document.getElementById("LCH").checked == true && document.getElementById("LPH").checked == true){
		errors++;
		errorMsg += "<li> You can choose only one laboratory course.<br>";
	}
	if(document.getElementById("LBI").checked == true && document.getElementById("BI4").checked == false
	||document.getElementById("LPH").checked == true && document.getElementById("PHY").checked == false
	||document.getElementById("LCH").checked == true && document.getElementById("CHI").checked == false){
		errors++;
		errorMsg += "<li> You can't choose laboratory course if you haven't chosen that subject as an option.<br>";
	}
	if(document.getElementById("MU2").checked == true && document.getElementById("MU4").checked == true){
		errors++;
		errorMsg += "<li> You can't choose both, MU2 and MU4.<br>";
	}
	if(document.getElementById("IEC").checked == true && document.getElementById("ECO").checked == true){
		errors++;
		errorMsg += "<li> You can't choose both, IEC and ECO.<br>";
	}
	if(document.getElementById("AR2").checked == true && document.getElementById("AR4").checked == true){
		errors++;
		errorMsg += "<li> You can't choose both, AR2 and AR4.<br>";
	}
	if(document.getElementById("ONL").checked == true && document.getElementById("ECO").checked == true){
		errors++;
		errorMsg += "<li> You can't choose both, ECO and ONL.<br>";
	}
	
	
	
	if(Total  < 31){
		errors++
		errorMsg += "<li> You should have at least 31 periods.<br>";
	}
	if(NonComp < 29){
		  errors++
		  errorMsg += "<li>You need to have at least 29 periods others than complementary courses. You have now "+NonComp+" that kind of periods.";
	}
	if(errors==0){
		errorMsg = "";
		if(Total  > 35){
		
		errorMsg = "";
	}
		document.getElementById("step2").style.display="block";
		document.getElementById("errors").innerHTML= errorMsg;
		addOptions();
		
	}
	if(errors!=0){
	   document.getElementById("step2").style.display="none";
	   document.getElementById("step3").style.display="none";
	   document.getElementById("errors").innerHTML= errorMsg;
	   
	   }
	  
}

/*
function bacOptions(){
	
	
	
	
	for(i=0;i<arguments.length; i++){
		if(document.getElementById(arguments[i]).checked && ["CHI", "PHY", "BI4", "HI4", "GE4", "AR4", "MU4", "PH4", "L3", "ECO", "LAT", "L4","ONL", "AGR"].indexOf(document.getElementById(arguments[i]).value)>-1){
			listOpts += "<option value='"+arguments[i]+"'> "+arguments[i]+" </option>";
		}
	}
	listOpts+="</select></td></tr>";
		listOpts += "<tr><td>Option 5</td><td><select name='Written5' id ='Written5' >";
		
	for(i=0;i<arguments.length; i++){
		if(document.getElementById(arguments[i]).checked && ["CHI", "PHY", "BI4", "HI4", "GE4", "AR4", "MU4", "PH4", "L3", "ECO", "LAT", "L4","ONL", "AGR"].indexOf(document.getElementById(arguments[i]).value)>-1){
			listOpts += "<option value='"+arguments[i]+"'> "+arguments[i]+" </option>";
		}
	}
	listOpts+="</select></td></tr>\
	<tr><td><b>Oral</td><td><b>Subjects</td></tr>\
	<tr><td>Option 1</td><td><select name='Oral1' id ='Oral1' >";
	if(document.getElementById("L1A").checked){
		listOpts += "<option value='L1A'> L1A </option></select></td></tr>";
	}else{
		listOpts += "<option value='L1A'> L1 </option></select></td></tr>";
	}
		listOpts+="<tr><td>Option 2</td><td><select name='Oral2' id ='Oral2' >";
	if(document.getElementById("L2A").checked){
		listOpts += "<option> L2A </option>";
	}else{
		listOpts += "<option> L2 </option>";
	}
	for(i=0;i<arguments.length; i++){
		if(document.getElementById(arguments[i]).checked && ["GE2", "HI2",  "HI4", "GE4"].indexOf(document.getElementById(arguments[i]).value)>-1){
			listOpts += "<option value='"+arguments[i]+"'> "+arguments[i]+" </option>";
		}
	}
		listOpts+="</select></td></tr>\
		<tr><td>Option 3</td><td><select name='Oral3' id ='Oral3' >";
	
	for(i=0;i<arguments.length; i++){
		if(document.getElementById(arguments[i]).checked && ["BI2", "PH2", "CHI", "PHY", "BI4", "PH4", "L3", "L4","ONL","MAA"].indexOf(document.getElementById(arguments[i]).value)>-1){
			listOpts += "<option value='"+arguments[i]+"'> "+arguments[i]+" </option>";
		}
	}
	
	listOpts+="</select></td></tr></table></form><br>{{written1}} ";
	
	return listOpts;
}*/
function marks(){
	var listMarks="Calculate marks:<br>\
	<table>\
	<tr><td>Subject</td><td>A</td><td>B</td><td>Written</td><td>Oral</td><td>Final note</td></tr>";
	for(i=0;i<arguments.length; i++){
		if(document.getElementById(arguments[i]).checked){
			if(["L1", "L2", "CHI", "PHY", "BI4", "HI4", "GE4", "AR4", "MU4", "PH4", "L3", "ECO", "LAT", "L4","ONL", "AGR", "L1A", "L2A"].indexOf(document.getElementById(arguments[i]).value)>-1){
				listMarks += "<tr><td>"+arguments[i]+":\
				</td><td><input type='number' id='"+i+"A' value = 0 min='0' max='10' step='0.1' style='width: 4em;'></td>\
				<td><input type='number' id='"+i+"B' value = 0 min='0' max='10' step='0.1' style='width: 4em;'></td>\
				</td><td><input type='number' id='"+i+"O' value = 0 min='0' max='10' step='0.1' style='width: 4em;'></td>\
				</td><td><input type='number' id='"+i+"W' value = 0 min='0' max='10' step='0.1' style='width: 4em;'></td></tr>";
			}	
		}
	}
	return listMarks;
}