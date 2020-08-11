import * as config from './config'

export async function create(clientTrace) {

    var init = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify({
            tableNumber: clientTrace.tableNumber,
            firstname: clientTrace.firstname,
            lastname: clientTrace.lastname,
            phone: clientTrace.phone,
            postalCode: clientTrace.postalCode,
            restaurantId: clientTrace.restaurantId
        })
    }

    try {
        const response = await fetch(config.API_URL + 'client_trace/create.php', init)
        const json = await response.json()
        return json
    } catch (err) {
        console.log('Fetch Error Register ------', err);
        return null;
    }
}

export async function getRestaurantByUrlName(urlName) {

    var init = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    try {
        const response = await fetch(config.API_URL + 'restaurant/read_by_url_name?urlName='+urlName, init)
        const json = await response.json()
        return json
    } catch (err) {
        console.log('Fetch Error Register ------', err);
        return null;
    }
}
