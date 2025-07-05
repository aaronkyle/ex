# ESG Risk Ranking Model for Project Portfolio Monitoring

This document defines a model for transparently and generatively calculating project E&S risk scores and for portfolio segmentation into risk-based monitoring tiers: site visit required, enhanced desk-based monitoring, and non-priority. The model evaluates project E&S risk categories, country risk as derived from multi-dimensional ESG scores, and institutionally-defined risk parameters reflective of project-specific red flags and/or risk mitigants. 


```js
const active_projects = await FileAttachment('/data/all_projects.csv').csv()
```


```js
const outcomes_survey = await FileAttachment("/data/outcomes_survey.csv").csv()
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


```js echo
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


```js echo
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

<br/>

---

## Step 2. Country Risk Index (CRI)

<br/>

The Country Risk Index (CRI) is derived from [external global ESG risk indices](/indices/contextual-risk-indices.html) and combined into a single, composite ESG score.

Reference indices included in the model are:

**Environmental**
  - [WorldRiskIndex](https://weltrisikobericht.de/worldriskreport/)
  - [Environmental Performance Index (EPI)](https://epi.yale.edu/)
  - [ND-GAIN Index](https://gain.nd.edu/our-work/country-index/)

**Social**
  - [Global Rights Index](https://www.ituc-csi.org/global-rights-index)
  - [Freedom in the World Index](https://freedomhouse.org/report/freedom-world)
  - [Freedom Index by Country](https://worldpopulationreview.com/country-rankings/freedom-index-by-country)
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
const worldriskindex24_workbook = await FileAttachment("/worldriskindex-2024.xlsx").xlsx();

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
const epi2024 = await FileAttachment("/epi2024results.csv").csv()
display(epi2024)
```

```js
const epiMap_risk_map = new Map(epi2024.map(d => [d.country, +d["EPI.new"]]));
display(epiMap_risk_map)
```


<br/>

**`ND-GAIN =`**

```js
const nd_gain2025_workbook = await FileAttachment("/nd_gain_countryindex_2025.zip").zip()

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



<br/>

#### Social Indices

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
const FIW_workbook = await FileAttachment("/Country_and_Territory_Ratings_and_Statuses_FIW_1973-2024.xlsx").xlsx()
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

```js
display(FIW_data_structured)
```

FIW_prMap
```js
display(FIW_prMap);
```
```js
const FIW_prMap_normalized = normalize(FIW_prMap);
display(FIW_prMap_normalized)
```


FIW_clMap
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
const freedom_index_data = await FileAttachment("/2023-Human-Freedom-Index-Data.csv").csv();
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
display(freedom_index_risk_map);
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
const globalSlaveryIndex_zip = FileAttachment("/2023-Global-Slavery-Index-Data-dd6d042a-e404-405a-8956-de68d59a11aa.zip").zip()
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

**`Gender Inequality Index (GII) =`**

```js
const gii_workbook = FileAttachment("HDR25_Statistical_Annex_GII_Table.xlsx").xlsx()
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




<br/>

#### Governance Indices

<br/>

**`Worldwide Governance Indicators (WGI) =`**
<!--
!!!!!!!!!!!!!!!!!!!!!!!!
-->

```js
const wgidataset_excel = FileAttachment("wgidataset_excel.zip").zip()
```

```js
const wgidataset_workbook = wgidataset_excel.file("wgidataset.xlsx").xlsx()
```

```js
const wgidata = wgidataset_workbook.sheet(0, {headers: true});
display(wgidata)
```

```js
const wgidataset_grouped = d3.group(wgidata, d => d.indicator)
```


<!---

develop map
--->

<br/>

**`Rule of Law Index =`**


```js
const rol_workbook = FileAttachment("2024_wjp_rule_of_law_index_HISTORICAL_DATA_FILE.xlsx").xlsx()
```

```js
const rol_data = rol_workbook.sheet("WJP ROL Index 2024 Scores", {
    headers: false,
    range: "A1:"
  })
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
display(rol_data_transposed)
```

```js
const rol_dataMap = new Map(rol_data_transposed.map(d => [d.Country, +d["WJP Rule of Law Index: Overall Score"]]));
display(rol_dataMap)
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
const cpi_workbook = FileAttachment("CPI2024-Results-and-trends.xlsx").xlsx()
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
display(cpi_dataMap)
```



<br/>

**`Bertelsmann Transformation Index (BTI) =`**

```js
const bti_workbook = FileAttachment("BTI_2024_Scores.xlsx").xlsx()
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
display(bti_data_keyed)
```

```js
const bti_dataMap_governance = new Map(bti_data_keyed.map(d => [d.Country, +d["  G | Governance Index"]]));
display(bti_dataMap_governance)
```

```js
const bti_dataMap_democracy = new Map(bti_data_keyed.map(d => [d.Country, +d["  SI | Democracy Status"]]));
display(bti_dataMap_democracy)
```

```js
const bti_dataMap_economy = new Map(bti_data_keyed.map(d => [d.Country, +d["  SII | Economy Status"]]));
display(bti_dataMap_economy)
```



<br/>

**`Fragile States Index (FSI) =`**


```js
const fsi_workbook = FileAttachment("FSI-2023-DOWNLOAD.xlsx").xlsx()
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
  display(fsi_score_map)
```









