import React, {type FC, ReactEventHandler} from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import { Dish } from "../../../services/types";
import placeholder from '../../../assets/images/image_placeholder.webp';

export const DishItem: FC<Dish> = ({ imageUrl, name, price, id }: Dish) => {
    return (
        <div className='dish-item'>
            <Link to={`/admin/catalog/edit/${id}`}>
                {imageUrl ? (
                    <img
                        className='dish-item__image'
                        src={imageUrl}
                        alt={name}
                    />
                ) : <img
                    className='dish-item__image'
                    src={placeholder}
                    alt={name}
                />}
            </Link>
            <div className='dish-item__info'>
                <h4 className='dish-item__info-name'>{name}</h4>
                <div className='dish-item__info-price'>
                    <span>{price}&nbsp;₽</span>
                </div>
            </div>
        </div>
    )
}