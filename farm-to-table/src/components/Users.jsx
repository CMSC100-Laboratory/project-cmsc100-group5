import { useState, useEffect } from 'react';
import axios from "axios";
function Users() {
    const [totalUsers, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:3000/get-all-users");
            setUsers(response.data.users);
            console.log(response.data.users);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    const deleteUser = async (email) => {
        try {
            await axios.post("http://localhost:3000/delete-product", {email: email})
            let tempList = users.filter(item => item[2] !== email)
            setUsers(tempList);
            console.log(totalUsers)
          } catch (error) {
            console.error("Error deleting user:", error);
          }
    };

    useEffect(() => {
        fetchUsers();
      }, []);

    let users = totalUsers;
    console.log("hello")
    console.log(users);
    return (
        <>
        <div className="w-full flex justify-center mt-10">
                <div className="w-full max-w-3xl bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-[#14422C]">
                            <tr>
                                <th className="px-6 py-3 text-center text-sm font-medium text-white">
                                    Number of Users
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            <tr>
                                <td className="px-6 py-4 text-sm text-gray-800 text-center">{users.length}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="w-full flex justify-center mt-10">
                <div className="w-full max-w-3xl bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-[#14422C]">
                            <tr>
                                <th className="px-6 py-3 text-center text-sm font-medium text-white">
                                    Full Name
                                </th>
                                <th className="px-6 py-3 text-center text-sm font-medium text-white">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-center text-sm font-medium text-white">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td className="px-6 py-4 text-sm text-gray-800 text-center">{user[0]} {user[1]}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800 text-center">{user[2]}</td>
                                    
                                    <td className="px-6 py-4 text-sm text-gray-800 text-center"><button onClick={() =>
                                        deleteUser(user[2])
                                    }
                                    className={`px-3 py-1 rounded text-white ${
                                    'bg-red-600 hover:bg-red-700'
                                      }`}>Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Users
