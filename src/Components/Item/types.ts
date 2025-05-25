import React from "react";
import { ActionType } from "../../globalTypes";


export interface ItemProps {
  id: string;
  name: string;
  category: string;
  price: string;
  rate: number;
  image: string | string[];
  dispatch: React.Dispatch<ActionType>;
  added: boolean;
  isFavorite?: boolean; // Optional, defaults to false
  description: string; 
  city?: string;
  featuredText?: string;
  
}
