export class Cart {
	constructor(
    public count: number,
    public productId: {
      prodCode: String,
      name: String,
      price: number,
      _id?: String
    },
    public _id?: String
	) {}
}
