// doStuff(); .avi.gif.jpeg.zip.exe -- ACTUALLY NOT A VIRUS!1!.pepe.c.js.html.bmp ... "what's a bitmap?! guYS MC RECIPES HALP MC IS GETITNG DDOS SNED HLEP!"
Pebble.addEventListener("ready",
  function(e){
    console.log("Javascript app ready and running!");
  }
);

// Receive message from c
Pebble.addEventListener('appmessage',
  function(e) {
    console.log('Received message: ' + JSON.stringify(e.payload));
    console.log(e.payload.mtype);
    
    // Determine Message
    var premsg = "https://slack.com/api/chat.postMessage?token=TOKENHERE&channel=%23pleb-bot&username=pleb-bot&pretty=1&text=";
    
    switch(e.payload.mtype){
      case 1:
        console.log("I don't know what to do with case 1?"); // haha what
        
        // Format message
        var msg1 = "Hi there from the pebble.";
        msg1 = msg1.replace(/ /g, '%20'); // Add correct spacing
        
        // Add things to msg.
        premsg = premsg + "BOT" + ("%28" + e.payload.mtype + "%29") + msg1;
      break;
      case 2:
        console.log("Registered case 2, data was 2. CONFIRMED");
        
        // Format message
        var msg2 = "Hey, this is the second message type!";
        msg2 = msg2.replace(/ /g, '%20'); // Add correct spacing
        
        // Add things to msg.
        premsg = premsg + "BOT" + ("%28" + e.payload.mtype + "%29") + msg2;
      break;
      case 3:
        console.log("Case 3");
        
        // format message
        var msg3 = "Running a little late, sorry.";
        msg3 = msg3.replace(/ /g, '%20'); // Add correct spacing
        
        // Add tags to message.
        premsg = premsg + "BOT" + ("%28" + e.payload.mtype + "%29") + msg3;
      break;
      case 4:
        console.log("Case 3");
        
        // format message
        var msg4 = "/giphy lol";
        msg4 = replaceAll(" ", '%20', msg4); // Add correct spacing
        msg4 = replaceAll("/", "%2F", msg4); // Replace the slash
        
        // Add tags to message.
        premsg = premsg + msg4; // premsg + "BOT" + ("%28" + e.payload.mtype + "%29") +
      break;
    }
    
    console.log("Trying to send: " + premsg);
    
    var req1 = new XMLHttpRequest();
    req1.open('GET', premsg, true);
    req1.onload = function(e){
      // do stuff.exe
    };
    req1.send(null);
  }
);

function replaceAll(find, replace, str) {
    return str.replace(new RegExp(find, 'g'), replace);
}
