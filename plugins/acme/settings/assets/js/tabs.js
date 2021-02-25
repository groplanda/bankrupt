    //rewiews tabs
    $('.list-rewiews div').click(function() {
      $(this).siblings().removeClass('active');
      $(this).addClass('active');

      var page = $(this).attr('data-page');
      $('.rewiews-text').siblings().removeClass('active');
      $('.rewiews-text.page-'+ page +'').addClass('active');
      //console.log($(this).attr('data-page'));
  });