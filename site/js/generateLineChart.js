import {singleLocation, totalTime} from './contents.js'
//Functions Section
function generateLineChart(
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
                        'rgb(1, 87, 155)'
                    ],
                    borderColor: [
                        'rgb(1, 87, 155)'
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
                        'rgb(1, 87, 155)'
                    ],
                    borderColor: [
                        'rgb(1, 87, 155)'
                    ],
                    borderWidth: 2
                }
            ]
        };
    }

    var myChart = new Chart(ctx, {
        type: 'bar',
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
        generateLineChart(dateRange, durhamCaseData);
    }
    else {
        const singleUrl = 'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=ltla;areaName=' + singleLocation + '&structure=%7B%22date%22:%22date%22,%22newCasesBySpecimenDate%22:%22newCasesBySpecimenDate%22%7D';
        $('#setLocation').text(singleLocation);
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
        generateLineChart(dateRange, singleCaseData);
    }
}

function generateDoughnutChart(
    dateRange,
    location) {

    var ctx = document.getElementById('myDoughnutChart').getContext('2d');
    
        //use this if a single location has been specified
        var chartData = {
            labels: dateRange,
            datasets: [
                {
                    label: singleLocation,
                    fill: true,
                    data: location,
                    backgroundColor: [
                        'rgb(55, 7, 108)',
                        'rgb(184, 117, 44)',
                        'rgb(94, 123, 216)',
                        'rgb(211, 255, 76)',
                        'rgb(26, 49, 2)',
                        'rgb(196, 190, 220)',
                        'rgb(61, 32, 134)',
                        'rgb(163, 126, 126)',
                        'rgb(209, 82, 63)'
                    ],
                    borderColor: [
                        'rgb(55, 7, 108)',
                        'rgb(184, 117, 44)',
                        'rgb(94, 123, 216)',
                        'rgb(211, 255, 76)',
                        'rgb(26, 49, 2)',
                        'rgb(196, 190, 220)',
                        'rgb(61, 32, 134)',
                        'rgb(163, 126, 126)',
                        'rgb(209, 82, 63)'
                    ],
                    borderWidth: 2
                }
            ]
        };
    

    var myChart = new Chart(ctx, {
        type: 'doughnut',
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

async function loadDoughnutDatas() {

   
        const ukUrl = 'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=region&latestBy=newCasesBySpecimenDateRollingRate&structure=%7B%22areaName%22:%22areaName%22,%22newCasesBySpecimenDateRollingSum%22:%22newCasesBySpecimenDateRollingSum%22,%22newCasesBySpecimenDateRollingRate%22:%22newCasesBySpecimenDateRollingRate%22%7D'
        //pull the data for each region
        let durhamResponse = await fetch(ukUrl);

        //turn all regions into json
        let durhamData = await durhamResponse.json();

        //generate the date range
        var dateData = durhamData.data.map(function (item) {
            return item.areaName;
        });
        var dateRange = dateData.reverse();

        //map each region and get new case
        var durhamCaseData = durhamData.data.map(function (item) {
            return item.newCasesBySpecimenDateRollingSum;
        });


        //timeslice the data to get only the data for the specified time range
        var durhamCaseData = durhamCaseData.reverse().slice(0).slice(totalTime);

        //put the gathered data into the chart
        generateDoughnutChart(dateRange, durhamCaseData);
    
    
}

export {generateLineChart, loadDatas, generateDoughnutChart, loadDoughnutDatas}