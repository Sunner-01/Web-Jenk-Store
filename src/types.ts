export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  description: string;
  color: string;
}

export interface CartLine {
  productId: string;
  quantity: number;
}
