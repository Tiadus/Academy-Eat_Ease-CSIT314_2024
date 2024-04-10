const Cart = require('../class_model/Cart.js');
const Customer = require('../class_model/Customer.js');
const Order = require('../class_model/Order.js');
const Membership = require('../class_model/Membership.js');
const ModuleLocation = require('./ModuleLocation.js');
const ModuleTime = require('./ModuleTime.js');

class ServiceCustomer {
    constructor() {
        this.aCustomer = null;
        this.aCart = null;
        this.membership = null;
    }

    async registerCustomer(customerEmail, customerName, customerPhone, customerPassword) {
        try {
            const newCustomerCode = await Customer.insertCustomer(customerEmail, customerName, customerPhone, customerPassword);
            return newCustomerCode;
        } catch (error) {
            throw error;
        }
    }

    async authenticateCustomer(inputEmail, inputPassword) {
        const moduleTime = new ModuleTime();
        try {
            const customers = await Customer.getDBCustomer(inputEmail, inputPassword);

            if (customers.length === 0) {
                const error = new Error("Unauthorized");
                error.status = 401;
                return Promise.reject(error);
            }

            const authorizedCustomer = customers[0];
            const membershipType = authorizedCustomer.membershipType;
            const membershipEnd = authorizedCustomer.membershipEnd;
            if (membershipType !== null) {
                authorizedCustomer.membershipEnd = parseInt(membershipType);
            }
            if (membershipEnd !== null) {
                authorizedCustomer.membershipEnd = moduleTime.convertDate(membershipEnd);
            }
            this.aCustomer = new Customer(authorizedCustomer);
            if (authorizedCustomer.cartCode !== null) {
                this.aCart = new Cart(authorizedCustomer.customerCode, authorizedCustomer.restaurantCode, authorizedCustomer.cartCode);
            }
            this.membership = new Membership(authorizedCustomer);
            return;
        } catch (error) {
            throw error;
        }
    }

    async getCustomerInformation() {
        try {
            const totalItemIncart = await this.getCustomerTotalItemInCart();
            
            return {
                customerCode: this.aCustomer.customerCode,
                customerEmail: this.aCustomer.customerEmail,
                customerName: this.aCustomer.customerName,
                membershipType: this.membership.membershipType,
                membershipEnd: this.membership.membershipEnd,
                totalItemIncart: totalItemIncart
            }
        } catch (error) {
            throw error;
        }
    }

    async getCustomerTotalItemInCart() {
        try {
            if (this.aCart === null) {
                return 0;
            }
            const items = await this.aCart.getItem(null);

            let totalItemInCart = 0;
            for (let i = 0; i < items.length; i++) {
                totalItemInCart += items[i].itemQuantity;
            }
            return totalItemInCart;
        } catch(error) {
            throw error;
        }
    }

    async setCustomerInformation(newEmail, newPhone, newPassword) {
        if (newEmail !== null) {
            await this.aCustomer.setEmail(newEmail);
        } else if (newPhone !== null) {
            await this.aCustomer.setPhone(newPhone);
        } else if (newPassword !== null) {
            await this.aCustomer.setPassword(newPassword);
        }
        return 200;
    }

    async customerSubcribeMembership(subcribtionType) {
        if (this.membership.membershipType !== null) {
            const error = new Error("Forbidden");
            error.status = 403;
            return Promise.reject(error);
        }

        let currentMembership;
        let currentDate = new Date();

        if (this.membership.membershipEnd !== null) {
            currentMembership = new Date(this.membership.membershipEnd);
            if (currentMembership < currentDate) {
                currentMembership = currentDate;
            }
        }

        if (this.membership.membershipEnd === null) {
            currentMembership = currentDate;
        }

        switch(subcribtionType) {
            case 0:
                currentMembership.setMonth(currentMembership.getMonth()+1);
                break;
            case 1:
                currentMembership.setFullYear(currentMembership.getFullYear() + 1);
                break;
            default:
                currentMembership = new Date('2024-09-01');
        }

        const extendedDate = currentMembership.toISOString().split('T')[0];

        try {
            await this.membership.subscribeMembership(subcribtionType, extendedDate);
            return extendedDate;
        } catch (error) {
            throw error;
        }
    }

    async customerRenewMembership() {
        if (this.membership.membershipType === null || this.membership.membershipEnd === null) {
            const error = new Error("Forbidden");
            error.status = 403;
            return Promise.reject(error);
        }

        let currentMembership;
        let currentDate = new Date();

        if (this.membership.membershipEnd !== null) {
            currentMembership = new Date(this.membership.membershipEnd);
            if (currentMembership < currentDate) {
                currentMembership = currentDate;
            }
        }

        switch(this.membership.membershipType) {
            case 0:
                currentMembership.setMonth(currentMembership.getMonth()+1);
                break;
            case 1:
                currentMembership.setFullYear(currentMembership.getFullYear() + 1);
                break;
            default:
                currentMembership = new Date('2024-09-01');
        }

        const extendedDate = currentMembership.toISOString().split('T')[0];

        try {
            await this.membership.renewMembership(extendedDate);
            return extendedDate;
        } catch (error) {
            throw error;
        }
    }

