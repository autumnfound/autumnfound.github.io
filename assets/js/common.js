var $ = jQuery;

$( document ).ready(function() {
    includes();
});

// dynamically include files based on data attribute
function includes() {
    var includes = $('[data-include]');
    $.each(includes, function(){
      var $t = $(this);
      var file = '/assets/templates/' + $(this).data('include') + '.html';

      // retrieve this methods callback (when present)
      var callback = $t.data('callback');

      $t.load(file, function() {
          if (callback != undefined) {
              window[callback]();
          }
      });

      // clear the attribute
      $(this).removeAttr('data-include');
      $(this).removeAttr('data-callback');
    });
}

function setTitle(col) {
    // update the page titles to use the page name
    var pageName = window.location.href.match(/.*\/([^\.]*?)\..*$/)[1];
    // replace dashes and do casing
    pageName = pageName.replace('-', ' ');
    pageName = pageName.replace(/(^\w|\s[a-zA-Z])/g, function(match, str) {
        return str.toUpperCase();
    });

    // replace the placeholder with the new value
    var titleText = $('title').text().replace(/\{PAGE_NAME\}/, pageName);
    $('title').text(titleText);
    $("meta[name='title']").attr('value',titleText);
}
