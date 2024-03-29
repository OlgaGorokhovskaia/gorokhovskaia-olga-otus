import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v1 as uuidv1 } from 'uuid';
import { getCountriesDictionary } from '../../data/response';
import Search from '../../components/Search';
import List from '../../components/List';
import './style.css';

export default function Home() {
  const navigate = useNavigate();

  const [dictionary, setDictionary] = useState(null);
  const [country, setCountry] = useState('');

  useEffect(() => {
    if (dictionary === null) {
      getCountriesDictionary()
        .then((data) => setDictionary(data || []));
    }
  }, [dictionary]);

  const selectCity = useCallback((cityName) => {
    if (!!cityName) navigate(`city?${cityName}`);
  },[navigate]);

  const selectCountry = useCallback((countryName) => {
    setCountry(countryName);
  },[]);

  const getCitiesList = useCallback((dictionary) => {
    const item = dictionary.find((item) => item.country === country);
    const citiesArr = item.cities.length ? item.cities : [item.country];
  
    return citiesArr.map(city => ({ value: city, id: uuidv1() }));
  },[country]);

  const countries = useMemo(() => dictionary ? dictionary.map(item => ({ value: item.country, id: uuidv1() })) : [], [dictionary]);
  const cities = useMemo(() => country ? getCitiesList(dictionary || []) : [], [country, getCitiesList, dictionary]);

  return (
    <main>
      <h1 className='header'>Weather forecast</h1>
      <section className='row'>
        <div className='column column-4'>
            <Search 
                id='countrySearch'
                items={countries}
                placeholder='Search for a country'
                selectItem={selectCountry}
                isDisabled={!dictionary || !dictionary.length}
            />
        </div>
        <div className='column column-4'>
            <Search 
                id='citySearch'
                items={cities}
                placeholder='Search for a city'
                selectItem={selectCity}
                isDisabled={!country}
            />
        </div>
      </section>
      <List selectItem={selectCity} />
    </main>
  );
}