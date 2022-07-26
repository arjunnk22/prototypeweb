getData();
//css
$(window).on("load resize ", function() {
    var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
    $('.tbl-header').css({'padding-right':scrollWidth});
}).resize();
//css
  
setInterval(getData, 1000); //to avoid manual refresh
async function getData() {
    const response = await fetch('/api');
    const data = await response.json();
    console.log(data);

    let tab = '';
    
    for (let r of data) {

        const curLat = r.lat;
        const curLon = r.lng;

        //const api_url = new URL("http://open.mapquestapi.com/geocoding/v1/reverse?key=nuGVG7fPcJXBOcOsOPAABxAJ9ArmsAAG");
    
        //api_url.searchParams.append('location', curLat);
        
        //const newUrl = api_url.toString();
        
        //const ulr = newUrl + ',' + curLon;

        //const rsp = await fetch(ulr);
        //const pst = await rsp.json();

        //const val = pst.results[0].locations[0];
        //const street = val.adminArea5.toString();

        //const postal = val.postalCode.toString();





        const date = new Date(r.timestamp).toLocaleDateString();
        const time = new Date(r.timestamp).toLocaleTimeString();
        
        
        //const fnl = { date, time, curLat, curLon, postal, street };
        //sendDataNoti(fnl);
        tab += `<tr>
        <td>${date} </td>
        <td>${time} </td>
        <td>${curLat}</td>
        <td>${curLon}</td>
        <td>POSTAL</td>
        <td>STREET</td>
        <td><button id="btn" href="#">TRANSFER</button></td>
        </tr>`;
    }
    
    document.getElementById("outputs").innerHTML = tab;
    // $("#btn").click(function(e){
    //     console.log("HELLO");
    // });
}




function sendDataNoti(dts) {

    //document.getElementById("btn").addEventListener("click", myFunction);

    let pstldat = {
        683513 : 'abcdef',
        682001: 'sadawf'
    };
    const pstl = dts.postal;

    let result = pstl in pstldat;

    if (result) {
        console.log("YES!");
    }
    else {
        console.log("NO!");
    }
}




// function sendDataNoti(dts) {

//     const pstldat = { 683513 : 'abcdef', 682001: 'sadawf' };

//     const dats = JSON.parse(pstldat);


//     const pstl = dts.postal;

//     const webHookUrl="https://maker.ifttt.com/trigger/sensor_triggered/json/with/key/dD3wdcj9HxOpLIn3Lms0Ck";

//     const oReq = new XMLHttpRequest();

//     for (let rpst of data) {
        
//         const myJSONStr = payload={
//             "683513":[
//               {
//                 "latitude": 121,
//                 "longitude": 111,
//                 "email": "blaah",
//                 "postal": pstl
      
//               }
//           ]
      
//         };

//     };
//   //register method called after data has been sent method is executed
//     oReq.addEventListener("load", reqListener);
//     oReq.open("POST", webHookUrl,true);
//     oReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//     oReq.send(JSON.stringify(myJSONStr));
    
// }


// function reqListener () {
//     console.log(this.responseText);
// }