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
            address: restaurant.address,
            password: password,
            urlName: restaurant.name.toLowerCase().replace(/\s/g,'')
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
        const response = await fetch(config.API_URL + 'restaurant/read_by_url_name?urlName=' + urlName, init)
        const json = await response.json()
        return json
    } catch(err) {
        console.log('Fetch Error readByUrlName ------', err)
        return null
    }
}