// cart.test.js
jest.mock('../class_model/Cart.js', () => {
    class Cart {
        async getItem() {
            return [
                { itemQuantity: 2 },
                { itemQuantity: 3 }
            ];
        }
    }

    return Cart;
});

const Cart = require('../class_model/Cart.js');
const ServiceCustomer = require('../class_controller/ServiceCustomer.js');
describe('ServiceCustomer', () => {
    describe('getCustomerTotalItemInCart', () => {
        test('calculates total items in cart if cart exist', async () => {
            const mockedCart = new Cart(); // Create a mocked Cart instance
            const instance = new ServiceCustomer();
            instance.aCart = mockedCart; // Assign the mockedCart to the instance's aCart property
            const totalItemInCart = await instance.getCustomerTotalItemInCart();
    
            expect(totalItemInCart).toBe(5); // Assuming the mocked data has 2 items with quantity 2 and 3
        });
        test('calculates total items in cart if does not exist', async () => {
            const mockedCart = null; // Create a mocked Cart instance
            const instance = new ServiceCustomer();
            instance.aCart = mockedCart; // Assign the mockedCart to the instance's aCart property
            const totalItemInCart = await instance.getCustomerTotalItemInCart();
    
            expect(totalItemInCart).toBe(0); 
        });
    });
})
