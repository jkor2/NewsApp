import React, { useEffect, useRef } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";

export default function Chart({ priceData }) {
  /**
   * Formatting and displayinf chart
   */
  const chartContainerRef = useRef(); // container reference
  const chartWrapperRef = useRef(); // wrapper reference

  useEffect(() => {
    if (priceData.length === 0) return; // Don't render if priceData is empty

    chartWrapperRef.current.style.width = "100%"; // Set wrapper width to 100%
    chartWrapperRef.current.style.height = "100%"; // Set wrapper height to 100%

    chartContainerRef.current.innerHTML = ""; // Clear existing content

    const chart = createChart(chartContainerRef.current, {
      width: chartWrapperRef.current.offsetWidth, // Use wrapper's width
      height: chartWrapperRef.current.offsetHeight, // Use wrapper's height
      //Styling
      layout: {
        backgroundColor: "black",
        textColor: "rgba(255, 255, 255, 0.9)",
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      layout: {
        background: { color: "black" },
        textColor: "white",
      },
      grid: {
        vertLines: {
          color: "black",
        },
        horzLines: {
          color: "black",
        },
      },
      priceScale: {
        borderColor: "#cccccc",
      },
      timeScale: {
        borderColor: "#2272FF",
        timeVisible: true,
      },
    });

    // Candle series
    const candleSeries = chart.addCandlestickSeries({
      upColor: "#2272FF",
      downColor: "white",
      borderDownColor: "white",
      borderUpColor: "#2272FF",
      wickDownColor: "white",
      wickUpColor: "#2272FF",
    });

    candleSeries.setData(priceData);
  }, [priceData]);

  // Place Holder
  return (
    <div ref={chartWrapperRef} className="chart-wrapper">
      <div ref={chartContainerRef} className="chart-container" />
    </div>
  );
}
