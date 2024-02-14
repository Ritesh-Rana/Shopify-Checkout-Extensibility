// @ts-check
import { DiscountApplicationStrategy } from "../generated/api";

// Use JSDoc annotations for type safety
/**
* @typedef {import("../generated/api").RunInput} RunInput
* @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
* @typedef {import("../generated/api").Target} Target
* @typedef {import("../generated/api").ProductVariant} ProductVariant
*/

/**
* @type {FunctionRunResult}
*/
const EMPTY_DISCOUNT = {
  discountApplicationStrategy: DiscountApplicationStrategy.Maximum,
  discounts: [],
};

// The configured entrypoint for the 'purchase.product-discount.run' extension target
/**
* @param {RunInput} input
* @returns {FunctionRunResult}
*/
export function run(input) {
  // console.log(input.cart.lines);
  // console.log(input.cart.cost.subtotalAmount.amount);
  const targets = input.cart.lines
  // Only include cart lines with a quantity of two or more
  // and a targetable product variant
  .filter(line => line.merchandise.product.hasTags[0].hasTag===true)
  .map(line => {
    const variant = /** @type {ProductVariant} */ (line.merchandise);
    console.log(JSON.stringify( variant   ));
    // console.log(JSON.stringify( variant.product.hasTags   ));
    // console.log(JSON.stringify( variant.product.hasAnyTag ));
    return /** @type {Target} */ ({
      // Use the variant ID to create a discount target
      productVariant: {
        id: variant.id
      }
    });
  });

  if (!targets.length) {
    // You can use STDERR for debug logs in your function
    console.error("No cart lines qualify for volume discount.");
    return EMPTY_DISCOUNT;
  }

  // The @shopify/shopify_function package applies JSON.stringify() to your function result
  // and writes it to STDOUT
  return {
    discounts: [
      {
        // Apply the discount to the collected targets
        targets,
        message:"20% off",
        // Define a percentage-based discount
        value: {
          percentage: {
            value: "20"
          }
        }
      }
    ],
    discountApplicationStrategy: DiscountApplicationStrategy.First
  };
};
