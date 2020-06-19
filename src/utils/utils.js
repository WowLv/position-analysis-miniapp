let timer;
export function debounce(fn, delay = 200,immediate = true, ctx) {
	return function() {
		let args = arguments
		timer && clearTimeout(timer);
		if (immediate) {
			var callNow = !timer;
			timer = setTimeout(() => {
				timer = null;
			}, delay)
			callNow && fn.apply(ctx, args)
		} else {
			timer = setTimeout(function(){
				fn.apply(ctx, args)
			}, delay);
		}
	}
}

export function TopFiveDate(obj) {
	return obj.sort(compare('value')).slice(0, 5)
}

function compare(prop) {
	return function(a, b) {
		const val1 = a[prop]
		const val2 = b[prop]
		return val2 - val1
	}
}
  

function formatter(date ,mode){
	var strDate = date.getFullYear()+"-";
	if(date.getMonth()<10){
		var s = date.getMonth()+1+"-";
		strDate += "0"+s;
	}else{
		strDate += date.getMonth()+1+"-";
	}

	if(date.getDate()<10){
		 strDate += "0"+date.getDate();
	}else{
		strDate += date.getDate();
	}

	if(mode === 'day') {
		return strDate
	}else if(mode === 'month') {
		return strDate.split('-').splice(0,2).join('-')
	}else if(mode === 'year') {
		return date.getFullYear()
	}
} 


export function getNowDate(mode = 'day') {
	let now = new Date(Date.now())
	return formatter(now, mode)
}
export function getEndDate(endTime, mode = 'day') {
	let end = new Date(Date.now() + endTime)
	return formatter(end, mode)
}