const Customer = require('../class_model/Customer.js');

describe('Customer', () => {
    let customer;

    beforeEach(() => {
        // Mock the pool object to return an error for every query
        jest.mock('../Database.js', () => ({
            pool: {
                getConnection: jest.fn().mockReturnValue({
                    release: jest.fn(),
                    rollback: jest.fn(),
                    commit: jest.fn(),
                    beginTransaction: jest.fn(),
                    query: jest.fn().mockRejectedValue(new Error('Correctly Thrown Error'))
                }),
                query: jest.fn().mockRejectedValue(new Error('Correctly Thrown Error')),
                end: jest.fn()
            }
        }));

        customer = new Customer({
            customerCode: 1,
            customerEmail: 'test@example.com',
            customerName: 'John Doe',
            customerPhone: '1234567890',
            isActive: true
        });
    });

    afterEach(() => {
        jest.resetModules();
    });

    describe('insertCustomer', () => {
        it('should throw an error if SQL query fails', async () => {
            await expect(Customer.insertCustomer('test@example.com', 'John Doe', '1234567890', 'password')).rejects.toThrowError('Internal Server Error');
        });
    });

    describe('getDBCustomer', () => {
        it('should throw an error if SQL query fails', async () => {
            await expect(Customer.getDBCustomer('test@example.com', 'password')).rejects.toThrowError('Internal Server Error');
        });
    });

    describe('setEmail', () => {
        it('should throw an error if SQL query fails', async () => {
            await expect(customer.setEmail('newemail@example.com')).rejects.toThrowError('Internal Server Error');
        });
    });

    describe('setPhone', () => {
        it('should throw an error if SQL query fails', async () => {
            await expect(customer.setPhone('1234567890')).rejects.toThrowError('Internal Server Error');
        });
    });

    describe('setPassword', () => {
        it('should throw an error if SQL query fails', async () => {
            await expect(customer.setPassword('newpassword')).rejects.toThrowError('Internal Server Error');
        });
    });

    describe('getPaymentMethods', () => {
        it('should throw an error if SQL query fails', async () => {
            await expect(customer.getPaymentMethods()).rejects.toThrowError('Internal Server Error');
        });
    });

    describe('addPaymentMethods', () => {
        it('should throw an error if SQL query fails', async () => {
            await expect(customer.addPaymentMethods('1234567890123456', 'John Doe', '12', '2024')).rejects.toThrowError('Internal Server Error');
        });
    });

    describe('deletePaymentMethods', () => {
        it('should throw an error if SQL query fails', async () => {
            await expect(customer.deletePaymentMethods(1)).rejects.toThrowError('Internal Server Error');
        });
    });
});
