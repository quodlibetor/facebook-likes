#!/bin/sh

if type uglifyjs >/dev/null ; then
    echo 'uglifyjs found. Uglifying.'

    if [ ! -d build ] ; then
        mkdir build
    fi

    uglifyjs -o build/getlikes.min.js src/getlikes.js

    scripts/makebookmarklet.pl build/getlikes.min.js | \
        scripts/makegetlikes.html.py src/dist/getlikes.html index.html
    rm -r build
else
    echo 'GOVERN YOURSELF ACCORDINGLY:'
    echo 'If you had uglifyjs installed the js would be minified before it'
    echo 'was bookmarkletted, for a 1/3 byte savings!'
    echo '(That is almost a full KiB)'

    scripts/makebookmarklet.pl src/getlikes.js | \
        scripts/makegetlikes.html.py src/dist/getlikes.html index.html
fi
