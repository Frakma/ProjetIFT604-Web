/*
-----------------SERVICE WORKER-----------------
-does every request to spotify API
-manage DB
-cannot access DOM -> communication with "main.js"
throught self.addEventListener("message", ...)
 ------------------------------------------------
 */

const filesToCache = [];

self.importScripts("js/conf/config.js");
self.importScripts("js/sw/msg.js");

/*
add to cache every file in "filesToCache" on sw installation
*/
self.addEventListener('install', event => {
    //console.log('Attempting to install service worker and cache static assets');
    event.waitUntil(
        caches.open(staticCacheName)
            .then(cache => {
                return true;//cache.addAll(filesToCache);//TODO
            }).catch(function(error){
            console.error(error);
        })
    );
});

/*
update the cache on sw activation
 */
self.addEventListener('activate', event => {
    //console.log('Activating new service worker...');
    const cacheWhitelist = [staticCacheName];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

/*
intercept all request made to external websites
 */
self.addEventListener('fetch', event => {
    //console.log('Fetch event for ', event.request.url);
    if(event.request.url === ''){return;}
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    //console.log('Found ', event.request.url, ' in cache');
                    //console.log(response);
                    return response;
                }
                //console.log('Network request for ', event.request.url);
                return false;
            }).catch(error => {
                console.error(error);
            // TODO 6 - Respond with custom offline page
            })
            .then(c => {
                return c || fetch(event.request).then(response => {
                    // TODO 5 - Respond with custom 404 page
                    return caches.open(staticCacheName).then(cache => {
                        cache.put(event.request.url, response.clone());
                        return response;
                    });
                });
            })
    );
});


/*
passive communication with "main.js"
in "main.js" --> sendToSW(data)
data = {action: "", [opt=...]}
 */
self.addEventListener('message', function(event){
    return new Promise((resolve, reject) => {
        //console.log('received message : ');
        if (event.data.hasOwnProperty('action')) {
            switch (event.data.action) {
                case msg.CONNEXION:
                    resolve(fetchGET(REQ.connexion, {
                    }).then(result => {
                        for(let [key, value] of Object.entries(result)){
                            msgServ.new = {key: key, value: value};
                        }
                        return true;
                    }));
                    break;
                case msg.ONLINE:
                    resolve({});//TODO
                    break;
                case msg.OFFLINE:
                    resolve({});//TODO
                    break;
                case msg.EVENTS:
                    if (event.data.opt == 'all') {
                      fetchPOST(REQ.events.all, event.data.optData).then(result => {
                          resolve(result);
                      });
                    }
                    break;
                default:
                    if(msgServ.hasOwnProperty(event.data.action)){
                        resolve(fetchGET(URL, {
                            actions: event.data.action,
                            params: msgServ[event.data.action]
                        }));
                    }else {
                        reject("message not corresponding");
                    }
            }
        }
    }).then(res => {
        console.log(res)
        if(res)
            respondToMsg(event, res);
        else
            console.log('erreur: le serveur ne répond pas')
    });
});

respondToMsg = (event, data) => {
    return new Promise(resolve => {
        event.ports[0].postMessage((!data)?true:data);
        resolve(true);
    });
};

respondToMsgBlob = (event, object) => {
    console.log(object);
    return new Promise(resolve => {
        let blob = new Blob(object, {type: "application/javascript"});
        event.ports[0].postMessage(blob, [blob]);
        resolve(true);
    });
};

responseToBlob = (response) => {
    return new Promise(function(resolve){
        (new Promise(function(resolve){resolve(response);}))
            .then(response => response.body)
            .then(body => {const reader = body.getReader();return new ReadableStream({start(controller){return pump();function pump(){return reader.read().then(({done, value})=>{if(done){controller.close();return;}controller.enqueue(value);return pump();});}}});})
            .then(stream => new Response(stream))
            .then(response => response.blob())
            .then(blob => resolve(blob));
    });
};


fetchGET = async (url_, params = {}) => {
    let url = url_;
    Object.keys(params).forEach(key => (params[key] !== null) ? url.searchParams.append(key, params[key]) : null);
    let req = new Request(url.value, {method: 'GET'});
    return fetch(req).then(response => {
        //console.log('fetchResp: ', response);
        return response.text();
    });
};


fetchPOST = async (url_, params) => {
    return fetch(url_.value, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    }
    ).then(response => {
        //console.log('fetchResp: ', response);
        return response.text();
    });
};
