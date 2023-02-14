import React from "react";
import "./EventCard.css";
import { EventState } from "./Constants";

const formatTime = (time) => {
    let dateObj = new Date(time);
    return dateObj.toLocaleTimeString("en-IN", {timeStyle: "short"});
}

function EventCard(props) {
    return(
        <div className={`event-box container ${props.event.state.toLowerCase()}`}>
            <div className="event-icon-container">{props.event.event_category.substr(0,1)}</div>
            <div className="vertical-line"></div>
            <div className="event-detail-container">
                <div className="event-name">{props.event.event_name}</div>
                <div className="event-category">({props.event.event_category})</div>
                <div className="event-time">
                    {`${formatTime(props.event.start_time)} - ${formatTime(props.event.end_time)}`}
                </div>
              <div className="button-container">
                <button className="button" onClick={() => props.handleClick(props.event.id)}>
                    {props.event.state === EventState.SELECTED ? `REMOVE` : `SELECT`}
                </button>
              </div>
              </div>
          </div>
    )
}
export default EventCard;