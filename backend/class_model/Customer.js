class Customer {
    constructor(customerInformation) {
        this.customerCode = customerInformation.customerCode
        this.customerEmail = customerInformation.customerEmail;
        this.customerName = customerInformation.customerName;
        this.customerPhone = customerInformation.customerPhone;
        this.isActive = customerInformation.isActive;
    }

    static async insertCustomer(customerEmail, customerName, customerPhone, customerPassword) {
        const {pool} = require('../Database.js');
        let connection = null;
        try {
            connection = await pool.getConnection();
            await connection.beginTransaction();

            const sqlRegisterCustomer = 'INSERT INTO CUSTOMER (customerEmail, customerName, customerPhone, isActive) VALUES(?, ?, ?, ?)';
            const sqlRegisterCustomerValue = [customerEmail, customerName, customerPhone, true];
            const customerRegisterResult = await connection.query(sqlRegisterCustomer, sqlRegisterCustomerValue);

            const sqlRegisterAuthentication = 'INSERT INTO CUSTOMER_AUTHENTICATION (customerEmail, customerPassword) VALUES(?, ?)'
            const sqlRegisterAuthenticationValue = [customerEmail, customerPassword];
            await connection.query(sqlRegisterAuthentication, sqlRegisterAuthenticationValue);

            const sqlRegisterMembership = 'INSERT INTO MEMBERSHIP (customerCode, membershipType, membershipEnd) VALUES(?, ?, ?)'
            const sqlRegisterMembersipValue = [customerRegisterResult[0].insertId, null, null];
            await connection.query(sqlRegisterMembership, sqlRegisterMembersipValue);
            
            connection.commit();
            connection = null;

            return customerRegisterResult[0].insertId;
        } catch (dbError) {
            if (connection !== null) {
                connection.rollback();
            }

            if (dbError.code !== undefined && dbError.code === 'ER_DUP_ENTRY') {
                const error = new Error("Customer Already Exist");
                error.status = 409;
                throw error; 
            } else {
                console.log("Error While Inserting Customer: " + dbError);
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

    static async getDBCustomer(inputEmail, inputPassword) {
        const {pool} = require('../Database.js');
        try {
            const sql1 = "SELECT CUSTOMER.customerCode, CUSTOMER.customerEmail, CUSTOMER.customerName, CUSTOMER.customerPhone, CUSTOMER.isActive, CUSTOMER_CART.restaurantCode, CUSTOMER_CART.cartCode, MEMBERSHIP.membershipType, MEMBERSHIP.membershipEnd "
            const sql2 = "FROM CUSTOMER JOIN CUSTOMER_AUTHENTICATION ON CUSTOMER.customerEmail = CUSTOMER_AUTHENTICATION.customerEmail "
            const sql3 = "JOIN MEMBERSHIP ON CUSTOMER.customerCode = MEMBERSHIP.customerCode ";
            const sql4 = "LEFT JOIN CUSTOMER_CART ON CUSTOMER.customerCode = CUSTOMER_CART.customerCode "
            const sql5 = "WHERE CUSTOMER_AUTHENTICATION.customerEmail = ? AND CUSTOMER_AUTHENTICATION.customerPassword = ?";

            const sql = sql1 + sql2 + sql3 + sql4 + sql5;

            const sqlValue = [inputEmail, inputPassword];

            const queryResult = await pool.query(sql,sqlValue);

            const customers = queryResult[0];

            return customers;
        } catch (dbError) {
            console.log("Error When Getting DB Customer: " + dbError);
            const error = new Error("Internal Server Error");
            error.status = 500;
            throw error; 
        }
    }

    async setEmail(newEmail) {
        const {pool} = require('../Database.js');
        try {
            const sql = 'UPDATE CUSTOMER SET customerEmail = ? WHERE customerCode = ?';
            const sqlValue = [newEmail, this.customerCode];

            const updateResult = await pool.query(sql, sqlValue);

            if (updateResult[0].affectedRows === 0) {
                const error = new Error("Forbidden");
                error.status = 403;
                return Promise.reject(error);
            }

            return 200;
        }
        catch(dbError) {
            console.log("Error When Updating Customer Email: " + dbError);
            const error = new Error("Internal Server Error");
            error.status = 500;
            throw error;
        }
    }

    async setName(newName) {
        const {pool} = require('../Database.js');
        try {
            const sql = 'UPDATE CUSTOMER SET customerName = ? WHERE customerCode = ?';
            const sqlValue = [newName, this.customerCode];

            const updateResult = await pool.query(sql, sqlValue);

            if (updateResult[0].affectedRows === 0) {
                const error = new Error("Forbidden");
                error.status = 403;
                return Promise.reject(error);
            }

            return 200;
        }
        catch(dbError) {
            console.log("Error When Updating Customer Name: " + dbError);
            const error = new Error("Internal Server Error");
            error.status = 500;
            throw error;
        }
    }

    async setPhone(newPhone) {
        const {pool} = require('../Database.js');
        try {
            const sql = 'UPDATE CUSTOMER SET customerPhone = ? WHERE customerCode = ?';
            const sqlValue = [newPhone, this.customerCode];

            const updateResult = await pool.query(sql, sqlValue);

            if (updateResult[0].affectedRows === 0) {
                const error = new Error("Forbidden");
                error.status = 403;
                return Promise.reject(error);
            }

            return 200;
        }
        catch(dbError) {
            console.log("Error When Updating Customer Phone: " + dbError);
            const error = new Error("Internal Server Error");
            error.status = 500;
            throw error;
        }
    }

    async setPassword(newPassword) {
        const {pool} = require('../Database.js');
        try {
            const sql = 'UPDATE CUSTOMER_AUTHENTICATION SET customerPassword = ? WHERE customerEmail = ?';
            const sqlValue = [newPassword, this.customerEmail];

            const updateResult = await pool.query(sql, sqlValue);

            if (updateResult[0].affectedRows === 0) {
                const error = new Error("Forbidden");
                error.status = 403;
                return Promise.reject(error);
            }

            return 200;
        }
        catch(dbError) {
            console.log("Error When Updating Customer Password: " + dbError);
            const error = new Error("Internal Server Error");
            error.status = 500;
            throw error;
        }
    }

    async getPaymentMethods() {
        const {pool} = require('../Database.js');
        try {
            const sql = 'SELECT paymentCode, cardNumber FROM CUSTOMER_PAYMENT WHERE customerCode = ?';
            const sqlValue = [this.customerCode];

            const queryResult = await pool.query(sql, sqlValue);
            const customerPaymentMethods = queryResult[0];
            return customerPaymentMethods;
        } catch (dbError) {
            console.log("Error When Updating Customer Password: " + dbError);
            const error = new Error("Internal Server Error");
            error.status = 500;
            throw error;
        }
    }

    async addPaymentMethods(cardNumber, cardOwner, cardExpMonth, cardExpYear) {
        const {pool} = require('../Database.js');
        try {
            const sql = 'INSERT INTO CUSTOMER_PAYMENT (customerCode, cardNumber, cardOwner, cardExpMonth, cardExpYear) VALUES (?, ?, ?, ?, ?)';
            const sqlValue = [this.customerCode, cardNumber, cardOwner, cardExpMonth, cardExpYear];

            const insertResult = await pool.query(sql, sqlValue);

            if (insertResult[0].affectedRows === 0) {
                const error = new Error("Forbidden");
                error.status = 403;
                return Promise.reject(error);
            }
            return;
        } catch (dbError) {
            if (dbError.code !== undefined && dbError.code === 'ER_DUP_ENTRY') {
                const error = new Error("Customer Already Exist");
                error.status = 409;
                throw error; 
            } else {
                console.log("Error While Inserting Customer: " + dbError);
                const error = new Error("Internal Server Error");
                error.status = 500;
                throw error; 
            }
        }
    }

    async deletePaymentMethods(paymentCode) {
        const {pool} = require('../Database.js');
        try {
            const sql = 'DELETE FROM CUSTOMER_PAYMENT WHERE paymentCode = ? AND customerCode = ?';
            const sqlValue = [paymentCode, this.customerCode];

            const deleteResult = await pool.query(sql, sqlValue);

            if (deleteResult[0].affectedRows === 0) {
                const error = new Error("Forbidden");
                error.status = 403;
                return Promise.reject(error);
            }
            return;
        } catch (dbError) {
            console.log("Error When Deleting Payment Method: " + dbError);
            const error = new Error("Internal Server Error");
            error.status = 500;
            throw error; 
        }
    }
}

module.exports = Customer;