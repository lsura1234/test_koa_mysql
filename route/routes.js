import Router from 'koa-router'
import user from '../database/models/user'
import jwt from 'jwt-simple'


const router = new Router();
////////decode jwt///////////////
const SECRET = "allee_key"
  



router.post('/insert',middleware, async(ctx, next) => {
    const {username,password,id} = ctx.request.body
    let data = await user.create({id,username,password});
    ctx.status = 200
    ctx.body = data
 });

 router.get('/',middleware, async(ctx) => {
    let data = await user.findAll();
    ctx.status = 200;
    ctx.body = data
 });
 router.delete('/delete',middleware,async(ctx) =>{
     let {username} = ctx.request.body
     await user.destroy({where:{username}}).then((rowDelete) => {
         if(rowDelete === 1){
            ctx.status = 200
             ctx.body = {message:"delete success"}
         }
         else{
            ctx.status = 400
            ctx.body = {message:'username not fount'} 
         }
        })
    })
    router.put('/update',middleware,async(ctx) => {
         let {password,username,id} = ctx.request.body
       await user.update(
            {password,username},
            {where:{id}}
        ).then((rowUpdate) => {
          
            if(rowUpdate[0]===0)
             { 
                 ctx.status = 400
                ctx.body = {message:'update fail'}
            }
            else {
                ctx.status = 400
                ctx.body ={message:'update success'}
            }
        }) 
    })
    router.post('/login',async(ctx,next) =>{
        let {username,password} = ctx.request.body
       let login= await user.findOne({where:{username}})

       const payload = {
        sub: username,
        iat: new Date().getTime()//มาจากคำว่า issued at time (สร้างเมื่อ)
        }
        const token = jwt.encode(payload, SECRET)
        console.log(typeof token)

        if(login.password===password){
            ctx.status = 200           
            ctx.body = {token}
        }
        else{
            ctx.status = 400
            ctx.body= {message:"login fail"}
 
        }
        })

async function middleware(ctx,next){
    let {autherization} = ctx.request.header
    try{
        const username = jwt.decode(autherization,SECRET,true)
         var check = await user.findOne({where:{username:username.sub}})
        if(check) 
            await next()
    }
    catch(error){
        ctx.status = 401
    }    
}
 module.exports = router;

