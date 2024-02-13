// @ts-check

/*
A straightforward example of a function that updates a line item title and price based on attributes.

The function reads the cart. Any item with a specific line item attribute will be used
to generate an update operation with a custom title, and price based on simple math using 
the line item attribute value.
*/

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 * @typedef {import("../generated/api").CartOperation} CartOperation
 * @typedef {import("../generated/api").ProductVariant} ProductVariant
 */

/**
 * @type {FunctionRunResult}
 */
const NO_CHANGES = {
  operations: [],
};

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  const operations = input.cart.lines.reduce(
    /** @param {CartOperation[]} acc */
    (acc, cartLine) => {
      const updateOperation = optionallyBuildUpdateOperation(
        cartLine
      );
      const expandOpration = optionallyBuildExpandOperation(
        cartLine
      );
      if (updateOperation || expandOpration ) {
        return [...acc, { update: updateOperation, expand: expandOpration }];
      }

      console.log(acc);
      return acc;
    },
    []
  );

  return operations.length > 0 ? { operations } : NO_CHANGES;
};

/**
 * @param {RunInput['cart']['lines'][number]} cartObject
 */
function optionallyBuildUpdateOperation(
  cartObject
) {
  let variant = /** @type {ProductVariant} */ (cartObject.merchandise);
  let cartLineId = cartObject.id;
  let variantId = variant.id.match(/\d+/)[0];
  if(cartObject.Note?.value=="Free $220 Gift" && variantId=='47481604833558'){
    return {
      cartLineId,
      title: "Tempo title change - Free Gift",
      price: {
        adjustment: {
          fixedPricePerUnit: {
            amount: 0.0
          }
        }
      }
    };
  }
return null;
}
function optionallyBuildExpandOperation( cartObject){
 return null;
}