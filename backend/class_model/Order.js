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
        const {pool} = require('../Database.js');
        let connection = null;
        try {
            connection = await pool.getConnection();
            await connection.beginTransaction();

            const sql1 = 'INSERT INTO APP_ORDER VALUES(?,?,?,?,?,?,?,null,null,null,null,?,?,null)';
            const sqlValue1 = [customerCode, recipientName, recipientPhone, orderCode, restaurantCode, 1, orderLocation, orderDate, orderCost];

            const sql2 = 
            'INSERT INTO ORDER_ITEM(orderCode, itemName, itemPrice, itemQuantity) SELECT ?, CART_ITEM.itemName, CART_ITEM.itemPrice, CART_ITEM.itemQuantity FROM CART_ITEM WHERE cartCode = ?'
            const sqlValue2 = [orderCode, cartCode];

            const sql3 = 'DELETE FROM CUSTOMER_CART WHERE cartCode = ?'
            const sqlValue3 = [cartCode];

            await connection.query(sql1, sqlValue1);
            await connection.query(sql2, sqlValue2);
            await connection.query(sql3, sqlValue3);

            await connection.commit();

            return 200;
        } catch (dbError) {
            if (connection !== null) {
                await connection.rollback();
            }

            if (dbError.code !== undefined && dbError.code === 'ER_DUP_ENTRY') {
                const error = new Error("Order Code Already Exist");
                error.status = 409;
                throw error; 
            } else {
                console.log("Error While Inserting Order: " + dbError);
                const error = new Error("Internal Server Error");
                error.status = 500;
                throw error; 
            }
        } finally {
            if (connection !== null) {
                connection.release();
            }
        }
    }

    static async getDBOrder(orderCode, customerCode, restaurantCode) {
        const {pool} = require('../Database.js');
        try {
            let sql = "SELECT * FROM APP_ORDER WHERE orderCode = ?";
            let sqlValue = [orderCode];

            if (restaurantCode === null) {
                sql += " AND customerCode = ?";
                sqlValue.push(customerCode);
            }

            if (customerCode === null) {
                sql += " AND restaurantCode = ?";
                sqlValue.push(restaurantCode);
            }

            const queryResult = await pool.query(sql, sqlValue);
            const orders = queryResult[0];
            return orders;
        } catch (dbError) {
            console.log("Error While Getting Order From Database: " + dbError);
            const error = new Error("Internal Server Error");
            error.status = 500;
            throw error; 
        }
    }

    async getOrderItems() {
        const {pool} = require('../Database.js');
        try {
            let sql1 = 'SELECT itemName, itemPrice, itemQuantity, ROUND((itemPrice * itemQuantity),2) AS totalUnitPrice';
            let sql2 = 'FROM ORDER_ITEM';
            let sql3 = 'WHERE ORDER_ITEM.orderCode = ?';

            const sql = `${sql1} ${sql2} ${sql3}`;
            const sqlValue = [this.orderCode];

            const queryResult = await pool.query(sql, sqlValue);
            const orderItems = queryResult[0];
            return orderItems;
        } catch (dbError) {
            console.log("Error While Getting Order Item: " + dbError);
            const error = new Error("Internal Server Error");
            error.status = 500;
            throw error; 
        }
    }

    async setRatingReview(orderRating, orderReview) {
        if (this.orderStatus !== 2) {
            return Promise.reject(Object.assign(new Error("Forbidden"), { status: 403 }));
        }

        const {pool} = require('../Database.js');

        let connection = null;
        try {
            connection = await pool.getConnection();
            await connection.beginTransaction();

            const sql1 = 'UPDATE APP_ORDER SET orderStatus = ?, orderRating = ?, orderReview = ? WHERE orderCode = ?';
            const sqlValue1 = [3, orderRating, orderReview, this.orderCode];
            
            const sql2 = 'UPDATE RESTAURANT SET restaurantTotalRating = restaurantTotalRating + ?, restaurantTotalOrder = restaurantTotalOrder + 1 WHERE restaurantCode = ?';
            const sqlValue2 = [orderRating, this.restaurantCode];

            const sql1Result = await connection.query(sql1, sqlValue1);
            const sql2Result = await connection.query(sql2, sqlValue2);
            await connection.commit();

            return sql1Result[0].affectedRows + sql2Result[0].affectedRows;
        } catch (dbError) {
            if (connection !== null) {
                await connection.rollback();
            }

            console.log("Error While Setting Order Review: " + dbError);
            const error = new Error("Internal Server Error");
            error.status = 500;
            throw error;
        } finally {
            if (connection !== null) {
                connection.release();
            }
        }
    }

    async setAcceptStatus(restaurantName, restaurantPhone) {
        if (this.orderStatus !== 1) {
            return Promise.reject(Object.assign(new Error("Forbidden"), { status: 403 }));
        }

        const {pool} = require('../Database.js');

        try {
            const sql = 'UPDATE APP_ORDER SET orderStatus = 2, courierName = ?, courierPhone = ? WHERE orderCode = ?';
            const sqlValue = [(restaurantName + " Courier"), restaurantPhone, this.orderCode];

            const updateResult = await pool.query(sql, sqlValue);

            const affectedRows = updateResult[0].affectedRows;

            return affectedRows;
        } catch(dbError) {
            console.log("Error While Accepting Order: " + dbError);
            const error = new Error("Internal Server Error");
            error.status = 500;
            throw error;
        }
    }

    async setRejectStatus(rejectReason) {
        if (this.orderStatus !== 1) {
            return Promise.reject(Object.assign(new Error("Forbidden"), { status: 403 }));
        }

        const {pool} = require('../Database.js');

        try {
            const sql = 'UPDATE APP_ORDER SET orderStatus = 0, rejectReason = ? WHERE orderCode = ?';
            const sqlValue = [rejectReason, this.orderCode];

            const updateResult = await pool.query(sql, sqlValue);

            const affectedRows = updateResult[0].affectedRows;

            return affectedRows;
        } catch(dbError) {
            console.log("Error While Rejecting Order: " + dbError);
            const error = new Error("Internal Server Error");
            error.status = 500;
            throw error;
        }
    }

    async deleteOrder(customerCode) {
        if (this.orderStatus !== 1) {
            return Promise.reject(Object.assign(new Error("Forbidden"), { status: 403 }));
        }

        const {pool} = require('../Database.js');
        try {
            const sql = 'DELETE FROM APP_ORDER WHERE orderCode = ? AND customerCode = ?';
            const sqlValue = [this.orderCode, customerCode];
            const deleteResult = await pool.query(sql, sqlValue);

            const affectedRows = deleteResult[0].affectedRows;
            return affectedRows;
        } catch (dbError) {
            console.log("Error While Deleting Order: " + dbError);
            const error = new Error("Internal Server Error");
            error.status = 500;
            throw error;
        }
    }

    static async getIncomingOrders(restaurantCode) {
        const {pool} = require('../Database.js');
        try {
            let sql = "SELECT * FROM APP_ORDER WHERE restaurantCode = ? AND orderStatus IN (1)";
            let sqlValue = [restaurantCode];

            const queryResult = await pool.query(sql, sqlValue);
            const orders = queryResult[0];

            return orders;
        }
        catch (dbError) {
            console.log("Error While Getting Incoming Orders: " + dbError);
            const error = new Error("Internal Server Error");
            error.status = 500;
            throw error; 
        }
    }

    static async getActiveOrders(customerCode, restaurantCode) {
        const {pool} = require('../Database.js');
        try {
            let sql = "SELECT * FROM APP_ORDER";
            let sqlValue = [];
    
            if (restaurantCode === null) {
                sql += " WHERE customerCode = ? AND orderStatus IN (1,2)";
                sqlValue.push(customerCode);
            }
    
            if (customerCode === null) {
                sql += " WHERE restaurantCode = ? AND orderStatus IN (2)";
                sqlValue.push(restaurantCode);
            }

            const queryResult = await pool.query(sql, sqlValue);
            const activeOrders = queryResult[0]

            return activeOrders;
        }
        catch (dbError) {
            console.log("Error While Getting Active Orders: " + dbError);
            const error = new Error("Internal Server Error");
            error.status = 500;
            throw error; 
        }
    }

    static async getPastOrders(customerCode, restaurantCode) {
        const {pool} = require('../Database.js');
        try {
            let sql = "SELECT * FROM APP_ORDER";
            let sqlValue = [];
    
            if (restaurantCode === null) {
                sql += " WHERE customerCode = ? AND orderStatus IN (0, 3, 4)";
                sqlValue.push(customerCode);
            }
    
            if (customerCode === null) {
                sql += " WHERE restaurantCode = ? AND orderStatus IN (3, 4)";
                sqlValue.push(restaurantCode);
            }

            const queryResult = await pool.query(sql, sqlValue);
            const pastOrders = queryResult[0]

            return pastOrders;
        }
        catch (dbError) {
            console.log("Error While Getting Past Orders: " + dbError);
            const error = new Error("Internal Server Error");
            error.status = 500;
            throw error; 
        }
    }

    static async getOrdersByTimeline(restaurantCode, startDate, endDate) {
        const {pool} = require('../Database.js');
        try {
            const sql = 
            "SELECT * FROM APP_ORDER WHERE restaurantCode = ? AND orderStatus = 3 AND orderDate >= ? AND orderDate <= ?";
            const sqlValue = [restaurantCode, startDate, endDate];

            const queryResult = await pool.query(sql, sqlValue);
            const orders = queryResult[0];
            return orders;
        } catch (dbError) {
            console.log("Error While Getting Orders By Timeline: " + dbError);
            const error = new Error("Internal Server Error");
            error.status = 500;
            throw error; 
        }
    }
}

module.exports = Order;