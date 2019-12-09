const msg = {
    OFFLINE: "offline",
    ONLINE: "online",
    CONNEXION: "connexion",
    MATCH: "match",
    PARIS: "paris",
    OTHER: "other"
};

let msgServ = {
    set new(nmsg){
        this[nmsg] = nmsg;
    }
};