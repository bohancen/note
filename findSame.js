function findSame(arr){
	// 找到相同的 大于1就是相同的
	let findResult = arr.reduce((obj,cur)=>{
		if(obj[cur]){
			obj[cur]++
		}else{
			obj[cur] = 1
		}
		return obj
	},{})
	return arr.reduce((pre,cur)=>{
		if (findResult[cur]==1) {
			pre.push(cur)
		}
		return pre
	},[])
}
