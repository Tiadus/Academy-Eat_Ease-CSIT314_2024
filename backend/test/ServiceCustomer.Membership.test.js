jest.mock('../class_model/Membership.js', () => {
    class Membership {
        constructor(membershipInformation) {
            this.customerCode = membershipInformation.customerCode;
            this.membershipType = membershipInformation.membershipType;
            this.membershipEnd = membershipInformation.membershipEnd;
        }

        async subscribeMembership(membershipType, membershipEnd) {
            return;
        }

        async renewMembership(extendedDate) {
            return;
        }
    
        async cancelMembership() {
            return;
        }
    }

    return Membership;
});

const ModuleTime = require('../class_controller/ModuleTime.js');
const Membership = require('../class_model/Membership.js');
const ServiceCustomer = require('../class_controller/ServiceCustomer.js');
describe('ServiceCustomer', () => {
    const moduleTime = new ModuleTime();
    const serverTime = moduleTime.getServerTime();
    const date = `${serverTime.year}-${serverTime.month}-${serverTime.day}`;

    describe('customerSubscribeMembership', () => {
        test('it should create a subscription if there is none existed', async () => {
            const membershipInformation = {
                customerCode: null,
                membershipType: null,
                membershipEnd: null
            }

            const membership = new Membership(membershipInformation)
            const serviceCustomer = new ServiceCustomer();
            serviceCustomer.membership = membership;
            await serviceCustomer.customerSubcribeMembership(0);
    
            expect(serviceCustomer.membership === null).toBe(false);
        });

        test('it should extend the existed duration if any', async () => {
            const membershipInformation = {
                customerCode: 0,
                membershipType: null,
                membershipEnd: '2024-04-05'
            }

            const testExtendedDate = new Date();
            testExtendedDate.setMonth(testExtendedDate.getMonth()+1);

            const membership = new Membership(membershipInformation)
            const serviceCustomer = new ServiceCustomer();
            serviceCustomer.membership = membership;
            const extendedDate = await serviceCustomer.customerSubcribeMembership(0);

            expect(extendedDate).toBe(testExtendedDate.toISOString().split('T')[0]);
        });

        test('it should throw an error if there is an already existed membership', async () => {
            const membershipInformation = {
                customerCode: 0,
                membershipType: 0,
                membershipEnd: '2024-04-05'
            }

            const membership = new Membership(membershipInformation)
            const serviceCustomer = new ServiceCustomer();
            serviceCustomer.membership = membership;

            try {
                await serviceCustomer.customerSubcribeMembership(0);
            } catch (error) {
                expect(error.message).toBe('Forbidden');
                expect(error.status).toBe(403);
            }
        });
    });

    describe('customerRenewMembership', () => {
        test('it should extend a subscription if existed', async () => {
            const membershipInformation = {
                customerCode: 0,
                membershipType: 0,
                membershipEnd: '2024-04-05'
            }

            const testExtendedDate = new Date();
            testExtendedDate.setMonth(testExtendedDate.getMonth()+1);

            const membership = new Membership(membershipInformation)
            const serviceCustomer = new ServiceCustomer();
            serviceCustomer.membership = membership;
            const extendedDate = await serviceCustomer.customerRenewMembership(0);
    
            expect(extendedDate).toBe(testExtendedDate.toISOString().split('T')[0]);
        });

        test('it should throw an error if there is no membership to renew', async () => {
            const membershipInformation = {
                customerCode: 0,
                membershipType: null,
                membershipEnd: '2024-04-05'
            }

            const membership = new Membership(membershipInformation)
            const serviceCustomer = new ServiceCustomer();
            serviceCustomer.membership = membership;

            try {
                await serviceCustomer.customerRenewMembership(0);
            } catch (error) {
                expect(error.message).toBe('Forbidden');
                expect(error.status).toBe(403);
            }
        });
    });
})
