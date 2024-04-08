class Cart {
    constructor(customerCode, restaurantCode, cartCode) {
        this.customerCode = customerCode;
        this.restaurantCode = restaurantCode;
        this.cartCode = cartCode;
    }

    static async insertCart(customerCode, restaurantCode, cartCode) {
        const {pool} = require('../Database.js');
        try {
            const sql = "INSERT INTO CUSTOMER_CART VALUES(?, ?, ?)";
            const sqlValue = [customerCode, restaurantCode, cartCode];

            await pool.query(sql, sqlValue);
            return 200;
        } catch (dbError) {
            if (dbError.code !== undefined && dbError.code === 'ER_DUP_ENTRY') {
                const error = new Error("Customer Already Exist");
                error.status = 409;
                throw error; 
            } else {
                console.log("Error When Inserting Cart");
                console.log(dbError);
                const error = new Error("Internal Server Error");
                error.status = 500;
                throw error;
            }
        }
    }

    async getCartLinkedRestaurant() {
        const {pool} = require('../Database.js');
        try {
            const sql1 = 'SELECT RESTAURANT.restaurantCode, RESTAURANT.restaurantName, RESTAURANT.restaurantLat, RESTAURANT.restaurantLon';
            const sql2 = 'FROM CUSTOMER_CART JOIN RESTAURANT ON CUSTOMER_CART.restaurantCode = RESTAURANT.restaurantCode';
            const sql3 = 'WHERE cartCode = ?';
            const sql = `${sql1} ${sql2} ${sql3}`
            const sqlValue = [this.cartCode];

            const queryResult = await pool.query(sql, sqlValue);
            const restaurants = queryResult[0];
            return restaurants;
        } catch (dbError) {
            console.log("Error When Getting Cart Linked Restaurant");
            console.log(dbError)
            const error = new Error("Internal Server Error");
            error.status = 500;
            throw error; 
        }
    }

    async getItem(itemName) {
        const {pool} = require('../Database.js');
        try {
            let sql1 = 'SELECT RESTAURANT_ITEM.restaurantCode, RESTAURANT_ITEM.itemName, CART_ITEM.itemPrice, CART_ITEM.itemQuantity, ROUND((CART_ITEM.itemPrice * CART_ITEM.itemQuantity),2) AS totalUnitPrice, RESTAURANT_ITEM.itemIMG '
            let sql2 = 'FROM CART_ITEM ' 
            let sql3 = 'JOIN CUSTOMER_CART ON CART_ITEM.cartCode = CUSTOMER_CART.cartCode '
            let sql4 = 'JOIN RESTAURANT_ITEM ON CUSTOMER_CART.restaurantCode = RESTAURANT_ITEM.restaurantCode AND CART_ITEM.itemName = RESTAURANT_ITEM.itemName '
            let sql5 = 'WHERE CART_ITEM.cartCode = ?';

            let sql = sql1 + sql2 + sql3 + sql4 + sql5;

            let sqlValue = [this.cartCode];

            if (itemName !== null) {
                sql += " AND CART_ITEM.itemName = ?";
                sqlValue.push(itemName);
            }

            const queryResult = await pool.query(sql, sqlValue);

            const items = queryResult[0];

            return items;
        } catch (dbError) {
            console.log("Error When Getting Cart Items: " + dbError);
            const error = new Error("Internal Server Error");
            error.status = 500;
            throw error; 
        }
    }

    async addItem(itemName, itemPrice, itemExisted) {
        const {pool} = require('../Database.js');
        try {
            let sql = "";
            let sqlValue = [];

            if (itemExisted === false) {
                sql = "INSERT INTO CART_ITEM VALUES (?, ?, ?, ?)";
                sqlValue = [this.cartCode, itemName, itemPrice, 1];
            }

            if (itemExisted === true) {
                sql = "UPDATE CART_ITEM SET itemQuantity = itemQuantity + 1 WHERE cartCode = ? AND itemName = ?";
                sqlValue = [this.cartCode, itemName];
            }

            await pool.query(sql, sqlValue);

            return 200;
        } catch (dbError) {
            if (dbError.code !== undefined && dbError.code === 'ER_DUP_ENTRY') {
                const error = new Error("Item Already Exist In Cart");
                error.status = 409;
                throw error; 
            } else {
                console.log("Error When Inserting Cart");
                console.log(dbError);
                const error = new Error("Internal Server Error");
                error.status = 500;
                throw error;
            }
        }
    }

    async modifyItem(itemName, itemQuantity) {
        const {pool} = require('../Database.js');
        try {
            let sql = '';
            let sqlValue = [];

            if (itemQuantity > 0) {
                sql = "UPDATE CART_ITEM SET itemQuantity = ? WHERE cartCode = ? AND itemName = ?";
                sqlValue = [itemQuantity, this.cartCode, itemName];
            }

            if (itemQuantity === 0) {
                sql = "DELETE FROM CART_ITEM WHERE cartCode = ? AND itemName = ?";
                sqlValue = [this.cartCode, itemName];
            }

            const updateResult = await pool.query(sql,sqlValue);
            const affectedRows = updateResult[0].affectedRows;
            return affectedRows;
        } catch (dbError) {
            console.log("Error When Modifying Cart Item");
            console.log(dbError);
            const error = new Error("Internal Server Error");
            error.status = 500;
            throw error;
        }
    }

    async deleteCart(customerCode) {
        const {pool} = require('../Database.js');
        try {
            const sql = 'DELETE FROM CUSTOMER_CART WHERE customerCode = ? AND cartCode = ?'
            const sqlValue = [customerCode, this.cartCode];

            const deleteResult = await pool.query(sql, sqlValue);
            const affectedRows = deleteResult[0].affectedRows;

            return affectedRows;
        } catch (dbError) {
            console.log("Error While Deleting Cart");
            console.log(dbError);
            const error = new Error("Internal Server Error");
            error.status = 500;
            throw error;
        }
    }
}

module.exports = Cart;