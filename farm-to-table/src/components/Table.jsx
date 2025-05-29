function Table(name, sales, quantity) {
  return (
    <tr>
      <td className="px-6 py-4 text-sm text-gray-800 text-center">{name}</td>
      <td className="px-6 py-4 text-sm text-gray-800 text-center">{quantity}</td>
      <td className="px-6 py-4 text-sm text-gray-800 text-center">₱{sales}</td>
    </tr>

  );
}

export default Table
