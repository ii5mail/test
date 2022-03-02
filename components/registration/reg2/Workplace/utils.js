/* global google */

const get_place_details = async place_id => {
	const data = {
		address_1: null,
		city: null,
		state: null,
		zip_code: null,
		country: null,
		location: null,
	}
	try {
		const raw_result = await new Promise((resolve, reject) => {
			new google.maps.Geocoder().geocode({placeId: place_id}, (results, status) => {
				if (status === "OK") {
					const data = {
						address_1: null,
						city: null,
						state: null,
						zip_code: null,
						country: null,
						location: null,
					}
					var street_number = null
					var street_name = null
					if (results[0]) {
						results[0].address_components.forEach(function (item) {
							if (item.types.indexOf("street_number") > -1) {
								street_number = item.long_name
							}
							if (item.types.indexOf("route") > -1) {
								street_name = item.long_name
							}
							if (item.types.indexOf("administrative_area_level_1") > -1) {
								data.state = item.short_name
							}
							if (item.types.indexOf("locality") > -1) {
								data.city = item.long_name
							}
							if (item.types.indexOf("country") > -1) {
								data.country = item.short_name
							}
							if (item.types.indexOf("postal_code") > -1) {
								data.zip_code = item.short_name
							}
						})
						if (street_number && street_name) {
							data.address_1 = `${street_number} ${street_name}`
						}
						const location = {
							latitude: results[0].geometry.location.lat(),
							longitude: results[0].geometry.location.lng(),
						}
						data.location = location
					}
					resolve(data)
				} else {
					console.error("Geocoder failed due to: " + status)
				}
			})
		})
		data.address_1 = raw_result.address_1
		data.city = raw_result.city
		data.state = raw_result.state
		data.zip_code = raw_result.zip_code
		data.country = raw_result.country
		data.location = raw_result.location
		
	} catch (err) {
		console.error('An error occurred', err)
		result = []
	}
	return data
}

const get_cities = async search_text => {
	let result
	try {
		const raw_result = await new Promise((resolve, reject) => {
			const service = new google.maps.places.AutocompleteService()
			service.getPlacePredictions({
				input: search_text,
				types: ['(cities)'],
				componentRestrictions: { country: ['us', 'ca', 'mx'] }
			}, (predictions, status) => {
				if (status !== google.maps.places.PlacesServiceStatus.OK) {
					reject(status)
				}
				resolve(predictions)

			})

		})
		result = raw_result.map((res) => {
			const [city, state] = res.description.split(',')
			return {
				id: res.place_id,
				value: res.description,
				city: res.structured_formatting.main_text,
				city_state: `${city}, ${state}`
			}
		})
	} catch (err) {
		console.error('An error occurred', err)
		result = []
	}
	return result
}

const get_addresses = async search_text => {
	let result
	try {
		const raw_result = await new Promise((resolve, reject) => {
			const service = new google.maps.places.AutocompleteService()
			service.getPlacePredictions({
				input: search_text,
				types: ['address'],
				componentRestrictions: { country: ['us', 'ca', 'mx'] }
			}, (predictions, status) => {
				if (status !== google.maps.places.PlacesServiceStatus.OK) {
					reject(status)
				}
				resolve(predictions)

			})

		})
		result = raw_result.map((res) => {
			return {
				id: res.place_id,
				value: res.description,
			}
		})
	} catch (err) {
		console.error('An error occurred', err)
		result = []
	}
	return result
}

const get_location_data = async (place_id) => {
	return return_location_data({ placeId: place_id })
}
const get_location_by_lat_lon = async ({ latitude, longitude }) => {
	const location = {
		lat: parseFloat(latitude),
		lng: parseFloat(longitude),
	}
	return return_location_data({ location })
}

const return_location_data = async (payload) => {
	try {
		return await new Promise((resolve, reject) => {
			new google.maps.Geocoder().geocode(payload, (results, status) => {
				if (status === "OK") {
					const data = {}
					if (results[0]) {
						results[0].address_components.forEach(function (item) {
							if (item.types.indexOf("administrative_area_level_1") > -1) {
								data.state = item.short_name
							}
							if (item.types.indexOf("locality") > -1) {
								data.city = item.long_name
							}
							if (item.types.indexOf("country") > -1) {
								data.country = item.short_name
							}
							if (item.types.indexOf("postal_code") > -1) {
								data.zip_code = item.short_name
							}
						})
						if (results[0].geometry.location) {
							data.location = {
								latitude: results[0].geometry.location.lat(),
								longitude: results[0].geometry.location.lng()
							}
						}
						resolve(data)
					}
				} else {
					console.error("Geocoder failed due to: " + status)
				}
			})
		})
	} catch (e) {
		console.error(e)
	}
}

export { get_cities, get_location_data, get_location_by_lat_lon, get_addresses, get_place_details }


