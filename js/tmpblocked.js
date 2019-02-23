function unblock(tmpurl) {
    chrome.runtime.sendMessage({action:'tmpunblock', url:tmpurl}, function(response) {
        if(response.success === true) {
            window.location = tmpurl;
        } else if(response.error != undefined) {
            alert(response.error);
        }
      });
}
jQuery(document).ready(function(){
    jQuery('#btntmpunblock').on('click', function(evt){
        unblock(atob(window.location.search.substr(1)));
    });
    $("#btnpagereport").attr("href", "pgrep.html?"+window.location.search.substr(1));
    $('#btnaddthis').on('click', function() {
        alert("No white or blacklist found.");
    });
});
