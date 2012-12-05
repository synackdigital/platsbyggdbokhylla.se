<!doctype html>
<!-- paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="sv"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="sv"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="sv"> <![endif]-->
<!-- Consider adding a manifest.appcache: h5bp.com/d/Offline -->
<!--[if gt IE 8]><!--> <html class="no-js" lang="sv"> <!--<![endif]-->
<head>
  <meta charset="utf-8">

  <!-- Use the .htaccess and remove these lines to avoid edge case issues.
       More info: h5bp.com/i/378 -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

  <title>Ribersborg &rsaquo; Platsbyggd Bokhylla</title>
  <meta name="description" content="En platsbyggd bokhylla från Jerker Inredning &amp; Form kommer alltid pryda rummet där den byggdes.">

  <!-- Mobile viewport optimized: h5bp.com/viewport -->
  <meta name="viewport" content="width=device-width">

  <!-- Place favicon.ico and apple-touch-icon.png in the root directory: mathiasbynens.be/notes/touch-icons -->

  <link rel="stylesheet" href="/css/style.css">

  <!-- More ideas for your <head> here: h5bp.com/d/head-Tips -->

  <!-- All JavaScript at the bottom, except this Modernizr build.
       Modernizr enables HTML5 elements & feature detects for optimal performance.
       Create your own custom Modernizr build: www.modernizr.com/download/ -->
  <script src="/js/libs/modernizr-2.5.3.min.js"></script>
</head>
<body class="ritverktyg">
  <!-- Prompt IE 6 users to install Chrome Frame. Remove this if you support IE 6.
       chromium.org/developers/how-tos/chrome-frame-getting-started -->
  <!--[if lt IE 7]><p class=chromeframe>Your browser is <em>ancient!</em> <a href="http://browsehappy.com/">Upgrade to a different browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to experience this site.</p><![endif]-->
  <header id="header">
    <h1 class="site-title"><a href="/" title="Visa startsidan">Platsbyggd Bokhylla <small>&middot; förfrågningar</small></a></h1>
    <nav id="nav-main" class="nav" role="navigation">
      <ul class="nav-items">
        <li class="nav-item nav-item-davidhall"><a href="/logout" title="Logout">Logout</a></li>
      </ul>
    </nav>
  </header>
  <div id="main" role="main">
    <div id="ritaadmin">
      <?php
        include("db.php");
        $orders = getItems();
        foreach ($orders as $order){
          echo '<div class="order"><div class="inner">';
          echo '<h4>Order name: '.$order["name"].'</h4>';
          echo '<h4>Email: martin@talkative.se</h4>';
          echo '<div class="details">'.print_r($order["order"],true).'</div>';
          echo '</div></div>';
        }
      ?>
    </div>
  </div>

  <a id="logo" href="http://www.jerker.eu/" title="Besök Jerker Inredning & Form för mer information och inspiration"><img src="/images/jiof-logo.png"></a>

  <!-- scripts concatenated and minified via build script -->
  <script src="/js/ritverktyg/req.js"></script>
  <script src="/js/ritverktyg/build.js"></script>
  <!-- end scripts -->

  <!-- Asynchronous Google Analytics snippet. Change UA-XXXXX-X to be your site's ID.
       mathiasbynens.be/notes/async-analytics-snippet -->
  <!--<script>
    var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
    (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
    g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
    s.parentNode.insertBefore(g,s)}(document,'script'));
  </script>-->
</body>
</html>