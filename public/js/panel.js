
getData();



//css
$(window).on("load resize ", function() {
    var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
    $('.tbl-header').css({'padding-right':scrollWidth});
}).resize();
//css
  
//setInterval(getData, 1000); //to avoid manual refresh
async function getData() {
    const response = await fetch('/api');
    const data = await response.json();
    console.log(data);

    let tab = '';

    
    for (let r of data) {

        const curLat = r.lat;
        const curLon = r.lng;

        const api_url = new URL("http://open.mapquestapi.com/geocoding/v1/reverse?key=XzhalZlQuqTAHjAiD68ZiinzT9hIEfoV");
    
        api_url.searchParams.append('location', curLat);
        
        const newUrl = api_url.toString();
        
        const ulr = newUrl + ',' + curLon;

        const rsp = await fetch(ulr);
        const pst = await rsp.json();

        const val = pst.results[0].locations[0];
        const street = val.adminArea5.toString();

        const postal = val.postalCode.toString();

        //var xhttp = new XMLHttpRequest();



        const date = new Date(r.timestamp).toLocaleDateString();
        const time = new Date(r.timestamp).toLocaleTimeString();

        //const newdt = { "date" : date, "time" : time, "latitude" : curLat, "longitude":  curLon, "postal" : postal, "street" : street};
        //const newdt = { date, time, curLat, curLon, postal, street };
        //const curpstl = JSON.stringify(newdt);
        
        //alert(curpstl);
        //xhttp.addEventListener("load", reqListener);
        //xhttp.open("POST", "/pst", true);
        //xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        //xhttp.send(curpstl);
        

        //sendDataNoti(curpstl);

        tab += `<tr>
        <td>${date}</td>
        <td>${time}</td>
        <td>${curLat}</td>
        <td>${curLon}</td>
        <td>${postal}</td>
        <td>${street}</td>
        <td><button onclick='btn(${postal});'>TRANSFER</button></td>
        </tr>`;


    }
    
    document.getElementById("outputs").innerHTML = tab;
}


function demo (val) {

}


async function btn(pst){


    const dv = { pst };


    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dv)
    };


    const res = await fetch('/pst', options);
    const clb = await res.json();
    console.log(clb);

    sendDataNoti(clb);
}

function sendDataNoti(clb) {


    const webHookUrl="https://maker.ifttt.com/trigger/demo_trigger/with/key/dD3wdcj9HxOpLIn3Lms0Ck";

    const oReq = new XMLHttpRequest();

    const myJSONStr = {
        "value1" : clb.post,
        "value2" : clb.street,
        "value3" : clb.email
    };
  //register method called after data has been sent method is executed
    oReq.addEventListener("load", reqListener);
    oReq.open("POST", webHookUrl,true);
    oReq.setRequestHeader('Content-Type', 'application/json');
    oReq.send(JSON.stringify(myJSONStr));
    
}

function reqListener () {
    console.log(this.responseText);
}

