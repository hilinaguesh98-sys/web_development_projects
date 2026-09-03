import test from "node:test";
import assert from "node:assert/strict";

import { cartInitialState, cartReducer } from "./cartReducer.js";

test("adds a new cart item", () => {
  const state = cartReducer(cartInitialState, {
    type: "ADD_ITEM",
    item: { id: "item-1", name: "Burger", price: 100 },
  });

  assert.deepEqual(state, [{ id: "item-1", name: "Burger", price: 100, quantity: 1 }]);
});

test("increments an existing cart item", () => {
  const state = cartReducer(
    [{ id: "item-1", name: "Burger", price: 100, quantity: 1 }],
    {
      type: "ADD_ITEM",
      item: { id: "item-1", name: "Burger", price: 100 },
    }
  );

  assert.deepEqual(state, [{ id: "item-1", name: "Burger", price: 100, quantity: 2 }]);
});

test("removes one quantity and clears item at zero", () => {
  const state = cartReducer(
    [{ id: "item-1", name: "Burger", price: 100, quantity: 2 }],
    { type: "REMOVE_ITEM", id: "item-1" }
  );

  assert.deepEqual(state, [{ id: "item-1", name: "Burger", price: 100, quantity: 1 }]);

  const cleared = cartReducer(
    [{ id: "item-1", name: "Burger", price: 100, quantity: 1 }],
    { type: "REMOVE_ITEM", id: "item-1" }
  );

  assert.deepEqual(cleared, []);
});

test("clears the full cart", () => {
  const state = cartReducer(
    [
      { id: "item-1", name: "Burger", price: 100, quantity: 1 },
      { id: "item-2", name: "Pizza", price: 200, quantity: 2 },
    ],
    { type: "CLEAR" }
  );

  assert.deepEqual(state, []);
});
