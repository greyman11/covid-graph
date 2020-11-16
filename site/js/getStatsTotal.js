import { singleLocation } from './contents.js';

export async function getStatsTotal(url, location) {
    totalCases = await fetch(url);
    totalCases = await totalCases.json();
    console.log(totalCases);
    if (location == 'newCases' && singleLocation !== null) {
        var output = totalCases.data[0].value;
    } else if (location == 'newCases') {
        var output = totalCases.data[0].newCasesBySpecimenDate;
    } else if (location == 'totalCases' && singleLocation !== null) {
        var output = totalCases.data[0].value;
    } else if (location == 'totalCases') {
        var output = totalCases.data[0].cumCasesBySpecimenDate;
    } else if (location == 'totalDeaths' && singleLocation !== null) {
        var output = totalCases.data[0].value;
    } else {
        var output = totalCases.data[0].cumDeaths28DaysByDeathDate;
    }
    $("#" + location).append(output);
}
