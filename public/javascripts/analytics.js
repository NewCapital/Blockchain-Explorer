<!-- Global site tag (gtag.js) - Google Analytics -->
// <script async src="https://www.googletagmanager.com/gtag/js?id=UA-73370264-3"></script>
// <script>
window.addEventListener('load', function () {

    var analytics_id = '';
    /*This function will load script and call the callback once the script has loaded*/
    function loadScriptAsync(scriptSrc, callback) {
        if (typeof callback !== 'function') {
            throw new Error('Not a valid callback for async script load');
        }
        var script = document.createElement('script');
        script.onload = callback;
        script.src = scriptSrc;
        document.head.appendChild(script);
    }

    $.getJSON("analytics.json", function(json) {
        console.log(window.location.host)
        if(json && json.id && window.location.host === "explorer.win.win") {
            analytics_id = json.id;
        }
        /* This is the part where you call the above defined function and "call back" your code which gets executed after the script has loaded */
        loadScriptAsync('https://www.googletagmanager.com/gtag/js?id=' + analytics_id, function(){
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', analytics_id);
        })
    })
})