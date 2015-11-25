var DeepstreamServer = require( 'deepstream.io' ),
	RdbC = require( 'deepstream.io-storage-rethinkdb' ),
    server = new DeepstreamServer();

server.set( 'host', '0.0.0.0' );
server.set( 'port', 6020 );
server.set( 'tcpHost', '0.0.0.0' );
server.set( 'tcpHost', 6021 );

server.set( 'storage', new RdbC({ 
  port: 28015, 
  host: '52.29.184.11' 
}));


server.start();