
var RedisMsg = require( 'deepstream.io-msg-redis');

var redisMsg = new RedisMsg({
	port: 6379, 
	host: '52.29.184.11' 
});

redisMsg.once( 'ready', function(){
	setTimeout( function(){
		console.log( 'SUBSCRIBING' );
		redisMsg.subscribe( 'AAPL', onData );
		redisMsg.subscribe( 'EBAY', onData );
		redisMsg.subscribe( 'MSFT', onData );
	},1000);
	
});

function onData( data ) {
	console.log( 'DATA:', data );
}