var deepstreamClient = require( 'deepstream.io-client-js' );
var RedisMsg = require( 'deepstream.io-msg-redis');
var symbols = require( './symbols.json' );

/*
 * Connect to Redis Pub Sub
 */
var redisMsg = new RedisMsg( { 
  port: 5672, 
  host: 'localhost' 
});
redisMsg.on( 'ready', checkIfReady );

/*
 * Connect to deepstream
 */
var ds = deepstreamClient( 'localhost:6021' ).login();
ds.on( 'ready', checkIfReady );

function checkIfReady() {
	if( ds.isReady && redisMsg.isReady ) {
		subscribeToSymbols();
	}
}

function subscribeToSymbols() {
	for( var i = 0; i < symbols.length; i++ ) {
		
	}
}