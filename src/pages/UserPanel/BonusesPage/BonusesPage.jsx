import React, { useState, useEffect } from 'react';
import './styles.css';
import Header from '../../../components/Header/Header';
import { Icon } from '../../../components/IconComponent';
import { Tabs } from '../../../components/Tabs/Tabs.jsx';
import QR from '../../../assets/images/QR.png';

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

const BonusesPage = () => {
    const [orders, setOrders] = useState(null)

    const [activeTab, setActiveTab] = useState('all');

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

    useEffect(() => {
        if (!orders || !Object.keys(orders).length) {
            loadOrders();
        }
    })

    if (!orders || !Object.keys(orders).length) {
        return <div></div>
    }

    const tabs = [
        {
            key: 'all',
            name: 'Все'
        },
        {
            key: 'spent',
            name: 'Списания',
        },
        {
            key: 'received',
            name: 'Начисления'
        }
    ]

    return (
        <div className='bonuses-page'>
            <Header />
            <div className='bonuses-page__pattern' />
            <div className='bonuses-page__qr'>
                <img src={QR} alt='qr' />
                <p>Для списания и начисления бонусов,<br />
                отсканируйте qr-код на кассе</p>
            </div>
            <h2 className='bonuses-page__history'>История</h2>
            <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            {Object.keys(orders).map((el) => { return (
                <div key={el} className='bonuses-page__block'>
                    <h3 className='bonuses-page__block-title'>
                        {el}
                    </h3>
                    {orders[el].map((order) => (
                        <div key={order.number} className='bonuses-page__order'>
                            <div className='bonuses-page__order-info'>
                                <div>
                                    <span className='bonuses-page__order-id'>№{order.number}</span>
                                    <span className='bonuses-page__cost'>{order.cost}&nbsp;₽</span>
                                </div>
                                <span className='bonuses-page__order-date'>
                                    {getDateString(order.date)}
                                </span>
                            </div>
                            <div className='bonuses-page__order-points'>
                                {order.pointsSpent > 0 && 
                                    <span className='bonuses-page__order-points_spent'>
                                        -{order.pointsSpent}&nbsp;<Icon name='points' color='var(--secondary-color)' size={14} />
                                    </span>
                                }
                                {order.pointsReceived > 0 && 
                                    <span className='bonuses-page__order-points_received'>
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

export default BonusesPage;