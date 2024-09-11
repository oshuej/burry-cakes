import React, { useEffect } from 'react';
import { SpecialItem } from '../SpecialItem/SpecialItem.jsx';
import './styles.css';

const SpecialItems = ({ items }) => {
    return (<div className='special-items'>
        {items.map((el) => 
            <SpecialItem 
                key={el.header} 
                headerText={el.header} 
                descriptionText={el.description} 
                color={el.color} 
                backgroundImage={el.image}  
            />)
        }
    </div>)
}

export default SpecialItems;