const durhamUrl = 'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=ltla;areaName=County%2520Durham&structure=%7B%22date%22:%22date%22,%22newCasesBySpecimenDate%22:%22newCasesBySpecimenDate%22%7D';
const sunderlandUrl = 'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=ltla;areaName=Sunderland&structure=%7B%22date%22:%22date%22,%22newCasesBySpecimenDate%22:%22newCasesBySpecimenDate%22%7D';
const hartlepoolUrl = 'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=ltla;areaName=Hartlepool&structure=%7B%22date%22:%22date%22,%22newCasesBySpecimenDate%22:%22newCasesBySpecimenDate%22%7D';
const middlesbroughUrl = 'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=ltla;areaName=Middlesbrough&structure=%7B%22date%22:%22date%22,%22newCasesBySpecimenDate%22:%22newCasesBySpecimenDate%22%7D';
const stocktonUrl = 'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=ltla;areaName=Stockton-on-Tees&structure=%7B%22date%22:%22date%22,%22newCasesBySpecimenDate%22:%22newCasesBySpecimenDate%22%7D';
const darlingtonUrl = 'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=ltla;areaName=Darlington&structure=%7B%22date%22:%22date%22,%22newCasesBySpecimenDate%22:%22newCasesBySpecimenDate%22%7D';
const newcastleUrl = 'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=ltla;areaName=Newcastle%2520upon%2520Tyne&structure=%7B%22date%22:%22date%22,%22newCasesBySpecimenDate%22:%22newCasesBySpecimenDate%22%7D';
const gatesheadUrl = 'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=ltla;areaName=Gateshead&structure=%7B%22date%22:%22date%22,%22newCasesBySpecimenDate%22:%22newCasesBySpecimenDate%22%7D';
const urlTimeRange = new URLSearchParams(window.location.search);
const timeRange = urlTimeRange.get('timeRange');
const singleLocation = urlTimeRange.get('location');
var totalTime = -timeRange;

