import React from "react";
function Side(curr) {
  const get_current = React.useState(curr);
  let current = get_current[0].curr;

  return (
    <div className="sidebar-format">
      <span>
        <a
          href="/content"
          className={current == 1 ? "current-side" : "notcurrent-side"}
        >
          All
        </a>
      </span>
      <span>
        <a
          href="/content"
          className={current == 2 ? "current-side" : "notcurrent-side"}
        >
          Split
        </a>
      </span>
      <span>
        <a
          href="/content"
          className={current == 3 ? "current-side" : "notcurrent-side"}
        >
          Search
        </a>
      </span>
      <span>
        <a
          href="/content"
          className={current == 4 ? "current-side" : "notcurrent-side"}
        >
          Charts
        </a>
      </span>
      <span>
        <a
          href="/content"
          className={current == 5 ? "current-side" : "notcurrent-side"}
        >
          Favorites
        </a>
      </span>
    </div>
  );
}

export default Side;
