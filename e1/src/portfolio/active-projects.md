# Creating the Active Projects List

 

<br/>

 

## **Step 1:**

### Load in the 'All Projects' report from Insight

 

<!--

Requires using the 'Projects with RFC report template in Insight.

 

Required attributes are:

 

- Process Stage

- First Disbursement Date

- Project Record Type

- Project Name

- Current Department

- Clearance Type (RFC/RFA)

- Commitment Date

-->

 

```js

const local_file_insight_all_projects = view(Inputs.file({label: "Project Portfolio", accept: ".csv"}));

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

//const workbook = await FileAttachment('/data/all-projects.xlsx').xlsx()

const projects = report_insight_all_projects

display(projects)

```

 

```js

const search_projects = view(Inputs.search(projects))

```

 

```js

const search_projects_table = view(Inputs.table(search_projects))

```



<br/>

 

## **Step 2:**

### Gather all projects where the process stage indicates a project is active

 

<!--

Question - Are all invested for PortCo AND do we wish to exclude for PortCo.

-->

 

```js

const stage_filter = projects.filter(project =>

  ["Contract Executed", "Executed Agreement", "Disbursing (after 1st Disbursement)", "Loan Disbursed", "Fully Disbursed", "Transferred to Monitoring", "Liquidating" ].includes(project["Process Stage"])

);

display(stage_filter)

```

 

```js

view(Inputs.table(stage_filter))

```

 

```js

display(download(serializeToCSV(stage_filter), "stage_filter", "Download Data"))

```

 

<br/>

 

## **Step 3:**

### Filter out projects that do not have a disbursement date, except for those where 'Project Record Type' is 'Fund' or 'Insurance'

 

 

<!--

/// Operate on the 'non-insurance projects' to remove the ones that haven't disbursed.

 

More accurately, this code says to keep all Funds and Insurance projects, plus any other project that have a disbursement date. Remove everything else.

 

We wish for a permissive filter because several financial instruments would not have a disbursement date, including Loan Portfolio Guarantees (LPG) and Investment Portfolio Guarantees (under OPIC).

-->

 

```js

const disbursement_filter = stage_filter.filter(

  project => ["Fund", "Insurance"].includes(project["Project Record Type"]) || (project["First Disbursement Date"] != null && project["First Disbursement Date"] !== '')

);

 

display(disbursement_filter);

display(d3.group(disbursement_filter, d => d["Project Record Type"], d => d["Process Stage"]  ))

```

 

```js

view(Inputs.table(disbursement_filter))

```

 

```js

display(download(serializeToCSV(disbursement_filter), "disbursement_filter", "Download Data"))

```

 

<!--

/// THIS DOESN'T REMOVE ANY RECORDS

-->

 

<!--

WE DON'T WISH TO EXCLUDE THESE.

 

**Step 4:** Remove 'Fund' and 'Insurance' projects where values for "Process Stage" are neither "Transferred to Monitoring" nor "Contract Executed".

 

```js

const disbursement_filter_elaborated = disbursement_filter.filter(p =>

  !["Fund", "Insurance"].includes(p["Project Record Type"]) ||

  ["Transferred to Monitoring", "Contract Executed", "Executed Agreement"].includes(p["Process Stage"])

);

 

display(disbursement_filter_elaborated)

display(d3.group(disbursement_filter_elaborated, d => d["Project Record Type"]))

```

 

```js

view(Inputs.table(disbursement_filter_elaborated))

```

-->

 

<br/>

 

## **Step 4:**

### Exclude anything where 'Project Record Type' is 'Project Development' or 'Portfolio Company'

 

```js

const portCo_filter = disbursement_filter.filter(

  p => !["Project Development", "Portfolio Company"].includes(p["Project Record Type"])

);

 

display(portCo_filter);

display(d3.group(portCo_filter, d => d["Project Record Type"], d => d["Process Stage"]  ))

```

 

