# Active Projects List


---

## Creating the Active Projects Dataset

<br/>

**Step 1:** Load in the 'All Projects' report from Insight:

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

 



**Step 2:**  Filter out projects that do not have a disbursement date, except for those where 'Project Record Type' is 'Fund' or 'Insurance'.
 
<!--
More accurately, this code says to keep all Funds and Insurance projects, plus any other project that actually has a disbursement date. Remove everything else.

We use tis filter because several financial instruments would not have a disbursement date, including Loan Portfolio Guarantees (LPG) and Investment Portfolio Guarantees (under OPIC).
-->

```js
const disbursement_filter = projects.filter(project => {

  const date = project["First Disbursement Date"];
  const record_type = project["Project Record Type"];
  const specialTypes = ["Fund", "Insurance"];

  return (

    specialTypes.includes(record_type) ||

    (date !== '' && date !== null && date !== undefined)

  );

});


display(disbursement_filter);
```

 


**Step 3:** Filter for only those projects where the process stage indicates a project is active.

<!--
Note: The 'Invested' value is used to indicate active Portfolio Companies.  We do not include it here because we do not wish to include Portfolio Companies for E&S monitoring.

Also, the 'Committed' and 'Commitment Letter Executed' tags are not great indicators for 'active' projects because they don't indicate that an DFC funds have yet been applied to a project.  Several projects historically have been committed but never disbursed.
-->


```js echo

const disbursement_and_stage_filter = projects.filter(project =>

  ["Contract Executed", "Executed Agreement", "Disbursing (after 1st Disbursement)", "Loan Disbursed", "Fully Disbursed", "Transferred to Monitoring", "Liquidating" ].includes(project["Process Stage"])

);

display(disbursement_and_stage_filter)

```



**Step 4:** Remove from the dataset any Fund or Insurance records where the 'Process Stage' is not 'Transferred to Monitoring' or 'Executed Agreement'.

 <!--
 The below may need to be revisited.  It looks like it says:

- If it’s a Fund or Insurance (allowedRecordType), it gets included no matter what the stage is.

- If it has a disbursement date, it’s included.

- If its stage is "Transferred to Monitoring" or "Executed Agreement", it’s included.

So:

- Funds and Insurance records are always kept, even if they’re at a stage you don’t want.

- We’re not excluding the extra ones as you intended.
 -->


```js echo

const disbursement_filter_refined = disbursement_and_stage_filter.filter(project => {

  const date = project["First Disbursement Date"];
  const record_type = project["Project Record Type"];
  const process_stage = project["Process Stage"];

  const hasDisbursementDate = date !== '' && date !== null && date !== undefined;

  const allowedRecordType = ["Fund", "Insurance"].includes(record_type);

  const allowedStage = ["Transferred to Monitoring", "Executed Agreement"].includes(process_stage);

  return allowedRecordType || hasDisbursementDate || allowedStage;
});


display(disbursement_filter);

```

<!-->
```js
/// CHECK IF THIS IS BETTER:

//const disbursement_filter = disbursement_and_stage_filter.filter(project => {
//  const record_type = project["Project Record Type"];
//  const process_stage = project["Process Stage"];

//  const isFundOrInsurance = ["Fund", "Insurance"].includes(record_type);
//  const isAllowedStage = ["Transferred to Monitoring", "Executed Agreement"].includes(process_stage);

  // Exclude only if Fund/Insurance AND not in an allowed stage
//  if (isFundOrInsurance && !isAllowedStage) {
//    return false;
//  }

//  return true; // Keep everything else
//});

```
--->


**Step 5:**  Exclude anything where 'Project Record Type' is 'Project Development' or "Portfolio Company". Also remove any Insurance records where 'Process Stage' is not 'Contract Executed' (only allow for contract executed). 

 <!--
This looks like it's repeating logic from above.  Figure out what the filters were doing and clarify
-->



```js echo

const refined_filter = disbursement_filter_refined.filter(project => {

  const recordType = project["Project Record Type"];
  const processStage = project["Process Stage"];

  // Rule 1: Exclude Project Development and Portfolio Company entirely

  if (["Project Development", "Portfolio Company"].includes(recordType)) {
    return false;
  }

  // Rule 2: For Insurance, keep only if stage is 'Contract Executed'

  if (recordType === "Insurance" && processStage !== "Contract Executed") {
    return false;
  }

  // Everything else stays
  return true;

});

display(refined_filter);

```

**Step 6:** 

<!--

 

**Step 4:** Remove legacy projects, as indicated by having a 'Project Owner: Department' assigned to OPIC or a DFC department:

 

!! We no longer know why this is included.

 

(old crud)

 

```js echo

const disbursement_stage_and_owner_filter = disbursement_and_stage_filter.filter(project => {

  return !["OPIC", "Investment Office (IO)", "Office of the Chief Executive (OCE)", "Office of Development Policy (ODP)"].includes(project["Project Owner: Department"]);

});

display(disbursement_stage_and_owner_filter);

```

-->

 

<!--

New step - Operate on the 'non-insurance projects' to remove the ones that haven't disbursed.

 

