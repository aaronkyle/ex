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

---


---



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
