import axios from 'axios';
import { useEffect, useState } from 'react'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaRegEye ,  FaEyeSlash } from "react-icons/fa";

function App() {

  const [user,setUser]=useState([]);
const[editdata,seteditdata]=useState(null);
// console.log(editdata)

const openToast = (msg,flag)=>{
      toast(msg,{type: flag ? "sucesss":"error"})
}


  const fetchapi = ()=>{
  
    axios.get(
      "http://localhost:3000/product"
    ).then(
           (success)=>{
                 if(success.data.status == 1){
                  setUser(success.data.user)
                 }
                // console.log(success)
           }
    ).catch(
       (error)=>{
         console.log(error.message)
       }
    )
  }

const deleteapi = (user_id)=>{
  axios.delete(`http://localhost:3000/product/delete/${user_id}`)
  .then(
           (success)=>{
              if(success.data.status == 1){
                fetchapi();
              }
              openToast(success.data.msg,success.data.status);
              // console.log(success)   
           }
           
  ).catch(
    (error)=>{
         openToast("client side error",0)
    }
  )
}

const submithandler = (e)=>{
  e.preventDefault();
  const data = {
     name:e.target.name.value,
     email:e.target.email.value,
     contact:e.target.contact.value,
     password:e.target.password.value
  }

let response;
if(editdata == null){
      response = axios.post('http://localhost:3000/product/register',data);
}
else{
    response = axios.put(`http://localhost:3000/product/update/${editdata._id}`,data)
}
   

  
  response.then(
       (success)=>{
              if(success.data.status == 1){
                
                e.target.reset()
                seteditdata(null);
                fetchapi()
              }
              openToast(success.data.msg,success.data.status);
       }
  ).catch(
        (error)=>{
          openToast("client side error",0);
        }
  )
              
}

const changestatus = (user_id)=>{
  // console.log(http://localhost:3000/product/status-changed/${user_id})
   axios.patch(`http://localhost:3000/product/status-changed/${user_id}`)
   .then(
    (success)=>{
      if(success.data.status == 1){
        fetchapi();
      }
      openToast(success.data.msg,success.data.status);
    }
   ).catch(
    (error)=>{
      console.log("client side error",0)
    }
   )
}

useEffect(
  ()=>{
fetchapi();
  },[]
)

  return (
    <>
 <ToastContainer />    
     <h2 className='text-center text-xl my-2'>User Dashboard</h2>
     <div className='w-[1200px] mx-auto gap-2 grid grid-cols-5'>
     <div className='col-span-3'>
      <div className="relative overflow-x-auto">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          Name
        </th>
        <th scope="col" className="px-6 py-3">
          Email
        </th>
        <th scope="col" className="px-6 py-3">
          Contact
        </th>
        <th scope="col" className="px-6 py-3">
          Status
        </th>
        <th scope="col" className="px-6 py-3">
          Delete/Edit
        </th>
      </tr>
    </thead>
    <tbody>
   {
    user.map(
      (user,)=>{
        return(
          
          <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {user.name}
          </th>
          <td className="px-6 py-4">{user.email}</td>
          <td className="px-6 py-4">{user.contact}</td>
          <td className="px-6 py-4">{user.status
            ? <button onClick={()=>{ changestatus(user._id)}} type='button' className='text-white bg-green-700 p-2'>Active</button >:<button onClick={()=>{ changestatus(user._id)}} type='button' className='text-white bg-red-700 p-2'>Inactive</button>
            }</td>
             <td className="flex gap-1 px-6 py-4">
             <button type='button' className='text-white bg-red-700 p-2' onClick={()=> deleteapi(user._id)}>Delete</button>
             <button type='button' className='text-white bg-orange-700 p-2' onClick={()=> seteditdata(user)}>Edit</button>
             </td>
        </tr>
        ) 
      }
    )
   }

    
    </tbody>
  </table>
</div>
</div>
     <div className='col-span-2'>

<Registerform editdata={editdata} submithandler={submithandler} />
     </div>
     </div>
    </>
  )
}

export default App;

const Registerform =  (props)=>{
  const[tooglepassword,settooglepassword] = useState(false)
  return (
    
<form onSubmit={props.submithandler} className="max-w-md mx-auto">
  
<div className="grid md:grid-cols-2 md:gap-6">
  <div className="relative z-0 w-full mb-5 group">
    <input
      type="text"
      name="name"
      defaultValue={props.editdata?.name}
      id="floating_first_name"
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      placeholder=" "
      required=""
    />
    <label
      htmlFor="floating_first_name"
      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      First name
    </label>
  </div>
 
</div>
<div className="relative z-0 w-full mb-5 group">
  <input
    type="email"
    name="email"
    defaultValue={props.editdata?.email}
    id="floating_email"
    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    placeholder=" "
    required=""
  />
  <label
    htmlFor="floating_email"
    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
  >
    Email address
  </label>
</div>

<div className="mb-5">
  <label className="flex items-center gap-3 mb-2 text-sm font-medium text-gray-900 dark:text-white">
    Your password {
        tooglepassword ? <FaEyeSlash onClick={()=> settooglepassword(false)}/> : <FaRegEye onClick={()=> settooglepassword(true)} />
    }
  </label>
  <input
    type={tooglepassword ? 'text' : "password"}
    id="password"
    defaultValue={props.editdata?.password}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    required=""
  />
</div>










<div className="mb-5">
<label
  htmlFor="contact"
  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
>
  contact
</label>
<input
  type="number"
  id="contact"
  defaultValue={props.editdata?.contact}
  contact="contact"
  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  required=""
/>
</div>

<button
  type="submit"
  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
   >
  Submit
</button>
</form>
  )

}