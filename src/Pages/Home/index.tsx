import React from "react";
import { Filter } from "../../Containers/Filter";
import { Item } from "../../Components/Item";
import { Skeleton } from "../../Containers/Skeleton";
import { ActionType, PageProps, STORE_CATEGORY, textByStoreCategory, OldItemInterface,NewItemInterface } from "../../globalTypes";

export const Home: React.FC<PageProps> = ({ state, dispatch, ctx }): JSX.Element => {


function mapNewItemToOld(newItem: NewItemInterface): OldItemInterface {
  return {
    id: newItem.id,
    title: newItem.name,
    description: newItem.desc,
    image: newItem.images || [],
    price :newItem.priceRange || "0",
    rating: {
      rate: newItem.rating,
      count: newItem.ratingCount,
    },
    category: newItem.category as STORE_CATEGORY,
    isFavorite: newItem.isFavorite,
    quantity: newItem.quantity,
    added: newItem.added,
    city: newItem.city,
    featuredText: newItem.featuredText,
  };
}
  const renderContent = (): JSX.Element => {
    if (state.filteredItems.length) {
      return (
        <>
          <Filter dispatch={dispatch as React.Dispatch<ActionType>} />
          <section className="Home__items">
            {state.filteredItems.map(newItem => {
              const item = mapNewItemToOld(newItem);
              return (
                <Item
                  key={item.id}
                  id={item.id}
                  name={item.title}
                  category={textByStoreCategory[item.category]}
                  price={item.price}
                  rate={item.rating.rate}
                  image={item.image}
                  dispatch={dispatch as React.Dispatch<ActionType>}
                  added={item.added as boolean}
                  isFavorite={item.isFavorite}   
                  description={item.description}
                  city={item.city}
                  featuredText={item.featuredText}    
                  
                />
              );
            })}
          </section>
        </>
      );
    } else {
      if (state.searching) {
        return (
          <>
            <Filter dispatch={dispatch as React.Dispatch<ActionType>} />
            <span className="Home__no-found">No items found</span>
          </>
        );
      } else {
        return <Skeleton />;
      }
    }
  };

  return (
    <section className="Home">
      {state.error ? (
        <h2>Oops, seems like there was an error. Try later</h2>
      ) : (
        renderContent()
      )}
    </section>
  );
};



