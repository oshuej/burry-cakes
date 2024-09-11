import React from 'react';
import plus from '../../assets/plus.svg';
import './styles.css';

export const CatalogItem = ({ image, name, price, inCart }) => {
    return (
        <div className='catalog-item'>
            <img className='catalog-item__image' src={image} alt={name} />
            <div className='catalog-item__info'>
                <h4 className='catalog-item__info-name'>{name}</h4>
                <div className='catalog-item__info-price'>
                    <span>{price}&nbsp;₽</span>
                    <button className='catalog-item__add'>
                        <img src={plus} alt='plus' />
                    </button>
                </div>
            </div>
        </div>
    )
}