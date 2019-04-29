console.log('Custom service worker')

const nomeDoCachePrincipal = 'financeiro-v0009'
self.addEventListener('install', event => {
	console.log('Install')
	event.waitUntil(
		caches.open(nomeDoCachePrincipal)
		.then(cache => {
			return cache.addAll([
				//'/',
				//'static/js/bundle.js',
				//'static/js/main.chunk.js',
				//'static/js/0.chunk.js',
				//'static/js/1.chunk.js',
				//'manifest.json',
				//'service-worker-custom.js',
			])
		})
		.catch(error => console.log(error)),
		console.log('skipWaiting'),
		self.skipWaiting()
	)
})

self.addEventListener('activate', event => {
	console.log('activate')
	event.waitUntil(
		caches.keys()
		.then(nomeTodasCaches => {
			console.log('removendo outros caches')
			return Promise.all(
				nomeTodasCaches
				.filter(nomeDocache => nomeDocache.startsWith('financeiro-') && nomeDocache != nomeDoCachePrincipal)
				.map(nomeDoCache => caches.delete(nomeDoCache))
			)
		}),
		self.clients.matchAll({ type: 'window' }).then(windowClients => {
			for (let windowClient of windowClients) {
				// Force open pages to refresh, so that they have a chance to load the
				// fresh navigation response from the local dev server.
				windowClient.navigate(windowClient.url);
			}
		})
	)
})

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request)
		.then(response => {
			//console.log('request ', event.request.url)
			if(response) {
				//console.log('caches.match')
				return response
			}
			//console.log('buscando fetch')
			return fetch(event.request)
		})
	)
})

self.addEventListener('notificationclose', function(e) {
	var notification = e.notification;
	console.log('Closed notification: ' + notification);
});

self.addEventListener('notificationclick', function(e) {
	var notification = e.notification;
	var action = e.action;
	if (action === 'close') {
		notification.close();
	} else {
		clients.openWindow('http://www.example.com');
		notification.close();
	}
});

self.addEventListener('push', function(event) {
	console.log('Push received: ', event)
	event.waitUntil(
		self.registration.showNotification('TRUTA', {
			body: 'FOI ABESTADO',
		})
	);
});
