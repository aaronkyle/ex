# Screening Layers


<link rel='stylesheet' href='https://unpkg.com/maplibre-gl@4.3.2/dist/maplibre-gl.css' />
<style>
  .maplibregl-popup-content{
    color: black;
}
</style>

```js
const container = display(html`<div style="width:620px; height:600px"></div>`)
```

```js
const image_selection = view(Inputs.radio(["clear", "2019", "2021", "elevation"], {
  label: "Select Image",
  value: "clear"
}))
```

```js
const tableOfContents = view(Inputs.checkbox(toc, {
  label: "Select Layers",
  value: toc.values()
}))
```


---

## Spatial Data
<br/>
<!--Because I have[ previously released this map using Leaflet.js](https://observablehq.com/@categorise/mapping-the-berkshires-environmental-conservation-areas), I will `import` my data from that notebook.-->


<!--- --- --->

<!--- We'll need to re-style the layers for maplibregl. As we do so, let's quickly also run through some summary information describing the data. --->

<!--- 


<!---

The Commonwealth of Massachusetts Bureau of Geographic Information ([MassGIS](https://www.mass.gov/orgs/massgis-bureau-of-geographic-information)) maintains an extensive, statewide database of spatial information for mapping and analysis supporting emergency response, environmental planning and management, transportation planning, economic development, and transparency in state government operations.

This map reproduces some of the MassGIS [data layers](https://www.mass.gov/info-details/massgis-data-layers) of relevance to environmental conservation, focusing on Berkshire County.



If you're interested to further explore state-level information, check out the [MassGIS webpage](https://www.mass.gov/orgs/massgis-bureau-of-geographic-information) and their [beautiful and interactive BioMap](https://biomap-mass-eoeea.hub.arcgis.com/), which shows data for the entire Commonwealth.

 --->

#### [Berkshire Towns](https://www.mass.gov/info-details/massgis-data-municipalities)


```js
const berkshire_towns = display(await FileAttachment("/data/berkshire_towns.geojson").json())
```
<!--
Information on town borders used for this map were sourced from the [Massachusetts Document Repository](https://web.archive.org/web/20180920101102/https://docs.digital.mass.gov/dataset/massgis-data-community-boundaries-towns), a state pilot project aimed at sharing information with the public. These data are now superseded by [MassGIS Municipalities data layer](https://www.mass.gov/info-details/massgis-data-municipalities).
-->

```js
const berkshire_towns_view = (mapRef, berkshire_towns) => {
  mapRef.addSource("berkshire_towns", {
    type: "geojson",
    data: berkshire_towns
  });
  mapRef.addLayer({
    id: "berkshire_towns",
    type: "line",
    source: "berkshire_towns",
    layout: {
      visibility: "visible"
    },
    paint: {
      "line-color": "orange",
      "line-width": 1.5,
      "line-opacity": 0.4
    }
  });

}
```

[**Areas of Critical Environmental Concern**](https://www.mass.gov/info-details/massgis-data-areas-of-critical-environmental-concern)


```js
const berkshires_acecs_poly = display(await FileAttachment("/data/berkshires_acecs_poly.geojson").json())
```

${Inputs.table(berkshires_acecs_poly.features.map(d => d.properties))}

<!--
Areas of Critical Environmental Concern are places in Massachusetts that receive special recognition because of the quality, uniqueness and significance of their natural and cultural resources.
-->

```js
{
  // Add event listener for click events on the map
  map.on("click", "berkshires_acecs_poly_fill", function (e) {
    const name = e.features.map((d) => d.properties["NAME"]);
    const designation_date = e.features.map((d) => d.properties["DES_DATE"]);
    const administrator = e.features.map((d) => d.properties["ADMIN_BY"]);
    new maplibregl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(
        `<p><strong>Name:</strong> ${name}</br><strong>Date Designated:</strong> ${designation_date}</br><strong>Administrator:</strong> ${administrator}</p>
`
      )
      .addTo(map);
  });
  // return "tooltip / pop-up";
}
```

```js
const berkshires_acecs_poly_view = (mapRef, berkshires_acecs_poly) => {
  mapRef.addSource("berkshires_acecs_poly", {
    type: "geojson",
    data: berkshires_acecs_poly
  });
  mapRef.addLayer({
    id: "berkshires_acecs_poly_fill",
    type: "fill",
    source: "berkshires_acecs_poly",
    layout: {
      visibility: "visible"
    },
    paint: {
      "fill-color": "#EE4031",
      "fill-opacity": 0.3
    }
  });
  mapRef.addLayer({
    id: "berkshires_acecs_poly_line",
    type: "line",
    source: "berkshires_acecs_poly",
    layout: {
      visibility: "visible"
    },
    paint: {
      "line-color": "#EE4031",
      "line-width": 1.5,
      "line-opacity": 0.4
    }
  });
}
```

[**BioMap**](https://www.mass.gov/info-details/massgis-data-biomap-the-future-of-conservation)


```js
const berkshires_BM2_CORE_HABITAT = display(await FileAttachment("/data/berkshires_BM2_CORE_HABITAT.geojson").json())
```

```js
const berkshires_BM2_CRITICAL_NATURAL_LANDSCAPE = display(await FileAttachment("/data/berkshires_BM2_CRITICAL_NATURAL_LANDSCAPE.geojson").json())
```
<!--
Data used here come from BioMap2, which was published in 2010 as a conservation plan to protect the state’s biodiversity over the next decade by focusing land protection and stewardship on the areas that are most critical for ensuring the long-term persistence of rare and other native species and their habitats, exemplary natural communities, and a diversity of ecosystems. BioMap2 is also designed to include the habitats and species of conservation concern identified in the State Wildlife Action Plan.

BioMap2 is comprised of two main components, each of which is further desegregated into areas of focus:

1. _Core Habitats_ identifies specific areas necessary to promote the long-term persistence of Species of Conservation Concern (those listed under the Massachusetts Endangered Species Act as well as additional species identified in the State Wildlife Action Plan), exemplary natural communities, and intact ecosystems.
-->

${Inputs.table(berkshires_BM2_CORE_HABITAT.features.map((d) => d.properties))}
   
<!--   
2. _Critical Natural Landscapes_ was created to identify and prioritize intact landscapes in Massachusetts that are better able to support ecological processes and disturbance regimes, and a wide array of species and habitats over long time frames.
-->

${Inputs.table(
  berkshires_BM2_CRITICAL_NATURAL_LANDSCAPE.features.map((d) => d.properties)
)}

This maps renders only a selection of the Core Habitats components that are particular interest for Berkshire County.  Please refer to the [BioMap details page](https://www.mass.gov/info-details/massgis-data-biomap-the-future-of-conservation) for a complete listing.  MassGIS also has [an interactive map of this dataset](https://gis.eea.mass.gov/portal/apps/webappviewer/index.html?id=e2b6c291e0294c3281488621aaa095bf).

```js
const berkshires_BM2_CORE_HABITAT_view = (mapRef, berkshires_BM2_CORE_HABITAT) => {
  mapRef.addSource("berkshires_BM2_CORE_HABITAT", {
    type: "geojson",
    data: berkshires_BM2_CORE_HABITAT
  });
  mapRef.addLayer({
    id: "berkshires_BM2_CORE_HABITAT_fill",
    type: "fill",
    source: "berkshires_BM2_CORE_HABITAT",
    layout: {
      visibility: "visible"
    },
    paint: {
      "fill-color": "#EE4031",
      "fill-opacity": 0.3
    }
  });
  mapRef.addLayer({
    id: "berkshires_BM2_CORE_HABITAT_line",
    type: "line",
    source: "berkshires_BM2_CORE_HABITAT",
    layout: {
      visibility: "visible"
    },
    paint: {
      "line-color": "#EE4031",
      "line-width": 1.5,
      "line-opacity": 0.4
    }
  });
}
```

```js
{
  // Add event listener for click events on the map
  map.on("click", "berkshires_BM2_CORE_HABITAT_fill", function (e) {
    const id = e.features.map((d) => d.properties["CH_ID"]);
    const acres = e.features.map((d) => d.properties["ACRES"]);
    const town = e.features.map((d) => d.properties["TOWN"]);
    new maplibregl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(
        `<p><strong>ID:</strong> ${id}</br><strong>Acres:</strong> ${acres}</br><strong>Town:</strong> ${town}</p>
`
      )
      .addTo(map);
  });
  // return "tooltip / pop-up";
}
```

```js
const berkshires_BM2_CRITICAL_NATURAL_LANDSCAPE_view = (mapRef, berkshires_BM2_CRITICAL_NATURAL_LANDSCAPE) => {
  mapRef.addSource("berkshires_BM2_CRITICAL_NATURAL_LANDSCAPE", {
    type: "geojson",
    data: berkshires_BM2_CRITICAL_NATURAL_LANDSCAPE
  });
  mapRef.addLayer({
    id: "berkshires_BM2_CRITICAL_NATURAL_LANDSCAPE_fill",
    type: "fill",
    source: "berkshires_BM2_CRITICAL_NATURAL_LANDSCAPE",
    layout: {
      visibility: "visible"
    },
    paint: {
      "fill-color": "#EE4031",
      "fill-opacity": 0.3
    }
  });
  mapRef.addLayer({
    id: "berkshires_BM2_CRITICAL_NATURAL_LANDSCAPE_line",
    type: "line",
    source: "berkshires_BM2_CRITICAL_NATURAL_LANDSCAPE",
    layout: {
      visibility: "visible"
    },
    paint: {
      "line-color": "#EE4031",
      "line-width": 1.5,
      "line-opacity": 0.4
    }
  });
}
```

```js
{
  // Add event listener for click events on the map
  map.on("click", "berkshires_BM2_CRITICAL_NATURAL_LANDSCAPE_fill", function (e) {
    const id = e.features.map((d) => d.properties["CNL_ID"]);
    const acres = e.features.map((d) => d.properties["ACRES"]);
    const town = e.features.map((d) => d.properties["TOWN"]);
    new maplibregl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(
        `<p><strong>ID:</strong> ${id}</br><strong>Acres:</strong> ${acres}</br><strong>Town:</strong> ${town}</p>
`
      )
      .addTo(map);
  });
  // return "tooltip / pop-up";
}
```

   - Forest Core

```js
const berkshires_BM2_CH_FOREST_CORE = display(await FileAttachment("/data/berkshires_BM2_CH_FOREST_CORE_wgs84.geojson").json())
```

${Inputs.table(berkshires_BM2_CH_FOREST_CORE.features.map(d => d.properties))}

BioMap2 Forest Core identifies the best examples of large, intact forests that are least impacted by roads and development, providing critical habitat for numerous woodland species.

```js
const berkshires_BM2_CH_FOREST_CORE_view = (
  mapRef,
  berkshires_BM2_CH_FOREST_CORE
) => {
  mapRef.addSource("berkshires_BM2_CH_FOREST_CORE", {
    type: "geojson",
    data: berkshires_BM2_CH_FOREST_CORE
  });
  mapRef.addLayer({
    id: "berkshires_BM2_CH_FOREST_CORE_fill",
    type: "fill",
    source: "berkshires_BM2_CH_FOREST_CORE",
    layout: {
      visibility: "visible"
    },
    paint: {
      "fill-color": "#2E7D32",
      "fill-opacity": 0.3
    }
  });
  mapRef.addLayer({
    id: "berkshires_BM2_CH_FOREST_CORE_line",
    type: "line",
    source: "berkshires_BM2_CH_FOREST_CORE",
    layout: {
      visibility: "visible"
    },
    paint: {
      "line-color": "#2E7D32",
      "line-width": 1.5,
      "line-opacity": 0.4
    }
  });
}
```

```js
{
  // Add event listener for click events on the map
  map.on("click", "berkshires_BM2_CH_FOREST_CORE_fill", function (e) {
    const id = e.features.map((d) => d.properties["CH_FC_ID"]);
    const acres = e.features.map((d) => d.properties["ACRES"]);
    new maplibregl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(
        `<p><strong>ID:</strong> ${id}</br><strong>Acres:</strong> ${acres}</p>
`
      )
      .addTo(map);
  });
  // return "tooltip / pop-up";
}
```

   - Aquatic Core & Buffer


```js
const berkshires_BM2_CH_AQUATIC_CORE = display(await FileAttachment("/data/berkshires_BM2_CH_AQUATIC_CORE_wgs84.geojson").json())
```

```js
const berkshires_BM2_CNL_AQUATIC_BUFFER = display(await FileAttachment("/data/berkshires_BM2_CNL_AQUATIC_BUFFER_simplified.geojson").json())
```

${Inputs.table(berkshires_BM2_CH_FOREST_CORE.features.map(d => d.properties))}

BioMap2 Aquatic Core contains integrated and functional ecosystems for fish species and other aquatic Species of Conservation Concern.

${Inputs.table(berkshires_BM2_CNL_AQUATIC_BUFFER.features.map(d => d.properties))}

The Aquatic Buffer identifies upland habitat adjacent to each Aquatic Core.


```js
const berkshires_BM2_CH_AQUATIC_CORE_view = (
  mapRef,
  berkshires_BM2_CH_AQUATIC_CORE
) => {
  mapRef.addSource("berkshires_BM2_CH_AQUATIC_CORE", {
    type: "geojson",
    data: berkshires_BM2_CH_AQUATIC_CORE
  });
  mapRef.addLayer({
    id: "berkshires_BM2_CH_AQUATIC_CORE_fill",
    type: "fill",
    source: "berkshires_BM2_CH_AQUATIC_CORE",
    layout: {
      visibility: "visible"
    },
    paint: {
      "fill-color": "#0C60F6",
      "fill-opacity": 0.3
    }
  });
  mapRef.addLayer({
    id: "berkshires_BM2_CH_AQUATIC_CORE_line",
    type: "line",
    source: "berkshires_BM2_CH_AQUATIC_CORE",
    layout: {
      visibility: "visible"
    },
    paint: {
      "line-color": "#0C60F6",
      "line-width": 1.5,
      "line-opacity": 0.4
    }
  });
}
```

```js
const berkshires_BM2_CNL_AQUATIC_BUFFER_view = (
  mapRef,
  berkshires_BM2_CNL_AQUATIC_BUFFER
) => {
  mapRef.addSource("berkshires_BM2_CNL_AQUATIC_BUFFER", {
    type: "geojson",
    data: berkshires_BM2_CNL_AQUATIC_BUFFER
  });
  mapRef.addLayer({
    id: "berkshires_BM2_CNL_AQUATIC_BUFFER_fill",
    type: "fill",
    source: "berkshires_BM2_CNL_AQUATIC_BUFFER",
    layout: {
      visibility: "visible"
    },
    paint: {
      "fill-color": "#0C60F6",
      "fill-opacity": 0.3
    }
  });
  mapRef.addLayer({
    id: "berkshires_BM2_CNL_AQUATIC_BUFFER_line",
    type: "line",
    source: "berkshires_BM2_CNL_AQUATIC_BUFFER",
    layout: {
      visibility: "visible"
    },
    paint: {
      "line-color": "#0C60F6",
      "line-width": 1.5,
      "line-opacity": 0.4
    }
  });
}
```

```js
{
  // Add event listener for click events on the map
  map.on("click", "berkshires_BM2_CNL_AQUATIC_BUFFER_fill", function (e) {
    const description = e.features.map((d) => d.properties["DESCRIP"]);
    const town = e.features.map((d) => d.properties["TOWN"]);
    new maplibregl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(
        `<p><strong>Description:</strong> ${description}</br><strong>Town:</strong> ${town}</p>
`
      )
      .addTo(map);
  });
  // return "tooltip / pop-up";
}
```

```js
{
  // Add event listener for click events on the map
  map.on("click", "berkshires_BM2_CH_AQUATIC_CORE_fill", function (e) {
    const id = e.features.map((d) => d.properties["CH_AC_ID"]);
    const town = e.features.map((d) => d.properties["TOWN"]);
    new maplibregl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(
        `<p><strong>ID:</strong> ${id}</br><strong>Town:</strong> ${town}</p>
`
      )
      .addTo(map);
  });
  // return "tooltip / pop-up";
}
```

   - Wetlands & Buffer


```js
const berkshires_BM2_CH_BIOMAP2_WETLANDS = display(await FileAttachment("/data/berkshires_BM2_CH_BIOMAP2_WETLANDS.geojson").json())
```

```js
const berkshires_BM2_CNL_WETLAND_BUFFER = display(await FileAttachment("/data/berkshires_BM2_CNL_WETLAND_BUFFER.geojson").json())
```

${Inputs.table(berkshires_BM2_CH_BIOMAP2_WETLANDS.features.map(d => d.properties))}

BioMap2 Wetlands identifies important wetland habitat in Massachusetts. It is a combination of the Wetland Core analysis that identified the most intact wetlands in Massachusetts, the wetlands present within the Priority Natural Communities data layer, and several Oxbows identified as important wetland habitat. A more detailed description of the Wetland Core analysis is present in the summary document. Wetland Cores and Priority Natural Community wetlands sometimes overlap.

The Wetland Buffer identifies upland habitat adjacent to each of the wetlands.

```js
const berkshires_BM2_CH_BIOMAP2_WETLANDS_view = (
  mapRef,
  berkshires_BM2_CH_BIOMAP2_WETLANDS
) => {
  mapRef.addSource("berkshires_BM2_CH_BIOMAP2_WETLANDS", {
    type: "geojson",
    data: berkshires_BM2_CH_BIOMAP2_WETLANDS
  });
  mapRef.addLayer({
    id: "berkshires_BM2_CH_BIOMAP2_WETLANDS_fill",
    type: "fill",
    source: "berkshires_BM2_CH_BIOMAP2_WETLANDS",
    layout: {
      visibility: "visible"
    },
    paint: {
      "fill-color": "#21BEDA",
      "fill-opacity": 0.3
    }
  });
  mapRef.addLayer({
    id: "berkshires_BM2_CH_BIOMAP2_WETLANDS_line",
    type: "line",
    source: "berkshires_BM2_CH_BIOMAP2_WETLANDS",
    layout: {
      visibility: "visible"
    },
    paint: {
      "line-color": "#21BEDA",
      "line-width": 1.5,
      "line-opacity": 0.4
    }
  });
}
```

```js
const berkshires_BM2_CNL_WETLAND_BUFFER_view = (
  mapRef,
  berkshires_BM2_CNL_WETLAND_BUFFER
) => {
  mapRef.addSource("berkshires_BM2_CNL_WETLAND_BUFFER", {
    type: "geojson",
    data: berkshires_BM2_CNL_WETLAND_BUFFER
  });
  mapRef.addLayer({
    id: "berkshires_BM2_CNL_WETLAND_BUFFER_fill",
    type: "fill",
    source: "berkshires_BM2_CNL_WETLAND_BUFFER",
    layout: {
      visibility: "visible"
    },
    paint: {
      "fill-color": "#21BEDA",
      "fill-opacity": 0.3
    }
  });
  mapRef.addLayer({
    id: "berkshires_BM2_CNL_WETLAND_BUFFER_line",
    type: "line",
    source: "berkshires_BM2_CNL_WETLAND_BUFFER",
    layout: {
      visibility: "visible"
    },
    paint: {
      "line-color": "#21BEDA",
      "line-width": 1.5,
      "line-opacity": 0.4
    }
  });
}
```

```js
{
  // Add event listener for click events on the map
  map.on("click", "berkshires_BM2_CH_BIOMAP2_WETLANDS_fill", function (e) {
    const id = e.features.map((d) => d.properties["CH_WET_ID"]);
    const description = e.features.map((d) => d.properties["CH_WET_ID"]);
    const town = e.features.map((d) => d.properties["TOWN"]);
    new maplibregl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(
        `<p><strong>ID:</strong> ${id}</br><strong>Description:</strong> ${description}</br><strong>Town:</strong> ${town}</p>
`
      )
      .addTo(map);
  });
  // return "tooltip / pop-up";
}

```

```js
{
  // Add event listener for click events on the map
  map.on("click", "berkshires_BM2_CNL_WETLAND_BUFFER_fill", function (e) {
    const description = e.features.map((d) => d.properties["CH_WET_ID"]);
    const town = e.features.map((d) => d.properties["TOWN"]);
    new maplibregl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(
        `<p><strong>Description:</strong> ${description}</br><strong>Town:</strong> ${town}</p>
`
      )
      .addTo(map);
  });
  // return "tooltip / pop-up";
}
```

   - Species of Conservation Concern


```js
const berkshires_BM2_CH_SPECIES_CONS_CONCERN = display(await FileAttachment("/data/berkshires_BM2_CH_SPECIES_CONS_CONCERN.geojson").json())
```

${Inputs.table(berkshires_BM2_CH_SPECIES_CONS_CONCERN.features.map(d => d.properties))}

This layer contains the combined BioMap2 footprint of all species listed under the Massachusetts Endangered Species Act in combination with all non-listed species present in the State Wildlife Action Plan that were mapped. Individual species information is not identified in this layer.

```js
const berkshires_BM2_CH_SPECIES_CONS_CONCERN_view = (
  mapRef,
  berkshires_BM2_CH_SPECIES_CONS_CONCERN
) => {
  mapRef.addSource("berkshires_BM2_CH_SPECIES_CONS_CONCERN", {
    type: "geojson",
    data: berkshires_BM2_CH_SPECIES_CONS_CONCERN
  });
  mapRef.addLayer({
    id: "berkshires_BM2_CH_SPECIES_CONS_CONCERN_fill",
    type: "fill",
    source: "berkshires_BM2_CH_SPECIES_CONS_CONCERN",
    layout: {
      visibility: "visible"
    },
    paint: {
      "fill-color": "#ECA71C",
      "fill-opacity": 0.3
    }
  });
  mapRef.addLayer({
    id: "berkshires_BM2_CH_SPECIES_CONS_CONCERN_line",
    type: "line",
    source: "berkshires_BM2_CH_SPECIES_CONS_CONCERN",
    layout: {
      visibility: "visible"
    },
    paint: {
      "line-color": "#ECA71C",
      "line-width": 1.5,
      "line-opacity": 0.4
    }
  });
}
```

```js
{
  // Add event listener for click events on the map
  map.on("click", "berkshires_BM2_CH_SPECIES_CONS_CONCERN_fill", function (e) {
    const id = e.features.map((d) => d.properties["CH_SOCC_ID"]);
    const town = e.features.map((d) => d.properties["TOWN"]);
    new maplibregl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(
        `<p><strong>Species ID:</strong> ${id}</br><strong>Town:</strong> ${town}</p>
`
      )
      .addTo(map);
  });
  // return "tooltip / pop-up";
}
```

   - Priority Natural Communities


```js
const berkshires_BM2_CH_PRIORITY_NATURAL_COMMS = display(await FileAttachment("/data/berkshires_BM2_CH_PRIORITY_NATURAL_COMMS.geojson").json())
```

${Inputs.table(berkshires_BM2_CH_PRIORITY_NATURAL_COMMS.features.map(d => d.properties))}

The BioMap2 Priority Natural Communities data set is maintained by the Massachusetts Natural Heritage and Endangered Species Program (NHESP). The NHESP Natural Communities datalayer representa the extent of various natural communities of biodiversity conservation interest in Massachusetts.

```js
const berkshires_BM2_CH_PRIORITY_NATURAL_COMMS_view = (
  mapRef,
  berkshires_BM2_CH_PRIORITY_NATURAL_COMMS
) => {
  mapRef.addSource("berkshires_BM2_CH_PRIORITY_NATURAL_COMMS", {
    type: "geojson",
    data: berkshires_BM2_CH_PRIORITY_NATURAL_COMMS
  });
  mapRef.addLayer({
    id: "berkshires_BM2_CH_PRIORITY_NATURAL_COMMS_fill",
    type: "fill",
    source: "berkshires_BM2_CH_PRIORITY_NATURAL_COMMS",
    layout: {
      visibility: "visible"
    },
    paint: {
      "fill-color": "#D68D04",
      "fill-opacity": 0.3
    }
  });
  mapRef.addLayer({
    id: "berkshires_BM2_CH_PRIORITY_NATURAL_COMMS_line",
    type: "line",
    source: "berkshires_BM2_CH_PRIORITY_NATURAL_COMMS",
    layout: {
      visibility: "visible"
    },
    paint: {
      "line-color": "#D68D04",
      "line-width": 1.5,
      "line-opacity": 0.4
    }
  });

}
```

```js
{
  // Add event listener for click events on the map
  map.on(
    "click",
    "berkshires_BM2_CH_PRIORITY_NATURAL_COMMS_fill",
    function (e) {
      const id = e.features.map((d) => d.properties["CH_PNC_ID"]);
      const type = e.features.map((d) => d.properties["PNC_TYPE"]);
      const description = e.features.map((d) => d.properties["TYPE_DESC"]);
      new maplibregl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
          `<p><strong>ID:</strong> ${id}</br><strong>Type:</strong> ${type}</br><strong>Description:</strong> ${description}</p>
`
        )
        .addTo(map);
    }
  );
  // return "tooltip / pop-up";
}
```

   - Vernal Pool Core


```js
const berkshires_BM2_CH_VERNAL_POOL_CORE = display(await FileAttachment("/data/berkshires_BM2_CH_VERNAL_POOL_CORE.geojson").json())
```


${Inputs.table(berkshires_BM2_CH_VERNAL_POOL_CORE.features.map(d => d.properties))}

The BioMap2 team used a GIS model developed by the University of Massachusetts Landscape Ecology Program to identify the top 5 percent most interconnected clusters of Potential Vernal Pools within each ecoregion.

```js
const berkshires_BM2_CH_VERNAL_POOL_CORE_view = (
  mapRef,
  berkshires_BM2_CH_VERNAL_POOL_CORE
) => {
  mapRef.addSource("berkshires_BM2_CH_VERNAL_POOL_CORE", {
    type: "geojson",
    data: berkshires_BM2_CH_VERNAL_POOL_CORE
  });
  mapRef.addLayer({
    id: "berkshires_BM2_CH_VERNAL_POOL_CORE_fill",
    type: "fill",
    source: "berkshires_BM2_CH_VERNAL_POOL_CORE",
    layout: {
      visibility: "visible"
    },
    paint: {
      "fill-color": "orange",
      "fill-opacity": 0.3
    }
  });
  mapRef.addLayer({
    id: "berkshires_BM2_CH_VERNAL_POOL_CORE_line",
    type: "line",
    source: "berkshires_BM2_CH_VERNAL_POOL_CORE",
    layout: {
      visibility: "visible"
    },
    paint: {
      "line-color": "orange",
      "line-width": 1.5,
      "line-opacity": 0.4
    }
  });
}
```

```js
{
  // Add event listener for click events on the map
  map.on("click", "berkshires_BM2_CH_VERNAL_POOL_CORE_fill", function (e) {
    const id = e.features.map((d) => d.properties["CH_VPC_ID"]);
    const town = e.features.map((d) => d.properties["TOWN"]);
    new maplibregl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(
        `<p><strong>Vernal Pool ID:</strong> ${id}</br><strong>Town:</strong> ${town}</p>
`
      )
      .addTo(map);
  });
  // return "tooltip / pop-up";
}
```

[**NHESP Priority Habitats of Rare Species**](https://www.mass.gov/info-details/massgis-data-nhesp-priority-habitats-of-rare-species)


```js
const berkshires_PRIHAB_POLY = display(await FileAttachment("/data/berkshires_PRIHAB_POLY.geojson").json())
```


${Inputs.table(berkshires_PRIHAB_POLY.features.map(d => d.properties))}

The Priority Habitats of Rare Species datalayer represents the geographic extent of Habitat of state-listed rare species in Massachusetts based on observations documented within the last 25 years in the database of the Natural Heritage & Endangered Species Program (NHESP).

```js
const berkshires_PRIHAB_POLY_view = (mapRef, berkshires_PRIHAB_POLY) => {
  mapRef.addSource("berkshires_PRIHAB_POLY", {
    type: "geojson",
    data: berkshires_PRIHAB_POLY
  });
  mapRef.addLayer({
    id: "berkshires_PRIHAB_POLY_fill",
    type: "fill",
    source: "berkshires_PRIHAB_POLY",
    layout: {
      visibility: "visible"
    },
    paint: {
      "fill-color": "green",
      "fill-opacity": 0.3
    }
  });
  mapRef.addLayer({
    id: "berkshires_PRIHAB_POLY_line",
    type: "line",
    source: "berkshires_PRIHAB_POLY",
    layout: {
      visibility: "visible"
    },
    paint: {
      "line-color": "green",
      "line-width": 1.5,
      "line-opacity": 0.4
    }
  });
}
```

```js
{
  // Add event listener for click events on the map
  map.on("click", "berkshires_PRIHAB_POLY_fill", function (e) {
    const id = e.features.map((d) => d.properties["PRIHAB_ID"]);
    const town = e.features.map((d) => d.properties["TOWN"]);
    new maplibregl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(
        `<p><strong>Habitat ID:</strong> ${id}</br><strong>Town:</strong> ${town}</p>
`
      )
      .addTo(map);
  });
  // return "tooltip / pop-up";
}
```

[**NHESP Estimated Habitats of Rare Wildlife**](https://www.mass.gov/info-details/massgis-data-nhesp-estimated-habitats-of-rare-wildlife)


```js
const berkshires_ESTHAB_POLY = display(await FileAttachment("/data/berkshires_ESTHAB_POLY.geojson").json())
```


${Inputs.table(berkshires_ESTHAB_POLY.features.map(d => d.properties))}

The Estimated Habitats of Rare Wildlife datalayer contains a subset of the Priority Habitats of Rare Species for use with the Wetlands Protection Act regulations (310 CMR 10.00). They are based on occurrences of rare wetland wildlife observed within the last 25 years and documented in the NHESP database. They do not include those areas delineated as Priority Habitat for rare plants or for rare wildlife with strictly upland habitat requirements.

```js
const berkshires_ESTHAB_POLY_view = (mapRef, berkshires_ESTHAB_POLY) => {
  mapRef.addSource("berkshires_ESTHAB_POLY", {
    type: "geojson",
    data: berkshires_ESTHAB_POLY
  });
  mapRef.addLayer({
    id: "berkshires_ESTHAB_POLY_fill",
    type: "fill",
    source: "berkshires_ESTHAB_POLY",
    layout: {
      visibility: "visible"
    },
    paint: {
      "fill-color": "green",
      "fill-opacity": 0.3
    }
  });
  mapRef.addLayer({
    id: "berkshires_ESTHAB_POLY_line",
    type: "line",
    source: "berkshires_ESTHAB_POLY",
    layout: {
      visibility: "visible"
    },
    paint: {
      "line-color": "green",
      "line-width": 1.5,
      "line-opacity": 0.4
    }
  });
}
```

```js
{
  // Add event listener for click events on the map
  map.on("click", "berkshires_ESTHAB_POLY_fill", function (e) {
    const id = e.features.map((d) => d.properties["ESTHAB_ID"]);
    const town = e.features.map((d) => d.properties["TOWN"]);
    new maplibregl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(
        `<p><strong>Habitat ID:</strong> ${id}</br><strong>Town:</strong> ${town}</p>
`
      )
      .addTo(map);
  });
  // return "tooltip / pop-up";
}
```

[**NHESP Natural Communities**](https://www.mass.gov/info-details/massgis-data-nhesp-natural-communities)


```js
const berkshires_NATCOMM_POLY = display(await FileAttachment("/data/berkshires_NATCOMM_POLY.geojson").json())
```

${Inputs.table(berkshires_NATCOMM_POLY.features.map(d => d.properties))}

The NHESP Natural Communities datalayer represents the extent of various natural communities of biodiversity conservation interest in Massachusetts. These polygons are based on records of natural communities maintained in the Natural Heritage & Endangered Species Program (NHESP) database.

```js
const berkshires_NATCOMM_POLY_view = (mapRef, berkshires_NATCOMM_POLY) => {
  mapRef.addSource("berkshires_NATCOMM_POLY", {
    type: "geojson",
    data: berkshires_NATCOMM_POLY
  });
  mapRef.addLayer({
    id: "berkshires_NATCOMM_POLY_fill",
    type: "fill",
    source: "berkshires_NATCOMM_POLY",
    layout: {
      visibility: "visible"
    },
    paint: {
      "fill-color": "#D68D04",
      "fill-opacity": 0.3
    }
  });
  mapRef.addLayer({
    id: "berkshires_NATCOMM_POLY_line",
    type: "line",
    source: "berkshires_NATCOMM_POLY",
    layout: {
      visibility: "visible"
    },
    paint: {
      "line-color": "#D68D04",
      "line-width": 1.5,
      "line-opacity": 0.4
    }
  });
}
```

```js
{
  // Add event listener for click events on the map
  map.on("click", "berkshires_NATCOMM_POLY_fill", function (e) {
    const id = e.features.map((d) => d.properties["UNIQUE_ID"]);
    const name = e.features.map((d) => d.properties["COMMUN_NAM"]);
    const description = e.features.map((d) => d.properties["SPECIFIC_D"]);
    const designation = e.features.map((d) => d.properties["	COMMUN_DES"]);
    const town = e.features.map((d) => d.properties["TOWN"]);
    new maplibregl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(
        `<p><strong>ID:</strong> ${id}</br><strong>Name:</strong> ${name}</br><strong>Description:</strong> ${description}</br><strong>Designation:</strong> ${designation}</br><strong>Town:</strong> ${town}</p>
`
      )
      .addTo(map);
  });
  // return "tooltip / pop-up";
}
```

---

[**Note:** In addition to the data layers, this map loads in two recent [ortho imagery (aerial photography)](https://www.mass.gov/info-details/massgis-data-layers#image-data-) as well as a [lidar digital elevation model (DEM)](https://www.mass.gov/info-details/massgis-data-lidar-dem-and-shaded-relief) layer from Mass.gov.]

```js
const massgis_2021_wmts_view = (mapRef) => {
    mapRef.addSource("massgis-2021-wmts", {
    type: "raster",
    tiles: [
"https://tiles.arcgis.com/tiles/hGdibHYSPO59RG1h/arcgis/rest/services/orthos2021/MapServer/WMTS/tile/1.0.0/orthos2021/default/default028mm/{z}/{y}/{x}.jpg"
    ],
    tileSize: 256,
    minzoom: 0,
    maxzoom: 20
  });
    mapRef.addLayer({
    id: "massgis-2021-wmts",
    type: "raster",
    source: "massgis-2021-wmts",
    layout: {
      visibility: "none"
    }
  });
}
```

```js
const massgis_2019_wmts_view = (mapRef) => {
    mapRef.addSource("massgis-2019-wmts", {
    type: "raster",
    tiles: [
"https://tiles.arcgis.com/tiles/hGdibHYSPO59RG1h/arcgis/rest/services/USGS_Orthos_2019/MapServer/WMTS/tile/1.0.0/USGS_Orthos_2019/default/default028mm/{z}/{y}/{x}.jpg"
    ],
    tileSize: 256,
    minzoom: 0,
    maxzoom: 20
  });
    mapRef.addLayer({
    id: "massgis-2019-wmts",
    type: "raster",
    source: "massgis-2019-wmts",
    layout: {
      visibility: "none"
    }
  });
}
```

```js
const massgis_elevation_hillshade = (mapRef) => {
  mapRef.addSource("massgis_elevation_hillshade", {
    type: "raster",
    tiles: [
      "https://tiles1.arcgis.com/tiles/hGdibHYSPO59RG1h/arcgis/rest/services/LiDAR_Elevation_Hillshade/MapServer/tile/{z}/{y}/{x}"
    ],
    tileSize: 256,
    minzoom: 0,
    maxzoom: 20
  });
  mapRef.addLayer({
    id: "massgis_elevation_hillshade",
    type: "raster",
    source: "massgis_elevation_hillshade",
    layout: {
      visibility: "none"
    }
  });
}
```

```js
const massgis_elevation_hillshade_visibility = (() => {
  // Check if the map style is loaded
  if (map.isStyleLoaded()) {
    // If loaded, set the visibility
    map.setLayoutProperty(
      "massgis_elevation_hillshade",
      "visibility",
      (image_selection.includes("elevation")) ? "visible" : "none"
    );
  } else {
    // If not loaded, wait for the 'load' event
    map.on('load', () => {
      map.setLayoutProperty(
        "massgis_elevation_hillshade",
        "visibility",
        (image_selection.includes("elevation")) ? "visible" : "none"
      );
    });
  }
  // return html`\`massgis_elevation_hillshade_visibility\``;
})();
```

```js
const massgis_2019_2021_wmts_visibility = (() => {
  const updateWMTSVisibility = () => {
    map.setLayoutProperty(
      "massgis-2021-wmts",
      "visibility",
      image_selection.includes("2021") ? "visible" : "none"
    );
    map.setLayoutProperty(
      "massgis-2019-wmts",
      "visibility",
      image_selection.includes("2019") ? "visible" : "none"
    );
  };

  // Check if the map style is loaded
  if (map.isStyleLoaded()) {
    // If loaded, update the visibility immediately
    updateWMTSVisibility();
  } else {
    // If not loaded, wait for the 'load' event
    map.on('load', updateWMTSVisibility);
  }

  // return html`\`massgis_2019_2021_wmts_visibility\``;
})();
```

```js
const layer_visibility = (() => {
  for (const entry of toc.values()) {
    for (const layer of entry.layers) {
      if (map.getLayer(layer)) {
        map.setLayoutProperty(
          layer,
          "visibility",
          tableOfContents.map((d) => d.label).includes(entry.label)
            ? "visible"
            : "none"
        );
      }
    }
  }
  // return tableOfContents;
})()
```

```js
const toc = new Map([
   // [
  //  "KBA",
  //  {
  //    label: "kba_2022_10_POL",
  //    layers: ["kba_2022_10_POL_fill", "kba_2022_10_POL_line", "kba-wms"]
 //   }
 // ],
    [
    "WDPA",
    {
      label: "wdpa-raster",
      layers: ["wdpa-vector", "wdpa-raster-fill"]
    }
  ],
  ["Town Boundaries", { label: "towns", layers: ["berkshire_towns"] }],
  [
    "Areas of Environmental Concern",
    {
      label: "acecs",
      layers: ["berkshires_acecs_poly_fill", "berkshires_acecs_poly_line"]
    }
  ],
  [
    "Species of Concern",
    {
      label: "species",
      layers: [
        "berkshires_BM2_CH_SPECIES_CONS_CONCERN_fill",
        "berkshires_BM2_CH_SPECIES_CONS_CONCERN_line"
      ]
    }
  ],
  [
    "Rare Wildlife Habitats",
    {
      label: "rare wildlife",
      layers: ["berkshires_PRIHAB_POLY_fill", "berkshires_PRIHAB_POLY_line"]
    }
  ],
  [
    "Estimated Rare Habitat",
    {
      label: "rare wildlife estimated",
      layers: ["berkshires_ESTHAB_POLY_fill", "berkshires_ESTHAB_POLY_line"]
    }
  ],
  [
    "Priority Communities",
    {
      label: "natural communities priority",
      layers: [
        "berkshires_BM2_CH_PRIORITY_NATURAL_COMMS_fill",
        "berkshires_BM2_CH_PRIORITY_NATURAL_COMMS_line"
      ]
    }
  ],
  [
    "Natural Communities",
    {
      label: "natural communities",
      layers: ["berkshires_NATCOMM_POLY_fill", "berkshires_NATCOMM_POLY_line"]
    }
  ],
  [
    "Forest Core",
    {
      label: "forest core",
      layers: [
        "berkshires_BM2_CH_FOREST_CORE_fill",
        "berkshires_BM2_CH_FOREST_CORE_line"
      ]
    }
  ],
  [
    "Aquatic Core",
    {
      label: "aquatic core",
      layers: [
        "berkshires_BM2_CH_AQUATIC_CORE_fill",
        "berkshires_BM2_CH_AQUATIC_CORE_line"
      ]
    }
  ],
  [
    "Aquatic Buffer",
    {
      label: "aquatic buffer",
      layers: [
        "berkshires_BM2_CNL_AQUATIC_BUFFER_fill",
        "berkshires_BM2_CNL_AQUATIC_BUFFER_line"
      ]
    }
  ],
  [
    "Wetlands Core",
    {
      label: "wetlands core",
      layers: [
        "berkshires_BM2_CH_BIOMAP2_WETLANDS_fill",
        "berkshires_BM2_CH_BIOMAP2_WETLANDS_line"
      ]
    }
  ],
  [
    "Wetlands Buffer",
    {
      label: "wetlands buffer",
      layers: [
        "berkshires_BM2_CNL_WETLAND_BUFFER_fill",
        "berkshires_BM2_CNL_WETLAND_BUFFER_line"
      ]
    }
  ],
  [
    "Vernal Pools",
    {
      label: "vernal pools",
      layers: [
        "berkshires_BM2_CH_VERNAL_POOL_CORE_fill",
        "berkshires_BM2_CH_VERNAL_POOL_CORE_line"
      ]
    }
  ]
])
```

```js
import * as shapefile from "npm:shapefile";
```



<!--
---

## Acknowledgements

_Thanks to [Adam Roberts](https://observablehq.com/@abenrob) for all the help to improve how layers are loaded and to [Mark McClure](https://observablehq.com/@mcmcclur) for pointing me to the correct methods to avoid redrawing the map._ </br>`:)`

---
-->


---

### Protected and Conserved Areas KBA Source Data


<!--
The map below renders data from the Protected Plant [World Database on Protected Areas ](https://www.protectedplanet.net/en/thematic-areas/wdpa?tab=WDPA) and BirdLife International [Key Biodiversity Areas](https://www.keybiodiversityareas.org/) datasets. 

-->
<!--


## World Database of Protected Areas (WDPA) 

The [World Database of Protected Areas](https://www.protectedplanet.net/en/thematic-areas/wdpa?tab=WDPA) (WDPA) is a comprehensive global database of marine and terrestrial protected areas and is one of the key global biodiversity datasets used by scientists, businesses, governments, international organizations and others to inform planning, policy decisions and management. 

The WDPA is a joint project between [UN Environment Programme](https://www.unep.org/) and the [International Union for Conservation of Nature](https://iucn.org/) (IUCN). The compilation and management of the WDPA is carried out by UN Environment Programme World Conservation Monitoring Centre ([UNEP-WCMC](https://www.unep-wcmc.org/en)), in collaboration with governments, non-governmental organisations, academia and industry. Data and information on the world's protected areas compiled in the WDPA are used for reporting to the [Convention on Biological Diversity](https://www.cbd.int/) on progress towards reaching the Aichi Biodiversity Targets (particularly Target 11), to the UN to track progress towards the 2030 Sustainable Development Goals, to some of the Intergovernmental Science-Policy Platform on Biodiversity and Ecosystem Services (IPBES) core indicators, and other international assessments and reports including the Global Biodiversity Outlook, as well as for the publication of the United Nations List of Protected Areas.

_Text adapted from:_ UNEP-WCMC and IUCN (2024), Protected Planet: The World Database on Protected Areas (WDPA)[On-line], [June 2024], Cambridge, UK: UNEP-WCMC and IUCN. Available at: https://doi.org/10.34892/6fwd-af11
-->









---


### KBA Source Data

<!--

The [World Database of Key Biodiversity Areas](https://wdkba.keybiodiversityareas.org/) is managed by [BirdLife International](https://www.birdlife.org/?gad_source=1&gclid=CjwKCAjw_Na1BhAlEiwAM-dm7KWRcYTD7g6NyuMKjliQLOCOBX18cuRseeMqS4x9gHeN-unck_h9yxoC4B0QAvD_BwE) on behalf of the [KBA Partnership](https://www.keybiodiversityareas.org/working-with-kbas/programme/partnership).<sup>[[*]](https://www.keybiodiversityareas.org/kba-news/wdkba)</sup> It hosts data on global and regional [Key Biodiversity Areas](https://www.keybiodiversityareas.org/) (KBAs), including Important Bird and Biodiversity Areas identified by the [BirdLife International Partnership](https://www.birdlife.org/partnership/), [Alliance for Zero Extinction](https://zeroextinction.org/) sites, KBAs identified through hotspot ecosystem profiles supported by the [Critical Ecosystem Partnership Fund](https://www.cepf.net/), and a small number of other KBAs. The database was developed from the [World Bird and Biodiversity Database (WBDB)](https://www.globalconservation.info/) managed by BirdLife International.

-->

```js
const kba_wms_view = (mapRef) => {
    mapRef.addSource('kba-wms', {
                'type': 'raster',
                'tiles': [
                    proxyUrl + 'https://birdlaa8.birdlife.org/geoserver/gwc/service/wms?service=WMS&request=GetMap&layers=birdlife_dz:ibas_global_2024_wm&styles=&format=image/png&transparent=true&version=1.1.1&height=256&width=256&srs=EPSG:3857&bbox={bbox-epsg-3857}'
                ],
                'tileSize': 256
            });

    mapRef.addLayer({
                'id': 'kba-wms',
                'type': 'raster',
                'source': 'kba-wms',
                'paint': { 'raster-opacity': 1 }
            });
            }
```






```js
// archival and unofficial copy of "https://birdlaa8.birdlife.org/geoserver/wfs?SERVICE=WFS&VERSION=1.0.0&REQUEST=GetFeature&TYPENAME=birdlife_dz:ibas_pol_20240515_wm_selected&OUTPUTFORMAT=application/json"

const kba_2022_10_POL = display(await FileAttachment("/data/kba-2022-10-poly-simp.geojson").json())
```

```js
const kba_2022_10_POL_view = (mapRef, kba_2022_10_POL) => {
  mapRef.addSource("kba_2022_10_POL", {
    type: "geojson",
    data: kba_2022_10_POL
  });
  mapRef.addLayer({
    id: "kba_2022_10_POL_fill",
    type: "fill",
    source: "kba_2022_10_POL",
    layout: {
      visibility: "visible"
    },
    paint: {
      "fill-color": "yellow",
      "fill-opacity": 0.05
    }
  });

  mapRef.addLayer({
    id: "kba_2022_10_POL_line",
    type: "line",
    source: "kba_2022_10_POL",
    layout: {
      visibility: "visible"
    },
    paint: {
      "line-color": "yellow",
      "line-width": 0.01,
      "line-opacity": 0.3
    }
  });

  // Add popup functionality
  mapRef.on('click', 'kba_2022_10_POL_fill', function (e) {
    const feature = e.features[0];
    const properties = feature.properties;

    // Create the popup content
    const popupContent = `
      <p>
        <strong>${properties['IntName']}</strong><br />
        <strong>Site ID:</strong> ${properties['SitRecID']}<br />
        <strong>Triggers:</strong> ${properties['triggers']}<br />
        <strong>Country:</strong> ${properties['Country']}<br />
        <strong>Region:</strong> ${properties['Region']}
      </p>
    `;

    // Create a new popup and set its coordinates and content
    new maplibregl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(popupContent)
      .addTo(mapRef);
  });

  // Change the cursor to a pointer when the mouse is over the polygon layer
  mapRef.on('mouseenter', 'kba_2022_10_POL_fill', function () {
    mapRef.getCanvas().style.cursor = 'pointer';
  });

  // Change the cursor back to default when the mouse leaves the polygon layer
  mapRef.on('mouseleave', 'kba_2022_10_POL_fill', function () {
    mapRef.getCanvas().style.cursor = '';
  });
};
```


```js
const nat_geo = (mapRef) => {
  mapRef.addSource("nat_geo", {
    type: "raster",
    tiles: [
      "https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}"
    ],
    minzoom: 0,
    maxzoom: 16
  });
  mapRef.addLayer({
    id: "nat_geo",
    type: "raster",
    source: "nat_geo",
    layout: {
      visibility: "none"
    }
  });
}
```

```js
const nat_geo_visibility = (() => {
  // Check if the map style is loaded
  if (map.isStyleLoaded()) {
    // If loaded, set the visibility
    map.setLayoutProperty(
      "nat_geo",
      "visibility",
      (image_selection.includes("NatGeo World Map")) ? "visible" : "none"
    );
  } else {
    // If not loaded, wait for the 'load' event
    map.on('load', () => {
      map.setLayoutProperty(
        "nat_geo",
        "visibility",
        (image_selection.includes("NatGeo World Map")) ? "visible" : "none"
      );
    });
  }
  return `nat_geo_visibility`;
})();
```

```js
const usgs_topo = (mapRef) => {
  mapRef.addSource("usgs_topo", {
    type: "raster",
    tiles: [
      "https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}"
    ],
    minzoom: 0,
    maxzoom: 16
  });
  mapRef.addLayer({
    id: "usgs_topo",
    type: "raster",
    source: "usgs_topo",
    layout: {
      visibility: "none"
    }
  });
}
```

```js
const usgs_topo_visibility = (() => {
  // Check if the map style is loaded
  if (map.isStyleLoaded()) {
    // If loaded, set the visibility
    map.setLayoutProperty(
      "usgs_topo",
      "visibility",
      (image_selection.includes("USGS Topographic")) ? "visible" : "none"
    );
  } else {
    // If not loaded, wait for the 'load' event
    map.on('load', () => {
      map.setLayoutProperty(
        "usgs_topo",
        "visibility",
        (image_selection.includes("USGS Topographic")) ? "visible" : "none"
      );
    });
  }
  return `usgs_topo_visibility`;
})();
```

```js
const world_imagery = (mapRef) => {
  mapRef.addSource("world_imagery", {
    type: "raster",
    tiles: [
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
    ],
    minzoom: 0,
    maxzoom: 16
  });
  mapRef.addLayer({
    id: "world_imagery",
    type: "raster",
    source: "world_imagery",
    layout: {
      visibility: "none"
    }
  });
}
```

```js
const world_imagery_visibility = (() => {
  // Check if the map style is loaded
  if (map.isStyleLoaded()) {
    // If loaded, set the visibility
    map.setLayoutProperty(
      "world_imagery",
      "visibility",
      (image_selection.includes("World Imagery")) ? "visible" : "none"
    );
  } else {
    // If not loaded, wait for the 'load' event
    map.on('load', () => {
      map.setLayoutProperty(
        "world_imagery",
        "visibility",
        (image_selection.includes("World Imagery")) ? "visible" : "none"
      );
    });
  }
  return `world_imagery_visibility`;
})();
```

```js
const terrain = (mapRef) => {
  mapRef.addSource("terrain", {
    type: "raster",
    tiles: [
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}"
    ],
    minzoom: 0,
    maxzoom: 16
  });
  mapRef.addLayer({
    id: "terrain",
    type: "raster",
    source: "terrain",
    layout: {
      visibility: "none"
    }
  });
}
```

```js
const terrain_visibility = (() => {
  // Check if the map style is loaded
  if (map.isStyleLoaded()) {
    // If loaded, set the visibility
    map.setLayoutProperty(
      "terrain",
      "visibility",
      (image_selection.includes("World Terrain Base")) ? "visible" : "none"
    );
  } else {
    // If not loaded, wait for the 'load' event
    map.on('load', () => {
      map.setLayoutProperty(
        "terrain",
        "visibility",
        (image_selection.includes("World Terrain Base")) ? "visible" : "none"
      );
    });
  }
  return `terrain_visibility`;
})();
```

```js
const topo = (mapRef) => {
  mapRef.addSource("topo", {
    type: "raster",
    tiles: [
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
    ],
    minzoom: 0,
    maxzoom: 16
  });
  mapRef.addLayer({
    id: "topo",
    type: "raster",
    source: "topo",
    layout: {
      visibility: "none"
    }
  });
}
```

```js
const topo_visibility = (() => {
  // Check if the map style is loaded
  if (map.isStyleLoaded()) {
    // If loaded, set the visibility
    map.setLayoutProperty(
      "topo",
      "visibility",
      (image_selection.includes("ESRI Topographic")) ? "visible" : "none"
    );
  } else {
    // If not loaded, wait for the 'load' event
    map.on('load', () => {
      map.setLayoutProperty(
        "topo",
        "visibility",
        (image_selection.includes("ESRI Topographic")) ? "visible" : "none"
      );
    });
  }
   return `topo_visibility`;
})();
```

```js
const blue_marble = (mapRef) => {
  mapRef.addSource("blue_marble", {
    type: "raster",
    tiles: [
        "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_NextGeneration/default/GoogleMapsCompatible_Level8/{z}/{y}/{x}.jpeg"
      ],
    tileSize: 256,
    minzoom: 0,
    maxzoom: 16
  });
  mapRef.addLayer({
    id: "blue_marble",
    type: "raster",
    source: "blue_marble",
    layout: {
      visibility: "none"
    }
  });
}
```

```js
const blue_marble_visibility = (() => {
  // Check if the map style is loaded
  if (map.isStyleLoaded()) {
    // If loaded, set the visibility
    map.setLayoutProperty(
      "blue_marble",
      "visibility",
      (image_selection.includes("NASA Blue Marble")) ? "visible" : "none"
    );
  } else {
    // If not loaded, wait for the 'load' event
    map.on('load', () => {
      map.setLayoutProperty(
        "blue_marble",
        "visibility",
        (image_selection.includes("NASA Blue Marble")) ? "visible" : "none"
      );
    });
  }
  return `blue_marble_visibility`;
})();
```


```js
const layer_visibility = (() => {
  for (const entry of toc.values()) {
    for (const layer of entry.layers) {
      if (map.getLayer(layer)) {
        map.setLayoutProperty(
          layer,
          "visibility",
          tableOfContents.map((d) => d.label).includes(entry.label)
            ? "visible"
            : "none"
        );
      }
    }
  }
  return tableOfContents;
})()
```

```js
const map = (() => {
  // Create the "map" object with the maplibregl.Map constructor, referencing the container div

  const mapRef = (container.value = new maplibregl.Map({
    container: container,
    center: [172.5,-43],
    zoom: 4,
    pitch: 0,
    bearing: 0,
    maplibreglLogo: false,
    style: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
    attributionControl: false
  }));

  // Add some navigation controls.
  mapRef.addControl(new maplibregl.NavigationControl(), "top-right");

  // If this cell is invalidated, dispose of the map.
  invalidation.then(() => mapRef.remove());


  // The map must be loaded before we can add sources.
  new Promise((resolve, reject) => {
    mapRef.on("load", async () => {

      nat_geo(mapRef);
      world_imagery(mapRef);
      terrain(mapRef);
      blue_marble(mapRef);
      topo(mapRef);
      usgs_topo(mapRef);

      //kba_wms_view(mapRef);
      kba_2022_10_POL_view(mapRef, kba_2022_10_POL);

      massgis_2019_wmts_view(mapRef);
      massgis_2021_wmts_view(mapRef);
      massgis_elevation_hillshade(mapRef);



      berkshire_towns_view(mapRef, berkshire_towns);


      berkshires_BM2_CH_FOREST_CORE_view(mapRef, berkshires_BM2_CH_FOREST_CORE);

      berkshires_acecs_poly_view(mapRef, berkshires_acecs_poly);

      berkshires_BM2_CH_AQUATIC_CORE_view(
        mapRef,
        berkshires_BM2_CH_AQUATIC_CORE
      );

      berkshires_BM2_CNL_AQUATIC_BUFFER_view(
        mapRef,
        berkshires_BM2_CNL_AQUATIC_BUFFER
      );

      berkshires_BM2_CH_BIOMAP2_WETLANDS_view(
        mapRef,
        berkshires_BM2_CH_BIOMAP2_WETLANDS
      );

      berkshires_BM2_CNL_WETLAND_BUFFER_view(
        mapRef,
        berkshires_BM2_CNL_WETLAND_BUFFER
      );

      berkshires_BM2_CH_SPECIES_CONS_CONCERN_view(
        mapRef,
        berkshires_BM2_CH_SPECIES_CONS_CONCERN
      );

      berkshires_BM2_CH_PRIORITY_NATURAL_COMMS_view(
        mapRef,
        berkshires_BM2_CH_PRIORITY_NATURAL_COMMS
      );

      berkshires_BM2_CH_VERNAL_POOL_CORE_view(
        mapRef,
        berkshires_BM2_CH_VERNAL_POOL_CORE
      );

      berkshires_PRIHAB_POLY_view(mapRef, berkshires_PRIHAB_POLY);
      berkshires_ESTHAB_POLY_view(mapRef, berkshires_ESTHAB_POLY);
      berkshires_NATCOMM_POLY_view(mapRef, berkshires_NATCOMM_POLY);

    });
  });

  return mapRef;

})();

```


```js
const bounds = map.getBounds();
```


```js
const updateBoundingBoxObject = (mapRef) => {
  // Create an initial bounding box object
  const bbox = {
    north: mapRef.getBounds().getNorth(),
    south: mapRef.getBounds().getSouth(),
    east: mapRef.getBounds().getEast(),
    west: mapRef.getBounds().getWest(),
  };

  // Create a generator function to handle reactivity
  return Generators.observe((push, end) => {
    const update = () => {
      bbox.north = mapRef.getBounds().getNorth();
      bbox.south = mapRef.getBounds().getSouth();
      bbox.east = mapRef.getBounds().getEast();
      bbox.west = mapRef.getBounds().getWest();
      push({...bbox}); // Push updated bbox
    };

    update(); // Initial update

    // Update when the map's view changes
    mapRef.on("moveend", update);

    return () => mapRef.off("moveend", update); // Cleanup function
  });
};
```

```js
const boundingBox = updateBoundingBoxObject(map);
```


```js
function getVisibleFeatures(geojson, boundingBox) {
  if (!geojson || !geojson.features || !boundingBox) {
    throw new Error('Invalid arguments');
  }

  // Create a turf bounding box polygon
  const bboxPolygon = turf.bboxPolygon([
    boundingBox.west,
    boundingBox.south,
    boundingBox.east,
    boundingBox.north
  ]);

  // Filter features based on whether they intersect with the bounding box polygon
  const visibleFeatures = geojson.features.filter(feature => {
    // Check if the feature intersects with the bounding box polygon
    return turf.booleanIntersects(bboxPolygon, feature);
  });

  // Return the filtered GeoJSON object
  return {
    type: 'FeatureCollection',
    features: visibleFeatures
  };
}
```

```js
const visibleFeatures = getVisibleFeatures(kba_2022_10_POL, boundingBox);
```



```js
const proxyUrl = 'https://corsproxy.io/?';
```

```js
import {booleanIntersects, bboxPolygon} from "https://esm.sh/@turf/turf@6";
```

```js
const turf = { booleanIntersects, bboxPolygon };
```


```js
import maplibregl from 'npm:maplibre-gl';
import FeatureService from 'npm:mapbox-gl-arcgis-featureserver';
```
