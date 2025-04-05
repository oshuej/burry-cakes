import React, { ChangeEvent, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { FloatLabel } from "primereact/floatlabel";
import { FileUploadUploadEvent } from 'primereact/fileupload';
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from 'primereact/toast';
import FileLoader from "../../../components/FileLoader/FileLoader";

import Header from '../../../components/Header/Header.jsx'
import { useGetDetailedMenuItemQuery, useUpdateItemInfoMutation } from '../../../services';
import { type Dish } from '../../../services/types';
import './styles.css';

import placeholder from '../../../assets/images/image_placeholder.webp';
import {Button} from "primereact/button";

const MenuDetailedPage = () => {
    const params = useParams<{ id: string }>();
    const toast = useRef<Toast>(null);
    const [item, setItem] = useState<Dish | null>(null);

    const { data, error, isLoading } = useGetDetailedMenuItemQuery(params.id ?? '')
    const [updateItem, itemUpdateResults] = useUpdateItemInfoMutation();

    useEffect(() => {
        if (data) {
            setItem(data);
        }
    }, [data]);

    useEffect(() => {
        if (itemUpdateResults.isSuccess && itemUpdateResults.data) {
            toast.current?.show({ severity: 'success', summary: 'Элемент меню успешно обновлен' });
        }
    }, [itemUpdateResults]);

    if (isLoading) {
        return (
            <div className="catalog-item-page">
                <Header backLink={'/admin/catalog'} backText={'Каталог'} />
                <div className="loading">
                    <ProgressSpinner/>
                </div>
            </div>
        )
    }

    const handleUpload = (e: FileUploadUploadEvent) => {
        if (item) {
            setItem((prevState) => ({
                ...prevState,
                id: prevState?.id ?? '',
                name: prevState?.name ?? '',
                price: prevState?.price ?? 10,
                imageUrl: e.xhr.responseText,
                dishComposition: prevState?.dishComposition ?? null,
                categoryId: prevState?.categoryId ?? null,
            }))
        }
    }

    const handleFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let { id, value } = event.target;

        setItem((prevState) => ({
            ...prevState,
            id: prevState?.id ?? '',
            name: prevState?.name ?? '',
            price: prevState?.price ?? 10,
            dishComposition: prevState?.dishComposition ?? null,
            categoryId: prevState?.categoryId ?? null,
            imageUrl: prevState?.imageUrl ?? '',
            [id]: value,
        }))
    }

    const handleItemUpdate = () => {
        updateItem({
            id: item?.id ?? '',
            name: item?.name ?? '',
            price: typeof item?.price === 'string' ? parseInt(item.price, 10) : item?.price,
            dishComposition: item?.dishComposition ?? null,
            categoryId: item?.categoryId ?? null,
            imageUrl: item?.imageUrl ?? '',
        })
    }

    if (item) {
        return (
            <div className='catalog-item-page'>
                <Toast ref={toast}></Toast>
                <Header backLink={'/admin/catalog'} backText={'Каталог'} />
                {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} className='catalog-item-page__image'/>
                ) : (
                    <img src={placeholder} alt={item.name} className='catalog-item-page__image'/>
                )}
                <FileLoader
                    name='dishImage'
                    accept='image/*'
                    url={`https://burrycakes.ru/api/v1/mini-app/admin/panel/dish/${params.id}/upload-image`}
                    onUpload={handleUpload}
                    maxFileSize={10000000}
                />
                <div className='catalog-item-page__info'>
                    <FloatLabel className='mt-5 w-full'>
                        <InputText
                            id='name'
                            value={item.name}
                            className='w-full'
                            onChange={handleFieldChange}
                        />
                        <label htmlFor='name'>Название</label>
                    </FloatLabel>
                    <FloatLabel className='mt-5 w-full'>
                        <InputText
                            id='price'
                            value={item.price.toString()}
                            keyfilter='int'
                            className='w-full'
                            onChange={handleFieldChange}
                        />
                        <label htmlFor='price'>Цена</label>
                    </FloatLabel>
                    {/*<span className='catalog-item-page__info-weight'>{item.structure.weight}&nbsp;гр</span>*/}
                    <FloatLabel className='mt-5 w-full'>
                        <InputTextarea
                            id='description'
                            value={item.description}
                            className='w-full'
                            onChange={handleFieldChange}
                        />
                        <label htmlFor='description'>Описание</label>
                    </FloatLabel>
                    <Button label='Сохранить' onClick={handleItemUpdate}/>
                    {/*<div className='item-structure'>*/}
                    {/*    <div className='item-structure__column'>*/}
                    {/*        <span className='item-structure__column-value'>{item.structure.calories}</span>*/}
                    {/*        <span className='item-structure__column-name'>ккал</span>*/}
                    {/*    </div>*/}
                    {/*    <div className='item-structure__column'>*/}
                    {/*        <span className='item-structure__column-value'>{item.structure.proteins}</span>*/}
                    {/*        <span className='item-structure__column-name'>белки</span>*/}
                    {/*    </div>*/}
                    {/*    <div className='item-structure__column'>*/}
                    {/*        <span className='item-structure__column-value'>{item.structure.fats}</span>*/}
                    {/*        <span className='item-structure__column-name'>жиры</span>*/}
                    {/*    </div>*/}
                    {/*    <div className='item-structure__column'>*/}
                    {/*        <span className='item-structure__column-value'>{item.structure.carbohydrates}</span>*/}
                    {/*        <span className='item-structure__column-name'>углеводы</span>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<p className='catalog-item-page__info-structure'>{item.structure.text}</p>*/}
                </div>
            </div>
        )
    }

    return (
        <div></div>
    );
}

export default MenuDetailedPage;