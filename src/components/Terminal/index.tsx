import React, { useState, useEffect, useContext } from 'react';
import { RunCommand } from '../../services/Services';
import './index.css';

import { StoreContext } from '../../utilities/store';

const SEP = ' ~ $ ';

function History(props:any) {
  const { buffer: [ buffer ] } = useContext(StoreContext);

  //Automated scrolling
  useEffect(() => {
    let elem = document.querySelector("#container");
    if (elem) elem.scrollTo(0,elem.scrollHeight);
  });
  
  const list = buffer.map((row:any, idx:number) => {
    const userInfo = row.split(SEP);
    return (
      <li className="wrap" key={idx}>
        <pre className={(userInfo.length > 1) ? 'clientString' : 'responseOutput'}>
          {userInfo[0]}
          {userInfo.length > 1 && SEP}
        </pre>
        <div className="inputTxt">
          {userInfo[1]}
        </div>
      </li>
    );
  });

  return (
    <ul id="buffer">{list}</ul>
  );
}

export default function Terminal(props:any) {

  const [ error, setError ]: any = useState(null);
  const [ isLoaded, setIsLoaded ] = useState(false);
  const [ client, setClient ]: any = useState(null);
  const [ input, setInput ]: any = useState('');
  const [ tmpInput, setTmpInput ]: any = useState({});
  const [ hideInput, setHideInput ]: any = useState(true);
  
  const { buffer: [ buffer, setBuffer ] } = useContext(StoreContext);
  
  const [ response, setResponse ] = useState('');
  const [ scrollPtr, setScrollPtr ] = useState(0);

  useEffect(() => {
    document.getElementById("inputMain")?.focus();
    fetch('https://api.ipgeolocation.io/ipgeo?apiKey=ff2bca4bbf144d858a8ea8801d6e1375')
      .then(res => res.json())
      .then(result => {
          setClient(result);
          setIsLoaded(true);
        },
        (error:any) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, []);

  useEffect(() => {
    if (!client) return;
    setResponse(RunCommand('init',client));
  },[client])

  useEffect(() => {
    if (!response) return;

    const responseAry = response.split('');
    let timePtr = 5;
    let tmpBuffer = '';

    responseAry.forEach((char: string, idx: number) => {
      if (char === '^') timePtr += 1000;
      else timePtr += 5;
      setTimeout(() => {
        if (char === '^') return;
        tmpBuffer += char;
        setBuffer([...buffer, ...[tmpBuffer]]);
        if (idx === responseAry.length - 1) {
          setHideInput(false);
        }
      }, timePtr)
    });
    
    setResponse('');
    setScrollPtr(buffer.length + 1);

  },[response]);

  useEffect(() => {
    if(!hideInput) {
      document.getElementById("inputMain")?.focus();
      const outputs = document.getElementsByClassName('responseOutput');
      if (outputs.length > 0) {
        let elem = outputs[outputs.length - 1];
        elem.classList.remove('responseOutput');
      }
    }
  },[hideInput]);

  const handleKey = (e:any) => {
    if (e.key === 'Meta') return;
    
    const el: any = document.getElementById("inputMain");
    if (
      el.innerText.replace(/\s/g,'').length === 0 
      && input.replace(/\s/g,'').length === 0 
      && Object.keys(tmpInput).length > 0
    ) {
      Object.keys(tmpInput).forEach((str) => tmpInput[str].action = 'keyup')
    }
    
    e.preventDefault();
    if (!e.key || (tmpInput[e.key] && e.type !== 'keyup')) return;
    
    tmpInput[e.key] = { action: e.type };
    setTmpInput(tmpInput);
    
    let ready = true;
    for (const a in tmpInput) {
      if (tmpInput[a].action === 'keydown') ready = false;
    };
    
    if (!ready) return;
    const key = (Object.keys(tmpInput).length > 1) ? Object.keys(tmpInput).join('') : e.key;
    let value = '';
    
    switch (key) {
      case 'Backspace' :
        value = input.substring(0,input.length - 1);
        break;
      case 'Enter' :
        if (input.toLowerCase() === 'clear') {
          setBuffer([]);
          value = '';
          break;
        }
        setHideInput(true);
        const msg = RunCommand(input, client);
        const newLines = [client.ip + SEP + input];
        setBuffer([...buffer, ...newLines]);
        setResponse(msg);
        value = '';
        break;
      case 'ArrowUp' :
        if (buffer.length > 1) {
          const upScrollPtr = scrollPtr - 2;
          if (!buffer[upScrollPtr]) break;
          value = buffer[upScrollPtr].replace(client.ip, '').replace(SEP, '');
          setScrollPtr(upScrollPtr);
        }
        break;
      case 'ArrowDown' : 
        if (buffer.length > 1 && scrollPtr < buffer.length) {
          const downScrollPtr = scrollPtr + 2;
          if (!buffer[downScrollPtr]) break;
          value = buffer[downScrollPtr].replace(client.ip, '').replace(SEP, '');
          setScrollPtr(downScrollPtr);
        }
        break;
      case 'lControl' : 
      case 'Controll' : 
        setBuffer([]);
        value = '';
        break;
      case /shift/ : 
        break;
      default :
        value = input + key.replace(/shift|control|enter|alt|command|backspace/gi,'');
        break;
    }
    setInput(value);
    const elem: any = document.getElementById("inputMain");
    elem.innerText = value;
    setTmpInput({});
  }

  const handleClick = (e: any) => {
    document.getElementById("inputMain")?.focus();
  }

  if(error) {
    return <div>Error: {error.message}</div>
  } else if(!isLoaded) {
    return <div>Loading...</div>
  } else {
    const clientString = `${client.ip}${SEP}`;
    return (
        <div id="container" onClick={handleClick}>
          <History buffer={buffer}></History>
          <div className="wrap">
          {!hideInput && <pre className="clientString">{clientString}</pre>}
          {!hideInput && <div id="inputMain" contentEditable="true" onKeyDown={handleKey} onKeyUp={handleKey}></div>}
          </div>
        </div>
    );
  }
}
