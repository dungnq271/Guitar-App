export interface Order {
  id: number;
  userId: number;
  productId: number;
  orderTime: Date;
  quantity: number;
  discount: number;
}
