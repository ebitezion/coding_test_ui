import React, { Fragment, useContext, useRef } from "react";
// images and/or icons
import Logo from "../../Assets/Images/logo3.png";
import Menu from "../../Assets/Icons/menu.png";
import Search from "../../Assets/Icons/search.png";
import ArrowLeft from "../../Assets/Icons/arrow-left.svg";

import { HeaderProps } from "./types";

// components
import { SearchInput } from "../../Components/SearchInput";
import { ButtonSmall } from "../../Components/ButtonSmall";

// constants
import { locationRegex } from "../../constants";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Filter } from "../Filter";
import { Ctx } from "../../Context";

export const Header: React.FC<HeaderProps> = ({ dispatch }): JSX.Element => {
  const navigate: NavigateFunction = useNavigate()
  const state = useContext(Ctx)
  let { current, shoppingCart, history, isSearching, searching } = state

  if(current === "/menu" && history === "/shopping-cart"){
    history = "/"
  }
  
  const searchDesktopRef = useRef<HTMLInputElement>(null)
  const handleSearch = (): void => dispatch({ type: "SEARCH" })
  const handleSearchDesktop = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SEARCHING", payload: e.target.value })
    if(!e.target.value){
      dispatch({ type: "FILTER", payload: "All items" })
    }
  }
  const isMenu: boolean = window.location.pathname === "/menu";
  const isCart: boolean = window.location.pathname === "/shopping-cart";
  const isProduct: boolean = window.location.pathname.includes("products")
  current = current.length > 1 ? current.match(locationRegex)?.join(" ") as string : current

  React.useEffect(() => {
    if(searching && searchDesktopRef.current){
      searchDesktopRef.current.focus()
    } 
  }, [searching])

  const renderMainHeader = (): JSX.Element => {
    if(isSearching){
      return(
        <SearchInput dispatch={dispatch} />
      )
    }else{
      return(
        <React.Fragment>
          {isProduct ? (
            <ButtonSmall
              to={history}
              from={window.location.pathname}
              source={ArrowLeft}
              isCTA={true}
              dispatch={dispatch}
            />
          ) : (
            <button className="Headerx__logo" onClick={() => navigate("/")}>
              
            </button>
          )}

          <nav className="Header__buttons-container">
            {window.location.pathname === "/" && (
              <ButtonSmall source={Search} onclick={handleSearch} />
            )}

            <ButtonSmall
              to="/menu"
              from={window.location.pathname}
              dependencies={shoppingCart.length}
              source={Menu}
              dispatch={dispatch}
            />
          </nav>

          <nav className="Header__desktop">
            {(window.location.pathname === "/") ? (
              <Fragment>
                <div className="Header__search-field">
                  <label htmlFor="search">
                    <img src={Search} alt="" />
                  </label>

                  <input 
                    ref={searchDesktopRef}
                    type="text"
                    id="search"
                    placeholder="Search..."
                    onChange={handleSearchDesktop}
                    defaultValue={searching}
                  />
                </div>
              </Fragment>
            ) : (
              <div className="Header__desktop--filter">
                <Filter
                  dispatch={dispatch}
                  isInHeader={true}
                />
              </div>
            )}

            
          </nav>
        </React.Fragment>
      )
    }
  }

  return (
    <header className="Header">
      {(isMenu || isCart) && window.screen.width < 700 ? (
        <React.Fragment>
          <ButtonSmall
            to={history}
            from={window.location.pathname}
            source={ArrowLeft}
            isCTA={true}
            dispatch={dispatch}
          />

          <h2 className="Header__title">
            {current}
          </h2>
        </React.Fragment>
      ) : (
        renderMainHeader()
      )}
    </header>
  )
}