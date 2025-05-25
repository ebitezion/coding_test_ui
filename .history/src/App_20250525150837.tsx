import React, { useEffect, useReducer } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {  STORE_CATEGORY, OldItemInterface,NewItemInterface } from "./globalTypes";
import { Layout } from './Layout';
import { Home } from './Pages/Home';
import { Menu } from './Pages/Menu';
import { Product } from './Pages/Product';


import { Ctx } from './Context';
import { initialState, reducer } from './globalState';
import { StateInterface } from './globalTypes';

import './App.scss';

function mapNewItemToOld(newItem: NewItemInterface): OldItemInterface {
  console.log("Mapping item:", newItem);
  return {
    id: newItem.id,
    title: newItem.name,
    description: newItem.desc,
    image: newItem.images || [],
    price: parseFloat(newItem.priceRange.replace(/[^0-9.]/g, '')) || 0,
    rating: {
      rate: newItem.rating,
      count: newItem.ratingCount,
    },
    category: newItem.category as STORE_CATEGORY,
    isFavorite: newItem.isFavorite,
    quantity: newItem.quantity,
    added: newItem.added,
  };
}
function App(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState());

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch('http://localhost:3000/api/trpc/restaurant.getRestaurants');
          const json = await res.json();
          const data = json.result?.data || [];
          dispatch({ type: 'ADD_INITIAL_ITEMS', payload: data });
        } catch (err) {
          dispatch({ type: 'ERROR' });
        }
      };
      fetchData();
    }, []);

  return (
    <Ctx.Provider value={state}>
      <section className="App">
        <BrowserRouter>
          <Layout dispatch={dispatch}>
            <Routes>
              <Route path="/" element={<Home state={state} dispatch={dispatch} ctx={Ctx} />} />
              <Route path="/menu" element={<Menu state={state} dispatch={dispatch} />} />
              <Route path="/products/:title" element={<Product state={state} dispatch={dispatch} />} />
            
            </Routes>
          </Layout>
        </BrowserRouter>
      </section>
    </Ctx.Provider>
  );
}

export default App;
