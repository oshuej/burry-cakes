import React, { useEffect, useState, useRef, useCallback } from 'react';
import './styles.css';

import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Accordion, AccordionTab } from 'primereact/accordion';
import Header from "../../../components/Header/Header";

import { useGetExternalListQuery, useLazyGetSyncMenuQuery, useLazyGetMenuItemsQuery } from "../../../services";
import InfiniteScroll from "react-infinite-scroll-component";
import {DishItem} from "../../../components/AdminPanel/CatalogItem/CatalogItem";

const PAGE_SIZE = 20;

function MenuPage() {
    const toast = useRef(null);
    const [items, setItems] = useState([]);
    const [activeMenu, setActiveMenu] = useState(null);
    const [activeCategory, setActiveCategory] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    const { data: menusData, error: menusError, isLoading: menusLoading, refetch } = useGetExternalListQuery();
    const [syncMenu, syncResults ] = useLazyGetSyncMenuQuery();
    const [getMenuItems, menuResults] = useLazyGetMenuItemsQuery();

    const handleSyncMenu = async () => {
        setItems([]);
        setCurrentPage(0);
        syncMenu({ menuId: activeMenu.id, priceCategory: activeCategory.id });
    }

    const handleGetMenuItems = () => {
        getMenuItems({ page: currentPage, size: PAGE_SIZE });
        setCurrentPage(currentPage + 1);
    }

    useEffect(() => {
        handleGetMenuItems();
    }, []);

    useEffect(() => {
        if (syncResults && syncResults.isSuccess) {
            handleGetMenuItems();
        }
    }, [syncResults]);

    useEffect(() => {
        if (menuResults && menuResults.isSuccess && !menuResults.isFetching && menuResults.data && menuResults.data) {
            setItems([...items, ...menuResults.data.content]);
        }
    }, [menuResults]);
    
    if (!menusData || menusLoading || menusError) return (
        <div className="menu-page">
            <Header/>
            <div className="loading">
                <ProgressSpinner/>
            </div>
        </div>
    );

    if (!menusData || menusError) return (
        <div className="menu-page">
            <Header/>
            <div className="loading">
                Что-то пошло не так
            </div>
        </div>
    )

    if (syncResults.isFetching || (menuResults.isFetching && items.length < 1)) return (
        <div className='menu-page'>
            <Header/>
            <Toast ref={toast} position="top-right"/>
            <div className='menu-page__dropdown'>
                <Dropdown
                    value={activeMenu}
                    options={menusData.menus}
                    optionLabel='name'
                    placeholder='Выберите меню'
                    onChange={(event) => setActiveMenu(event.value)}
                    className='menu-page__dropdown-item'
                />
                <Dropdown
                    value={activeCategory}
                    options={menusData.priceCategories}
                    optionLabel='name'
                    placeholder='Выберите категорию'
                    onChange={(event) => setActiveCategory(event.value)}
                    className='menu-page__dropdown-item'
                />
                <Button label='Синхронизировать' disabled onClick={handleSyncMenu}/>
                <div className="loading">
                    <ProgressSpinner/>
                </div>
            </div>
        </div>
    )

    return (
        <div className='menu-page'>
        <Header/>
            <Toast ref={toast} position="top-right"/>
            <div className='menu-page__dropdown'>
                <Accordion className='w-full'>
                    <AccordionTab header='Синхронизация меню'>
                        <Dropdown
                            value={activeMenu}
                            options={menusData.menus}
                            optionLabel='name'
                            placeholder='Выберите меню'
                            onChange={(event) => setActiveMenu(event.value)}
                            className='mt-2 w-full'
                        />
                        <Dropdown
                            value={activeCategory}
                            options={menusData.priceCategories}
                            optionLabel='name'
                            placeholder='Выберите категорию'
                            onChange={(event) => setActiveCategory(event.value)}
                            className='mt-2 w-full'
                        />
                        <Button
                            label='Синхронизировать'
                            disabled={!activeMenu || !activeCategory}
                            onClick={handleSyncMenu}
                            className='mt-2'
                        />
                    </AccordionTab>
                </Accordion>
                <InfiniteScroll
                    dataLength={items.length}
                    next={handleGetMenuItems}
                    hasMore={items.length < (menuResults.data?.totalElements ?? 0)}
                >
                    <div className='menu-page__catalog'>
                        {items.map((item, index) => (
                            <DishItem id={item.id} name={item.name} price={item.price} imageUrl={item.imageUrl}
                                      key={index}/>
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    );
}

export default MenuPage;