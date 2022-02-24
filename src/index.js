import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import axios from 'axios';
import Exchange from './exchangeModel';
import connectDb from './db';


config();

const { POLYGON_BASE_URL, POLYGON_URL_SUFFIX } = process.env;

const app = express();
connectDb();

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use(express.json());


app.get('/', (req, res) => {
  res.status(200).json({ message: 'fx is five alive' });
});

const currencies = ['EUR/USD', 'USD/NGN', 'GBP/USD'];
setInterval( async() => {
        try {
            const results = currencies.map(async (currency) => {
                const result = await axios.get(`${POLYGON_BASE_URL}${currency}${POLYGON_URL_SUFFIX}`);
                return result;
            });
            const finalResults = await Promise.all(results);
            const refinedResults = finalResults.map(({data}) => data);
            const drafts = [];
            for (let item of refinedResults) {
                drafts.push({
                    insertOne: {
                      document: {
                        rateAsBid: item.last.bid,
                        rateAsAsk: item.last.ask,
                        currencyPair: `${item.from}/${item.to}`,
                        timestampFromSource: item.last.timestamp, 
                        timestampAtInsertion: Date.now(),
                      },
                    },
                  })
            }
            await Exchange.bulkWrite(drafts);
        } catch (error){
            console.log(error);
        }
}, 30000)

const port = process.env.PORT || 2000;

app.listen(port, () => {
    console.log(`fx is live on Port ${port}`)
});