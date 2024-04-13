async function batchInsertRestaurant(dbConnection, restaurants, restaurantAuthentications, restaurantItems) {
    try {
        // Begin a transaction
        await dbConnection.beginTransaction();

        // Prepare the insert query
        const queryRestaurant = 
        'INSERT INTO RESTAURANT (restaurantEmail, restaurantName, restaurantDescription, restaurantPhone, restaurantABN, restaurantBanking, restaurantLocation, restaurantLat, restaurantLon, restaurantTotalRating, restaurantTotalOrder, restaurantIMG, isActive) VALUES ?';

        // Format the data for batch insert
        const valueRestaurant = 
        restaurants.map(item => 
            [
                item.restaurantEmail,
                item.restaurantName,
                item.restaurantDescription,
                item.restaurantPhone,
                item.restaurantABN,
                item.restaurantBanking,
                item.restaurantLocation,
                item.restaurantLat,
                item.restaurantLon,
                item.restaurantTotalRating,
                item.restaurantTotalOrder,
                item.restaurantIMG,
                item.isActive
            ]);

        // Execute the batch insert query
        await dbConnection.query(queryRestaurant, [valueRestaurant]);

        // Prepare the insert query
        const queryRestaurantAuthentication = 
        'INSERT INTO RESTAURANT_AUTHENTICATION (restaurantEmail, restaurantPassword) VALUES ?';

        const valueRestaurantAuthentication = 
        restaurantAuthentications.map(item => 
            [
                item.restaurantEmail,
                item.restaurantPassword
            ]);

        await dbConnection.query(queryRestaurantAuthentication, [valueRestaurantAuthentication]);

        // Prepare the insert query
        const queryRestaurantItem = 
        'INSERT INTO RESTAURANT_ITEM (restaurantCode, itemName, itemDescription, itemPrice, itemIMG) VALUES ?';

        const valueRestaurantItem = 
        restaurantItems.map(item => 
            [
                item.restaurantCode,
                item.itemName,
                item.itemDescription,
                item.itemPrice,
                item.itemIMG
            ]);

        await dbConnection.query(queryRestaurantItem, [valueRestaurantItem]);

        console.log('Batch insert restaurant successful');
    } catch (error) {
        // Rollback the transaction if an error occurred
        console.error('Batch insert restaurant failed:');
        throw error;
    }
}

async function batchInsertCustomer(dbConnection, customers, customerAuthentications, customerPayments, customerMemberships) {
    try {
        // Begin a transaction
        await dbConnection.beginTransaction();

        // Prepare the insert query
        const queryCustomer = 
        'INSERT INTO CUSTOMER (customerEmail, customerName, customerPhone, isActive) VALUES ?';

        // Format the data for batch insert
        const valueCustomer = 
        customers.map(item => 
            [
                item.customerEmail,
                item.customerName,
                item.customerPhone,
                item.isActive
            ]);

        // Execute the batch insert query
        await dbConnection.query(queryCustomer, [valueCustomer]);

        // Prepare the insert query
        const queryCustomerAuthentication = 
        'INSERT INTO CUSTOMER_AUTHENTICATION (customerEmail, customerPassword) VALUES ?';

        const valueCustomerAuthentication = 
        customerAuthentications.map(item => 
            [
                item.customerEmail,
                item.customerPassword
            ]);

        await dbConnection.query(queryCustomerAuthentication, [valueCustomerAuthentication]);

        // Prepare the insert query
        const queryCustomerPayment = 
        'INSERT INTO CUSTOMER_PAYMENT (customerCode, cardNumber, cardOwner, cardExpMonth, cardExpYear) VALUES ?';

        const valueCustomerPayment = 
        customerPayments.map(item => 
            [
                item.customerCode,
                item.cardNumber,
                item.cardOwner,
                item.cardExpMonth,
                item.cardExpYear
            ]);

        await dbConnection.query(queryCustomerPayment, [valueCustomerPayment]);   
        
        // Prepare the insert query
        const queryCustomerMembership = 
        'INSERT INTO MEMBERSHIP (customerCode, membershipType, membershipEnd) VALUES ?';

        const valueCustomerMembership = 
        customerMemberships.map(item => 
            [
                item.customerCode,
                item.membershipType,
                item.membershipEnd
            ]);

        await dbConnection.query(queryCustomerMembership, [valueCustomerMembership]);

        console.log('Batch insert customer successful');
    } catch (error) {
        // Rollback the transaction if an error occurred
        console.error('Batch insert customer failed:');
        throw error;
    }
}

async function batchInsertOrder(dbConnection, orders, orderItems) {
    try {
        // Begin a transaction
        await dbConnection.beginTransaction();

        // Prepare the insert query
        const queryOrder = 
        'INSERT INTO APP_ORDER (customerCode, recipientName, recipientPhone, orderCode, restaurantCode, orderStatus, orderLocation, courierName, courierPhone, orderReview, orderRating, orderDate, orderCost, rejectReason) VALUES ?';

        // Format the data for batch insert
        const valueOrder = 
        orders.map(item => 
            [
                item.customerCode,
                item.recipientName,
                item.recipientPhone,
                item.orderCode,
                item.restaurantCode,
                item.orderStatus,
                item.orderLocation,
                item.courierName,
                item.courierPhone,
                item.orderReview,
                item.orderRating,
                item.orderDate,
                item.orderCost,
                item.rejectReason
            ]);

        // Execute the batch insert query
        await dbConnection.query(queryOrder, [valueOrder]);

        // Prepare the insert query
        const queryOrderItem = 
        'INSERT INTO ORDER_ITEM (orderCode, itemName, itemPrice, itemQuantity) VALUES ?';

        const valueOrderItem = 
        orderItems.map(item => 
            [
                item.orderCode,
                item.itemName,
                item.itemPrice,
                item.itemQuantity
            ]);

        await dbConnection.query(queryOrderItem, [valueOrderItem]);

        console.log('Batch insert order successful');
    } catch (error) {
        // Rollback the transaction if an error occurred
        console.error('Batch insert order failed');
        throw error;
    }
}

async function batchInsertCategory(dbConnection, categories, categoryRestaurant) {
    try {
        // Begin a transaction
        await dbConnection.beginTransaction();

        // Prepare the insert query
        const queryCategory = 
        'INSERT INTO CATEGORY (categoryName, categoryIMG) VALUES ?';

        // Format the data for batch insert
        const valueCategory = 
        categories.map(item => 
            [
                item.categoryName,
                item.categoryIMG
            ]);

        // Execute the batch insert query
        await dbConnection.query(queryCategory, [valueCategory]);

        // Prepare the insert query
        const queryCategoryRestaurant = 
        'INSERT INTO CATEGORY_RESTAURANT (categoryCode, restaurantCode) VALUES ?';

        const valueCategoryRestaurant = 
        categoryRestaurant.map(item => 
            [
                item.categoryCode,
                item.restaurantCode
            ]);

        await dbConnection.query(queryCategoryRestaurant, [valueCategoryRestaurant]);

        console.log('Batch insert category successful');
    } catch (error) {
        // Rollback the transaction if an error occurred
        console.error('Batch insert category failed:');
        throw error;
    }
}

module.exports = {batchInsertRestaurant, batchInsertCustomer, batchInsertOrder, batchInsertCategory}