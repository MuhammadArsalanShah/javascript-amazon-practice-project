import { formatCurrency } from "../../scripts/utils/money.js";

describe('Test Suit: formatCurrency', () => {

  it("Converts cents into dollars", () => {
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('works with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('rounds up the nearest cent', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });

  // 16a
  it('round downs to the nearest cent', () => {
    expect(formatCurrency(2000.4)).toEqual('20.00');
  });

  //16b
  it('works with negative (-) number', () => {
    expect(formatCurrency(-2560.89)).toEqual('-25.61');
  });

});