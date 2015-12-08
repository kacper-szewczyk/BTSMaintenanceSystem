/**
 *
 */

function callAnotherPage() {
    console.log("callAnotherPage");
    window.location = "html/search.html";
}

function updateHeader(url) {
    var website = "search.html";
    var index = url.indexOf(website);

    return url.substring(index+website.length,url.length);
}
//myObject = updateHeader.call(myObject, "search.html#12");     // Will return 20
