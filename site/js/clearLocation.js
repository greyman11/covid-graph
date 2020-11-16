import { timeRange } from './contents.js';

//generate chart view TO DO LATER
//$('#tableRow').append('<div class="columns"><div class="column"><h2 class="is-size-2">table row</h2></div></div>');
//clears location if set. 
export function clearLocation() {
    if (timeRange == null) {
        window.location = "?";
    } else {
        window.location = "?timeRange=" + timeRange;
    }
}
