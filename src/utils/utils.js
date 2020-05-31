export function debounce(fn, delay = 200,immediate = true) {
	let timer;
	
	return function (...args) {
		let context = this;
		timer && clearTimeout(timer);
		if (immediate) {
			var callNow = !timer;
			timer = setTimeout(() => {
				timer = null;
			}, delay)
			callNow && fn.apply(context, args)
		} else {
			timer = setTimeout(function(){
				func.apply(context, args)
			}, delay);
		}
	}
}

// export function debounce(fn, delay = 200) {
// 	let timer = null
// 	return function(...args) {
// 		timer && clearTimeout(timer)
// 		timer = setTimeout(()=>{
// 			fn.apply(this,args)
// 		},delay)
// 	}
// }

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