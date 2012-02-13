#!/usr/bin/env python

import sys

def main(template, dest):
    try:
        bookmark_src = sys.stdin.readline()
    except:
        print "error getting the bookmark text"
        exit(1)

    try:
        fh = open(template, 'r')
        src_template = fh.read()
        src = src_template % {'bookmarklet': bookmark_src}
        try:
            output = open(dest, 'w')
            output.write(src)
        finally:
            output.close()
    finally:
        fh.close()

if __name__ == '__main__':
    if len(sys.argv) == 2 and sys.argv[1] == '-h' or sys.argv[1] == '--help':
        print "Usage: %s [templatefile] [outputfile]" % __name__

    template = sys.argv[1] if len(sys.argv) > 1 else 'getlikes.html'
    dest     = sys.argv[2] if len(sys.argv) > 2 else 'getfacebooklikes.html'

    main(template, dest)
