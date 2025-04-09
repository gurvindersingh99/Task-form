const express = require('express')
const userrouter = express.Router();

const userModel = require('../module/usermodule');
const userController = require('../usercontroller/usercontroller')

userrouter.post(
    "/register",
    (req,res)=>{
        const result = new userController().register(req.body);
        result.then(
              (success)=>{
               res.send(success)
              }
        ).catch(
              (error)=>{
                console.log(error.message,"err");
               
                 res.send(error.message)
              }
        )
    }
)

userrouter.post(
    "/login",
     (req,res)=>{
      const result = new userController().login(req.body);
      result.then(
        (success)=>{
           res.send(success)
        }
      ).catch(
        (error)=>{
            res.send(error)
        }
      )
    }
)

userrouter.get(
    "/:id?",
    (req,res)=>{
      const result = new userController().getdata(req)
      result.then(
        (success)=>{
            res.send(success)
        }
      ).catch(
        (error)=>{
             res.send(error)
        }
      )
    }
)

userrouter.delete(
    "/delete/:id",
   (req,res)=>{
       const result = new userController().delete(req);
       result.then(
        (success)=>{
              res.send(success)
        }
       ).catch(
        (error)=>{
           res.send(error)
        }
       )
    }
)

userrouter.patch(
    "/status-changed/:id",
    (req,res)=>{
      const result = new userController().statuschanged(req);
      result.then(
        (success)=>{
           res.send(success)
        }
      ).catch(
        (error)=>{
             res.send(error)
        }
      )
    }
)

userrouter.put(
    "/update/:id",
    (req,res)=>{
      // const userId = req.params.id;
    // console.log("Updating user with ID:", userId);
       const result = new userController().update(req);
       result.then(
        (success)=>{
           res.send(success)
        }
       ).catch(
        (error)=>{
         res.send(error)
        }
       )       
    }
)


module.exports = userrouter;