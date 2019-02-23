$(document).ready(function () {
    defaultScheme = 'Teenager';
    chrome.storage.sync.get(['currentScheme', 'defaultScheme', 'blacklist', 'whitelist'], function (result) {
        $("#current-scheme").html(result.currentScheme);
        if (result.defaultScheme == true) {
            $("#current-scheme").append(" (default)");
            $("#status-details").html("Safe browser is working according to default browsing scheme (" + defaultScheme + ").");
        } else {
            $("#status-details").html("Safe browser is working according to selected browsing scheme.");
        }
        $("#current-blacklist").html(result.blacklist);
        $("#current-whitelist").html(result.whitelist);
    });
    $("#tmpblockthis").on('click', function () {
        chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
            var tmpurl = tabs[0].url;
            console.log("Blocking: " + tmpurl);
            chrome.runtime.sendMessage({ action: 'tmpblock', url: tmpurl }, function (response) {
                if (response.success === true) {
                    alert("Blocked for this session!!");
                    window.close();
                    chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
                } else if (response.error != undefined) {
                    alert(request.error);
                }
            });

        });
    });
    $('#btnaddthis').on('click', function() {
        alert("No white or blacklist found.");
    });
    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
        var tmpurl = tabs[0].url;
        $("#btnpagereport").attr("href", chrome.runtime.getURL("pgrep.html?"+btoa(tmpurl)));
    });
    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
        var cururl = tabs[0].url;
        if (cururl.indexOf("chrome-extension://") == 0 || cururl.indexOf("chrome://") == 0) {
            jQuery("#tmpblockthis").hide();
            $("#btnpagereport").hide();
            $("#btnaddthis").hide();
        } else {
            jQuery("#tmpblockthis").show();
            $("#btnpagereport").show();
            $("#btnaddthis").show();
        }
    });
});
