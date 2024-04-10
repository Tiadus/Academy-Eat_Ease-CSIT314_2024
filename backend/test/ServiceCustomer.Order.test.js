jest.mock('../class_model/Order.js', () => {
    class Order {
        constructor(orderInformation) {
            this.customerCode = orderInformation.customerCode;
            this.recipientName = orderInformation.recipientName;
            this.recipientPhone = orderInformation.recipientPhone;
            this.orderCode = orderInformation.orderCode;
            this.restaurantCode = orderInformation.restaurantCode;
            this.orderStatus = orderInformation.orderStatus;
            this.orderLocation = orderInformation.orderLocation;
            this.courierName = orderInformation.courierName;
            this.courierPhone = orderInformation.courierPhone;
            this.orderReview = orderInformation.orderReview;
            this.orderRating = orderInformation.orderRating;
            this.rejectReason = orderInformation.rejectReason;
            this.orderDate = orderInformation.orderDate;
            this.orderCost = orderInformation.orderCost;
        }

        static async insertOrder(cartCode, customerCode, recipientName, recipientPhone, orderCode, restaurantCode, orderLocation, orderDate, orderCost) {
            return;
        }
    }

    return Order;
});

jest.mock('../class_model/Cart.js', () => {
    class Cart {
        constructor(customerCode, restaurantCode, cartCode) {
            this.customerCode = customerCode;
            this.restaurantCode = restaurantCode;
            this.cartCode = cartCode;
        }

        async getItem() {
            return [
                { itemQuantity: 2 },
                { itemQuantity: 3 }
            ];
        }
    }

    return Cart;
});


const ModuleTime = require('../class_controller/ModuleTime.js');
const Cart = require('../class_model/Cart.js');
const ServiceCustomer = require('../class_controller/ServiceCustomer.js');
const Customer = require('../class_model/Customer.js');
describe('ServiceCustomer', () => {
    const moduleTime = new ModuleTime();
    const serverTime = moduleTime.getServerTime();
    const date = `${serverTime.year}-${serverTime.month}-${serverTime.day}`;
    const customerInformation = {
        customerCode: 1,
        customerEmail: 'swaglord03@elden.com',
        customerName: 'Viet Thai Nguyen',
        customerPhone: '911',
        isActive: true
    }

    const restaurantCode = 1;
    const orderCode = `OC${customerInformation.customerCode}R${restaurantCode}T${serverTime.year}${serverTime.month}${serverTime.day}${serverTime.hour}${serverTime.minute}${serverTime.second}`;

    const recipientName = 'Viet Thai Nguyen';
    const recipientPhone = '911';
    const orderLocation = 'Erd Tree';
    const orderCost = 420.69;

    describe('placeCustomerOrder', () => {
        test('it should create an order and return the order preview', async () => {

            const serviceCustomer = new ServiceCustomer();
            const aCustomer = new Customer(customerInformation);
            const aCart = new Cart(customerInformation.customerCode, restaurantCode, 'CC1R1');
            serviceCustomer.aCustomer = aCustomer;
            serviceCustomer.aCart = aCart;

            const orderPreview = await serviceCustomer.placeCustomerOrder(recipientName, recipientPhone, orderLocation, orderCost)
    
            expect(orderPreview.restaurantCode).toBe(restaurantCode);
            expect(orderPreview.orderCode).toBe(orderCode);
            expect(orderPreview.recipientName).toBe(recipientName);
            expect(orderPreview.recipientPhone).toBe(recipientPhone);
            expect(orderPreview.orderLocation).toBe(orderLocation);
            expect(orderPreview.orderDate).toBe(date);
            expect(orderPreview.orderCost).toBe(orderCost);
            expect(orderPreview.orderItems.length).toBe(2);
        });
    });
})
