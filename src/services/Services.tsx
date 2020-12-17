
export function RunCommand(cmd:any, client:any = {}) {

  let retVal = '';
  switch (cmd.toLowerCase()) {
    
    case 'reset' :
    case 'init' : 
    retVal = `
^SYSTEM STATUS^^ Online

READING CLIENT^.^.^.^

CLIENT
  Type: Registered Terminal
  Registered : UGF-RoC-007-00023
  Sector : Terra
  Unit : ${client.continent_name}, ${client.country_name}, ${client.district}
  Lat : ${client.latitude}
  Long : ${client.longitude}
  Node : 0023
  Uptime : ${Math.floor(Math.random()*10000)}ms
  Latency : ~ ${Math.floor(Math.random()*10)}ms
  Local Access Point : ${client.ip}

SCANNING ACCESS POINT
  Node Status:^^ ONLINE
  Terminal Status:^^^ ONLINE
  Terminal Health:^ OK

CONNECTION
    Proxy Tunnel^.^.^.^.^.^ ESTABLISHED
    Secure Connection: ESTABLISHED

Welcome!

────────────────────
─█───█───███───████─
─█───█──█──────█──── UNITED
─█───█──█──██──████─ GALACTIC
─█───█──█───█──█──── FEDERATION
──███────███───█────
────────────────────

UGF Registry of Citizens. (Y-2336)`
      break;
    
    case 'help' : 
      retVal = `Commands:\nhelp: \tDisplay list of commands\nreset: \tFor when you need to start over`;
      break;
    
    case 'ls' :
      retVal = `Terminal\tNetwork`;
      break;
    
    case 'cd' :
      retVal = `UGF-RoC: Command missing parameter`

    case 'cd terminal' : 
      retVal =  ``;
      break;

    case 'cd network' :
      retVal = '';
      break;
    
    
    
      default : 
      retVal = `UGF-RoC: Command not recognized: ${cmd}`;
  }
  
  return `${retVal}\n`;


/*
───────────────────
───████───█████────
──█────█──█────█───
──█────█──█────█───
──██████──█████────
──█────█──█────█───
──█────█──█─────█──
───────────────────
*/

}
