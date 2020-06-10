export class Order {
	constructor(
    public userId: number,
    public list: OrderList[],
    public date?: Date,
    public orderNum?: number,
    public _id?: String
	) {}
}


export class OrderList {
  name: String
  price: number
  count: number
}
