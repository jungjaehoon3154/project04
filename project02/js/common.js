$(document).ready(function() {

  const $gnb = $('#gnb > ul > li');
  const $gnbDep2 = $gnb.find('ul');

  $gnbDep2.hide();

  const $header = $('#header');

  // 헤더 스크롤 고정
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 10) {
      $('#header').addClass('on scroll');
    } else {
      $('#header').removeClass('on scroll');
    }
  }); 

  // 네비 제어
  $gnb.on('mouseenter focusin', function () {
    $gnbDep2.stop().slideDown();
    $('#header').addClass('on').find('#gnb').addClass('active');
  });
  $header.on('mouseleave', function () {
    $gnbDep2.stop().slideUp(function () {
      if ($('#header').is('.scroll')) $('#gnb').removeClass('active');
      else $('#header').removeClass('on').find('#gnb').removeClass('active');
    });
  }); 
  $gnb.find('a').last().on('keydown', function (e) {
    if ((!e.shiftKey || e.keyCode !== 16) && e.keyCode === 9) $gnb.trigger('mouseleave');
  });

  // 언어선택
  $('.util .lang button').on('mouseenter focusin', function () {
    $(this).next().stop().slideDown('fast');
  });
  $('.util .lang').on('mouseleave', function () {
    $(this).children('ul').stop().slideUp();
  });
  $('.util .lang li:last').on('focusout', function () {
    $(this).parent('ul').stop().slideUp();
  });

  // 모바일 네비게이션
  $('.gnb_open').on('click', function () {
  
    const $openBtn = $(this);
    const $dim = $('#dim');
    const $mGnb = $openBtn.next().next();
    const $first = $mGnb.find('.first');
    const $last = $mGnb.find('.last');

    // 1) 스크롤 제어 : #wrap의 높이값을 html, body 높이로 강제 지정 
    const wrapHei = $('#wrap').outerHeight();
    console.log(wrapHei);
    $('html, body').css({height: wrapHei, overflow: 'hidden'});

    // 2) .gnb_wrap 보여지게 처리 : visibility, animate() - left 0px => 첫번째 요소에 포커스 강제 이동
    $dim.stop().fadeIn('fast');
    $mGnb.css('visibility', 'visible').stop().animate({left: '20%', maxWidth: '80%'});
    $first.focus();

    $first.on('keydown', function (e) {
      console.log(e.keyCode); //tab => 9
      if (e.shiftKey && e.keyCode === 9) {
        e.preventDefault();
        $last.focus();
      }
    });
    $last.on('keydown', function (e) {
      if (!e.shiftKey && e.keyCode === 9) {
        e.preventDefault();
        $first.focus();
      }
    });

    // 닫기 버튼 클릭이벤트
    $last.on('click', function () {
      // 1) html, body 에 지정한 높이를 제거 - removeAttr('style')
      $('html, body').removeAttr('style');
      $dim.stop().fadeOut();

      // 2) .gnb_wrap 숨겨지게 처리 : animate() - left 100% => 완료함수로 visibility => 열기버튼으로 포커스 강제 이동
      $mGnb.stop().animate({left: '100%'}, function () {
        // 추가사항) #mobile_gnb li.on 제거 열려진 뎁스2 ul은 숨기기
        $(this).css({visibility: 'hidden', maxWidth: 0}).find('#mobile_gnb ul li.on').removeClass('on').children('ul').css({visibility: 'hidden', maxHeight: 0});
        familyUp();  //패밀리사이트가 열려있다면 이것도 닫아주기
        $openBtn.focus();
      });
    });
  });
  // 네비게이션 열리고 닫기기(depth1 a 클릭)
  $('#mobile_gnb > ul > li > a').on('click', function () {
    if ($(this).next().length === 0) {  //뎁스1a 만 있는 경우
      return true;
    } else { //뎁스2 ul까지 있는 경우
      // 열려질 ul의 높이를 스크립트로 지정하여 변수 설정 : li의 높이(margin포함), li의 개수 => li의 높이 x  li의 개수 = ul 높이를 알수 있다
      const liHei = $(this).next().children().outerHeight(true);
      const liSize = $(this).next().children().length;
      const ulHei = liHei * liSize;
      console.log(liHei, liSize, ulHei);

      // 초기화 추가 설정: 미리 열려진 다른 메뉴 닫아주기
      $(this).parent().siblings().removeClass('on').children('ul').stop().animate({maxHeight: 0}, function () {
        $(this).css({visibility: 'hidden'});
      });
      if ($(this).parent().hasClass('on')) { //현재 클릭해서 열려져 있는 경우
        $(this).parent().removeClass('on').children('ul').stop().animate({maxHeight: 0}, function () {
          $(this).css({visibility: 'hidden'});
        });
      } else { //열려져 있지 않은 경우: ul -> visibility -> animate() -> 부모li.on
        $(this).next().css({visibility: 'visible'}).stop().animate({maxHeight: ulHei}).parent().addClass('on');
      }
    }
    return false;
  });

  // 모바일 패밀리사이트 제어
  $('.mobile_family_site > a').on('click', function () {
    if ($(this).is('.on')) {
      $(this).removeClass('on').next().stop().animate({maxHeight: 0}, function () {
        $(this).css({visibility: 'visible'});
      });
    } else {
      $(this).addClass('on').next().css({visibility: 'visible'}).stop().animate({maxHeight: 500});
    }
    return false;
  });
  function familyUp() {
    $('.mobile_family_site').children('a').removeClass('on').next().stop().animate({maxHeight: 0}, function () {
      $(this).css({visibility: 'visible'});
    });
  }
  
  // footer 패밀리 사이트 제어
  $('.family_site button').on('click', function() {
    $('.family_site ul').toggle()
    $('.family_site').toggleClass('active')
  });
    $('.family_site button').on('keydown', function(e){
      console.log(e.keyCode);  //tab 9
      if (e.shiftKey && e.keyCode === 9) $('.family_site button').trigger('click')
    });
    $('.family_site a').last().on('keydown', function(e){
      if (!e.shiftKey && e.keyCode === 9) $('.family_site button').trigger('click')
    });

}); 





