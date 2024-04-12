jest.mock('../class_model/Restaurant.js', () => {
    class Restaurant {
        constructor(restaurantInformation) {
            this.restaurantCode = restaurantInformation.restaurantCode;
            this.restaurantEmail = restaurantInformation.restaurantEmail;
            this.restaurantName = restaurantInformation.restaurantName;
            this.restaurantPhone = restaurantInformation.restaurantPhone;
            this.restaurantABN = restaurantInformation.restaurantABN;
            this.restaurantBanking = restaurantInformation.restaurantBanking;
            this.restaurantLocation = restaurantInformation.restaurantLocation;
            this.restaurantLat = restaurantInformation.restaurantLat;
            this.restaurantLon = restaurantInformation.restaurantLon;
            this.restaurantTotalRating = restaurantInformation.restaurantTotalRating;
            this.restaurantTotalOrder = restaurantInformation.restaurantTotalOrder;
            this.restaurantIMG = restaurantInformation.restaurantIMG;
            this.isActive = restaurantInformation.isActive;
        }
    

        static async getDBRestaurant(inputEmail, inputPassword) {
            return ([{
                restaurantCode: 0,
                restaurantEmail: inputEmail,
                restaurantName: 'Test Restaurant Name',
                restaurantPhone: 'Test Restaurant Phone',
                restaurantABN: 'Test Restaurant ABN',
                restaurantBanking: 'Test Restaurant Banking',
                restaurantLocation: 'Test Restaurant Location',
                restaurantLat: 'Test Restaurant Lat',
                restaurantLon: 'Test Restaurant Lon',
                restaurantTotalRating: 20,
                restaurantTotalOrder: 5,
                restaurantIMG: 'Test Restaurant IMG',
                isActive: true
            }])
        }
    }

    return Restaurant;
});

const ServiceRestaurant = require('../class_controller/ServiceRestaurant.js');
describe('ServiceRestaurant Authentication', () => {
    describe('authenticateRestaurant', () => {
        test('create object of class Restaurant correctly', async () => {
            const serviceRestaurant = new ServiceRestaurant();
            await serviceRestaurant.authenticateOwner('rem4life@gmail.com', 'rem');
            
            expect(serviceRestaurant.aRestaurant.restaurantCode).toBe(0);
            expect(serviceRestaurant.aRestaurant.restaurantEmail).toBe('rem4life@gmail.com');
            expect(serviceRestaurant.aRestaurant.restaurantName).toBe('Test Restaurant Name');
            expect(serviceRestaurant.aRestaurant.restaurantPhone).toBe('Test Restaurant Phone');
            expect(serviceRestaurant.aRestaurant.restaurantABN).toBe('Test Restaurant ABN');
            expect(serviceRestaurant.aRestaurant.restaurantBanking).toBe('Test Restaurant Banking');
            expect(serviceRestaurant.aRestaurant.restaurantLocation).toBe('Test Restaurant Location');
            expect(serviceRestaurant.aRestaurant.restaurantLat).toBe('Test Restaurant Lat');
            expect(serviceRestaurant.aRestaurant.restaurantLon).toBe('Test Restaurant Lon');
            expect(serviceRestaurant.aRestaurant.restaurantTotalRating).toBe(20);
            expect(serviceRestaurant.aRestaurant.restaurantTotalOrder).toBe(5);
            expect(serviceRestaurant.aRestaurant.restaurantIMG).toBe('Test Restaurant IMG');
            expect(serviceRestaurant.aRestaurant.isActive).toBe(true);
        });
    });
})
