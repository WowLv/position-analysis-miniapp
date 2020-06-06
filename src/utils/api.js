import request from './request.js'

export function getPosDetailByPid(query) {
	return request({
		url: '/getDetail',
		method: 'GET',
		data: { pid: query }
	})
}

export function getPosDetailByPage(page = 1) {
	return request({
		url: '/getDetail',
		method: 'GET',
		data: { page }
	})
}

export function searchPos(key, location, page) {
	return request({
		url: '/searchPos',
		method: 'GET',
		data: { key, location, page }
	})
}

export function test() {
	return request({
		url: '/test',
		method: 'GET'
	})
}