$(document).ready(function (){
	var $header = $('#header');
	var $gnb = $("#gnb > ul");
	$gnb.find(" li ul").hide();

	$gnb.find("> li > a").on("mouseenter focus",function  () {
		$gnb.find("> li.on").removeClass("on").children("ul").hide();
		$(this).parent().has('ul').closest($header).addClass('active');	
		$(this).next().show().parent().addClass("on");
	});

	$gnb.on("mouseleave",function  () {
		$header.removeClass('active');
		$gnb.find("> li.on").removeClass("on").children("ul").hide();
	});

	$("#gnb a:first , #gnb a:last").on("blur",function  () {
		setTimeout(function  () {
			if ( !$("#gnb a").is(":focus") ) {
				$gnb.mouseleave();
			}1
		}, 10);
	});

	//fullpage
	$('#mainContent').fullpage({
		navigation: true,
		navigationPosition: 'right',
		navigationTooltips: ['한화라이프 리즈', 'About 리즈', 'career', 'home', 'recruit', '푸터'],
		afterRender: function () {
		$('.fp-tooltip').attr('aria-hidden', true);
		}
	});

	// top 이동
	$('.btn_top').on('click', function () {
		fullpage_api.moveTo(1); 
		$('.logo a').focus();
	});
});