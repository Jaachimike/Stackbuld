// app/types.ts
export enum Category {
  Clothes = "clothes",
  Shoes = "shoes",
  Accessories = "accessories",
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  description: string;
}
