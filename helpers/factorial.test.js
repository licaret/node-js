const factorial = require("./factorial");

describe("Factorial Function", () => {
  it("5! should be 120", () => {
    expect(factorial(5)).toBe(120);
  });

  it("1! should be 1", () => {
    expect(factorial(1)).toBe(1);
  });

  it("0! should be 1", () => {
    expect(factorial(0)).toBe(1);
  });

  it("negative numbers factorial should fail", () => {
    expect(() => factorial(-1)).toThrow("The number should be positive");
  });
});
