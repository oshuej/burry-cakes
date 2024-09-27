import React, { useState, useEffect, useMemo } from 'react';
import './styles.css';
import Header from '../../components/Header/Header';
import { Icon } from '../../components/IconComponent';

const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

const declensedMonths = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

const ordersArray = [
    {
        number: 671248,
        address: 'Доставка',
        date: '14 Jun 2024 06:32:30 GMT',
        pointsSpent: 0,
        pointsReceived: 10,
        cost: 389,
        status: 'received'
    },
    {
        number: 671249,
        address: 'Доставка',
        date: '10 Jun 2024 11:32:30 GMT',
        pointsSpent: 0,
        pointsReceived: 0,
        cost: 389,
        status: 'rejected'
    },
    {
        number: 671240,
        address: 'Доставка',
        date: '1 Jun 2024 16:03:30 GMT',
        pointsSpent: 10,
        pointsReceived: 10,
        cost: 389,
        status: 'received'
    },
    {
        number: 671248,
        address: 'Доставка',
        date: '25 May 2024 06:32:30 GMT',
        pointsSpent: 0,
        pointsReceived: 10,
        cost: 389,
        status: 'received'
    },
    {
        number: 671248,
        address: 'Доставка',
        date: '14 May 2024 06:32:30 GMT',
        pointsSpent: 0,
        pointsReceived: 10,
        cost: 389,
        status: 'received'
    },
    {
        number: 671248,
        address: 'Доставка',
        date: '1 May 2024 06:32:30 GMT',
        pointsSpent: 0,
        pointsReceived: 10,
        cost: 389,
        status: 'received'
    }
];

const OrdersPage = () => {
    const [orders, setOrders] = useState(null)

    const loadOrders = () => {
        const buf = orders || {};
        ordersArray.forEach((el) => {
            const date = new Date(el.date);
            const month = months[date.getMonth()];
            if (buf[month]) buf[month].push(el);
            else buf[month] = [el];
        })
        setOrders(buf);
    }

    const getDateString = (date) => {
        const dateObj = new Date(date);
        const month = declensedMonths[dateObj.getMonth()];
        let minutes = dateObj.getMinutes();
        minutes = minutes < 10 ? `0${minutes}` : `${minutes}`
        return `${dateObj.getDate()} ${month} ${dateObj.getHours()}:${minutes}`;
    }

    const getOrderStatus = (status, cost) => {
        const text = status === 'rejected' ? 'Отменён' : 'Получен';
        const icon = status === 'rejected' ? 'close' : 'plus';
        const className = status === 'rejected' ? 'orders-page__order-status_rejected' : 'orders-page__order-status_recieved';

        return (
            <div className={`orders-page__order-status ${className}`}>
                <span className='status'><Icon name={icon} color='var(--white-color)' size={10} /></span>
                <span className='status__text'>{text}</span>
                <span className='status__cost'>{cost}&nbsp;₽</span>
            </div>
        )
    }

    useEffect(() => {
        if (!orders || !Object.keys(orders).length) {
            loadOrders();
        }
    })

    if (!orders || !Object.keys(orders).length) {
        return <div></div>
    }

    return (
        <div className='orders-page'>
            <Header />
            <h2 className='orders-page__title'>Мои заказы</h2>
            {Object.keys(orders).map((el) => { return (
                <div key={el} className='orders-page__block'>
                    <h3 className='orders-page__block-title'>
                        {el}
                    </h3>
                    {orders[el].map((order) => (
                        <div key={order.number} className='orders-page__order'>
                            <div className='orders-page__order-info'>
                                <span className='orders-page__order-date'>
                                    {getDateString(order.date)}
                                </span>
                                <span className='orders-page__order-id'>№{order.number}</span>
                                {getOrderStatus(order.status, order.cost)}
                                <span className='orders-page__order-address'>{order.address}</span>
                            </div>
                            <div className='orders-page__order-points'>
                                {order.pointsSpent > 0 && 
                                    <span className='orders-page__order-points_spent'>
                                        -{order.pointsSpent}&nbsp;<Icon name='points' color='var(--secondary-color)' size={14} />
                                    </span>
                                }
                                {order.pointsReceived > 0 && 
                                    <span className='orders-page__order-points_received'>
                                        +{order.pointsReceived}&nbsp;<Icon name='points' color='var(--primary-color)' size={14} />
                                    </span>
                                }
                            </div>
                        </div>
                    ))}
                </div>)} ) }
        </div>
    )
}

export default OrdersPage;