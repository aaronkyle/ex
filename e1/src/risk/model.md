# ESG Risk Ranking Model for Portfolio Monitoring

This document defines a model for transparently and generatively calculating project E&S risk scores and for risk-based portfolio segmentation. The model factors project E&S risk categories, contextual risk using multi-dimensional ESG scores, and institutionally-defined risk parameters reflective of project-specific red flags and/or risk mitigants. 




---

```js
const local_file_insight_active_projects = view(Inputs.file({label: "Project Portfolio (Active)", accept: ".csv"}));
```


```js
// IndexedDB Setup
const dbName_insight_active_projects  = "insight_active_projects";
const dbVersion_insight_active_projects  = 1;
const storeName_insight_active_projects  = "insight_active";
```

```js
// Function to open or create IndexedDB
async function openDB_insight_active_projects () {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName_insight_active_projects , dbVersion_insight_active_projects );
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            db.createObjectStore(storeName_insight_active_projects , { keyPath: "id" });
        };
        
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}
```

```js
// Function to get data from IndexedDB
async function getData_insight_active_projects () {
    const db = await openDB_insight_active_projects();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName_insight_active_projects , "readonly");
        const store = transaction.objectStore(storeName_insight_active_projects );
        const request = store.get("state_data_insight_active_projects");
        
        request.onsuccess = () => resolve(request.result?.data ?? template_data_insight_active_projects);
        request.onerror = () => reject(request.error);
    });
}
```

```js
// Function to save data to IndexedDB
async function saveData_insight_active_projects(data) {
    const db = await openDB_insight_active_projects();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName_insight_active_projects, "readwrite");
        const store = transaction.objectStore(storeName_insight_active_projects);
        store.put({ id: "state_data_insight_active_projects", data });
        
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
    });
}
```


```js
// needed to correctly initialize the chart
const template_data_insight_active_projects = FileAttachment("/data/internal/all_projects_template_minimal.csv").csv()
```

```js
/// Initialize state_data with IndexedDB or template data
let state_data_insight_active_projects = Mutable(await getData_insight_active_projects ());

function swap_data_insight_active_projects(data) {
  state_data_insight_active_projects.value = data;
}

(async function(d) {
    return d === null ? "pending file selection" : state_data_insight_active_projects.value = await d.json();
})(local_file_insight_active_projects);
```


```js
// removing view here temporarily
const load_template_data_insight_active_projects = Inputs.button("Reset Template", {reduce: () => swap_data_insight_active_projects(template_data_insight_active_projects)})
```


```js
 const report_insight_active_projects  = (async () => {////
  try {
    return await local_file_insight_active_projects.csv();
  } catch (error) {
    console.warn("error with file", error);
    return state_data_insight_active_projects;
  }
})();

```



```js
// Optional auto-persist
 await saveData_insight_active_projects(report_insight_active_projects);
```



```js
const active_projects = report_insight_active_projects;
display(active_projects )
```




```js
const local_file_insight_outcomes_survey = view(Inputs.file({label: "Outcomes Survey", accept: ".csv"}));
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
display(report_insight_outcomes_survey)
```





```js
const local_file_insight_trips_w_visits = view(Inputs.file({label: "Project Visits", accept: ".csv"}));
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
display(report_insight_trips_w_visits)
```



```js
const local_file_insight_trips_w_monitoring_records = view(Inputs.file({label: "Monitoring Activities", accept: ".csv"}));
```


```js
// IndexedDB Setup
const dbName_insight_trips_w_monitoring_records  = "insight_trips_w_monitoring_records";
const dbVersion_insight_trips_w_monitoring_records  = 1;
const storeName_insight_trips_w_monitoring_records  = "insight_all";
```

```js
// Function to open or create IndexedDB
async function openDB_insight_trips_w_monitoring_records () {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName_insight_trips_w_monitoring_records , dbVersion_insight_trips_w_monitoring_records );
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            db.createObjectStore(storeName_insight_trips_w_monitoring_records , { keyPath: "id" });
        };
        
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}
```

```js
// Function to get data from IndexedDB
async function getData_insight_trips_w_monitoring_records () {
    const db = await openDB_insight_trips_w_monitoring_records();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName_insight_trips_w_monitoring_records , "readonly");
        const store = transaction.objectStore(storeName_insight_trips_w_monitoring_records );
        const request = store.get("state_data_insight_trips_w_monitoring_records");
        
        request.onsuccess = () => resolve(request.result?.data ?? template_data_insight_trips_w_monitoring_records);
        request.onerror = () => reject(request.error);
    });
}
```

```js
// Function to save data to IndexedDB
async function saveData_insight_trips_w_monitoring_records(data) {
    const db = await openDB_insight_trips_w_monitoring_records();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName_insight_trips_w_monitoring_records, "readwrite");
        const store = transaction.objectStore(storeName_insight_trips_w_monitoring_records);
        store.put({ id: "state_data_insight_trips_w_monitoring_records", data });
        
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
    });
}
```


```js
// needed to correctly initialize the chart
const template_data_insight_trips_w_monitoring_records = FileAttachment("/data/internal/trips_w_monitoring_records_template_minimal.csv").csv()
```

```js
/// Initialize state_data with IndexedDB or template data
let state_data_insight_trips_w_monitoring_records = Mutable(await getData_insight_trips_w_monitoring_records ());

function swap_data_insight_trips_w_monitoring_records(data) {
  state_data_insight_trips_w_monitoring_records.value = data;
}

(async function(d) {
    return d === null ? "pending file selection" : state_data_insight_trips_w_monitoring_records.value = await d.json();
})(local_file_insight_trips_w_monitoring_records);
```


```js
// removing view here temporarily
const load_template_data_insight_trips_w_monitoring_records = Inputs.button("Reset Template", {reduce: () => swap_data_insight_trips_w_monitoring_records(template_data_insight_trips_w_monitoring_records)})
```


```js
 const report_insight_trips_w_monitoring_records  = (async () => {////
  try {
    return await local_file_insight_trips_w_monitoring_records.csv();
  } catch (error) {
    console.warn("error with file", error);
    return state_data_insight_trips_w_monitoring_records;
  }
})();

```



```js
// Optional auto-persist
 await saveData_insight_trips_w_monitoring_records(report_insight_trips_w_monitoring_records);
```



```js
display(report_insight_trips_w_monitoring_records)
```





```js

const local_file_env_soc_events = view(Inputs.file({label: "E&S Incidents", accept: ".xlsx"}));
//display(local_file_env_soc_events_workbook);
```

```js
// IndexedDB Setup
const dbName_env_soc_events  = "env_soc_events";
const dbVersion_env_soc_events  = 1;
const storeName_env_soc_events  = "insight_all";
```

```js
// Function to open or create IndexedDB
async function openDB_env_soc_events () {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName_env_soc_events , dbVersion_env_soc_events );
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            db.createObjectStore(storeName_env_soc_events , { keyPath: "id" });
        };
        
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}
```

```js
// Function to get data from IndexedDB
async function getData_env_soc_events () {
    const db = await openDB_env_soc_events();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName_env_soc_events , "readonly");
        const store = transaction.objectStore(storeName_env_soc_events );
        const request = store.get("state_data_env_soc_events");
        
        request.onsuccess = () => resolve(request.result?.data ?? template_data_env_soc_events);
        request.onerror = () => reject(request.error);
    });
}
```

```js
// Function to save data to IndexedDB
async function saveData_env_soc_events(data) {
    const db = await openDB_env_soc_events();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName_env_soc_events, "readwrite");
        const store = transaction.objectStore(storeName_env_soc_events);
        store.put({ id: "state_data_env_soc_events", data });
        
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
    });
}
```


```js
// needed to correctly initialize the chart
const template_data_env_soc_events_workbook = FileAttachment("/data/internal/project_incidents_template_minimal.xlsx").xlsx()
```

```js
// needed to correctly initialize the chart
const template_data_env_soc_events = template_data_env_soc_events_workbook.sheet(0, {
  headers: true,
  //range: "A1:11",
  });
//display(template_data_env_soc_events)
```


```js
/// Initialize state_data with IndexedDB or template data
let state_data_env_soc_events = Mutable(await getData_env_soc_events ());

function swap_data_env_soc_events(data) {
  state_data_env_soc_events.value = data;
}

(async function(d) {
    return d === null ? "pending file selection" : state_data_env_soc_events.value = await d.json();
})(local_file_env_soc_events);
```


```js
// removing view here temporarily
const load_template_data_env_soc_events = Inputs.button("Reset Template", {reduce: () => swap_data_env_soc_events(template_data_env_soc_events)})
```


```js
 const report_env_soc_events  = (async () => {
  try {
    const wb =
      await (local_file_env_soc_events.xlsx?.() ?? local_file_env_soc_events);
    return wb.sheet(0, { headers: true });
  } catch (error) {
    console.warn("error with file", error);
    return state_data_env_soc_events;
  }
})();

```



```js
// Optional auto-persist
 await saveData_env_soc_events(report_env_soc_events);
```



```js
display(report_env_soc_events)
```



```js
const local_file_analyst_risk_modifiers = view(Inputs.file({label: "Analyst Modifiers", accept: ".xlsx"}));
//display(local_file_analyst_risk_modifiers_workbook);
```

```js
// IndexedDB Setup
const dbName_analyst_risk_modifiers  = "analyst_risk_modifiers";
const dbVersion_analyst_risk_modifiers  = 1;
const storeName_analyst_risk_modifiers  = "insight_all";
```

```js
// Function to open or create IndexedDB
async function openDB_analyst_risk_modifiers () {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName_analyst_risk_modifiers , dbVersion_analyst_risk_modifiers );
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            db.createObjectStore(storeName_analyst_risk_modifiers , { keyPath: "id" });
        };
        
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}
```

```js
// Function to get data from IndexedDB
async function getData_analyst_risk_modifiers () {
    const db = await openDB_analyst_risk_modifiers();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName_analyst_risk_modifiers , "readonly");
        const store = transaction.objectStore(storeName_analyst_risk_modifiers );
        const request = store.get("state_data_analyst_risk_modifiers");
        
        request.onsuccess = () => resolve(request.result?.data ?? template_data_analyst_risk_modifiers);
        request.onerror = () => reject(request.error);
    });
}
```

```js
// Function to save data to IndexedDB
async function saveData_analyst_risk_modifiers(data) {
    const db = await openDB_analyst_risk_modifiers();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName_analyst_risk_modifiers, "readwrite");
        const store = transaction.objectStore(storeName_analyst_risk_modifiers);
        store.put({ id: "state_data_analyst_risk_modifiers", data });
        
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
    });
}
```


```js
// needed to correctly initialize the chart
const template_data_analyst_risk_modifiers_workbook = FileAttachment("/data/internal/risk_modifiers_template_minimal.xlsx").xlsx()
```

```js
// needed to correctly initialize the chart
const template_data_analyst_risk_modifiers = template_data_analyst_risk_modifiers_workbook.sheet(0, {
  headers: true,
  //range: "A1:11",
  });
//display(template_data_analyst_risk_modifiers)
```


```js
/// Initialize state_data with IndexedDB or template data
let state_data_analyst_risk_modifiers = Mutable(await getData_analyst_risk_modifiers ());

function swap_data_analyst_risk_modifiers(data) {
  state_data_analyst_risk_modifiers.value = data;
}

(async function(d) {
    return d === null ? "pending file selection" : state_data_analyst_risk_modifiers.value = await d.json();
})(local_file_analyst_risk_modifiers);
```


```js
// removing view here temporarily
const load_template_data_analyst_risk_modifiers = Inputs.button("Reset Template", {reduce: () => swap_data_analyst_risk_modifiers(template_data_analyst_risk_modifiers)})
```


```js
 const report_analyst_risk_modifiers  = (async () => {
  try {
    const wb =
      await (local_file_analyst_risk_modifiers.xlsx?.() ?? local_file_analyst_risk_modifiers);
    return wb.sheet(0, { headers: true });
  } catch (error) {
    console.warn("error with file", error);
    return state_data_analyst_risk_modifiers;
  }
})();

```



```js
// Optional auto-persist
 await saveData_analyst_risk_modifiers(report_analyst_risk_modifiers);
```



```js
display(report_analyst_risk_modifiers)
```




```js
const outcomes_survey = report_insight_outcomes_survey

//await FileAttachment("/data/internal/outcomes_survey.csv").csv()
```

```js
const 
trips_with_visits = report_insight_trips_w_visits

//await FileAttachment("/data/internal/trips-w-project-visits_report1754574558556.csv").csv()
```

---

## E&S Risk Score Calculation Methodology

<br/>
Calculating project E&S Risk Scores is accomplished in five steps:

1. Apply environmental category weighting.
2. Generate composite E, S, and G scores
3. Calculate country-adjusted ESG score.
4. Factor context data on qualitative risk and mitigants (sum of positive and negative points).
5. Calculate final risk value [(E&S catgeorization * country-adjusted ESG score ) + net project adjustment].

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
\text{EnvCat} = A, FI-A \\

50 &
\text{if }
\text{EnvCat} = B, FI-B \\

35 &
\text{if }
\text{EnvCat} = C, FI-C \\

15 &
\text{if }
\text{EnvCat} = D \\