NEW TO ADD: Remove anything that is Insurance and starts with 'IRC' or 'DAI' or "Unallocated Portion"

Let's start with 'refined_filter' as our data.  Now we wish to apply a filter for instances where 'Project Record Type' is 'Insurance' and 'Project Name' starts with either 'IRC' or 'DAI'.

We wish to return all results from the original dataset, except for those project where 'Project Record Type' is 'Insurance' and 'Project Name' starts with either 'IRC' or 'DAI'.

-->

 
<!--

Find a way to exclude non-active insurance and all TA project.

-->


```js echo

const insurance_irc_dai_filter = refined_filter.filter(project => {
  const recordType = project["Project Record Type"];
  const projectName = (project["Project Name"] || "");

  // Exclude if it's Insurance AND starts with IRC or DAI

  if (
    recordType === "Insurance" &&
    (projectName.startsWith("IRC") || projectName.startsWith("DAI"))
  ) {
    return false;
  }

  return true; // keep all other cases

});

display(insurance_irc_dai_filter);
```

 

```js echo
const cleaned_results = insurance_irc_dai_filter.filter(project => {

  const projectName = (project["Project Name"] || "");
  const currentDepartment = project["Current Department"] || "";

  // Exclude if name starts with 'Unallocated Portion'

  if (projectName.startsWith("Unallocated Portion")) {
    return false;
  }

  // Exclude if department is 'Technical Assistance'

  if (currentDepartment === "Technical Assistance") {
    return false;
  }

  // Keep everything else

  return true;

});

display(cleaned_results);
```

 

```js echo

const with_clearance_type = cleaned_results.filter(project => {

  const clearanceType = project["Clearance Type (RFC/RFA)"];

  // Keep only if it's not null/undefined and not an empty string after trimming

  return clearanceType !== null &&

         clearanceType !== undefined &&

         clearanceType.toString().trim() !== "";

});


display(with_clearance_type);

```



<!--

Ok, let's start from a dataset named 'insurance_irc_dai_filter'.  Please show me how to remove all project where 'Project Name' starts with 'Unallocated Portion' and also remove projects where 'Current Department' is 'Technical Assistance'.  Return the rest.

-->

 

**Step 7:** Remove all records before Dec 30, 2005:


```js echo

const disbursement_stage_and_owner_and_date_filter = cleaned_results.filter(project => new Date(project['Commitment Date']) >= new Date('2005-12-31'));


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

 

---

 

**Analysis and Next Steps**

 

The resulting dataset of ${disbursement_stage_and_owner_filter.length} differs from Justin's hand-crafted 'Active Project list' in that we're reporting out "investments funds" that aren't meant to be included.

 

!!! HERE!!!!!

 

Ways to advance - EXCLUDE guarantees from pre-DFC days.

... also need to exclude MTU from credit authority that were done pre-2019

1) if guarantee, and if date = pre 2019.

... look for indicators on the project page about 'if from a credit authority'



---

 

Active

 

1st check - is process stage; be inclusive : (leave in RFC completed pending review)

 

... first indicator that it's moving off the committed.

 

... some insurance projects don't have have a disbursement record

 

... first dibursement date

-or-

... insurance -> process stage -> contract executed == first disbursement

 

+++

... final legal agreement date

 

[INTEGRATES EXTERNAL REPORT BY OIF CALLED PorCo - supplied by OIC] - Justin adds project ID for parent project. ..... these are records that are not in Insight.  don't know what its called - only used by OIF. - (more useful in co-locating project) - reports to the ODP inbox.  

-> THEN, there is a 'newly added' tab, requested by Kate, identifying projcet that became active since last ran the list.  -> do a DIF

 

++ check the crack

1. commited + maturity date (if exists) == even if dates with no other fields, probably moving forward

2. activity in the project / proceedural actions actions meaning the project moving forward (requires going into the project)

 

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

 

<!-- ARCHIVE: -->

 

```js

//const process_stage_and_disbursement_or_legal_agreement_or_insurance_contract_executed = disbursement_and_stage_filter.filter(project => {

//  const finalLegalDate = project["Final Legal Agreement Date"];

//  const firstDisbursementDate = project["First Disbursement Date"];

//  const naicsSector = project["NAICS/Sector"];

//  const processStage = project["Process Stage"];

 

//  const hasValidDates = (finalLegalDate !== '' && finalLegalDate !== null && finalLegalDate !== undefined) ||

//                        (firstDisbursementDate !== '' && firstDisbursementDate !== null && firstDisbursementDate !== undefined);

 

//  const isFinanceAndInsuranceWithContractExecuted = (naicsSector === 'Finance and Insurance') &&

//                                                    (processStage && processStage.includes('Contract Executed'));

 

//  return hasValidDates || isFinanceAndInsuranceWithContractExecuted;

//});

//display(process_stage_and_disbursement_or_legal_agreement_or_insurance_contract_executed)

```

 

```js

//display(download(serializeToCSV(process_stage_and_disbursement_or_legal_agreement_or_insurance_contract_executed), "active-projects", "Save"))

```
