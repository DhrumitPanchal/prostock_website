"use client";
import React, { useEffect, useRef, useState } from "react";
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
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const candleSeriesRef = useRef(); // Ref for candleSeries tradingView
  const searchParams = useSearchParams();

  const theme = searchParams.get("theme") === "dark" ? "dark" : "light";
  const Name = searchParams.get("name") || null;
  const key = searchParams.get("key") || null;

  const [stockData, setStockData] = useState(null);
  const [stockCurrentPrice, setStockCurrentPrice] = useState(null);
  const [stockSocketData, setStockSocketData] = useState(null);

  function handleSocketData(newCandleData: any) {
    const timestamp = parseInt(newCandleData.time, 10); // Assuming `ts` is in milliseconds
    const date = new Date(timestamp);

    // Check if the time corresponds to the start of a complete minute
    if (date.getSeconds() === 0 && date.getMilliseconds() === 0) {
      setStockSocketData(newCandleData);
      console.log("Socket data changes at a complete minute:");
      console.log(newCandleData);

      // Update the candle series
      candleSeriesRef.current?.update(newCandleData);
    } else {
      // // Optionally log or handle skipped data
      // console.log("Skipped data (not at the start of a complete minute):");
      // console.log(newCandleData);
    }
  }

  const convertTime = (time: string) => {
    const date = new Date(time);
    return Math.floor(date.getTime() / 1000);
  };

  const encodeURIComponent = (key: string) => key?.replace(/\|/g, "%7C");

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
    });
    chart.timeScale().fitContent();

    const getHistoricalData = async () => {
      try {
        const response = await axios.get(
          `${HISTORICAL_CANDLE_API}/${encodeURIComponent(
            key
          )}/1minute/2025-01-02/2024-12-30`
        );
        const data = response.data?.data?.candles.reverse() || [];
        const formattedData = data.map((item: any) => ({
          time: convertTime(item[0]),
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
          <div className="flex gap-4">
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
