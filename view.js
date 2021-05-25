var d = new Date()
var date = d.getDate()
var month = d.getMonth()+1
var year = d.getFullYear()
var currentDate;
var currentHour;

var stringdate


var distid 

var downloadtimer
function setHeading(){

  if(document.getElementById("FIND")){
    document.getElementById("FIND").disabled = false;
  }
  

  document.getElementById("data_table").style.display ="none"
  document.getElementById("heading").innerText = "Find Vaccine In "+localStorage.getItem('dist') +" District"
}

function setDis(){
  var dis = document.getElementById("district").value;
  localStorage.setItem('dist',dis)
  console.log(dis)
}
function setemail(){
  var email = document.getElementById("email").value;
  localStorage.setItem('email',email)
  console.log(email)
}
var timeleft;

function showprogress(){
    
    if(timeleft <= 0){
        clearInterval(downloadtimer);
        downloadtimer  = 0
        click(distid)
        // document.getElementById("countdown").innerText = "Finished";
      } else {
        document.getElementById("countdown").innerText = "Retrying after  " +timeleft + " seconds ";
      }
      timeleft -= 1;
  }

function find(){
 var h = localStorage.getItem('dist')
 console.log(h);
 switch(h){
   case "Thiruvananthapuram" : click(296);
                     break;
   case "Kollam" : click(298);
                     break;
   case "Alappuzha" : click(301);
                     break;
   case "Pathanamthitta" : click(300);
                     break;                                  
   case "Kottayam" : click(304);
                     break;
   case "Idukki" : click(306);
                     break;
   case "Ernakulam": click(307);
                     break;     
   case "Thrissur" : click(303);
                     break; 
   case "Palakkad" : click(308);
                     break; 
   case "Malappuram" : click(302);
                     break; 
   case "Kozhikode" : click(305);
                     break; 
   case "Wayanad" : click(299);
                     break;  
   case "Kannur" : click(297);
                     break;
   case "Kasargod" : click(295);
                     break;                                                                                                                                                     
   

 }

} 


function buildTable(data){
  var table = document.getElementById('myTable')

  var row = table.insertRow(0);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);

  cell1.innerHTML = "Center";
  cell2.innerHTML = "Dose1 Slots";
  cell3.innerHTML = "Dose2 Slots";

  for (var i = 0; i < data.length; i++){
    var row = `<tr>
            <td>${data[i].center}</td>
            <td>${data[i].dose1}</td>
            <td>${data[i].dose2}</td>
         
          </tr>`
    table.innerHTML += row


  }
}


function click(params) {
   
    distid = params
  
    document.getElementById("FIND").disabled = true;
    currentDate = new Date();
    currentHour = currentDate.getHours()
    console.log(currentHour)
    if(currentHour>13){
       stringdate = date+1+'-'+"0"+month+'-'+year
    }
    else{
       stringdate = date+'-'+"0"+month+'-'+year
    }
    document.getElementById("date").innerText = "Slot Date "+stringdate

  var elmtTable = document.getElementById('data_table');
  if(elmtTable.style.display == "block"){
    var rowCount = elmtTable.rows.length;
    for (var i=0; i < rowCount-1; i++) {
      elmtTable.deleteRow(0);
    }
  
  }
 
    console.log(params)
    /*var d = new Date()
    var date = d.getDate()
    var month = d.getMonth()+1
    var year = d.getFullYear()
    var stringdate = date+'-'+month+'-'+year
    localStorage.setItem('datt',stringdate)
    //console.log(stringdate)*/
 
    console.log(stringdate)

    let url = ("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id="+params+"&date="+stringdate);
    
    

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         var a = xmlhttp.responseText
         var b = JSON.parse(a)
         var centers = b.centers
         console.log(centers)
         var c = localStorage.getItem('email')
         console.log(c)
         let flag = 0;
         let det =[];
         let i =0;
         var element;
         for (let index = 0; index < centers.length; index++) {
              element = centers[index]
              //console.log(element);
              if(element.sessions[0].available_capacity > 0){
                  flag ++;
                  det [i]= { center : element.name , dose1 : element.sessions[0].available_capacity_dose1,dose2 :element.sessions[0].available_capacity_dose2 };
                  //console.log(det)
                  i++;
                } 
                 
          }
          if (flag > 0)
           { 
            timeleft = 10;
             console.log(det)
             document.getElementById("data_table").style.display ="block"
             buildTable(det)


             function sendEmail() {
              Email.send({
              Host: "smtp.gmail.com",
              Username: "testerstester30@gmail.com",
              Password: "Qwerty@*123456",
              To: c,
              From: "testerstester30@gmail.com",
              Subject: "Sending Email using javascript",
              Body: det,
             })
         }
          sendEmail();
          var x = document.getElementById("snackbar");
          x.className = "show";

          setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1000);

  
            downloadtimer=setInterval( showprogress,1000);
           }
          else{
            timeleft = 30;
            var y = document.getElementById("snackbar2");
            y.className = "show";
            setTimeout(function(){ y.className = y.className.replace("show", ""); }, 1000);

            downloadtimer=setInterval( showprogress,1000);
            // setTimeout(function(){ click(params); }, 10000);
          }
        }
    };
xmlhttp.open("GET", url, true);
xmlhttp.send();

}
