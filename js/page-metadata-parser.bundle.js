var metadataparser=function(t){function r(n){if(e[n])return e[n].exports;var u=e[n]={exports:{},id:n,loaded:!1};return t[n].call(u.exports,u,u.exports,r),u.loaded=!0,u.exports}var e={};return r.m=t,r.c=e,r.p="",r(0)}([function(t,r,e){t.exports=e(1)},function(t,r,e){"use strict";function n(t){return t.replace(/www[a-zA-Z0-9]*\./,"").replace(".co.",".").split(".").slice(0,-1).join(" ")}function u(t){return function(r,e){for(var n=0,u=void 0,o=0;o<t.rules.length;o++){var a=i(t.rules[o],2),c=a[0],l=a[1],f=Array.from(r.querySelectorAll(c));if(f.length){var s=!0,p=!1,m=void 0;try{for(var g,b=f[Symbol.iterator]();!(s=(g=b.next()).done);s=!0){var y=g.value,d=t.rules.length-o;if(t.scorers){var v=!0,h=!1,A=void 0;try{for(var w,k=t.scorers[Symbol.iterator]();!(v=(w=k.next()).done);v=!0){var x=w.value,S=x(y,d);S&&(d=S)}}catch(t){h=!0,A=t}finally{try{!v&&k.return&&k.return()}finally{if(h)throw A}}}d>n&&(n=d,u=l(y))}}catch(t){p=!0,m=t}finally{try{!s&&b.return&&b.return()}finally{if(p)throw m}}}}if(!u&&t.defaultValue&&(u=t.defaultValue(e)),u){if(t.processors){var U=!0,R=!1,V=void 0;try{for(var j,L=t.processors[Symbol.iterator]();!(U=(j=L.next()).done);U=!0){var z=j.value;u=z(u,e)}}catch(t){R=!0,V=t}finally{try{!U&&L.return&&L.return()}finally{if(R)throw V}}}return u.trim&&(u=u.trim()),u}}}function o(t,r,e){var n={},o={url:r},i=e||f;return Object.keys(i).map(function(r){var e=i[r],a=u(e);n[r]=a(t,o)}),n}var i=function(){function t(t,r){var e=[],n=!0,u=!1,o=void 0;try{for(var i,a=t[Symbol.iterator]();!(n=(i=a.next()).done)&&(e.push(i.value),!r||e.length!==r);n=!0);}catch(t){u=!0,o=t}finally{try{!n&&a.return&&a.return()}finally{if(u)throw o}}return e}return function(r,e){if(Array.isArray(r))return r;if(Symbol.iterator in Object(r))return t(r,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),a=e(2),c=a.makeUrlAbsolute,l=a.parseUrl,f={description:{rules:[['meta[property="og:description"]',function(t){return t.getAttribute("content")}],['meta[name="description" i]',function(t){return t.getAttribute("content")}]]},icon:{rules:[['link[rel="apple-touch-icon"]',function(t){return t.getAttribute("href")}],['link[rel="apple-touch-icon-precomposed"]',function(t){return t.getAttribute("href")}],['link[rel="icon" i]',function(t){return t.getAttribute("href")}],['link[rel="fluid-icon"]',function(t){return t.getAttribute("href")}],['link[rel="shortcut icon"]',function(t){return t.getAttribute("href")}],['link[rel="Shortcut Icon"]',function(t){return t.getAttribute("href")}],['link[rel="mask-icon"]',function(t){return t.getAttribute("href")}]],scorers:[function(t,r){var e=t.getAttribute("sizes");if(e){var n=e.match(/\d+/g);if(n)return n.reduce(function(t,r){return t*r})}}],defaultValue:function(t){return"favicon.ico"},processors:[function(t,r){return c(r.url,t)}]},image:{rules:[['meta[property="og:image:secure_url"]',function(t){return t.getAttribute("content")}],['meta[property="og:image:url"]',function(t){return t.getAttribute("content")}],['meta[property="og:image"]',function(t){return t.getAttribute("content")}],['meta[name="twitter:image"]',function(t){return t.getAttribute("content")}],['meta[property="twitter:image"]',function(t){return t.getAttribute("content")}],['meta[name="thumbnail"]',function(t){return t.getAttribute("content")}]],processors:[function(t,r){return c(r.url,t)}]},keywords:{rules:[['meta[name="keywords" i]',function(t){return t.getAttribute("content")}]],processors:[function(t,r){return t.split(",").map(function(t){return t.trim()})}]},title:{rules:[['meta[property="og:title"]',function(t){return t.getAttribute("content")}],['meta[name="twitter:title"]',function(t){return t.getAttribute("content")}],['meta[property="twitter:title"]',function(t){return t.getAttribute("content")}],['meta[name="hdl"]',function(t){return t.getAttribute("content")}],["title",function(t){return t.text}]]},language:{rules:[["html[lang]",function(t){return t.getAttribute("lang")}],['meta[name="language" i]',function(t){return t.getAttribute("content")}]],processors:[function(t,r){return t.split("-")[0]}]},type:{rules:[['meta[property="og:type"]',function(t){return t.getAttribute("content")}]]},url:{rules:[["a.amp-canurl",function(t){return t.getAttribute("href")}],['link[rel="canonical"]',function(t){return t.getAttribute("href")}],['meta[property="og:url"]',function(t){return t.getAttribute("content")}]],defaultValue:function(t){return t.url},processors:[function(t,r){return c(r.url,t)}]},provider:{rules:[['meta[property="og:site_name"]',function(t){return t.getAttribute("content")}]],defaultValue:function(t){return n(l(t.url))}}};t.exports={buildRuleSet:u,getMetadata:o,getProvider:n,metadataRuleSets:f}},function(t,r,e){(function(r){"use strict";if(void 0!==r.URL)t.exports={makeUrlAbsolute:function(t,r){return new URL(r,t).href},parseUrl:function(t){return new URL(t).host}};else{var n=e(3);t.exports={makeUrlAbsolute:function(t,r){var e=n.parse(r);return null===e.host?n.resolve(t,r):r},parseUrl:function(t){return n.parse(t).hostname}}}}).call(r,function(){return this}())},function(t,r){t.exports=window}]);