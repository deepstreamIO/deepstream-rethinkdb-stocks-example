ds = deepstream('52.29.184.11:6020').login({}, onConnected );

function onConnected() {
	var amzn = ds.record.getRecord( 'sp500/AMZN' );
	
	amzn.subscribe( 'company_name', function( companyName ){
		$( '.company-name' ).text( companyName );
	});

	amzn.subscribe( 'last_price', function( lastPrice ){
		$( '.price' ).text( Number( lastPrice ).toFixed( 2 ) );
	});
}