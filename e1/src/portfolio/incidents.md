```js
const incident_workbook = FileAttachment("/data/internal/ODP Project Incidents Tracker.xlsx").xlsx()
```

```js
const incident_data = incident_workbook.sheet("Incidents", {
    headers: true,
  })
```

## Incidents Received

```js
display(incident_data)
```

```js
view(Inputs.table(incident_data, {
//height: 400
}))
```

## Incidents by Type

```js
display(
  // incidents by Type of Incident (sorted bar)
  // total for portfolio; need to segment by year
Plot.plot({
  //title: "Incidents by Type",
  height: 440,
  width: 900,
  marginLeft: 200,                 // small room for end labels
  marginRight: 28,                 // small room for end labels
  x: {label: "Incidents"},
  y: {
    tickSize: 2,
  },
  marks: [
    Plot.ruleX([0]),
    Plot.barX(
      incident_data,
      Plot.groupY({x: "count"}, {y: "Type of Incident", inset: 2})
    ),
    // label at the bar end (dynamic, no magic numbers)
    Plot.text(
      incident_data,
      Plot.groupY(
        {x: "count", text: "count"},
        {y: "Type of Incident", dx: 8, textAnchor: "start"}
      )
    )
  ]
}))

```


## Incidents by Type


```js
const incident_type_count = (() => {
  const rows = Array.from(
    d3.group(incident_data, d => d["Type of Incident"]),
    ([project, items]) => ({
      "Type of Incident": (project == null || project === "") ? "[no incident type value]" : project,
      "Number of Incidents": items.length
    })
  ).sort((a, b) => b["Number of Incidents"] - a["Number of Incidents"]);

  const total = d3.sum(rows, d => d["Number of Incidents"]);
  rows.push({
    "project": "Total Number of Incidents",
    "Number of Incidents": total
  });

  return rows;
})();

display(Inputs.table(incident_type_count));
```


## Incidents by Country

```js
const country_incident_count = (() => {
  const rows = Array.from(
    d3.group(incident_data, d => d["Country"]),
    ([country, items]) => ({
      "Country": (country == null || country === "") ? "[no country value]" : country,
      "Number of Incidents": items.length
    })
  ).sort((a, b) => b["Number of Incidents"] - a["Number of Incidents"]);

  const total = d3.sum(rows, d => d["Number of Incidents"]);
  rows.push({
    "Country": "Total Number of Incidents",
    "Number of Incidents": total
  });

  return rows;
})();

display(Inputs.table(country_incident_count));
```


## Incidents by Sector

```js
const sector_incident_count = (() => {
  const rows = Array.from(
    d3.group(incident_data, d => d["Primary Sector"]),
    ([sector, items]) => ({
      "Primary Sector": (sector == null || sector === "") ? "[no sector value]" : sector,
      "Number of Incidents": items.length
    })
  ).sort((a, b) => b["Number of Incidents"] - a["Number of Incidents"]);

  const total = d3.sum(rows, d => d["Number of Incidents"]);
  rows.push({
    "sector": "Total Number of Incidents",
    "Number of Incidents": total
  });

  return rows;
})();

display(Inputs.table(sector_incident_count));
```


## Incidents per Project


```js
const project_incident_count = (() => {
  const rows = Array.from(
    d3.group(incident_data, d => d["Project Name"]),
    ([project, items]) => ({
      "Project": (project == null || project === "") ? "[no project value]" : project,
      "Number of Incidents": items.length
    })
  ).sort((a, b) => b["Number of Incidents"] - a["Number of Incidents"]);

  const total = d3.sum(rows, d => d["Number of Incidents"]);
  rows.push({
    "project": "Total Number of Incidents",
    "Number of Incidents": total
  });

  return rows;
})();

display(Inputs.table(project_incident_count));
```




```js
function parseDate(v){
  if (v == null || v === "") return null;
  const d = v instanceof Date ? v : new Date(v);
  return isNaN(+d) ? null : d;
}
```

```js
// helper to calculate FY quarter from a Date
function quarterFromDate(d) {
  if (!(d instanceof Date) || isNaN(d)) return null;
  const y = d.getFullYear(), m = d.getMonth(); // 0=Jan
  const fy = m >= 9 ? y + 1 : y;               // FY ticks up in Oct
  const q = Math.floor(((m - 9 + 12) % 12) / 3) + 1; // Oct=Q1, Jan=Q2, Apr=Q3, Jul=Q4
  return `FY${String(fy).slice(-2)} Q${q}`;
}
```

