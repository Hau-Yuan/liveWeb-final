var https = require('https');

var fs = require('fs'); // Using the filesystem module

var options = {
  key: fs.readFileSync('certificates/my-key.pem'),
  cert: fs.readFileSync('certificates/my-cert.pem')
};

var httpsServer = https.createServer(options, requestHandler);
httpsServer.listen(8090);

var url = require('url');
console.log('Server listening on port 8090');

function requestHandler(req, res) {

  var parsedUrl = url.parse(req.url);
  console.log("The Request is: " + parsedUrl.pathname);

  // Read in the file they requested
  fs.readFile(__dirname + parsedUrl.pathname,
    // Callback function, called when reading is complete
    function (err, data) {
      // if there is an error
      if (err) {
        res.writeHead(500);
        return res.end('Error loading ' + parsedUrl.pathname);
      }
      // Otherwise, send the data, the contents of the file
      res.writeHead(200);
      res.end(data);
    }
  );
}

//An object store notes
var people = {
  C4: null,
  D4: null,
  E4: null,
  F4: null,
  G4: null,
  A4: null,
  B4: null,
  C5: null
}

// WebSocket Portion
var io = require('socket.io').listen(httpsServer);
io.sockets.on('connection',

  function (socket) {
    console.log(socket.request.headers['user-agent']);
    if (socket.request.headers['user-agent'].indexOf("iPhone") > -1) {
      console.log("It's an iOS device");
      socket.emit('threshold', 170000);
    } else if (socket.request.headers['user-agent'].indexOf("Android") > -1) {
      console.log("it's Android device");
      socket.emit('threshold', 100000);
    }

    socket.on('role', function (data) {
      if (data == 'note') {
        //Asign new user to null note
        console.log("We have a new client: " + socket.id);
        console.log('new note');
        if (people.C4 == null) {
          people.C4 = socket;
          socket.emit('note', 'C4');
          console.log("C4 is taken");
        } else if (people.D4 == null) {
          people.D4 = socket;
          socket.emit('note', 'D4');
          console.log("D4 is taken");
        } else if (people.E4 == null) {
          people.E4 = socket;
          socket.emit('note', 'E4');
          console.log("E4 is taken");
        } else if (people.F4 == null) {
          people.F4 = socket;
          socket.emit('note', 'F4');
          console.log("F4 is taken");
        } else if (people.G4 == null) {
          people.G4 = socket;
          socket.emit('note', 'G4');
          console.log("G4 is taken");
        } else if (people.A4 == null) {
          people.A4 = socket;
          socket.emit('note', 'A4');
          console.log("A4 is taken");
        } else if (people.B4 == null) {
          people.B4 = socket;
          socket.emit('note', 'B4');
          console.log("B4 is taken");
        } else if (people.C5 == null) {
          people.C5 = socket;
          socket.emit('note', 'C5');
          console.log("C5 is taken");
        }
      } else if (data == 'sound') {
        console.log("Instrument is ready");
        console.log("Instrument's ID: " + socket.id);
      }
    });

    //Pass note data to client side
    socket.on('note', function (data) {
      if (socket == people.C4) {
        io.sockets.emit('C4', data);
      } else if (socket == people.D4) {
        io.sockets.emit('D4', data);
      } else if (socket == people.E4) {
        io.sockets.emit('E4', data);
      } else if (socket == people.F4) {
        io.sockets.emit('F4', data);
      } else if (socket == people.G4) {
        io.sockets.emit('G4', data);
      } else if (socket == people.A4) {
        io.sockets.emit('A4', data);
      } else if (socket == people.B4) {
        io.sockets.emit('B4', data);
      } else if (socket == people.C5) {
        io.sockets.emit('C5', data);
      }
    });

    //Sockets for playing sound
    socket.on('C4', function (data) {
      console.log("server got C4");
      io.sockets.emit('C4', data);
    });
    socket.on('D4', function (data) {
      console.log("server got D4");
      io.sockets.emit('D4', data); 
    });
    socket.on('E4', function (data) {
      console.log("server got E4");
      io.sockets.emit('E4', data);
    });
    socket.on('F4', function (data) {
      console.log("server got F4");
      io.sockets.emit('F4', data);
    });
    socket.on('G4', function (data) {
      console.log("server got G4");
      io.sockets.emit('G4', data);
    });
    socket.on('A4', function (data) {
      console.log("server got A4");
      io.sockets.emit('A4', data);
    });
    socket.on('B4', function (data) {
      console.log("server got B4");
      io.sockets.emit('B4', data);
    });
    socket.on('C5', function (data) {
      console.log("server got C5");
      io.sockets.emit('C5', data);
    });

    //Release note slots when user disconnects
    socket.on('disconnect', function () {
      console.log("Client has disconnected");
      if (socket == people.C4) {
        people.C4 = null;
        console.log("C4 left");
      } else if (socket == people.D4) {
        people.D4 = null;
        console.log("D4 left");
      } else if (socket == people.E4) {
        people.E4 = null;
        console.log("E4 left");
      } else if (socket == people.F4) {
        people.F4 = null;
        console.log("F4 left");
      } else if (socket == people.G4) {
        people.G4 = null;
        console.log("G4 left");
      } else if (socket == people.A4) {
        people.A4 = null;
        console.log("A4 left");
      } else if (socket == people.B4) {
        people.B4 = null;
        console.log("B4 left");
      } else if (socket == people.C5) {
        people.C5 = null;
        console.log("C5 left");
      }
    });
  }
);