\end{cases}
```


```js
// Environmental category weights
const envCategoryWeight = ({ 
  A: 85,
  "FI A/Fund A": 85,
  B: 50,
  "FI B/Fund B": 50,
  C: 35,
  "FI C/Fund C": 35,
  D: 15
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

The Country Risk Index (CRI) is derived from [external global ESG risk indices](/indices/contextual-risk-indices.html) and combined into a single, composite ESG score.

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
//const nd_gain2025_workbook = await FileAttachment("/data/external/nd_gain_countryindex_2025.zip").zip()

//const nd_gain2025 = await nd_gain2025_workbook.file("resources/gain/gain.csv").csv()
const nd_gain2025 = await FileAttachment("/data/external/nd_gain_countryindex_2025/resources/gain/gain.csv").csv()
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
//const globalSlaveryIndex_zip = FileAttachment("/data/external/2023-Global-Slavery-Index-Data-dd6d042a-e404-405a-8956-de68d59a11aa.zip").zip()
```

```js
//const globalSlaveryIndex_workbook = globalSlaveryIndex_zip.file("2023-Global-Slavery-Index-Data.xlsx").xlsx()
const globalSlaveryIndex_workbook = await FileAttachment("/data/external/2023-Global-Slavery-Index-Data/2023-Global-Slavery-Index-Data.xlsx").xlsx()
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


```js
//const wgidataset_excel = FileAttachment("/data/external/wgidataset_with_sourcedata_excel.zip").zip()
```

```js
//const wgidataset_workbook = wgidataset_excel.file("wgidataset_with_sourcedata.xlsx").xlsx()
const wgidataset_workbook = FileAttachment("/data/external/wgidataset_with_sourcedata_excel/wgidataset_with_sourcedata.xlsx").xlsx()
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
display(WGI_2023_cc_dataMap);
display(invert(normalizeWRI(WGI_2023_cc_dataMap)))
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
display(cpi_dataMap)
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

## Step 3. Sector Risk Index (SRI)

EBRD has created sector risk ratings for further contextual nuance.

```js
const EBRD_sector_risk_workbook = await FileAttachment("/data/external/ESMS-ESMS--Policies-and-procedures--categorisation-Annex-1- Rev2.1 FINAL.xlsx").xlsx()
```

```js
const sector_risk = EBRD_sector_risk_workbook.sheet(0, {range: "A2:", headers: true});
display(sector_risk)
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

// --- Header normalization & scoring -----------------------------------------

const normHeader = s =>
  (s ?? "")
    .toString()
    .toLowerCase()
    // unify punctuation/spaces/underscores/“smart” dashes/colons
    .replace(/[\u2013\u2014–—]/g, "-")
    .replace(/[:()]/g, " ")
    .replace(/[_\s]+/g, " ")
    .trim();

/** Score how much a header looks like a NAICS detailed (6-digit) column */
function scoreDetailedHeader(h) {
  const x = normHeader(h);
  let score = 0;
  if (/\bnaics\b/.test(x)) score += 5;
  if (/\bcode\b/.test(x)) score += 3;
  if (/\b6\b|\b6-?digit/.test(x)) score += 3;         // “6”, “6-digit”, “6 digit”
  if (/\bprimary\b/.test(x)) score += 1;
  // penalize obvious sector hints
  if (/\bsector\b/.test(x)) score -= 2;
  return score;
}

/** Score how much a header looks like a NAICS sector (2/3-digit) column */
function scoreSectorHeader(h) {
  const x = normHeader(h);
  let score = 0;
  if (/\bnaics\b/.test(x)) score += 5;
  if (/\bsector\b/.test(x)) score += 4;
  if (/\bcode\b/.test(x)) score += 2;
  // discourage detailed-only hints
  if (/\b6\b|\b6-?digit/.test(x)) score -= 2;
  return score;
}

/** Given a row (or any header object), pick the best keys for detailed/sector. */
function pickNaicsKeys(row) {
  const keys = Object.keys(row ?? {});
  let bestDet = { key: null, score: -Infinity };
  let bestSec = { key: null, score: -Infinity };

  for (const k of keys) {
    const det = scoreDetailedHeader(k);
    if (det > bestDet.score) bestDet = { key: k, score: det };

    const sec = scoreSectorHeader(k);
    if (sec > bestSec.score) bestSec = { key: k, score: sec };
  }

  // If both picks landed on the same key, prefer the one with larger margin
  if (bestDet.key && bestSec.key && bestDet.key === bestSec.key) {
    // Try to find an alternate runner-up for sector
    const alt = keys
      .filter(k => k !== bestDet.key)
      .map(k => ({ key: k, score: scoreSectorHeader(k) }))
      .sort((a,b) => b.score - a.score)[0];
    if (alt && alt.score >= bestSec.score - 1) bestSec = alt;
  }

  return { detailedKey: bestDet.score > 0 ? bestDet.key : null,
           sectorKey:   bestSec.score > 0 ? bestSec.key : null };
}

// Parse a cell into useful NAICS prefixes (supports ranges like "31–33")
function parseNaicsValue(v) {
  const s = (v ?? "").toString().trim();
  if (!s) return [];

  // Ranges like "31-33", "44–45"
  const range = s.match(/\b(\d{2})\s*[-–—]\s*(\d{2})\b/);
  if (range) {
    // Conservatively return the first division in the range
    return [range[1]]; // or return both ends if you want broader matches
  }

  const digits = onlyDigits(s);
  if (!digits) return [];

  // Gather candidates; we'll filter to [2,3,6] widths at the end
  const out = [];
  for (const n of [6,5,4,3,2]) {
    if (digits.length >= n) out.push(digits.slice(0, n));
  }
  const uniq = [...new Set(out)];
  return uniq.filter(x => [2,3,6].includes(x.length));
}


```

```js

// --- Row-level extraction (drop-in replacement for your helpers) --------------

/** More tolerant: tries best headers first, then falls back to any NAICS-like value. */
function normalizeNaicsAny(row) {
  if (!row) return [];

  const { detailedKey, sectorKey } = pickNaicsKeys(row);

  const detailedVals = detailedKey ? parseNaicsValue(row[detailedKey]) : [];
  const sectorVals   = sectorKey   ? parseNaicsValue(row[sectorKey])   : [];

  // If neither header scored, as a last resort scan all NAICS-ish columns/values
  let fallbackVals = [];
  if (!detailedVals.length && !sectorVals.length) {
    for (const [k, v] of Object.entries(row)) {
      if (/\bnaics\b/i.test(k)) {
        fallbackVals.push(...parseNaicsValue(v));
      }
    }
  }

  // Choose the most specific candidate across all we saw
  const candidates = [...detailedVals, ...sectorVals, ...fallbackVals];
  if (!candidates.length) return [];

  // Prefer a 6-digit first, else 3-digit, else 2-digit
  const best =
    candidates.find(c => c.length === 6) ||
    candidates.find(c => c.length === 3) ||
    candidates.find(c => c.length === 2);

  // Return [6,3,2] variants that exist from best
  const out = [];
  if (best.length >= 6) out.push(best.slice(0,6));
  if (best.length >= 3) out.push(best.slice(0,3));
  if (best.length >= 2) out.push(best.slice(0,2));
  return [...new Set(out)];
}

/** Prefer detailed (6→3→2) first, then sector (6→3→2), dedup. */
function naicsVariantsPreferDetailed(row) {
  if (!row) return [];
  const { detailedKey, sectorKey } = pickNaicsKeys(row);

  const prefixes = [];
  const pushPrefixes = (val) => {
    for (const p of parseNaicsValue(val)) {
      // expand a 6-digit to (6,3,2); a 3-digit to (3,2); a 2-digit to (2)
      if (p.length === 6) prefixes.push(p.slice(0,6), p.slice(0,3), p.slice(0,2));
      else if (p.length === 3) prefixes.push(p.slice(0,3), p.slice(0,2));
      else if (p.length === 2) prefixes.push(p.slice(0,2));
    }
  };

  if (detailedKey) pushPrefixes(row[detailedKey]);
  if (sectorKey)   pushPrefixes(row[sectorKey]);

  // last-resort: scan any NAICS-like header if nothing pushed
  if (!prefixes.length) {
    for (const [k, v] of Object.entries(row)) {
      if (/\bnaics\b/i.test(k)) pushPrefixes(v);
    }
  }
  return [...new Set(prefixes)];
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
const portfolio_ESRS_countryAdjusted_with_EBRD_sector_risk = active_projects_ES_risk_numeric_CRI.map(row => {
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

**Step 3 Output: Portfolio data including SRI** 


```js
function normalize_EBRD_sectors(data) {
  const map = { Low: 33.333, Medium: 66.666, High: 99.999 };
  return data.map(d => ({
    ...d,
    EBRD_sector_risk_environment_numeric: map[d.EBRD_sector_risk_environment] || null,
    EBRD_sector_risk_social_numeric: map[d.EBRD_sector_risk_social] || null,
    EBRD_sector_risk_overall_numeric: map[d.EBRD_sector_risk_overall] || null
  }));
};
```

```js
const portfolio_ESRS_countryAdjusted_with_EBRD_sector_risk_normalized = normalize_EBRD_sectors(portfolio_ESRS_countryAdjusted_with_EBRD_sector_risk)
```

```js
display(portfolio_ESRS_countryAdjusted_with_EBRD_sector_risk_normalized)
```


```js
view(Inputs.table(portfolio_ESRS_countryAdjusted_with_EBRD_sector_risk_normalized, {columns: [
  "Project Name",
  "E&S Category Numeric",
  "Country Risk Index, 2025",
  "_naics_used_for_lookup",
  "_nace_matched",
  "_nace_risk_keys_used",
  "EBRD_sector_risk_environment",
  "EBRD_sector_risk_social",
  "EBRD_sector_risk_overall",
  "EBRD_sector_risk_environment_numeric",
  "EBRD_sector_risk_social_numeric",
  "EBRD_sector_risk_overall_numeric",
  "E&S Category Numeric_factor",
  "EBRD_sector_risk_overall_numeric_factor",
  ]}))
```


```js
display((data => {
  const blob = new Blob([d3.csvFormat(data)], { type: "text/csv" });
  return download(blob, 'portfolio_ESRS_countryAdjusted_with_EBRD_sector_risk.csv', 'Download E&S Risk w/ EBRD sector rating');
})(normalize_EBRD_sectors(portfolio_ESRS_countryAdjusted_with_EBRD_sector_risk)));
```




---

## Step 4. CRI-, SRI-Adjusted ESRS

<br/>

This step factors the ESRS against country and sector risks scores as a ternary weighted average.


${tex`ESRS_{adjusted(i)} = EnvCat_i \cdot CRI_i \cdot SRI_i \quad \in [0,1]`}



<!--
This weighted value assigned to each scoring component (_ESRS vs. CRI vs. SRI) can be defined as a variable ${tex` \omega`}.  
-->

<!--
The factored score is thus computed as:

${tex`ESRS_{countryAdjusted(i)} = (1 - \omega) \cdot EnvCat + \omega \cdot C`}

Where ${tex`\omega =`} ${omega}
-->


```js
// removing view
//const omega = view(Inputs.range([0.1,0.9], {step: 0.1, value: 0.3}))
//display(omega)
```


```js
const projection = ({ width, height, angle = 0 }) => {
  const sqrt3_2 = Math.sqrt(3) / 2;
  let scale = 1;
  let tx = 0;
  let ty = 0;
  const ca = Math.cos((angle * Math.PI) / 180);
  const sa = Math.sin((angle * Math.PI) / 180);
  const q = (x, y) => [x + y * 0.5, -y * sqrt3_2];
  const p = (x, y) => {
    [x, y] = q(x, y);
    return [scale * (x * ca + y * sa) + tx, scale * (y * ca - x * sa) + ty];
  };
  const projection = d3.geoTransform({
    point: function (x, y) {
      this.stream.point(...p(x, y));
    },
    sphere: function () {
      this.stream.polygonStart();
      this.stream.lineStart();
      this.stream.point(...p(0, 0));
      this.stream.point(...p(0, 1));
      this.stream.point(...p(1, 0));
      this.stream.point(...p(0, 0));
      this.stream.lineEnd();
      this.stream.polygonEnd();
    }
  });

  // Fit bounds (with angle!)
  const [[x1, y1], [x2, y2]] = d3
    .geoPath(projection)
    .bounds({ type: "Sphere" });
  const w = width / (x2 - x1);
  const h = height / (y2 - y1);
  scale = Math.min(w, h);
  tx = w > scale ? width / 2 - (scale * (x2 + x1)) / 2 : -x1 * scale;
  ty = w < scale ? height / 2 - (scale * (y2 + y1)) / 2 : -y1 * scale;
  return projection;
}
```

```js 
const normalize_channels = ({ a, b, c, ...options } = {}) => {
  if (a == null) throw new Error("missing channel a");
  if (b == null) throw new Error("missing channel b");
  if (c == null) throw new Error("missing channel c");
  const [X, setX] = Plot.column(a); // Using a hides x from the tip!
  const [Y, setY] = Plot.column(b);
  return Plot.transform({ x: X, y: Y, ...options }, (data, facets) => {
    const A = Plot.valueof(data, a);
    const B = Plot.valueof(data, b);
    const C = Plot.valueof(data, c);
    setX(A.map((d, i) => d / (A[i] + B[i] + C[i])));
    setY(B.map((d, i) => d / (A[i] + B[i] + C[i])));
    return { data, facets };
  });
}

```

```js
const graticule = (options) =>
  Plot.link(
    d3.range(0.1, 1, 0.1).flatMap((d) => [
      [d, 0, 0, d],
      [d, 0, d, 1 - d],
      [0, d, 1 - d, d]
    ]),
    {
      x1: "0",
      y1: "1",
      x2: "2",
      y2: "3",
      stroke: "#aaa",
      strokeWidth: 0.5,
      ...options
    }
  )

```

```js
const tickLabels = (
  data = d3.range(0.1, 1, 0.1),
  { tickFormat = ".0%", ...options } = {}
) => {
  const text = d3.format(tickFormat);
  return Plot.marks(
    Plot.text(data, {
      x: (d) => 1 - d,
      y: 0,
      text,
      rotate: 60,
      textAnchor: "start",
      dx: 2,
      dy: 5,
      ...options
    }),
    Plot.text(data, {
      x: 0,
      y: (d) => d,
      text,
      rotate: 0,
      textAnchor: "end",
      dx: -5,
      dy: 0,
      ...options
    }),
    Plot.text(data, {
      x: (d) => d,
      y: (d) => 1 - d,
      text,
      textAnchor: "start",
      rotate: -60,
      dx: 2,
      dy: -5,
      ...options
    })
  );
}
```

```js
const labels = (data, options) =>
  Plot.text(data, {
    x: [1.075, -0.025, -0.025],
    y: [-0.05, 1.05, -0.05],
    text: Plot.identity,
    ...options
  })
```

```js
function slider({
  r = 5,
  fill = "steelblue",
  constrain = true,
  value = [1 / 3, 1 / 3, 1 / 3],
  ...options
} = {}) {
  const n = d3.sum(value);
  for (let i = 0; i < 3; i++) value[i] = (value[i] ?? 0) / n;
  return Plot.dot([value, [1, 0], [0, 1], [0, 0]], {
    r,
    fill,
    pointerEvents: "all",
    ...options, // options to be passed
    filter: [true],
    x: "0",
    y: "1",
    render(index, scales, values, dimensions, context, next) {
      const plot = context.ownerSVGElement;
      const g = next(index, scales, values, dimensions, context);
      d3.select(g).style("cursor", "grab");
      const dot = g.querySelector("circle");
      const path = g.querySelector("path");
      const X = values.x;
      const Y = values.y;
      // barycentric coordinates & denominator
      const D = (X[2] - X[1]) * (Y[3] - Y[1]) - (Y[2] - Y[1]) * (X[3] - X[1]);
      let a = values.channels.x.value[0],
        b = values.channels.y.value[0],
        c = 1 - a - b;
      const z = { a, b, c };

      // value accessors
      function set({ a, b, c }) {
        if (constrain) {
          while (a < 0 || b < 0 || c < 0) {
            if (a < 0) (b += a / 2), (c += a / 2), (a = 0);
            if (b < 0) (a += b / 2), (c += b / 2), (b = 0);
            if (c < 0) (b += c / 2), (a += c / 2), (c = 0);
          }
        }
        const x = a * X[1] + b * X[2] + c * X[3];
        const y = a * Y[1] + b * Y[2] + c * Y[3];
        if (dot) {
          dot.setAttribute("cx", x);
          dot.setAttribute("cy", y);
        } else path.setAttribute("transform", `translate(${x},${y})`);
        Object.assign(z, { a, b, c });
      }
      function get() {
        return z;
      }
      Object.defineProperty(plot, "value", { set, get });
      plot.dispatchEvent(new Event("input"));

      const drag = d3
        .drag()
        .on("start", () => d3.select(g).style("cursor", "grabbing"))
        .on("end", () => d3.select(g).style("cursor", "grab"))
        .on("drag", ({ x, y }) => {
          // project
          c = ((X[2] - X[1]) * (y - Y[1]) - (Y[2] - Y[1]) * (x - X[1])) / D;
          b = ((x - X[1]) * (Y[3] - Y[1]) - (y - Y[1]) * (X[3] - X[1])) / D;
          a = 1 - b - c;
          set({ a, b, c });
          plot.dispatchEvent(new Event("input"));
        });
      d3.select(g).call(drag);
      return g;
    }
  });
};
// Generator of the slider’s values
//const sliderGen = Generators.input(slider);
```


```js
function combo({
  labels = ["E&S Category", "Country Risk", "Sector Risk"],
  value = [1 / 3, 1 / 3],
  step = 0.01
} = {}) {
  const n = d3.sum(value);
  for (let i = 0; i < 3; i++) value[i] = (value[i] ?? 0) / n;
  const a = Inputs.range([0, 1], { label: labels[0], value: value[0], step });
  const b = Inputs.range([0, 1], { label: labels[1], value: value[1], step });
  const c = Inputs.range([0, 1], { label: labels[2], value: value[2], step });
  ternarySync(a, b, c);
  ternarySync(b, a, c);
  ternarySync(c, a, b);
  return Inputs.form({ a, b, c });
}
```

```js
function ternarySync(a, b, c) {
  a.addEventListener("input", (event) => {
    if (!event.isTrusted) return;
    const bc1 = 1 - a.value;
    const bc2 = b.value + c.value;
    if (bc2) {
      b.value = (b.value / bc2) * bc1;
      c.value = (c.value / bc2) * bc1;
    } else {
      b.value = c.value = bc1 / 2;
    }
    b.dispatchEvent(new InputEvent("input"));
    c.dispatchEvent(new InputEvent("input"));
  });
}
```

```js
const ternary = ({
  projection,
  graticule,
  normalize_channels,
  sphere: Plot.sphere,
  tickLabels,
  labels,
  slider,
  combo
})
```
<br/>

```js
const x = view(Inputs.bind(ternary.combo(), plot))
```


```js
// view here is giving me problems...
const plot = Plot.plot({
  width: 350,
  projection: { type: ternary.projection, inset: 25 },
  marks: [
    Plot.sphere(),
    ternary.graticule(),
    ternary.slider({ value: [55, 30, 15] }),
    ternary.labels(["E&S Category", "Country Risk", "Sector Risk"])
  ]
});
display(plot)
```

```js
display(z);
```

```js
// VALUE VIEW (read-only display that stays in sync)
const z = Generators.input(plot);  // <- dynamic {a,b,c}
```


```js
//display(x)
```




```js
//const es_cat_select = view(Inputs.range([0,1], {label: "E&S Category", value: 0.600 ,step: 0.001}));
//const country_select = view(Inputs.range([0,1], {label: "CRI", value: 0.250, step: 0.001}));
//const sector_select = view(Inputs.range([0,1], {label: "SRI", value: 0.150, step: 0.001}));
```

```js
function normalize_selection(a,b,c) {
  const s = a + b + c;
  if (s === 0) return [1/3, 1/3, 1/3]; // fallback
  return [a/s, b/s, c/s];
}
```

```js
//const ES_CRI_SRI_factors_weights = (() => {
//  const [es, country, sector] =
//    normalize_selection(es_cat_select, country_select, sector_select);
//  return { es, country, sector };
//})();
```

<!--
```js
const stacked_bar = Plot.plot({
  height: 50,
  marginLeft: 80,
  x: { domain: [0, 1], label: "Total = 1 →" },
  y: { axis: null },
  color: {
    legend: true,
    domain: ["E&S", "CRI", "SRI"], // ensures stable color ↔ label mapping
    range: d3.schemeBlues[6].slice(3) // selecting darker blues
    //scheme: "blues",               // monochrome blue
    // reverse: true
  },
  marks: [
    Plot.barX(
      Object.entries(ES_CRI_SRI_factors_weights).map(([k, v]) => ({
        label: { es: "E&S", country: "CRI", sector: "SRI" }[k] ?? k,
        value: v
      })),
      Plot.stackX({
        x: "value",
        y: () => "Weights",
        fill: "label",
        stroke: "white",
        strokeWidth: 1
      })
    )
  ]
});
display(stacked_bar)
```
-->


<br/>

**Step 4 Output: Portfolio data including CRI- and SRI-adjusted ESRS** 


```js
//display(ESRS_adjusted_for_CRI_and_SRI[0]["ESRS_adjustment_calculated"])
```

```js
/**
 * data: array of rows (e.g., project_data)
 * w: { es, country, sector } — e.g., ES_CRI_SRI_factors_weights
 */
//function ESRS_adjustment_calc(data, w) {
//  const esW = +w?.es || 0;          // E&S weight
//  const criW = +w?.country || 0;    // CRI weight
//  const sriW = +w?.sector || 0;     // SRI weight

//  return data.map(row => {
//    const esVal  = +row["E&S Category Numeric"] || 0;
//    const criVal = +row["Country Risk Index, 2025"] || 0;
//    const sriVal = +row["EBRD_sector_risk_overall_numeric"] || 0;

//    const score = esW * esVal + criW * criVal + sriW * sriVal;

//    return {
//      ...row,
      // store the weights alongside for transparency
//      "E&S Category Numeric_weight": esW,
//      "Country Risk Index, 2025_weight": criW,
//      "EBRD_sector_risk_overall_numeric_weight": sriW,
//      "ESRS_adjustment_calculated": score
//    };
//  });
//}
function ESRS_adjustment_calc(data, z) {
    const a = +z?.a || 0,
        b = +z?.b || 0,
        c = +z?.c || 0;
    return data.map(row => {
        const e = +row["E&S Category Numeric"] || 0;
        const country = +row["Country Risk Index, 2025"] || 0;
        const sector = +row["EBRD_sector_risk_overall_numeric"] || 0;
        const score = e * a + country * b + sector * c;
        return {
            ...row,
            "E&S Category Numeric_factor": a,
            "Country Risk Index, 2025_factor": b,
            "EBRD_sector_risk_overall_numeric_factor": c,
            "ESRS_adjustment_calculated": score
        };
    });
}

```



```js
//triangle of sadness
const ESRS_adjusted_for_CRI_and_SRI = ESRS_adjustment_calc(portfolio_ESRS_countryAdjusted_with_EBRD_sector_risk_normalized, z);
//const ESRS_adjusted_for_CRI_and_SRI = ESRS_adjustment_calc(portfolio_ESRS_countryAdjusted_with_EBRD_sector_risk_normalized, ES_CRI_SRI_factors_weights);
display(ESRS_adjusted_for_CRI_and_SRI)
```




```js
view(Inputs.table(ESRS_adjusted_for_CRI_and_SRI, {columns: [
  "Project Name",
  //"E&S Category Numeric",
  //"Country Risk Index, 2025",
  //"EBRD_sector_risk_overall",
  //"EBRD_sector_risk_overall_numeric",
  "E&S Category Numeric_factor",
  "Country Risk Index, 2025_factor",
  "EBRD_sector_risk_overall_numeric_factor",
  "ESRS_adjustment_calculated",
  //"Country Risk Index, 2025",
  //"EBRD_sector_risk_overall_numeric_factor",
  //"ESRS_adjustment_calculated",
  ]}))
```


```js
display((data => {
  const blob = new Blob([d3.csvFormat(data)], { type: "text/csv" });
  return download(blob, 'ESRS_adjusted_for_CRI_and_SRI.csv', 'Download Projects with ESRS adjusted for CRI and SRI');
})(ESRS_adjusted_for_CRI_and_SRI));
```


```js
///const ESRS_countryAdjusted = active_projects_ES_risk_numeric_CRI.map(d => ({
///  ...d,
///  "ESRS Country Adjusted": 
///    ((1 - omega) * d["E&S Category Numeric"]) + (omega * d["Country Risk Index, 2025"])
///}));
///display(ESRS_countryAdjusted)
```



```js
///display((data => {
///  const blob = new Blob([d3.csvFormat(data)], { type: "text/csv" });
///  return download(blob, 'ESRS_countryAdjusted.csv', 'Download ESRS - Country Adjusted');
///})(ESRS_countryAdjusted));
```


---


---


<br/>


## Step 5. Red Flags and Risk Mitigants

<br/>
Projects can be annotated with additional contextual risk data to dynamically modify factored scores based on up-to-date intelligence.  Available contextual modifiers and values are:


```js
// Monitored in Last 2 Years
const monitoredLast2Yi_view = Inputs.number({value: -40});
const monitoredLast2Yi = Generators.input(monitoredLast2Yi_view);

// Multiple Lenders
const multipleLendersi_view = Inputs.number({value: -2});
const multipleLendersi = Generators.input(multipleLendersi_view);

// Client Reporting
const clientReportingi_view = Inputs.number({value: -2});
const clientReportingi = Generators.input(clientReportingi_view);

// IESC Reporting
const iescReportingi_view = Inputs.number({value: -2});
const iescReportingi = Generators.input(iescReportingi_view);

// Adequate IESC Supervision
const adequateIESCSupervisioni_view = Inputs.number({value: -5});
const adequateIESCSupervisioni = Generators.input(adequateIESCSupervisioni_view);

// 008 Flag
const redFlagi1_view = Inputs.number({value: 15});
const redFlagi1 = Generators.input(redFlagi1_view);

// Significant E&S Incident
const redFlagi2_view = Inputs.number({value: 15});
const redFlagi2 = Generators.input(redFlagi2_view);

// Close Proximity to Other Projects
const closeProximityi_view = Inputs.number({value: 3});
const closeProximityi = Generators.input(closeProximityi_view);

// Pre-Construction Phase
const constructionPhasei1_view = Inputs.number({value: 2});
const constructionPhasei1 = Generators.input(constructionPhasei1_view);

// Construction Phase
const constructionPhasei2_view = Inputs.number({value: 1});
const constructionPhasei2 = Generators.input(constructionPhasei2_view);

// Significant Community Risk
const significantCommunityRiski_view = Inputs.number({value: 10});
const significantCommunityRiski = Generators.input(significantCommunityRiski_view);

// Significant Labor Risk
const significantLaborRiski_view = Inputs.number({value: 2});
const significantLaborRiski = Generators.input(significantLaborRiski_view);

// Significant Environmental Risk
const significantEnvironmentalRiski_view = Inputs.number({value: 2});
const significantEnvironmentalRiski = Generators.input(significantEnvironmentalRiski_view);

// Strategic Interest
const strategicInteresti_view = Inputs.number({value: 1});
const strategicInteresti = Generators.input(strategicInteresti_view);

// Analyst Adjustment (±5)
const analystAdjustmenti_view = Inputs.number({value: 0, min: -5, max: 5});
const analystAdjustmenti = Generators.input(analystAdjustmenti_view);

```

| Modifier                        | Variable Name                                | Value   |
|---------------------------------|----------------------------------------------|---------|
| Monitored in Last 2 Years       | ${tex`\text{monitoredLast2Y}_i`}             | ${display(Inputs.bind(Inputs.number({value: -40, width: 14}), monitoredLast2Yi_view))}      |
| Multiple Lenders                | ${tex`\text{multipleLenders}_i`}             | ${display(Inputs.bind(Inputs.number({value: -2, width: 14}), multipleLendersi_view))}      |
| Client Reporting                  | ${tex`\text{clientReporting}_i`}               | ${display(Inputs.bind(Inputs.number({value: -2, width: 14}), clientReportingi_view))}      |
| IESC Reporting                  | ${tex`\text{iescReporting}_i`}               | ${display(Inputs.bind(Inputs.number({value: -2, width: 14}), iescReportingi_view))}     |
| Adequate IESC Supervision       | ${tex`\text{adequateIESCSupervision}_i`}               | ${display(Inputs.bind(Inputs.number({value: -5, width: 14}), adequateIESCSupervisioni_view))}      |
| 008 Flag                    | ${tex`\text{redFlag}_i`}                      | ${display(Inputs.bind(Inputs.number({value: 15, width: 14}), redFlagi1_view))}   |
| Significant E&S Incident       | ${tex`\text{redFlag}_i`}                      | ${display(Inputs.bind(Inputs.number({value: 15, width: 14}), redFlagi2_view))}   |
| Close Proximity to Other Projects | ${tex`\text{closeProximity}_i`}              | ${display(Inputs.bind(Inputs.number({value: 3, width: 14}), closeProximityi_view))}      |
| Pre-Construction Phase          | ${tex`\text{constructionPhase}_i`}           | ${display(Inputs.bind(Inputs.number({value: 2, width: 14}), constructionPhasei1_view))}      |
| Construction Phase              | ${tex`\text{constructionPhase}_i`}           | ${display(Inputs.bind(Inputs.number({value: 1, width: 14}), constructionPhasei2_view))}      |
| Significant Community Risk      | ${tex`\text{significantCommunityRisk}_i`}    | ${display(Inputs.bind(Inputs.number({value: 10, width: 14}), significantCommunityRiski_view))}     |
| Significant Labor Risk          | ${tex`\text{significantLaborRisk}_i`}        | ${display(Inputs.bind(Inputs.number({value: 2, width: 14}), significantLaborRiski_view))}      |
| Significant Environmental Risk  | ${tex`\text{significantEnvironmentalRisk}_i`}        | ${display(Inputs.bind(Inputs.number({value: 2, width: 14}), significantEnvironmentalRiski_view))}      |
| Strategic Interest              | ${tex`\text{strategicInterest}_i`}           | ${display(Inputs.bind(Inputs.number({value: 1, width: 14}), strategicInteresti_view))}      |
| Analyst Adjustment              | ${tex`\text{analystAdjustment}_i`}           | ${display(Inputs.bind(Inputs.number({value: 0, width: 14}), analystAdjustmenti_view))}      |


```js
//view(
//  Inputs.table(
//    ESRSfactored.filter(d => d["Project Name"] === "Compagnie des Bauxites de Guinee"),
//    {
//      columns: [
//        "Project Name",
//        "site_visited_in_past_two_years",
//        "final_project_factored_risk_score"]
//    }
//  )
//)
```

<!--
Within first 3 years of disbursement and never monitored = +10
Open accountability case = +10
-->

A project's contextual risk value is calculated as the sum of all applicable modifiers: 

```tex
\begin{aligned}
\mathrm{context}_i
&+ \;\mathrm{monitoredLast2Y}_i \quad {\scriptsize(\in [${monitoredLast2Yi}])} \\
&+ \;\mathrm{multipleLenders}_i \quad {\scriptsize(\in [${multipleLendersi}])} \\
&+ \;\mathrm{clientReporting}_i \quad {\scriptsize(\in [${clientReportingi}])} \\
&+ \;\mathrm{iescReporting}_i \quad {\scriptsize(\in [${iescReportingi}])} \\
&+ \;\mathrm{adequateIESCSupervision}_i \quad {\scriptsize(\in [${adequateIESCSupervisioni}])} \\
&+ \;\mathrm{flag008}_i \quad {\scriptsize(\in [${redFlagi1}])} \\
&+ \;\mathrm{significantIncident}_i \quad {\scriptsize(\in [${redFlagi2}])} \\
&+ \;\mathrm{closeProximity}_i \quad {\scriptsize(\in [${closeProximityi}])} \\
&+ \;\mathrm{preConstructionPhase}_i \quad {\scriptsize(\in [${constructionPhasei1}])} \\
&+ \;\mathrm{constructionPhase}_i \quad {\scriptsize(\in [${constructionPhasei2}])} \\
&+ \;\mathrm{significantCommunityRisk}_i \quad {\scriptsize(\in [${significantCommunityRiski}])} \\
&+ \;\mathrm{significantLaborRisk}_i \quad {\scriptsize(\in [${significantLaborRiski}])} \\
&+ \;\mathrm{significantEnvironmentalRisk}_i \quad {\scriptsize(\in [${significantEnvironmentalRiski}])} \\
&+ \;\mathrm{strategicInterest}_i \quad {\scriptsize(\in [${strategicInteresti}])} \\
&+ \;\mathrm{analystAdjustment}_i \quad {\scriptsize(\in [${analystAdjustmenti}])}
\end{aligned}

```



<br/>


<!--

Context Score: **${context_score === undefined ? "undefined" : context_score}**<br/><em>Note that the score is undefined until a selection is made</em>.
-->
<!--

  - ${tex`\text{redFlag}`} = adverse E&S events as noted in the 008
  - ${tex`\text{exception}`} = exceptional events as noted in the 008
  - ${tex`\text{monitoredLast2Y}`} = identifies where projects have been subject to recent monitoring
  - ${tex`\text{multipleLenders}`} = identifies situations where multiple lenders are contributing
  - ${tex`\text{iescAudit}`}
  - ${tex`\text{analystTag}`}
  - ${tex`\text{unsatifiedObligation}`} = signals unsatisfied institutional obligations
-->
<!--
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
-->

<br/>


Auto-calculate flags where supported data is available:



<br/>

**`Portfolio with DOS/008 Flags`**


This step uses the dataset of project 008 submission (all records):

```js
display(outcomes_survey_by_year)
```


Quickly browse the DOS/008 data by year:

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
//const search_table = view(Inputs.search(outcomes_survey_by_year, {label: "Search 008"} ));
```

```js
//display(search_table)
```



```js
const outcomes_survey_by_year = outcomes_survey
  .filter(d => 
    d["Application: Fiscal Year"] == outcomes_survey_year_select &&
    d["Project Name"]?.trim() !== "" // drop blanks/nulls
  )
  .sort((a, b) => a["Project Name"].localeCompare(b["Project Name"]));
```


```js
// helpers so we don't repeat ourselves
const redOnYes = () => value => {
  const div = document.createElement("div");
  div.textContent = value ?? "";
  if (value === "Yes") {
    div.style.backgroundColor = "#b65436";
    div.style.color = "white";
  } else if (value === "Do not know") {
    div.style.backgroundColor = "#ffd994";
    div.style.color = "black";
  }
  return div;
};

const redOnNo = () => value => {
  const div = document.createElement("div");
  div.textContent = value ?? "";
  if (value === "No") {
    div.style.backgroundColor = "#b65436";
    div.style.color = "white";
  } else if (value === "Do not know") {
    div.style.backgroundColor = "#ffd994";
    div.style.color = "black";
  }
  return div;
};

const communityEngagementFormat = value => {
  const div = document.createElement("div");
  div.textContent = value ?? "";
  if (value === "No") {
    div.style.backgroundColor = "#b65436";
    div.style.color = "white";
  } else if (value === "Yes") {
    div.style.backgroundColor = "green";
    div.style.color = "white";
  } else if (value === "Do not know") {
    div.style.backgroundColor = "#ffd994";
    div.style.color = "black";
  }
  return div;
};

```

```js
//const search_outcomes_survey_by_year = view(Inputs.search(outcomes_survey_by_year))
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
  // ✅ single, merged format object
  format: {
    // Red when "No"
    "Project In Compliance": redOnNo(),

    // Red when "Yes"
    "Changes To Workforce": redOnYes(),
    "Project Worker Layoffs": redOnYes(),
    "Accidents Occurred": redOnYes(),
    "Strikes Or Labor Disputes": redOnYes(),
    "Disputes With Trade Union": redOnYes(),
    "Project Involve Land Acquisition": redOnYes(),
    "Community Strike Or Opposition": redOnYes(),
    "Gender-Based Violence": redOnYes(),
    "Project Cited Or Fined": redOnYes(),
    "Project Involved In Dispute Resolution": redOnYes(),

    // Special rules: Yes = green, No = red, Unknown = yellow
    "Project Engaged With Communities": communityEngagementFormat
  }
}))
```





<br/>

We encode 008 values into the portfolio dataset&mdash;differentiating entries by year and identifying years where adverse events were reported: 

```js
display(projects_with_ES_outcomes_yearly)
```


```js
display((data => {
  const blob = new Blob([d3.csvFormat(data)], { type: "text/csv" });
  return download(blob, 'projects_with_ES_outcomes.csv', 'Download Projects with E&S Outcomes');
})(projects_with_ES_outcomes_yearly));
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

<!--- --->


```js
function writeOutcomesES(ESRS_adjusted_for_CRI_and_SRI, outcomes_survey) {
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
  return ESRS_adjusted_for_CRI_and_SRI.map(project => {
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
const projects_with_ES_outcomes = writeOutcomesES(ESRS_adjusted_for_CRI_and_SRI, outcomes_survey);
```




```js
// --- config matching your table's red logic ---
const YES_IS_ADVERSE = new Set([
  "Changes To Workforce",
  "Project Worker Layoffs",
  "Accidents Occurred",
  "Strikes Or Labor Disputes",
  "Disputes With Trade Union",
  "Project Involve Land Acquisition",
  "Community Strike Or Opposition",
  "Gender-Based Violence",
  "Project Cited Or Fined",
  "Project Involved In Dispute Resolution"
]);
```

```js
const NO_IS_ADVERSE = new Set([
  "Project In Compliance",
  "Project Engaged With Communities"
]);
```

```js
const NUMERIC_GT0_IS_ADVERSE = new Set([
  "# Households Economically Displaced",
  "# Households Physically Displaced",
  "# Of Workers Laid Off",
  "# Workers Laid Off"
]);
```

```js
// --- HELPERS ---
const YEAR_RE = /,\s*(\d{4})$/;
```

```js
const normalizeYesNo = v => {
  if (v == null) return null;
  const s = String(v).trim().toLowerCase();
  if (["yes","y","true","1"].includes(s)) return true;
  if (["no","n","false","0"].includes(s)) return false;
  if (s === "do not know" || s === "unknown" || s === "n/a" || s === "") return "unknown";
  return s; // leave anything else untouched
};
```

```js
const toNumber = v => {
  if (v == null) return 0;
  const s = String(v).replace(/[, ]+/g, "").trim();
  const n = Number(s);
  return Number.isFinite(n) ? n : 0;
};
```

```js
// Derive the list of years that actually have at least one adverse indicator column
function getRelevantYears(data) {
  const years = new Set();
  const adverseBases = new Set([
    ...YES_IS_ADVERSE,
    ...NO_IS_ADVERSE,
    ...NUMERIC_GT0_IS_ADVERSE
  ]);
  // Look across some (or all) rows' keys
  const keys = new Set(data.flatMap(d => Object.keys(d)));
  for (const k of keys) {
    const m = k.match(YEAR_RE);
    if (!m) continue;
    const base = k.replace(YEAR_RE, ""); // drop ", YYYY"
    if (adverseBases.has(base)) years.add(m[1]);
  }
  return Array.from(years).sort(); // e.g. ["2022","2023"]
}
```

```js
// --- MAIN: annotate per-year adverse impact on each row ---
function annotateAdverseImpactsByYear(rows) {
  const years = getRelevantYears(rows);
  return rows.map(row => {
    const out = { ...row };
    for (const y of years) {
      const reasons = [];

      // Yes => adverse
      for (const base of YES_IS_ADVERSE) {
        const key = `${base}, ${y}`;
        if (key in row && normalizeYesNo(row[key]) === true) reasons.push(base);
      }

      // No => adverse
      for (const base of NO_IS_ADVERSE) {
        const key = `${base}, ${y}`;
        if (key in row && normalizeYesNo(row[key]) === false) reasons.push(base);
      }

      // Numeric > 0 => adverse
      for (const base of NUMERIC_GT0_IS_ADVERSE) {
        const key = `${base}, ${y}`;
        if (key in row && toNumber(row[key]) > 0) reasons.push(base);
      }
      
      out[`adverse_impact_${y}`] = reasons.length > 0;
      out[`adverse_reasons_${y}`] = reasons;
    }
    return out;
  });
}
```

```js
const projects_with_ES_outcomes_yearly = annotateAdverseImpactsByYear(projects_with_ES_outcomes);
```



<!---   --->


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
const filtered_projects_with_ES_outcomes = projects_with_ES_outcomes_yearly.filter(d =>
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

<!--
For convenience, we can isolate only those project with adverse E&S records:
-->

```js
const projects_with_ES_outcomes_flagged = flag008(projects_with_ES_outcomes_yearly);
//display(projects_with_ES_outcomes_flagged)
```

```js
//display(projects_with_ES_outcomes_flagged.filter(d => d["008 flag"] === true))
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


**`Portfolio Monitored in Past 2 Years`**

<!--
_Trips with Visits_

```js
const flagged008_with_trips = reconcileVisitsByFY(projects_with_ES_outcomes_flagged, trips_with_visits);
//display(flagged008_with_trips)
```

```js
view(Inputs.table(flagged008_with_trips, {columns: [
  "Project Name",
  "E&S Category Numeric",
  "Country Risk Index, 2025",
  "_naics_used_for_lookup",
  "_nace_matched",
  "_nace_risk_keys_used",
  "EBRD_sector_risk_environment",
  "EBRD_sector_risk_social",
  "EBRD_sector_risk_overall",
  "EBRD_sector_risk_environment_numeric",
  "EBRD_sector_risk_social_numeric",
  "EBRD_sector_risk_overall_numeric",
  "E&S Category Numeric_factor",
  "EBRD_sector_risk_overall_numeric_factor",
  "ESRS_adjustment_calculated",
  "008 flag",
  "Visited",
  "Years Visited"
  ]}))
```
-->


```js
// Minimal-call API:
//   result = flattenVisitsByFY(projects, trips_with_visits)
//
// Adds year-suffixed columns for all present fields below, plus Visited / Years Visited.
function reconcileVisitsByFY(projects, trips, opts = {}) {
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

```js
// --- Configuration -----------------------------------------------------------
const DELIM = " | "; // delimiter used when multiple distinct values occur in a project-year

//Exact column labels to carry over (Monitoring Activities)
const MONITORING_FIELDS = [
  "Monitoring Activity: Monitoring Activity Number",
  "Monitoring Activity: ID",
  "Comments",
  "Contact",
  "Completed?",
  "Country",
  "Department",
  "Development Summary",
  "DO",
  "ECON Report Completed",
  "ECON",
  "ENV",
  "ENV Report Completed",
  "ENV Summary",
  "Fiscal Year",
  "Follow Up",
  "If Other Activity type, describe here",
  "Monitoring Activity Date",
  "Maturity Date",
  "Monitoring Activity Type",
  "Officer Conducting Activity",
  "Project ID",
  "Site Visit Start Date",
  "Site Visit Status",
  "SOC",
  "SOC Report Completed",
  "SOC Summary",
  "US Economic Impact Summary",
  "Visit Number",
  "Visit Reason",
  "Monitoring Activity: Record Type",
  "Monitoring Activity: Owner Name",
  "Monitoring Activity: Owner Alias",
  "Monitoring Activity: Owner Role",
  "Monitoring Activity: Created By",
  "Monitoring Activity: Created Alias",
  "Monitoring Activity: Created Date",
  "Monitoring Activity: Last Modified By",
  "Monitoring Activity: Last Modified Alias",
  "Monitoring Activity: Last Modified Date"
];

// Exact column labels to carry over (Trips with Visits)
const TRIP_FIELDS = [
  "Trip: Name",
  "Project Visit: Visit Number",
  "Trip: ID",
  "Old Trip ID",
  "Start Date",
  "End Date",
  "Trip Countries",
  "Trip Officials",
  "Project Visit: ID",
  "Old Visit ID",
  "Visit Fiscal Year",
  "Project Visit Status",
  "Visit Reason",
  "Visit Reason (Other)",
  "Project Visit: Record Type",
  "Project Name: Project Owner: Division",
  "Project Name: Eligible Evaluation/Site Visit Year",
  "Project Name: Has been visited before?",
  "Comments",
  "Completed?",
  "Country",
  "Department",
  "Development Summary",
  "DFPM",
  "DO",
  "ECON",
  "ECON Report Completed",
  "ENV",
  "ENV Report Completed",
  "ENV Summary",
  "Follow Up",
  "Insurance",
  "Monitoring Activity",
  "MTU(ODC)",
  "Officer",
  "OIF(IFD)",
  "PMD",
  "Registration Number",
  "SOC",
  "SOC Report Completed",
  "SOC Summary",
  "Tech Dev Program",
  "Trip End Date",
  "Trip Start Date",
  "Trip Team Lead",
  "Trip: Created Date"
];


// Preferred join keys and date columns
//const JOIN_KEY_PROJECTS = "Project Name";
//const JOIN_KEY_MONITORING = "Project Name: Project Name";


// Preferred join keys
 // instead of "Project Name"
const JOIN_KEY_PROJECTS = [
  "Project Number",            // numeric where present
  "Project Name: Project Number", // DCA where present
  "Project ID",
];

// Monitoring/trips files may expose the project number under several label styles
const JOIN_KEY_MONITORING = [
  "Project Number",
  "Project Name: Project Number",
  "Project: Project Number",
  "Project ID",
  "Project Name: Project ID"
];


const TRIP_DATE_CANDS = [
  "Trip Start Date", "Trip Start Date:", "Start Date", "Start Date:",
  "Start Date.1", "End Date", "End Date:", "End Date.1", "Trip End Date", "Trip End Date:", "Trip: Created Date", "Trip: Created Date:"
];

const TRIP_FISCAL_YEAR_CANDS = ["Visit Fiscal Year", "Visit Fiscal Year:"];

const TRIP_ID_COLS = ["Project Visit: ID:", "Trip: ID:", "Old Visit ID:", "Old Trip ID:"];

const MON_DATE_CANDS = [
  "Monitoring Activity Date", "Monitoring Activity Date:",
  "Site Visit Start Date", "Site Visit Start Date:",
  "Monitoring Activity: Created Date", "Monitoring Activity: Created Date:"
];

const MON_FISCAL_YEAR_CANDS = ["Fiscal Year", "Fiscal Year:"];


const MON_ID_COLS = ["Monitoring Activity: ID", "Monitoring Activity: ID:"];

```



```js

// --- Helpers -----------------------------------------------------------------

function normName(s) {
  return (s ?? "").toString().replace(/\s+/g, " ").trim();
}

// Strip a single trailing ":" for output property names
function outLabel(field) {
  return field.replace(/:\s*$/, "");
}


// Accept "X" or "X:" labels interchangeably
function keyVariants(k) { return k.endsWith(":") ? [k, k.slice(0, -1)] : [k, `${k}:`]; }



// Try multiple candidate keys, tolerant of ":" variants, return normalized string
function firstPresentJoinValue(row, candidates) {
  for (const c of candidates) {
    for (const v of keyVariants(c)) {
      if (v in row && row[v] != null && String(row[v]).trim() !== "") {
        // IMPORTANT: project number can be numeric -> force string + normalize
        return normName(String(row[v]));
      }
    }
  }
  return null;
}

// Backwards-compatible: allow joinKey to be string or array of strings
function resolveJoinValue(row, joinKey) {
  const normalize = (v) => {
    // collapse spaces & NBSP
    let s = String(v ?? "").replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();

    // If the value looks numeric-ish (IDs), normalize to a pure digit string:
    //  - strips commas, spaces
    //  - converts scientific notation and trims trailing `.0`
    //  - keeps non-numeric keys (like "675-2016-239-IG") as-is
    const looksNumeric = /^[\d\s,.\-+eE]+$/.test(s);
    if (looksNumeric && /\d/.test(s)) {
      // Try to parse and re-render without decimals or exponent
      const n = Number(s.replace(/[, ]+/g, ""));
      if (Number.isFinite(n)) return String(Math.trunc(n));
      // Fallback: just strip everything that's not a digit
      const digits = s.replace(/\D+/g, "");
      if (digits) return digits.replace(/^0+/, "") || "0";
    }
    return s; // non-numeric ID formats (e.g., "675-2016-239-IG") pass through unchanged
  };

  const cands = Array.isArray(joinKey) ? joinKey : [joinKey];
  for (const c of cands) {
    for (const v of (c.endsWith(":") ? [c, c.slice(0, -1)] : [c, `${c}:`])) {
      if (v in row && row[v] != null && String(row[v]).trim() !== "") {
        return normalize(row[v]);
      }
    }
  }
  return null;
}



// Find the first present key from candidates; also try with/without trailing colon.
function firstPresentValue(row, candidates) {
  for (const c of candidates) {
    if (c in row && row[c] != null && String(row[c]).trim() !== "") return row[c];
    const alt = c.endsWith(":") ? c.slice(0, -1) : `${c}:`;
    if (alt in row && row[alt] != null && String(row[alt]).trim() !== "") return row[alt];
  }
  return null;
}



// Robust year parsing:
//  - if number-like "2024" → 2024
//  - if date-like, use Date and extract year
//  - ignore anything outside [1990..2100]
function parseYearSmart(v) {
  if (v == null) return null;
  const s = String(v).trim();
  const yNum = Number(s);
  if (Number.isFinite(yNum) && yNum >= 1990 && yNum <= 2100 && /^\d{4}$/.test(s)) return yNum;

  const m = s.match(/\b(19\d{2}|20\d{2}|2100)\b/);
  if (m) return Number(m[1]);

  const d = new Date(s);
  if (!Number.isNaN(d.getTime())) {
    const y = d.getFullYear();
    if (y >= 1990 && y <= 2100) return y;
  }
  return null;
}

function pickEventYear(row, dateCandidates, fiscalYearCandidates) {
  const dateVal = firstPresentValue(row, dateCandidates);
  const y1 = parseYearSmart(dateVal);
  if (y1) return y1;
  const fyVal = firstPresentValue(row, fiscalYearCandidates);
  const y2 = parseYearSmart(fyVal);
  return y2;
}

function firstPresentKey(obj, keys) {
  return keys.find((k) => k in obj && obj[k] != null && String(obj[k]).trim() !== "");
}

function dedupeById(rows, idColumns, joinKeyCandidates = null) {
  const seen = new Set();
  const out = [];
  for (const r of rows) {
    const idKey = firstPresentKey(r, idColumns);
    const idVal = idKey ? String(r[idKey]).trim() : "";
    const projKeyVal = joinKeyCandidates ? (resolveJoinValue(r, joinKeyCandidates) || "") : "";
    const sig = idVal ? `${projKeyVal}::${idKey}:${idVal}` : `${projKeyVal}::${JSON.stringify(r)}`;
    if (!seen.has(sig)) { seen.add(sig); out.push(r); }
  }
  return out;
}



// Accumulate distinct values per (project, year, field) and counts per (project, year)
function accumulate(rows, { joinKey, dateCands, fyCands, fields, idCols }) {
  const deduped = dedupeById(rows, idCols, Array.isArray(joinKey) ? joinKey : [joinKey]);

  const values = new Map();
  const counts = new Map();

  for (const row of deduped) {
    const pkey = resolveJoinValue(row, joinKey);
    if (!pkey) continue;

    const year = pickEventYear(row, dateCands, fyCands);
    if (!year) continue;

    const ck = `${pkey}::${year}`;
    counts.set(ck, (counts.get(ck) ?? 0) + 1);

    for (const field of fields) {
      const val = firstPresentValue(row, [field]);
      if (val == null || String(val).trim() === "") continue;
      const mapKey = `${pkey}::${year}::${field}`;
      if (!values.has(mapKey)) values.set(mapKey, new Set());
      values.get(mapKey).add(String(val).trim());
    }
  }
  return { values, counts };
}

function applyToProjectRow(prow, pname, bucket, counts, fields, prefix) {
  const out = { ...prow };
  const years = Array.from(counts.keys())
    .filter((k) => k.startsWith(`${pname}::`))
    .map((k) => Number(k.split("::")[1]))
    .filter((y) => Number.isFinite(y) && y >= 1990 && y <= 2100)
    .sort((a, b) => a - b);

  for (const y of years) {
    const count = counts.get(`${pname}::${y}`) ?? 0;
    if (count > 0) out[`${prefix}_count_${y}`] = count;

    for (const field of fields) {
      const key = `${pname}::${y}::${field}`;
      if (!bucket.has(key)) continue;
      const vals = Array.from(bucket.get(key).values()).sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));
      if (!vals.length) continue;
      out[`${outLabel(field)}_${y}`] = vals.join(DELIM);
    }
  }
  return out;
}


/*******************************
 * STRICTER PREDICATES (fix “everything true”)
 *******************************/
const PROBE_BASES = [
  "Trip Start Date", "Trip End Date", "Project Visit: ID",
  "Monitoring Activity Date", "Site Visit Start Date", "Monitoring Activity: ID"
];

// Reusable predicate: does this row have ANY monitoring or trip activity in `year`?
function hasEventForYear(row, year) {
  const t = Number(row?.[`trip_count_${year}`] ?? 0);
  const m = Number(row?.[`monitoring_count_${year}`] ?? 0);
  if (t > 0 || m > 0) return true;

  // Require that enrichment actually ran (counts present for any year)
  const joined = Object.keys(row).some(
    k => k.startsWith("trip_count_") || k.startsWith("monitoring_count_")
  );
  if (!joined) return false;

  // Only probe known enrichment fields (avoid unrelated *_YYYY columns)
  return PROBE_BASES.some(base => {
    const key = `${base}_${year}`;
    const v = row[key];
    return v != null && String(v).trim() !== "";
  });
}

function hadEventInYears(out, years) {
  for (const y of years) if (hasEventForYear(out, y)) return true;
  return false;
}

/*******************************
 * MAIN: STRICT ENRICH
 *******************************/
function reconcileProjectsFlatStrict(projects, trips_with_visits, monitoring_activities) {
  // Accumulate trips and monitoring ONCE (keyed by whatever joinKey resolves to per row)
  const tripsAcc = accumulate(trips_with_visits, {
    joinKey: JOIN_KEY_MONITORING,
    dateCands: TRIP_DATE_CANDS,
    fyCands: TRIP_FISCAL_YEAR_CANDS,
    fields: TRIP_FIELDS,
    idCols: TRIP_ID_COLS
  });

  const monAcc = accumulate(monitoring_activities, {
    joinKey: JOIN_KEY_MONITORING,
    dateCands: MON_DATE_CANDS,
    fyCands: MON_FISCAL_YEAR_CANDS,
    fields: MONITORING_FIELDS,
    idCols: MON_ID_COLS
  });

  // Enrich original projects (1:1 row count preserved)
  const enriched = projects.map((prow) => {
    const projKey = resolveJoinValue(prow, JOIN_KEY_PROJECTS); // ← now tries Project ID first
    let out = { ...prow };

    if (projKey) {
      out = applyToProjectRow(out, projKey, tripsAcc.values, tripsAcc.counts, TRIP_FIELDS, "trip");
      out = applyToProjectRow(out, projKey,  monAcc.values,  monAcc.counts,  MONITORING_FIELDS, "monitoring");
    }

    const nowYear = new Date().getFullYear();
    out.site_visited_in_past_two_years = hasEventForYear(out, nowYear) || hasEventForYear(out, nowYear - 1);
    return out;
  });

  return enriched;
}


/*******************************
 * VISITS-BY-FY (with FY fallback from dates)
 *******************************/
// Minimal-call API:
//   result = reconcileVisitsByFY(projects, trips_with_visits)
//
// Adds year-suffixed columns for all present fields below, plus Visited / Years Visited.
function reconcileVisitsByFY(projects, trips, opts = {}) {
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

  // --- helpers specific to this function ---
  const nbsp = /\u00a0/g;
  const collapseSpaces = s => String(s ?? "").replace(nbsp, " ").replace(/\s+/g, " ").trim();
  const normCol = s => collapseSpaces(s).replace(/\s*:\s*/g, ": ");
  const get = (obj, key) => obj?.[key] ?? obj?.[normCol(key)] ?? "";
  const parseFY = v => (String(v ?? "").match(/(\d{4})/) || [,""])[1] || null;
  const parseDateTS = v => { const t = Date.parse(String(v ?? "")); return Number.isFinite(t) ? t : Number.POSITIVE_INFINITY; };
  const dedupJoin = arr => {
    const out = [], seen = new Set();
    for (const v of arr.map(x => String(x ?? "").trim()).filter(Boolean)) {
      if (!seen.has(v)) { seen.add(v); out.push(v); }
    }
    return out.join(" | ");
  };
  const normObjKeys = o => Object.fromEntries(Object.entries(o).map(([k,v]) => [normCol(k), v]));

  // Normalize rows
  const projRows = projects.map(normObjKeys);
  const tripRows = trips.map(normObjKeys);

  // --- auto-detect keys ---
  const projKey = normCol(cfg.projectKey);
  const tripKeys = Object.keys(tripRows[0] || {});

  let tripProjectKey =
    tripKeys.find(k => k === " Project Name:  Project Name") ||
    tripKeys.find(k => k.toLowerCase().endsWith("project name")) ||
    tripKeys.find(k => k.toLowerCase() === "project name: project name") ||
    tripKeys.find(k => k.toLowerCase() === "project name");
  if (!tripProjectKey) throw new Error("Could not auto-detect trips project-name column.");

  // Fiscal year column (allow fallback from date)
  let fyKey = tripKeys.find(k => k === cfg.fiscalYearKey) ||
              tripKeys.find(k => k.toLowerCase().replace(/\s+/g,"") === cfg.fiscalYearKey.toLowerCase().replace(/\s+/g,""));

  // usable date column for FY synthesis if needed
  const dateKey = TRIP_DATE_CANDS.find(k => tripKeys.includes(k));
  if (!fyKey && !dateKey) throw new Error("Trips file has neither 'Visit Fiscal Year' nor a usable date.");

  // Only keep fields that actually exist
  const fieldsToFlatten = cfg.fieldsToFlatten.filter(f =>
    Object.prototype.hasOwnProperty.call(tripRows[0] || {}, f) ||
    Object.prototype.hasOwnProperty.call(tripRows[0] || {}, normCol(f))
  );

  // Prepare trips
  const preppedTrips = tripRows
    .map(row => {
      const projName = collapseSpaces(get(row, tripProjectKey));
      // if FY present use it, else synthesize from date
      let fy = fyKey ? parseFY(get(row, fyKey)) : null;
      if (!fy && dateKey) {
        const y = parseYearSmart(get(row, dateKey));
        fy = y ? String(y) : null;
      }
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
    const projName = collapseSpaces(p[projKey] ?? p[normCol(projKey)] ?? "");
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

/*******************************
 * DIAGNOSTICS (optional but handy)
 *******************************/
function printJoinDiagnostics(projects, trips_with_visits, monitoring_activities) {
  const tripsAcc = accumulate(trips_with_visits, {
    joinKey: JOIN_KEY_MONITORING,
    dateCands: TRIP_DATE_CANDS,
    fyCands: TRIP_FISCAL_YEAR_CANDS,
    fields: TRIP_FIELDS,
    idCols: TRIP_ID_COLS
  });
  const monAcc = accumulate(monitoring_activities, {
    joinKey: JOIN_KEY_MONITORING,
    dateCands: MON_DATE_CANDS,
    fyCands: MON_FISCAL_YEAR_CANDS,
    fields: MONITORING_FIELDS,
    idCols: MON_ID_COLS
  });

  const keysTrips = new Set([...tripsAcc.counts.keys()].map(k => k.split("::")[0]));
  const keysMon   = new Set([...monAcc.counts.keys()].map(k => k.split("::")[0]));
  let matchedTrips = 0, matchedMon = 0;

  for (const prow of projects) {
    const k = resolveJoinValue(prow, JOIN_KEY_PROJECTS);
    if (k && keysTrips.has(k)) matchedTrips++;
    if (k && keysMon.has(k))   matchedMon++;
  }
  console.log("JOIN DIAGNOSTICS:", {
    projects: projects.length,
    matchedTrips,
    matchedMon
  });
}
```

Referning both the 'Project Visits' and 'Monitoring Activities' reports, we encode data with historical site visit information:


```js
const enriched_projects = reconcileProjectsFlatStrict(projects_with_ES_outcomes_yearly, report_insight_trips_w_visits , report_insight_trips_w_monitoring_records);
display(enriched_projects)
```


```js
display((data => {
  const blob = new Blob([d3.csvFormat(data)], { type: "text/csv" });
  return download(blob, 'enriched_project.csv', 'Download Project Enriched with Site Visit Data');
})(enriched_projects));
```

<br/>

Projects monitored in the past 2 years:

```js
display(enriched_projects.filter(d => d.site_visited_in_past_two_years === true ))
```

```js
view(Inputs.table(
  enriched_projects.filter(d => d.site_visited_in_past_two_years === true ),
))
```



---


**`Significant E&S Incidents Reported`**

This step uses the E&S events log:

```js
display(report_env_soc_events)
```

A flag is identified where incidents are reported during a given quarter and fiscal year, and event records are encoded into the enriched portfolio dataset:

```js
// * Merge incidents into projects (FY starts in October) and emit event records.
// * - incidents: array of rows from "ODP Project Incidents Tracker.xlsx"
// * - projects: array of rows from enriched portfolio dataset (CSV/JSON)
// * - opts: { fiscalStartMonth: 10 } (default Oct)
// *
// * Returns { updatedProjects, events }
// */
// * Output:
// *   - updatedProjects: the same array, mutated with new flat columns:
// *       * "Incident Received Q1 2025" ... => "true"/"false"
// *       * "Incident Received 2025" ...    => "true"/"false"
// *       * For each incident carried over, per quarter, enumerated:
// *           "<Field> Q1 2025 E1", "<Field> Q1 2025 E2",
```

```js
function encodeIncidentsIntoProjectsFlat(incidents, projects, opts = {}) {
  const fiscalStartMonth = opts.fiscalStartMonth ?? 10; // Oct = 10

  // ---- helpers ----
  const norm = (v) => (v ?? "").toString().trim().toLowerCase();

  const parseDate = (v) => {
    if (!v) return null;
    if (v instanceof Date) return v;
    if (typeof v === "number") {
      // Excel serial (1900 system)
      const excelEpoch = new Date(Date.UTC(1899, 11, 30));
      return new Date(excelEpoch.getTime() + v * 86400000);
    }
    const d = new Date(v);
    return isNaN(d) ? null : d;
  };

  const fiscalInfo = (date, startMonth = 10) => {
    const d = date instanceof Date ? date : parseDate(date);
    if (!d) return null;
    const m = d.getUTCMonth() + 1; // 1..12
    const y = d.getUTCFullYear();
    const fy = m >= startMonth ? y + 1 : y;
    const shifted = ((m - startMonth + 12) % 12); // 0..11
    const q = Math.floor(shifted / 3) + 1;        // 1..4
    return { fy, q, label: `Q${q} ${fy}` };
  };

  // base keys and join fields
  const PN = "Project Number";
  const PN_ALT = "ProjectNumber";
  const PNAME = "Project Name";
  const PNAME_ALT = "ProjectName";

  // The *only* incident fields to carry over (we’ll suffix with ` ${quarterLabel} E#`)
  const carryFields = [
    "Date Received",
    "Incident Date",
    "Q1 2024", // keep literal if this exists in your source; otherwise remove
    "Type of Incident",
    "Significant Incident?",
    "Incident Description",
    "Non-fatal injuries",
    "Fatalities",
    "Total casualties",
    "Related to lack of adherence of DFC contractual commitments?",
    "Files Link",
    "Root Cause Analysis Received?",
    "Root Cause Due Date",
    "Monitoring Officer 1",
    "Monitoring Officer 2",
  ].filter(Boolean);

  // ---- build join lookups ----
  const byPN = new Map();
  const byName = new Map();
  for (const p of projects) {
    const pn = p[PN] ?? p[PN_ALT];
    const nm = p[PNAME] ?? p[PNAME_ALT];
    if (pn) byPN.set(norm(pn), p);
    if (nm) byName.set(norm(nm), p);
  }

  // Track enumeration per project per quarter: E1, E2, ...
  // Using WeakMap so we don't add any helper properties onto the rows.
  const enumCounter = new WeakMap(); // projectRow -> Map(quarterLabel -> count)
  const getNextEnum = (project, quarterLabel) => {
    if (!enumCounter.has(project)) enumCounter.set(project, new Map());
    const m = enumCounter.get(project);
    const n = (m.get(quarterLabel) ?? 0) + 1;
    m.set(quarterLabel, n);
    return n; // 1-based
  };

  // Track which flags exist globally, so we can backfill missing ones as "false"
  const allQuarterFlags = new Set(); // e.g., "Incident Received Q1 2025"
  const allYearFlags = new Set();    // e.g., "Incident Received 2025"

  // ---- ingest incidents ----
  for (const row of incidents) {
    // classify by the ODP tracker "Date Received"
    const dateReceived = parseDate(row["Date Received"]);
    const fi = fiscalInfo(dateReceived, fiscalStartMonth);
    if (!fi) continue;
    const quarterLabel = fi.label;       // "Q1 2025"
    const yearLabel = String(fi.fy);     // "2025"

    // find the project
    const pnVal = row[PN] ?? row[PN_ALT];
    const nmVal = row[PNAME] ?? row[PNAME_ALT];
    let project =
      (pnVal && byPN.get(norm(pnVal))) ||
      (nmVal && byName.get(norm(nmVal)));

    if (!project) {
      // Create a placeholder project if we can’t match — comment out if undesired.
      project = { [PN]: pnVal ?? "", [PNAME]: nmVal ?? "" };
      projects.push(project);
      if (pnVal) byPN.set(norm(pnVal), project);
      if (nmVal) byName.set(norm(nmVal), project);
    }

    // set flags
    const qFlag = `Incident Received ${quarterLabel}`;
    const yFlag = `Incident Received ${yearLabel}`;
    project[qFlag] = "true";
    project[yFlag] = "true";
    allQuarterFlags.add(qFlag);
    allYearFlags.add(yFlag);

    // enumerate this incident for this project's quarter
    const eNum = getNextEnum(project, quarterLabel); // 1,2,3...
    const eTag = `E${eNum}`;

    // copy selected fields with suffix " <Quarter> <E#>"
    for (const base of carryFields) {
      const key = `${base} ${quarterLabel} ${eTag}`;
      project[key] = row[base] ?? "";
    }

    // Always also copy the anchor "Date Received" in its quartered form (if not already in carryFields)
    if (!carryFields.includes("Date Received")) {
      const k = `Date Received ${quarterLabel} ${eTag}`;
      project[k] = dateReceived ? dateReceived.toISOString().slice(0, 10) : "";
    }
  }

  // ---- backfill missing flags as "false" so table is rectangular ----
  if (allQuarterFlags.size || allYearFlags.size) {
    for (const p of projects) {
      for (const f of allQuarterFlags) if (p[f] == null) p[f] = "false";
      for (const f of allYearFlags)   if (p[f] == null) p[f] = "false";
    }
  }

  return projects;
}
```

```js
const enriched_projects_with_incidents = encodeIncidentsIntoProjectsFlat(report_env_soc_events, enriched_projects, { fiscalStartMonth: 10 });
display(enriched_projects_with_incidents)
```


```js
/* ---------------------------
   Example usage (Observable):
------------------------------
import { mergeIncidentsIntoProjects } from "./merge-incidents.js";

const incidents = await d3.csv("ODP Project Incidents Tracker.csv"); // or xlsx -> array of objects
const projects  = await d3.csv("enriched_project.csv");

const { updatedProjects, events } =
  mergeIncidentsIntoProjects(incidents, projects, { fiscalStartMonth: 10 });

// Write back or inspect:
view(Inputs.table(updatedProjects));
view(Inputs.table(events));
*/
```



```js
display((data => {
  const blob = new Blob([d3.csvFormat(data)], { type: "text/csv" });
  return download(blob, 'enriched_projects_with_incidents_annotated.csv', 'Download Projects Annotated for Events');
})(enriched_projects_with_incidents))
```

---


Where values are not pre-computed:

<br/>

**`Manually-Defined Risk Modifiers`**

This step incorporates per-project risk modifiers supplied by analysts:

```js
display(report_analyst_risk_modifiers)
```

Summary risk modifiers are encoded back into the portfolio dataset:

```js
const applyAnalystRiskModifiers = (() => {
  if (!Array.isArray(report_analyst_risk_modifiers)) {
    console.warn("report_analyst_risk_modifiers is not an array; nothing to do.");
    return enriched_projects_with_incidents;
  }
  if (!Array.isArray(enriched_projects_with_incidents)) {
    console.warn("enriched_projects_with_incidents is not an array; nothing to do.");
    return [];
  }

  const analystRows = report_analyst_risk_modifiers;
  const projects = enriched_projects_with_incidents;

  const PNAME = "Project Name";
  const PNAME_ALT = "ProjectName";

  const fieldsYesNo = [
    "Multiple Lenders",
    "Adequate IESC Supervision",
    "Close Proximity to Other Projects",
    "Strategic Interest",
    "Significant Community Risk",
    "Significant Labor Risk",
    "Significant Environmental Risk",
    "Client Reporting",
    "IESC Reporting",
    "Regular E&S Reporting",
    "Regular IESC Reporting"
  ];

  const fieldsFreeText = ["Operational Phase"];
  const fieldsNumeric = ["Analyst Adjustment"];

  const norm = (v) => (v ?? "").toString().trim().toLowerCase();

  const yn = (v) => {
    if (v === null || v === undefined) return "";
    if (typeof v === "boolean") return v ? "yes" : "no";
    const s = v.toString().trim().toLowerCase();
    if (["yes", "y", "true", "t", "1"].includes(s)) return "yes";
    if (["no", "n", "false", "f", "0"].includes(s)) return "no";
    return s;
  };

  const num = (v) => {
    if (v === null || v === undefined || v === "") return "";
    const n = Number(v);
    return Number.isFinite(n) ? n : v;
  };

  // Build lookup
  const byName = new Map();
  for (const p of projects) {
    const nm = p[PNAME] ?? p[PNAME_ALT];
    if (!nm) continue;
    const key = norm(nm);
    if (!byName.has(key)) byName.set(key, []);
    byName.get(key).push(p);
  }

  // Apply analyst modifiers
  for (const a of analystRows) {
    const aName = a[PNAME] ?? a[PNAME_ALT];
    if (!aName) continue;
    const targets = byName.get(norm(aName));
    if (!targets) continue;

    for (const proj of targets) {
      for (const f of fieldsYesNo) if (f in a) proj[f] = yn(a[f]);
      for (const f of fieldsFreeText) if (f in a) proj[f] = a[f] ?? "";
      for (const f of fieldsNumeric) if (f in a) proj[f] = num(a[f]);
    }
  }

  console.info("Analyst risk modifiers applied.");
  return projects; // return updated dataset
})();

```

```js
display(applyAnalystRiskModifiers)
```


```js
display((data => {
  const blob = new Blob([d3.csvFormat(data)], { type: "text/csv" });
  return download(blob, 'enriched_projects_with_incidents_and_analyst_modifiers.csv', 'Download Projects with Analyst Modifiers');
})(applyAnalystRiskModifiers))
```

<!--- --->
<br/>


**Step 5 Outputs :** **Portfolio with Flag-Adjusted ESG risk scores** 

This final step encodes the calculated risk accelerants and mitigants:

```js
// Weights per your updated table
// Weights
const W = {
  monitoredLast2Y: monitoredLast2Yi,               // subtract 20 if yes
  multipleLenders: multipleLendersi,                // subtract 2 if yes
  clientReporting: clientReportingi,                // subtract 2 if yes (only if present)
  iescReporting: iescReportingi,                  // subtract 2 if yes (only if present)
  adequateIESCSupervision: adequateIESCSupervisioni,        // subtract 5 if yes
  redFlag_008: redFlagi1,                    // +5 if adverse_impact_2023 is true
  significantESIncident: redFlagi2,         // +10 if any Incident Received Q* 2025 is true
  closeProximity: closeProximityi,                 // +3 if yes
  preConstructionPhase: constructionPhasei1,           // +2 if Operational Phase = pre-construction
  constructionPhase: constructionPhasei2,              // +1 if Operational Phase = construction
  significantCommunityRisk: significantCommunityRiski,      // +10 if yes
  significantLaborRisk: significantLaborRiski,           // +2 if yes
  significantEnvironmentalRisk: significantEnvironmentalRiski,   // +2 if yes
  strategicInterest: strategicInteresti,              // +1 if yes
  analystAdjustment: analystAdjustmenti               // clamp ±5
};

// 'yes' = yes/true/1 or any positive number
const yes = (v) => {
  if (v === undefined || v === null) return false;
  const s = String(v).trim().toLowerCase();
  if (s === "yes" || s === "true" || s === "1") return true;
  const n = Number(s.replace(/,/g, ""));
  return Number.isFinite(n) && n > 0;
};

// Match "Incident Received Q1..Q4 2025" (+ optional " E#")
function findIncidentReceived2025Columns(keys) {
  const re = /^Incident Received\s+Q[1-4]\s+2025(?:\s+E\d+)?$/i;
  return keys.filter(k => re.test(k));
}

/**
 * Only uses the fields you specified:
 *  - adverse_impact_2023
 *  - site_visited_in_past_two_years
 *  - Incident Received Q* 2025 (any quarter)
 *  - Multiple Lenders, Adequate IESC Supervision, Close Proximity to Other Projects,
 *    Strategic Interest, Significant Community Risk, Significant Labor Risk,
 *    Significant Environmental Risk, Operational Phase, Analyst Adjustment
 */
function calculateContextScore(rows) {
  if (!Array.isArray(rows)) return [];

  const keys = rows.length ? Object.keys(rows[0]) : [];
  const incidentCols2025 = findIncidentReceived2025Columns(keys);
  const hasClientReporting = keys.includes("Client Reporting");
  const hasIESCReporting   = keys.includes("IESC Reporting");

  return rows.map(row => {
    let score = 0;
    const ctx = {};

    // --- Mitigants (subtract) ---
    if ("site_visited_in_past_two_years" in row && yes(row["site_visited_in_past_two_years"])) {
      score += W.monitoredLast2Y;
      ctx.site_visited_in_past_two_years = `−${W.monitoredLast2Y}`;
    }

    if ("Multiple Lenders" in row && yes(row["Multiple Lenders"])) {
      score += W.multipleLenders;
      ctx.multipleLenders = `−${W.multipleLenders}`;
    }

    if (hasClientReporting && yes(row["Client Reporting"])) {
      score += W.clientReporting;
      ctx.clientReporting = `−${W.clientReporting}`;
    }

    if (hasIESCReporting && yes(row["IESC Reporting"])) {
      score += W.iescReporting;
      ctx.iescReporting = `−${W.iescReporting}`;
    }

    if ("Adequate IESC Supervision" in row && yes(row["Adequate IESC Supervision"])) {
      score += W.adequateIESCSupervision;
      ctx.adequateIESCSupervision = `−${W.adequateIESCSupervision}`;
    }

    // --- 008 adverse impact (+5) ---
    if ("adverse_impact_2023" in row && yes(row["adverse_impact_2023"])) {
      score += W.redFlag_008;
      ctx.redFlag_008 = `+${W.redFlag_008}`;
    }

    // --- Significant incidents (+10) via "Incident Received Q* 2025" ---
    if (incidentCols2025.length && incidentCols2025.some(c => yes(row[c]))) {
      score += W.significantESIncident;
      ctx.significantESIncident = `+${W.significantESIncident}`;
    }

    // --- Other risk flags (+) ---
    if ("Close Proximity to Other Projects" in row && yes(row["Close Proximity to Other Projects"])) {
      score += W.closeProximity;
      ctx.closeProximity = `+${W.closeProximity}`;
    }
    if ("Strategic Interest" in row && yes(row["Strategic Interest"])) {
      score += W.strategicInterest;
      ctx.strategicInterest = `+${W.strategicInterest}`;
    }
    if ("Significant Community Risk" in row && yes(row["Significant Community Risk"])) {
      score += W.significantCommunityRisk;
      ctx.significantCommunityRisk = `+${W.significantCommunityRisk}`;
    }
    if ("Significant Labor Risk" in row && yes(row["Significant Labor Risk"])) {
      score += W.significantLaborRisk;
      ctx.significantLaborRisk = `+${W.significantLaborRisk}`;
    }
    if ("Significant Environmental Risk" in row && yes(row["Significant Environmental Risk"])) {
      score += W.significantEnvironmentalRisk;
      ctx.significantEnvironmentalRisk = `+${W.significantEnvironmentalRisk}`;
    }

    // --- Operational Phase (no double-counting) ---
    if ("Operational Phase" in row && row["Operational Phase"] != null) {
      const s = String(row["Operational Phase"]).toLowerCase();
      if (s.includes("pre-construct")) {
        score += W.preConstructionPhase;
        ctx.operationalPhase = `pre-construction (+${W.preConstructionPhase})`;
      } else if (s.includes("construct")) {
        score += W.constructionPhase;
        ctx.operationalPhase = `construction (+${W.constructionPhase})`;
      }
    }

    // --- Analyst Adjustment (clamp ±5) ---
    if ("Analyst Adjustment" in row && String(row["Analyst Adjustment"]).trim() !== "") {
      const n = Number(row["Analyst Adjustment"]);
      if (Number.isFinite(n)) {
        const clamped = Math.max(-W.analystAdjustment, Math.min(W.analystAdjustment, n));
        score += clamped;
        ctx.analystAdjustment = `${n} (clamped to ${clamped >= 0 ? "+" : ""}${clamped})`;
      }
    }

    return { ...row, context_score: score, _ctx: ctx };
  });
}

```

```js
const written_context_value = calculateContextScore(applyAnalystRiskModifiers)
display(written_context_value)
```


```js
display((data => {
  const blob = new Blob([d3.csvFormat(data)], { type: "text/csv" });
  return download(blob, 'full_ES_factors_and_context.csv', 'Download Projects with Context and Factor');
})(written_context_value))
```


<!--
```js
const ESRScontext = calculateContextScore_example(ESRS_adjusted_for_CRI_and_SRI);
//display(ESRScontext[0]["context_score"])
```
-->

<!--
```js
function calculateContextScore_example(data) {
  return data.map(d => {
    const offsets = [
//      red_flag_008,
//      monitored_last_2_years,
//      multiple_lenders,
//      iesc_reporting
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
-->


```js
//function calculateContextScore(data) {
//  return data.map(d => {
//    const offsets = [
//      red_flag_008,
//      monitored_last_2_years,
//      multiple_lenders,
//      iesc_reporting
//    ];

//    const definedNumericValues = offsets.filter(v => typeof v === "number");
//    const allNA = offsets.every(v => v === "n/a");

//    const context_score = allNA
//      ? "n/a"
//      : definedNumericValues.length > 0
//        ? definedNumericValues.reduce((sum, v) => sum + v, 0)
//        : undefined;

//    return {
//      ...d,
//      context_score
//    };
//  });
//}
```


<br>



## Step 6: Factor for Financial Risk Exposure

<!--
Using the Finance Risk Report.
-->

**Project Rating**

```js
const finance_risk_report_workbook = await FileAttachment("/data/internal/Finance Risk Rpt 6302025 final.xlsx").xlsx()
//display(finance_risk_report_workbook)
```

```js
const finance_risk_report = finance_risk_report_workbook.sheet(0, {headers: true});
display(finance_risk_report)
```

```js echo
function ratingSteps(x) {
  if (x <= 4) return 0;
  if (x == 5) return 5;   // minimal effect
  if (x >= 6 && x <= 7) return 8;   // minimal effect
  if (x === 8) return 25;            // strong trigger
  if (x === 9) return 30;
  if (x === 10) return 32;
  if (x === 11) return 34;
  if (x >= 12) return 40;            // very strong
}
```

```js
// Build lookup map from finance_risk_report keyed by ProjectID
const riskLookup = new Map(
  finance_risk_report.map(d => [String(d["New ProjectID#"]), d["Project Rating"]])
);
```

```js
// Merge into written_context_value
const projects_with_financal_risk_rating = written_context_value.map(row => {
  let rating = null;
  for (const key of JOIN_KEY_PROJECTS) {
    if (row[key] != null && riskLookup.has(String(row[key]))) {
      rating = riskLookup.get(String(row[key]));
      break;
    }
  }
  return {
    ...row,
    "Risk Report Project Rating, June 2025": rating,
    "Factored Risk Rating Value": ratingSteps(rating)
  };
});
display(projects_with_financal_risk_rating.map(d => ({
  "Project ID": d["Project ID"],
  "Project Name": d["Project Name"],
  "Risk Report Project Rating, June 2025": d["Risk Report Project Rating, June 2025"],
  "Factored Risk Rating Value": d["Factored Risk Rating Value"]
})))
```


```js
display((data => {
  const blob = new Blob([d3.csvFormat(data)], { type: "text/csv" });
  return download(blob, 'projects_with_financal_risk_rating.csv', 'Download Projects with Financial Risk Rating');
})(projects_with_financal_risk_rating))
```



**Financial Exposure**

Financial exposure is calculated as the sum of two attributes in the Finance Risk Report workbook: Undisbursed + Outstanding. 

```js
// === Add financial exposure fields from Finance Risk Report ===

// Build lookup with Undisbursed and Outstanding
const financeLookup = new Map(
  finance_risk_report.map(d => [
    String(d["New ProjectID#"]),
    {
      rating: d["Project Rating"],
      undisbursed: d["Undisbursed"],
      outstanding: d["Outstanding"]
    }
  ])
);

const projects_with_financial_exposure = written_context_value.map(row => {
  let data = null;
  for (const key of JOIN_KEY_PROJECTS) {
    if (row[key] != null && financeLookup.has(String(row[key]))) {
      data = financeLookup.get(String(row[key]));
      break;
    }
  }
  const undisbursed = data ? Number(data.undisbursed) || 0 : null;
  const outstanding = data ? Number(data.outstanding) || 0 : null;

  return {
    ...row,
    "Risk Report Project Rating, June 2025": data ? data.rating : null,
    "Factored Risk Rating Value": ratingSteps(data ? data.rating : null),
    "Risk Report Undisbursed, June 2025": undisbursed,
    "Risk Report Outstanding, June 2025": outstanding,
    "Risk Report Exposure, June 2025":
      undisbursed != null && outstanding != null ? undisbursed + outstanding : null
  };
});


display(projects_with_financial_exposure.map(d => ({
  "Project ID": d["Project ID"],
  "Project Name": d["Project Name"],
  "Risk Report Project Rating, June 2025": d["Risk Report Project Rating, June 2025"],
  "Factored Risk Rating Value": d["Factored Risk Rating Value"],
  "Risk Report Undisbursed, June 2025": d["Risk Report Undisbursed, June 2025"],
  "Risk Report Outstanding, June 2025": d["Risk Report Outstanding, June 2025"],
  "Risk Report Exposure, June 2025": d["Risk Report Exposure, June 2025"]
})))
```


```js
// === Function to assign Factored Risk Exposure by quintiles ===

function assignExposureQuintiles(projects) {
  // collect all numeric exposure values
  const exposures = projects
    .map(d => Number(d["Risk Report Exposure, June 2025"]))
    .filter(v => Number.isFinite(v));

  if (exposures.length === 0) return projects;

  // sort exposures ascending
  exposures.sort((a, b) => a - b);

  // quintile breakpoints at 20%, 40%, 60%, 80%
  const q1 = exposures[Math.floor(exposures.length * 0.2)];
  const q2 = exposures[Math.floor(exposures.length * 0.4)];
  const q3 = exposures[Math.floor(exposures.length * 0.6)];
  const q4 = exposures[Math.floor(exposures.length * 0.8)];

  // scoring function
  function exposureScore(x) {
    if (!Number.isFinite(x)) return null;
    if (x <= q1) return 0;   // 1st fifth
    if (x <= q2) return 2;   // 2nd fifth
    if (x <= q3) return 5;   // 3rd fifth
    if (x <= q4) return 8;   // 4th fifth
    return 12;               // 5th fifth
  }

  return projects.map(row => ({
    ...row,
    "Factored Risk Exposure, June 2025":
      exposureScore(Number(row["Risk Report Exposure, June 2025"]))
  }));
}

// Apply to your enriched dataset
const projects_with_exposure_quintiles =
  assignExposureQuintiles(projects_with_financial_exposure);

// Preview

display(projects_with_exposure_quintiles.map(d => ({
  "Project ID": d["Project ID"],
  "Project Name": d["Project Name"],
  "Risk Report Exposure, June 2025": d["Risk Report Exposure, June 2025"],
  "Factored Risk Exposure, June 2025": d["Factored Risk Exposure, June 2025"]
})));
```


```js
display((data => {
  const blob = new Blob([d3.csvFormat(data)], { type: "text/csv" });
  return download(blob, 'projects_with_exposure_quintiles.csv', 'Download Projects with Financial Exposure');
})(projects_with_exposure_quintiles))
```





<br/>

---

## Step 7: Final Risk Score


<!--
DIFFERENTIATE BY ANNUAL VALUES
-->
<br/>

Calculating the final risk score involves first summing a project's country-adjusted ESRS and contextual risk score.

${tex`ESRS_{\text{countryAdjusted} {(i)}} + O_{\text{context} {(i)}}`}

<br/>
Additional bounding parameters are applied to maintain a range of [0,100]:

${tex`\text{ESRS}_{\text{factored} {(i)}} = \min\left(\max\left(ESRS_{\text{countryAdjusted} {(i)}} + O_{\text{context} {(i)}},\ 0\right),\ 100\right)`}



---
**Step 7 Output** 
  

```js
// Final score = ESRS_adjustment_calculated
//             + context_score
//             + Factored Risk Rating Value
//             + Factored Risk Exposure, June 2025
// Missing parts are ignored.

function applyFinalFactoredScore(rows) {
  if (!Array.isArray(rows)) return [];

  const toNum = (v) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };

  return rows.map(row => {
    const base     = toNum(row.ESRS_adjustment_calculated);
    const context  = toNum(row.context_score);
    const rating   = toNum(row["Factored Risk Rating Value"]);
    const exposure = toNum(row["Factored Risk Exposure, June 2025"]);

    const parts = [base, context, rating, exposure].filter(v => v != null);
    const finalScore = parts.length ? parts.reduce((a, b) => a + b, 0) : null;

    return {
      ...row,
      final_project_factored_risk_score: finalScore
    };
  });
}

```

```js
const final = applyFinalFactoredScore(written_context_value);
display(final)
```




```js
display((data => {
  const blob = new Blob([d3.csvFormat(data)], { type: "text/csv" });
  return download(blob, 'ES_factors_and_context_with_final_score.csv', 'Download Projects with Final Score');
})(final))
```


----------------

```js
//const ESRSfactored = factorContextValue(ESRScontext);
//const ESRSfactored = factorContextValue(enriched_projects);

//display(ESRSfactored);
//display(ESRSfactored[0]["finalScore"])
```

```js
//function factorContextValue(data) {
//  return data.map(d => {
//    const N = d["ESRS Country Adjusted"];
//    const context_score = d.context_score;
//
//    let finalScore;
//
//    if (typeof N === "number" && typeof context_score === "number") {
//      const combined = N + context_score;
//      finalScore = Math.max(0, Math.min(100, combined));
//    } else {
//      finalScore = N; // fallback to unmodified value
//    }
//
//    return {
//      ...d,
//      finalScore
//    };
//  });
//};

//function factorContextValue(data) {
//  return data.map(d => {
//    const N = d["ESRS_adjustment_calculated"];
//    const context_score = d.context_score;

//    let finalScore;

//    if (typeof N === "number" && typeof context_score === "number") {
//      const combined = N + context_score;
//      finalScore = Math.max(0, Math.min(100, combined));
//    } else {
//      finalScore = N; // fallback to unmodified value
//    }

//    return {
//      ...d,
//      finalScore
//    };
//  });
//}
```



## Portfolio Segmentation

```js
const ESRSfactored = final
```


Projects are segmented into three monitoring priority tiers based on final scores:



|Tier|Range|
| --- | --- |
|Site Monitoring|Top ${top} projects|
|Special Consideration|Next ${mid} projects|
|No Monitoring|Remaining projects|



```js
//display(segmentedPortfolio)
//display(segmentedPortfolio[0]["monitoringTier"])
display(segmentedPortfolio.filter(d => d.monitoringTier === "priority for site monitoring"));
display(segmentedPortfolio.filter(d => d.monitoringTier === "recommended for special consideration"));
display(segmentedPortfolio.filter(d => d.monitoringTier === "standard monitoring"));
```


---

<br/>

### Site Monitoring

```js
const top = view(Inputs.range([12,60], {value: 36, step: 1}))
```

```js
const top_search = view(Inputs.search(segmentedPortfolio.filter(d => d.monitoringTier === "priority for site monitoring")))
```


```js
Inputs.table(top_search)
```


```js
display((data => {
  const blob = new Blob([d3.csvFormat(data)], { type: "text/csv" });
  return download(blob, 'active_projects_ESG_risk_top_segment.csv', 'Download Top Segment for Site Monitoring');
})(segmentedPortfolio.filter(d => d.monitoringTier === "priority for site monitoring")));
```
<br/>

### Special Consideration 

```js
const mid = view(Inputs.range([12,48], {value: 36, step: 1}))
```



```js
const mid_search = view(Inputs.search(segmentedPortfolio.filter(d => d.monitoringTier === "recommended for special consideration")))
```


```js
Inputs.table(mid_search)
```


```js
display((data => {
  const blob = new Blob([d3.csvFormat(data)], { type: "text/csv" });
  return download(blob, 'active_projects_ESG_risk_mid_segment.csv', 'Download Middle Segment for Desk Monitoring');
})(segmentedPortfolio.filter(d => d.monitoringTier === "recommended for special consideration")));
```

<br/>

### Not Prioritized 



```js
const low_search = view(Inputs.search(segmentedPortfolio.filter(d => d.monitoringTier === "standard monitoring")))
```


```js
Inputs.table(low_search)
```



```js
const segmentedPortfolio = segmentPortfolio(ESRSfactored);
```



```js
//Segment portfolio by the new score (defaults to 'final_project_factored_risk_score')
//    Top 24 -> priority for site monitoring
//    Next 24 -> recommended for special consideration
//    Rest -> standard monitoring
function segmentPortfolio(data,
  { topSize = top, midSize = mid, scoreKey = "final_project_factored_risk_score" } = {}
) {
  if (!Array.isArray(data)) return [];

  const num = v => (typeof v === "number" && Number.isFinite(v) ? v : null);

  // Collect [index, score] for rows that have a numeric score (fallback to legacy finalScore)
  const scored = [];
  for (let i = 0; i < data.length; i++) {
    const v = num(data[i][scoreKey]);
    const s = v ?? num(data[i].finalScore);
    if (s !== null) scored.push([i, s]);
  }

  // Sort descending by score; tie-break on original index for stability
  scored.sort((a, b) => (b[1] - a[1]) || (a[0] - b[0]));

  // Determine cut positions (sizes, not cumulative in the inputs)
  const topN = Math.max(0, Math.floor(topSize));
  const midN = Math.max(0, Math.floor(midSize));
  const topCut = Math.min(topN, scored.length);
  const midCut = Math.min(topN + midN, scored.length); // cumulative boundary for second tier

  // Build rank map: index -> rank among scored
  const rank = new Map(scored.map(([i], pos) => [i, pos]));

  return data.map((row, i) => {
    const r = rank.has(i) ? rank.get(i) : Infinity; // unscored → Infinity => "standard monitoring"
    let monitoringTier;
    if (r < topCut) {
      monitoringTier = "priority for site monitoring";
    } else if (r < midCut) {
      monitoringTier = "recommended for special consideration";
    } else {
      monitoringTier = "standard monitoring";
    }
    return { ...row, monitoringTier };
  });
}
```


```js
//function segmentPortfolio(data) {
  // Make a shallow copy to avoid mutating original array
//  const sorted = [...data]
//    .filter(d => typeof d.finalScore === "number")
//    .sort((a, b) => b.finalScore - a.finalScore); // descending order

  // Assign tiers by index
//  return data.map(d => {
//    const index = sorted.findIndex(x => x === d);
//    let monitoringTier;

//    if (index >= 0 && index < 24) {
//      monitoringTier = "priority for site monitoring";
//    } else if (index >= 24 && index < 48) {
//      monitoringTier = "recommended for special consideration";
//    } else {
//      monitoringTier = "standard monitoring";
//    }

//    return {
//      ...d,
//      monitoringTier
//    };
//  });
//}
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

