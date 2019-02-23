$(document).ready(function(){
    $("#btnpagereport").attr("href", chrome.runtime.getURL("pgrep.html?"+window.location.search.substr(1)));
    $('#btnaddthis').on('click', function() {
        alert("No whitelist found.");
    });
});