//import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useCallback }  from 'react';

const ACCESS_KEY = '7982969fe5cbd35b9951eba27f13350e';
const BASE_URL = 'http://api.exchangeratesapi.io'
const itemsList = [
  {
    title : 'Adidas shoes',
    img: 'https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80',
    price: 5000
  },
  {
    title : 'Mac Book pro',
    img: 'https://images.unsplash.com/photo-1542641197-cdc5b5d1923f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=765&q=80',
    price: 200000
  },
  {
    title : 'Watch',
    img: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80',
    price: 3000
  },
  {
    title : 'iPhone 12',
    img: 'https://images.unsplash.com/photo-1537589376225-5405c60a5bd8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    price: 62000
  }
];

function formatCurrency(amount, currency){
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minusSign: '-',
    minimumFractionDigits: 2
  }).format(amount)
}


function App() {
  const [items, setItems] = useState(itemsList);
  const [currency , setCurrency] = useState('INR');

  const handleChange = (event)=>{
    setCurrency(event.target.value)
  }

  const processItemsPrice = (itemsList, currency)=>{
    const result = itemsList.map((item)=>{
      return {
        ...item,
        price: formatCurrency(item.price, currency)
      }
    })
    setItems(result);
  }

  const processItemsPriceMemo = useCallback(() => processItemsPrice(itemsList, currency), [currency]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${BASE_URL}/v1/latest?access_key=${ACCESS_KEY}&format=1&symbols=INR`)
      .then(response => response.json()).then(data => data);
      const result = itemsList.map((item)=>{
        return {
          ...item,
          price: formatCurrency(item.price / response.rates['INR'], currency)
        }
      })
      setItems(result);
    }

    currency !== 'INR' ?  fetchData() : processItemsPriceMemo(currency);

  }, [currency]);

  return (
    <>
    <div className={'dropdown'}>
        <span>{"Currency "}</span>
        <select value={currency} onChange={handleChange}>
          <option value="INR">INR</option>
          <option value="EUR">EUR</option>
        </select>
      </div>
      <div className="row">
       {
        items.map((item)=>{
          return(
            <div className="column">
            <div key={item.title} className="card">
              <h3>{item.title}</h3>
              <img className="image" alt={item.title}  src={item.img}></img>
              <p>{item.price}</p>
            </div>
            </div>
          )
        })
      }
    </div>
    </>

  );
}

export default App;
