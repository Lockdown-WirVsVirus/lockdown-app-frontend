// tslint:disable
/**
 * Lockdown app
 * This is the api for the lockdown app
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: nonem@swagger.io
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */



/**
 * 
 * @export
 * @interface Address
 */
export interface Address {
    /**
     * 
     * @type {string}
     * @memberof Address
     */
    street: string;
    /**
     * 
     * @type {number}
     * @memberof Address
     */
    houseNo: number;
    /**
     * 
     * @type {string}
     * @memberof Address
     */
    postalCode: string;
    /**
     * 
     * @type {string}
     * @memberof Address
     */
    city: string;
    /**
     * 
     * @type {string}
     * @memberof Address
     */
    province?: string;
    /**
     * 
     * @type {string}
     * @memberof Address
     */
    country?: string;
}


