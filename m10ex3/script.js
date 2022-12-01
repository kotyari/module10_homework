const btn = document.querySelector('.btn_send');
const input = document.querySelector('.input_msg');
const messages = document.querySelector('.box_messages');
const geoButton = document.querySelector('.btn_geo')


const echo = "wss://echo-ws-service.herokuapp.com";
let websocket = new WebSocket(echo);

function writeToScreen(message, n) {
  let pre = document.createElement("p");
  if (n==0) {
    //recieved
    pre.style.textAlign = "left"; 
    pre.style.border = "2px aqua solid"; 
    pre.style.margin = "5px 195px 5px 15px"
  } else {
    //sent
    pre.style.textAlign = "right";
    pre.style.border = "2px blue solid"; 
    pre.style.margin = "5px 0px 5px 210px"
  }
  pre.innerHTML = message;
  messages.appendChild(pre);
 
}



websocket.onopen = console.log("Connected")
websocket.onmessage = function(evt) { 
  if (evt.data !== '[object GeolocationCoordinates]'){
  writeToScreen(evt.data, 0);
  console.log("Cooбщение:" + evt.data) };
 };

  


function writeGeo(lat,long){
  let ref = document.createElement("a");
    ref.href = `https://www.openstreetmap.org/#map=18/${lat}/${long}`;
    ref.target="_blank";
    ref.style.backgroundColor='rgb(170, 250, 250)';
    ref.style.textAlign = "center";
    ref.style.border = "2px blue solid"; 
    ref.style.margin = "5px 0px 5px 210px";
    ref.innerHTML = "Гео-локация";
    messages.appendChild(ref);


  //<a href="http://">Гео-локация</a>
}




btn.addEventListener('click', () =>
{
  if(input.value){
  writeToScreen(input.value, 1)

 websocket.send(input.value);
 input.value = '';
  }
  
})

document.addEventListener( 'keyup', event => {
  if( event.code === 'Enter' ) {
  btn.click()
}

});


geoButton.addEventListener('click', () =>
{
  if ("geolocation" in navigator) {
    /* местоположение доступно */
    navigator.geolocation.getCurrentPosition((position) => {
      const { coords } = position;
      websocket.send(coords);
      console.log(coords.latitude, coords.longitude);
      writeGeo(coords.latitude,coords.longitude);
      

    });



  } else {
    /* местоположение недоступно */
    alert('Отправка гео-локации запрещена браузером.')
  }
  

}

)