    async customerCancelMembership() {
        try {
            if (this.membership.membershipType === null) {
                const error = new Error("Forbidden");
                error.status = 403;
                return Promise.reject(error);
            }
            try {
                await this.membership.cancelMembership();
                return 200;
            } catch (error) {
                throw error;
            }
        } catch (error) {
            throw error;
        }
    }

    async getCustomerPaymentMethods() {
        try {
            let customerPaymentMethods = await this.aCustomer.getPaymentMethods();
            for (let i = 0; i < customerPaymentMethods.length; i++) {
                let encryptedCardNumber = "Card Ends With " + customerPaymentMethods[i].cardNumber.slice(-2);
                customerPaymentMethods[i].cardNumber = encryptedCardNumber;
            }
            return customerPaymentMethods;
        } catch (error) {
            throw error;
        }
    }

    async addCustomerPaymentMethod(cardNumber, cardOwner, cardExpMonth, cardExpYear) {
        try{
            await this.aCustomer.addPaymentMethods(cardNumber, cardOwner, cardExpMonth, cardExpYear);
            return 200;
        } catch (error) {
            throw error;
        }
    }

    async deleteCustomerPaymentMethod(paymentCode) {
        try{
            await this.aCustomer.deletePaymentMethods(paymentCode);
            return 200;
        } catch (error) {
            throw error;
        }
    }

    async displayCustomerCart(cusLat, cusLon) {
        const moduleLocation = new ModuleLocation();
        try {
            if (this.aCart === null) {
                return ({});
            }

            const restaurants = await this.aCart.getCartLinkedRestaurant();
            if (restaurants.length === 0) {
                const error = new Error("Unavailable");
                error.status = 404;
                return Promise.reject(error);
            }
            const restaurantInformation = restaurants[0];

            const cartItems = await this.aCart.getItem(null);
            let totalItemCost = 0;
            for (let i = 0; i < cartItems.length; i++) {
                totalItemCost += parseFloat(cartItems[i].totalUnitPrice);
            }

            const distance = moduleLocation.haversine(cusLat, cusLon, restaurantInformation.restaurantLat, restaurantInformation.restaurantLon);
            const deliveryCost = distance * 2;

            let discountPercentage = 0;
            const currentDate = new Date();
            if (this.membership.membershipEnd !== null) {
                const membershipEndDate = new Date(this.membership.membershipEnd);
                if (currentDate.getTime() < membershipEndDate.getTime()) {
                    discountPercentage = 0.2;
                }
            }

            const orderCost = totalItemCost + deliveryCost;
            const finalCost = orderCost - orderCost * discountPercentage;

            const customerCartInformation = {
                restaurantCode: restaurantInformation.restaurantCode,
                restaurantName: restaurantInformation.restaurantName,
                items: cartItems,
                costs: {
                    totalItemCost: totalItemCost.toFixed(2),
                    deliveryCost: deliveryCost.toFixed(2),
                    oderCost: orderCost.toFixed(2),
                    discountPercentage: (discountPercentage * 100),
                    finalCost: finalCost.toFixed(2)
                }
            }

            return customerCartInformation;
        } catch (error) {
            throw error;
        }
    }

    createCartCode(customerCode, restaurantCode) {
        const cartCode = "C" + "C" + customerCode.toString() + "R" + restaurantCode.toString();
        return cartCode;
    }

    async addItemToCart(restaurantCode, itemName, itemPrice) {
        try {
            if (this.aCart !== null) {
                if (this.aCart.restaurantCode !== restaurantCode) {
                    const error = new Error("Only One Cart For One Restaurant");
                    error.status = 403;
                    return Promise.reject(error);
                }

                const items = await this.aCart.getItem(itemName);
                if (items.length === 0) {
                    await this.aCart.addItem(itemName, itemPrice, false);
                }

                if (items.length >= 1) {
                    await this.aCart.addItem(itemName, itemPrice, true);
                }
            }

            if (this.aCart === null) {
                const cartCode = this.createCartCode(this.aCustomer.customerCode, restaurantCode);
                await Cart.insertCart(this.aCustomer.customerCode, restaurantCode, cartCode);
                this.aCart = new Cart(this.aCustomer.customerCode, restaurantCode, cartCode);
                await this.aCart.addItem(itemName, itemPrice, false);
            }

            const totalItemInCart = await this.getCustomerTotalItemInCart();
            return totalItemInCart;
        } catch (error) {
            throw error;
        }
    }

