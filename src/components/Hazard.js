import React from 'react';

const YesNo = new Map([
  [true, 'YES 😱'],
  [false, 'No 👍'],
]);

export default function Hazard({ yes }) {
  return <div class="tooltip">
    <span className="hazard">{YesNo.get(yes)}</span>
    <span class="tooltiptext">A <em>Potentially Hazardous Asteroid</em> (<em>PHA</em>) is one that has <a href="https://cneos.jpl.nasa.gov/about/neo_groups.html" target="_blank">"an <em>Earth Minimum Orbit Intersection Distance</em> (<em>MOID</em>) of 0.05 *<em>au</em> or less, and an absolute magnitude (*<em>H</em>) of 22.0 or less."</a></span>
  </div>;
}
