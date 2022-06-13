import React from 'react';
import './style.css';

export default function Button({ value, className, onClick }) {
    const classNames = `btn ${className || null}`;
    
    return (
        <button className={classNames} onClick={onClick}>{value}</button> 
    );
};