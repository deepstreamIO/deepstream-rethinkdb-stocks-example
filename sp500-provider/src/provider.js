var deepstreamClient = require( 'deepstream.io-client-js' );
var RedisMsg = require( 'deepstream.io-msg-redis');
var symbols = require( './symbols.json' );

/*
 * Connect to Redis Pub Sub
 */
var redisMsg = new RedisMsg({
	port: 6379, 
	host: '52.29.184.11' 
});

redisMsg.on( 'ready', subscribeIfReady );

/*
 * Connect to deepstream
 */
var ds = deepstreamClient( '52.29.184.11:6021' ).login({}, subscribeIfReady);

/*
* Get all prices
*/
function subscribeIfReady() {
	if( ds.isReady && redisMsg.isReady ) {
		for( var i = 0; i < symbols.length; i++ ) {
			redisMsg.subscribe( symbols[ i ], onData );
		}
	}
}

/*
* Send data to deepstream
*/
function onData( data ) {
	var recordName = 'sp500/' + data.symbol;
	ds.record.getRecord( data.symbol ).set( data );
}