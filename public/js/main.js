$(function(){
  var bgimgurl = $("#main").css('background-image');
  if (Modernizr.backgroundsize != true && bgimgurl != "none") {
    bgimgurl = bgimgurl.replace('url("','').replace('")','');
    $("#main").backstretch( bgimgurl );
  }
});