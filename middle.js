// const Koa = require('koa');

// const app = new Koa();
// const PORT = 3000;

// // #1
// app.use(async (ctx, next)=>{
//     console.log(1)
//     await next();
//     console.log(1.1)
// });
// // #2
// app.use(async (ctx, next) => {
//     console.log(2)
//     await next();
//     console.log(2.1)
// })

// app.use(async (ctx, next) => {
//     console.log(3)
//     ctx.body = 'Hello Koa';
//     console.log(ctx)
// })

// app.listen(PORT);
// console.log(`http://localhost:${PORT}`);

class App {
  constructor(){
    this.middle = []
    this.params = {}
  }
  use(fn){
    this.middle.push(fn)
  }
  run(){
    const dispach=(i)=>{
      let fn = this.middle[i]
      if(!fn){
        return Promise.resolve()
      }
      return Promise.resolve(fn(this.params,function next(){
        return dispach(i+1)
      }))
    }
    return dispach(0)
  }
  async send(){
    await this.run()
    console.log(this.params)
  }
}


const dely=t=>new Promise(r=>setTimeout(r,t))
const test = new App()
test.use(async function(params,next){
  await dely(1000)
  console.log('haha')
  params.name = 'haha'
  await next()
})
test.use(async function(params,next){
  await dely(1000)
  console.log('heihei')
  params.val = 'haha'
  await next()
})

test.send()
