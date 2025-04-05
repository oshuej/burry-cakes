import React, { useState, useContext } from 'react';
import { InputSwitch } from 'primereact/inputswitch';

import './styles.css';
import burger from '../../assets/images/burger.svg';
import logo from '../../assets/images/Logo.png';
import close from '../../assets/images/close.svg';
import { Icon } from '../IconComponent';
import { Link } from 'react-router-dom';
import { AdminContext } from '../../services/AdminContext';

const Header = ({ backLink, backText }) => {
    const [open, setOpen] = useState(false);
    const { isAdmin, toggleAdmin } = useContext(AdminContext);

    return (
        <header className='header'>
            {(!backLink && !backText) ? (<button className='header__menu' onClick={() => setOpen(true)}>
                <img alt='burger' src={burger} />
            </button>) : (<Link to={backLink} className='header__backlink'>
                <Icon name='Chevron' />
                <span>{backText}</span>
            </Link>) }
            <div className='header__image-container'>
                <img src={logo} alt='burry' />
            </div>
            <div className='header__points'>
                <span>999</span>
                <Icon name='points' color='var(--white-color)' size={12} />
            </div>
            {open && !isAdmin && (
                <div className='sidebar-container'>
                    <div className='sidebar'>
                        <button className='sidebar__close' onClick={() => setOpen(false)}>
                            <img src={close} alt='close' />
                        </button>
                        <div className='sidebar__menu'>
                            <Link className='sidebar__menu-item' to='/catalog'>
                                <Icon name='coffee' color='var(--grey-dark)' />
                                <span>Ассортимент</span>
                            </Link>
                            <Link className='sidebar__menu-item' to='/profile'>
                                <Icon name='user' color='var(--grey-dark)' />
                                <span>Профиль</span>
                            </Link>
                            <Link className='sidebar__menu-item' to='/orders'>
                                <Icon name='bag' color='var(--grey-dark)' />
                                <span>Мои заказы</span>
                            </Link>
                            <Link className='sidebar__menu-item' to='/bonuses'>
                                <Icon name='coin' color='var(--grey-dark)' />
                                <span>Бонусы</span>
                            </Link>
                        </div>
                        <div className='sidebar__switch'>
                            <label htmlFor="isAdmin">Панель администратора</label>
                            <InputSwitch
                                inputId="isAdmin"
                                checked={isAdmin}
                                onChange={toggleAdmin}
                            />
                        </div>
                        <div className='sidebar__footer'>
                        <div className='sidebar__footer-social'>
                                <a href='https://vk.com'>
                                    <Icon name='vk' color='var(--grey-dark)' />
                                </a>
                            <a href='https://instagram.com'>
                                <Icon name='inst' color='var(--grey-dark)' />
                            </a>
                        </div>
                        <div className='sidebar__footer-address'>
                        Фарфоровская&nbsp;ул.,&nbsp;7,&nbsp;корп.2,<br />
                        Санкт-Петербург
                        </div>
                    </div>
                </div>
            </div>)}
            {open && isAdmin && (
                <div className='sidebar-container'>
                    <div className='sidebar'>
                        <button className='sidebar__close' onClick={() => setOpen(false)}>
                            <img src={close} alt='close'/>
                        </button>
                        <div className='sidebar__menu'>
                            <Link className='sidebar__menu-item' to='/admin/catalog'>
                                <Icon name='coffee' color='var(--grey-dark)'/>
                                <span>Ассортимент</span>
                            </Link>
                            <Link className='sidebar__menu-item' to='/admin/specials'>
                                <Icon name='user' color='var(--grey-dark)'/>
                                <span>Акции</span>
                            </Link>
                            <Link className='sidebar__menu-item' to='/admin/categories'>
                                <Icon name='bag' color='var(--grey-dark)'/>
                                <span>Категории</span>
                            </Link>
                        </div>
                        <div className='sidebar__switch'>
                            <label htmlFor="isAdmin">Панель администратора</label>
                            <InputSwitch
                                inputId="isAdmin"
                                checked={isAdmin}
                                onChange={toggleAdmin}
                            />
                        </div>
                        <div className='sidebar__footer'>
                            <div className='sidebar__footer-social'>
                                <a href='https://vk.com'>
                                    <Icon name='vk' color='var(--grey-dark)'/>
                                </a>
                                <a href='https://instagram.com'>
                                    <Icon name='inst' color='var(--grey-dark)'/>
                                </a>
                            </div>
                            <div className='sidebar__footer-address'>
                                Фарфоровская&nbsp;ул.,&nbsp;7,&nbsp;корп.2,<br/>
                                Санкт-Петербург
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header;