======================
 Count Facebook Likes
======================

A stupid js script to find the most popular thing you, or any other popular person, has ever said.

Usage
=====

See `the homepage`_ for detailed instructions.

.. _the homepage: http://quodlibetor.github.com/facebook-likes

To Build
--------

``cd`` into this dir, run ``./bdist.sh``, visit ``index.html``, and drag the bookmarklet to your bookmark bar.

I know that bookmarklets are, like, *so* 2009, but still, yo.
That's all I got.

TODO
====

- maybe make it possible to see the top *n* most-liked things?
- turn this into a Firefox/Chromium extension, so that people will actually know how to install it?
- make it less ugly?

Known Bugs
==========

It breaks Facebook until you re-load the page. I'm assuming that it's got something to do with the jQuery load. Calling jQuery.noconflict() doesn't seem to fix it.

Also: I think there's a memory leak? Running it multiple times makes Firefox's memory balloon.
But it could just be that I'm loading the full wall into one tab, including literally hundreds of fairly large images.

License
=======

BSD. Share, modify, share again.
