import React from 'react';
import Scroll from '../Scroll';
import './style.css';

export default function Search({ id, items, selectItem, placeholder, isDisabled }) {
    const [searchField, setSearchField] = React.useState('');
    const [isActive, setActive] = React.useState(false);

    const ignoreClickOnMeElement = document.getElementById(id);

    document.addEventListener('click', function(event) {
        if (ignoreClickOnMeElement) {
            const isClickInsideElement = ignoreClickOnMeElement.contains(event.target);
            if (!isClickInsideElement) {
                setActive(false);
            }
        }
    });

    const handleChangeInput = (e) => {
        setSearchField(e.target.value);
    };

    const handleChangeSelect = (e, value) => {
        e.preventDefault();
        e.stopPropagation();
        setSearchField(value);
        selectItem(value);
        setActive(false);
    };

    const handleFocus = () => {
        setActive(true);
    };

    const handleInput = () => {
        selectItem('');
    };

    const filteredItems = searchField ? items.filter((item) => item.value.toLowerCase().includes(searchField.toLowerCase())) : items;
    
    return (
        <div id={id} className='search'>
            <input 
                value={searchField}
                className='input'
                type='search'
                placeholder={placeholder}
                onFocus={handleFocus}
                onChange={handleChangeInput}
                disabled={isDisabled}
                onInput={handleInput}
                maxLength={255}
            />
            {isActive && (
                <Scroll>
                    {!!filteredItems.length &&  (
                        <ul>
                            {filteredItems.map((item) => (
                                <li key={item.id} onClick={(e) => {handleChangeSelect(e, item.value)}}>{item.value}</li>
                            ))}
                        </ul>
                    )}
                    {!filteredItems.length && (
                        <p>Nothing searched for</p>
                    )}
                </Scroll>
            )}
        </div>
    );
};