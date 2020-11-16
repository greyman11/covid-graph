
//function to generate list of locations
export async function generateLocationLists(url) {
    totalCases = await fetch(url);
    totalCases = await totalCases.json();
    var areaList = totalCases.data.map(function (item) {
        return item.areaName;
    });
    $.each(areaList, function (i, val) {
        //if a timerange is set, load the modified urls which include the timerange
        $("#ddLocations").append('<option value="' + val + '">');
    });
}
