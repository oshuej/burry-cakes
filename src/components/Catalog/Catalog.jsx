import React, { useState } from 'react';
import './styles.css';

const items = {
    cakes: {
        name: 'Торты',
        items: [
            {
                name: 'Тортик',
                price: 1900,
                image: '../../assets/image.png'
            },
            {
                name: 'Тортик',
                price: 1900,
                image: '../../assets/image.png'
            },
            {
                name: 'Тортик',
                price: 1900,
                image: '../../assets/image.png'
            }
        ]
    },
    pancakes: {
        name: 'Пирожные',
        items: [
            {
                name: 'Тортик',
                price: 1900,
                image: '../../assets/image.png'
            },
            {
                name: 'Тортик',
                price: 1900,
                image: '../../assets/image.png'
            },
            {
                name: 'Тортик',
                price: 1900,
                image: '../../assets/image.png'
            }
        ]
    }
}

export const Catalog = () => {
    const [activeTab, setActiveTab] = useState(Object.keys(items)[0]);

    return (
        <div className='catalog'>
            
        </div>
    )

}