import React, { useState, useMemo} from 'react';
import "./stocks.css";
import Chart from 'react-apexcharts';


function StockSearchPage() {

  const [tickerName, setTickerName] = useState("MSFT")

  let selectedTicker = tickerName 
  const proxyUrl = 'https://cors-anywhere-ew5o.onrender.com/'
  const url = `${proxyUrl}https://query1.finance.yahoo.com/v8/finance/chart/${selectedTicker}`
  async function getStockData() {
      const response = await fetch(url)
      return response.json()
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

  
  
  async function currentPrice() {
    try {
      
      // Grab Stock Data from Yahoo Finance {stockTicker} end
      const data = await getStockData();
      console.log(data);
      const tickerData = data.chart.result[0]

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
    </div>
  );
}

export default StockSearchPage;
