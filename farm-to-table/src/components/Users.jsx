function Users(props) {
    let users = props.users
    return (
        <>
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
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td className="px-6 py-4 text-sm text-gray-800 text-center">{user[0]} {user[1]}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800 text-center">{user[2]}</td>
                                </tr>
                            ))}
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
        </>
    );
}

export default Users
