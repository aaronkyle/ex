# ESG Risk Ranking Model for Project Portfolio Monitoring

This document defines a model for transparently and generatively calculating project E&S risk scores and for portfolio segmentation into risk-based monitoring tiers: site visit required, enhanced desk-based monitoring, and non-priority. The model evaluates project E&S risk categories, country risk as derived from multi-dimensional ESG scores, and institutionally-defined risk parameters reflective of project-specific red flags and/or risk mitigants. 




---

```js
const local_file_insight_all_projects = view(Inputs.file({accept: ".csv"}));
```


```js
// IndexedDB Setup
const dbName_insight_all_projects  = "insight_all_projects";
const dbVersion_insight_all_projects  = 1;
const storeName_insight_all_projects  = "insight_all";
```

```js
// Function to open or create IndexedDB
async function openDB_insight_all_projects () {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName_insight_all_projects , dbVersion_insight_all_projects );
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            db.createObjectStore(storeName_insight_all_projects , { keyPath: "id" });
        };
        
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}
```

```js
// Function to get data from IndexedDB
async function getData_insight_all_projects () {
    const db = await openDB_insight_all_projects();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName_insight_all_projects , "readonly");
        const store = transaction.objectStore(storeName_insight_all_projects );
        const request = store.get("state_data_insight_all_projects");
        
        request.onsuccess = () => resolve(request.result?.data ?? template_data_insight_all_projects);
        request.onerror = () => reject(request.error);
    });
}
```

```js
// Function to save data to IndexedDB
async function saveData_insight_all_projects(data) {
    const db = await openDB_insight_all_projects();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName_insight_all_projects, "readwrite");
        const store = transaction.objectStore(storeName_insight_all_projects);
        store.put({ id: "state_data_insight_all_projects", data });
        
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
    });
}
```


```js
// needed to correctly initialize the chart
const template_data_insight_all_projects = FileAttachment("/data/internal/all_projects_template_minimal.csv").csv()
```

```js
/// Initialize state_data with IndexedDB or template data
let state_data_insight_all_projects = Mutable(await getData_insight_all_projects ());

function swap_data_insight_all_projects(data) {
  state_data_insight_all_projects.value = data;
}

(async function(d) {
    return d === null ? "pending file selection" : state_data_insight_all_projects.value = await d.json();
})(local_file_insight_all_projects);
```


```js
// removing view here temporarily
const load_template_data_insight_all_projects = Inputs.button("Reset Template", {reduce: () => swap_data_insight_all_projects(template_data_insight_all_projects)})
```


```js
 const report_insight_all_projects  = (async () => {////
  try {
    return await local_file_insight_all_projects.csv();
  } catch (error) {
    console.warn("error with file", error);
    return state_data_insight_all_projects;
  }
})();

```



```js
// Optional auto-persist
 await saveData_insight_all_projects(report_insight_all_projects);
```



```js
const local_file_insight_outcomes_survey = view(Inputs.file({accept: ".csv"}));
```


```js
// IndexedDB Setup
const dbName_insight_outcomes_survey  = "insight_outcomes_survey";
const dbVersion_insight_outcomes_survey  = 1;
const storeName_insight_outcomes_survey  = "insight_all";
```

```js
// Function to open or create IndexedDB
async function openDB_insight_outcomes_survey () {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName_insight_outcomes_survey , dbVersion_insight_outcomes_survey );
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            db.createObjectStore(storeName_insight_outcomes_survey , { keyPath: "id" });
        };
        
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}
```

```js
// Function to get data from IndexedDB
async function getData_insight_outcomes_survey () {
    const db = await openDB_insight_outcomes_survey();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName_insight_outcomes_survey , "readonly");
        const store = transaction.objectStore(storeName_insight_outcomes_survey );
        const request = store.get("state_data_insight_outcomes_survey");
        
        request.onsuccess = () => resolve(request.result?.data ?? template_data_insight_outcomes_survey);
        request.onerror = () => reject(request.error);
    });
}
```

```js
// Function to save data to IndexedDB
async function saveData_insight_outcomes_survey(data) {
    const db = await openDB_insight_outcomes_survey();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName_insight_outcomes_survey, "readwrite");
        const store = transaction.objectStore(storeName_insight_outcomes_survey);
        store.put({ id: "state_data_insight_outcomes_survey", data });
        
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
    });
}
```


```js
// needed to correctly initialize the chart
const template_data_insight_outcomes_survey = FileAttachment("/data/internal/outcomes_survey_template_minimal.csv").csv()
```

```js
/// Initialize state_data with IndexedDB or template data
let state_data_insight_outcomes_survey = Mutable(await getData_insight_outcomes_survey ());

function swap_data_insight_outcomes_survey(data) {
  state_data_insight_outcomes_survey.value = data;
}

(async function(d) {
    return d === null ? "pending file selection" : state_data_insight_outcomes_survey.value = await d.json();
})(local_file_insight_outcomes_survey);
```


```js
// removing view here temporarily
const load_template_data_insight_outcomes_survey = Inputs.button("Reset Template", {reduce: () => swap_data_insight_outcomes_survey(template_data_insight_outcomes_survey)})
```


```js
 const report_insight_outcomes_survey  = (async () => {////
  try {
    return await local_file_insight_outcomes_survey.csv();
  } catch (error) {
    console.warn("error with file", error);
    return state_data_insight_outcomes_survey;
  }
})();

```



```js
// Optional auto-persist
 await saveData_insight_outcomes_survey(report_insight_outcomes_survey);
```


```js
const local_file_insight_trips_w_visits = view(Inputs.file({accept: ".csv"}));
```


```js
// IndexedDB Setup
const dbName_insight_trips_w_visits  = "insight_trips_w_visits";
const dbVersion_insight_trips_w_visits  = 1;
const storeName_insight_trips_w_visits  = "insight_all";
```

```js
// Function to open or create IndexedDB
async function openDB_insight_trips_w_visits () {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName_insight_trips_w_visits , dbVersion_insight_trips_w_visits );
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            db.createObjectStore(storeName_insight_trips_w_visits , { keyPath: "id" });
        };
        
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}
```

```js
// Function to get data from IndexedDB
async function getData_insight_trips_w_visits () {
    const db = await openDB_insight_trips_w_visits();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName_insight_trips_w_visits , "readonly");
        const store = transaction.objectStore(storeName_insight_trips_w_visits );
        const request = store.get("state_data_insight_trips_w_visits");
        
        request.onsuccess = () => resolve(request.result?.data ?? template_data_insight_trips_w_visits);
        request.onerror = () => reject(request.error);
    });
}
```

```js
// Function to save data to IndexedDB
async function saveData_insight_trips_w_visits(data) {
    const db = await openDB_insight_trips_w_visits();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName_insight_trips_w_visits, "readwrite");
        const store = transaction.objectStore(storeName_insight_trips_w_visits);
        store.put({ id: "state_data_insight_trips_w_visits", data });
        
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
    });
}
```


```js
// needed to correctly initialize the chart
const template_data_insight_trips_w_visits = FileAttachment("/data/internal/trips_w_visits_template_minimal.csv").csv()
```

```js
/// Initialize state_data with IndexedDB or template data
let state_data_insight_trips_w_visits = Mutable(await getData_insight_trips_w_visits ());

function swap_data_insight_trips_w_visits(data) {
  state_data_insight_trips_w_visits.value = data;
}

(async function(d) {
    return d === null ? "pending file selection" : state_data_insight_trips_w_visits.value = await d.json();
})(local_file_insight_trips_w_visits);
```


```js
// removing view here temporarily
const load_template_data_insight_trips_w_visits = Inputs.button("Reset Template", {reduce: () => swap_data_insight_trips_w_visits(template_data_insight_trips_w_visits)})
```


```js
 const report_insight_trips_w_visits  = (async () => {////
  try {
    return await local_file_insight_trips_w_visits.csv();
  } catch (error) {
    console.warn("error with file", error);
    return state_data_insight_trips_w_visits;
  }
})();

```



```js
// Optional auto-persist
 await saveData_insight_trips_w_visits(report_insight_trips_w_visits);
```






```js
const active_projects = report_insight_all_projects;
display(active_projects )
```

```js
const outcomes_survey = report_insight_outcomes_survey
```

```js
const 
trips_with_visits = report_insight_trips_w_visits
```

---

## E&S Risk Score Calculation Methodology

<br/>
Calculating project E&S Risk Scores is accomplished in five steps:

1. Apply environmental category weighting.
2. Generate composite E, S, and G scores
3. Calculate country-adjusted ESG score.
4. Factor context data on qualitative risk and mitigants (sum of positive and negative points).
5. Calculate final risk value [(E&S catgeorization * country-adjusted ESG score ) + net <mark>context</mark> adjustment].

<br/>

---

## Data Inputs & Outputs

### Inputs

The model operates on the following inputs (project attributes and context data):

* **Project Name and Number**: Identifiers.
* **Environmental Risk Category**: Assigned weighted values according to project complexity and DFC's risk assessment.
* **Country Risk Indices**: Used to calculate contextual environmental, social, and governance (ESG) risks
* **Contextual Modifiers**: Analyst-supplied information for adjusting calculated values.

### Outputs 

Based on the supplied project attributes and contextual data, the model generates:

1. Composite country ESG scores.
2. Weighted project E&S risk scores.
3. Monitoring tier assignments.

---

## Variables

* ${tex`P`} : Set of projects, indexed by ${tex`i`}
* ${tex`{EnvCat}_i \in \{A, B, C\}`} : Environmental risk category of project ${tex`i`}
* ${tex`ESG_{\text{composite}(i)} \in [0, 100]`}
  - ${tex`E_{country(i)}`} : Country environmental risk score per project
  - ${tex`S_{country(i)}`} : Country social risk score per project
  - ${tex`G_{country(i)}`} : Country governance risk score  per project
* ${tex`n_E`} = Number of environmental (E) reference indices
* ${tex`n_S`} = Number of social (S) reference indices
* ${tex`n_G`} = Number of governance (G) reference indices
* ${tex`n_P`} = Number of pillars with reference indices
* ${tex`\omega \in [0, 1] `}: Weighting factor for combining environmental and country risk
* ${tex`C \in [0, 100]: Country Risk Index`}
* ${tex`O_{context(i)}`} = Supplemental context values
  - ${tex`\text{redFlag}`} = adverse E&S events as noted in the 008
  - ${tex`\text{exception}`} = exceptional events as noted in the 008
  - ${tex`\text{monitoredLast2Y}`} = identifies where projects have been recently monitored and continued scrutiny is not required.
  - ${tex`\text{multipleLenders}`} = identifies situations where multiple lenders are contributing
  - ${tex`\text{iescAudit}`}
  - ${tex`\text{unsatifiedObligation}`} = signals unsatisfied institutional obligations
  - ${tex`\text{analystTag}`}
* ${tex`\lambda \in [0, 1] `}:
* ${tex`F`} : Final Factored Environmental Score



---

## Step 1. Environmental and Social Risk Score (ESRS)

Project environmental and social risk categorizations are assigned fixed weighting values, defined as follows:

```tex
w_{\text{EnvCat}} =
\begin{cases}

85 &
\text{if }
\text{EnvCat} = A \\

50 &
\text{if }
\text{EnvCat} = B \\

30 &
\text{if }
\text{EnvCat} = C \\

\end{cases}
```


```js
// Environmental category weights
const envCategoryWeight = ({ 
  A: 85,
  B: 50,
  C: 30
  })
```

<br/>

**Step 1 Output: Portfolio data including numerical attributes for project E&S risk category.** 

Applying this to portfolio `P` :


```js
/// For each project, look up the env_category value and
/// create new attribute recording envCategoryWeight.

function numericEnvCat(projects) {
    return projects.map(project => {
        const weight = envCategoryWeight[project["Env Category"]] ??
        0;
        return {
        ...project,
        "E&S Category Numeric": weight
        };
    });
    }
```


```js
const active_projects_ES_risk_numeric = numericEnvCat(active_projects)
display(active_projects_ES_risk_numeric)
```


```js
display((data => {
  const blob = new Blob([d3.csvFormat(data)], { type: "text/csv" });
  return download(blob, 'active_projects_ES_risk_numeric.csv', 'Download E&S Risk Numeric)');
})(active_projects_ES_risk_numeric));
```


