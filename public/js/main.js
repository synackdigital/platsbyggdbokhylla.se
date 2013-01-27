$(function(){

  // Auto strech background images
  var bgimgurl = $("#main").css('background-image');
  if (Modernizr.backgroundsize != true && bgimgurl != "none") {
    bgimgurl = bgimgurl.replace('url("','').replace('")','');
    $("#main").backstretch( bgimgurl );
  }

  // Avgrund video modals
  $('a.avgrund-link').click(function(){
    $('#avgrund iframe').attr('src', $(this).attr('href'));
    Avgrund.show( "#avgrund" );
    return false;
  })
});