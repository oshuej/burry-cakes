import React, { useMemo } from 'react';
import './styles.css';
import Header from '../../../components/Header/Header';
import { Icon } from '../../../components/IconComponent';

const order = {
    number: 671248,
    date: '1 May 2024 06:32:30 GMT',
    pointsSpent: 100,
    pointsReceived: 10,
    status: 'received',
    items: [
        {
            name: 'Торт слоёная карамель',
            cost: 1990,
            id: 1,
            amount: 1,
            image: 'https://avatars.mds.yandex.net/i?id=3f64e4e2e10e7940a268a982415f2c4a_l-4592776-images-thumbs&n=13'
        },
        {
            name: 'Бенто-торт ореховый',
            cost: 1990,
            id: 2,
            amount: 2,
            image: 'https://i.pinimg.com/736x/41/cf/01/41cf01a5b56986bdbad1a51858f32191.jpg'
        }
    ]
};

const declensedMonths = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

const OrdersItemPage = () => {

    const getDateString = (date) => {
        const dateObj = new Date(date);
        const month = declensedMonths[dateObj.getMonth()];
        let minutes = dateObj.getMinutes();
        minutes = minutes < 10 ? `0${minutes}` : `${minutes}`
        return `${dateObj.getDate()} ${month} ${dateObj.getHours()}:${minutes}`;
    }

    const getOrderStatus = (status) => {
        const text = status === 'rejected' ? 'Отменён' : 'Получен';
        const icon = status === 'rejected' ? 'close' : 'plus';
        const className = status === 'rejected' ? 'order-item-page__order-status_rejected' : 'order-item-page__order-status_recieved';

        return (
            <div className={`order-item-page__order-status ${className}`}>
                <span className='status'><Icon name={icon} color='var(--white-color)' size={10} /></span>
                <span className='status__text'>{text}</span>
            </div>
        )
    }

    const orderCost = useMemo(() => {
        return order.items.reduce((acc, el) => acc + (el.cost * el.amount), 0);
    }, [])

    return (
        <div className='order-item-page'>
            <Header backLink={'/orders'} backText={'Заказы'}/>
            <div className='order-item-page__order-info'>
                <span className='order-item-page__order-id'>№{order.number}</span>
                {getOrderStatus(order.status)}
                <span className='order-item-page__order-date'>
                    {getDateString(order.date)}
                </span>
            </div>
            <h3 className='order-item-page__order'>В заказе</h3>
            <div>
            {order.items.map((el) => {
                return (
                    <div className='order-item-page__order-item'>
                        <img src={el.image} alt={el.name} />
                        <div className='order-item-page__order-item-info'>
                            <h4>{el.name}</h4>
                            <span>{el.amount}&nbsp;шт</span>
                        </div>
                        <span className='order-item-page__order-item-cost'>
                            {el.cost}&nbsp;₽
                        </span>
                    </div>
                )
            })}
            </div>
            <div className='order-item-page__pattern' />
            <div className='order-item-page__summary'>
                <h3 className='order-item-page__summary-text'>Сумма заказа</h3>
                <div className='order-item-page__summary-row'>
                    <span className='order-item-page__summary-row-left'>Общая сумма</span>
                    <span className='order-item-page__summary-row-right'>{orderCost}&nbsp;₽</span>
                </div>
                {order.pointsSpent > 0 && (
                    <div className='order-item-page__summary-row'>
                    <span className='order-item-page__summary-row-left'>Списано баллов</span>
                    <span className='order-item-page__summary-row-right order-item-page__summary-row-right_spent'>-{order.pointsSpent}&nbsp;<Icon name='points' color='var(--secondary-color)' size={14} /></span>
                </div>)}
                {order.pointsReceived > 0 && (
                    <div className='order-item-page__summary-row'>
                    <span className='order-item-page__summary-row-left'>Начислено баллов</span>
                    <span className='order-item-page__summary-row-right order-item-page__summary-row-right_received'>+{order.pointsReceived}<Icon name='points' color='var(--primary-color)' size={14} /></span>
                </div>
                )}
                <div className='order-item-page__summary-row'>
                    <span className='order-item-page__summary-row-left order-item-page__summary-row-left_total'>Итого:</span>
                    <span className='order-item-page__summary-row-right order-item-page__summary-row-right_total'>{orderCost - order.pointsSpent}&nbsp;₽</span>
                </div>
            </div>
            <div className='order-item-page__repeat'>
                <button className='order-item-page__repeat-button'>Повторить заказ</button>
            </div>
        </div>
    )
}

export default OrdersItemPage;