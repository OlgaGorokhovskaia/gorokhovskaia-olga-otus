import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import './style.css';
  
  export default function NotFound() {
    const navigate = useNavigate();

    const goToHomepage = () => {
      navigate('/');
    };

    return (
        <main className='notFound'>
            <h1>Oops!</h1>
            <h1>404 - page not found</h1>
            <Button value="Go to homepage" onClick={goToHomepage}></Button>
        </main>
      );
}