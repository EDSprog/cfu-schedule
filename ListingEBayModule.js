const axios = require('axios')
// include modules

/*
* Get access user token, read the https://developer.ebay.com/api-docs/static/oauth-tokens.html
* I recommended passport-oauth2 and passport modules if you have a Node server.
*
* About params(offset, limit, filter, ordersId) of request, read this
* https://developer.ebay.com/api-docs/sell/fulfillment/resources/order/methods/getOrders#h2-output
*/

async function getOrders (accessToken, offset, limit, ordersId, filter) {
	const reqConfig = {
	    method: 'get',
	    url: 'https://api.sandbox.ebay.com/sell/fulfillment/v1/order?',
	    headers: {Authorization: `Bearer ${accessToken}`},
	  	params: {
	  		offset,
	    	limit,
	    	filter,
	    	ordersId
 		}
	}

	const response = await axios(reqConfig).catch((err) => {
		console.log(err) 
	}); // Response from eBay API
	const orders = response.data.orders; // array of orders
	/*
	* Check https://developer.ebay.com/api-docs/sell/fulfillment/resources/order/methods/getOrders#h2-output
	* for more information about response payload.
	* I take some important info
	*/

	let orderID = ''; // Id of order
	let orderBuyer = {}; // Contains information about the buyer who paid the order.
	let orderBuyerComment = ''; // Comments about the order (if any) provided by the buyer at checkout.
	let orderCreateData = ''; // The date and time that the order was created (UTC).
	let orderLastModifiedDate = ''; // The date and time that the order was last modified.
	let orderLineItems = []; // Items in order
	let orderPaymentStatus = ''; // The current status of all monetary exchanges for the order.
    let orderPaymentAmount = ''; // The monetary amount of the order.
    let orderSellerID = ''; // The eBay ID of the seller who sold the order.
    let paidOredersCount= 0; // 

	if(orders.length !== 0) {
		orders.forEach((order) => {
			// Save the data in your DB here or return like callback		
			orderID = order.orderId;
			orderBuyer = order.buyer.username;
			orderBuyerComment = order.buyerCheckoutNotes;
			orderCreateData = order.creationDate;
			orderLastModifiedDate = order.lastModifiedDate;
			orderLineItems = order.lineItems;
			orderPaymentStatus = order.orderPaymentStatus;
		    orderPaymentAmount = order.paymentSummary.payments[0].amount;
		    orderSellerID = order.sellerId;
		    orderSKU = order.lineItems.sku;
		})
	} else {
		console.log('You have no orders')
	}
}

/*
* If you registrate a new order and you need update a offer and/or inventoryItem (price and/or quantity):
* 1. You need to call function getOffers(accessToken, sku, marketplace_id(optional), format(optional),
*    limit(optional), offset(optional)); This function return array of published offers objects.
* 2. In you code, you need to choose, what offers you need to update.
* 3. Create the array (of offers what you choosed),
*    change information (price and/or quantity) and pass it in updatePriceOrQuantity
*    function in offers parameter.
*	 * If you change offers and inventiryItem simultaneously, the SKU value associated with the
*      offerId value(s) must be the same as the corresponding sku value that is passed in, or an 
*      error will occur. *
*    ** If you update only offers, the sku value is not needed.**
*    *** If you update only invntoryItem, you need to pass only SKU and newQuantity parameter.***
*
*	 For more information:
*		https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/bulkUpdatePriceQuantity
*		https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/getOffers
*/

async function updatePriceOrQuantity (accessToken, offers, sku, newQuantity) {
	let requests = []; // You can send 25 requests at once. 
	const request = await requestBuilder(offers, sku, newQuantity); // 1 of 25
	requests.push(request);
	const reqConfig = {
	    method: 'post',
	    url: 'https://api.sandbox.ebay.com/sell/inventory/v1/bulk_update_price_quantity',
	    headers: {Authorization: `Bearer ${accessToken}`},
	  	data: {requests}
	}

	const response = await axios(reqConfig).catch((err) => {
		console.log(err);
	});

	return response.data.responses
}

async function getOffers(accessToken, sku, marketplace_id, format, limit, offset) {
	const reqConfig = {
	    method: 'get',
	    url: 'https://api.sandbox.ebay.com/sell/inventory/v1/offer?',
	    headers: {Authorization: `Bearer ${accessToken}`},
	  	params: {
	  		sku,
	  		marketplace_id,
	  		offset,
	    	limit,
	    	format
 		}
	}

	const response = await axios(reqConfig).catch((err)=>{console.log(err)}); // Response from eBay API
	const offers = response.data.offers; // All offers
	let publishedOffers = []; //The published offers. (!)Only the published offers you can to update in updatePriceOrQuantity.

	if(offers.length !== 0) {
		offers.forEach((offer)=>{
			var offerObj = {};			
			if(offer.status === 'PUBLISHED') { // Only published offers
				offerObj['offerId'] = offer.offerId;
				offerObj['availableQuantity'] = offer.availableQuantity; //set a current quantity
				offerObj['price'] = offer.pricingSummary.price;

				publishedOffers.push(offerObj)
			}
		})

		return publishedOffers;
	} else {
		console.log('You have no offers')
	}
}

function requestBuilder(offers, sku, newQuantity) {
	let request = {};
	let shipAvailability = {};
    shipAvailability["quantity"] = newQuantity;
    request["shipToLocationAvailability"] = shipAvailability;
    request["sku"] = sku;
    request["offers"] = offers;

    return request
}

module.export.getOrders = getOrders
module.export.updatePriceOrQuantity = updatePriceOrQuantity
