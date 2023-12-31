import React, { useEffect, useRef } from "react";
import Side from "./sidebar";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import data from "./datasearch";
import convert_data from "./chartdata_convert";
import Chart from "./chartDisplay";
import formatData from "./helperfunctions/formatData";
import Header from "./header";
import LoadingIcon from "./helperfunctions/spnningIcon";

function Search() {
  //Protected Variables
  const url1 = process.env.REACT_APP_URL1;
  const url2 = process.env.REACT_APP_URL2;
  const url3 = process.env.REACT_APP_URL3;
  const url4 = process.env.REACT_APP_URL4;
  const url5 = process.env.REACT_APP_URL5;
  const url6 = process.env.REACT_APP_URL6;
  const url7 = process.env.REACT_APP_URL7;
  const url8 = process.env.REACT_APP_URL8;
  const key = process.env.REACT_APP_KEY;
  const secret = process.env.REACT_APP_SECRET;

  // User Auth
  const token = localStorage.getItem("token");
  const [userData, setUserData] = React.useState([]);

  // Chart Data State
  const [chartData, setChartData] = React.useState([]);
  const [current, setCurrent] = React.useState([]);
  const [placeholder1, setPlaceholder] = React.useState(
    "SPDR S&P 500 ETF Trust"
  );

  // Adding to faviorties
  const [response_add, setResponseAdd] = React.useState("");
  const [pop_up, setPop_Up] = React.useState(false);

  React.useEffect(() => {
    /**
     * Initial fetch requests
     */
    fetch("/api/auth", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setUserData(data));

    fetch(url3, {
      headers: {
        "APCA-API-KEY-ID": key,
        "APCA-API-SECRET-KEY": secret,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Process the response data here
        setCurrent(data.news);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
    fetch(url6, {
      headers: {
        "APCA-API-KEY-ID": key,
        "APCA-API-SECRET-KEY": secret,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Process the response data here
        //Converting data to correct format

        setChartData(convert_data(data.bars));
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  }, []);

  // Adding to faviorite actions
  function handleFavAction(action) {
    setResponseAdd(action);
    setPop_Up(true);
  }

  // Searchable tickers
  const items = data;

  // Handling selection of new stock
  const handleOnSelect = (item) => {
    // Requesting data
    fetch(url1 + item.id + url2, {
      headers: {
        "APCA-API-KEY-ID": key,
        "APCA-API-SECRET-KEY": secret,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Process the response data here
        setCurrent(data.news);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });

    setPlaceholder(item.name);

    if (item.type) {
      // if type is True, then crypto currency
      const options = {
        method: "GET",
        headers: { accept: "application/json" },
      };
      fetch(url7 + item.id + url8, options)
        .then((response) => response.json())
        .then((response) =>
          setChartData(convert_data(response.bars[`${item.id}/USD`]))
        )
        .catch((err) => console.error(err));
    } else {
      //Type is False, stock
      fetch(url4 + item.id + url5, {
        headers: {
          "APCA-API-KEY-ID": key,
          "APCA-API-SECRET-KEY": secret,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setChartData(convert_data(data.bars));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  // Formatting result for auto complete
  const formatResult = (item) => {
    return (
      <>
        <span
          style={{
            display: "block",
            textAlign: "left",
            padding: "none",
            fontSize: ".75vw",
          }}
        >
          {item.name}
        </span>
        <span
          style={{
            display: "block",
            textAlign: "left",
            padding: "none",
            fontSize: ".75vw",
          }}
        >
          {item.id}
        </span>
      </>
    );
  };

  function popup(data) {
    /**
     * Popup for adding to favs
     */
    return (
      <div className="confrimation">
        <div className="test1">
          <button className="button-hold-conf" onClick={handleConfirmation}>
            X
          </button>
        </div>
        <div className="test2">
          <div>{data.action}</div>
        </div>
      </div>
    );
  }

  function handleConfirmation() {
    // Handling popup display state
    setPop_Up(false);
  }

  // Render
  return (
    <div className="App">
      <header className="App-header">
        <div class="parent">
          <Header />
          <div class="sidebar">
            <Side curr={3} />
          </div>
          <div class="data stream-all">
            <div className="title-all ">Search by Name</div>
            <div
              className="front"
              style={{
                width: "30vw",
              }}
            >
              <ReactSearchAutocomplete
                items={items}
                onSelect={handleOnSelect}
                formatResult={formatResult}
                placeholder={placeholder1}
              />
            </div>
            <div className="stream-hold-all-2">
              <div className="news-search">
                {current && userData.authData ? (
                  formatData(
                    current,
                    handleFavAction,
                    userData.authData.user._id
                  )
                ) : (
                  <div className="holder-loader">
                    <LoadingIcon />
                  </div>
                )}
              </div>
              {pop_up ? (
                <div className="confrimation2">{popup(response_add)}</div>
              ) : (
                ""
              )}

              <div className="chart-search">
                <Chart priceData={chartData} />
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Search;
