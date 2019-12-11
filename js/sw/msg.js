const msg = {
    OFFLINE: "offline",
    ONLINE: "online",
    CONNEXION: "connexion",
    EVENTS: "evenements",
    PREFS: "preferences",
    OTHER: "other"
};

let msgServ = {
    set new(nmsg){
        this[nmsg] = nmsg;
    }
};
