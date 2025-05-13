import Card from './Card.jsx'

function Sales(props) {

    let listSoldProducts = [
        { 'Kangkong (bundle)': 40 },
        { 'Pumpkin (1kg)': 250 },
        { 'Chicken Breast (1kg)': 630 },
        { 'Tomatoes (1kg)': 35 },
        { 'Red Rice (5kg)': 560 },
        { 'Tomatoes (1kg)': 140 },
        { 'Pumpkin (1kg)': 100 },
        { 'Eggplant (1kg)': 150 }
    ];
    let weeklySales = 1870
    let monthlySales = 1905;
    let yearlySales = 1905;

    let keys =  [];

    const cardItems = [];

    listSoldProducts.forEach(obj => {
        keys.push(Object.keys(obj)[0]);
    })

    for (let i = 0; i < listSoldProducts.length; i++) 
    {
        cardItems.push(Card(keys[i], listSoldProducts[i][keys[i]]))
    }

    return (
        <div className="flex flex-wrap gap-4 p-4 justify-center">
            {cardItems}
        </div>
    );
}

export default Sales
