export function debounce(fn, delay = 200) {
	let timer = null
	return function(...args) {
		timer && clearTimeout(timer)
		timer = setTimeout(()=>{
			fn.apply(this,args)
		},delay)
	}
	
}