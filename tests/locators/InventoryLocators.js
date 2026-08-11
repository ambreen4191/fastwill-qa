class InventoryLocators {
  constructor(page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  addToCartButton(productName) {
    return this.page.getByRole('button', { name: `Add to cart ${productName}` });
  }
}

module.exports = { InventoryLocators };
