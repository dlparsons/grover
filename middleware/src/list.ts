import { ProductListItemModel } from "./db";
import { List, Product, Merchant } from "./generated/graphql";

export async function listResolver({
  list,
}: {
  list?: List;
}): Promise<List | null> {
  if (!!list) {
    const product = await ProductListItemModel.findByPk(parseInt(list.id));
    if (!product) return null;
    //return {
      //name: product.name,
      //price: product.price,
      //merchant : merchant.name,
    //};
  }
}
