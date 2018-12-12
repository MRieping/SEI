$('.btn-toggle').click(function() {
    $(this).find('.btn').toggleClass('active');  
    if ($(this).find('.btn-toggle-on').size()>0) {
    	$(this).find('.btn').toggleClass('btn-toggle-on');
    }
    $(this).find('.btn').toggleClass('btn-default');  
});