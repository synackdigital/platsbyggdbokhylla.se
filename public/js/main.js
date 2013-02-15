if(window.Prototype!==undefined){
  Event.observe(window,"load",function(){
    // Avgrund video modals
    $$('a.avgrund-link').each(function(aLink){
      
      aLink.observe("click",function(e){
        e.stop();
        $$('#avgrund iframe').first().writeAttribute('src', this.readAttribute('href'));
        Avgrund.show( "#avgrund" );
        return false;
      });
    })
  });
} else {
  $(function(){
    // Auto strech background images
    var bgimgurl = $("#main").css('background-image');
    if (Modernizr.backgroundsize != true && bgimgurl != "none") {
      bgimgurl = bgimgurl.replace('url("','').replace('")','');
      $("#main").backstretch( bgimgurl );
    }

    // Avgrund video modals
    $('a.avgrund-link').click(function(e){
      e.preventDefault();
      $('#avgrund iframe').attr('src', $(this).attr('href'));
      Avgrund.show( "#avgrund" );
      return false;
    })
  });
}
