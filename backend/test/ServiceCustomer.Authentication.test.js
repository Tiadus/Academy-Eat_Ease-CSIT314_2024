jest.mock('../class_model/Cart.js', () => {
    class Cart {
        constructor(customerCode, restaurantCode, cartCode) {
            this.customerCode = customerCode;
            this.restaurantCode = restaurantCode;
            this.cartCode = cartCode;
        }
    }

    return Cart;
});

jest.mock('../class_model/Customer.js', () => {
    class Customer {
        constructor(customerInformation) {
            this.customerCode = customerInformation.customerCode
            this.customerEmail = customerInformation.customerEmail;
            this.customerName = customerInformation.customerName;
            this.customerPhone = customerInformation.customerPhone;
            this.isActive = customerInformation.isActive;
        }

        static async getDBCustomer(inputEmail, inputPassword) {
            return ([{
                customerCode: 0,
                customerEmail: inputEmail,
                customerName: 'Rem',
                customerPhone: '09123412391',
                isActive: true,
                restaurantCode: 1,
                cartCode: "CC0R1",
                membershipType: null,
                membershipEnd: null,
            }])
        }
    }

    return Customer;
});

const ServiceCustomer = require('../class_controller/ServiceCustomer.js');
describe('ServiceCustomer Authentication', () => {
    describe('authenticateCustomer', () => {
        test('create object of class Customer, Cart and Membership correctly', async () => {
            const serviceCustomer = new ServiceCustomer();
            await serviceCustomer.authenticateCustomer('rem4life@gmail.com', 'rem');
            
            expect(serviceCustomer.aCustomer.customerCode).toBe(0);
            expect(serviceCustomer.aCustomer.customerEmail).toBe('rem4life@gmail.com');
            expect(serviceCustomer.aCustomer.customerName).toBe('Rem');
            expect(serviceCustomer.aCustomer.customerPhone).toBe('09123412391');
            expect(serviceCustomer.aCustomer.isActive).toBe(true);
            expect(serviceCustomer.aCart.cartCode).toBe("CC0R1");
            expect(serviceCustomer.membership.membershipType).toBe(null);
            expect(serviceCustomer.membership.membershipEnd).toBe(null);
        });
    });
})
