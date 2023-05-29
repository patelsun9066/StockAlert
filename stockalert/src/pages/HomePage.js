import React from 'react';
import bearbull from './bearbull.jpg'

function HomePage() {

    // DISPLAY the movies
    return (
        <>
            <article>
                <h3>Stock Price Movement Monitoring and Alerting System </h3>
                <br></br>
                <img src={bearbull} alt="Logo" />
                <br></br>
                <p><b>A Full Stack Distributed Serverless Cloud Application</b></p>
                <p><b>FrontEnd: React.js - Javascript - HTML - CSS</b></p>
                <p><b>Backend: Node.js - Axios - AWS (Lambda, Cloudwatch, DynamoDB, SES, API GateWay)</b></p>
            </article>
        </>
    );
}

export default HomePage;