    async modifyItemInCart(itemName, itemQuantity) {
        const error = new Error("Forbidden");
        error.status = 403;

        try {
            if (this.aCart === null) {
                return Promise.reject(error);
            }

            const affectedRows = await this.aCart.modifyItem(itemName, itemQuantity);

            if (affectedRows === 0) {
                return Promise.reject(error);
            }

            const totalItemInCart = await this.getCustomerTotalItemInCart();
            return totalItemInCart;
        } catch (error) {
            throw error;
        }
    }

    async customerDeleteCart() {
        try {
            if (this.aCart === null) {
                return Promise.reject(Object.assign(new Error("Forbidden"), { status: 403 }));
            }

            const affectedRows = await this.aCart.deleteCart(this.aCustomer.customerCode);
            if (affectedRows === 0) {
                return Promise.reject(Object.assign(new Error("Forbidden"), { status: 403 }));
            }

            this.aCart = null;

            const totalItemInCart = await this.getCustomerTotalItemInCart();
            return totalItemInCart;
        } catch (error) {
            throw error;
        }
    }

    async placeCustomerOrder(recipientName, recipientPhone, orderLocation, orderCost) {
        const moduleTime = new ModuleTime();
        try {
            if (this.aCart === null) {
                return Promise.reject(Object.assign(new Error("Forbidden"), { status: 403 }));
            }

            const cartItems = await this.aCart.getItem(null);
            const serverTime = moduleTime.getServerTime();
            const orderCode = `OC${this.aCustomer.customerCode}R${this.aCart.restaurantCode}T${serverTime.year}${serverTime.month}${serverTime.day}${serverTime.hour}${serverTime.minute}${serverTime.second}`;
            const orderDate = `${serverTime.year}-${serverTime.month}-${serverTime.day}`;

            await Order.insertOrder(this.aCart.cartCode, this.aCustomer.customerCode, recipientName, recipientPhone, orderCode, this.aCart.restaurantCode, orderLocation, orderDate, orderCost);

            const orderPreview = {
                restaurantCode: this.aCart.restaurantCode,
                orderCode: orderCode,
                recipientName: recipientName,
                recipientPhone: recipientPhone,
                orderLocation: orderLocation,
                orderDate: orderDate,
                orderCost: orderCost,
                orderItems: cartItems
            }

            return orderPreview;
        } catch (error) {
            throw error;
        }
    }

    async customerViewOrder(orderCode) {
        const moduleTime = new ModuleTime();
        try {
            const orders = await Order.getDBOrder(orderCode, this.aCustomer.customerCode, null);

            if (orders.length === 0) {
                return Promise.reject(Object.assign(new Error("Forbidden"), { status: 403 }));
            }

            const dbOrder = orders[0];
            const orderDate = dbOrder.orderDate;
            dbOrder.orderDate = moduleTime.convertDate(orderDate);

            const anOrder = new Order(dbOrder);
            const orderItems = await anOrder.getOrderItems();

            return ({
                orderInformation: anOrder,
                orderItems: orderItems
            });
        } catch (error) {
            throw error;
        }
    }

    async customerReviewOrder(orderCode, orderRating, orderReview) {
        try {
            const orders = await Order.getDBOrder(orderCode, this.aCustomer.customerCode, null);

            if (orders.length === 0) {
                return Promise.reject(Object.assign(new Error("Forbidden"), { status: 403 }));
            }
            
            const dbOrder = orders[0];

            const anOrder = new Order(dbOrder);
            const affectedRows = await anOrder.setRatingReview(orderRating, orderReview);

            if (affectedRows === 0) {
                return Promise.reject(Object.assign(new Error("Forbidden"), { status: 403 }));
            }

            return 200;
        } catch (error) {
            throw error;
        }
    }

    async customerDeleteOrder(orderCode) {
        try {
            const orders = await Order.getDBOrder(orderCode, this.aCustomer.customerCode, null);

            if (orders.length === 0) {
                return Promise.reject(Object.assign(new Error("Forbidden"), { status: 403 }));
            }
            
            const dbOrder = orders[0];

            const anOrder = new Order(dbOrder);
            const affectedRows = await anOrder.deleteOrder(this.aCustomer.customerCode);

            if (affectedRows === 0) {
                return Promise.reject(Object.assign(new Error("Forbidden"), { status: 403 }));
            }

            return 200;
        } catch (error) {
            throw error;
        }
    }

    async getCustomerOrders(orderType) {
        const moduleTime = new ModuleTime();
        let orders = [];

        try {
            if (orderType === 0) {
                orders = await Order.getActiveOrders(this.aCustomer.customerCode, null);
            }

            if (orderType === 1) {
                orders = await Order.getPastOrders(this.aCustomer.customerCode, null);
            }

            for (let i = 0; i < orders.length; i++) {
                const orderDate = orders[i].orderDate;
                const convertedOrderDate = moduleTime.convertDate(orderDate);
                orders[i].orderDate = convertedOrderDate;
            }

            return orders;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ServiceCustomer;