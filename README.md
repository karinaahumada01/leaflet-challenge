# leaflet-challenge

**Overview**

This project visualizes real-time earthquake data using Leaflet, D3.js, and the USGS GeoJSON earthquake feed. The visualization is designed to display earthquakes with markers that vary in size and color based on their magnitude and depth, providing a clear, interactive view of recent seismic activity.

**Project Structure**

The project consists of the following components:

* index.html: The main HTML file that sets up the webpage, loads the necessary libraries, and initializes the map container.
* style.css: Custom styles for the webpage, primarily focusing on layout adjustments.
* logic.js: JavaScript file containing the logic for loading earthquake data, processing it, and rendering the map with dynamic markers and a legend.

**Instructions**

**Part 1: Create the Earthquake Visualization**

**1. Data Acquisition:**

* Visit the USGS GeoJSON Feed.
* Select a dataset (e.g., "All Earthquakes from the Past 7 Days") to visualize.
* Copy the URL for the JSON data and use it in the logic.js file to pull in the data for the visualization.

**2. Map Setup:**

* Map Creation: A Leaflet map is initialized and centered on the United States.
* Data Markers: Each earthquake is plotted on the map using a circle marker, with:
  * Size: Based on earthquake magnitude.
  * Color: Based on earthquake depth, with darker colors indicating greater depths.
* Popups: Clicking on a marker shows a popup with details

**References**

*ChatGPT was used for README outline and format, and troubleshooting errors for this project assignment.*

* OpenAI. (October, 2024). ChatGPT (GPT-4) [Large language model]. https://chat.openai.com/

*Xpert Learning Assistant was used for troubleshooting errors for this project assignment.*

* Xpert Learning Assistant. (2024). Retrieved from https://bootcampspot.instructure.com/
