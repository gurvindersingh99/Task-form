import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaRegEye, FaEyeSlash } from 'react-icons/fa';
import Registerform from './Registerform';  // Import the Registerform component

function App() {
  const [user, setUser] = useState([]);
  const [editdata, setEditData] = useState(null);
  const [fields, setFields] = useState([
    { type: 'text', label: 'First Name', placeholder: 'Enter your first name', value: '', name: 'name' },
    { type: 'email', label: 'Email Address', placeholder: 'Enter your email', value: '', name: 'email' },
    { type: 'password', label: 'Password', placeholder: 'Enter your password', value: '', name: 'password' },
    { type: 'number', label: 'Contact', placeholder: 'Enter your contact number', value: '', name: 'contact' },
    // Add more fields as needed
  ]);

  const openToast = (msg, flag) => {
    toast(msg, { type: flag ? 'success' : 'error' });
  };

  const fetchapi = () => {
    axios
      .get('http://localhost:3000/product')
      .then(success => {
        if (success.data.status == 1) {
          setUser(success.data.user);
        }
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  const deleteapi = (user_id) => {
    axios.delete(`http://localhost:3000/product/delete/${user_id}`).then(success => {
      if (success.data.status == 1) {
        fetchapi();
      }
      openToast(success.data.msg, success.data.status);
    }).catch(error => {
      openToast('Client side error', 0);
    });
  };

  const submithandler = (e) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      contact: e.target.contact.value,
      password: e.target.password.value,
    };

    let response;
    if (editdata == null) {
      response = axios.post('http://localhost:3000/product/register', data);
    } else {
      response = axios.put(`http://localhost:3000/product/update/${editdata._id}`, data);
    }

    response.then(success => {
      if (success.data.status == 1) {
        e.target.reset();
        setEditData(null);
        fetchapi();
      }
      openToast(success.data.msg, success.data.status);
    }).catch(error => {
      openToast('Client side error', 0);
    });
  };

  const changestatus = (user_id) => {
    axios.patch(`http://localhost:3000/product/status-changed/${user_id}`).then(success => {
      if (success.data.status == 1) {
        fetchapi();
      }
      openToast(success.data.msg, success.data.status);
    }).catch(error => {
      console.log('Client side error', 0);
    });
  };

  useEffect(() => {
    fetchapi();
  }, []);

  return (
    <>
      <ToastContainer />
      <h2 className="text-center text-xl my-2">User Dashboard</h2>
      <div className="w-[1200px] mx-auto gap-2 grid grid-cols-5">
        <div className="col-span-3">
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
                {user.map((user) => (
                  <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {user.name}
                    </th>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.contact}</td>
                    <td className="px-6 py-4">
                      {user.status ? (
                        <button onClick={() => changestatus(user._id)} type="button" className="text-white bg-green-700 p-2">
                          Active
                        </button>
                      ) : (
                        <button onClick={() => changestatus(user._id)} type="button" className="text-white bg-red-700 p-2">
                          Inactive
                        </button>
                      )}
                    </td>
                    <td className="flex gap-1 px-6 py-4">
                      <button type="button" className="text-white bg-red-700 p-2" onClick={() => deleteapi(user._id)}>
                        Delete
                      </button>
                      <button type="button" className="text-white bg-orange-700 p-2" onClick={() => setEditData(user)}>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-span-2">
          <Registerform editdata={editdata} submithandler={submithandler} fields={fields} setFields={setFields} />
        </div>
      </div>
    </>
  );
}

export default App;
