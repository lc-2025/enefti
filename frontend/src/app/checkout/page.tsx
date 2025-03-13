import React from 'react';

/**
 * @description Checkout page
 * @author Luca Cattide
 * @date 13/03/2025
 * @export
 * @returns {*}  {React.ReactNode}
 */
export default function Checkout(): React.ReactNode {
  return (
    <section className="checkout">
      <h2 className="checkout__title">Checkout</h2>
      {/* Form Start */}
      <form className="checkout__form">
        <label className="form__label">
          Wallet Address
          <input
            className="label__field"
            type="text"
            placeholder="0x123456789..."
            required
          />
        </label>
        {/* Summary Start */}
        <div className="form__summary">
          <h3 className="summary__title"></h3>
          <span className="summary__price">0.1 ETH</span>
        </div>
        {/* Summary End */}
        <input className="form__field" type="submit" value="Buy" />
      </form>
       {/* Form End */}
    </section>
  );
}
