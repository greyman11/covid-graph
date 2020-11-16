import { clearLocation } from './clearLocation.js';
import {generateLineChart, loadDatas, loadDoughnutDatas} from './generateLineChart.js'
import { generateLocationLists } from './generateLocationLists.js';
import { getStatsTotal } from './getStatsTotal.js';
import { loadFromSearch } from './loadFromSearch.js';

//Defined variables
const urlTimeRange = new URLSearchParams(window.location.search);
export const timeRange = urlTimeRange.get('timeRange');
export const singleLocation = urlTimeRange.get('location');
export var totalTime = -timeRange;
const utlaListUrl = 'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=ltla&latestBy=newCasesBySpecimenDateRollingRate&structure=%7B%22areaName%22:%22areaName%22,%22newCasesBySpecimenDateRollingSum%22:%22newCasesBySpecimenDateRollingSum%22,%22newCasesBySpecimenDateRollingRate%22:%22newCasesBySpecimenDateRollingRate%22%7D'
const totalNewCasesUrl = 'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=overview&structure=%7B%22date%22:%22date%22,%22areaName%22:%22areaName%22,%22newCasesBySpecimenDate%22:%22newCasesBySpecimenDate%22%7D'
const totalCasesUrl = 'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=overview&structure=%7B%22date%22:%22date%22,%22areaName%22:%22areaName%22,%22cumCasesBySpecimenDate%22:%22cumCasesBySpecimenDate%22%7D'
const totalRegionCasesUrl = 'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=ltla;areaName='+singleLocation+'&latestBy=cumCasesByPublishDate&structure=%7B%22date%22:%22date%22,%22value%22:%22cumCasesByPublishDate%22%7D'
const totalRegionNewCasesUrl = 'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=ltla;areaName='+singleLocation+'&latestBy=newCasesByPublishDate&structure=%7B%22date%22:%22date%22,%22value%22:%22newCasesByPublishDate%22%7D'
const totalUkDeathsUrl = 'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=overview&structure=%7B%22date%22:%22date%22,%22areaName%22:%22areaName%22,%22cumDeaths28DaysByDeathDate%22:%22cumDeaths28DaysByDeathDate%22%7D'
const totalRegionDeathsUrl = 'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=ltla;areaName='+singleLocation+'&latestBy=cumDeaths28DaysByPublishDate&structure=%7B%22date%22:%22date%22,%22value%22:%22cumDeaths28DaysByPublishDate%22%7D'


//sitelayout
//generate site outline
$('#root').append('<div id="navRow"></div><div id="searchRow"></div><div id="statsRow"></div><div id="chartRow"></div><div id="tableRow"></div>');
//generate the Navbar..
if (singleLocation !== null){
    $('#navRow').append('<div class="columns"><div class="column is-three-fifths is-offset-one-fifth"><section class="hero is-dark "><div class="hero-body"><div class="container"><h1 class="title">Covid Stats</h1><h2 class="subtitle">for '+singleLocation+'</h2></div></div></section><span>v20.11.26</span></div></div>');
} else {
    $('#navRow').append('<div class="columns"><div class="column is-three-fifths is-offset-one-fifth"><section class="hero is-dark "><div class="hero-body"><div class="container"><h1 class="title">Covid Stats</h1><h2 class="subtitle">for the UK</h2></div></div></section><span>v20.11.26</span></div></div>');
}
//generate searchbar
$('#searchRow').append('<div class="columns"><div class="column is-three-fifths is-offset-one-fifth"><section><input list="ddLocations" id="pickLocation" class="input" type="text" placeholder="Search for an area.."></section><br><section><button id="locationButton" class="button is-info">submit</button> <button id="clearLocationButton" class="button is-info" style="display:none;">Clear Location</button></section><datalist id="ddLocations"></datalist></div></div>');
//generate chart view
$('#chartRow').append('<div class=columns><div class="column column is-three-fifths is-offset-one-fifth"><div class="columns"><div class="column"><section>Cases Per Day</section><canvas id="myChart" width="100" height="100"></canvas></div><div class="column"><section>Cases by Region (last 7 days)</section><canvas id="myDoughnutChart" width="100" height="100"></canvas></div></div></div></div>');
//generate chart view
$('#statsRow').append('<div class=columns><div class="column column is-three-fifths is-offset-one-fifth"><div class="columns"><div class="column"><h2 class="is-size-4">Yesterday New Cases</h2><span class="is-size-3"id="newCases"></span></div><div class="column"><h2 class="is-size-4">Total Cases</h2><span class="is-size-3" id="totalCases"></span></div><div class="column"><h2 class="is-size-4">Total Deaths</h2><span class="is-size-3" id="totalDeaths"></span></div></div></div></div>');
//Firing of functions + buttons
$("#locationButton").click(function () {
    loadFromSearch();
});
$("#clearLocationButton").click(function () {
    clearLocation();
});
if (singleLocation !== null) {
    $( "#clearLocationButton" ).toggle();
}

generateLocationLists(utlaListUrl);

if (singleLocation !== null) {
    getStatsTotal(totalRegionCasesUrl, 'totalCases');
    getStatsTotal(totalRegionNewCasesUrl, 'newCases');
    getStatsTotal(totalRegionDeathsUrl, 'totalDeaths')
} else {
    getStatsTotal(totalNewCasesUrl, 'newCases');
    getStatsTotal(totalCasesUrl, 'totalCases');
    getStatsTotal(totalUkDeathsUrl, 'totalDeaths');
}
loadDatas();
loadDoughnutDatas();