<br/>

---

## Step 2. Country Risk Index (CRI)

<br/>

The Country Risk Index (CRI) is derived from [external global ESG risk indices](/indices/contextual-risk-indices) and combined into a single, composite ESG score.

Reference available in the model are:

**Environmental**
  - [WorldRiskIndex](https://weltrisikobericht.de/worldriskreport/)
  - [Environmental Performance Index (EPI)](https://epi.yale.edu/)
  - [ND-GAIN Index](https://gain.nd.edu/our-work/country-index/)

**Social**
  - DOL Worker & Human Rights Country List
  - [Global Rights Index](https://www.ituc-csi.org/global-rights-index)
  - [Freedom in the World Index](https://freedomhouse.org/report/freedom-world)
  - [Freedom Index by Country](https://worldpopulationreview.com/country-rankings/freedom-index-by-country)
  - [Georgetown Women, Peace and Security Index (GIWPS)](https://giwps.georgetown.edu/the-index/)
  - [Equilo GBV Risk Score](https://www.criterioninstitute.org/resources/gender-based-violence-risk-score)
  - [Global Slavery Index](https://www.globalslaveryindex.org/)
  - [Gender Inequality Index (GII)](https://hdr.undp.org/data-center/thematic-composite-indices/gender-inequality-index)
  
**Governance**
  - [Worldwide Governance Indicators (WGI)](https://info.worldbank.org/governance/wgi/)
  - [Rule of Law Index](https://worldjusticeproject.org/rule-of-law-index/)
  - [Corruption Perceptions Index](https://www.transparency.org/en/cpi)
  - [Bertelsmann Transformation Index (BTI)](https://bti-project.org/en/home)
  - [Fragile States Index (FSI)](https://fragilestatesindex.org/)


<br/>

```js
function normalize(inputMap, options = {}) {
  const normalizedMap = new Map();

  // Detect whether the values are mostly numeric (FIW-style)
  const entries = Array.from(inputMap.entries());
  const numericValues = entries
    .map(([_, v]) => (typeof v === "number" && !isNaN(v)) ? v : undefined)
    .filter(v => v !== undefined);

  const numericRatio = numericValues.length / entries.length;

  // Heuristic: if majority of values are numeric, treat as FIW-style
  const isNumeric = numericRatio >= 0.6;

  if (isNumeric) {
    const min = Math.min(...numericValues);
    const max = Math.max(...numericValues);

    for (const [country, value] of inputMap.entries()) {
      let norm;
      if (typeof value !== "number" || isNaN(value)) {
        norm = 0;
      } else {
        norm = ((value - min) / (max - min)) * 100;
      }
      normalizedMap.set(country, norm);
    }
  } else {
    // Assume GRI-style (categorical ratings, often strings)
    const {
      min: xMin = 1,
      max: xMax = 6,
      scaleMin: yMin = 10,
      scaleMax: yMax = 100
    } = options;

    for (const [country, rawRating] of inputMap.entries()) {
      let x;

      if (rawRating === "5+") {
        x = 6;
      } else if (!rawRating || isNaN(parseInt(rawRating))) {
        x = undefined;
      } else {
        x = parseInt(rawRating, 10);
      }

      let y;
      if (x === undefined) {
        y = 0;
      } else {
        y = ((x - xMin) / (xMax - xMin)) * (yMax - yMin) + yMin;
      }

      normalizedMap.set(country, y);
    }
  }

  return normalizedMap;
}

```


```js
function invert(inputMap) {
  return new Map(
    Array.from(inputMap.entries()).map(
      ([key, value]) => [key, typeof value === 'number' && !isNaN(value) ? 100 - value : null]
    )
  );
}
```



---

#### Environmental Indices

<br/>

**`worldriskindex 24 =`**

```js
const worldriskindex24_workbook = await FileAttachment("/data/external/worldriskindex-2024.xlsx").xlsx();

const worldriskindex24 = worldriskindex24_workbook.sheet("Results 2024", {headers: true});
display(worldriskindex24)
```

```js
const facets =   [
    {label: "Total Risk (W)", value: "W"},
    {label: "Exposure (E)", value: "E"},
    {label: "Vulnerability (V)", value: "V"},
    {label: "Susceptibility (S)", value: "S"},
    {label: "Lack of Coping Capacities (C)", value: "C"},
    {label: "Lack of Adaptive Capacities (A)", value: "A"}
  ]
```

```js
const selected_component = view(Inputs.select(
  facets,
  {
    label: "Select Risk Component",
    format: facets => facets.label,
    value: facets.find(t => t.value === "W")
  }
))
```

```js
const worldriskindex24_risk_map = new Map(worldriskindex24.map(d => [d["WRI.Country"].trim(), +d[selected_component.value]]));
display(worldriskindex24_risk_map)
```


<br/>

**`epi2024 =`**

```js
const epi2024 = await FileAttachment("/data/external/epi2024results.csv").csv()
display(epi2024)
```

```js
const epiMap_risk_map = new Map(epi2024.map(d => [d.country, +d["EPI.new"]]));
display(epiMap_risk_map)
```


<br/>

**`ND-GAIN =`**

```js
const nd_gain2025_workbook = await FileAttachment("/data/external/nd_gain_countryindex_2025.zip").zip()

const nd_gain2025 = await nd_gain2025_workbook.file("resources/gain/gain.csv").csv()
display(nd_gain2025)
```


```js
const nd_gain2025_selected_years = view(Inputs.select(
  nd_gain2025_years,
  {
    label: "Select Year",
    format: nd_gain2025_years => nd_gain2025_years.label,
    value: nd_gain2025_years.find(t => t.value === "2023")
  }
)
)
```


```js
const nd_gain2025_risk_map = new Map(
  nd_gain2025.map(d => {
    const value = d[nd_gain2025_selected_years.value];
    return [d.Name.trim(), value !== "" ? +value : null];
  })
);
display(nd_gain2025_risk_map)
```



```js
const nd_gain2025_years = Object.keys(nd_gain2025[0]).filter(key => /^\d{4}$/.test(key)).map(y => ({ label: y, value: y }));
```

```js
const epiMap_risk_map_inverted = invert(epiMap_risk_map)
```



</br>
</br>

#### Social Indices


<br/>

**`DOL Worker & Human Rights Country List =`**


```js
const DOL_workers_rights_workbook = await FileAttachment("/data/sensitive/Worker & Human Rights Country List_2.4.2025_master_list_2024.xlsx").xlsx()
```

```js
//display(DOL_workers_rights_workbook)
```

```js
const DOL_workers_rights_data = DOL_workers_rights_workbook.sheet("MASTER LIST", {headers: true});
display(DOL_workers_rights_data)
```


```js
const DOL_workers_rights_map = new Map(DOL_workers_rights_data.map(d => [d.Name, d["https://dfcgov.sharepoint.com/sites/ODPAll/Shared%20Documents/Forms/AllItems.aspx?csf=1&web=1&e=fJ1FWZ&siteid=%7B84DD6FA1%2DA25D%2D45D5%2DA654%2D21BC1F0BDF75%7D&webid=%7B00E7D5CD%2DF6CA%2D4CD6%2DBABE%2DC23163ADB01E%7D&uniqueid=%7BDDED5E93%2D6D35%2D5A3E%2D DRL (7/24)"]]));
display(DOL_workers_rights_map);
```

```js
function normalize_DOL(map) {
  const mapping = {
    "Less Sensitive": 33.333,
    "Sensitive": 66.666,
    "More Sensitive": 99.999,
    "No Rating - Suspended": "",
    "No Rating - Closed": ""
  };
  return new Map(
    [...map].map(([k, v]) => [k, mapping[v] ?? ""])
  );
}
```

```js
display(normalize_DOL(DOL_workers_rights_map))
```

<br/>

**`Global Rights Index =`**

```js
display(globalRightsIndex2025)
```

```js
const globalRightsIndex2025 = ([
  { country: "Afghanistan", rating: "5+", description: "No guarantee of rights due to the breakdown of the law" },
  { country: "Burundi", rating: "5+", description: "No guarantee of rights due to the breakdown of the law" },
  { country: "Central African Republic", rating: "5+", description: "No guarantee of rights due to the breakdown of the law" },
  { country: "Haiti", rating: "5+", description: "No guarantee of rights due to the breakdown of the law" },
  { country: "Libya", rating: "5+", description: "No guarantee of rights due to the breakdown of the law" },
  { country: "Myanmar", rating: "5+", description: "No guarantee of rights due to the breakdown of the law" },
  { country: "Palestine", rating: "5+", description: "No guarantee of rights due to the breakdown of the law" },
  { country: "Somalia", rating: "5+", description: "No guarantee of rights due to the breakdown of the law" },
  { country: "South Sudan", rating: "5+", description: "No guarantee of rights due to the breakdown of the law" },
  { country: "Sudan", rating: "5+", description: "No guarantee of rights due to the breakdown of the law" },
  { country: "Syria", rating: "5+", description: "No guarantee of rights due to the breakdown of the law" },
  { country: "Yemen", rating: "5+", description: "No guarantee of rights due to the breakdown of the law" },

  { country: "Algeria", rating: "5", description: "No guarantee of rights" },
  { country: "Bahrain", rating: "5", description: "No guarantee of rights" },
  { country: "Bangladesh", rating: "5", description: "No guarantee of rights" },
  { country: "Belarus", rating: "5", description: "No guarantee of rights" },
  { country: "Cambodia", rating: "5", description: "No guarantee of rights" },
  { country: "China", rating: "5", description: "No guarantee of rights" },
  { country: "Colombia", rating: "5", description: "No guarantee of rights" },
  { country: "Ecuador", rating: "5", description: "No guarantee of rights" },
  { country: "Egypt", rating: "5", description: "No guarantee of rights" },
  { country: "Eritrea", rating: "5", description: "No guarantee of rights" },
  { country: "Eswatini", rating: "5", description: "No guarantee of rights" },
  { country: "Guatemala", rating: "5", description: "No guarantee of rights" },
  { country: "Honduras", rating: "5", description: "No guarantee of rights" },
  { country: "Hong Kong", rating: "5", description: "No guarantee of rights" },
  { country: "India", rating: "5", description: "No guarantee of rights" },
  { country: "Indonesia", rating: "5", description: "No guarantee of rights" },
  { country: "Iran", rating: "5", description: "No guarantee of rights" },
  { country: "Iraq", rating: "5", description: "No guarantee of rights" },
  { country: "Jordan", rating: "5", description: "No guarantee of rights" },
  { country: "Kazakhstan", rating: "5", description: "No guarantee of rights" },
  { country: "Korea (Republic of)", rating: "5", description: "No guarantee of rights" },
  { country: "Kuwait", rating: "5", description: "No guarantee of rights" },
  { country: "Kyrgyzstan", rating: "5", description: "No guarantee of rights" },
  { country: "Laos", rating: "5", description: "No guarantee of rights" },
  { country: "Malaysia", rating: "5", description: "No guarantee of rights" },
  { country: "Mauritania", rating: "5", description: "No guarantee of rights" },
  { country: "Nigeria", rating: "5", description: "No guarantee of rights" },
  { country: "Pakistan", rating: "5", description: "No guarantee of rights" },
  { country: "Philippines", rating: "5", description: "No guarantee of rights" },
  { country: "Qatar", rating: "5", description: "No guarantee of rights" },
  { country: "Russian Federation", rating: "5", description: "No guarantee of rights" },
  { country: "Saudi Arabia", rating: "5", description: "No guarantee of rights" },
  { country: "Thailand", rating: "5", description: "No guarantee of rights" },
  { country: "Tunisia", rating: "5", description: "No guarantee of rights" },
  { country: "Türkiye", rating: "5", description: "No guarantee of rights" },
  { country: "Ukraine", rating: "5", description: "No guarantee of rights" },
  { country: "United Arab Emirates", rating: "5", description: "No guarantee of rights" },
  { country: "Venezuela", rating: "5", description: "No guarantee of rights" },
  { country: "Zimbabwe", rating: "5", description: "No guarantee of rights" },

  // Rating 4: Systematic violations of rights
  { country: "Angola", rating: "4", description: "Systematic violations of rights" },
  { country: "Argentina", rating: "4", description: "Systematic violations of rights" },
  { country: "Benin", rating: "4", description: "Systematic violations of rights" },
  { country: "Botswana", rating: "4", description: "Systematic violations of rights" },
  { country: "Brazil", rating: "4", description: "Systematic violations of rights" },
  { country: "Burkina Faso", rating: "4", description: "Systematic violations of rights" },
  { country: "Cameroon", rating: "4", description: "Systematic violations of rights" },
  { country: "Chad", rating: "4", description: "Systematic violations of rights" },
  { country: "Congo (Democratic Republic of)", rating: "4", description: "Systematic violations of rights" },
  { country: "Costa Rica", rating: "4", description: "Systematic violations of rights" },
  { country: "Djibouti", rating: "4", description: "Systematic violations of rights" },
  { country: "El Salvador", rating: "4", description: "Systematic violations of rights" },
  { country: "Ethiopia", rating: "4", description: "Systematic violations of rights" },
  { country: "Fiji", rating: "4", description: "Systematic violations of rights" },
  { country: "Georgia", rating: "4", description: "Systematic violations of rights" },
  { country: "Greece", rating: "4", description: "Systematic violations of rights" },
  { country: "Guinea", rating: "4", description: "Systematic violations of rights" },
  { country: "Guinea-Bissau", rating: "4", description: "Systematic violations of rights" },
  { country: "Hungary", rating: "4", description: "Systematic violations of rights" },
  { country: "Israel", rating: "4", description: "Systematic violations of rights" },
  { country: "Kenya", rating: "4", description: "Systematic violations of rights" },
  { country: "Lebanon", rating: "4", description: "Systematic violations of rights" },
  { country: "Lesotho", rating: "4", description: "Systematic violations of rights" },
  { country: "Liberia", rating: "4", description: "Systematic violations of rights" },
  { country: "Madagascar", rating: "4", description: "Systematic violations of rights" },
  { country: "Mali", rating: "4", description: "Systematic violations of rights" },
  { country: "Niger", rating: "4", description: "Systematic violations of rights" },
  { country: "North Macedonia", rating: "4", description: "Systematic violations of rights" },
  { country: "Panama", rating: "4", description: "Systematic violations of rights" },
  { country: "Peru", rating: "4", description: "Systematic violations of rights" },
  { country: "Senegal", rating: "4", description: "Systematic violations of rights" },
  { country: "Serbia", rating: "4", description: "Systematic violations of rights" },
  { country: "Sierra Leone", rating: "4", description: "Systematic violations of rights" },
  { country: "Sri Lanka", rating: "4", description: "Systematic violations of rights" },
  { country: "Tanzania", rating: "4", description: "Systematic violations of rights" },
  { country: "Trinidad and Tobago", rating: "4", description: "Systematic violations of rights" },
  { country: "Uganda", rating: "4", description: "Systematic violations of rights" },
  { country: "United Kingdom", rating: "4", description: "Systematic violations of rights" },
  { country: "United States of America", rating: "4", description: "Systematic violations of rights" },
  { country: "Vietnam", rating: "4", description: "Systematic violations of rights" },
  { country: "Zambia", rating: "4", description: "Systematic violations of rights" },

// Rating 3: Regular violations of rights
  { country: "Albania", rating: "3", description: "Regular violations of rights" },
  { country: "Armenia", rating: "3", description: "Regular violations of rights" },
  { country: "Bahamas", rating: "3", description: "Regular violations of rights" },
  { country: "Belgium", rating: "3", description: "Regular violations of rights" },
  { country: "Belize", rating: "3", description: "Regular violations of rights" },
  { country: "Bolivia", rating: "3", description: "Regular violations of rights" },
  { country: "Bosnia and Herzegovina", rating: "3", description: "Regular violations of rights" },
  { country: "Bulgaria", rating: "3", description: "Regular violations of rights" },
  { country: "Canada", rating: "3", description: "Regular violations of rights" },
  { country: "Chile", rating: "3", description: "Regular violations of rights" },
  { country: "Congo (Republic of)", rating: "3", description: "Regular violations of rights" },
  { country: "Côte d’Ivoire", rating: "3", description: "Regular violations of rights" },
  { country: "Gabon", rating: "3", description: "Regular violations of rights" },
  { country: "Jamaica", rating: "3", description: "Regular violations of rights" },
  { country: "Mauritius", rating: "3", description: "Regular violations of rights" },
  { country: "Mexico", rating: "3", description: "Regular violations of rights" },
  { country: "Montenegro", rating: "3", description: "Regular violations of rights" },
  { country: "Morocco", rating: "3", description: "Regular violations of rights" },
  { country: "Mozambique", rating: "3", description: "Regular violations of rights" },
  { country: "Namibia", rating: "3", description: "Regular violations of rights" },
  { country: "Nepal", rating: "3", description: "Regular violations of rights" },
  { country: "Oman", rating: "3", description: "Regular violations of rights" },
  { country: "Paraguay", rating: "3", description: "Regular violations of rights" },
  { country: "Poland", rating: "3", description: "Regular violations of rights" },
  { country: "Romania", rating: "3", description: "Regular violations of rights" },
  { country: "Rwanda", rating: "3", description: "Regular violations of rights" },
  { country: "South Africa", rating: "3", description: "Regular violations of rights" },
  { country: "Switzerland", rating: "3", description: "Regular violations of rights" },
  { country: "Togo", rating: "3", description: "Regular violations of rights" },

// Rating 2: Repeated violations of rights
  { country: "Australia", rating: "2", description: "Repeated violations of rights" },
  { country: "Barbados", rating: "2", description: "Repeated violations of rights" },
  { country: "Croatia", rating: "2", description: "Repeated violations of rights" },
  { country: "Czechia", rating: "2", description: "Repeated violations of rights" },
  { country: "Dominican Republic", rating: "2", description: "Repeated violations of rights" },
  { country: "Estonia", rating: "2", description: "Repeated violations of rights" },
  { country: "Finland", rating: "2", description: "Repeated violations of rights" },
  { country: "France", rating: "2", description: "Repeated violations of rights" },
  { country: "Ghana", rating: "2", description: "Repeated violations of rights" },
  { country: "Italy", rating: "2", description: "Repeated violations of rights" },
  { country: "Japan", rating: "2", description: "Repeated violations of rights" },
  { country: "Latvia", rating: "2", description: "Repeated violations of rights" },
  { country: "Lithuania", rating: "2", description: "Repeated violations of rights" },
  { country: "Malawi", rating: "2", description: "Repeated violations of rights" },
  { country: "Moldova", rating: "2", description: "Repeated violations of rights" },
  { country: "Netherlands", rating: "2", description: "Repeated violations of rights" },
  { country: "New Zealand", rating: "2", description: "Repeated violations of rights" },
  { country: "Portugal", rating: "2", description: "Repeated violations of rights" },
  { country: "Singapore", rating: "2", description: "Repeated violations of rights" },
  { country: "Slovakia", rating: "2", description: "Repeated violations of rights" },
  { country: "Spain", rating: "2", description: "Repeated violations of rights" },
  { country: "Taiwan", rating: "2", description: "Repeated violations of rights" },
  { country: "Uruguay", rating: "2", description: "Repeated violations of rights" },

// Rating 1: Sporadic violations of rights
  { country: "Austria", rating: "1", description: "Sporadic violations of rights" },
  { country: "Denmark", rating: "1", description: "Sporadic violations of rights" },
  { country: "Germany", rating: "1", description: "Sporadic violations of rights" },
  { country: "Iceland", rating: "1", description: "Sporadic violations of rights" },
  { country: "Ireland", rating: "1", description: "Sporadic violations of rights" },
  { country: "Norway", rating: "1", description: "Sporadic violations of rights" },
  { country: "Sweden", rating: "1", description: "Sporadic violations of rights" }
])
```


```js
const globalRightsIndex2025_map = new Map(globalRightsIndex2025.map(d => [d.country, d.rating]));
display(globalRightsIndex2025_map);
```



```js
const globalRightsIndex2025_map_normalized = normalize(globalRightsIndex2025_map);
display(globalRightsIndex2025_map_normalized);
```



<br/>

**`Freedom in the World Index =`**

```js
const FIW_workbook = await FileAttachment("/data/external/Country_and_Territory_Ratings_and_Statuses_FIW_1973-2024.xlsx").xlsx()
```

```js
const FIW_data = FIW_workbook.sheet("Country Ratings, Statuses ", {range: "A2:", headers: false})
```

```js
const FIW_data_structured = (() => {
  const yearsRow = FIW_data[0];     // Excel row 1 (with keys A, B, C, ...)
  const fieldsRow = FIW_data[1];    // Excel row 2
  const dataRows = FIW_data.slice(2); // Rows 3+

  const result = [];

  for (const row of dataRows) {
    const country = row["A"];
    if (!country || typeof country !== "string") continue;

    // Loop through columns B, C, D, E, ..., dynamically
    const colLetters = Object.keys(row).filter(k => k !== "A");

    for (let i = 0; i < colLetters.length; i += 3) {
      const col1 = colLetters[i];
      const col2 = colLetters[i + 1];
      const col3 = colLetters[i + 2];

      const year = yearsRow[col1] || yearsRow[col2] || yearsRow[col3];
      const PR = row[col1];
      const CL = row[col2];
      const Status = row[col3];

      if (year && (PR !== undefined || CL !== undefined || Status !== undefined)) {
        result.push({
          country: country.trim(),
          year: String(year).trim(),
          PR,
          CL,
          Status
        });
      }
    }
  }

  return result;
})()
```


```js
//display(FIW_data_structured)
```

```js
const FIW_data2024 = FIW_data_by_year.get("2024") || [];
```


```js
const FIW_data_by_year = d3.group(FIW_data_structured, d => d.year)
```


```js
const FIW_prMap = new Map(FIW_data2024.map(d => [d.country, d.PR]));
```

```js
const FIW_clMap = new Map(FIW_data2024.map(d => [d.country, d.CL]));
```



```js
display(FIW_data2024)
```


**`FIW_pr`**
```js
display(FIW_prMap);
```
```js
const FIW_prMap_normalized = normalize(FIW_prMap);
display(FIW_prMap_normalized)
```


**`FIW_cl`**
```js
display(FIW_clMap);
```
```js
const FIW_clMap_normalized = normalize(FIW_clMap);
display(FIW_clMap_normalized)
```


<br/>

**`Freedom Index by Country =`**


```js
const freedom_index_data = await FileAttachment("/data/external/2023-Human-Freedom-Index-Data.csv").csv();
display(freedom_index_data)
```


```js 
const freedom_index_facets =   [
    {label: "Personal Freedom", value: "pf_score"},
    {label: "Economic Freedom", value: "ef_score"},
  ]
```

```js
const freedom_index_selected_component = view(Inputs.select(
  freedom_index_facets,
  {
    label: "Select Risk Component",
    format: freedom_index_facets => freedom_index_facets.label,
    value: "ef_score"
  }
))
```

```js
const freedom_index_risk_map = new Map(freedom_index_data.map(d => [d["countries"].trim(), +d[freedom_index_selected_component.value]]));
display(invert(freedom_index_risk_map));
```


```js
const freedom_index_risk_map_normalized = normalize(freedom_index_risk_map);
display(freedom_index_risk_map_normalized)
```

```js
const freedom_index_risk_map_normalized_inverted = invert(freedom_index_risk_map_normalized)
display(freedom_index_risk_map_normalized_inverted)
```




<br/>

**`Global Slavery Index =`**



```js
const globalSlaveryIndex_zip = FileAttachment("/data/external/2023-Global-Slavery-Index-Data-dd6d042a-e404-405a-8956-de68d59a11aa.zip").zip()
```

```js
const globalSlaveryIndex_workbook = globalSlaveryIndex_zip.file("2023-Global-Slavery-Index-Data.xlsx").xlsx()
```

```js
const globalSlaveryIndex_data = globalSlaveryIndex_workbook.sheet("GSI 2023 summary data", {range: "A3:", headers: true});
display(globalSlaveryIndex_data)
```

```js
const globalSlavery_dataMap = new Map(globalSlaveryIndex_data.map(d => [d.Country, d["Total Vulnerability score (%)"]]));
display(globalSlavery_dataMap)
```


<br/>

**`GBVH Risk Screening - Country Context = `**


```js
const gbvh_screening_workbook = await FileAttachment("/data/sensitive/GBVH Risk Screening Tool v.3.xlsx").xlsx()
```

```js
const gbvh_screening_data = gbvh_screening_workbook.sheet("Country Context - All Projects", {
    headers: true,
    range: "A4:"
  });
display(gbvh_screening_data)
```

**`Georgetown Women, Peace and Security Index (GIWPS)`**

```js
const giwps_map = new Map(gbvh_screening_data.map(d => [d["Country Name"], d["WPS Index "]]));
display(giwps_map);
display(invert(normalize(giwps_map)))
```



**`Equilo GBV Risk Score`**

```js
const equilo_map = new Map(gbvh_screening_data.map(d => [d["Country Name"], d["Equilo Index "]]));
display(equilo_map)
```



<br/>

**`Gender Inequality Index (GII) =`**

```js
const gii_workbook = await FileAttachment("/data/external/HDR25_Statistical_Annex_GII_Table.xlsx").xlsx()
```

```js

const gii_data = gii_workbook.sheet("Table 5. GII", {
    headers: false,
    range: "A1:"
  })

```

```js
const consolidatedHeaders = (() => {
  const headerRows = gii_data.slice(2, 7); // Excel rows 3–7

  // Get all column letters across the 5 header rows (e.g., A, B, C, ..., T)
  const allColumns = Array.from(
    new Set(headerRows.flatMap(row => Object.keys(row)))
  ).sort(); // Excel-like order

  // Build a matrix: each row is a full map of col → label, with forward-filling
  // Fill forward: for each row, carry down previous values where empty
  const filled = [];

  for (let i = 0; i < headerRows.length; i++) {
    const currentRow = {};
    for (let col of allColumns) {
      const val = headerRows[i][col];
      if (val != null && val !== "") {
        currentRow[col] = val.toString().trim();
      } else if (i > 0) {
        currentRow[col] = filled[i - 1][col] ?? "";
      } else {
        currentRow[col] = "";
      }
    }
    filled.push(currentRow);
  }

  // Combine column labels from top to bottom
   // Collapse labels from top to bottom for each column
  const headers = allColumns.map(col => {
    const parts = filled.map(row => row[col]).filter(Boolean);
    const uniqueParts = [...new Set(parts)];
    return uniqueParts.join(" | ");
  });

  // Keep track of column letters so we can map observations later
  // Retain mapping to column letters for later use
  headers.columns = allColumns;

  return headers;
})()
```

```js
const observations = gii_data.slice(8, 207).map(row => {
  const record = {};
  consolidatedHeaders.forEach((label, i) => {
    const col = consolidatedHeaders.columns[i];
    record[label] = row[col];
  });
  return record;
});
```

```js
const gii2023_data = observations.filter(obs => {
  const value = obs["Gender Inequality Index | Value | 2023"];
  return value != null && value !== "" && value !== "..";
});
display(gii2023_data)
```

```js
const gii2023_dataMap = new Map(gii2023_data.map(d => [d.Country, d["Gender Inequality Index | Value | 2023"]]));
display(gii2023_dataMap)
```


```js
const gii2023_dataMap_normalized = normalize(gii2023_dataMap);
display(gii2023_dataMap_normalized)
```



</br>
<br/>

#### Governance Indices

<br/>

**`Worldwide Governance Indicators (WGI) =`**
<mark>!!!!!!!!!!!!!!!!!!!!!!!!</mark>

```js
const wgidataset_excel = FileAttachment("/data/external/wgidataset_with_sourcedata_excel.zip").zip()
```

```js
const wgidataset_workbook = wgidataset_excel.file("wgidataset_with_sourcedata.xlsx").xlsx()
```

```js
const wgidata = wgidataset_workbook.sheet(0, {headers: true});
display(wgidata)
```

```js
const wgidataset_year_indicator_grouped = d3.group(wgidata, d => d.year, d => d.indicator)
display(wgidataset_year_indicator_grouped)
```

```js
const wgidataset_grouped = d3.group(wgidata, d => d.indicator)
```

```js
const wgidataset_year_indicator_grouped_2023 = d3.group(
  wgidata.filter(d => d.year === 2023),
  d => d.indicator
);
//display(wgidataset_year_indicator_grouped_2023)
```

<!---

develop map + normalize data
--->

```js
function normalizeWRI(inputMap, min = -2.5, max = 2.5) {
  const range = max - min;
  const normalizedMap = new Map();

  for (const [key, value] of inputMap.entries()) {
    if (typeof value === "number" && !isNaN(value)) {
      const normValue = ((value - min) / range) * 100;
      normalizedMap.set(key, normValue);
    } else {
      normalizedMap.set(key, null); // handle missing or invalid data
    }
  }

  return normalizedMap;
}

```


**`WGI_cc - Control of Corruption`**

```js
const WGI_2023_cc = wgidataset_year_indicator_grouped_2023.get("cc");
display(WGI_2023_cc)
```

```js
const WGI_2023_cc_dataMap = new Map(WGI_2023_cc.map(d => [d.countryname, d["estimate"]]));
display(WGI_2023_cc_dataMap)
```



**`WGI_ge - Government Effectiveness `**

```js
const WGI_2023_ge = wgidataset_year_indicator_grouped_2023.get("ge");
display(WGI_2023_ge)
```

```js
const WGI_2023_ge_dataMap = new Map(WGI_2023_ge.map(d => [d.countryname, d["estimate"]]));
display(WGI_2023_ge_dataMap)
display(invert(normalizeWRI(WGI_2023_ge_dataMap)))
```


**`WGI_pv - Political Stability and Absence of Violence/Terrorism`**

```js
const WGI_2023_pv = wgidataset_year_indicator_grouped_2023.get("pv");
display(WGI_2023_pv)
```

```js
const WGI_2023_pv_dataMap = new Map(WGI_2023_pv.map(d => [d.countryname, d["estimate"]]));
display(WGI_2023_pv_dataMap)
display(invert(normalizeWRI(WGI_2023_pv_dataMap)))
```

**`WGI_rl - Rule of Law`**


```js
const WGI_2023_rl = wgidataset_year_indicator_grouped_2023.get("rl");
display(WGI_2023_rl)
```

```js
const WGI_2023_rl_dataMap = new Map(WGI_2023_rl.map(d => [d.countryname, d["estimate"]]));
display(WGI_2023_rl_dataMap)
display(invert(normalizeWRI(WGI_2023_rl_dataMap)))
```



**`WGI_rq - Regulatory Quality`**

```js
const WGI_2023_rq = wgidataset_year_indicator_grouped_2023.get("rq");
display(WGI_2023_rq)
```

```js
const WGI_2023_rq_dataMap = new Map(WGI_2023_rq.map(d => [d.countryname, d["estimate"]]));
display(WGI_2023_rq_dataMap)
display(invert(normalizeWRI(WGI_2023_rq_dataMap)))
```



**`WGI_va - Voice and Accountability`**

```js
const WGI_2023_va = wgidataset_year_indicator_grouped_2023.get("va");
display(WGI_2023_va)
```

```js
const WGI_2023_va_dataMap = new Map(WGI_2023_va.map(d => [d.countryname, d["estimate"]]));
display(WGI_2023_va_dataMap)
display(invert(normalizeWRI(WGI_2023_va_dataMap)))
```


<br/>

**`Rule of Law Index =`**


```js
const rol_workbook = FileAttachment("/data/external/2024_wjp_rule_of_law_index_HISTORICAL_DATA_FILE.xlsx").xlsx()
```

```js
const rol_data = rol_workbook.sheet("WJP ROL Index 2024 Scores", {
    headers: false,
    range: "A1:"
  })
  display(rol_data)
```

```js
const rol_transpose = (raw_data) => {
  // Step 1: Get the keys in order (A, B, C, ...)
  const columnKeys = Object.keys(raw_data[0]);

  // Step 2: Extract row labels from column 'A'
  const rowLabels = raw_data.map(row => row["A"]);

  // Step 3: For each column (skip "A"), build a country object
  return columnKeys.slice(1).map(key => {
    const col = raw_data.map(row => row[key]);
    const countryData = {};
    rowLabels.forEach((label, i) => {
      countryData[label] = col[i];
    });
    return countryData;
  });
}
```

```js
const rol_data_transposed = rol_transpose(rol_data)
//display(rol_data_transposed)
```

```js
const rol_dataMap = new Map(rol_data_transposed.map(d => [d.Country, +d["WJP Rule of Law Index: Overall Score"]]));
//display(rol_dataMap)
```

```js
const rol_dataMap_normalized = normalize(rol_dataMap);
display(rol_dataMap_normalized)
```



```js
const rol_dataMap_normalized_inverted = invert(rol_dataMap_normalized);
display(rol_dataMap_normalized_inverted)
```





<br/>

**`Corruption Perceptions Index =`**

```js
const cpi_workbook = FileAttachment("/data/external/CPI2024-Results-and-trends.xlsx").xlsx()
```

```js
const cpi_data = cpi_workbook.sheet(0, {
    headers: true,
    range: "A3:"
  });
display(cpi_data)
```

```js
const cpi_dataMap = new Map(cpi_data.map(d => [d["Country / Territory"], d["CPI 2024 score"]]));
//display(cpi_dataMap)
```


```js
const cpi_dataMap_inverted = invert(cpi_dataMap);
display(cpi_dataMap_inverted )
```



<br/>

**`Bertelsmann Transformation Index (BTI) =`**

```js
const bti_workbook = FileAttachment("/data/external/BTI_2024_Scores.xlsx").xlsx()
```

```js
const bti_data = bti_workbook.sheet("BTI 2024", {
    headers: true,
    // range: "A1:J10"
  })

```

```js
const bti_data_keyed = bti_data.map(entry => {
  const original_key = Object.keys(entry)[0];
  const value = entry[original_key];

  // Create a new object with "Country" first, then spread the rest
  const { [original_key]: _, ...rest } = entry;
  return {
    Country: value,
    ...rest
  };
});
```


```js
const bti_dataMap_governance_inverted = invert(bti_dataMap_governance);
//display(bti_dataMap_governance_inverted)
```



```js
const bti_dataMap_governance = new Map(bti_data_keyed.map(d => [d.Country, +d["  G | Governance Index"]]));
display(invert(bti_dataMap_governance))
```

```js
const bti_dataMap_democracy = new Map(bti_data_keyed.map(d => [d.Country, +d["  SI | Democracy Status"]]));
display(invert(bti_dataMap_democracy))
```

```js
const bti_dataMap_economy = new Map(bti_data_keyed.map(d => [d.Country, +d["  SII | Economy Status"]]));
display(invert(bti_dataMap_economy))
```



<br/>

**`Fragile States Index (FSI) =`**


```js
const fsi_workbook = FileAttachment("/data/external/FSI-2023-DOWNLOAD.xlsx").xlsx()
```

```js
const fsi_data = fsi_workbook.sheet(0, {
    headers: true,
    // range: "A1:J10"
  });
  display(fsi_data)
```

```js
const fsi_score_map = new Map(fsi_data.map(d => [d.Country.trim(), +d["Total"]])); // "Total" = FSI score;
//display(fsi_score_map)
```

```js
const fsi_score_map_normalized = new Map(
  (() => {
    const scores = Array.from(fsi_score_map.values()), min = Math.min(...scores), max = Math.max(...scores);
    return [...fsi_score_map.entries()].map(([c, s]) => [c, +(((s - min) / (max - min)) * 100).toFixed(2)]);
  })()
);
display(fsi_score_map_normalized)
```



```js
// for ease of reference, an index of all index of data providers by name and dataset
const esgProvider_dataIndex = new Map([
  ["DOL Labor Rights 2024", normalize_DOL(DOL_workers_rights_map)],
  ["World Risk Index 2024 (Environmental)", worldriskindex24_risk_map],
  ["Environmental Performance Index (EPI)", epiMap_risk_map_inverted],
  ["ND-GAIN 2025 (Climate Risk)", nd_gain2025_risk_map],
  ["Global Rights Index 2025 - Social Risk", globalRightsIndex2025_map_normalized],
  ["Freedom in the World Index - PR", FIW_prMap],
  ["Freedom Index by Country", freedom_index_risk_map_normalized_inverted],
  ["Global Slavery Index (GSI)", globalSlavery_dataMap],
  ["Georgetown Women, Peace and Security Index (GIWPS)", invert(normalize(giwps_map))],
  ["Equilo GBV Risk Score", equilo_map],
  ["Gender Inequality Index (GII) 2023", gii2023_dataMap_normalized],
  ["Worldwide Governance Indicators (WGI)", invert(normalizeWRI(WGI_2023_ge_dataMap))],
  ["Rule of Law Index (RL)", rol_dataMap_normalized_inverted],
  ["Corruption Perceptions Index (CPI)", cpi_dataMap_inverted],
  ["Bertelsmann Transformation Index (BTI) - Governance", bti_dataMap_governance_inverted],
  ["Fragile States Index (FSI)", fsi_score_map_normalized]
]);
```



```js
// for creating interactive inputs, we define a list of all ESG data providers to potentially incorporate in the model:
const esgProviders = {

E: [
"World Risk Index 2024 (Environmental)", //
"Environmental Performance Index (EPI)", //
"ND-GAIN 2025 (Climate Risk)", //

],

S: [
"DOL Labor Rights 2024",
"Global Rights Index 2025 - Social Risk", //
"Freedom in the World Index - PR",
"Freedom Index by Country", //
"Global Slavery Index (GSI)", //
"Georgetown Women, Peace and Security Index (GIWPS)",
"Equilo GBV Risk Score",
"Gender Inequality Index (GII) 2023" //

],

G: [
"Worldwide Governance Indicators (WGI)",
"Rule of Law Index (RL)", //
"Corruption Perceptions Index (CPI)", //
"Bertelsmann Transformation Index (BTI) - Governance",
"Fragile States Index (FSI)"
]
};
```

---


The model can be adapt to evaluate one or a custom selection of indices across pillars:


**`Environmental` <code>[${selected_provider_E.length}]</code>**
```js
const selected_provider_E = view(Inputs.checkbox(esgProviders.E, {value: esgProviders.E}))
```

**`Social` <code>[${selected_provider_S.length}]</code>**
```js
const selected_provider_S = view(Inputs.checkbox(esgProviders.S, {value: esgProviders.S}))
```

**`Governance` <code>[${selected_provider_G.length}]</code>**
```js
const selected_provider_G = view(Inputs.checkbox(esgProviders.G, {value: esgProviders.G}))
```

</br>
Here are the ${esgProviders__selectedCount} ESG indices currently being evaluated:

```js
const esgProviders_selected = {

E: selected_provider_E,

S: selected_provider_S,

G: selected_provider_G,
};
display(esgProviders_selected)
```




<!-- Helper functions to inform UI presentation. -->

```js
const esgProviders__selectedCount = Object.values(esgProviders_selected)
  .flat()
  .filter(d => d != null && d !== "")
  .length;
```

```js
const esgProviders_selectedCountPillar = Object.fromEntries(
  Object.entries(esgProviders_selected).map(([key, arr]) => [
    key,
    arr.filter(d => d != null && d !== "").length
  ])
);
```


---


Each pillar (E, S, G) is individually normalized:


```tex
E_{country(i)} = \left(
\frac{
\sum_{index=1}^{n_E} E_{c(index)} }{n_E}
\right)
```

```tex
S_{country(i)} = \left(
\frac{
\sum_{index=1}^{n_S} S_{c(index)} }{n_S}
\right)
```

```tex
G_{country(i)} =  \left(
\frac{
\sum_{index=1}^{n_G} G_{c(index)} }{n_G}
\right)
```




```js
const pillarScores = computePillarScores(CRI_selected);
display(pillarScores)
```


```js
function computePillarScores(pillarDataIndices) {
  const result = {};

  for (const [pillar, maps] of Object.entries(pillarDataIndices)) {
    if (maps.length === 0) continue;
    result[pillar] = normalizeAndAverageScores(...maps);
  }

  return result;
}
```


```js
// helper function for score normalization

function normalizeAndAverageScores(...maps) {
  const countryScores = new Map();

  // Step 1: Collect all values by country
  maps.forEach(map => {
    map.forEach((value, country) => {
      if (typeof value === 'number' && !isNaN(value)) {
        if (!countryScores.has(country)) {
          countryScores.set(country, []);
        }
        countryScores.get(country).push(value);
      }
    });
  });

  // Step 2: Compute average per country
  const averagedScores = new Map();

  countryScores.forEach((values, country) => {
    const sum = values.reduce((acc, v) => acc + v, 0);   // \sum_{j=1}^{n_E} E_{ij}
    const n_i = values.length;                           // n_i: number of valid indicators
    const average = sum / n_i;                           // E_{country} = (1 / n_i) * sum
    averagedScores.set(country, average);
  });

  return averagedScores;
}
```



```js
/// helper logic for fuzzy matching ESG provider names
/// we will wish to later make this more robust
function provider_nameMatch(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]/gi, '') // remove spaces, punctuation
    .trim();
}
```


```js
// this function rebuilds our data index by looking up user-selected providers.  The function requires two parameters -- the names of ESG providers to be evaluated and the index mapping provides to referenced datasets
function pillar_groupedData(providersByPillar, esgProvider_dataIndex) {
  const result = {};

  const indexKeysNormalized = Array.from(esgProvider_dataIndex.keys()).map(key => ({
    key,
    norm: provider_nameMatch(key)
  }));

  for (const [pillarKey, providerNames] of Object.entries(providersByPillar)) {
    const datasets = providerNames.map(providerName => {
      const normProvider = provider_nameMatch(providerName);

      const matchedEntry = indexKeysNormalized.find(({ norm }) =>
        norm.includes(normProvider) || normProvider.includes(norm)
      );

      return matchedEntry ? esgProvider_dataIndex.get(matchedEntry.key) : null;
    }).filter(Boolean);

    result[pillarKey] = datasets;
  }

  return result;
}

```

```js
const CRI_selected = pillar_groupedData(esgProviders_selected, esgProvider_dataIndex);
```



<br/>
The composite ESG score for each country (CRI) is generated from the average of the normalized ESG values:

```tex
CRI = ESG_{\text{composite}(i)} = \frac{E_{country} + S_{country} + G_{country}}{n_P}
```
<br/>


**`Country Risk Index (CRI) = `**

```js
const countryRiskIndex = computeCompositeESGScore(pillarScores);
display(countryRiskIndex)
```



```js
function computeCompositeESGScore(pillarScores) {
  const allCountries = new Set(
    Object.values(pillarScores)
      .flatMap(map => Array.from(map.keys()))
  );

  const compositeScores = new Map();

  for (const country of allCountries) {
    const scores = ["E", "S", "G"]
      .map(pillar => pillarScores[pillar]?.get(country))
      .filter(score => typeof score === "number");

    if (scores.length === 0) continue;

    const sum = scores.reduce((acc, v) => acc + v, 0);
    const avg = sum / scores.length;

    compositeScores.set(country, avg);
  }

  return compositeScores;
}
```



<br/>



**Step 2 Output: Portfolio data including factored CRI values** 

<!--Using the indexed data, factored CRI scores are recorded (labeled to include year of record).-->


Portfolio `P` with composite `CRI`</sub> values  = 

```js
display(active_projects_ES_risk_numeric_CRI)
```


```js
function compositeCountryRiskIndex(projects) {
  return projects.map(project => {
    const rawCountry = project["Host Country"];
    const country = typeof rawCountry === "string" ? rawCountry.trim() : "";
    const score = countryRiskIndex.get(country);

    return {
      ...project,
      "Country Risk Index, 2025": typeof score === "number" ? score : null
    };
  });
}
```

```js
const active_projects_ES_risk_numeric_CRI = compositeCountryRiskIndex(active_projects_ES_risk_numeric)
```


```js
display((data => {
  const blob = new Blob([d3.csvFormat(data)], { type: "text/csv" });
  return download(blob, 'active_projects_ES_risk_numeric_CRI.csv', 'Download E&S Risk - CRI (numeric)');
})(active_projects_ES_risk_numeric_CRI));
```




---

## Step 3. Country-Adjusted ESRS Score

<br/>

This step combines the ESRS and CRI to create a Country-Adjusted ESRS.  This weighted value assigned to each scoring component (_ESRS vs. CRI_) can be defined as a variable ${tex` \omega`}.  The factored score is thus computed as:

${tex`ESRS_{countryAdjusted(i)} = (1 - \omega) \cdot EnvCat + \omega \cdot C`}

Where ${tex`\omega =`} ${omega}

```js
const omega = view(Inputs.range([0.1,0.9], {step: 0.1, value: 0.3}))
```


<br/>

**Step 3 Output: Portfolio data including country-adjusted ESRS** 

Portfolio P with composite `CRI` values and country-adjusted `ESRS` scores:</sub> 


```js
const ESRS_countryAdjusted = active_projects_ES_risk_numeric_CRI.map(d => ({
  ...d,
  "ESRS Country Adjusted": 
    ((1 - omega) * d["E&S Category Numeric"]) + (omega * d["Country Risk Index, 2025"])
}));
display(ESRS_countryAdjusted)
```



```js
display((data => {
  const blob = new Blob([d3.csvFormat(data)], { type: "text/csv" });
  return download(blob, 'ESRS_countryAdjusted.csv', 'Download ESRS - Country Adjusted');
})(ESRS_countryAdjusted));
```



---

## Step 4. Sector Risk Ratings

EBRD has created sector risk ratings for further contextual nuance.

```js
const EBRD_sector_risk_workbook = await FileAttachment("/data/external/ESMS-ESMS--Policies-and-procedures--categorisation-Annex-1- Rev2.1 FINAL.xlsx").xlsx()
```

```js
const sector_risk = EBRD_sector_risk_workbook.sheet(0, {range: "A2:", headers: true})
```

```js
const nace2_isic4 = await FileAttachment("/data/external/NACE2_ISIC4.txt").csv()
```

```js
const naics_isic_wb = await FileAttachment("/data/external/2017_NAICS_to_ISIC_4.xlsx").xlsx()
```

```js
const naics_isic_rows = naics_isic_wb.sheet(0, { headers: true })
```

```js
const isic_nace = await FileAttachment("/data/external/ISIC4_NACE2.txt").csv({ typed: false })
```

```js
const onlyDigits = (v) => (v ?? "").toString().replace(/\D+/g, "");
```

```js
function normalizeNaicsAny(row) {
  const a = onlyDigits(row["NAICS Code"]);
  const b = onlyDigits(row["NAICS_Sector_Code"]);
  // prefer the most specific we see across both columns
  const candidates = [a, b].filter(Boolean);
  if (candidates.length === 0) return "";
  // choose the longest code available, capped to 6 digits
  const best = candidates.sort((x,y)=>y.length-x.length)[0].slice(0,6);
  // return 6,3,2 options that exist
  return [6,3,2].map(n => best.length >= n ? best.slice(0,n) : null).filter(Boolean);
}
```

```js
// === 4) BUILD NAICS→ISIC (from 2017_NAICS_to_ISIC_4.xlsx) ===
const naicsCol = Object.keys(naics_isic_rows[0] ?? {}).find(k => /naics/i.test(k)) ?? "NAICS";
const isicCol  = Object.keys(naics_isic_rows[0] ?? {}).find(k => /isic/i.test(k))  ?? "ISIC";
```

```js
const compactIsic = (c) => (c ?? "").toString().replace(/\D+/g, "");
const compactNace = (c) => (c ?? "").toString().replace(/\s+/g, "");
```

```js
// === 3) BUILD ISIC→NACE (from ISIC4_NACE2.txt) ===
// Map ISIC(compact) -> Set of NACE codes (keep dotted form if present in file)
const naceByIsic = (() => {
  const m = new Map();
  for (const r of isic_nace) {
    const isic = compactIsic(r.ISIC4code);
    const nace = (r.NACE2code ?? "").toString(); // keep dotted form
    if (!isic || !nace) continue;
    if (!m.has(isic)) m.set(isic, new Set());
    m.get(isic).add(nace);
  }
  return m;
})();
```

```js
// Map NAICS prefix (2/3/6) -> Set of ISIC(compact)
const isicByNaicsPrefix = (() => {
  const m = new Map();
  for (const r of naics_isic_rows) {
    const naics = onlyDigits(r[naicsCol]);
    const isic  = compactIsic(r[isicCol]);
    if (!naics || !isic) continue;
    // register 2-, 3-, and 6-digit keys for each NAICS row (when available)
    for (const n of [2,3,6]) {
      if (naics.length >= n) {
        const key = naics.slice(0,n);
        if (!m.has(key)) m.set(key, new Set());
        m.get(key).add(isic);
      }
    }
  }
  return m;
})();
```

```js
// === 5) NAICS→NACE LOOKUP (compose via ISIC) ===
function isicToNaceSet(isicCompact) {
  if (!isicCompact) return new Set();
  if (naceByIsic.has(isicCompact)) return new Set(naceByIsic.get(isicCompact));
  // fallback: try shorter ISIC prefixes (e.g., "01" -> all NACE under "01.*")
  const out = new Set();
  for (let len = isicCompact.length - 1; len >= 1; len--) {
    const p = isicCompact.slice(0, len);
    for (const [k, set] of naceByIsic.entries()) {
      if (k.startsWith(p)) for (const v of set) out.add(v);
    }
    if (out.size) break;
  }
  return out;
}
```

```js
const NACE_LOOKUP = (() => {
  const m = new Map();
  for (const [naicsPrefix, isicSet] of isicByNaicsPrefix.entries()) {
    const out = new Set();
    for (const isic of isicSet) {
      for (const nace of isicToNaceSet(isic)) out.add(nace);
    }
    m.set(naicsPrefix, out);
  }
  return m;
})();
```

```js
function lookupNACEForProject(input) {
  // allow either a row or a raw code
  const naicsVariants = typeof input === "object" && input !== null
    ? normalizeNaicsAny(input)
    : normalizeNaicsAny({ "NAICS Code": input, "NAICS_Sector_Code": input });

  const out = new Set();
  for (const k of naicsVariants) {
    const set = NACE_LOOKUP.get(k);
    if (set) for (const v of set) out.add(v);
  }
  return [...out].sort();
}
```

```js
const naics_to_nace_table = (() => {
  const rows = [];
  for (const k of [...NACE_LOOKUP.keys()].sort()) {
    rows.push({
      NAICS_prefix: k,
      NACE_codes: [...NACE_LOOKUP.get(k)].sort().join(", ")
    });
  }
  return rows;
})();
```

```js
const pickCol = (row, re, fallback) =>
  Object.keys(row ?? {}).find(k => re.test(k)) ?? fallback;
```


```js
function buildSectorRiskIndex(rows) {
  if (!rows?.length) return new Map();
  const sample = rows[0];

  const naceCol = pickCol(sample, /nace/i, "NACE Code");
  const envCol  = pickCol(sample, /env/i,  "environment");
  const socCol  = pickCol(sample, /soc/i,  "social");
  const allCol  = pickCol(sample, /overall|total|composite/i, "overall");

  const labelToScore = (v) => {
    if (v == null) return {score: null, label: null};
    const s = String(v).trim();
    const n = Number(s);
    if (!Number.isNaN(n)) return {score: n, label: s};
    const table = new Map([
      [/^very\s*low$/i, 1],
      [/^low$/i, 1],
      [/^low-?medium$/i, 1.5],
      [/^medium-?low$/i, 1.5],
      [/^medium$|^med$/i, 2],
      [/^medium-?high$|^high-?medium$/i, 2.5],
      [/^high$/i, 3],
      [/^very\s*high$/i, 4]
    ]);
    for (const [re, val] of table) if (re.test(s)) return {score: val, label: s};
    return {score: 0, label: s}; // unknown text
  };

  const idx = new Map();
  for (const r of rows) {
    const nace = r?.[naceCol];
    if (!nace) continue;
    const rec = {
      environment: labelToScore(r?.[envCol]),
      social:      labelToScore(r?.[socCol]),
      overall:     labelToScore(r?.[allCol])
    };
    const keys = [
      String(nace).trim(),
      String(nace).trim().replace(/\W+/g, "")
    ];
    for (const k of keys) {
      if (!k) continue;
      const prev = idx.get(k);
      if (!prev) idx.set(k, rec);
      else {
        // keep higher risk for duplicates (conservative)
        idx.set(k, {
          environment: (prev.environment.score ?? 0) >= (rec.environment.score ?? 0) ? prev.environment : rec.environment,
          social:      (prev.social.score ?? 0)      >= (rec.social.score ?? 0)      ? prev.social      : rec.social,
          overall:     (prev.overall.score ?? 0)     >= (rec.overall.score ?? 0)     ? prev.overall     : rec.overall
        });
      }
    }
  }
  return idx;
}
```

```js
const SECTOR_RISK_INDEX = buildSectorRiskIndex(sector_risk)
```


```js
// Prefer the more granular NAICS Code, then fall back to NAICS_Sector_Code
function naicsVariantsPreferDetailed(row) {
  const detailed = onlyDigits(row["NAICS Code"]);
  const broad    = onlyDigits(row["NAICS_Sector_Code"]);

  // Build candidate prefixes in order of preference:
  // 1) detailed (6, then 3, then 2), then 2) broad (6/3/2 if present)
  const prefixes = [];
  if (detailed) for (const n of [6,3,2]) if (detailed.length >= n) prefixes.push(detailed.slice(0,n));
  if (broad)    for (const n of [6,3,2]) if (broad.length    >= n) prefixes.push(broad.slice(0,n));

  // de-dup while preserving order
  return [...new Set(prefixes)];
}

```



```js
// === 7) NACE KEY FALLBACKS: granular → parents (e.g., "64.19" → "64.1" → "64") ===
function candidateNaceKeys(code) {
  const raw = String(code ?? "").trim();
  if (!raw) return [];
  const dotted  = raw.replace(/[^\d.]/g, ""); // keep digits + dots
  const compact = dotted.replace(/\./g, "");
  const out = [];
  const push = (k) => { if (k && !out.includes(k)) out.push(k); };

  push(dotted); // exact dotted
  push(compact); // exact compact

  if (dotted.includes(".")) {
    const parts = dotted.split(".");
    for (let i = parts.length - 1; i >= 1; i--) {
      const d = parts.slice(0, i).join(".");
      push(d);
      push(d.replace(/\./g, ""));
    }
  }

  if (compact.length > 2) {
    for (let l = compact.length - 1; l >= 2; l--) {
      const c = compact.slice(0, l);
      const d2 = c.length > 2 ? `${c.slice(0,2)}.${c.slice(2)}` : c;
      push(d2);
      push(c);
    }
  }

  push(compact.slice(0, 2)); // ensure division-level present
  return out;
}

```




```js
function mostSpecificRiskForNace(code, index = SECTOR_RISK_INDEX) {
  for (const key of candidateNaceKeys(code)) {
    const rec = index.get(key);
    if (rec) return { keyMatched: key, rec };
  }
  return { keyMatched: null, rec: null };
}

```




```js
// Aggregate across many NACE: take the max risk found (conservative).
function riskForNaceSet(naceList, index = SECTOR_RISK_INDEX) {
  let best = {
    environment: { score: -Infinity, label: null },
    social:      { score: -Infinity, label: null },
    overall:     { score: -Infinity, label: null }
  };
  const usedKeys = [];

  for (const code of naceList ?? []) {
    const { keyMatched, rec } = mostSpecificRiskForNace(code, index);
    if (!rec) continue;
    usedKeys.push(`${code}→${keyMatched}`);
    if ((rec.environment.score ?? -Infinity) > (best.environment.score ?? -Infinity)) best.environment = rec.environment;
    if ((rec.social.score ?? -Infinity)      > (best.social.score ?? -Infinity))      best.social      = rec.social;
    if ((rec.overall.score ?? -Infinity)     > (best.overall.score ?? -Infinity))     best.overall     = rec.overall;
  }

  const clean = (x) => (x.score === -Infinity ? null : x.label);
  return {
    environment: clean(best.environment),
    social:      clean(best.social),
    overall:     clean(best.overall),
    _risk_keys_used: usedKeys.join(", ")
  };
}
```




```js
// === 8) NAICS→NACE FOR A ROW ===
function getPreferredNaceSet(row) {
  for (const p of naicsVariantsPreferDetailed(row)) {
    const s = NACE_LOOKUP.get(p);
    if (s && s.size) return { usedNaicsPrefix: p, nace: [...s].sort() };
  }
  return { usedNaicsPrefix: null, nace: [] };
}
```


```js
// === 9) FINAL: annotate each project with environment/social/overall ===
const portfolio_ESRS_countryAdjusted_with_EBRD_sector_risk = ESRS_countryAdjusted.map(row => {
  const { usedNaicsPrefix, nace } = getPreferredNaceSet(row);
  const risks = riskForNaceSet(nace);

  return {
    ...row,
    _naics_used_for_lookup: usedNaicsPrefix ?? null,
    _nace_matched: nace.join(", ") || null,
    _nace_risk_keys_used: risks._risk_keys_used || null, // e.g., "64.19→64"
    EBRD_sector_risk_environment: risks.environment,
    EBRD_sector_risk_social:      risks.social,
    EBRD_sector_risk_overall:     risks.overall
  };
});

```




<br/>

**Step 4 Output: Portfolio data including Sector Risk Ratings** 

```js
display(portfolio_ESRS_countryAdjusted_with_EBRD_sector_risk)
```

---

<br/>

## Step 5. Red Flags and Risk Mitigants

<br/>
Projects can be annotated with additional contextual risk data to dynamically modify factored scores based on up-to-date intelligence.  Available contextual modifiers and values are:

|Modifier|Value|
|---|---|
|${tex`\text{redFlag}_i`} | +10 |
|${tex`\text{monitoredLast2Y}_i`}  | -5 |
|${tex`\text{multipleLenders}_i`} | -5 |
|${tex`\text{iescReporting}_i`} | -5 |


<!--
Within first 3 years of disbursement and never monitored = +10
Open accountability case = +10
-->

A project's contextual risk value is calculated as the sum of all applicable modifiers: 

```tex
\mathrm{context}_i
=\;\mathrm{red\_flag\_008}_i
+\;\mathrm{monitored\_last\_2\_years}_i
+\;\mathrm{multiple\_lenders}_i
+\;\mathrm{iesc\_reporting}_i.
```

<br/>

Context Score: **${context_score === undefined ? "undefined" : context_score}**<br/><em>Note that the score is undefined until a selection is made</em>.


<!--

  - ${tex`\text{redFlag}`} = adverse E&S events as noted in the 008
  - ${tex`\text{exception}`} = exceptional events as noted in the 008
  - ${tex`\text{monitoredLast2Y}`} = identifies where projects have been subject to recent monitoring
  - ${tex`\text{multipleLenders}`} = identifies situations where multiple lenders are contributing
  - ${tex`\text{iescAudit}`}
  - ${tex`\text{analystTag}`}
  - ${tex`\text{unsatifiedObligation}`} = signals unsatisfied institutional obligations
-->

```js
const offsets  = [red_flag_008, monitored_last_2_years, multiple_lenders, iesc_reporting];
```

```js
const definedNumericValues = offsets.filter(v => typeof v === "number");
```

```js
const allNA = offsets.every(v => v === "n/a");
```

```js
const context_score = allNA
  ? "n/a"
  : definedNumericValues.length > 0
    ? definedNumericValues.reduce((sum, v) => sum + v, 0)
    : undefined;
```

<br/>

```js
const red_flag_008 = view(Inputs.radio(new Map([["true", 10], ["false", 0], ["n/a", "n/a"]]), {value: undefined, label: "red flag /008"}))
```



```js
display(red_flag_008)
```


```js
const monitored_last_2_years = view(Inputs.radio(new Map([["true", -5], ["false", 0], ["n/a", "n/a"]]), {value: undefined, label: "monitored last 2 years"}))
```


```js
display(monitored_last_2_years)
```


```js
const multiple_lenders = view(Inputs.radio(new Map([["true", -5], ["false", 0], ["n/a", "n/a"]]), {value: undefined, label: "multiple lenders"}))
```

```js
display(multiple_lenders)
```


```js
const iesc_reporting = view(Inputs.radio(new Map([["true", -5], ["false", 0], ["n/a", "n/a"]]), {value: undefined, label: "iesc reporting "}))
```

```js
display(iesc_reporting)
```


---
**Step 5 Output :** **<mark>Portfolio with Flag-Adjusted ESG risk scores</mark>** 
  


```js
const ESRScontext = writeContextValue_example(ESRS_countryAdjusted);
//display(ESRScontext[0]["context_score"])
```

```js
function writeContextValue_example(data) {
  return data.map(d => {
    const offsets = [
      red_flag_008,
      monitored_last_2_years,
      multiple_lenders,
      iesc_reporting
    ];

    const definedNumericValues = offsets.filter(v => typeof v === "number");
    const allNA = offsets.every(v => v === "n/a");

    const context_score = allNA
      ? "n/a"
      : definedNumericValues.length > 0
        ? definedNumericValues.reduce((sum, v) => sum + v, 0)
        : undefined;

    return {
      ...d,
      context_score
    };
  });
}
```


```js
function writeContextValue(data) {
  return data.map(d => {
    const offsets = [
      red_flag_008,
      monitored_last_2_years,
      multiple_lenders,
      iesc_reporting
    ];

    const definedNumericValues = offsets.filter(v => typeof v === "number");
    const allNA = offsets.every(v => v === "n/a");

    const context_score = allNA
      ? "n/a"
      : definedNumericValues.length > 0
        ? definedNumericValues.reduce((sum, v) => sum + v, 0)
        : undefined;

    return {
      ...d,
      context_score
    };
  });
}
```


**`Portfolio with 008 Flags`**


```js
display(projects_with_ES_outcomes);
```


```js
let outcomes_survey_year_selection_input = Inputs.select(
  ["2022","2023"],
  //fiscal_years,
  {
  label: "Select a Year",
  value: "2023"
  }
)

let outcomes_survey_year_selection = Inputs.bind(Inputs.select(
  ["2022","2023"],
  //fiscal_years,
  {
  label: "Select a Year",
  value: "2023"
  }
), outcomes_survey_year_selection_input)
```

```js
const outcomes_survey_year_select = Generators.input(outcomes_survey_year_selection);
```

<br/>

Quickly browse the 008 Data by year:

```js
Inputs.bind(Inputs.select(
  ["2022","2023"],
  //fiscal_years,
  {
  width: "40px",
  value: "2023",
  }
), outcomes_survey_year_selection)
```


```js
const outcomes_survey_by_year = outcomes_survey.filter(d => d["Application: Fiscal Year"] == outcomes_survey_year_select);
```


```js
view(Inputs.table(outcomes_survey_by_year, {
  columns: [
    "Project Name",
    
    "Form 007/008: Form 007/008 Name",
    "Application: Application Number",
    "Project In Compliance",
    "Project Worker Layoffs",
    "Accidents Occurred",
    "Changes To Workforce",
    "Community Strike Or Opposition",
    "Disputes With Trade Union",
    "Gender-Based Violence",
    "# Households Economically Displaced",
    "# Households Physically Displaced",
    "Project Cited Or Fined",
    "Project Design Change",
    "Project Involved In Dispute Resolution",
    "Project Engaged With Communities",
    "Project Involve Land Acquisition",
    "Strikes Or Labor Disputes",
    "# Of Workers Laid Off",
    "# Workers Laid Off"
  ],
  header: {
    "Project Name": "Project Name",
    "Application: Application Number": "Application Number",
    "Form 007/008: Form 007/008 Name": "Form 008 Name",
    "Project In Compliance": "Project In Compliance",
    "Project Worker Layoffs": "Project Worker Layoffs",
    "Accidents Occurred": "Accidents Occurred",
    "Changes To Workforce": "Changes To Workforce",
    "Community Strike Or Opposition": "Community Strike Or Opposition",
    "Disputes With Trade Union": "Disputes With Trade Union",
    "Gender-Based Violence": "Gender-Based Violence",
    "# Households Economically Displaced": "# Households Economically Displaced",
    "# Households Physically Displaced": "# Households Physically Displaced",
    "Project Cited Or Fined": "Project Cited Or Fined",
    "Project Design Change": "Project Design Change",
    "Project Involved In Dispute Resolution": "Project Involved In Dispute Resolution",
    "Project Engaged With Communities": "Project Engaged With Communities",
    "Project Involve Land Acquisition": "Project Involve Land Acquisition",
    "Strikes Or Labor Disputes": "Strikes Or Labor Disputes",
    "# Of Workers Laid Off": "# Of Workers Laid Off",
    "# Workers Laid Off": "# Workers Laid Off"
  },
}))

```



```js
display(outcomes_survey_by_year)
```


```js
function writeOutcomesES(all_projects, outcomes_survey) {
  const attributesToTransfer = [
    "Form 007/008: Form 007/008 Name",
    "Application: Application Number",
    "Project In Compliance",
    "Project Worker Layoffs",
    "Accidents Occurred",
    "Changes To Workforce",
    "Community Strike Or Opposition",
    "Disputes With Trade Union",
    "Gender-Based Violence",
    "# Households Economically Displaced",
    "# Households Physically Displaced",
    "Project Cited Or Fined",
    "Project Design Change",
    "Project Involved In Dispute Resolution",
    "Project Engaged With Communities",
    "Project Involve Land Acquisition",
    "Strikes Or Labor Disputes",
    "# Of Workers Laid Off",
    "# Workers Laid Off"
  ];

  // Group insight report entries by project name
  const grouped = {};
  for (const row of outcomes_survey) {
    const name = row["Project Name"];
    const year = row["Application: Fiscal Year"];
    if (!name || !year) continue;
    if (!grouped[name]) grouped[name] = {};
    grouped[name][year] = row;
  }

  // Now merge the grouped data into all_projects
  return all_projects.map(project => {
    const name = project["Project Name"];
    const matchedByYear = grouped[name] || {};

    const enriched = { ...project };

    for (const [year, report] of Object.entries(matchedByYear)) {
      for (const attr of attributesToTransfer) {
        const key = `${attr}, ${year}`;
        enriched[key] = report[attr] ?? null;
      }
    }

    return enriched;
  });
}
```

```js
const projects_with_ES_outcomes = writeOutcomesES(active_projects, outcomes_survey);
```



----


```js
const outcomes_ES_attributes = [
  "Project In Compliance",
  "Changes To Workforce",
  "Project Worker Layoffs",
  "Accidents Occurred",
  "Strikes Or Labor Disputes",
  "Disputes With Trade Union",
  "Project Involve Land Acquisition",
  "Community Strike Or Opposition",
  "Project Engaged With Communities",
  "Gender-Based Violence",
  "Project Cited Or Fined",
  "Project Involved In Dispute Resolution"
];
```

```js
const attributeInterpretation = {
  "Project In Compliance": "positive_highlightColor",
  "Project Engaged With Communities": "positive",
  "Grievance Mechanism": "positive",
  "Consultation": "positive",
  "Community Engagement": "positive",

  "Accidents Occurred": "negative",
  "Changes To Workforce": "negative",
  "Project Worker Layoffs": "negative",
  "Strikes Or Labor Disputes": "negative",
  "Disputes With Trade Union": "negative",
  "Project Involve Land Acquisition": "negative",
  "Community Strike Or Opposition": "negative",
  "Gender-Based Violence": "negative",
  "Project Cited Or Fined": "negative",
  "Project Involved In Dispute Resolution": "negative"
};

```


```js
const attributeRegex = new RegExp(`^(${outcomes_ES_attributes.join("|")})(, \\d{4})?$`);
```



```js
const filtered_projects_with_ES_outcomes = projects_with_ES_outcomes.filter(d =>
  Object.keys(d).some(k => attributeRegex.test(k) && d[k] != null && d[k] !== "")
);
```

```js
//filtered_projects_with_ES_outcomes
```



```js
const matchingColumns = Array.from(
  new Set(
    filtered_projects_with_ES_outcomes.flatMap(d =>
      Object.keys(d).filter(k => attributeRegex.test(k))
    )
  )
);

```



```js
const displayColumns = ["Project Name", "Application: Fiscal Year", ...matchingColumns];
```



```js
const yesNoFormat = (value, options = {}) => {
  const { treatYesAs } = options;
  const div = document.createElement("div");
  div.textContent = value;

  const yes = value === "Yes";
  const no = value === "No";
  const unknown = value === "Do not know";

  if (treatYesAs === "positive") {
    if (yes) {
      div.style.backgroundColor = "green";
      div.style.color = "white";
    } else if (unknown) {
      div.style.backgroundColor = "#ffd994";
      div.style.color = "black";
    }
  } else if (treatYesAs === "positive_fullColor") {
    if (yes) {
      div.style.backgroundColor = "green";
      div.style.color = "white";
    } else if (no) {
      div.style.backgroundColor = "#b65436";
      div.style.color = "white";
    } else if (unknown) {
      div.style.backgroundColor = "#ffd994";
      div.style.color = "black";
    }
  } else if (treatYesAs === "positive_highlightColor") {
    if (no) {
      div.style.backgroundColor = "#b65436";
      div.style.color = "white";
    } else if (unknown) {
      div.style.backgroundColor = "#ffd994";
      div.style.color = "black";
    }
  } else if (treatYesAs === "negative") {
    if (yes) {
      div.style.backgroundColor = "#b65436";
      div.style.color = "white";
    } else if (unknown) {
      div.style.backgroundColor = "#ffd994";
      div.style.color = "black";
    }
  } else if (treatYesAs === "negative_fullColor") {
    if (yes) {
      div.style.backgroundColor = "#b65436";
      div.style.color = "white";
    } else if (no) {
      div.style.backgroundColor = "green";
      div.style.color = "white";
    } else if (unknown) {
      div.style.backgroundColor = "#ffd994";
      div.style.color = "black";
    }
  } else if (treatYesAs === "negative_highlightColor") {
    if (yes) {
      div.style.backgroundColor = "#b65436";
      div.style.color = "white";
    } else if (unknown) {
      div.style.backgroundColor = "#ffd994";
      div.style.color = "black";
    }
  }

  return div;
};
```



```js
const formatByColumn = {};
for (const col of displayColumns) {
  const match = col.match(/^(.+?)(?:, \d{4})?$/); // Extract base attribute without year
  const baseAttr = match?.[1]?.trim();

  if (baseAttr && attributeInterpretation[baseAttr]) {
    const treatYesAs = attributeInterpretation[baseAttr];
    formatByColumn[col] = value => yesNoFormat(value, { treatYesAs });
  }
}
```


<!--- NICELY FORMATTED TABLE BUT NEED TO INTEGRATE WITH OTHER VIEWS
```js
view(Inputs.table(filtered_projects_with_ES_outcomes, {
  columns: displayColumns,
  header: Object.fromEntries(displayColumns.map(col => [col, col])), // or set friendly names
  format: formatByColumn
}))

```
-->




```js
const interpret_008 = {
  //"Project In Compliance": "positive",
  //"Project Engaged With Communities": "positive",
  //"Grievance Mechanism": "positive",
  //"Consultation": "positive",
  //"Community Engagement": "positive",

  "Accidents Occurred": "negative",
  "Changes To Workforce": "negative",
  "Project Worker Layoffs": "negative",
  "Strikes Or Labor Disputes": "negative",
  "Disputes With Trade Union": "negative",
  "Project Involve Land Acquisition": "negative",
  "Community Strike Or Opposition": "negative",
  "Gender-Based Violence": "negative",
  "Project Cited Or Fined": "negative",
  "Project Involved In Dispute Resolution": "negative"
};
```

```js
function flag008(projects) {
  return projects.map(project => {
    let flagged = false;

    for (const key in project) {
      const match = key.match(/^(.*),\s*\d{4}$/);
      if (match) {
        const baseKey = match[1];
        const interpretation = interpret_008[baseKey];
        const value = project[key];

        if (interpretation === "negative" && value === "Yes") {
          flagged = true;
          break;
        }
        if (interpretation === "positive" && (value === "No" || value === "no" || value === false)) {
          flagged = true;
          break;
        }
      }
    }

    return { ...project, "008 flag": flagged };
  });
}
```
For convenience, we can isolate only those project with adverse E&S records:

```js
// Usage
const projects_with_ES_outcomes_flagged = flag008(projects_with_ES_outcomes);
//display(projects_with_ES_outcomes_flagged)
```

```js
// Usage
display(projects_with_ES_outcomes_flagged.filter(d => d["008 flag"] === true))
```


```js
function filterBy008FlagAndYear(projects, year) {
  return projects.filter(project => {
    if (!project["008 flag"]) return false;

    // Check if any attribute for this year is problematic
    for (const key in project) {
      if (key.endsWith(`, ${year}`)) {
        // Extract base attribute name
        const baseKey = key.slice(0, -(`, ${year}`).length);
        const interpretation = interpret_008[baseKey];
        const value = project[key];

        if (!interpretation) continue; // skip if attribute not in interpret_008

        // Check if this value signals a problem, matching how you set the flag
        if (
          (interpretation === "negative" && value === "Yes") ||
          (interpretation === "positive" && (value === "No" || value === "no" || value === false))
        ) {
          return true; // found a problematic attribute for this year
        }
      }
    }

    return false; // no problematic attribute for this year
  });
}
```


```js
const flagged_2022_projects = filterBy008FlagAndYear(projects_with_ES_outcomes_flagged, "2022");
const flagged_2023_projects = filterBy008FlagAndYear(projects_with_ES_outcomes_flagged, "2023");
```

<!-- BETTER PRESENTATION WOULD MAKE THIS MORE USEFUL
```js echo
// Display
display(flagged_2022_projects);
// or
display(flagged_2023_projects);
```
-->

```js
import {download} from "/components/download.js";
```


```js
function serialize (data) {
 let s = JSON.stringify(data);
 return new Blob([s], {type: "application/json"}) 
}
```


<!-- THESE NEED TO BE RE-WIRED

```js
display(download(serialize(flagged_2023_projects), "flagged_2023_projects", "Download Flagged 2024 Projects [JSON]"))
```

```js
const downloadCSV = (data, filename = 'flagged_2023_projects.csv') => {
  let downloadData = new Blob([d3.csvFormat(data)], { type: "text/csv" });
  
  const button = download(
    downloadData,
    filename,
    `Download Flagged 2024 Projects [CSV]`
  );
  return button;
};
display(downloadCSV(flagged_2023_projects))
```
-->


---

<br/>


**<mark>`Portfolio Monitored in Past 2 Years`</mark>**


```js
display(flattenVisitsByFY(active_projects, trips_with_visits))
```

```js
// Minimal-call API:
//   result = flattenVisitsByFY(projects, trips_with_visits)
//
// Adds year-suffixed columns for all present fields below, plus Visited / Years Visited.
function flattenVisitsByFY(projects, trips, opts = {}) {
  const defaults = {
    projectKey: "Project Name",
    fiscalYearKey: "Visit Fiscal Year",
    fieldsToFlatten: [
      "Trip: Name",
      "Project Visit: Visit Number",
      "Trip: ID",
      "Start Date",
      "Trip Countries",
      // Newly requested fields:
      "Visit Reason",
      "Project Visit: Record Type",
      "Project Name: Project Owner: Division",
      "Comments",
      "ENV Summary",
      "SOC Summary",
    ],
  };
  const cfg = { ...defaults, ...opts };

  // --- helpers ---
  const nbsp = /\u00a0/g;
  const collapseSpaces = s => String(s ?? "").replace(nbsp, " ").replace(/\s+/g, " ").trim();
  const normCol = s => collapseSpaces(s).replace(/\s*:\s*/g, ": "); // tidy spaces around ":"
  const get = (obj, key) => obj?.[key] ?? obj?.[normCol(key)] ?? "";
  const parseFY = v => (String(v ?? "").match(/(\d{4})/) || [,""])[1];
  const parseDateTS = v => { const t = Date.parse(String(v ?? "")); return Number.isFinite(t) ? t : Number.POSITIVE_INFINITY; };
  const dedupJoin = arr => {
    const out = [], seen = new Set();
    for (const v of arr.map(x => String(x ?? "").trim()).filter(Boolean)) {
      if (!seen.has(v)) { seen.add(v); out.push(v); }
    }
    return out.join(" | ");
  };
  const normObjKeys = o => Object.fromEntries(Object.entries(o).map(([k,v]) => [normCol(k), v]));

  // Normalize rows (non-destructive copies)
  const projRows = projects.map(normObjKeys);
  const tripRows = trips.map(normObjKeys);

  // --- auto-detect keys ---
  const projKey = normCol(cfg.projectKey);

  // Try common variants for trips project-name column
  const tripKeys = Object.keys(tripRows[0] || {});
  let tripProjectKey =
    tripKeys.find(k => k === " Project Name:  Project Name") ||
    tripKeys.find(k => k.toLowerCase().endsWith("project name")) ||
    tripKeys.find(k => k.toLowerCase() === "project name: project name") ||
    tripKeys.find(k => k.toLowerCase() === "project name");
  if (!tripProjectKey) throw new Error("Could not auto-detect trips project-name column.");

  // Fiscal year column
  let fyKey = tripKeys.find(k => k === cfg.fiscalYearKey) ||
              tripKeys.find(k => k.toLowerCase().replace(/\s+/g,"") === cfg.fiscalYearKey.toLowerCase().replace(/\s+/g,""));
  if (!fyKey) throw new Error("Could not find a 'Visit Fiscal Year' column in trips.");

  // Only keep fields that actually exist (so missing ones don't break)
  const fieldsToFlatten = cfg.fieldsToFlatten.filter(f =>
    Object.prototype.hasOwnProperty.call(tripRows[0] || {}, f) ||
    Object.prototype.hasOwnProperty.call(tripRows[0] || {}, normCol(f))
  );

  // Prepare trips
  const preppedTrips = tripRows
    .map(row => {
      const projName = collapseSpaces(get(row, tripProjectKey));
      const fy = parseFY(get(row, fyKey));
      const sortKey = parseDateTS(get(row, "Start Date"));
      const picked = {};
      for (const f of fieldsToFlatten) picked[f] = get(row, f);
      return { projName, fy, sortKey, ...picked };
    })
    .filter(r => r.projName && r.fy);

  // Stable order (earliest Start Date first)
  preppedTrips.sort((a, b) =>
    a.projName.localeCompare(b.projName) ||
    a.fy.localeCompare(b.fy) ||
    (a.sortKey - b.sortKey)
  );

  // Aggregate by project + FY
  const byProjFY = new Map();
  for (const row of preppedTrips) {
    const key = `${row.projName}||${row.fy}`;
    let agg = byProjFY.get(key);
    if (!agg) {
      agg = { projName: row.projName, fy: row.fy };
      for (const f of fieldsToFlatten) agg[f] = [];
      byProjFY.set(key, agg);
    }
    for (const f of fieldsToFlatten) agg[f].push(row[f]);
  }

  // Build wide columns (Field_YYYY)
  const perProjectWide = new Map();
  for (const { projName, fy, ...rest } of byProjFY.values()) {
    let bag = perProjectWide.get(projName);
    if (!bag) { bag = {}; perProjectWide.set(projName, bag); }
    for (const f of fieldsToFlatten) {
      bag[`${f}_${fy}`] = dedupJoin(rest[f] || []);
    }
  }

  // Years visited per project
  const yearsByProject = new Map();
  for (const { projName, fy } of byProjFY.values()) {
    if (!yearsByProject.has(projName)) yearsByProject.set(projName, new Set());
    yearsByProject.get(projName).add(fy);
  }

  // Merge into projects
  const result = projRows.map(p => {
    const projName = collapseSpaces(get(p, projKey));
    const wide = perProjectWide.get(projName) || {};
    const years = Array.from(yearsByProject.get(projName) ?? []).sort();
    return {
      ...p,
      Visited: years.length ? "Yes" : "No",
      "Years Visited": years.join(", "),
      ...wide,
    };
  });

  return result;
}

```


<br/>

---

## Step 6: Final Risk Score

<br/>

Calculating the final risk score involves first summing a project's country-adjusted ESRS and contextual risk score.

${tex`ESRS_{\text{countryAdjusted} {(i)}} + O_{\text{context} {(i)}}`}

<br/>
Additional bounding parameters are applied too maintain a range of [0,100]:

${tex`\text{ESRS}_{\text{factored} {(i)}} = \min\left(\max\left(ESRS_{\text{countryAdjusted} {(i)}} + O_{\text{context} {(i)}},\ 0\right),\ 100\right)`}



---
**<mark>Step 6 Output</mark>** 
  


```js
const ESRSfactored = factorContextValue(ESRScontext);
display(ESRSfactored[0]["finalScore"])
```

```js echo
function factorContextValue(data) {
  return data.map(d => {
    const N = d["ESRS Country Adjusted"];
    const context_score = d.context_score;

    let finalScore;

    if (typeof N === "number" && typeof context_score === "number") {
      const combined = N + context_score;
      finalScore = Math.max(0, Math.min(100, combined));
    } else {
      finalScore = N; // fallback to unmodified value
    }

    return {
      ...d,
      finalScore
    };
  });
}
```

---


## Portfolio Segmentation


Projects are segmented into three monitoring priority tiers based on final scores:



|Tier|Range|
| --- | --- |
|Site Monitoring|Top 24 projects|
|Desk Monitoring|Next 24 projects|
|No Monitoring|Remaining projects|

---

<br/>

### Site Monitoring

```js
Inputs.table(segmentedPortfolio.filter(d => d.monitoringTier === "priority for site monitoring"))
```


```js
display((data => {
  const blob = new Blob([d3.csvFormat(data)], { type: "text/csv" });
  return download(blob, 'active_projects_ESG_risk_top_segment.csv', 'Download Top Segment for Site Monitoring');
})(segmentedPortfolio.filter(d => d.monitoringTier === "priority for site monitoring")));
```
<br/>

### Desk Monitoring / Special Consideration 

```js
Inputs.table(segmentedPortfolio.filter(d => d.monitoringTier === "recommended for enhanced desk monitoring"))
```


```js
display((data => {
  const blob = new Blob([d3.csvFormat(data)], { type: "text/csv" });
  return download(blob, 'active_projects_ESG_risk_top_segment.csv', 'Download Middle Segment for Desk Monitoring');
})(segmentedPortfolio.filter(d => d.monitoringTier === "recommended for enhanced desk monitoring")));
```

<br/>

### Not Prioritized 

```js
Inputs.table(segmentedPortfolio.filter(d => d.monitoringTier === "standard monitoring"))
```


```js echo
display(segmentedPortfolio)
display(segmentedPortfolio[0]["monitoringTier"])
display(segmentedPortfolio.filter(d => d.monitoringTier === "priority for site monitoring"));
display(segmentedPortfolio.filter(d => d.monitoringTier === "recommended for enhanced desk monitoring"));
display(segmentedPortfolio.filter(d => d.monitoringTier === "standard monitoring"));
```

```js
const segmentedPortfolio = segmentPortfolio(ESRSfactored);
```

```js echo
function segmentPortfolio(data) {
  // Make a shallow copy to avoid mutating original array
  const sorted = [...data]
    .filter(d => typeof d.finalScore === "number")
    .sort((a, b) => b.finalScore - a.finalScore); // descending order

  // Assign tiers by index
  return data.map(d => {
    const index = sorted.findIndex(x => x === d);
    let monitoringTier;

    if (index >= 0 && index < 24) {
      monitoringTier = "priority for site monitoring";
    } else if (index >= 24 && index < 48) {
      monitoringTier = "recommended for enhanced desk monitoring";
    } else {
      monitoringTier = "standard monitoring";
    }

    return {
      ...d,
      monitoringTier
    };
  });
}
```





```js
const scoredProjects = active_projects
```

```js
// --- Assign monitoring tiers ---
const total =
scoredProjects.length;
```



```js
const siteCutoff =
Math.ceil(total
 * 0.10);
```



```js
const deskCutoff =
Math.ceil(total
 * 0.30);
```


---

