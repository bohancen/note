
// 回调函数集合 结构{fnParamsName:[fns]}
const callBackFunctions = {}
// 运行回调 并删除
const runCallBackFunction = function(stringifyParams,data){
  callBackFunctions[stringifyParams].forEach(fn=>{
    fn(data)
  })
  callBackFunctions[stringifyParams] = undefined
}

const httpclient = function(config={}){

  // 目前只针对get请求
  let {method='get'} = config
  if(!/^get$/i.test(method)) return axios(config)

  // params参数当回调函数key
  let {params={}} = config
  let stringifyParams = JSON.stringify(params)

  // 如有一样的请求
  if(callBackFunctions[stringifyParams]){
    return new Promise((reslove,reject)=>{
      let fn = ([r,e])=>{
        if(r) return reslove(r)
        if(e) return reject(e)
      }
      // push回调 等待请求完成执行
      callBackFunctions[stringifyParams].push(fn)
    })
  }

  // 为生成回调函数准备
  callBackFunctions[stringifyParams] = []

  return new Promise((reslove,reject)=>{
    axios(config).then(r=>{
      runCallBackFunction(stringifyParams,[r,null])
      reslove(r)
    }).catch(e=>{
      runCallBackFunction(stringifyParams,[null,e])
      reject(e)
    })
  })
}

button1.onclick=function(){
  httpclient({method:'GET',url:'/api',params:{ts:2020}}).then(r=>{
    console.log(r)
  }).catch(e=>{
    console.log(e)
  })
}

button2.onclick=function(){
  httpclient({method:'POST',url:'/api',params:{ts:2020}}).then(r=>{
    console.log(r)
  }).catch(e=>{
    console.log(e)
  })
}
