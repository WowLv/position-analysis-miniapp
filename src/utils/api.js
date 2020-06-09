import request from './request.js'
import analysisReq from './analysisReq'

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
export function getProvinceRank() {
	return analysisReq({
		url: '/AllProvince_Job_Servlet',
		method: 'GET'
	})
}

export function getRegionRank(region) {
	return analysisReq({
		url: '/CountryJob_DayTop_Servlet',
		method: 'GET',
		data: region
	})
}

export function getPosRank() {
	return analysisReq({
		url: '/CountryJob_DayTop_Servlet',
		method: 'GET',
		data: { position: 'other'}
	})
}



// export function test() {
// 	return request({
// 		url: '/test',
// 		method: 'GET'
// 	})
// }