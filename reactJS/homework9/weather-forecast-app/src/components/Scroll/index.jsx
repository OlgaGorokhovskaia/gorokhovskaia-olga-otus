import React from 'react';
import './style.css';

const Scroll = ({ children }) => {
  return( 
    <div className='scroll'>
      {children}
    </div>	
  );
};

export default Scroll;