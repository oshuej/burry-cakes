import React from 'react';
import './styles.css';
import Header from '../../components/Header/Header';

const user = {
    image: 'https://www.spandidos-publications.com/resources/images/person-grey.png',
    name: 'Изя Рабинович',
    phone: '79999999999',
    birthdate: '24-11-1998',
    email: 'test_user@mail.ru'
}

const ProfilePage = () => {
    return (
        <div className='profile-page'>
            <Header />
            <div className='profile-page__photo-container'>
                <img src={user.image} alt='user' className='profile-page__photo' />
            </div>
            <div className='profile-page__info'>
                <label className='profile-page__info-label' htmlFor='name'>Имя</label>
                <input className='profile-page__info-input' id='name' value={user.name} />
                <label className='profile-page__info-label' htmlFor='phone'>Телефон</label>
                <input className='profile-page__info-input' id='phone' value={user.phone} />
                <label className='profile-page__info-label' htmlFor='birth'>Дата рождения</label>
                <input className='profile-page__info-input' id='birth' value={user.birthdate} />
                <label className='profile-page__info-label' htmlFor='email'>Почта</label>
                <input className='profile-page__info-input' id='email' value={user.email} />
                <p className='profile-page__info-caption'>На указанную почту будут приходить чеки</p>
            </div>
        </div>
    )
}

export default ProfilePage;