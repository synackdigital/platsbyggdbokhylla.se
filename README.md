platsbyggdbokhylla.se
=====================

Webbplats för Platsbyggd Bokhylla och Jerker Inredning &amp; Form


Installation
------------

``` bash
npm install
bower install
grunt build
```

The site is compiled into `/dist/`


Development
----------

``` bash
grunt watch
```

This runs `grunt build` whenever any changes in `/src/` and `/bower_components/` are discovered.

TODO
----

- [ ] Set up `grunt deploy` for automatic deployment after build
- [ ] Set up `grunt server` for livereload sweetness
- [x] Replace FlexSlider with Superslides
- [x] Replace GoldenGrid and LESSHat with Bootstrap
- [x] Consolidate dev branches into master
