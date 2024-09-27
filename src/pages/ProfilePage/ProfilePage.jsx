import React from 'react';
import './styles.css';

const user = {
    image: 'https://yt3.ggpht.com/a/AGF-l7_Go0w7dcX0ubcFVDoLL0r9B3Q2n-pYzOG2Lw=s900-c-k-c0xffffffff-no-rj-mo',
    name: 'Изя Рабинович',
    phone: '79999999999',
    birthdate: '24-11-1998',
    email: 'test_user@mail.ru'
}

const Profile = () => {
    return (
        <div className='profile-page'>
            <div className='profile-page__photo-container'>
                <div className='profile-page__photo'>
                    <img src={user.image} alt='user' />
                </div>
            </div>
            <div className='profile-page__info'>
                <div className='profile-page__info-block'>
                    
                </div>
            </div>
        </div>
    )
}