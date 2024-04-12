const Restaurant = require('../class_model/Restaurant.js');
const ModuleLocation = require('./ModuleLocation.js');
const ModuleTime = require('./ModuleTime.js');
const Order = require('../class_model/Order.js');

class ServiceRestaurant {
    constructor() {
        this.aRestaurant = null;
    }

    async registerRestaurant(restaurantEmail, restaurantPassword, restaurantName, restaurantPhone, restaurantABN, restaurantBanking, restaurantLocation, restaurantLat, restaurantLon, categories) {
        try {
            const restaurantCode = await Restaurant.insertRestaurant(restaurantEmail, restaurantPassword, restaurantName, restaurantPhone, restaurantABN, restaurantBanking, restaurantLocation, restaurantLat, restaurantLon, categories);
            return restaurantCode;
        } catch (error) {
            throw error;
        }
    }

    async authenticateOwner(restaurantEmail, restaurantPassword) {
        try {
            const restaurants = await Restaurant.getDBRestaurant(restaurantEmail, restaurantPassword);

            if (restaurants.length === 0) {
                const error = new Error("Unauthorized");
                error.status = 401;
                return Promise.reject(error);
            }

            const authorizedOwner = restaurants[0];
            this.aRestaurant = new Restaurant(authorizedOwner);
        } catch (error) {
            throw error;
        }
    }

    getRestaurantInformation() {
        return {
            restaurantCode: this.aRestaurant.restaurantCode,
            restaurantEmail: this.aRestaurant.restaurantEmail,
            restaurantName: this.aRestaurant.restaurantName,
            restaurantPhone: this.aRestaurant.restaurantPhone,
            restaurantABN: this.aRestaurant.restaurantABN,
            restaurantBanking: this.aRestaurant.restaurantBanking,
            restaurantLocation: this.aRestaurant.restaurantLocation,
            restaurantLat: this.aRestaurant.restaurantLat,
            restaurantLon: this.aRestaurant.restaurantLon,
            restaurantTotalRating: this.aRestaurant.restaurantTotalRating,
            restaurantTotalOrder: this.aRestaurant.restaurantTotalOrder,
            restaurantIMG: this.aRestaurant.restaurantIMG,
            isActive: this.aRestaurant.isActive
        }
    }

    getRestaurantPublicInformation() {
        let restaurantRating = 0;
        const restaurantTotalRating = parseInt(this.aRestaurant.restaurantTotalRating);
        const restaurantTotalOrder = parseInt(this.aRestaurant.restaurantTotalOrder);

        if (restaurantTotalOrder !== 0) {
            restaurantRating = (restaurantTotalRating / restaurantTotalOrder).toFixed(2);
        }

        return {
            restaurantCode: this.aRestaurant.restaurantCode,
            restaurantName: this.aRestaurant.restaurantName,
            restaurantPhone: this.aRestaurant.restaurantLocation,
            restaurantLocation: this.aRestaurant.restaurantLocation,
            restaurantLat: this.aRestaurant.restaurantLat,
            restaurantLon: this.aRestaurant.restaurantLon,
            restaurantRating: restaurantRating,
            restaurantIMG: this.aRestaurant.restaurantIMG
        }
    }

    async setRestaurantInformation(email, phone, password, name, address, lat, lon, abn, banking) {
        try {
            let affectedRows = 0;

            if (email !== null) {
                affectedRows = await this.aRestaurant.setRestaurantEmail(email);
            } else if (phone !== null) {
                affectedRows = await this.aRestaurant.setRestaurantPhone(phone);
            } else if (password !== null) {
                affectedRows = await this.aRestaurant.setRestaurantPassword(password);
            } else if (name !== null) {
                affectedRows = await this.aRestaurant.setRestaurantName(name);
            } else if (address !== null && lat !== null && lon !== null) {
                affectedRows = await this.aRestaurant.setRestaurantAddress(address, lat, lon);
            } else if (abn !== null) {
                affectedRows = await this.aRestaurant.setRestaurantABN(abn);
            } else if (banking !== null) {
                affectedRows = await this.aRestaurant.setRestaurantBanking(banking);
            }

            if (affectedRows === 0) {
                const error = new Error("Forbidden");
                error.status = 403;
                return Promise.reject(error);
            }

            return 200;
        } catch (error) {
            throw error;
        }
    }

    async addRestaurantItem(itemName, itemPrice) {
        try {
            await this.aRestaurant.addItem(itemName, itemPrice);
            return;
        } catch (error) {
            throw error;
        }
    }

    async deleteRestaurantItem(itemName) {
        try {
            const affectedRows = await this.aRestaurant.deleteItem(itemName);
            if (affectedRows === 0) {
                return Promise.reject(Object.assign(new Error("Forbidden"), { status: 403 }));
            }
            return;
        } catch (error) {
            throw error;
        }
    }

    async editRestaurantItem(newItemName, itemPrice, oldItemName) {
        try {
            const affectedRows = await this.aRestaurant.editItem(newItemName, itemPrice, oldItemName);
            if (affectedRows === 0) {
                return Promise.reject(Object.assign(new Error("Forbidden"), { status: 403 }));
            }
            return;
        } catch (error) {
            throw error;
        }
    }

    async getRestaurantIncomingOrders() {
        const moduleTime = new ModuleTime();
        try {
            const incomingOrders = await Order.getIncomingOrders(this.aRestaurant.restaurantCode);
            for (let i = 0; i < incomingOrders.length; i++) {
                const orderDate = moduleTime.convertDate(incomingOrders[i].orderDate);
                incomingOrders[i].orderDate = orderDate;
            }
            return incomingOrders;
        } catch (error) {
            throw error;
        }
    }

