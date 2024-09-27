import React, { useEffect, useState } from 'react';
import './styles.css';
import Header from '../../components/Header/Header';

const CatalogItemPage = () => {
    const item = {
        image: 'https://i.pinimg.com/736x/41/cf/01/41cf01a5b56986bdbad1a51858f32191.jpg',
        name: 'Муссовое пирожное',
        description: 'Состав: Заварное тесто (мука пшеничная, яйцо куриное, масло сливочное, молоко, сахар, соль, сахарная пудра), крем (сыр творожный, сливки, сахарная помадка, кукурузный крахмал), глассаж карамель (сахарная помадка, желатин), декор (попкорн). Пищевая ценность указана на 100 грамм продуктаСостав: Заварное тесто (мука пшеничная, яйцо куриное, масло сливочное, молоко, сахар, соль, сахарная пудра), крем (сыр творожный, сливки, сахарная помадка, кукурузный крахмал), глассаж карамель (сахарная помадка, желатин), декор (попкорн). Пищевая ценность указана на 100 грамм продукта',
        price: 2000,
        structure: {
            text: 'Состав: Заварное тесто (мука пшеничная, яйцо куриное, масло сливочное, молоко, сахар, соль, сахарная пудра), крем (сыр творожный, сливки, сахарная помадка, кукурузный крахмал), глассаж карамель (сахарная помадка, желатин), декор (попкорн). Пищевая ценность указана на 100 грамм продукта',
            fats: 10,
            proteins: 6,
            calories: 247,
            carbohydrates: 47,
            weight: 200
        }
    };

    return (
        <div className='catalog-item-page'>
            <Header backLink={'/catalog'} backText={'Каталог'} />
            <img src={item.image} alt={item.name} className='catalog-item-page__image'/>
            <div className='catalog-item-page__info'>
                <h2 className='catalog-item-page__info-name'>{item.name}</h2>
                <span className='catalog-item-page__info-weight'>{item.structure.weight}&nbsp;гр</span>
                <p className='catalog-item-page__info-description'>{item.description}</p>
                <div className='item-structure'>
                    <div className='item-structure__column'>
                        <span className='item-structure__column-value'>{item.structure.calories}</span>
                        <span className='item-structure__column-name'>ккал</span>
                    </div>
                    <div className='item-structure__column'>
                        <span className='item-structure__column-value'>{item.structure.proteins}</span>
                        <span className='item-structure__column-name'>белки</span>
                    </div>
                    <div className='item-structure__column'>
                        <span className='item-structure__column-value'>{item.structure.fats}</span>
                        <span className='item-structure__column-name'>жиры</span>
                    </div>
                    <div className='item-structure__column'>
                        <span className='item-structure__column-value'>{item.structure.carbohydrates}</span>
                        <span className='item-structure__column-name'>углеводы</span>
                    </div>
                </div>
                <p className='catalog-item-page__info-structure'>{item.structure.text}</p>
            </div>
            <button className='catalog-item-page__add'>
                <span className='catalog-item-page__add-text'>Добавить в корзину</span>
                <span className='catalog-item-page__add-price'>{item.price}&nbsp;₽</span>
            </button>
        </div>
    );
}

export default CatalogItemPage;