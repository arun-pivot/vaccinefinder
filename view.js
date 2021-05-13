
 function validate()
{
    
    var em = document.getElementById("email").value;
    localStorage.setItem('email', em)  
   }
    
 

function kollamclick(params) {
    console.log(params)
    var d = new Date()
    var date = d.getDate()
    var month = d.getMonth()+1
    var year = d.getFullYear()
    var stringdate = date+'-'+month+'-'+year
    
    console.log(stringdate)
    let url = ("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id="+params+"&date="+stringdate);
    
    

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         var a = xmlhttp.responseText
         var b = JSON.parse(a)
         var centers = b.centers
         var c = localStorage.getItem('email')
         console.log(c)
         let flag = 0;
         let det =[];
         let f = [];
         for (let index = 0; index < centers.length; index++) {
              element = centers[index]
              //console.log(element);
              if(element.sessions[0].available_capacity > 0){
                  flag ++;
                  det [index]= { center : element.name , capacity : element.sessions[0].available_capacity };
                  //console.log(det)
                }
             // f = { det }
          }
          if (flag > 0)
           { 
             console.log(det)
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
          alert("Vaccine Available" + det)
           }
       
          else{
            var y = document.getElementById("snackbar2");
            y.className = "show";
            setTimeout(function(){ y.className = y.className.replace("show", ""); }, 1000);
            
            setTimeout(function(){ kollamclick(params); }, 10000);
          }
        }
    };
xmlhttp.open("GET", url, true);
xmlhttp.send();

}
