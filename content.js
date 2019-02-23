
// jQuery("body").css("display", "none");
// // chrome.runtime.sendMessage({type: "contentLoaded", options: { 
// //     content: btoa(unescape(encodeURIComponent($("html").html()))),
// //     domain: window.location.hostname
// // }});
// // chrome.runtime.onMessage
// chrome.runtime.sendMessage(
//     {
//         type: "contentLoaded",
//         content: btoa(unescape(encodeURIComponent($("html").html()))),
//         domain: window.location.hostname
//     }, function (response) {
//     });
//     chrome.runtime.onMessage.addListener(
//         function(request, sender, sendResponse) {
//             if(request.allow == false) {
//                 jQuery("body").css("display", "");
//             } else {
//                 jQuery("body").css("display", "");
//                 data = `
//                 <!DOCTYPE html>
//                 <html>
//                   <head>
//                   <title>BLOCKED!!</title>
//                     <style>
//                       * {
//                         box-sizing: border-box;
//                       }
//                       div.stop {
//                           width: 400px;
//                           height: auto;
//                           margin: 0 auto;
//                           margin-top:12.5%;
//                           background-color: gray;
//                           text-align:center;
//                       }
//                       div.stop * {
//                           text-align: center;
//                       }
//                     </style>
//                   </head>
//                   <body>
//                     <div class="stop">
//                         <h1>Safe Browser</h1>
//                         <h2 style="color:red;">Surf Safely</h2>
//                         <p>This page has been blocked due to your current browsing scheme.</p>
//                     </div>
//                   </body>
//                   </html>
//                 `;
//                 jQuery("html").html(data);
//             }
//         });