```js

view(Inputs.table(portCo_filter))

```

 

```js

display(download(serializeToCSV(portCo_filter), "portCo_filter", "Download Data"))

```

 

<br/>

 

## **Step 5:**

### Exclude Insurance records where 'Project Name' starts with either 'IRC' or 'DAI' and keep only those where the Process Stage is 'Contract Executed'

 

<!--

Find a way to exclude non-active insurance and all TA project.

 

Exclude anything where Project Record Type is 'Project Development'

For insurance - remove any where 'process stage' is not 'contract executed' (only allow for contract executed).

 

<mark>LOOK LOOK</mark>

 

I wish to exclude anything where 'Project Record Type' is 'Project Development'.  I also wish to remove any entries where 'Project Record Type' is 'Insurance' and where 'Process Stage' is not 'Contract Executed'.

-->

 

<!--

 

NEW TO ADD: Remove anything that is Insurance and starts with 'IRC' or 'DAI' or "Unallocated Portion"

Let's start with 'refined_filter' as our data.  Now we wish to apply a filter for instances where 'Project Record Type' is 'Insurance' and 'Project Name' starts with either 'IRC' or 'DAI'.

We wish to return all results from the original dataset, except for those project where 'Project Record Type' is 'Insurance' and 'Project Name' starts with either 'IRC' or 'DAI'.

-->

 

```js

const insurance_irc_dai_filter = portCo_filter.filter(project => {

  const recordType = project["Project Record Type"];

  const projectName = (project["Project Name"] || "");

  const processStage = project["Process Stage"];

 

  // Exclude if it's Insurance AND starts with IRC or DAI

  if (

    recordType === "Insurance" &&

    (projectName.startsWith("IRC") || projectName.startsWith("DAI"))

  ) {

    return false;

  }

 

  if (recordType === "Insurance" && processStage !== "Contract Executed") {

    return false;

  }

 

  return true; // keep all other cases

});

 

display(insurance_irc_dai_filter);

display(d3.group(insurance_irc_dai_filter, d => d["Project Record Type"], d => d["Process Stage"]  ))

display(d3.group(insurance_irc_dai_filter, d => d["Current Department"] ))

```

 

```js

view(Inputs.table(insurance_irc_dai_filter))

```

 

```js

display(download(serializeToCSV(insurance_irc_dai_filter), "insurance_irc_dai_filter", "Download Data"))

```

<!--

<br/>

 

## **Step 6:** Remove all project where 'Project Name' starts with 'Unallocated Portion'. Also remove projects where 'Current Department' is 'Technical Assistance'.

 

```js

const clean_up = insurance_irc_dai_filter.filter(p =>

  !( (p["Project Name"] || "").startsWith("Unallocated Portion") || (p["Current Department"] || "") === "Technical Assistance" )

);

 

display(clean_up);

display(d3.group(clean_up, d => d["Current Department"]  ))

```

 

```js

view(Inputs.table(clean_up))

```



```js

display(download(serializeToCSV(clean_up), "clean_up", "Download Data"))

```

-->

 

<br/>

 

## **Step 6:**

### Remove all project that do not have a value for 'Clearance Type (RFC/RFA)'

 

```js

const clearance_type_filter = insurance_irc_dai_filter.filter(project => {

  const clearanceType = project["Clearance Type (RFC/RFA)"];

 

  // Keep only if it's not null/undefined and not an empty string after trimming

  return clearanceType !== null &&

         clearanceType !== undefined &&

         clearanceType.toString().trim() !== "";

});

 

display(clearance_type_filter);

```

 

```js

view(Inputs.table((clearance_type_filter)))

```

 

```js

display(download(serializeToCSV(clearance_type_filter), "clearance_type_filter", "Download Data"))

```

 

<!--

Ok, let's start from a dataset named 'insurance_irc_dai_filter'.  Please show me how to remove all project where 'Project Name' starts with 'Unallocated Portion' and also remove projects where 'Current Department' is 'Technical Assistance'.  Return the rest.

