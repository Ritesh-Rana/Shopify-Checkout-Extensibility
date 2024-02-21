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
     
      if (updateOperation) {
        return [...acc, { update: updateOperation}];
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
 * @returns {CartOperation | null}
 */
function optionallyBuildUpdateOperation(
  cartObject
) {
  let variant = /** @type {ProductVariant} */ (cartObject.merchandise);
  let cartLineId = cartObject.id;

  if (cartObject.Note?.value === "FREEGIFT" && cartObject.merchandise.product.hasTags[0].hasTag===true) {
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


