"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { createChart, ColorType } from "lightweight-charts";
import axios from "axios";
import io from "socket.io-client";
import calculatePriceChange from "../utils/calculatePriceChnage";
import Colors from "../colors";
import { useSearchParams } from "next/navigation";

const SOCKET_URL = "https://upstock-api.onrender.com/streaming_user_specific"; // Your WebSocket URL
const HISTORICAL_CANDLE_API = "https://api.upstox.com/v2/historical-candle"; // Upstox Historical Candle API
const INTRADAY_API = "https://api.upstox.com/v2/historical-candle/intraday"; // Upstox Intraday API

function Page() {
  const chartContainerRef = useRef(null);
  const candleSeriesRef = useRef(); // Ref for candleSeries tradingView
  const searchParams = useSearchParams();

  const theme = searchParams.get("theme") === "dark" ? "dark" : "light";
  const Name = searchParams.get("name") || null;
  const key = searchParams.get("key") || null;

  const [stockData, setStockData] = useState(null);
  const [stockCurrentPrice, setStockCurrentPrice] = useState(null);
  const [stockSocketData, setStockSocketData] = useState(null);

  function handleSocketData(newCandleData) {
    const timestamp = parseInt(newCandleData.time, 10); // Time in seconds
    const updatedCandle = {
      time: timestamp,
      open: newCandleData.open,
      high: newCandleData.high,
      low: newCandleData.low,
      close: newCandleData.close,
    };

    setStockData((prevData) => {
      if (!prevData) return [updatedCandle];

      const updatedData = [...prevData];
      const lastCandle = updatedData[updatedData.length - 1];

      // If the new data belongs to the same minute, update it
      if (lastCandle && lastCandle.time === updatedCandle.time) {
        updatedData[updatedData.length - 1] = {
          ...lastCandle,
          high: Math.max(lastCandle.high, updatedCandle.high),
          low: Math.min(lastCandle.low, updatedCandle.low),
          close: updatedCandle.close,
        };
      } else {
        // Otherwise, add the new candle
        updatedData.push(updatedCandle);
      }

      // Update the chart data
      // candleSeriesRef.current?.setData(updatedData);
      return updatedData;
    });
  }

  function convertToUTCMillisecondsWithoutOffset(dateString) {
    const cleanTime = dateString.split("+")[0];

    // Create a Date object from the clean time string
    const dateObject = new Date(cleanTime);

    // If the date is invalid, throw an error
    if (isNaN(dateObject.getTime())) {
      throw new Error("Invalid date format received from Upstox");
    }

    // Extract the components for the desired format
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(dateObject.getDate()).padStart(2, "0");
    const hours = String(dateObject.getHours()).padStart(2, "0");
    const minutes = String(dateObject.getMinutes()).padStart(2, "0");

    // Return the formatted string
    console.log(`${year}-${month}-${day} ${hours}:${minutes}`);

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  const encodeURIComponent = (key) => key?.replace(/\|/g, "%7C");

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef?.current?.clientWidth,
      });
    };

    const chart = createChart(chartContainerRef?.current, {
      layout: {
        background: {
          type: ColorType.Solid,
          color:
            theme === "dark" ? Colors.dark_background : Colors.light_background,
        },
        textColor: theme === "dark" ? Colors.dark_text : Colors.light_text,
      },
      grid: {
        horzLines: {
          color: theme === "dark" ? Colors.dark_border : Colors.light_border,
        },
        vertLines: {
          color: theme === "dark" ? Colors.dark_border : Colors.light_border,
        },
      },
      width: chartContainerRef.current?.clientWidth,
      height: window.innerHeight,
      localization: {
        dateFormat: "yyyy-MM-dd",
        timeFormatter: (time) => {
          const date = new Date(time * 1000); // Convert seconds to milliseconds
          const hours = date.getHours().toString().padStart(2, "0");
          const minutes = date.getMinutes().toString().padStart(2, "0");
          const seconds = date.getSeconds().toString().padStart(2, "0");
          return `${hours}:${minutes}:${seconds}`;
        },
      },
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: Colors.profit,
      borderUpColor: Colors.profit,
      wickUpColor: Colors.profit,
      downColor: Colors.loss,
      borderDownColor: Colors.loss,
      wickDownColor: Colors.loss,
    });

    // Store the candleSeries in the ref
    candleSeriesRef.current = candleSeries;

    chart.timeScale().applyOptions({
      timeVisible: true,
      borderVisible: true,
      barSpacing: 5,
      tickMarkFormatter: (time, tickMarkType, locale) => {
        const date = new Date(time * 1000); // Convert seconds to milliseconds

        // Extract hours, minutes, day, month, and year
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
        const year = date.getFullYear();

        console.log(`${hours}:${minutes}`);
        // If the tick mark type indicates a day boundary (e.g., when the day changes)
        if (`${hours}:${minutes}` === "09:15") {
          // Return the date in "DD/MM/YYYY" format
          return `${day}`;
        } else {
          // Otherwise, return the time in "HH:mm" format
          return `${hours}:${minutes}`;
        }
      },
    });
    chart.timeScale().fitContent();

    const getHistoricalData = async () => {
      try {
        const response1 = await axios.get(
          `${HISTORICAL_CANDLE_API}/${encodeURIComponent(
            key
          )}/1minute/2025-01-16
          /2024-12-30`
        );

        const response2 = await axios.get(
          `${INTRADAY_API}/${encodeURIComponent(key)}/1minute`
        );

        const data =
          [
            ...response2.data?.data?.candles,
            ...response1.data?.data?.candles,
          ].reverse() || [];
        const formattedData = data.map((item) => ({
          time:
            Date.parse(convertToUTCMillisecondsWithoutOffset(item[0])) / 1000,
          open: item[1],
          high: item[2],
          low: item[3],
          close: item[4],
        }));

        setStockData(formattedData);
        if (formattedData.length > 0) {
          candleSeries.setData(formattedData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getHistoricalData();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [theme, location.search]);

  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on("connect", () => {
      console.log("Connected to socket:", socket.id);
      socket.emit("subscribe", [key]); // Example subscription
    });

    socket.on("stock-data", (data) => {
      if (Object.keys(data?.feeds).includes(key)) {
        const currentPrice =
          data?.feeds[key]?.ff?.marketFF?.ltpc?.ltp ||
          data?.feeds[key]?.ff?.indexFF?.ltpc?.ltp;

        const closingPrice =
          data?.feeds[key]?.ff?.marketFF?.ltpc?.cp ||
          data?.feeds[key]?.ff?.indexFF?.ltpc?.cp;

        const changeInPrice = currentPrice - closingPrice;
        const changePercentage = ((changeInPrice / closingPrice) * 100).toFixed(
          2
        );

        setStockCurrentPrice({
          currentPrice,
          Pre_close_price: closingPrice,
          priceChange: changeInPrice,
          percentageChange: parseFloat(changePercentage),
        });

        const newCandleData = {
          time: Math.floor(data?.currentTs / 1000),
          open: data?.feeds[key]?.ff?.marketFF?.ltpc?.ltp,
          high: data?.feeds[key]?.ff?.marketFF?.marketOHLC?.ohlc[1]?.high,
          low: data?.feeds[key]?.ff?.marketFF?.marketOHLC?.ohlc[1]?.low,
          close: data?.feeds[key]?.ff?.marketFF?.ltpc?.cp,
        };

        // Update the chart using the candleSeries stored in ref

        // setStockSocketData(newCandleData);

        handleSocketData(newCandleData);
      }
    });

    // return () => {
    //   socket.disconnect();
    //   console.log("Socket disconnected.");
    // };
  }, [key]);

  return (
    <div>
      {stockData && stockData.length > 0 && (
        <div className="absolute top-6 left-6  z-50">
          <h2
            style={{
              color: theme === "dark" ? Colors.dark_text : Colors.light_text,
              fontWeight: 400,
              fontSize: "20px",
            }}
          >
            {Name}
          </h2>
          <div className="flex gap-3">
            <h2
              style={{
                color: theme === "dark" ? "white" : "black",
                fontWeight: 500,
                fontSize: "14px",
              }}
            >
              ₹ {stockCurrentPrice?.currentPrice || 0.0}
            </h2>
            <h2
              style={{
                color: calculatePriceChange(
                  stockCurrentPrice?.Pre_close_price,
                  stockCurrentPrice?.currentPrice
                ).isPositive
                  ? Colors?.profit
                  : Colors?.errorColor,
                fontWeight: 500,
                fontSize: "14px",
              }}
            >
              {stockCurrentPrice &&
                `${stockCurrentPrice?.priceChange.toFixed(2) || 0.0} (${
                  Math.abs(stockCurrentPrice?.percentageChange) || 0.0
                }%)`}
            </h2>
          </div>
        </div>
      )}

      <div
        ref={chartContainerRef}
        style={{ position: "relative", height: "400px" }}
      />
    </div>
  );
}

export default Page;
