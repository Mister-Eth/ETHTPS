var colors = ["#009999", "#22cf22", "#490092", "#006ddb", "#b66dff", "#ff6db6", "#920000", "#db6d00", "#ffdf4d"];
function updateTPSTable(data) {
    for (x of data) {
        $(`#td-${x.provider}`).html(parseFloat(x.tps).toFixed(2));
    }
}