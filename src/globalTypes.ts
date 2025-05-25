

export enum STORE_CATEGORY {
  SUSHI = 'SUSHI',
  UNAGI = 'UNAGI',
  TEMPURA = 'TEMPURA',
  TONKATSU = 'TONKATSU',
  YAKITORI = 'YAKITORI',
  SUKIYAKI = 'SUKIYAKI',
  SOBA = 'SOBA',
  RAMEN = 'RAMEN',
  YAKISOBA = 'YAKISOBA',
  OKONOMIYAKI = 'OKONOMIYAKI',
  DONBURI = 'DONBURI',
  ODEN = 'ODEN',
  KAISEKI = 'KAISEKI',
  HAMBAGU = 'HAMBAGU',
  TEPPANYAKI = 'TEPPANYAKI',
  CURRY = 'CURRY',
  YAKINIKU = 'YAKINIKU',
  NABE = 'NABE',
  CAFE = 'CAFE',
  IZAKAYA = 'IZAKAYA',
  OTHER = 'OTHER',
}

export const textByStoreCategory: Record<STORE_CATEGORY, string> = {
  [STORE_CATEGORY.SUSHI]: 'Sushi & Seafood',
  [STORE_CATEGORY.UNAGI]: 'Eel',
  [STORE_CATEGORY.TEMPURA]: 'Tempura',
  [STORE_CATEGORY.TONKATSU]: 'Tonkatsu & Kushikatsu',
  [STORE_CATEGORY.YAKITORI]: 'Yakitori & Skewers',
  [STORE_CATEGORY.SUKIYAKI]: 'Sukiyaki & Shabu-shabu',
  [STORE_CATEGORY.SOBA]: 'Soba & Udon',
  [STORE_CATEGORY.RAMEN]: 'Ramen & Tsukemen',
  [STORE_CATEGORY.YAKISOBA]: 'Yakisoba',
  [STORE_CATEGORY.OKONOMIYAKI]: 'Okonomiyaki & Takoyaki',
  [STORE_CATEGORY.DONBURI]: 'Rice Bowls',
  [STORE_CATEGORY.ODEN]: 'Oden',
  [STORE_CATEGORY.KAISEKI]: 'Kaiseki & Traditional Japanese Cuisine',
  [STORE_CATEGORY.HAMBAGU]: 'Hamburg Steak & Omurice',
  [STORE_CATEGORY.TEPPANYAKI]: 'Steak & Teppanyaki',
  [STORE_CATEGORY.CURRY]: 'Curry',
  [STORE_CATEGORY.YAKINIKU]: 'Yakiniku & Horumon',
  [STORE_CATEGORY.NABE]: 'Hot Pot',
  [STORE_CATEGORY.CAFE]: 'Cafe & Desserts',
  [STORE_CATEGORY.IZAKAYA]: 'Izakaya & Bars',
  [STORE_CATEGORY.OTHER]: 'Other Japanese Foods',
};

export interface ChangeQuantityInterface{
  id: number;
  quantity: number
}

export interface RoutesInterface{
  current: string;
  history: string;
}

interface RatingInterface{
  rate: number;
  count: number;
}

// Old interface (used in UI components like <Item />)
export interface OldItemInterface {
  isFavorite: boolean | undefined;
  id: string;
  category: STORE_CATEGORY;  // Use enum here
  description: string;
  image: string[];
  price: string;
  rating: RatingInterface;
  title: string;
  quantity?: number;
  added?: boolean;
}

// New interface (coming from backend or new API)
export interface NewItemInterface {
  id: string;
  name: string;
  desc: string;
  category: string;
  city: string;
  rating: number;
  ratingCount: number;
  priceRange: string;
  images: string[];
  featuredText: string;
  featuredIcon: string;
  isFavorite: boolean;
  createdAt: string;
  added?: boolean;
  quantity?: number;
  title?: string;
}



// Rename ItemInterface → OldItemInterface
export interface OldItemInterface {
  isFavorite: boolean | undefined;
  id: string;
  category: STORE_CATEGORY;
  description: string;
  image: string[];
  price: string;
  rating: RatingInterface;
  title: string;
  quantity?: number;
  added?: boolean;
  city?: string;
  featuredText?: string;
}

// Your state uses the mapped (old) item format
export interface StateInterface {
  items: Array<OldItemInterface>;
  filteredItems: Array<OldItemInterface>;
  shoppingCart: Array<OldItemInterface>;
  searching: string;
  categories: Array<string>;
  current: string;
  history: string;
  isSearching: boolean;
  filterAt: string;
  totalAmount: number;
  error: boolean;
  loading: boolean;
}


// PageProps uses same StateInterface
export interface PageProps {
  state: StateInterface;
  dispatch?: React.Dispatch<ActionType>;
  ctx?: React.Context<StateInterface>;
}



export interface StateInterface{
  items: Array<OldItemInterface>,
  filteredItems: Array<OldItemInterface>,
  shoppingCart: Array<OldItemInterface>,
  searching: string,
  categories: Array<string>,
  current: string,
  history: string,
  isSearching: boolean,
  filterAt: string,
  totalAmount: number,
  error: boolean,
  loading: boolean
}

export type ActionType = {
  type: string,
  payload?: 
    | OldItemInterface[] 
    | string 
    | number 
    | ChangeQuantityInterface
    | RoutesInterface
    | ToggleFavoritePayload // Added ToggleFavoritePayload
}

export interface PageProps {
  state: StateInterface;
  dispatch?: React.Dispatch<ActionType>;
  ctx?: React.Context<StateInterface>
}




//jules
export interface ToggleFavoritePayload {
  id: number;
  isFavorite: boolean;
}