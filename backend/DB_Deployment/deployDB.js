const {createDatabase, createTables} = require('./createDB.js');
const {generateRandomPoints, generateRestaurants, generateRestaurantAuthentications, generateRestaurantItems, generateCustomers, generateOrders, generateCategory} = require('./dataGeneration.js');
const {batchInsertRestaurant, batchInsertCustomer, batchInsertOrder, batchInsertCategory} = require('./insertDB.js');

const filePath = './DB_CREATE.sql';

const initialCoordinate = {
    latitude: -34.408909, // UOW Latitude Coordinate
    longitude: 150.885437 // UOW Longitude Coordinate
}

const radius = 10000;

const restaurantQuantity = 10;
const customerQuantity = 10;
const orderQuantity = 20;
const itemPerRestaurant = 5;

const categories = ['Italian', 'Japanese', 'Mexican', 'Chinese', 'Indian', 'Thai', 'American', 'French', 'Mediterranean', 'Vegetarian'];

async function deployDatabase() {
    const config = require('../db_config.js');
    const {connection, database} = require('../Database.js');

    let mySQLServer = null;
    let db = null;
    let databaseConnection = null;

    try {
        mySQLServer = connection;
        await createDatabase(mySQLServer, config.databaseName);
        mySQLServer.end();
        mySQLServer = null;

        db = database;
        databaseConnection = await db.promise().getConnection();
        await createTables(databaseConnection, filePath);

        const randomGeoPoints = generateRandomPoints(initialCoordinate, radius, restaurantQuantity);
        const restaurants = generateRestaurants(randomGeoPoints, restaurantQuantity, categories);
        const restaurantAuthentications = generateRestaurantAuthentications(restaurants); 
        const restaurantItems = generateRestaurantItems(restaurants, categories);

        await batchInsertRestaurant(databaseConnection, restaurants, restaurantAuthentications, restaurantItems);

        const customerInformation = generateCustomers(customerQuantity);
        const customers = customerInformation.customerList;
        const customerAuthentications = customerInformation.customerAuthenticationList;
        const customerPayments = customerInformation.customerPaymentList;
        const customerMembershipList = customerInformation.customerMembershipList;

        await batchInsertCustomer(databaseConnection, customers, customerAuthentications, customerPayments, customerMembershipList);

        const orderInformation = generateOrders(restaurantItems, itemPerRestaurant, orderQuantity);
        const orderList = orderInformation.orderList;
        const orderItemList = orderInformation.orderItemList;

        await batchInsertOrder(databaseConnection, orderList, orderItemList);

        const categoryInformation = generateCategory(categories);
        const categoryList = categoryInformation.categoryList;
        const categoryRestaurants = categoryInformation.categoryRestaurants;

        await batchInsertCategory(databaseConnection, categoryList,categoryRestaurants);

        await databaseConnection.commit();
    } catch(error) {
        console.error('Error creating database: ' + error.stack);
        if (databaseConnection !== null) {
            databaseConnection.rollback();
        }
    } finally {
        if (mySQLServer !== null) {
            mySQLServer.end();
        }

        if (db !== null) {
            db.end();
        }

        if (databaseConnection !== null) {
            databaseConnection.release();
        }
    }
}

deployDatabase();