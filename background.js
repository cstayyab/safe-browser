chrome.runtime.onInstalled.addListener(function (data) {
    defaultScheme = 'Teenager';
    if (data.reason == "install") {
        chrome.storage.sync.set({
            'currentScheme': defaultScheme,
            'defaultScheme': true,
            'blacklist': 'None',
            'whitelist': 'None'
        });
    }
});

tmpBlocked = ["http://google.com"];
chrome.runtime.onStartup.addListener(function(){
    tmpBlocked = ["https://google.com"];
});

scheme = null;
chrome.storage.sync.get(['currentScheme'], function (result) {
    scheme = result['currentScheme'];
});
chrome.storage.onChanged.addListener(function (changes, area) {
    if (area == "sync" && "currentScheme" in changes) {
        scheme = changes.currentScheme.newValue;
    }
});
chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        if(tmpBlocked.includes(details.url)) {
            return {redirectUrl: chrome.runtime.getURL("tmpBlocked.html?"+btoa(details.url))};
        }
        domain = extractHostname(details.url);

        if(!facilitateRequest(domain)) {
            return {redirectUrl: chrome.runtime.getURL("blocked.html?"+btoa(details.url))};
        }
        return { cancel:  false};
    },
    { urls: ["http://*/*", "https://*/*", "ftp://*/*"] },
    ["blocking"]);


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
function getNumericRating(txtRating) {
    if (txtRating === "safe for kids") {
        return 0;
    } else if (txtRating === "14 years" || txtRating.toLowerCase() === "teenager") {
        return 1;
    } else if (txtRating === "general") {
        return 2;
    } else if (txtRating === "mature") {
        return 3;
    } else if (txtRating === "restricted") {
        return 4;
    } else {
        return 1;
    }
}


//APIKEY: c6e42a72c5103680ce2e40acec05dd08cb89ac10
// chrome.runtime.onMessage.addListener(
//     function (request, sender, sendResponse) {

//     });
// chrome.runtime.onMessage.addListener(
//     function (request, sender, sendResponse) {
//         if (request.type == "contentLoaded") {
//             // var content = decodeURIComponent(escape(atob(request.content)));
//             // var page = document.createElement('html');
//             // page.innerHTML = content;
//             // var metas = page.getElementsByTagName("meta");
//             // var metas_length = metas.length;
//             // var rating = null;
//             // for (var i = 0; i < metas_length; i++) {
//             //     if (metas[i].getAttribute("name") == "rating".toLowerCase && metas[i].getAttribute("content") != null) {
//             //         rating = getNumericRating(metas[i].getAttribute("content").toLowerCase);
//             //         console.log("Rating: " + rating);
//             //         break;
//             //     }
//             // }
//             facilitateRequest(request, sender.tab.id);

//         }
//     });
function facilitateRequest(domain) {
    qString = "http://api.mywot.com/0.4/public_link_json2?hosts=" + domain + "/&key=c6e42a72c5103680ce2e40acec05dd08cb89ac10";
    var request = new XMLHttpRequest();
    request.open('GET', qString, false);
    request.send(null);
    allow = null;
    if (request.status === 200) {
        //console.log(request.responseText);
        result = JSON.parse(request.responseText);
        var res = result[domain];
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
                    rating = 4;
                } else if (tmpRate == 402) {
                    rating = 3;
                } else if (tmpRate == 403) {
                    rating = 1;
                } else if (tmpRate == 404) {
                    rating = 0;
                } else {
                    rating = 1;
                }
            } else {
                rating = 1;
            }
        } else {
            rating = 1;
        }
        reqRating = getNumericRating(scheme);
        //console.log("rating: " + rating + " reqRating: " + reqRating);
        if (scheme !== null && rating > reqRating) {
            allow = false;
        } else {
            allow = true;
        }
    } else {
        allow = false;
    }
    // if(allow) {
    //     console.log("Allowed: " + domain);
    // } else {
    //     console.log("Blocked: " + domain);
    // }
    return allow;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.action=="tmpunblock") {
        if(tmpBlocked.includes(request.url)) {
            tmpBlocked.splice(tmpBlocked.indexOf(request.url),1);
            sendResponse({success: true});
        } else {
            sendResponse({error: "Invalid URL!! This URL is not blocked temporarily."});
        }
    } else if(request.action == "tmpblock") {
        console.log("Block request: " + request.url);
        if(!tmpBlocked.includes(request.url)) {
            tmpBlocked.push(request.url);
            sendResponse({success:true});

        }
    } else if(request.action=="istempblocked") {
        sendResponse({tempblocked: tmpBlocked.includes(request.url)});
    } else if(request.action == "isblocked") {
        domain = extractHostname(request.url);
        sendResponse({fullblocked: !facilitateRequest(domain)});
    }

});