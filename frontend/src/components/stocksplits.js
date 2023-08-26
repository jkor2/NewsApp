import React from "react";
import Side from "./sidebar";

function StockSplits() {
  return (
    <div className="App">
      <header className="App-header">
        <div class="parent">
          <div class="header">
            <div className="fifityvw ">
              <div className="header-title-format">
                <div className="title-font-large">
                  <span className="neon-blue">N</span>ews
                  <span className="neon-blue">R</span>oom
                  <span className="smaller-title">.com</span>
                </div>
              </div>
            </div>
            <div className="fifityvw"> yo</div>
          </div>
          <div class="sidebar">
            <Side curr={7} />
          </div>
          <div class="data stream-all">
            <div className="title-all">Stock Splits</div>
            <div className="stream-hold-all">
              Will hold the news via a stream
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default StockSplits;