import {
  StateInterface,
  ActionType,
  OldItemInterface,
  ChangeQuantityInterface,
  RoutesInterface
} from "./globalTypes";

export const initialState = (): StateInterface => ({
  items: [],
  filteredItems: [],
  shoppingCart: [],
  categories: ["All items"],
  current: "/",
  history: "",
  searching: "",
  isSearching: false,
  filterAt: "All items",
  totalAmount: 0,
  error: false,
  loading: true
});

export function reducer(state: StateInterface, action: ActionType): StateInterface {
  const { type, payload } = action;
  let index: number;
  let newShoppingCart: OldItemInterface[];
  let newItem: OldItemInterface;

  const getIndex = () => state.items.findIndex(item => item.id === payload);

  switch (type) {
    case "RESET":
      return {
        ...state,
        shoppingCart: []
      };

    case "AMOUNT":
      return {
        ...state,
        totalAmount: payload as number
      };

 

    case "SEARCH": {
      return {
        ...state,
        isSearching: !state.isSearching
      };
    }

    case "MOVING": {
      return {
        ...state,
        current: (payload as RoutesInterface).current,
        history: (payload as RoutesInterface).history
      };
    }

    case "REMOVE": {
      index = getIndex();
      newShoppingCart = state.shoppingCart.filter(product => product.id !== payload);
      if (index >= 0) state.items[index].added = false;
      return {
        ...state,
        shoppingCart: newShoppingCart
      };
    }

    case "ADD_TO_CART": {
      index = getIndex();
      if (index >= 0) {
        newItem = { ...state.items[index], quantity: 1 };
        newShoppingCart = [...state.shoppingCart, newItem];
        state.items[index].added = true;
      } else {
        newShoppingCart = state.shoppingCart;
      }
      return {
        ...state,
        shoppingCart: newShoppingCart
      };
    }
      case "SEARCHING": {
        const searchTerm = payload as string;
        const lowerSearch = (searchTerm || "").toLowerCase();
        console.log("SEARCHING: searchTerm:", searchTerm, "lowerSearch:", lowerSearch);
        const baseItems = state.filterAt === "All items" ? state.items : state.items.filter(item => item.category === state.filterAt);
        console.log("SEARCHING: filterAt:", state.filterAt, "baseItems length:", baseItems.length);
        const filteredItems = searchTerm
          ? baseItems.filter(item => {
              // Use type assertion to access NewItemInterface properties
              const name = (item as any).name || item.title || "";
              const desc = (item as any).desc || item.description || "";
              const titleMatch = name.toLowerCase().includes(lowerSearch);
              const descMatch = desc.toLowerCase().includes(lowerSearch);
              console.log("SEARCHING: item:", name, "titleMatch:", titleMatch, "descMatch:", descMatch);
              return titleMatch || descMatch;
            })
          : baseItems;
        console.log("SEARCHING: filteredItems length:", filteredItems.length);
        return {
          ...state,
          searching: searchTerm || "",
          filteredItems
        };
      }

      case "FILTER": {
      state.filteredItems = payload === "All items" ? state.items : state.items.filter(item => item.category === payload)
      return{ ...state, filterAt: payload as string }
      }
    
    case "ADD_INITIAL_ITEMS": {
      const incomingItems = payload as OldItemInterface[];
      const newCategories = new Set(state.categories);
      incomingItems.forEach(product => newCategories.add(product.category));
      return {
        ...state,
        items: incomingItems,
        filteredItems: incomingItems,
        categories: Array.from(newCategories),
        loading: false
      };
    }

    case "ERROR": {
      return {
        ...state,
        error: true,
        loading: false
      };
    }

    default:
      return { ...state };
  }
}