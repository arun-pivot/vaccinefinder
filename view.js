var d = new Date()
var date = d.getDate()
var month = d.getMonth()+1
var year = d.getFullYear()
var stringdate = date+1+'-'+"0"+month+'-'+year
console.log(stringdate)



function setHeading(){
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

  for (var i = 0; i < data.length; i++){
    var row = `<tr>
            <td>${data[i].center}</td>
            <td>${data[i].capacity}</td>
         
          </tr>`
    table.innerHTML += row


  }
}

function click(params) {
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
         for (let index = 0; index < centers.length; index++) {
              element = centers[index]
              //console.log(element);
              if(element.sessions[0].available_capacity > 0){
                  flag ++;
                  det [i]= { center : element.name , capacity : element.sessions[0].available_capacity };
                  //console.log(det)
                  i++;
                } 
                 
          }
          if (flag > 0)
           { 
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
           }
          else{
            var y = document.getElementById("snackbar2");
            y.className = "show";
            setTimeout(function(){ y.className = y.className.replace("show", ""); }, 1000);
            
            setTimeout(function(){ click(params); }, 10000);
          }
        }
    };
xmlhttp.open("GET", url, true);
xmlhttp.send();

}
