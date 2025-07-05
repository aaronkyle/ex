// See https://observablehq.com/framework/config for documentation.
export default {
  // The app’s title; used in the sidebar and webpage titles.
  title: "Prototype",

  // The pages and sections in the sidebar. If you don’t specify this option,
  // all pages will be listed in alphabetical order. Listing pages explicitly
  // lets you organize them into sections and have unlisted pages.
  // pages: [
  //   {
  //     name: "Examples",
  //     pages: [
  //       {name: "Dashboard", path: "/example-dashboard"},
  //       {name: "Report", path: "/example-report"}
  //     ]
  //   }
  // ],

  pages: [
    
    {
    name:  "Visualizations", 
    open: true,
    pages: [
      //{name: "Data Loader", path: "/index"},
      {name: "Commitments by Origination Office", path: "/portfolio/commitments-by-origination-office"},
      {name: "Commitments by E&S Team", path: "/portfolio/commitments-by-team"},
      {name: "Project Records by E&S Officer", path: "/portfolio/projects-by-ES-officer"},
      {name: "E&S -008 Portfolio Summary", path: "/portfolio/008-data-summary"},
    ],
},
{
  name: "Risk Screening", 
  open: true,
  pages: [
    {name: "PS7 - Inputs", path: "/oversight/ps7"},
    {name: "PS7 - Selection Views", path: "/oversight/conditional-views"},
    {name: "Reporting Input", path: "/oversight/report_input"},
    {name: "Reporting Output (Experimental)", path: "/oversight/report_output"},
    {name: "PS Clearance Section (Experimental)", path: "/oversight/ps7_clearance_template"},
    //{name: "Clearance Template (Draft)", path: "/clearance_template"}
  ]
},
{
  name: "Data Applications", 
  open: true,
  pages: [
    //{name: "wdpa", path: "/data/wdpa/"},
    {name: "World Database of Protected Areas", path: "https://s3.us-east-1.amazonaws.com/data.exchange/insight-explorer/external/world-database-of-protected-areas/index.html"},
    {name: "Key Biodiversity Areas", path: "https://s3.us-east-1.amazonaws.com/data.exchange/insight-explorer/external/key-biodiversity-areas/index.html"},
    {name: "PAD-US - Protected Areas Database", path: "https://s3.us-east-1.amazonaws.com/data.exchange/insight-explorer/external/PAD-US/index.html"},
    {name: "MassGIS Aerial Photography", path: "https://s3.us-east-1.amazonaws.com/data.exchange/insight-explorer/external/massgis-aerial-photography/index.html"},
      ],
},
    {
      name: "Overview",
      pages: [
        // { name: "Introduction", path: "/index" },
        { name: "Portfolio Ranking Model", path: "/risk/model" },
      ]
    },
    {
      name: "Assessment Tools & Methods",
      pages: [
        { name: "ES Risk Monitoring in Development Projects", path: "/risk/es-risk-monitoring-in-development-projects" },
        // { name: "Assessment Timing | When do assessments take place?", path: "/assessment-timing" },
        // { name: "Available Tools", path: "/available-tools" },
        // { name: "Sourcing Reference Documents", path: "/sourcing-reference-documents" },
        // { name: "Deriving E&S Indicators", path: "/deriving-es-indicators" },

        //        { name: "Demonstration Tables", path: "/demonstration-tables" }
      ]
    },
    {
      name: "Indices & Metrics",
      open: false,
      pages: [
        { name: "Contextual Risk Indices", path: "/indicies/contextual-risk-indices" },
        { name: "Air Emissions Inventories", path: "/indicies/air-emissions-inventories" },
        { name: "Bertelsmann Transformation Index", path: "/indicies/bertelsmann-transformation-index" },
        { name: "Climate Risk Index", path: "/indicies/climate-risk-index" },
        { name: "Corruption Perceptions Index", path: "/indicies/corruption-perceptions-index" },
        { name: "Country Risk Classifications", path: "/indicies/country-risk-classifications" },
        { name: "CPIA Gender Equality Rating", path: "/indicies/cpia-gender-equality-rating" },
        { name: "Environmental Performance Index", path: "/indicies/environmental-performance-index" },
        { name: "ESG Index", path: "/indicies/esg-index" },
        { name: "Fragile States Index", path: "/indicies/fragile-states-index" },
        { name: "Freedom Index", path: "/indicies/freedom-index" },
        { name: "Freedom in the World", path: "/indicies/freedom-in-the-world" },
        { name: "Gender Equality Index", path: "/indicies/gender-equality-index" },
        { name: "Gender Inequality Index", path: "/indicies/gender-inequality-index" },
        { name: "Global Rights Index", path: "/indicies/global-rights-index" },
        { name: "Human Freedom Index", path: "/indicies/human-freedom-index" },
        { name: "ND-GAIN Country Rankings", path: "/indicies/nd-gain-country-rankings" },
        { name: "Rule of Law Index", path: "/indicies/rule-of-law-index" },
        { name: "Social Institutions and Gender Index", path: "/indicies/social-institutions-and-gender-index" },
        { name: "World Risk Index", path: "/indicies/world-risk-index" },
        { name: "Worldwide Governance Indicators", path: "/indicies/worldwide-governance-indicators" }
      ]
    }
  ],

  // Content to add to the head of the page, e.g. for a favicon:
  head: '<link rel="icon" href="observable.png" type="image/png" sizes="32x32">',

  // The path to the source root.
  root: "src",

  // Some additional configuration options and their defaults:
  // theme: "default", // try "light", "dark", "slate", etc.
  // header: "", // what to show in the header (HTML)
  // footer: "Built with Observable.", // what to show in the footer (HTML)
  // sidebar: true, // whether to show the sidebar
  // toc: true, // whether to show the table of contents
  // pager: true, // whether to show previous & next links in the footer
  // output: "dist", // path to the output root for build
  // search: true, // activate search
  // linkify: true, // convert URLs in Markdown to links
  // typographer: false, // smart quotes and other typographic improvements
  // preserveExtension: false, // drop .html from URLs
  // preserveIndex: false, // drop /index from URLs
};
