var deepstreamClient = require( 'deepstream.io-client-js' );
var RedisMsg = require( 'deepstream.io-msg-redis');
var symbols = require( './symbols.json' );

// Connect to deepstream
var ds = deepstreamClient( '52.29.184.11:6021' ).login();

// Connect to Redis Pub Sub
var redisMsg = new RedisMsg({
	port: 6379, 
	host: '52.29.184.11' 
});

// Subscribe to S&P 500 Symbols
redisMsg.once( 'ready', function(){
	for( var i = 0; i < symbols.length; i++ ) {
		redisMsg.subscribe( symbols[ i ], onData );
	}
});

// Send data to deepstream
function onData( data ) {
	var recordName = 'sp500/' + data.symbol;
	ds.record.getRecord( data.symbol ).set( data );
}