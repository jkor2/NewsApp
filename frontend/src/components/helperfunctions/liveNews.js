import Fav from "./favs";
import convertISOToFormattedDateTime from "../time_convert-2";

//Reusable FI
export default function reuse(news, callback, user) {
  console.log(user);
  return news.map((curr) => {
    return (
      <div className="hold-crypto-news">
        <div className="fifty-five">{curr.headline}</div>
        <div className="hold-right">
          <div className="">{curr.source}</div>
          <div className="">
            <a href={curr.url} target="_blank">
              View
            </a>
          </div>
          <div className="small-text-date">
            {convertISOToFormattedDateTime(curr.updated_at)}
          </div>
          <div>
            <button
              className="faviortie-btn"
              onClick={() =>
                Fav(
                  curr.headline,
                  curr.source,
                  curr.url,
                  convertISOToFormattedDateTime(curr.updated_at),
                  callback,
                  user
                )
              }
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  });
}
