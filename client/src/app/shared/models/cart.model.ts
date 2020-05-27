export class Cart {
	constructor(
    public count: number,
    public productId: {
      prodCode: String,
      name: String,
      price: number
    },
    public _id?: String
	) {}
}
