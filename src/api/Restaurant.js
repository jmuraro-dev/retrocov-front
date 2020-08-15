import sha1 from 'js-sha1'
import * as config from './config'

export async function create(restaurant) {
    var password = sha1(sha1('Cov-' + restaurant.password) + '_Retro')

    var init = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify({
            name: restaurant.name,
            email: restaurant.email,
            address: restaurant.address,
            password: password,
            urlName: createUrlName(restaurant.name)
        })
    }

    try {
        const response = await fetch(config.API_URL + 'restaurant/create.php', init)
        const json = await response.json()
        return json
    } catch (err) {
        console.log('Fetch Error Register ------', err)
        return null
    }
}

export async function login(restaurant) {
    var password = sha1(sha1('Cov-' + restaurant.password) + '_Retro')

    var init = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify({
            name: restaurant.name,
            password: password
        })
    }

    try {
        const response = await fetch(config.API_URL + 'restaurant/login.php', init)
        const json = await response.json();
        return json
    } catch (err) {
        console.log('Fetch Error Login ------', err)
        return null
    }
}

export async function readByUrlName(urlName) {
    var init = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    try {
        const response = await fetch(config.API_URL + 'restaurant/read_by_url_name.php?urlName=' + urlName, init)
        const json = await response.json()
        return json
    } catch(err) {
        console.log('Fetch Error readByUrlName ------', err)
        return null
    }
}

function createUrlName(restaurantName) {
    var r = restaurantName.toLowerCase();
    r = r.replace(new RegExp(/\s/g),"");
    r = r.replace(new RegExp(/[àáâãäå]/g),"a");
    r = r.replace(new RegExp(/æ/g),"ae");
    r = r.replace(new RegExp(/ç/g),"c");
    r = r.replace(new RegExp(/[èéêë]/g),"e");
    r = r.replace(new RegExp(/[ìíîï]/g),"i");
    r = r.replace(new RegExp(/ñ/g),"n");
    r = r.replace(new RegExp(/[òóôõö]/g),"o");
    r = r.replace(new RegExp(/œ/g),"oe");
    r = r.replace(new RegExp(/[ùúûü]/g),"u");
    r = r.replace(new RegExp(/[ýÿ]/g),"y");
    r = r.replace(new RegExp(/\W/g),"");
    return r.replace(/\s/g,'');
}

export async function getAllRestaurants() {
    var init = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    try {
        const response = await fetch(config.API_URL + 'restaurant/read_all.php', init)
        const json = await response.json()
        return json["records"];
    } catch (err) {
        console.log('Fetch Error getAllRestaurant ------', err)
        return null
    }
}

export async function deleteRestaurantById(id) {

    var init = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify({
            id: id
        })
    }

    try {
        const response = await fetch(config.API_URL + 'restaurant/delete.php', init)
        const json = await response.json();
        return json
    } catch (err) {
        console.log('Fetch Error Login ------', err)
        return null
    }
}
