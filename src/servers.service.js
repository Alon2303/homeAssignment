const servers = require('./config/servers.json');
const {REQUEST_TIME_OUT, MIN_STATUS_VALUE, MAX_STATUS_VALUE} = require('./config/config');


const getServerStatus = () => Math.floor(Math.random() * (MAX_STATUS_VALUE - MIN_STATUS_VALUE) + MIN_STATUS_VALUE);

const getOnlineServers = () => new Promise((resolve, reject) => {
    const timeOut = setTimeout(() => {
        clearTimeout(timeOut);
        reject("Request timeout")
    }, REQUEST_TIME_OUT);

    serverList = addAvailabilityStatusToServers();
    const availableServers = serverList.filter(server => server.status >= 200 && server.status < 300)
    
    const mostAvailableServer = availableServers.reduce((a, b)=>{
        return a.priority < b.priority ? a : b
    },availableServers[0]);
    resolve(mostAvailableServer);
});
   


const addAvailabilityStatusToServers = () => {
    return servers.map(server => {
        return {
            ...server,
            status: getServerStatus()
        }
    })
}

module.exports = {getOnlineServers};