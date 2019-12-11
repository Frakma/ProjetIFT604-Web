const projectName = 'Projet';
const staticCacheName = 'cache_'+projectName;
const serverURL = 'http://localhost:8080';
const REQ = {
    connexion: {
        value: new URL(serverURL)
    },
    events: {
        all: {
            value: new URL(serverURL.concat('/events'))
        },
        one: {
            value: (p) => {return new URL(serverURL.concat(`/events/${p}`))}
        }
    },
    preferences: {
        all:{
            value: new URL(serverURL.concat('/preferences'))
        },
        change:{
            value: new URL(serverURL.concat('/preferences'))
        }
    }
};
