class Restaurant {
    constructor(restaurantInformation) {
        this.restaurantCode = restaurantInformation.restaurantCode;
        this.restaurantEmail = restaurantInformation.restaurantEmail;
        this.restaurantName = restaurantInformation.restaurantName;
        this.restaurantDescription = restaurantInformation.restaurantDescription;
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

    static async insertRestaurant(restaurantEmail, restaurantPassword, restaurantName, restaurantDescription, restaurantPhone, restaurantABN, restaurantBanking, restaurantLocation, restaurantLat, restaurantLon, categories) {
        const {pool} = require('../Database.js');
        let connection = null;
        try {
            connection = await pool.getConnection();
            await connection.beginTransaction();

            const sql1 = 'INSERT INTO RESTAURANT'
            const sql2 = '(restaurantEmail, restaurantName, restaurantDescription, restaurantPhone, restaurantABN, restaurantBanking, restaurantLocation, restaurantLat, restaurantLon, restaurantTotalRating, restaurantTotalOrder, restaurantIMG, isActive)';
            const sql3 = 'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            const restaurantRegisterSQL = `${sql1} ${sql2} ${sql3}`;
            const restaurantRegisterSQLValue = [
                restaurantEmail, restaurantName, restaurantDescription, restaurantPhone, restaurantABN, restaurantBanking, restaurantLocation, restaurantLat, restaurantLon, 0, 0, "defaultRestaurant.png", true
            ];

            const restaurantRegisterResult = await connection.query(restaurantRegisterSQL, restaurantRegisterSQLValue);
            const restaurantCode = restaurantRegisterResult[0].insertId;
            
            const restaurantAuthenticationSQL = 'INSERT INTO RESTAURANT_AUTHENTICATION VALUES(?, ?)';
            const restaurantAuthenticationSQLValue = [restaurantEmail, restaurantPassword];
            await connection.query(restaurantAuthenticationSQL, restaurantAuthenticationSQLValue);

            for (let i = 0; i < categories.length; i++) {
                const categoryCode = parseInt(categories[i]);
                const sqlCategoryRestaurant = 'INSERT INTO CATEGORY_RESTAURANT VALUES(?, ?)';
                const sqlCategoryRestaurantValue = [categoryCode, restaurantCode];
                await connection.query(sqlCategoryRestaurant, sqlCategoryRestaurantValue);
            }

            await connection.commit();

            return restaurantCode;
        } catch (dbError) {
            if (connection !== null) {
                connection.rollback();
            }

            if (dbError.code !== undefined && dbError.code === 'ER_DUP_ENTRY') {
                const error = new Error("Restaurant Already Exist");
                error.status = 409;
                throw error; 
            } else {
                console.log("Error While Inserting Restaurant: " + dbError);
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

    static async getDBRestaurant(inputEmail, inputPassword) {
        const {pool} = require('../Database.js');
        try {
            const sql1 = 'SELECT RESTAURANT.restaurantCode, RESTAURANT.restaurantEmail, RESTAURANT.restaurantName, RESTAURANT.restaurantDescription, RESTAURANT.restaurantPhone,';
            const sql2 = 'RESTAURANT.restaurantABN, RESTAURANT.restaurantBanking, RESTAURANT.restaurantLocation, RESTAURANT.restaurantLat,'
            const sql3 = 'RESTAURANT.restaurantLon, RESTAURANT.restaurantTotalRating, RESTAURANT.restaurantTotalOrder, RESTAURANT.restaurantIMG, RESTAURANT.isActive';
            const sql4 = 'FROM RESTAURANT';
            const sql5 = 'JOIN RESTAURANT_AUTHENTICATION ON RESTAURANT.restaurantEmail = RESTAURANT_AUTHENTICATION.restaurantEmail';
            const sql6 = 'WHERE RESTAURANT_AUTHENTICATION.restaurantEmail = ? AND RESTAURANT_AUTHENTICATION.restaurantPassword = ?';

            const sql = `${sql1} ${sql2} ${sql3} ${sql4} ${sql5} ${sql6}`;
            const sqlValue = [inputEmail, inputPassword];

            const queryResult = await pool.query(sql, sqlValue);
            const restaurants = queryResult[0];
            return restaurants;
        } catch (dbError) {
            console.log("Error While Getting Restaurant From Database: " + dbError);
            const error = new Error("Internal Server Error");
            error.status = 500;
            throw error;
        }
    }

    static async getDBRestaurantByName(restaurantName) {
        const {pool} = require('../Database.js');
        try {
            const sql = 'SELECT * FROM RESTAURANT WHERE restaurantName = ?';
            const sqlValue = [restaurantName];
            const queryResult = await pool.query(sql, sqlValue);
            const restaurants = queryResult[0];
            return restaurants;
        } catch (dbError) {
            console.log("Error While Getting Restaurant From Database By Name: " + dbError);
            const error = new Error("Internal Server Error");
            error.status = 500;
            throw error;
        }
    }

    async setRestaurantEmail(restaurantEmail) {
        const {pool} = require('../Database.js');
        try {
            const sql = 'UPDATE RESTAURANT SET restaurantEmail = ? WHERE restaurantCode = ?';
            const sqlValue = [restaurantEmail, this.restaurantCode];

            const updateResult = await pool.query(sql, sqlValue);

            const affectedRows = updateResult[0].affectedRows;
            return affectedRows;
        } catch (dbError) {
            console.log("Error While Setting Restaurant Email: " + dbError);
            const error = new Error("Internal Server Error");
            error.status = 500;
            throw error;
        }
    }

    async setRestaurantPhone(restaurantPhone) {
        const {pool} = require('../Database.js');
        try {
            const sql = 'UPDATE RESTAURANT SET restaurantPhone = ? WHERE restaurantCode = ?';
            const sqlValue = [restaurantPhone, this.restaurantCode];

            const updateResult = await pool.query(sql, sqlValue);

            const affectedRows = updateResult[0].affectedRows;
            return affectedRows;
        } catch (dbError) {
            console.log("Error While Setting Restaurant Phone: " + dbError);
            const error = new Error("Internal Server Error");
            error.status = 500;
            throw error;
        }
    }

    async setRestaurantPassword(restaurantPassword) {
        const {pool} = require('../Database.js');
        try {
            const sql = 'UPDATE RESTAURANT_AUTHENTICATION SET restaurantPassword = ? WHERE restaurantEmail = ?';
            const sqlValue = [restaurantPassword, this.restaurantEmail];

            const updateResult = await pool.query(sql, sqlValue);

            const affectedRows = updateResult[0].affectedRows;
            return affectedRows;
        } catch (dbError) {
            console.log("Error While Setting Restaurant Password: " + dbError);
            const error = new Error("Internal Server Error");
            error.status = 500;
            throw error;
        }
    }

    async setRestaurantName(restaurantName) {
        const {pool} = require('../Database.js');
        try {
            const sql = 'UPDATE RESTAURANT SET restaurantName = ? WHERE restaurantCode = ?';
            const sqlValue = [restaurantName, this.restaurantCode];

            const updateResult = await pool.query(sql, sqlValue);

            const affectedRows = updateResult[0].affectedRows;
            return affectedRows;
        } catch (dbError) {
            console.log("Error While Setting Restaurant Name: " + dbError);
            const error = new Error("Internal Server Error");
            error.status = 500;
            throw error;
        }
    }

    async setRestaurantDescription(restaurantDescription) {
        const {pool} = require('../Database.js');
        try {
            const sql = 'UPDATE RESTAURANT SET restaurantDescription = ? WHERE restaurantCode = ?';
            const sqlValue = [restaurantDescription, this.restaurantCode];

            const updateResult = await pool.query(sql, sqlValue);

            const affectedRows = updateResult[0].affectedRows;
            return affectedRows;
        } catch (dbError) {
            console.log("Error While Setting Restaurant Description: " + dbError);
            const error = new Error("Internal Server Error");
            error.status = 500;
            throw error;
        }
    }

    async setRestaurantAddress(restaurantAddress, restaurantLat, restaurantLon) {
        const {pool} = require('../Database.js');
        try {
            const sql = 'UPDATE RESTAURANT SET restaurantLocation = ?, restaurantLat = ?, restaurantLon = ? WHERE restaurantCode = ?';
            const sqlValue = [restaurantAddress, restaurantLat, restaurantLon, this.restaurantCode];

            const updateResult = await pool.query(sql, sqlValue);

            const affectedRows = updateResult[0].affectedRows;
            return affectedRows;
        } catch (dbError) {
            console.log("Error While Setting Restaurant Address: " + dbError);
            const error = new Error("Internal Server Error");
            error.status = 500;
            throw error;
        }
    }

    async setRestaurantABN(restaurantABN) {
        const {pool} = require('../Database.js');
        try {
            const sql = 'UPDATE RESTAURANT SET restaurantABN = ? WHERE restaurantCode = ?';
            const sqlValue = [restaurantABN, this.restaurantCode];

            const updateResult = await pool.query(sql, sqlValue);

            const affectedRows = updateResult[0].affectedRows;
            return affectedRows;
        } catch (dbError) {
            console.log("Error While Setting Restaurant ABN: " + dbError);
            const error = new Error("Internal Server Error");
            error.status = 500;
            throw error;
        }
    }

    async setRestaurantBanking(restaurantBanking) {
        const {pool} = require('../Database.js');
        try {
            const sql = 'UPDATE RESTAURANT SET restaurantBanking = ? WHERE restaurantCode = ?';
            const sqlValue = [restaurantBanking, this.restaurantCode];

            const updateResult = await pool.query(sql, sqlValue);

            const affectedRows = updateResult[0].affectedRows;
            return affectedRows;
        } catch (dbError) {
            console.log("Error While Setting Restaurant Banking: " + dbError);
            const error = new Error("Internal Server Error");
            error.status = 500;
            throw error;
        }
    }

    async addItem(itemName, itemDescription, itemPrice) {
        const {pool} = require('../Database.js');
        try {
            const sql = 'INSERT INTO RESTAURANT_ITEM VALUES(?, ?, ?, ?, ?)';
            const sqlValue = [this.restaurantCode, itemName, itemDescription, itemPrice, "defaultItem.png"];

            await pool.query(sql, sqlValue);

            return 200;
        } catch (dbError) {
            if (dbError.code !== undefined && dbError.code === 'ER_DUP_ENTRY') {
                const error = new Error("Item Already Exist");
                error.status = 409;
                throw error; 
            } else {
                console.log("Error While Inserting Restaurant Item: " + dbError);
                const error = new Error("Internal Server Error");
                error.status = 500;
                throw error; 
            }
        }
    }

    async deleteItem(itemName) {
        const {pool} = require('../Database.js');
        try {
            const sql = 'DELETE FROM RESTAURANT_ITEM WHERE restaurantCode = ? AND itemName = ?';
            const sqlValue = [this.restaurantCode, itemName];

            const deleteResult = await pool.query(sql, sqlValue);

            const affectedRow = deleteResult[0].affectedRows;
            return affectedRow;
        } catch (dbError) {
            console.log("Error While Deleting Item: " + dbError);
            const error = new Error("Internal Server Error");
            error.status = 500;
            throw error; 
        }
    }

    async editItem(itemDescription, itemPrice, oldItemName) {
        const {pool} = require('../Database.js');
        try {
            const sql = 'UPDATE RESTAURANT_ITEM SET itemDescription = ?, itemPrice = ? WHERE restaurantCode = ? AND itemName = ?';
            const sqlValue = [itemDescription, itemPrice, this.restaurantCode, oldItemName];
            const updateResult = await pool.query(sql, sqlValue);
            const affectedRows = updateResult[0].affectedRows;

            return affectedRows;
        } catch (dbError) {
            if (dbError.code !== undefined && dbError.code === 'ER_DUP_ENTRY') {
                const error = new Error("Item With Same Attribute Already Exist");
                error.status = 409;
                throw error; 
            } else {
                console.log("Error While Editing Item: " + dbError);
                const error = new Error("Internal Server Error");
                error.status = 500;
                throw error; 
            }
        }
    }

    async getRestaurantItems() {
        try {
            const {pool} = require('../Database.js');
            const sql = "SELECT * FROM RESTAURANT_ITEM WHERE restaurantCode = ?";
            const sqlValue = [parseInt(this.restaurantCode)];
            const queryResult = await pool.query(sql, sqlValue);
            const restaurantItems = queryResult[0];
            return restaurantItems;
        } catch (dbError) {
            console.log("Error While Getting Restaurant Items: " + dbError);
            const error = new Error("Internal Server Error");
            error.status = 500;
            throw error;
        }
    }

    static async getRestaurantByKeyword(keyword, ratingLowerBound) {
        const {pool} = require('../Database.js');
        try {
            let sql1 = 'SELECT restaurantCode, restaurantName, restaurantDescription, restaurantIMG, restaurantLocation, restaurantLat, restaurantLon, COALESCE(NULLIF(ROUND((restaurantTotalRating / NULLIF(restaurantTotalOrder, 0)), 2), 0), 1) AS rating '
            let sql2 = 'FROM RESTAURANT WHERE isActive = true AND restaurantName LIKE ?';
            let sql = sql1 + sql2;
            let sqlValue = [`%${keyword}%`];

            if (ratingLowerBound !== undefined) {
                sql += ' AND COALESCE(NULLIF(ROUND((restaurantTotalRating / NULLIF(restaurantTotalOrder, 0)), 2), 0), 1) >= ?';
                sqlValue.push(ratingLowerBound);
            }

            const queryResult = await pool.query(sql, sqlValue);
            const restaurants = queryResult[0];
            return restaurants;
        } catch (dbError) {
            console.log("Error While Getting Restaurant By Keyword: " + dbError);
            const error = new Error("Internal Server Error");
            error.status = 500;
            throw error;
        }
    }

    static async getRestaurantByCategory(category, ratingLowerBound) {
        const {pool} = require('../Database.js');
        try {
            let sql1 = 'SELECT RESTAURANT.restaurantCode, RESTAURANT.restaurantName, RESTAURANT.restaurantDescription, RESTAURANT.restaurantIMG, RESTAURANT.restaurantLocation, RESTAURANT.restaurantLat, RESTAURANT.restaurantLon, COALESCE(NULLIF(ROUND((restaurantTotalRating / NULLIF(restaurantTotalOrder, 0)), 2), 0), 1) AS rating ';
            let sql2 = 'FROM CATEGORY ';
            let sql3 = 'JOIN CATEGORY_RESTAURANT ON CATEGORY.categoryCode = CATEGORY_RESTAURANT.categoryCode '
            let sql4 = 'JOIN RESTAURANT ON CATEGORY_RESTAURANT.restaurantCode = RESTAURANT.restaurantCode '
            let sql5 = 'WHERE RESTAURANT.isActive = true AND CATEGORY.categoryName = ?';

            let sql = sql1 + sql2 + sql3 + sql4 + sql5;
            let sqlValue = [category];

            if (ratingLowerBound !== undefined) {
                sql += ' AND COALESCE(NULLIF(ROUND((restaurantTotalRating / NULLIF(restaurantTotalOrder, 0)), 2), 0), 1) > ?';
                sqlValue.push(ratingLowerBound);
            }

            const queryResult = await pool.query(sql, sqlValue);
            const restaurants = queryResult[0];
            return restaurants;
        } catch (dbError) {
            console.log("Error While Getting Restaurants By Category: " + dbError);
            const error = new Error("Internal Server Error");
            error.status = 500;
            throw error;
        }
    }

    static async getCategories() {
        const {pool} = require('../Database.js');
        try {
            const sql = 'SELECT * FROM CATEGORY';
            const sqlValue = [];
            
            const queryResult = await pool.query(sql, sqlValue);
            const categories = queryResult[0];
            return categories;
        } catch (dbError) {
            console.log("Error While Getting Categories: " + dbError);
            const error = new Error("Internal Server Error");
            error.status = 500;
            throw error;
        }
    }
}

module.exports = Restaurant;