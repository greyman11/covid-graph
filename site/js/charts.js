const totalCasesUrl = 'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=overview&structure=%7B%22date%22:%22date%22,%22areaName%22:%22areaName%22,%22cumCasesBySpecimenDate%22:%22cumCasesBySpecimenDate%22%7D'
const totalNewCasesUrl = 'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=overview&structure=%7B%22date%22:%22date%22,%22areaName%22:%22areaName%22,%22newCasesBySpecimenDate%22:%22newCasesBySpecimenDate%22%7D'
const totalUkDeathsUrl = 'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=overview&structure=%7B%22date%22:%22date%22,%22areaName%22:%22areaName%22,%22cumDeaths28DaysByDeathDate%22:%22cumDeaths28DaysByDeathDate%22%7D'
const utlaListUrl = 'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=ltla&latestBy=newCasesBySpecimenDateRollingRate&structure=%7B%22areaName%22:%22areaName%22,%22newCasesBySpecimenDateRollingSum%22:%22newCasesBySpecimenDateRollingSum%22,%22newCasesBySpecimenDateRollingRate%22:%22newCasesBySpecimenDateRollingRate%22%7D'
const urlTimeRange = new URLSearchParams(window.location.search);
const timeRange = urlTimeRange.get('timeRange');
const singleLocation = urlTimeRange.get('location');
var totalTime = -timeRange;

//Function to create the cart.
function generateChart(
    dateRange,
    location) {

    var ctx = document.getElementById('myChart').getContext('2d');
    if (singleLocation == null) {
        var chartData = {
            labels: dateRange,
            datasets: [
                {
                    label: 'UK',
                    fill: true,
                    data: location,
                    backgroundColor: [
                        'grey'
                    ],
                    borderColor: [
                        'black'
                    ],
                    borderWidth: 2
                }
            ]
        };
    } else {
        //use this if a single location has been specified
        var chartData = {
            labels: dateRange,
            datasets: [
                {
                    label: singleLocation,
                    fill: true,
                    data: location,
                    backgroundColor: [
                        'grey'
                    ],
                    borderColor: [
                        'black'
                    ],
                    borderWidth: 2
                }
            ]
        };
    }

    var myChart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
            elements: {
                line: {
                   // tension: 1 // disables bezier curves
                }
            },
            responsive: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    gridLines: {
                        drawOnChartArea: false
                    }
                }],
                xAxes: [{
                    gridLines: {
                        drawOnChartArea: false
                    }
                }]
            },

        }
    });


}
//Function to grab the covid data from the government. 
async function loadDatas() {

    if (singleLocation == null) {
        const ukUrl = 'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=overview&structure=%7B%22date%22:%22date%22,%22areaName%22:%22areaName%22,%22newCasesBySpecimenDate%22:%22newCasesBySpecimenDate%22%7D'
        //pull the data for each region
        let durhamResponse = await fetch(ukUrl);

        //turn all regions into json
        let durhamData = await durhamResponse.json();

        //generate the date range
        var dateData = durhamData.data.map(function (item) {
            return item.date;
        });
        var dateRange = dateData.reverse().slice(0).slice(totalTime);

        //map each region and get new case
        var durhamCaseData = durhamData.data.map(function (item) {
            return item.newCasesBySpecimenDate;
        });
        

        //timeslice the data to get only the data for the specified time range
        var durhamCaseData = durhamCaseData.reverse().slice(0).slice(totalTime);

        //put the gathered data into the chart
        generateChart(dateRange, durhamCaseData);
    }
    else {
        const singleUrl = 'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=ltla;areaName=' + singleLocation + '&structure=%7B%22date%22:%22date%22,%22newCasesBySpecimenDate%22:%22newCasesBySpecimenDate%22%7D';
        $('#setLocation').text('- '+singleLocation);
        let singleResponse = await fetch(singleUrl);
        let singleData = await singleResponse.json();
        var dateData = singleData.data.map(function (item) {
            return item.date;
        });
        var dateRange = dateData.reverse().slice(0).slice(totalTime);
        var singleCaseData = singleData.data.map(function (item) {
            return item.newCasesBySpecimenDate;
        });
        var singleCaseData = singleCaseData.reverse().slice(0).slice(totalTime);
        generateChart(dateRange, singleCaseData);
    }
}

function buildTimeRange() {
    //If no location is set, we load the blank timerange list
    if (singleLocation == null) {
        $("#dropdown1").append('<li><a class="black-text" href="?timeRange=30">1 Month</a></li><li><a class="black-text" href="?timeRange=60">2 Months</a></li><li><a class="black-text" href="?timeRange=90">3 Months</a></li><li><a class="black-text" href="?timeRange=120">4 Months</a></li><li><a class="black-text" href="?timeRange=150">5 Months</a></li><li><a class="black-text" href="?timeRange=180">6 Months</a></li><li><a class="black-text" href="?">Clear Time</a></li>')
    } else {
        //if a location is specified, we load the modified urls which include the location
        $("#dropdown1").append('<li><a class="black-text" href="?location=' + singleLocation + '&timeRange=30">1 Month</a></li><li><a class="black-text" href="?location=' + singleLocation + '&timeRange=60">2 Months</a></li><li><a class="black-text" href="?location=' + singleLocation + '&timeRange=90">3 Months</a></li><li><a class="black-text" href="?location=' + singleLocation + '&timeRange=120">4 Months</a></li><li><a class="black-text" href="?location=' + singleLocation + '&timeRange=150">5 Months</a></li><li><a class="black-text" href="?location=' + singleLocation + '&timeRange=180">6 Months</a></li><li><a class="black-text" href="?location=' + singleLocation + '&">Clear Time</a></li>')
    }
}

async function getUkTotals(url) {
    totalCases = await fetch(url);
    totalCases = await totalCases.json();
    $("#totalCases").append(totalCases.data[0].cumCasesBySpecimenDate);

}

async function getUKNewCases(url) {
    totalCases = await fetch(url);
    totalCases = await totalCases.json();
    $("#newCases").append(totalCases.data[0].newCasesBySpecimenDate);

}

async function getUKTotalDeaths(url) {
    totalCases = await fetch(url);
    totalCases = await totalCases.json();
    $("#totalDeaths").append(totalCases.data[0].cumDeaths28DaysByDeathDate);

}

async function generateLocationLists(url) {
    totalCases = await fetch(url);
    totalCases = await totalCases.json();
    var areaList = totalCases.data.map(function (item) {
        return item.areaName;
    });
    $.each( areaList, function( i, val ) {
        if (timeRange == null) {
            $("#dropdown2").append('<li><a class="black-text" href="?location='+val+'">'+val+'</a></li>');
        } else {
            //if a timerange is set, load the modified urls which include the timerange
            $("#dropdown2").append('<li><a class="black-text" href="?location='+val+'&timeRange='+timeRange+'">'+val+'</a></li>'); }
        console.log(val);
    
      });
}


//fire off the functions
loadDatas();
buildTimeRange();
getUkTotals(totalCasesUrl);
getUKNewCases(totalNewCasesUrl);
getUKTotalDeaths(totalUkDeathsUrl);
generateLocationLists(utlaListUrl);