    async getRestaurantActiveOrders() {
        const moduleTime = new ModuleTime();
        try {
            const activeOrders = await Order.getActiveOrders(null, this.aRestaurant.restaurantCode);
            for (let i = 0; i < activeOrders.length; i++) {
                const orderDate = moduleTime.convertDate(activeOrders[i].orderDate);
                activeOrders[i].orderDate = orderDate;
            }
            return activeOrders;
        } catch (error) {
            throw error
        }
    }

    async getRestaurantPastOrders() {
        const moduleTime = new ModuleTime();
        try {
            const pastOrders = await Order.getPastOrders(null, this.aRestaurant.restaurantCode);
            for (let i = 0; i < pastOrders.length; i++) {
                const orderDate = moduleTime.convertDate(pastOrders[i].orderDate);
                pastOrders[i].orderDate = orderDate;
            }
            return pastOrders;
        } catch (error) {
            throw error
        }
    }

    async restaurantViewOrder(orderCode) {
        try {
            const orders = await Order.getDBOrder(orderCode, null, this.aRestaurant.restaurantCode);
            if (orders.length === 0) {
                return Promise.reject(Object.assign(new Error("Unauthorized"), { status: 401 }));
            }

            const aunthenticatedOrder = orders[0];
            const anOrder = new Order(aunthenticatedOrder);
            const orderItems = await anOrder.getOrderItems();

            return ({
                orderInformation: aunthenticatedOrder,
                orderItems: orderItems
            });
        } catch (error) {
            throw error;
        }
    }

    async restaurantAcceptsOrder(orderCode) {
        try {
            const orders = await Order.getDBOrder(orderCode, null, this.aRestaurant.restaurantCode);
            if (orders.length === 0) {
                return Promise.reject(Object.assign(new Error("Unauthorized"), { status: 401 }));
            }

            const aunthenticatedOrder = orders[0];
            const anOrder = new Order(aunthenticatedOrder);
            const affectedRows = await anOrder.setAcceptStatus(this.aRestaurant.restaurantName, this.aRestaurant.restaurantPhone);

            if (affectedRows === 0) {
                return Promise.reject(Object.assign(new Error("Forbidden"), { status: 403 }));
            }

            return;
        } catch (error) {
            throw error;
        }
    }

    async restaurantRejectsOrder(orderCode, rejectReason) {
        try {
            const orders = await Order.getDBOrder(orderCode, null, this.aRestaurant.restaurantCode);
            if (orders.length === 0) {
                return Promise.reject(Object.assign(new Error("Unauthorized"), { status: 401 }));
            }

            const aunthenticatedOrder = orders[0];
            const anOrder = new Order(aunthenticatedOrder);
            const affectedRows = await anOrder.setRejectStatus(rejectReason);

            if (affectedRows === 0) {
                return Promise.reject(Object.assign(new Error("Forbidden"), { status: 403 }));
            }

            return;
        } catch (error) {
            throw error;
        }
    }

    async restaurantViewOrderRevenueStatus(startDate, endDate) {
        try {
            const orders = await Order.getOrdersByTimeline(this.aRestaurant.restaurantCode, startDate, endDate);

            let totalRevenue = 0;
            const completedOrders = orders.length;

            for (let i = 0; i < completedOrders; i++) {
                totalRevenue += parseFloat(orders[i].orderCost)
            }

            return ({
                completedOrders: completedOrders,
                totalRevenue: totalRevenue
            })
        } catch (error) {
            throw error;
        }
    }

    static filterRestaurant(dbRestaurants, radius, cusLat, cusLon) {
        const moduleLocation = new ModuleLocation();
        let distanceFilteredRestaurants = []
        for (let i = 0; i < dbRestaurants.length; i++) {
          let dbLat = dbRestaurants[i].restaurantLat;
          let dbLon = dbRestaurants[i].restaurantLon;
          let distance = moduleLocation.haversine(cusLat, cusLon, parseFloat(dbLat), parseFloat(dbLon));
          if (distance <= radius) {
            distanceFilteredRestaurants.push(dbRestaurants[i]);
          }
        }
      
        return distanceFilteredRestaurants;
    }

    async getRestaurants(keyword, category, ratingLowerBound, radius, cusLat, cusLon) {
        try {
            let restaurants;

            if (keyword !== null) {
                restaurants = await Restaurant.getRestaurantByKeyword(keyword, ratingLowerBound);
            } else if (category !== null) {
                restaurants = await Restaurant.getRestaurantByCategory(category, ratingLowerBound);
            }

            if (radius !== undefined && cusLat !== undefined && cusLon !== undefined) {
                const filterRestaurants = ServiceRestaurant.filterRestaurant(restaurants, radius, cusLat, cusLon);
                restaurants = filterRestaurants;
            }

            return restaurants;
        } catch (error) {
            throw error;
        }
    }

    async getRestaurantCategories() {
        try {
            const categories = await Restaurant.getCategories();
            return categories;
        } catch (error) {
            throw error;
        }
    }

    async getRestaurantMenuItems() {
        try {
            const restaurantItems = await this.aRestaurant.getRestaurantItems();
            return restaurantItems;
        }
        catch (error) {
            throw error;
        }
    }

    async getRestaurantMenu(restaurantName) {
        try {
            const restaurants = await Restaurant.getDBRestaurantByName(restaurantName);
            if (restaurants.length === 0) {
                const error = new Error("Unavailable");
                error.status = 404;
                return Promise.reject(error);
            }

            this.aRestaurant = new Restaurant(restaurants[0]);
            const restaurantItems = await this.getRestaurantMenuItems();

            const restaurantInformation = this.getRestaurantPublicInformation();

            return ({
                restaurantInformation: restaurantInformation,
                restaurantItems: restaurantItems
            })
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ServiceRestaurant;