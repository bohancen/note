function findSame(array){
	// 找到相同的 大于1就是相同的
	let findResult = array.reduce((obj,cur)=>{
		if(obj[cur]){
			obj[cur]++
		}else{
			obj[cur] = 1
		}
		return obj
	},{})
	return array.reduce((arr,cur)=>{
		if (findResult[cur]==1) {
			arr.push(cur)
		}
		return arr
	},[])
}
