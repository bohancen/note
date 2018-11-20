function $calc(total,every=[]){
	let res = []
	let count = every.reduce(function(pre,cur){return pre+cur},0)
	every.forEach(function(num){
		res.push(total*num/count)
	})
	return res
}
