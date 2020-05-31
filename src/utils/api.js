import fly from './request.js'

export function getPosSelect() {
	return fly.request("/position.json", null, {
		methed: "get"
	})
}