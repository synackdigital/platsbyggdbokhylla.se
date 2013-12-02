
$(function(){
  console.log('$()');
  app.init();
});

var app = {
  el: {
    slides:                 $('#slides'),
    slidesContainer:        $('.slides-container', this.slides)
  },

  init: function() {
    this.superslidesInit();
  },

  superslidesInit: function () {
    console.log('superslidesInit()');
    this.el.slides.superslides({
      play:                 '5200',
      animation:            'slide',
      animation_easing:     'easeInOutCubic',
      inherit_width_from:   this.el.slidesContainer,
      inherit_height_from:  this.el.slidesContainer
    });
  },
};

