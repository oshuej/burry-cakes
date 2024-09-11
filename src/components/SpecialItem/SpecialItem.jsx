import React from 'react';
import './styles.css'

export const SpecialItem = ({ color, headerText, descriptionText, backgroundImage }) => {
    return (
        <div className={`special-item special-item_${color}`} style={{ background: `url(${backgroundImage})`}}>
            <h3 className='special-item__header'>{ headerText }</h3>
            <p className='special-item__description'>{ descriptionText }</p>
        </div>
    )
}