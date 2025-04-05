import React, { useEffect, useState } from 'react';
import './styles.css';
import SpecialItems from '../../../components/SpecialItems/SpecialItems.jsx'
import Header from '../../../components/Header/Header.jsx';
import { Tabs } from '../../../components/Tabs/Tabs.jsx';
import { CatalogItem } from '../../../components/CatalogItem/CatalogItem.jsx';
import { useLazyGetCatalogItemsQuery } from "../../../services";
import {ProgressSpinner} from "primereact/progressspinner";
import InfiniteScroll from "react-infinite-scroll-component";

const PAGE_SIZE = 20;

const specials = [
    {
        header: 'Тест',
        description: 'Тест',
        color: 'light',
        image: 'https://i.pinimg.com/originals/ff/a9/90/ffa99080101f18d0e04574641ce820da.jpg'
    },
    {
        header: 'Тест',
        description: 'Тест',
        color: 'light',
        image: 'https://i.pinimg.com/originals/ff/a9/90/ffa99080101f18d0e04574641ce820da.jpg'
    },
    {
        header: 'Тест',
        description: 'Тест',
        color: 'light',
        image: 'https://i.pinimg.com/originals/ff/a9/90/ffa99080101f18d0e04574641ce820da.jpg'
    },
    {
        header: 'Тест',
        description: 'Тест',
        color: 'light',
        image: 'https://i.pinimg.com/originals/ff/a9/90/ffa99080101f18d0e04574641ce820da.jpg'
    },
    {
        header: 'Тест',
        description: 'Тест',
        color: 'light',
        image: 'https://i.pinimg.com/originals/ff/a9/90/ffa99080101f18d0e04574641ce820da.jpg'
    }
];

function CatalogPage() {
  const [items, setItems] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [page, setPage] = useState(0);
  const [getItems, results] = useLazyGetCatalogItemsQuery()

  const [catalogItems, setCatalogItems] = useState({});

  useEffect(() => {
    getItems({
        page,
        size: PAGE_SIZE,
    })
  }, [])

  useEffect(() => {
      if (results.isSuccess) {
          setItems((prevState) => ([...prevState, ...results.data.content]));
      }
  }, [results])

    const handleGetMenuItems = () => {
        getItems({ page, size: PAGE_SIZE });
        setPage(page + 1);
    }

  if (!results || results.isLoading) {
      return (
          <div className="catalog-page">
              <Header/>
              <div className="loading">
                  <ProgressSpinner/>
              </div>
          </div>
      )
  }
  
  return (
      <div className='catalog-page'>
        <Header />
        <SpecialItems items={specials} />
        <Tabs tabs={Object.keys(catalogItems).map((el) => ({ name: catalogItems[el].name || el, key: el}))} activeTab={activeTab} setActiveTab={setActiveTab} />
          <InfiniteScroll
              dataLength={items.length}
              next={handleGetMenuItems}
              hasMore={items.length < (results.data?.totalElements ?? 0)}
          >
              <div className='catalog'>
                  {items.map((item, index) => (
                      <CatalogItem id={item.id} name={item.name} price={item.price} imageUrl={item.imageUrl}
                                   key={index}/>
                  ))}
              </div>
          </InfiniteScroll>
      </div>
  );
}

export default CatalogPage;
