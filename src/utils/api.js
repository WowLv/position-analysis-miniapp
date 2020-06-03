import request from './request.js'

export function getPosDetailByPid(query) {
	return request({
		url: '/getDetail',
		method: 'GET',
		data: { pid: query }
	})
}

export function getPosDetailByPage(query = 1) {
	return request({
		url: '/getDetail',
		method: 'GET',
		data: { page: query }
	})
}

export function searchPos(key) {
	return request({
		url: '/searchPos',
		method: 'GET',
		data: { key }
	})
}