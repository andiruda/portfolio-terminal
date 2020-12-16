
export function RunCommand(cmd:any, client:any = {}) {
  let retVal = '';
  switch (cmd) {
    case 'start' :
    case 'init' : 
    retVal = `
────────────────────
─█───█───███───████─
─█───█──█──────█──── UNITED
─█───█──█──██──████─ GALACTIC
─█───█──█───█──█──── FEDERATION
──███────███───█────
────────────────────
UGF Registry of Citizens. (Y-2336)

TERMINAL CLIENT
    Registered : UGF-RoC-007-00023
    Sector : Terra
    Unit : ${client.continent_name}, ${client.country_name}, ${client.district}
    Lat : ${client.latitude}
    Long : ${client.longitude}
    Node : 0023
    Uptime : ${Math.floor(Math.random()*10000)}ms
    Latency : ~ ${Math.floor(Math.random()*10)}ms
    Local Access Point : ${client.ip}
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