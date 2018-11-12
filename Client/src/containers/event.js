import {
  osVersion,
  osName,
  browserVersion,
  browserName,
  engineName
} from 'react-device-detect';

export const sendEvent = (eventName, eventRoute, eventCreatorId) => {
    let event = {
      event_name: eventName,
      event_time: new Date().getTime(),
      event_creator_id: eventCreatorId,
      event_route: eventRoute,
      event_device: {
        browser: browserName,
        browser_version: browserVersion,
        engine: engineName,
        os: osName,
        os_version: osVersion
      }
    };

    console.log('%cEvent:', 'background: #222; color: #bada55');
    console.log('Event Details: ', event);

    fetch("/api/event", {
      method: "POST",
      body: JSON.stringify(event),
      headers: {"Content-Type": "application/json"}
    })
    .then(response => console.log('New User Added: ', response));
}
