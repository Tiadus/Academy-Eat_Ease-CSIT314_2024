class Membership {
    constructor(membershipInformation) {
        this.customerCode = membershipInformation.customerCode;
        this.membershipType = membershipInformation.membershipType;
        this.membershipEnd = membershipInformation.membershipEnd;
    }

    async subscribeMembership(membershipType, membershipEnd) {
        const {pool} = require('../Database.js');
        try {
            const sql = "UPDATE MEMBERSHIP SET membershipType = ?, membershipEnd = ? WHERE customerCode = ?";
            const sqlValue = [membershipType, membershipEnd, this.customerCode];

            const updateResult = await pool.query(sql, sqlValue);

            if (updateResult[0].affectedRows === 0) {
                const error = new Error("Forbidden");
                error.status = 403;
                return Promise.reject(error);
            }

            return 200;
        } catch(dbError) {
            console.log("Error When Subscribing Customer Membership: " + dbError);
            const error = new Error("Internal Server Error");
            error.status = 500;
            throw error;
        }
    }

    async renewMembership(extendedDate) {
        const {pool} = require('../Database.js');
        try {
            const sql = "UPDATE MEMBERSHIP SET membershipEnd = ? WHERE customerCode = ?";
            const sqlValue = [extendedDate, this.customerCode];

            const updateResult = await pool.query(sql, sqlValue);

            if (updateResult[0].affectedRows === 0) {
                const error = new Error("Forbidden");
                error.status = 403;
                return Promise.reject(error);
            }

            return 200;
        } catch(dbError) {
            console.log("Error When Renewing Customer Membership: " + dbError);
            const error = new Error("Internal Server Error");
            error.status = 500;
            throw error;
        }
    }

    async cancelMembership() {
        const {pool} = require('../Database.js');
        try {
            const sql = "UPDATE MEMBERSHIP SET membershipType = ? WHERE customerCode = ?";
            const sqlValue = [null, this.customerCode];

            const updateResult = await pool.query(sql, sqlValue);

            if (updateResult[0].affectedRows === 0) {
                const error = new Error("Forbidden");
                error.status = 403;
                return Promise.reject(error);
            }

            return 200;
        } catch(dbError) {
            console.log("Error When Canceling Customer Membership: " + dbError);
            const error = new Error("Internal Server Error");
            error.status = 500;
            throw error;
        }
    }
}

module.exports = Membership