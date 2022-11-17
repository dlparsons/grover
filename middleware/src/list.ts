import { GraphQLError } from "graphql";
import { ProductListModel } from "./db";
import {
  List,
  MutationAddToListArgs,
  RequireFields,
} from "./generated/graphql";

/**
 * This resolver returns properties about a user's product list.
 * @param param0 An object containing a reference to a `list`
 * @returns
 */
export async function listResolver({ list }: { list: List }): Promise<List> {
  const product = await ProductListModel.findByPk(parseInt(list.id));
  if (!product) return null;

  return {
    id: product.id.toString(),
    name: product.name,
  };
}

/**
 * This mutation adds a product to a user's product list.
 * @param args An object containing `listId` and `productId`
 * @returns
 */
export async function addToListMutation(
  args: RequireFields<MutationAddToListArgs, "input">
): Promise<List> {
  const { listId, productId } = args.input;
  const list = await ProductListModel.findByPk(parseInt(listId));
  if (!list) return null;

  try {
    list.addItem(parseInt(productId));
    await list.save();
  } catch (e) {
    throw new GraphQLError(e);
  }

  return {
    id: list.id.toString(),
    name: list.name,
  };
}
