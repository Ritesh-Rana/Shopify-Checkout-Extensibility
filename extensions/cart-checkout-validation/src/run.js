// @ts-check

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  const errors = input.cart.lines
    .filter(({ quantity }) => quantity > 6)
    .map(() => ({
      localizedMessage: "Not possible to order more than 5 quantities",
      target: "cart",
    }));

  return {
    errors
  }
};