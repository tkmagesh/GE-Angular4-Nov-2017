var pgm = (function(){
	function addSync(x,y){
		console.log(`	[@Service] processing ${x} and ${y}`);
		var result = x + y;
		console.log(`	[@Service] returning result`);
		return result;
	}

	function addSyncClient(x,y){
		console.log(`[@Client] triggering addSync`);
		var result = addSync(x,y);
		console.log(`[@Client] result = ${result}`);
	}

	function addAsync(x,y, callback){
		console.log(`	[@Service] processing ${x} and ${y}`);
		setTimeout(function(){
			var result = x + y;
			console.log(`	[@Service] returning result`);
			if (typeof callback === 'function')
				callback(result);
		}, 4000);
	}

	function addAsyncClient(x,y){
		console.log(`[@Client] triggering addAsync`);
		addAsync(x,y, function(result){
			console.log(`[@Client] result = ${result}`);	
		});
		
	}

	var addAsyncEvents = (function(){
		var _subscribers = [];
		function subscribe(subscriptionFn){
			if (typeof subscriptionFn === 'function')
				_subscribers.push(subscriptionFn)
		}

		function process(x,y){
			console.log(`	[@Service] processing ${x} and ${y}`);
			setTimeout(function(){
				var result = x + y;
				console.log(`	[@Service] returning result`);
				_subscribers.forEach(subscriptionFn => subscriptionFn(result));
			}, 4000);
		}
		return {
			subscribe : subscribe,
			process : process
		}

	})();

	function addAsyncPromise(x,y){
		var promise = new Promise(function(resolveFn, rejectFn){
			console.log(`	[@Service] processing ${x} and ${y}`);
			setTimeout(function(){
				var result = x + y;
				console.log(`	[@Service] returning result`);
				resolveFn(result);
			}, 4000);
		});

		return promise;
	}

	return {
		addSyncClient : addSyncClient,
		addAsyncClient : addAsyncClient,
		addAsyncEvents : addAsyncEvents,
		addAsyncPromise : addAsyncPromise
	}
})();