---

## Incidents by Quarter*

_* **Note:** DFC Fiscal Year starts in October_

```js

// Filter incidents by fiscal year & quarter (FY starts Oct 1).
// Usage: filterIncidentsByFYQ(incident_data, 2025, 1)  // FY25 Q1
//        filterIncidentsByFYQ(incident_data, "FY25 Q3") // label form
const filterIncidentsByFYQ = (rows, fyOrLabel, qArg) => {
  let fy, q;

  if (typeof fyOrLabel === "string") {
    const m = /FY(\d{2})\s*Q([1-4])/i.exec(fyOrLabel);
    if (!m) return [];
    fy = 2000 + +m[1];         // "25" -> 2025
    q  = +m[2];
  } else {
    fy = fyOrLabel >= 100 ? fyOrLabel : 2000 + fyOrLabel; // 25 -> 2025
    q  = +qArg;
  }

  // Quarter start (inclusive) and next quarter start (exclusive)
  const start = new Date(
    q === 1 ? fy - 1 : fy,              // FY Q1 begins Oct 1 of previous calendar year
    q === 1 ? 9 : q === 2 ? 0 : q === 3 ? 3 : 6, // Oct, Jan, Apr, Jul
    1
  );
  const next = new Date(
    q === 1 ? fy : fy,                  // next quarter boundary
    q === 1 ? 0 : q === 2 ? 3 : q === 3 ? 6 : 9, // Jan, Apr, Jul, Oct
    1
  );

  return rows.filter(d => {
    const inc = parseDate(d["Incident Date"]);  // your helper
    return inc && inc >= start && inc < next;
  });
};

```

```js
const fy_quarter_select = view(Inputs.select(["FY24 Q1","FY24 Q1","FY24 Q2","FY24 Q4","FY25 Q1"], {value: "FY25 Q1"}))
```

```js
const selected_fy_quarter_incidents = filterIncidentsByFYQ(incident_data, fy_quarter_select)
```


```js
display(Inputs.table(filterIncidentsByFYQ(incident_data, fy_quarter_select)))
```

**Incidents by Type for ${fy_quarter_select}**

```js
display(
  // incidents by Type of Incident (sorted bar)
  // total for portfolio; need to segment by year
Plot.plot({
  //title: "Incidents by Type",
  height: 440,
  width: 900,
  marginLeft: 200,                 // small room for end labels
  marginRight: 28,                 // small room for end labels
  x: {label: "Incidents"},
  y: {
    tickSize: 2,
  },
  marks: [
    Plot.ruleX([0]),
    Plot.barX(
      selected_fy_quarter_incidents,
      Plot.groupY({x: "count"}, {y: "Type of Incident", inset: 2})
    ),
    // label at the bar end (dynamic, no magic numbers)
    Plot.text(
      selected_fy_quarter_incidents,
      Plot.groupY(
        {x: "count", text: "count"},
        {y: "Type of Incident", dx: 8, textAnchor: "start"}
      )
    )
  ]
}))

```

---

## Project Deep-Dive


```js
const project_list = ((data) => {
  const names = data.map(item => item["Project Name"]);
  return [...new Set(names)];
})(incident_data);
```

```js
const select_project = view(Inputs.select(project_list, {value: "MHP SE"}))
```


```js
const project_focus = incident_data.filter(
  d => d["Project Name"] === select_project )
  .map(d => {
    const incident = parseDate(d["Incident Date"]);
    const received = parseDate(d["Date Received"]);
    const derivedRQ = quarterFromDate(incident) ?? quarterFromDate(received);
    const currentRQ = (d["Reporting Quarter"] ?? "").toString().trim();
    return {
      ...d,
      // overwrite the column your table/plots actually read:
      ["Reporting Quarter"]: currentRQ !== "" ? currentRQ : derivedRQ
    };
  });
  ```


```js
view(Inputs.table(project_focus, {
  columns: [
    "Project ID","Project Name","Date Received","Incident Date","Reporting Quarter",
    "Country","Type of Incident","Incident Description","Non-fatal injuries",
    "Fatalities","Total casualties","Files Link","Root Cause Analysis Received?",
    "Root Cause Due Date","Location","Cause","PS Triggered"
  ]
}))
```


