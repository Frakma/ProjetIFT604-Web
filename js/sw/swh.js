/**
 * swh => service worker helper
 * Se charge de le préparer au bon fonctionnement.
 * Ajoute des eventListeners sur la co internet.
 * Possède une fonction (send()) pour envoyer des msg au sw.
 */
class swh{
    filename;
    done;

    constructor(serviceWorkerFileName)
    {
        this.filename = serviceWorkerFileName;
        this.done = new Promise(((resolve, reject) => {
            navigator.serviceWorker.register("./"+this.filename).then(registration => {
                // Registration was successful
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
                navigator.serviceWorker.getRegistration().then(event => {
                    ///service worker is installed
                    if (navigator.serviceWorker.controller === null) {
                        //service worker not yet active => reload will solve the problem
                        location.reload(false);
                        reject("ServiceWorker not activated");
                    }
                    resolve(true);
                }).catch(err => {
                    reject(err);
                });
            }).catch(err => {
                reject(err);
            });
        })).then(_ => {
            return this.addInternetChangeEventListener().then(_ => {
                return this.send({action: msg.CONNEXION}).then(result => {
                    return (result);
                });
            });
        })
    }

    get done(){
        return this.done;
    }

    /**
     * Send a "message" to the service worker
     * @param data {action: msg.ENUM, ...optData}
     * @returns {Promise<any>}
     */
    send = (data) => {
        return new Promise((resolve, reject) => {
            let messageChannel = new MessageChannel();
            messageChannel.port1.onmessage = (event) => {
                if(event.data.error){
                  reject(event.data.error);
                }
                else{
                  resolve(event.data);
                }
            };
            navigator.serviceWorker.controller.postMessage(data, [messageChannel.port2]);
        });
    };

    addInternetChangeEventListener = async () => {
        window.addEventListener('offline', e => {
            this.send({action: msg.OFFLINE});
            console.log("user went "+msg.OFFLINE);
        });
        window.addEventListener('online', e => {
            this.send({action: msg.ONLINE});
            console.log("user went "+msg.ONLINE);
        });
        return true;
    }
}
