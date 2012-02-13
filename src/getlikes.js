(function(){
    // 1000 seems to break it on my connection
    var DELAY = 2000;

    if (window.jQuery === undefined) {
        var jqelement = document.createElement('script');
        jqelement.setAttribute('type', 'text/javascript');
        jqelement.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');
        document.getElementsByTagName("head")[0].appendChild(jqelement);
    }

    var getAllLikes = function() {
        var vals = [];
        var most = 0;
        var target;

        jQuery('li.uiUfiLike').each(function(i, el) {
            var $el = jQuery(el);

            var val = parseInt(jQuery('a[rel="dialog"]', el).text());
            if (!isNaN(val)) {
                vals.push(val);
                if (val > most) {
                    most = val;

                    // also get the permalink
                    // I imagine that this will break every time Facebook
                    // updates
                    target = $el
                            .closest('form')
                            .find('abbr')
                            .closest('a')
                            .attr('href');
                }
            }
        });

        return {
            target: target,
            most: most,
            total: vals.length
        };
    };

    var expandAllTheWay = function(count, loadsSoFar) {
        if (jQuery('a.uiMorePagerPrimary').length > 0) {
            jQuery('a.uiMorePagerPrimary').click();

            var likeStats = getAllLikes();
            displayProgress(loadsSoFar,
                            likeStats.total,
                            likeStats.most,
                            likeStats.target);

            setTimeout(function(){
                    expandAllTheWay(5,
                                    loadsSoFar + 1);
                }, DELAY);
        }
        else {
            if (count > 0) {
                setTimeout(function(){
                    expandAllTheWay(count - 1, loadsSoFar);
                }, DELAY);
            }
            else {
                // at this point either the internet has died or the wall 
                // is fully expanded
                getAllLikes();
            }
        }
    };

    var displayProgress = function(loads, likesSoFar,
                                   mostLiked, mostLikedTarget){
        var theBox = '<div id="bwmTheBox" style="position: fixed; top: 0; right: 0; width: 120px; height: 60px; background-color: #6a5acd; color: #000; z-index: 100000; -moz-box-shadow: -3px 3px 5px #888; -webkit-box-shadow: -3px 3px 5px #888; box-shadow: -3px 3px 5px #888;">'+
            '<table style="width: 110px; margin: auto;">'+
            '<tr><td>Times Loaded:</td><td id="bwmTimesLoaded"></td></tr>'+
            '<tr><td>Likes Found:</td><td id="bwmLikesFound"></td></tr>'+
            '<tr><td>Most Liked:</td><td id="bwmMostLiked">'+
                '<a style="background-color: #7b68ee; color: #fff; padding:0 3px; border-radius: 3px;" target="_blank"></a></td></tr>'+
            '</table>'+
            '</div>';

        if (jQuery('#bwmTheBox').length === 0) {
            jQuery('body').append(theBox);
        }

        jQuery('#bwmTimesLoaded').text(loads);
        jQuery('#bwmLikesFound').text(likesSoFar);
        jQuery('#bwmMostLiked a')
            .text(mostLiked)
            .prop('href', mostLikedTarget);
    };

    // we need to wait for jQuery to load
    setTimeout(function(){
        jQuery.noConflict();
        displayProgress(0, 0, 0);
        expandAllTheWay(5, 0);
    },
               1000);
}());
