function Card(name, sales) {
    return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
        <img
          className="w-full h-48 object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlItdunKKrV-8fQutsMrMnVLuRdWpUOuA7-g&s"
          alt="Card image"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{name} w/ PHP {sales}</div>
          <p className="text-gray-700 text-base">
            This is a simple card component built with Tailwind CSS. You can reuse this structure anywhere.
          </p>
        </div>
        <div className="px-6 pt-4 pb-4">
          <button className="bg-[#14422C] text-white px-4 py-2 rounded hover:bg-green-800 transition duration-200">
            Learn More
          </button>
        </div>
      </div>
      
    );
  }

export default Card
  