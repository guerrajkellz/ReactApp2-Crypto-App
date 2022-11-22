import './App.css';
import {useEffect,useState} from "react";

const COINS = ["BTCUSDT","LTCBTC","ETHUSDT","SOLUSDT","DODOBTC"]
let COIN_NAME ={

BTCUSDT:"BITCOIN",
LTCBTC:"LITECOIN",
ETHUSDT:"ETHERUM",
SOLUSDT:"SOLANA",
DODOBTC:"DODGECOIN"


}

function App() {


  const [coinData,setCoinData] = useState([]);
  
  useEffect(() => {

    fetch("https://api2.binance.com/api/v3/ticker/24hr")
    .then((res) => res.json())
    .then((data) =>{

      const filteredData = data.filter(items => {
          
          if(COINS.includes(items.symbol)){

          return true;

          }
      })

      setCoinData(filteredData)



    })





  },[])

  return (
    <div className="App">
<nav>
      <img
        alt="logo"
        src="https://assets.codepen.io/6060109/crypto-logo-secondary.png"
      />
          <input type="text" placeholder="Search" />
      </nav>
      <div className="main-content">
        <h2>Today's cryptocurrency prices</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h %</th>
            </tr>
          </thead>
        
        <tbody>
            {coinData.map((coin,i) => {
              return (
            <tr key={coin.symbol}>
              <td>{i+1}</td>
              <td>{COIN_NAME[coin.symbol]}</td>
              <td>${Number(coin.lastPrice).toLocaleString()}</td>
              <td 
               style={Number(coin.priceChangePercent)>0?
                     { color: "green" }:{color:"red"}}>
                     {Number(coin.priceChangePercent)>0?
                     "▲":"▼"}
                
                     {coin.priceChangePercent}%
              </td>
            </tr>
                )
              }
            )}
          </tbody>
        </table>
        <div className="bottom-logo-ctr">
          <img
            className="bottom-logo"
            alt="logo"
            src="https://assets.codepen.io/6060109/crypto-logo-primary.png"
          />
        </div>
      </div>
    
     
    </div>
  );
}

export default App;
