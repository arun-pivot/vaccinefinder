
function kollamclick(params) {
    console.log(params)
    var d = new Date()
    var date = d.getDate()+1
    var month = d.getMonth()
    
    var year = d.getFullYear()
    var stringdate = date+'-'+"0"+month+'-'+year
    console.log(stringdate)
    let url = ("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id="+params+"&date="+stringdate);
// console.log(response)
//     if (response.ok) { // if HTTP-status is 200-299
//       // get the response body (the method explained below)
//       let json =  response.json();
//     } else {
//       alert("HTTP-Error: " + response.status);
//     }
    const Http = new XMLHttpRequest();

Http.open("GET", url);
Http.send();

Http.onreadystatechange = (e) => {
  var a = Http.responseText
  var b = JSON.parse(a)
 
  var centers = b.centers

  for (let index = 0; index < centers.length; index++) {
      element = centers[index]
      
    if(element.sessions[0].available_capacity > 0){
        alert("Vaccine Available")
        console.log(element)
        break;
      }
      if(index == centers.length -1){
          alert("no slots available")
          break;
      }
      index++;
      
  }
        
       
      
  
}
}