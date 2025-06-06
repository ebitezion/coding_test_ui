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

function App(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState());

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch('https://codingtest.cohi.xyz/api/trpc/restaurant.getRestaurants');
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
