const Membership = require('../class_model/Membership.js');

describe('Membership', () => {
    let membership;

    beforeEach(() => {
        // Mock the pool object to return an error for every query
        jest.mock('../Database.js', () => ({
            pool: {
                getConnection: jest.fn().mockReturnValue({
                    release: jest.fn(),
                    rollback: jest.fn(),
                    commit: jest.fn()
                }),
                query: jest.fn().mockRejectedValue(new Error('Database error')),
                end: jest.fn()
            }
        }));

        membership = new Membership({
            customerCode: 1,
            membershipType: 'basic',
            membershipEnd: '2022-12-31'
        });
    });

    afterEach(() => {
        jest.resetModules();
    });

    describe('subscribeMembership', () => {
        it('should throw an error if SQL query fails', async () => {
            await expect(membership.subscribeMembership('premium', '2023-12-31')).rejects.toThrowError('Internal Server Error');
        });
    });

    describe('renewMembership', () => {
        it('should throw an error if SQL query fails', async () => {
            await expect(membership.renewMembership('2023-12-31')).rejects.toThrowError('Internal Server Error');
        });
    });

    describe('cancelMembership', () => {
        it('should throw an error if SQL query fails', async () => {
            await expect(membership.cancelMembership()).rejects.toThrowError('Internal Server Error');
        });
    });
});
