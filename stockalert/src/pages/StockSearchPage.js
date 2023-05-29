import React, { useState, useMemo} from 'react';
import { useNavigate } from 'react-router-dom';

import "./stocks.css";
import Chart from 'react-apexcharts';
import axios from "axios";

function StockSearchPage() {

  const navigate = useNavigate();

  const [tickerName, setTickerName] = useState("MSFT")

  let selectedTicker = tickerName 

  
  const proxyUrl = 'https://cors-anywhere-ew5o.onrender.com/'
   /*
  const url = `${proxyUrl}https://query1.finance.yahoo.com/v8/finance/chart/${selectedTicker}`
  async function getStockData() {
      const response = await fetch(url)
      return response.json()
  };
  */

  async function getAPIStockData() {
    const tickerrequest = {
      method: 'GET',
      url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-chart',
      params: {
        interval: '1mo',
        symbol: selectedTicker,
        range: '5y',
        region: 'US',
        includePrePost: 'false',
        useYfid: 'true',
        includeAdjustedClose: 'true',
        events: 'capitalGain,div,split'
      },
      headers: {
        'X-RapidAPI-Key': '127e2bf455msh6cd398823023b2ep121aa1jsn8dfb270a9c75',
        'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
      }
    };
    const response = await axios.request(tickerrequest);
    console.log("RESPONSE FROM getAPIStockData",response);
    return response;
  };



  const directionEmojis = {
    up: '🐂',
    down: '🐻',
    "": ""
  };

  const chart = {
    options: {
      chart :{
        type : 'candlestick',
        height : 350
      },
      title : {
        text : `${selectedTicker} Chart`,
        align : 'left'
      },
      xaxis : {
        type : 'datetime'
      },
      yaxis : {
        tooltip : {
          enabled: true
        }
      }
    },
  };

  const round = (number) => {
    return number ? +(number.toFixed(2)) : null;
  }

  const [price, setPrice] = useState(-1);
  const [prevPrice, setprevPrice] = useState(-1);
  const [priceTime, setpriceTime] = useState(null)

  const [series, setSeries] = useState([{
    data: []
  }]);

  // For User Add/ Subscribe Form...
  const [UserName, setUserName] = useState("")
  const [Email, setEmail] = useState("")
  const [PhoneNumber, setPhoneNumber] = useState("")
  const [StocksAlert, setStocksAlert] = useState("")
  const [PercentChange, setPercentChange] = useState("")
  // ------------------------------------------------------//  

  let axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
    }
  };


  async function addUser() {
    try {
      const response = await axios.post(`${proxyUrl}https://60jj4b17pc.execute-api.us-east-2.amazonaws.com/createPerson`, {
        "UserName" : UserName,
        "Email" : Email,
        "PhoneNumber" : PhoneNumber,
        "StocksAlert" : {
          [StocksAlert] : PercentChange
        }
      }, axiosConfig)

      console.log(response);
      alert(`SUCCESS - Subscribed to Email Notifications! - You will be Alerted via Email everytime ${StocksAlert} moves ${PercentChange} %`)
      navigate('/stock-search');
      

    } catch (error) {
        console.log(error)
    }
  };

  async function currentPrice() {
    try {
      
      // Grab Stock Data from Yahoo Finance {stockTicker} end
      const data = await getAPIStockData();
      console.log("THIS IS THE DATA FROM API CALL",data);
      const tickerData = data.data.chart.result[0]

      // Set ticker info in React hooks
      setprevPrice(price)
      setPrice(tickerData.meta.regularMarketPrice.toFixed(2));
      setpriceTime(new Date(tickerData.meta.regularMarketTime * 1000));

      // 
      const quote = tickerData.indicators.quote[0];
      const prices = tickerData.timestamp.map((timestamp, index) => ({
        x: new Date(timestamp * 1000),
        y: [quote.open[index], quote.high[index], quote.low[index], quote.close[index]].map(round)
      }));

      setSeries([{
        data: prices,
      }]);

    } catch (error) {
      console.log(error);
    }

  };

  const direction = useMemo(() => prevPrice < price ? "up" : prevPrice > price ? "down" : "", [prevPrice, price])
  

  return (
    <div>
      <div className = "tickerName">
        <form onSubmit={(e) => { e.preventDefault();}}>
              <legend className = "tickerNameLegend">Enter Stock Ticker Below</legend>
              <label for="tickerName"></label>
              <input
                type="text"
                value={tickerName}
                onChange={e => setTickerName(e.target.value)}
                id="tickerName"
                minLength="1"
                required="required" />
              <label for="submit">
              <button type="submit" id="submit" onClick={currentPrice}>Fetch Prices!</button></label>
          </form>
      </div>

      <div className = {['priceTicker ', direction].join(' ')}>
        ${price} {directionEmojis[direction]}
      </div>
      <div className = "priceTime">
        {priceTime && priceTime.toLocaleTimeString()}
      </div>
      <div>
        <Chart options={chart.options} series={series} type="candlestick" width="100%" height={320} />
      </div>

      <div className = "AddUser">
        <h3>Subscribe To Our Automatic Price Movement Alert System Below:</h3>
        <form onSubmit={(e) => { e.preventDefault();}}>
              <label for="UserName">Name: </label>
              <input
                type="text"
                value={UserName}
                onChange={e => setUserName(e.target.value)} 
                id="UserName"
                minLength="1"
                required="required" 
                className = "UserName"/>
              <br></br>
              <label for="Email">Email: </label>
              <input
                type="text"
                value={Email}
                onChange={e => setEmail(e.target.value)} 
                id="UserEmail"
                minLength="1"
                required="required" 
                className = "Email"/>
              <br></br>
              <label for="PhoneNumber">Phone Number: </label>
              <input
                type="text"
                value={PhoneNumber}
                onChange={e => setPhoneNumber(e.target.value)} 
                id="PhoneNumber"
                minLength="1"
                required="required" 
                className = "PhoneNumber"/>
              <br></br>
              <label for="StocksAlert">Stock Ticker: </label>
              <input
                type="text"
                value={StocksAlert}
                onChange={e => setStocksAlert(e.target.value)} 
                id="StocksAlert"
                minLength="1"
                required="required"
                className = "StocksAlert" />
              <br></br>
              <label for="PercentChange">Percentage Change: </label>
              <input
                type="text"
                value={PercentChange}
                onChange={e => setPercentChange(e.target.value)} 
                id="PercentChange"
                minLength="1"
                required="required"
                className = "PercentChange"/>
              <br></br>
              <label for="submit">
              <button type="submit" id="submit" onClick={addUser}>Subscribe</button></label>
          </form>
      </div>
    </div>
  );
}

export default StockSearchPage;
