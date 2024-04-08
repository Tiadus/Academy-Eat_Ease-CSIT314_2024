const Cart = require('../class_model/Cart.js');

jest.mock('../Database.js', () => ({
  pool: {
      getConnection: jest.fn().mockReturnValue({
          release: jest.fn(),
          rollback: jest.fn(),
          commit: jest.fn(),
          beginTransaction: jest.fn()
      }),
      query: jest.fn().mockRejectedValue(new Error('Database error')),
      end: jest.fn()
  }
}));

describe('Cart', () => {
  const mockQuery = jest.fn().mockRejectedValue(new Error('Database error'));
  require('../Database.js').pool.query = mockQuery;

  describe('insertCart', () => {
    it('should throw an error when the database query fails', async () => {
      const customerCode = 0;
      const restaurantCode = 0;
      const cartCode = 'CC0R0';
      await expect(Cart.insertCart(customerCode, restaurantCode, cartCode)).rejects.toThrow('Internal Server Error');
    });
  });

  describe('getCartLinkedRestaurant', () => {
    it('should throw an error when the database query fails', async () => {
      const customerCode = 0;
      const restaurantCode = 0;
      const cartCode = 'CC0R0';
      const aCart = new Cart(customerCode, restaurantCode, cartCode);

      await expect(aCart.getCartLinkedRestaurant()).rejects.toThrow('Internal Server Error');
    });
  });

  describe('getItem', () => {
    it('should throw an error when the database query fails', async () => {
        const cartCode = 'abc123';
        const cart = new Cart(1, 1, cartCode);
        await expect(cart.getItem(null)).rejects.toThrow('Internal Server Error');
    });
  });

  describe('addItem', () => {
    it('should throw an error when the database query fails', async () => {
      const customerCode = 0;
      const restaurantCode = 0;
      const cartCode = 'CC0R0';
      const aCart = new Cart(customerCode, restaurantCode, cartCode);

      const itemName = 'Burger';
      const itemPrice = 69.42;
      const itemExisted = false;

      await expect(aCart.addItem(itemName, itemPrice, itemExisted)).rejects.toThrow('Internal Server Error');
    });
  });

  describe('modifyItem', () => {
    it('should throw an error when the database query fails', async () => {
      const customerCode = 0;
      const restaurantCode = 0;
      const cartCode = 'CC0R0';
      const aCart = new Cart(customerCode, restaurantCode, cartCode);

      const itemName = 'Burger';
      const itemQuantity = 69;

      await expect(aCart.modifyItem(itemName, itemQuantity)).rejects.toThrow('Internal Server Error');
    });
  });

  describe('deleteCart', () => {
    it('should throw an error when the database query fails', async () => {
      const customerCode = 0;
      const restaurantCode = 0;
      const cartCode = 'CC0R0';
      const aCart = new Cart(customerCode, restaurantCode, cartCode);

      await expect(aCart.deleteCart(customerCode)).rejects.toThrow('Internal Server Error');
    });
  });
});
