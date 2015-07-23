Pebble.addEventListener("ready",
  function(e){
    console.log("Javascript app ready and running!");
  }
);

Pebble.addEventListener('appmessage',
  function(e) {
    console.log('Received message: ' + JSON.stringify(e.payload));
    console.log(e.payload.mtype);
    switch(e.payload.mtype){
      case 200:
        var req = new XMLHttpRequest();
        req.open('GET', 'https://slack.com/api/chat.postMessage?token=xoxp-7213939015-8005854450-8065247734-2d7ab5&channel=%23random&text=BOT%3A%20Testing&username=ckhbot&pretty=1', true);
        req.onload = function(e) {
          if (req.readyState == 4 && req.status == 200) {
            if(req.status == 200) {
              var response = JSON.parse(req.responseText);
              var temperature = response.list[0].main.temp;
              var icon = response.list[0].main.icon;
              Pebble.sendAppMessage({ 'icon':icon, 'temperature':temperature + '\u00B0C'});
            } else { 
              console.log('Error'); 
            }
          }
        };
        req.send(null);
        break;
      case 1:
        console.log("I don't know what to do with case 1?"); // haha what
        var req1 = new XMLHttpRequest();
        req1.open('GET', 'https://slack.com/api/chat.postMessage?token=xoxp-7213939015-8005854450-8065247734-2d7ab5&channel=%23random&text=BOT%3A%20Hi%20there%20from%20the%20Pebble!&username=ckhbot&pretty=1', true);
        req1.onload = function(e){
          // do stuff.exe
        };
        req1.send(null);
        // doStuff(); .avi.gif.jpeg.zip.exe -- ACTUALLY NOT A VIRUS!1!.pepe.c.js.html.bmp ... "what's a bitmap?! guYS MC RECIPES HALP MC IS GETITNG DDOS SNED HLEP!"
        break;
    }
  }
);