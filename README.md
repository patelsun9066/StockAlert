# Athena - Stock Price Movement Alerts

Link to Application: http://www.athenastockwatcher.io.s3-website-us-east-1.amazonaws.com/

Trading stocks as a financal industry outsider is difficult! If your regular job responsibilities don`t already involve monitoring daily market activity then it can be extremely difficult to stay on top of your positions!
If you find yourself in this predicament, look no further.....

Athena is a Full Stack Cloud application designed to help novice traders stay updated on price movements for desired stocks. Users simply specify which stock + price movement interval they would like to be notified via Email (valid email required) and Anthena`s distributed serverless backend will alert users of any price movement below/above the threshold for tha stock.

<b>Using the application is simple! First, use the dynamic candlestick price explorer to explore stock prices!<b>
![](candlestick.gif)


<b>Then, subscribe for stock alerts for your desired stock ticker!<b>
![](emailsub.gif)


<b>Finally, you ll automatically recieve email alerts everything that stock`s price changes above your inputted threshold! Enjoy!<b>
![](emailstock.gif)


Tecnologies Used:
  
  Front-End: React.js, HTML, CSS, Axios.js, AWS S3 (for static hosting)
  
  Backend: Node.js, Axios, AWS (Lambda, Cloudwatch, DynamoDB, SES/SNS , API GateWay) 
