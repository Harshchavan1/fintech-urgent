import React, { useState, useEffect } from "react";
import "./Stats.css";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import StatsRow from "./StatsRow.js";
import { key } from "./api";
import axios from "axios";
import { db } from "./firebase"; // Firebase config import
import { collection, onSnapshot } from "firebase/firestore"; // Import Firestore functions

const BASE_URL = "https://finnhub.io/api/v1/quote?symbol=";
const KEY_URL = `&token=${key}`;

const testData = [];

function Stats() {
  const [stocksData, setStocksData] = useState([]);
  const [myStocks, setMyStocks] = useState([]);

  // Fetch Firestore collection and set 'myStocks'
  const getMyStocks = () => {
    const stocksCollection = collection(db, "myStocks"); // Use Firestore 'collection' to reference 'myStocks'
    onSnapshot(stocksCollection, (snapshot) => {
      let promises = [];
      let tempData = [];
      
      snapshot.docs.forEach((doc) => {
        promises.push(
          getStocksData(doc.data().ticker)
            .then((res) => {
              tempData.push({
                id: doc.id,
                data: doc.data(),
                info: res.data,
              });
            })
        );
      });

      Promise.all(promises).then(() => {
        setMyStocks(tempData);
      });
    });
  };

  // Fetch stock data from the API
  const getStocksData = (stock) => {
    return axios
      .get(`${BASE_URL}${stock}${KEY_URL}`)
      .catch((error) => {
        console.error("Error", error.message);
      });
  };

  useEffect(() => {
    const stocksList = ["AAPL", "MSFT", "TSLA", "FB", "BABA", "UBER", "DIS", "SBUX"];
    
    // Fetch my stocks from Firestore
    getMyStocks();

    // Fetch data for default stock list
    let promises = [];
    stocksList.map((stock) => {
      promises.push(
        getStocksData(stock).then((res) => {
          testData.push({
            name: stock,
            ...res.data,
          });
        })
      );
    });

    Promise.all(promises).then(() => {
      setStocksData(testData);
    });
  }, []);

  return (
    <div className="stats">
      <div className="stats__container">
        <div className="stats__header">
          <p>Stocks</p>
          <MoreHorizIcon />
        </div>
        <div className="stats__content">
          <div className="stats__rows">
            {myStocks.map((stock) => (
              <StatsRow
                key={stock.data.ticker}
                name={stock.data.ticker}
                openPrice={stock.info.o}
                volume={stock.data.shares}
                price={stock.info.c}
              />
            ))}
          </div>
        </div>
        <div className="stats__header stats-lists">
          <p>Lists</p>
        </div>
        <div className="stats__content">
          <div className="stats__rows">
            {stocksData.map((stock) => (
              <StatsRow
                key={stock.name}
                name={stock.name}
                openPrice={stock.o}
                price={stock.c}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
