import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './index.css';

export default function Nav(props:any) {
  const [activeItem, setActiveItem] = useState(props.activeItem.replace(/\//g,'') || 'Home');

  function handleItemClick(e:any, { name }:any) {
    setActiveItem(name)
  }

  return (
    <div>
      <Menu pointing secondary>
          <Menu.Item 
          as={Link}
          to='/'
          name='Terminal 1'
          active={activeItem === 'Terminal1'} 
          onClick={handleItemClick} 
        />
      </Menu>
    </div>
    
  );
}