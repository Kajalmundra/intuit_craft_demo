import React from "react";
import EventCard from "./EventCard";
import "./EventsContainer.css";

function EventsContainer(props) {
    return(
        <div className="events-container">
        {
            props.eventsList.map((obj, idx) => {
                return (<EventCard key={obj.id} event={obj} handleClick={props.handleClick} />)
            })
        }
        </div>
    );
}

export default EventsContainer;