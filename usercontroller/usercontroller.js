const userModel = require("../module/usermodule");
const bcrypt = require('bcrypt');

class userController{
   register(data){
     return new Promise( 
        async(res,rej)=>{
    
            try{
    
    
                const {name,email,contact,password}=data;
                if(data.name == "" || data.email == "" || data.contact == "" || data.password == ""){
                    res({
                        msg:"please fill the fields",
                        status:0
                    })
                    return;
                }
    
    
               const userCount = await userModel.countDocuments({email})
            //    console.log(userCount.user)
            // console.log(userCount)
               if(userCount == 1){
                res.send({
                    msg:"with this email already exists",
                    status:0
                })
                return;
               }
               
                const password1=await bcrypt.hash(password,10)
               
              const user = new userModel({
                  name,
                  email,
                  contact,
                  password:password1
              })
              user.save()
              .then(
                   ()=>{
                     res(
                        {
                            msg:"account created",
                            status:1
                        }
                     )
                   }
              ).catch(
                   ()=>{
                      rej(
                        {
                            msg:"unable to create account",
                            status:0
                        }
                      )
                   }
    
              )
              
            }catch(err){
                 rej({
                    msg:"internal server error",
                    status:0
                 })
            }
        }

       

       )
    }
    
login(data){
return new Promise( async (resolve, reject) => {
    try{
        const user = await userModel.findOne({email:data.email})
        if(user != null){
           // console.log(user.password1)
           // console.log(req.body.password)
         if(user.password == data.password){
                 resolve({
                   msg:"login succesfull",
                   status:1
                 })
         }else{
           reject(
               {
                   msg:"password does not match",
                   status:0
               }
           )
        }
       }else{
               reject({
                   msg:"email does not match",
                   status:0
               })   
        }
       
        
      }catch(err){
          reject({
           msg:"internal server error",
           status:0
          })
      }
})
}




getdata(req){
    return new Promise(async(resolve, reject) => {
        try{
            const id = req.params.id;
            const {sort} = req.query;
        //   console.log(sort)
            let user;
            if(id){
                 user =await userModel.findById(id);
                 
            }else{
                
                let sortOptions = {};
    // console.log(sort)
                // If a sort query is provided (e.g., 'name_asc' or 'createdAt_desc')
                if (sort) {
                    const [field, direction] = sort.split('_'); // Split into field and direction
                    // console.log("field",field,"direction",direction,"sort",sort)
                    // console.log([field, direction] = sort.split('_'));
                    sortOptions[field] = direction === 'asc' ? 1 : -1; // Set 1 for ascending, -1 for descending
                    // console.log(sortOptions)
                   
                }
    
                // Apply sorting when fetching the user list
              
                user = await userModel.find().sort(sortOptions);
                //  user = await userModel.find();
            }
            
             resolve({
                msg: (Array.isArray(user) ? user.length : 1) + " user found",
                user,
                status:1
             })
           }catch(err){
             reject({
                msg:"unable to find data",
                status:0
             })
           }
    })
}

delete(req){
  return new Promise(async (resolve, reject) => {
    try{
        // const id = req.params.id;
         userModel.deleteOne({_id:req.params.id})
        // console.log(id)/
        .then(
          ()=>{
            resolve({
                msg:" user delete",
                status:1
            })
          }
        ).catch(
          ()=>{
            reject({
                msg:"unable to delete this account",
                status:0
            })
          }
        )
    }catch(err){
        // console.log(err.message)
        reject({
            msg:"internal server error",
            status:0
        })
    }
  })
}

statuschanged(req){
    return new Promise( async (resolve, reject) => {
        try{
            const id = req.params.id;
            const user = await userModel.findById(id)
              if(user){
                userModel.updateOne(
                    {
                        _id:id
                    },
                    {
                        status:!user.status
                    }
                ).then(
                    ()=>{
                        resolve({
                            msg:"status changed",
                            status:1
                        }) 
                    }
                ).catch(
                    ()=>{
                      reject({
                        msg:"status not changed",
                        status:0
                      })
                    }
                )
              
              }else{
                resolve({
                    msg:"unable to find user",
                    status:0
                })
              }
         
        
        }catch(err){
        resolve({
            msg:"internal server error",
            status:0
        })
        }
    })
}

update(req){
    return new Promise( async (resolve, reject) => {
        try{
            // console.log("Updating user with ID:", req.params.id);
            const id= req.params.id;
            const user = await userModel.findById(id);
            if(user){
                // console.log("User found: ", user);
                 userModel.updateOne(
                     {_id:id},
                     {
                         ...req.body
                     }
                 ).then(
                     ()=>{
                         resolve({
                             msg:"user data update",
                             status:1
                         })
                     }
                 ).catch(
                     ()=>{
                         reject({
                             msg:"unable to update data",
                             status:0
                         })
                     }
                 )
            }else{
                // console.log("User not found for ID:", id);
             reject({
                 msg:"unable to find user",
                 status:0
             })
            }
         }catch(err){
            // console.log("Error in update:", err)
                reject({
                 msg:"internal server error",
                 status:0
                })
         }
    })
}

}

module.exports = userController;