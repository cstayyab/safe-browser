tmpblocked = false;
blocked = null;
strBlocked = "";
tmpurl =  parseUrl(atob(window.location.search.substr(1))).href;
chrome.runtime.sendMessage({ action: 'isblocked', url: tmpurl }, function (response) {
    console.log("Full Blocked: " + response.fullblocked);
    blocked = response.fullblocked;
    if(blocked === true) {
        strBlocked = "Yes";
        jQuery("document").ready(function () {
            $('#valpgurl').html(tmpurl);
            $('#valpgwot').html(wotrating);
            $('#valpgblocked').html(strBlocked);
        });
    } else {
        chrome.runtime.sendMessage({ action: 'istempblocked', url: tmpurl }, function (response) {
            console.log("tmpBlocked: " + response.tempblocked);
            tmpblocked = response.tempblocked;
            if(tmpblocked == true) {
                strBlocked = "Yes (For this session only)";
                jQuery("document").ready(function () {
                    $('#valpgurl').html(tmpurl);
                    $('#valpgwot').html(wotrating);
                    $('#valpgblocked').html(strBlocked);
                });
            } else {
                jQuery("document").ready(function () {
                    $('#valpgurl').html(tmpurl);
                    $('#valpgwot').html(wotrating);
                    $('#valpgblocked').html("No");
                });
            }
        });
    }

});
wotrating = getRating(extractHostname(tmpurl));
function parseUrl(url) {
    var a = document.createElement('a');
    a.href = url;
    return a;
}
function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}
function getRating(domain) {
    qString = "http://api.mywot.com/0.4/public_link_json2?hosts=" + domain + "/&key=c6e42a72c5103680ce2e40acec05dd08cb89ac10";
    var request = new XMLHttpRequest();
    request.open('GET', qString, false);
    request.send(null);
    allow = null;
    if (request.status === 200) {
        result = JSON.parse(request.responseText);
        var res = result[domain];
        console.log(domain);
        console.log("res: " + res);
        var tmpRate = null;
        if ("categories" in res) {
            cates = Object.keys(res["categories"]);
            tmpRate = null;
            cates.forEach(function (val, index) {
                if (val > 400 && val < 405) {
                    tmpRate = val;
                }
            });
            if (tmpRate != null) {
                if (tmpRate == 401) {
                    return "Adult content";
                } else if (tmpRate == 402) {
                    return "Incidental nudity";
                } else if (tmpRate == 403) {
                    return "Gruesome or shocking";
                } else if (tmpRate == 404) {
                    return "Site for Kids";
                } else {
                    return "Unknown Rating";
                }
            } else {
                return "No record found!";
            }
        } else {
            return "No record found!";
        }
    } else {
        return "Unable to Determine!";
    }
    return "Unable to Determine!";
}
$(document).ready(function(){
    $('#send-button').on('click', function(){alert("This feature has not been implementated due to limiations.");});
});



