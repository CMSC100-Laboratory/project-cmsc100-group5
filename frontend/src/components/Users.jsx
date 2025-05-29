import { useState, useEffect } from 'react';
import axios from "axios";
function Users() {
    const [totalUsers, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [oldEmail, setOldEmail] = useState('');



    const handleEditClick = (user) => {
        setEditingUser(user);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        let tempList = users;
        for (let i = 0; i < tempList.length; i++)
        {
            if (tempList[i][2] == oldEmail)
            {
                tempList[i][0] = firstName
                tempList[i][1] = lastName
                tempList[i][2] = email
                break;
            }
        }
        setUsers(tempList)
        await axios.post("http://localhost:3000/update-user", { email: oldEmail, FirstName: firstName, LastName: lastName, newEmail: email });
        setEditingUser(null)
      };

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
            await axios.post("http://localhost:3000/delete-user", { email: email })
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
                                    Remove
                                </th>
                                <th className="px-6 py-3 text-center text-sm font-medium text-white">
                                    Update
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
                                        className={`px-3 py-1 rounded text-white ${'bg-red-600 hover:bg-red-700'
                                            }`}>Delete</button></td>
                                    <td className="px-6 py-4 text-sm text-gray-800 text-center"><button onClick={() =>
                                        {
                                            setOldEmail(user[2])
                                            handleEditClick(user)}
                                    }
                                    className="px-3 py-1 rounded text-white bg-green-600 hover:bg-green-700">Edit</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {editingUser && (
                        <div
                            className="fixed top-1/4 left-1/2 transform -translate-x-1/2 bg-white p-8 rounded-lg shadow-lg w-96 z-50"
                            
                        >
                            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Edit User</h2>

                            <form onSubmit={handleSubmit}>
                                <label className="block mb-2 text-gray-700 font-medium" htmlFor="name">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />

                                <label className="block mb-2 text-gray-700 font-medium" htmlFor="name">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />

                                <label className="block mb-2 text-gray-700 font-medium" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />

                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        onClick={() => setEditingUser(null)}
                                        className="px-5 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-5 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}


                </div>
            </div>
        </>
    );
}

export default Users
