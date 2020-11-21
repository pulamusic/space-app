import React from 'react';
import { useAsync } from 'react-async-hook';
import addDays from 'date-fns/addDays';
import format from 'date-fns/format';
import Orbital from './Orbital';

function getDate(d = new Date()) {
  return d.toJSON().split('T')[0];
}

// https://api.nasa.gov/neo/rest/v1/feed?start_date=2020-11-21&api_key=0nlz09JEsY6jwVvmrAoiky1CuDUEUoufDHr9C7dB

// console.log(getDate());

const apiKey = '0nlz09JEsY6jwVvmrAoiky1CuDUEUoufDHr9C7dB';

const fetchData = () =>
  fetch(
    `https://api.nasa.gov/neo/rest/v1/feed?start_date=${getDate()}&api_key=${apiKey}`
  ).then((res) => res.json());

// App function
export default function App() {
  const data = useAsync(fetchData, []);

  if (data.loading) {
    document.title = 'Counting potential earth HAZARDS…';

    return (
      <p>
        Getting data from NASA right now to check whether something from space
        is going to hit us. One moment…
      </p>
    );
  }

  const day = getDate(addDays(new Date(), 1));

  const hazards = data.result.near_earth_objects[day].reduce((acc, curr) => {
    if (curr.is_potentially_hazardous_asteroid) {
      return acc + 1;
    }
    return acc;
  }, 0);

  document.title = `${hazards} potential HAZARDS ${hazards > 0 ? '😱' : '👍'}`;

  const results = data.result.near_earth_objects[day];
  return (
    <div>
      <p>
        On <strong>{format(addDays(new Date(), 1), 'EEEE, MMM d, Y')}</strong> there will be{' '}
        <strong>{results.length}</strong> <strike>flying pigs</strike> potentially hazardous asteroids passing near the Earth.
      </p>
      <hr></hr>
      {results
        .sort((a) => (a.is_potentially_hazardous_asteroid ? -1 : 1))
        .map((data) => (
          <Orbital key={data.id} {...data} />
        ))}
    </div>
  );
} // end of App function
