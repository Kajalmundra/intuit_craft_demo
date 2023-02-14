import React, { useState } from "react";
import "./App.css";
import EventsContainer from "./EventsContainer";
import { EventState } from "./Constants";

const mockApiData = [
  {
    "id": 1,
    "event_name": "Butterfly 100M",
    "event_category": "Swimming",
    "start_time": "2022-12-17 13:00:00",
    "end_time": "2022-12-17 14:00:00"
  },
  {
    "id": 2,
    "event_name": "Backstroke 100M",
    "event_category": "Swimming",
    "start_time": "2022-12-17 13:30:00",
    "end_time": "2022-12-17 14:30:00"
  },
  {
    "id": 3,
    "event_name": "Freestyle 400M",
    "event_category": "Swimming",
    "start_time": "2022-12-17 15:00:00",
    "end_time": "2022-12-17 16:00:00"
  },
  {
    "id": 4,
    "event_name": "High Jump",
    "event_category": "Athletics",
    "start_time": "2022-12-17 13:00:00",
    "end_time": "2022-12-17 14:00:00"
  },
  {
    "id": 5,
    "event_name": "Triple Jump",
    "event_category": "Athletics",
    "start_time": "2022-12-17 16:00:00",
    "end_time": "2022-12-17 17:00:00"
  },
  {
    "id": 6,
    "event_name": "Long Jump",
    "event_category": "Athletics",
    "start_time": "2022-12-17 17:00:00",
    "end_time": "2022-12-17 18:00:00"
  },
  {
    "id": 7,
    "event_name": "100M Spring",
    "event_category": "Athletics",
    "start_time": "2022-12-17 17:00:00",
    "end_time": "2022-12-17 18:00:00"
  },
  {
    "id": 8,
    "event_name": "Lightweight 60kg",
    "event_category": "Boxing",
    "start_time": "2022-12-17 18:00:00",
    "end_time": "2022-12-17 19:00:00"
  },
  {
    "id": 9,
    "event_name": "Middleweight 75 kg",
    "event_category": "Boxing",
    "start_time": "2022-12-17 19:00:00",
    "end_time": "2022-12-17 20:00:00"
  },
  {
    "id": 10,
    "event_name": "Heavyweight 91kg",
    "event_category": "Boxing",
    "start_time": "2022-12-17 20:00:00",
    "end_time": "2022-12-17 22:00:00"
  }
];

function overlaps(event1, event2) {
  const ans = !((new Date(event1.end_time)).getTime() <= (new Date(event2.start_time)).getTime() || (new Date(event1.start_time)).getTime() >= (new Date(event2.end_time)).getTime());
  return ans;
}

function App() {
  const [allEvents, setAllEvents] = useState(mockApiData.map(event => ({ ...event, state: EventState.UNSELECTED })));
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [unselectedEvents, setUnselectedEvents] = useState(allEvents);

  const updateStates = (allEvents) => {
    allEvents = allEvents.map((event, idx, allEvents) => {
      if (event.state === EventState.SELECTED)
        return event;

      for (let i = 0; i < allEvents.length; ++i) {
        if (idx !== i && allEvents[i].state === EventState.SELECTED && overlaps(event, allEvents[i])) {
          return { ...event, state: EventState.UNSELECTABLE };
        }
      }

      return { ...event, state: EventState.UNSELECTED };
    });
    setAllEvents(allEvents);
    setSelectedEvents(allEvents.filter(event => event.state === EventState.SELECTED));
    setUnselectedEvents(allEvents.filter(event => event.state === EventState.UNSELECTED || event.state === EventState.UNSELECTABLE));
  }

  const handleSelect = id => {
    if (selectedEvents.length >= 3 || allEvents.filter(event => event.id === id)[0].state !== EventState.UNSELECTED) {
      return;
    }
    let updatedAllEvents = allEvents.map(event => (event.id === id ? { ...event, state: EventState.SELECTED } : event));
    updateStates(updatedAllEvents);
  };
  const handleRemove = id => {
    let updatedAllEvents = allEvents.map(event => (event.id === id ? { ...event, state: EventState.UNSELECTED } : event));
    updateStates(updatedAllEvents);
  };

  return (<div className="app-container">
    <div className="outer-container container">
      <div className="inner-container container">
        <div className="title">All Events</div>
        <hr />
        <EventsContainer eventsList={unselectedEvents} handleClick={handleSelect} />
      </div>
      <div className="inner-container container">
        <div className="title">Selected Events</div>
        <hr />
        <EventsContainer eventsList={selectedEvents} handleClick={handleRemove} />
      </div>
    </div>
  </div>);
}

export default App;