```js
// Build a [{ rq, count }] array from project_focus and sort it by fiscal quarter.
const series = Array.from(
  // 1) Aggregate counts by quarter into a Map(rq -> count).
  project_focus.reduce((m, d) => {
    const rq = (d["Reporting Quarter"] ?? "").trim(); // normalize; may be ""
    if (rq) m.set(rq, (m.get(rq) || 0) + 1);          // bump count if we have an rq
    return m;                                         // keep passing the Map along
  }, new Map()),

  // 2) Array.from's *mapping* callback: convert each [rq, count] entry to an object.
  ([rq, count]) => ({ rq, count })
)
// 3) Sort the resulting objects chronologically by FY+Quarter.
.sort((a, b) => {
  // Turn "FY25 Q3" into a single sortable number:  (25 * 4) + 3 = 103
  // If the string doesn't match the pattern, fall back to a very large number (1e9),
  // which pushes malformed labels to the end.
  const index_value = sortable => {
    const m = /FY(\d{2})\s*Q([1-4])/i.exec(sortable || "");
    return m ? (+m[1]) * 4 + (+m[2]) : 1e9;
  };
  return index_value(a.rq) - index_value(b.rq); // classic comparator: negative => a before b
});
```


##  ${project_focus[0]["Project Name"]} Incidents by Quarter

```js
display(
Plot.plot({
  //title: "Incidents by Quarter",
  height: 280,
  x: {domain: series.map(d => d.rq)},
  y: {grid: true, label: "Incidents"},
  marks: [
    Plot.ruleY([0]),
    Plot.lineY(series, {x: "rq", y: "count"}),
    Plot.dotY(series, {x: "rq", y: "count"})
  ]
})

)
```

```js
const incidentCountries = Array.from(
  new Set(incident_data.map(d => (d.Country ?? "").trim()).filter(Boolean))
).sort((a, b) => a.localeCompare(b));
```


```js
//Count incidents by country (trim + drop blanks).
const incidentsByCountry = d3.rollup(
  incident_data.filter(d => (d.Country ?? "").trim() !== ""),
  v => v.length,
  d => (d.Country ?? "").trim()
);
```



```js
display(
  Plot.plot({
    projection: {
      type: projection,
      rotate,
      inset,
      domain: countries.features.find(d => d.properties.name === focus_view)
    },
    height: 400,
    marks: [
      // Base outlines for all countries
      Plot.geo(countries, {
        stroke: "white",
        strokeWidth: 0.5,
        fill: "transparent"
      }),
      // Data layer: only countries with incidents > 0
      Plot.geo(countries, {
        stroke: "white",
        strokeWidth: 0.5,
        fill: d => {
          const n = incidentsByCountry.get(d.properties.name);
          return n > 0 ? n : undefined;
        },
        fillOpacity: 0.85
      }),
      // Tooltip dots
      Plot.dot(
        countries.features,
        Plot.centroid({
          r: 2,
          fill: "black",
          fillOpacity: 0.0001,
          channels: {
            "Country: ": d => d.properties.name,
            "Incidents: ": d => incidentsByCountry.get(d.properties.name) ?? 0
          },
          tip: true
        })
      ),
      Plot.sphere({ stroke: "white", strokeOpacity: 0.5 }),
      //Plot.graticule({ stroke: "white", strokeOpacity: 0.1 })
    ],
    color: {
      scheme: "BrBG",
      type: "linear",
      legend: true,
      label: "Incidents"
    }
  })
)


```

```js
const focus_view = view(Inputs.select(["Select", ...incidentCountries], { label: "Focus Country", value: "Select" }));
```

```js
const projection = view(Inputs.select(["equal-earth",
"equirectangular",
"orthographic",
"stereographic",
"mercator",
"transverse-mercator",
"azimuthal-equal-area",
"azimuthal-equidistant",
"conic-conformal",
"conic-equal-area",
"conic-equidistant",
"gnomonic",], {value: "stereographic", label: "Change Projection"}))
```

```js
const inset = view(Inputs.range([0, -1800], {
  value: 0,
  step: 100,
  label: "Zoom"
}))
```


```js
const rotate = view(Inputs.form([
  Inputs.range([-360, 360], {value: 0, step: 1, label: "Rotate λ (yaw)"}),
  Inputs.range([-180, 180], {value: 0, step: 1, label: "Rotate φ (pitch)"}),
  Inputs.range([-360, 360], {value: 0, step: 1, label: "Rotate γ (roll)"})
]))
```

```js
const countries = topojson.feature(world, world.objects.countries)
```

```js
const world = FileAttachment("/data/external/countries-50m.json").json()
```
