import { timeRange } from './contents.js';

//loads the selected location
export function loadFromSearch() {
    var str = $("#pickLocation").val();
    if (str === "") {
        return alert('no location selected');
    }
    if (timeRange == null) {
        window.location = "?location=" + str;
    } else {
        window.location = "?location=" + str + "&timeRange=" + timeRange;
    }
}
