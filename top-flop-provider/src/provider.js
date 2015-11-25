var r = require('rethinkdb');
var deepstreamClient = require( 'deepstream.io-client-js' );
var ds = deepstreamClient( '52.29.184.11:6021' ).login();
var topStocks = ds.record.getList( 'topstocks' );

r.connect({
	port: 28015, 
	host: '52.29.184.11',
	db: 'stockprices'
}).then( runQuery );

function runQuery( connection ) {
	r
	 .table('sp500')
	 //.orderBy({index: r.asc('intraday_performance')})
	 //.limit(3)
	 .count()
	 //.getField( 'ds_id' )
	 //.changes({includeInitial: true })
	 .run( connection )
	 .then( onResult );
}

function onResult( cursor ) {console.log( cursor );
	cursor.each(function( err, result ){console.log( result ); return;
		if( result.new_val === null ) {
			topStocks.removeEntry( result.old_val );
		} else {
			topStocks.addEntry( result.new_val );
		}
	});
}