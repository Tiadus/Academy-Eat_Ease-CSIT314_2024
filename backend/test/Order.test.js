const Order = require('../class_model/Order.js');

describe('Order class', () => {
    const anOrder = {
        customerCode: 'CUSTOMER_CODE',
        recipientName: 'Recipient Name',
        recipientPhone: 'Recipient Phone',
        orderCode: 'ORDER_CODE',
        restaurantCode: 'RESTAURANT_CODE',
        orderStatus: 'ORDER_STATUS',
        orderLocation: 'ORDER_LOCATION',
        courierName: 'Courier Name',
        courierPhone: 'Courier Phone',
        orderReview: 'Order Review',
        orderRating: 'Order Rating',
        rejectReason: 'Reject Reason',
        orderDate: 'ORDER_DATE',
        orderCost: 'ORDER_COST',
    }

    beforeEach(() => {
        // Mock the pool object to return an error for every query
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
    });

    afterEach(() => {
        jest.resetModules();
    });

    describe('insertOrder', () => {
        it('should throw an error if the SQL query fails', async () => {
            await expect(Order.insertOrder()).rejects.toThrow('Internal Server Error');
        });
    });

    describe('getDBOrder', () => {
        it('should throw an error if the SQL query fails', async () => {
            await expect(Order.getDBOrder()).rejects.toThrow('Internal Server Error');
        });
    });

    describe('getOrderItems', () => {
        it('should throw an error if the SQL query fails', async () => {
            await expect(new Order(anOrder).getOrderItems()).rejects.toThrow('Internal Server Error');
        });
    });

    describe('setRatingReview', () => {
        it('should throw an error if the action is forbidden', async () => {
            await expect(new Order(anOrder).setRatingReview()).rejects.toThrow('Forbidden');
        });
    });

    describe('setAcceptStatus', () => {
        it('should throw an error if the action is forbidden', async () => {
            await expect(new Order(anOrder).setAcceptStatus()).rejects.toThrow('Forbidden');
        });
    });

    describe('setRejectStatus', () => {
        it('should throw an error if the action is forbidden', async () => {
            await expect(new Order(anOrder).setRejectStatus()).rejects.toThrow('Forbidden');
        });
    });

    describe('deleteOrder', () => {
        it('should throw an error if the action is forbidden', async () => {
            await expect(new Order(anOrder).deleteOrder()).rejects.toThrow('Forbidden');
        });
    });

    describe('getIncomingOrders', () => {
        it('should throw an error if the SQL query fails', async () => {
            await expect(Order.getIncomingOrders()).rejects.toThrow('Internal Server Error');
        });
    });

    describe('getActiveOrders', () => {
        it('should throw an error if the SQL query fails', async () => {
            await expect(Order.getActiveOrders()).rejects.toThrow('Internal Server Error');
        });
    });

    describe('getPastOrders', () => {
        it('should throw an error if the SQL query fails', async () => {
            await expect(Order.getPastOrders()).rejects.toThrow('Internal Server Error');
        });
    });

    describe('getOrdersByTimeline', () => {
        it('should throw an error if the SQL query fails', async () => {
            await expect(Order.getOrdersByTimeline()).rejects.toThrow('Internal Server Error');
        });
    });
});
