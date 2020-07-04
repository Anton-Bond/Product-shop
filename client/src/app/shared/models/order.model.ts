export class Order {
	constructor(
    public userId: String,
    public list: OrderList[],
    public user?: {
      email: String,
      name: String
    },
    public date?: Date,
    public orderNum?: number,
    public cost?: number,
    public _id?: String
	) {}
}


export class OrderList {
  name: String
  price: number
  count: number
}
