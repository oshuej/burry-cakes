import React from 'react';
import plus from '../../assets/images/plus.svg';
import './styles.css';
import { Link } from 'react-router-dom';
import placeholder from '../../assets/images/image_placeholder.webp';

export const CatalogItem = ({ imageUrl, name, price, inCart }) => {
    return (
        <div className='catalog-item'>
            <Link to={`/catalog/${name}`}>{imageUrl ? (
                <img
                    className='catalog-item__image'
                    src={imageUrl}
                    alt={name}
                />
            ) : <img
                className='catalog-item__image'
                src={placeholder}
                alt={name}
            />}</Link>
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