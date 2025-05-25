

import { useParams } from "react-router-dom"
import { ButtonCTA } from "../../Components/ButtonCTA"
import { Rating } from "../../Components/Rating"
import { STORE_CATEGORY, NewItemInterface, PageProps, OldItemInterface } from "../../globalTypes"

function mapNewToOld(item: NewItemInterface): OldItemInterface {
  return {
    id: item.id,
    title: item.name,
    description: item.desc,
    image: item.images|| "/fallback.jpg",
    price: parseInt(item.priceRange.replace(/[^0-9]/g, ""), 10) || 10,
    category: STORE_CATEGORY[item.category as keyof typeof STORE_CATEGORY] ?? STORE_CATEGORY.OTHER,
    rating: {
      rate: item.rating,
      count: item.ratingCount,
    },
    isFavorite: item.isFavorite,
    added: item.added,
    quantity: item.quantity ?? 1,
  };
}

export const Product: React.FC<PageProps> = ({ state, dispatch }): JSX.Element => {
  const { title } = useParams()
  const { items } = state

  // If items are NewItemInterface[], map them first
  const mappedItems: OldItemInterface[] = items.map(item => {
    // Check if already mapped (has 'title' and 'description' fields)
    if ('title' in item && 'description' in item) {
      return item as OldItemInterface;
    } else {
      return mapNewToOld(item as NewItemInterface);
    }
  });

  const item = mappedItems.find(index => index.title.trim() === title?.trim());

  if (!item) return <p>Item not found.</p>;

  return (
    <section className="Detail">
      <article className="Detail__thumbnail">
        <img src={item.image[0]} alt={item.title} />
      </article>

      <article className="Detail__info">
        <div className="Detail__info--header">
          <h2>{item.title}</h2>
          <ButtonCTA
            ItemId={item.id}
            dispatch={dispatch}
            added={item.added}
          />
        </div>

        <div className="Detail__info--meta">
          <span className="Detail__price">${item.price}</span>
          <Rating content={item.rating.rate} />
        </div>

        <p className="Detail__info--description">
          {item.description}
        </p>
      </article>
    </section>
  );
}
