import React, { useEffect, useState } from "react"
import './App.css';
import axios from "axios";
import PlacesAutocomplete, { geocodeByAddress, getLatLng, } from 'react-places-autocomplete';

const defaultValues = {
  eventName: "",
  city: "",
  longitude: "",
  latitude: ""
}

const Event = () => {
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)

  const [inputs, setInputs] = useState(defaultValues)
  const [address, setAdress] = useState('')

  const EventInput = ({ eventName,city }) =>
  (
          <div className="item">
              <p>{eventName}</p>
          </div>

  )

  const getEvents = async () => {
    const res = await axios.get("/api/events/")
    setEvents(res.data)
  }
  const handleChange = address => {
    setAdress(address)
  }
  const handleSelect = address => {
    setAdress(address)
    console.log(address);
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then((latLng) => setInputs({ ...inputs, city: address ,latitude: latLng.lng, longitude: latLng.lat }))
      .then(console.log(inputs.latitude, inputs.longitude))
      .catch(error => console.error('Error', error));
  }

  const handleDelete = async (eventId, event) => {
    const res = await axios.delete(`/api/events/${eventId}`)
    setEvents(res.data)
}

  const handleSubmit = async (event) => {
    event.stopPropagation()
    event.preventDefault()

    const res = await axios.post("/api/events/", inputs)
    setEvents(res.data)
    setInputs(defaultValues)
    setAdress('');
  }

  useEffect(() => { getEvents() }, [])

  return (
    <div>
      <img style={{width:"100%"}} src="https://i.postimg.cc/K8z4Jhnj/IMG-0737.jpg" alt="Untitled-Artwork" border="0"/>


      <div className="container">
        {events.map(p => (
          <EventInput
            key={p.eventName}
            eventName={p.eventName}
          />
        ))}
      </div>
      <div style={{ paddingLeft: "30%" }}>
        <form //login
          onSubmit={handleSubmit}
          className="w3-theme-d3 w3-container"
          style={{ width: "60%", padding: "25px", borderRadius: "25px" }}>

        <h2 style={{ textAlign: "center" }}>{selectedEvent ? "Edit Event" : "New Event"}</h2>


          <input
            type="text"
            placeholder="EventName"
            value={inputs.eventName}
            onChange={e => setInputs({ ...inputs, eventName: e.target.value })}
            className="w3-input"
            style={{ borderRadius: "25px" }}
          />

          <br />

          <PlacesAutocomplete
            value={address}
            onChange={handleChange}
            onSelect={handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input id="inputval" style={{ width: "100%", borderRadius: "25px" }}
                  {...getInputProps({
                    placeholder: 'Search Places ...',
                    className: "w3-input",
                  })}
                />
                <div className="autocomplete-dropdown-container" style={{ width: "100%" }}>
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: 'rgba(0, 0, 0, 0.5)', cursor: 'pointer' }
                      : { backgroundColor: '#008496', cursor: 'pointer' };

                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
          <br />


          <input
            type="submit"
            value="Submit"
            className="w3-theme-d1 w3-btn"
            style={{ borderRadius: "25px", width: "100%" }}
          />

        </form>
      </div>


    </div>
  )
}


export default Event;
