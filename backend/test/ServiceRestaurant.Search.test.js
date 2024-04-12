jest.mock('../class_model/Restaurant.js', () => {
    class Restaurant {
        static async getRestaurantByKeyword(keyword, ratingLowerBound) {
            const restaurant1 = {
                restaurantCode: 0,
                restaurantEmail: 'Test Restaurant Email',
                restaurantName: 'Test Restaurant Name',
                restaurantPhone: 'Test Restaurant Phone',
                restaurantABN: 'Test Restaurant ABN',
                restaurantBanking: 'Test Restaurant Banking',
                restaurantLocation: 'Test Restaurant Location',
                restaurantLat: -30.408909,
                restaurantLon: 150.8854373,
                restaurantTotalRating: 20,
                restaurantTotalOrder: 5,
                restaurantIMG: 'Test Restaurant IMG',
                isActive: true
            }

            const restaurant2 = {
                restaurantCode: 1,
                restaurantEmail: 'Test Restaurant Email',
                restaurantName: 'Test Restaurant Name',
                restaurantPhone: 'Test Restaurant Phone',
                restaurantABN: 'Test Restaurant ABN',
                restaurantBanking: 'Test Restaurant Banking',
                restaurantLocation: 'Test Restaurant Location',
                restaurantLat: -34.408909,
                restaurantLon: 150.8854373,
                restaurantTotalRating: 20,
                restaurantTotalOrder: 5,
                restaurantIMG: 'Test Restaurant IMG',
                isActive: true
            }

            return ([restaurant1, restaurant2]);
        }
    }

    return Restaurant;
});

const ServiceRestaurant = require('../class_controller/ServiceRestaurant.js');
describe('ServiceRestaurant Authentication', () => {
    describe('getRestaurants', () => {
        test('get and filter restaurant correctly', async () => {
            const serviceRestaurant = new ServiceRestaurant();

            const keyword = 'res';
            const ratingLowerBound = 4;
            const radius = 20;
            const cusLat = -34.408909;
            const cusLon = 150.8854373;

            const restaurants = await serviceRestaurant.getRestaurants(keyword, null, ratingLowerBound, radius, cusLat, cusLon);
            expect(restaurants.length).toBe(1);
            expect(restaurants[0].restaurantCode).toBe(1);
        });
    });
})