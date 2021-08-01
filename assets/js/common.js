$(document).ready(function () {
	var scrollT;
	var timer = 0;

	//scroll 되면 검정 배경색 추가
	$(window).on('scroll', function () {
		clearTimeout(timer);

		setTimeout(function () {
			scrollT = $(this).scrollTop();

			if (scrollT > 20) $('#header').addClass('bgchange');
			else $('#header').removeClass('bgchange');
		}, 50);
	});

	//메뉴 열기와 닫기 : ios에서는 disiplay: none이었다 block으로 바뀌어도 포커스가 가지 못하는 버그가 발생한다 -> visibility 속성으로 대신함
	$('.btn_all').on('click', function () {
		if ($(this).hasClass('close')) { 
			$('#gnb').animate({
				opacity: 0
			}, 300, function () {
				$(this).css({
					visibility: 'hidden',
					top: 150
				}).removeClass('active');
				$('.btn_all').removeClass('close').children('.blind').text('전체메뉴 열기');
			});
		} else { 
			$(this).toggleClass('close').children('.blind').text('전체메뉴 닫기');
			$('#gnb').addClass('active').css('visibility', 'visible').delay(500).animate({
				opacity: 1,
				top: 100
			}, 500);
		}

		//메뉴가 열린 채로 회원가입과 예약하기에서 포커스가 나가면 메뉴를 닫아주자
		$('.util a:first, .util a:last').on('blur', function () {
			//이탈된 포커스를 누군가 받아줄 대기 시간을 지정 - setTimeout
			setTimeout(function () {
				//.util 내부의 a가 아닌 위치에 포커스가 가면 초기화 시키기 
				if (!$('.util a').is(':focus')) $('.btn_all').trigger('click');
			}, 10);
		});

		return false;
	});

	// swiper 스크립트를 호출해서 사용하기
	const swiper1 = new Swiper('#cnt1 .swiper-container', {
		// Optional parameters
		direction: 'horizontal',
		loop: true,

		// pagination
		pagination: {
		el: '.swiper-pagination',
		type: 'fraction', //bullets(기본원형)
		},

		// Navigation arrows
		navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
		},

		autoplay: {
		delay: 5000, //1초 1000
		disableOnInteraction: false, //스와이프 후에 자동실행 비활성화를 차단(자동실행 유지)
		},
	});

	const swiper7 = new Swiper('#cnt7 .swiper-container', {
		direction: 'horizontal',

		// 이전과 다음 버튼
		navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
		},

		autoplay: {
		delay: 5000,
		},

		slidesPerView: 2,  //한화면에 보여질 슬라이더 개수
		spaceBetween: 100,  //슬라이더 사이 공백
	});

	//정지와 재생 스크립트 추가
	$('#cnt1 .btn_stop').on('click', function () {
		$(this).hide().siblings('button').show();
		swiper1.autoplay.stop();
	});
	$('#cnt1 .btn_play').on('click', function () {
		$(this).hide().siblings('button').show();
		swiper1.autoplay.start();
	});
	$('#cnt7 .btn_stop').on('click', function () {
		$(this).hide().siblings('button').show();
		swiper7.autoplay.stop();
	});
	$('#cnt7 .btn_play').on('click', function () {
		$(this).hide().siblings('button').show();
		swiper7.autoplay.start();
	});


	/* 패밀리사이트 */
	var $family = $("#footer .family");
	var $btn = $family.find("a").first(); 
	var $btnSubmit = $family.find("a").last(); 
	var tgHref;

	//1-1) $btn을 클릭해서 ul 태그 열어주기
	$btn.on("click", function (e) {
		e.preventDefault();

		$(this).next().stop().show().parent().addClass('on');

		//1-2) ul 태그에서 마우스가 떠나면 닫아주기
		$(this).next().on("mouseleave", function () {
			$(this).stop().hide().parent().removeClass('on');
		});

		//1-3) focus가 family 내부에 있지 않을 경우 닫아주기
		$family.find("a:first , a:last").on("blur", function () {
			setTimeout(function () {
				if (!$family.find("a").is(":focus")) $family.find(">ul").stop().hide();
			}, 1000);
		});

		//2) ul li a를 클릭하면 자신의 텍스트와 href를 변수에 담아 $btn에 글자를 강제로 바꾼다
		$family.find(">ul>li>a").on("click", function (e) {
			e.preventDefault();
			var tgTxt = $(this).text();
			tgHref = $(this).attr("href");

			$btn.text(tgTxt).focus().next().stop().show();
		});
	});

	//3) 확인버튼 눌러 페이지 이동시키기
	$btnSubmit.on("click", function (e) {
		e.preventDefault();
		if ($btn.text() == "Family Site") return false;

		window.open(tgHref, "popup");
	});

	// top 이동 버튼
	$(".btn_top").on("click", function () {
		$("html, body").stop().animate({
			scrollTop: 0
		});
		return false;
	});

});