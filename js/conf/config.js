const projectName = 'Projet';
const staticCacheName = 'cache_'+projectName;
const serverURL = 'http://localhost:8080';
const REQ = {
    connexion: {
        value: new URL(serverURL)
    },
    match: {
        all: {
            value: new URL(serverURL.concat('/api/matchs'))
        },
        one: {
            value: (p) => {return new URL(serverURL.concat(`/api/matchs/${p}`))}
        },
        addEvent: {
            value: new URL(serverURL.concat('/api/matchs/addEvent'))
        }
    },
    paris: {
        all:{
            value: new URL(serverURL.concat('/api/bet'))
        },
        one: {
            value: (p) => {return new URL(serverURL.concat(`/api/bet/info/${p}`))}
        },
        add:{
            value: new URL(serverURL.concat('/api/bet'))
        }
    }
};
