function get(obj,keys){
	var keys = keys.split('.')
	var res = undefined
	var i = 0,len = keys.length
	for(i; i<len; i++){
		var key = keys[i]
		console.log(res)
		if(i == 0){
			if(obj[key]){
				res = obj[key]
			}else{
				return res
			}
		}else{
			if(res[key]){
				res = res[key]
			}else{
				return res
			}
		}
	}
	return res
}
var data = {
	value:{
		key:1
	}
}
console.log(get(data,'value.key'))
console.log(data)