//Function to create the cart.
function generateChart(
    dateRange,
    durham,
    sunderland,
    hartlepool,
    middlesbrough,
    stockton,
    darlington,
    newcastle,
    gateshead) {

    var ctx = document.getElementById('myChart').getContext('2d');
    if (singleLocation == null) {
        var chartData = {
            labels: dateRange,
            datasets: [
                {
                    label: 'County Durham',
                    fill: false,
                    data: durham,
                    backgroundColor: [
                        'rgba(230, 25, 75, 0.2)'
                    ],
                    borderColor: [
                        'rgba(230, 25, 75, 1)'
                    ],
                    borderWidth: 2
                },
                {
                    label: 'Sunderland',
                    fill: false,
                    data: sunderland,
                    backgroundColor: [

                        'rgba(245, 130, 48, 0.2)'
                    ],
                    borderColor: [

                        'rgba(245, 130, 48, 1)'
                    ],
                    borderWidth: 2
                },
                {
                    label: 'Hartlepool',
                    fill: false,
                    data: hartlepool,
                    backgroundColor: [

                        'rgba255, 225, 25, 0.2)'
                    ],
                    borderColor: [

                        'rgba(255, 225, 25, 1)'
                    ],
                    borderWidth: 2
                },
                {
                    label: 'Middlesbrough',
                    fill: false,
                    data: middlesbrough,
                    backgroundColor: [

                        'rgba((210, 245, 60, 0.2)'
                    ],
                    borderColor: [

                        'rgba(210, 245, 60, 1)'
                    ],
                    borderWidth: 2
                },
                {
                    label: 'Stockton',
                    fill: false,
                    data: stockton,
                    backgroundColor: [

                        'rgba(60, 180, 75, 0.2)'
                    ],
                    borderColor: [

                        'rgba(60, 180, 75, 1)'
                    ],
                    borderWidth: 2
                },
                {
                    label: 'Darlington',
                    fill: false,
                    data: darlington,
                    backgroundColor: [

                        'rgba(70, 240, 240, 0.2)'
                    ],
                    borderColor: [

                        'rgba(70, 240, 240, 1)'
                    ],
                    borderWidth: 2
                },
                {
                    label: 'Gateshead',
                    fill: false,
                    data: gateshead,
                    backgroundColor: [

                        'rgba(0, 130, 200, 0.2)'
                    ],
                    borderColor: [

                        'rgba(0, 130, 200, 1)'
                    ],
                    borderWidth: 2
                },
                {
                    label: 'Newcastle',
                    fill: false,
                    data: newcastle,
                    backgroundColor: [

                        'rgba(145, 30, 180, 0.2)'
                    ],
                    borderColor: [

                        'rgba(145, 30, 180, 1)'
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
                    fill: false,
                    data: durham,
                    backgroundColor: [
                        'black'
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
        //pull the data for each region
        let durhamResponse = await fetch(durhamUrl);
        let responseSunderland = await fetch(sunderlandUrl);
        let responseHartlepool = await fetch(hartlepoolUrl);
        let responseMiddlesbrough = await fetch(middlesbroughUrl);
        let responseStockton = await fetch(stocktonUrl);
        let responseDarlo = await fetch(darlingtonUrl);
        let responseGateshead = await fetch(gatesheadUrl);
        let responseNewcastle = await fetch(newcastleUrl);

        //turn all regions into json
        let durhamData = await durhamResponse.json();
        let dataSunderland = await responseSunderland.json();
        let dataHartlepool = await responseHartlepool.json();
        let dataMiddlesbrough = await responseMiddlesbrough.json();
        let dataStockton = await responseStockton.json();
        let dataDarlo = await responseDarlo.json();
        let dataGateshead = await responseGateshead.json();
        let dataNewcastle = await responseNewcastle.json();

        //generate the date range
        var dateData = durhamData.data.map(function (item) {
            return item.date;
        });
        var dateRange = dateData.reverse().slice(0).slice(totalTime);

        //map each region and get new case
        var durhamCaseData = durhamData.data.map(function (item) {
            return item.newCasesBySpecimenDate;
        });
        var sunderlandCaseData = dataSunderland.data.map(function (item) {
            return item.newCasesBySpecimenDate;
        });
        var hartlepoolCaseData = dataHartlepool.data.map(function (item) {
            return item.newCasesBySpecimenDate;
        });
        var middlesbroughCaseData = dataMiddlesbrough.data.map(function (item) {
            return item.newCasesBySpecimenDate;
        });
        var stocktonCaseData = dataStockton.data.map(function (item) {
            return item.newCasesBySpecimenDate;
        });
        var darlingtonCaseData = dataDarlo.data.map(function (item) {
            return item.newCasesBySpecimenDate;
        });
        var gatesheadCaseData = dataGateshead.data.map(function (item) {
            return item.newCasesBySpecimenDate;
        });
        var newcastleCaseData = dataNewcastle.data.map(function (item) {
            return item.newCasesBySpecimenDate;
        });

        //timeslice the data to get only the data for the specified time range
        var durhamCaseData = durhamCaseData.reverse().slice(0).slice(totalTime);
        var sunderlandCaseData = sunderlandCaseData.reverse().slice(0).slice(totalTime);
        var hartlepoolCaseData = hartlepoolCaseData.reverse().slice(0).slice(totalTime);
        var middlesbroughCaseData = middlesbroughCaseData.reverse().slice(0).slice(totalTime);
        var stocktonCaseData = stocktonCaseData.reverse().slice(0).slice(totalTime);
        var darlingtonCaseData = darlingtonCaseData.reverse().slice(0).slice(totalTime);
        var gatesheadCaseData = gatesheadCaseData.reverse().slice(0).slice(totalTime);
        var newcastleCaseData = newcastleCaseData.reverse().slice(0).slice(totalTime);

        //put the gathered data into the chart
        generateChart(dateRange, durhamCaseData, sunderlandCaseData, hartlepoolCaseData, middlesbroughCaseData, stocktonCaseData, darlingtonCaseData, newcastleCaseData, gatesheadCaseData);
    }
    else {
        const singleUrl = 'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=ltla;areaName=' + singleLocation + '&structure=%7B%22date%22:%22date%22,%22newCasesBySpecimenDate%22:%22newCasesBySpecimenDate%22%7D';
        console.log(singleUrl);
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

function buildLocationList() {
    //If no timerange is set, we load the blank location list
    if (timeRange == null) {
        $("#dropdown2").append('<li><a class="black-text" href="?location=County Durham">County Durham</a></li><li><a class="black-text" href="?location=Sunderland">Sunderland</a></li><li><a class="black-text" href="?location=Hartlepool">Hartlepool</a></li><li><a class="black-text" href="?location=Middlesbrough">Middlesbrough</a></li><li><a class="black-text" href="?location=Stockton-on-Tees">Stockton</a></li><li><a class="black-text" href="?location=Darlington">Darlington</a></li><li><a class="black-text" href="?location=Newcastle Upon Tyne">Newcastle</a></li><li><a class="black-text" href="?location=Gateshead">Gateshead</a></li><li><a class="black-text" href="?">Clear Location</a></li>')
    } else {
        //if a timerange is set, load the modified urls which include the timerange
        $("#dropdown2").append('<li><a class="black-text" href="?location=County Durham&timeRange=' + timeRange + '">County Durham</a></li><li><a class="black-text" href="?location=Sunderland&timeRange=' + timeRange + '">Sunderland</a></li><li><a class="black-text" href="?location=Hartlepool&timeRange=' + timeRange + '">Hartlepool</a></li><li><a class="black-text" href="?location=Middlesbrough&timeRange=' + timeRange + '">Middlesbrough</a></li><li><a class="black-text" href="?location=Stockton-on-Tees&timeRange=' + timeRange + '">Stockton</a></li><li><a class="black-text" href="?location=Darlington&timeRange=' + timeRange + '">Darlington</a></li><li><a class="black-text" href="?location=Newcastle Upon Tyne&timeRange=' + timeRange + '">Newcastle</a></li><li><a class="black-text" href="?location=Gateshead&timeRange=' + timeRange + '">Gateshead</a></li><li><a class="black-text" href="?timeRange=' + timeRange + '">Clear Location</a></li>')
    }
}

//fire off the functions
loadDatas();
buildTimeRange();
buildLocationList();
