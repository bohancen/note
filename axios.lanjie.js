const getData = (stringifyParams)=>{
  // 格式
  // {stringifyParams:{data,timeoutIntercept}}
  let returnData = null
  try{
    let jsonData = JSON.parse(sessionStorage.getItem(stringifyParams))
    let timeoutIntercept = new Date().getTime()
    if(jsonData['timeoutIntercept'] && timeoutIntercept<jsonData['timeoutIntercept']){
      returnData = jsonData.data
    }else{
      sessionStorage.removeItem(stringifyParams)
    }
    
  }catch(e){}
  return returnData
}

const setData = (stringifyParams,data,timeoutIntercept)=>{
  timeoutIntercept +=new Date().getTime()
  sessionStorage.setItem(stringifyParams,JSON.stringify({
    timeoutIntercept,
    data
  }))
}

/**
 * 
 * @param {bool} isIntercept 是否开启拦截
 * @param {num} timeoutIntercept 过期时间 单位毫秒
 * @description 缓存数据 默认存在 sessionStorage
 */
const httpClient2 = function(config={},{
  isIntercept=false,
  timeoutIntercept=10000
}={}){
  // 目前只针对get请求
  let {method='get'} = config
  if(!/^get$/i.test(method)) return axios(config)

  let {params={}} = config
  // 参数排序 并 转成 querystring
  let stringifyParams = Object.keys(params).sort().reduce((str, key) => str += `&${key}=${params[key]}`, '').replace('&', '')

  // 不拦截 返回
  if(!isIntercept){
    // 如果没有存储过
    if(!sessionStorage.getItem(stringifyParams)){
      return axios(config)
    }
    // 有存储更新
    else{
      return new Promise((reslove,reject)=>{
        axios(config).then(r=>{
          setData(stringifyParams,r.data,timeoutIntercept)
          reslove(r)
        }).catch(e=>{
          reject(j)
        })
      })
    }
  }
  

  let data = getData(stringifyParams)

  // Storage没有获取到对应数据
  if(!data){
    return new Promise((reslove,reject)=>{
      axios(config).then(r=>{
        setData(stringifyParams,r.data,timeoutIntercept)
        reslove(r)
      }).catch(e=>{
        reject(j)
      })
    })
  }

  if(data){
    return Promise.resolve({data})
  }
   
}



button3.onclick=function(){
  httpClient2({method:'GET',url:'/api',params:{ts:2020}},{isIntercept:true}).then(r=>{
    console.log(r)
  }).catch(e=>{
    console.log(e)
  })
}

button4.onclick=function(){
  httpClient2({method:'GET',url:'/api',params:{ts:2020}}).then(r=>{
    console.log(r)
  }).catch(e=>{
    console.log(e)
  })
}
