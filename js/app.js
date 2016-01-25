var appendSlides = function (data, callback) {

    var steps = data;
    var htmltemplate = $('#step-template').html();
    var htmltempl = Handlebars.compile(htmltemplate);
    var count = 0;
    steps.forEach(function (step) {
        var templ = htmltempl;

        $.ajax({
            url: '/steps/' + step + '.html',
            success: function (data) {
                $('.slides').append(templ({
                    file: data
                }));
                count++;

                if(count === steps.length){
                    if(typeof callback === 'function'){
                        callback();
                    }
                }
            },
            async: false
        });
    });
};


function init(){
    $.getJSON('steps/list.json', function (data) {
        // Append ordered slides
        appendSlides(data, function(){

            $( '.resizable' ).resizable();

            // Full list of configuration options available at:
            // https://github.com/hakimel/reveal.js#configuration
            Reveal.initialize({
                controls: false,
                progress: false,
                history: true,
                center: false,
                showNotes:false,
                transition: 'fade', // none/fade/slide/convex/concave/zoom
                dependencies: [

                    {src: 'lib/js/classList.js', condition: function () {return !document.body.classList;}},
                    {src: 'plugin/markdown/marked.js', condition: function () {return !!document.querySelector('[data-markdown]');}},
                    {src: 'plugin/markdown/markdown.js', condition: function () {return !!document.querySelector('[data-markdown]');}},
                    {src: 'plugin/highlight/highlight.js', async: true, condition: function () {return !!document.querySelector('pre code');}, callback: function () {
                            hljs.initHighlightingOnLoad();
                            hljs.initHighlighting();
                        }
                    },
                    {src: 'plugin/live-coding/live-coding.js', async: true, condition: function () {return !!document.body.classList;}},
                    {src: 'plugin/zoom-js/zoom.js', async: true},
                    {src: 'plugin/notes/notes.js', async: true}
                ],
                width: 1280,
                height: 900,

                // Factor of the display size that should remain empty around the content
                margin: 0.1,

                // Bounds for smallest/largest possible scale to apply to content
                minScale: 0.2,
                maxScale: 1.5
            });


        });

    });
}

$(function() {
    init();

});