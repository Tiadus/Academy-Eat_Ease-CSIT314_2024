const Restaurant = require('../class_model/Restaurant.js');

describe('Restaurant', () => {
    let restaurant;

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

        restaurant = new Restaurant({
            restaurantCode: 1,
            restaurantEmail: 'restaurant@example.com',
            restaurantName: 'Example Restaurant',
            restaurantPhone: '1234567890',
            restaurantABN: '123456789',
            restaurantBanking: 'Example Bank',
            restaurantLocation: '123 Example St, Example City',
            restaurantLat: 0.0,
            restaurantLon: 0.0,
            restaurantTotalRating: 0,
            restaurantTotalOrder: 0,
            restaurantIMG: 'defaultRestaurant.png',
            isActive: true
        });
    });

    afterEach(() => {
        jest.resetModules();
    });

    describe('insertRestaurant', () => {
        it('should throw an error if SQL query fails', async () => {
            await expect(Restaurant.insertRestaurant(
                'restaurant@example.com', 'password', 'Example Restaurant',
                '1234567890', '123456789', 'Example Bank',
                '123 Example St, Example City', 0.0, 0.0, ['1', '2']
            )).rejects.toThrowError('Internal Server Error');
        });
    });

    describe('getDBRestaurant', () => {
        it('should throw an error if SQL query fails', async () => {
            await expect(Restaurant.getDBRestaurant('restaurant@example.com', 'password')).rejects.toThrowError('Internal Server Error');
        });
    });

    describe('getDBRestaurantByName', () => {
        it('should throw an error if SQL query fails', async () => {
            await expect(Restaurant.getDBRestaurantByName('Example Restaurant')).rejects.toThrowError('Internal Server Error');
        });
    });

    describe('setRestaurantEmail', () => {
        it('should throw an error if SQL query fails', async () => {
            await expect(restaurant.setRestaurantEmail('newemail@example.com')).rejects.toThrowError('Internal Server Error');
        });
    });

    describe('setRestaurantPhone', () => {
        it('should throw an error if SQL query fails', async () => {
            await expect(restaurant.setRestaurantPhone('9876543210')).rejects.toThrowError('Internal Server Error');
        });
    });

    describe('setRestaurantPassword', () => {
        it('should throw an error if SQL query fails', async () => {
            await expect(restaurant.setRestaurantPassword('newpassword')).rejects.toThrowError('Internal Server Error');
        });
    });

    describe('setRestaurantName', () => {
        it('should throw an error if SQL query fails', async () => {
            await expect(restaurant.setRestaurantName('New Restaurant Name')).rejects.toThrowError('Internal Server Error');
        });
    });

    describe('setRestaurantAddress', () => {
        it('should throw an error if SQL query fails', async () => {
            await expect(restaurant.setRestaurantAddress('New Address', 1.0, 1.0)).rejects.toThrowError('Internal Server Error');
        });
    });

    describe('setRestaurantABN', () => {
        it('should throw an error if SQL query fails', async () => {
            await expect(restaurant.setRestaurantABN('987654321')).rejects.toThrowError('Internal Server Error');
        });
    });

    describe('setRestaurantBanking', () => {
        it('should throw an error if SQL query fails', async () => {
            await expect(restaurant.setRestaurantBanking('New Banking Info')).rejects.toThrowError('Internal Server Error');
        });
    });

    describe('addItem', () => {
        it('should throw an error if SQL query fails', async () => {
            await expect(restaurant.addItem('New Item', 10.0)).rejects.toThrowError('Internal Server Error');
        });
    });

    describe('deleteItem', () => {
        it('should throw an error if SQL query fails', async () => {
            await expect(restaurant.deleteItem('Existing Item')).rejects.toThrowError('Internal Server Error');
        });
    });

    describe('editItem', () => {
        it('should throw an error if SQL query fails', async () => {
            await expect(restaurant.editItem('Edited Item', 15.0, 'Existing Item')).rejects.toThrowError('Internal Server Error');
        });
    });

    describe('getRestaurantItems', () => {
        it('should throw an error if SQL query fails', async () => {
            await expect(restaurant.getRestaurantItems()).rejects.toThrowError('Internal Server Error');
        });
    });

    describe('getRestaurantByKeyword', () => {
        it('should throw an error if SQL query fails', async () => {
            await expect(Restaurant.getRestaurantByKeyword('keyword', 4.0)).rejects.toThrowError('Internal Server Error');
        });
    });

    describe('getRestaurantByCategory', () => {
        it('should throw an error if SQL query fails', async () => {
            await expect(Restaurant.getRestaurantByCategory('category', 4.0)).rejects.toThrowError('Internal Server Error');
        });
    });

    describe('getCategories', () => {
        it('should throw an error if SQL query fails', async () => {
            await expect(Restaurant.getCategories()).rejects.toThrowError('Internal Server Error');
        });
    });
});