-->

 

<br/>

 

## **Step 7:**

### Remove all records before Dec 30, 2005

 

```js

const disbursement_stage_and_owner_and_date_filter = clearance_type_filter.filter(project => new Date(project['Commitment Date']) >= new Date('2005-12-31'));

 

display(disbursement_stage_and_owner_and_date_filter);

```

 

```js

const search = view(Inputs.search(disbursement_stage_and_owner_and_date_filter))

```

 

```js

Inputs.table(search)

```

 

```js

display(download(serializeToCSV(disbursement_stage_and_owner_and_date_filter), "active-projects-workbook", "Download Data"))

```

 

<!--

 

!!! HERE!!!!!

 

Ways to advance - EXCLUDE guarantees from pre-DFC days.

... also need to exclude MTU from credit authority that were done pre-2019

1) if guarantee, and if date = pre 2019.

... look for indicators on the project page about 'if from a credit authority'



---

A MORE PERMISSIVE 'ACTIVE LIST' - WHAT DFC IS ACTIVELY WORKING ON

 

1st check - is process stage; be inclusive : (leave in RFC completed pending review)

... look for first indicator that it's moving off the committed.

... some insurance projects don't have have a disbursement record

 

indicators of being live:

... first disbursement date

-or-

... insurance -> process stage -> contract executed == first disbursement

 

+++

... final legal agreement date

--->

 

<!---

[INTEGRATES EXTERNAL REPORT BY OIF CALLED PorCo - supplied by OIC] - Justin adds project ID for parent project. ..... these are records that are not in Insight.  

 

!!!

 

don't know what its called - only used by OIF. - (more useful in co-locating project) - reports to the ODP inbox.  

-> THEN, there is a 'newly added' tab, requested by Kate, identifying projcet that became active since last ran the list.  -> do a DIF

 

++ check the crack

1. committed + maturity date (if exists) == even if dates with no other fields, probably moving forward

2. activity in the project / procedural actions actions meaning the project moving forward (requires going into the project)

 

-->

 

<!-- Utility Functions -->

 

```js

function download(value, name = "untitled", label = "Save") {

    const a = document.createElement("a");

    const b = a.appendChild(document.createElement("button"));

    b.textContent = label;

    a.download = name;

 

    async function reset() {

      await new Promise(requestAnimationFrame);

      URL.revokeObjectURL(a.href);

      a.removeAttribute("href");

      b.textContent = label;

      b.disabled = false;

    }

 

    a.onclick = async event => {

      b.disabled = true;

      if (a.href) return reset(); // Already saved.

      b.textContent = "Saving…";

      try {

        const object = await (typeof value === "function" ? value() : value);

        b.textContent = "Download";

        a.href = URL.createObjectURL(object); // eslint-disable-line require-atomic-updates

      } catch (ignore) {

        b.textContent = label;

      }

      if (event.eventPhase) return reset(); // Already downloaded.

      b.disabled = false;

    };

 

    return a;

  }

```

 

```js

function serialize(data) {

  let s = JSON.stringify(data)

  return new Blob([s], {type: "application/json"})

}

```

 

```js

function serializeToCSV(data) {

  if (!Array.isArray(data) || data.length === 0) {

    return new Blob([], { type: "text/csv" });

  }

 

  const headers = Object.keys(data[0]);

  const csvRows = data.map(row =>

    headers.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(',')

  );

 

  csvRows.unshift(headers.join(',')); // Add header row

 

  const csvString = csvRows.join('\r\n');

  return new Blob([csvString], { type: "text/csv" });

}

 

function replacer(key, value) {

  return value === null ? '' : value;

}

```



----



```js

//display(download(serializeToCSV(process_stage_and_disbursement_or_legal_agreement_or_insurance_contract_executed), "active-projects", "Save"))

```
