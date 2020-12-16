
export function RunCommand(cmd:any, client:any = {}) {
  let retVal = '';
  switch (cmd) {
    case 'start' :
    case 'init' : 
    retVal = `
────────────────────
─█───█───███───████─
─█───█──█──────█────
─█───█──█──██──████─ UNITED
─█───█──█───█──█──── GALACTIC
──███────███───█──── FEDERATION
────────────────────
UGF of Registry Citizens. (Y-2336)

TERMINAL CLIENT
    Registered : UGF-FCR-007-00023
    Sector : Terra
    Unit : ${client.geoplugin_continentName}
    Lat : ${client.geoplugin_latitude}
    Long : ${client.geoplugin_longitude}
    Node : 0023
    Uptime : ${Math.floor(Math.random()*10000)}ms
    Latency : ~ ${Math.floor(Math.random()*10)}ms
    Local Access Point : ${client.geoplugin_request}
    `
      break;
    case 'help' : 
      retVal = `Commands:\nhelp: \tDisplay list of commands\nstart: \tStart game`;
      break;
    
    default : 
      retVal = `UGF-FCR: Command not recognized: ${cmd}`;
  }
  return `${retVal}\n`;
}

// export function PrintOut(str:string) {
//   const timePerChar = 2000;
  
// }