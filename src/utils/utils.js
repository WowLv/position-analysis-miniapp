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
  

function formatter(date){
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

	return strDate ;
} 


export function getStartDate() {
	let start = new Date()
	return formatter(start)
}
export function getEndDate() {
	let end = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 6) 
	return formatter(end)
}