---




```js 
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



<br/>
The composite ESG score for each country (CRI) is generated from the average of the normalized ESG values:

```tex
CRI = ESG_{\text{composite}(i)} = \frac{E_{country} + S_{country} + G_{country}}{3}
```
<br/>

<mark>!!!!!</mark>



```js echo
const countryRiskIndex = normalizeAndAverageScores(

// environment 
  worldriskindex24_risk_map,
  nd_gain2025_risk_map,
  epiMap_risk_map_inverted,

//social
  globalRightsIndex2025_map_normalized,
  freedom_index_risk_map_normalized_inverted,
  globalSlavery_dataMap,
  gii2023_dataMap_normalized,
  rol_dataMap_normalized_inverted,
  cpi_dataMap_inverted
);
display(countryRiskIndex)
```

<br/>

Using the indexed data, factored CRI scores are recorded (labeled to include year of record).



**Step 2 Output: Portfolio data including factored CRI values** 


Portfolio `P` with composite `CRI`</sub> values  = 

```js
display(active_projects_ES_risk_numeric_CRI)
```


```js echo
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


---


```js 
const esgProviders = {

E: [
"WorldRiskIndex",
"Environmental Performance Index (EPI)",
"ND-GAIN Index",

],

S: [
"Global Rights Index",
"Freedom in the World Index",
"Freedom Index by Country",
"Global Slavery Index",
"Social Institutions and Gender Index (SIGI)",
"Gender Equality Index",
"CPIA Gender Equality Rating",
"Gender Inequality Index (GII)"

],

G: [
"Worldwide Governance Indicators (WGI)",
"Rule of Law Index",
"Corruption Perceptions Index",
"Bertelsmann Transformation Index (BTI)",
"Fragile States Index (FSI)"
]
};

```

---

## Step 3. Country-Adjusted ESRS Score

<br/>

This step combines the ESRS and CRI to create a Country-Adjusted ESRS.  This weighted value assigned to each scoring component can be defined as a variable ${tex` \omega`}.  The factored score is thus computed as:

${tex`ESRS_{countryAdjusted(i)} = (1 - \omega) \cdot EnvCat + \omega \cdot C`}

Where ${tex`\omega =`} ${omega}

```js
const omega = view(Inputs.range([0.1,0.9], {step: 0.1, value: 0.3}))
```




---
**<mark>Step 3 Output</mark>** 


`ESRS`<sub>`countryAdjusted`</sub> = 





```js echo
const ESRS_countryAdjusted = active_projects_ES_risk_numeric_CRI.map(d => ({
  ...d,
  "ESRS Country Adjusted": 
    ((1 - omega) * d["E&S Category Numeric"]) + (omega * d["Country Risk Index, 2025"])
}));
display(ESRS_countryAdjusted)
```





---

<br/>

## Step 4. Red Flags and Risk Mitigants

<br/>
Projects can annotated with additional contextual risk data to dynamically modify factored scores based on up-to-date intelligence.  Available contextual modifiers and values are:

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
**<mark>Step 4 Output</mark>** 
  

<mark>!!!</mark>

```js
const ESRScontext = writeContextValue_example(ESRS_countryAdjusted);
display(ESRScontext[0]["context_score"])
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


```js echo
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




<br/>

---

## Step 5: Final Risk Score

<br/>

Calculating the final risk score involves first summing a project's country-adjusted ESRS and contextual risk score.

${tex`ESRS_{\text{countryAdjusted} {(i)}} + O_{\text{context} {(i)}}`}

<br/>
Additional bounding parameters are applied too maintain a range of [0,100]:

${tex`\text{ESRS}_{\text{factored} {(i)}} = \min\left(\max\left(ESRS_{\text{countryAdjusted} {(i)}} + O_{\text{context} {(i)}},\ 0\right),\ 100\right)`}



---
**<mark>Step 5 Output</mark>** 
  


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


### Site Monitoring

```js
Inputs.table(segmentedPortfolio.filter(d => d.monitoringTier === "priority for site monitoring"))
```

### Desk Monitoring 

```js
Inputs.table(segmentedPortfolio.filter(d => d.monitoringTier === "recommended for enhanced desk monitoring"))
```


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





---

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

---

<br/>

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
display(outcomes_survey_by_year)
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
  }
}))

```


```js echo
function mergeProjectAndOutcomes(all_projects, outcomes_survey) {
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

```js echo
const projects_with_ES_outcomes = mergeProjectAndOutcomes(active_projects, outcomes_survey);
```

```js echo
display(projects_with_ES_outcomes);
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

```js echo
filtered_projects_with_ES_outcomes
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



```js echo
view(Inputs.table(filtered_projects_with_ES_outcomes, {
  columns: displayColumns,
  header: Object.fromEntries(displayColumns.map(col => [col, col])), // or set friendly names
  format: formatByColumn
}))

```



---


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

```js echo
// Usage
const projects_with_ES_outcomes_flagged = flag008(projects_with_ES_outcomes);
display(projects_with_ES_outcomes_flagged)
```

```js echo
// Usage
display(projects_with_ES_outcomes_flagged.filter(d => d["008 flag"] === true))
```


```js echo
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

```js echo
// Display
display(flagged_2022_projects);
// or
display(flagged_2023_projects);
```
