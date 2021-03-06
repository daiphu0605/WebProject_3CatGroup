////////////////////////////////////////////////////////////////////////////////////////
////my functions
////////////////////////////////////////////////////////////////////////////////////////

function replaceProducts(currentpage, page, search, category, sort, price, supplier, author, publisher){
    
    $.getJSON("/api/shop/page", {page, search, category, sort, price, supplier, author, publisher}, function(temppage){
        $.getJSON("/api/shop/book-list", {page, search, category, sort, price, supplier, author, publisher}, function(books){
            //get template
            var booktemplate = Handlebars.compile($('#product-list').html());
            var pagetemplate = Handlebars.compile($('#page-list').html());
            
            //get data
            var productHTML = booktemplate({books});
            var pageHTML = pagetemplate(temppage);

            //display html
            $('#products').html(productHTML);
            $('#page').html(pageHTML);

    
            //scroll to top of page
            $('html, body').animate({ scrollTop: $('#books-list-header').offset().top }, 'slow');
        })
    })
}

function AddToCart(id){
    $.getJSON("/api/cart/add-to-cart", {id}, function(cart){     
        var icontemplate = Handlebars.compile($('#icon-template').html());
        var carttemplate = Handlebars.compile($('#cart-template').html());
        var iconHTML = icontemplate(cart);
        var cartHTML = carttemplate(cart);
        $('#icon-cart').html(iconHTML);
        $('#cart-detail').html(cartHTML);
    })
}

function highlightSort(code){
    if (code == 0){
        $('#sort0').addClass('filter-link-active');
    }
    else if (code == 1){
        $('#sort1').addClass('filter-link-active');
    }
    else if (code == 2){
        $('#sort2').addClass('filter-link-active');
    }
    else if (code == 3){
        $('#sort3').addClass('filter-link-active');
    }
    else if (code == 4){
        $('#sort4').addClass('filter-link-active');
    }
    else if (code == 5){
        $('#sort5').addClass('filter-link-active');
    }
    else if (code == 6){
        $('#sort6').addClass('filter-link-active');
    }
}

function highlightPrice(code){
    if (code == 0){
        $('#price0').addClass('filter-link-active');
    }
    else if (code == 1){
        $('#price1').addClass('filter-link-active');
    }
    else if (code == 2){
        $('#price2').addClass('filter-link-active');
    }
    else if (code == 3){
        $('#price3').addClass('filter-link-active');
    }
    else if (code == 4){
        $('#price4').addClass('filter-link-active');
    }
}

function checkSignIn(){
    swal.fire({
        title: 'Cảnh báo',
        text: "Bạn cần đăng nhập để thanh toán",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sign In'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location = "/signin";
        }
      })
}

function checkCart(){
    swal.fire(
        'Cảnh báo',
        'Bạn chưa thêm sách vào giỏ hàng',
        'warning'
      )
}

function increaseBook(id) {
    $.getJSON("/api/cart/increase", {id}, function(cart){ 
        var icontemplate = Handlebars.compile($('#icon-template').html());
        var carttemplate = Handlebars.compile($('#cart-template').html());
        var cartlisttemplate = Handlebars.compile($('#cart-list-template').html());
        var iconHTML = icontemplate(cart);
        var cartHTML = carttemplate(cart);
        var cartlistHTML = cartlisttemplate(cart);
        $('#icon-cart').html(iconHTML);
        $('#cart-detail').html(cartHTML);
        $('#cur-cart-list').html(cartlistHTML);
    })
}

function reduceBook(id) {
    $.getJSON("/api/cart/reduce", {id}, function(cart){
        var icontemplate = Handlebars.compile($('#icon-template').html());
        var carttemplate = Handlebars.compile($('#cart-template').html());
        var cartlisttemplate = Handlebars.compile($('#cart-list-template').html());
        var iconHTML = icontemplate(cart);
        var cartHTML = carttemplate(cart);
        var cartlistHTML = cartlisttemplate(cart);
        $('#icon-cart').html(iconHTML);
        $('#cart-detail').html(cartHTML);
        $('#cur-cart-list').html(cartlistHTML);
    })
}

function check(value, id){
    if(value == ""){
        if(id == "name") {
            $("#name-info").addClass('error').html('Không được để trống tên');
            return false;
        }
        else if (id == "province") {
            $("#province-info").addClass('error').html('Không được để trống tỉnh / thành phố');
            return false;
        }
        else if (id == "district") {
            $("#district-info").addClass('error').html('Không được để trống quận / huyện');
            return false;
        }
        else if (id == "ward") {
            $("#ward-info").addClass('error').html('Không được để trống phường / xã');
            return false;
        }
        else if (id == "address") {
            $("#address-info").addClass('error').html('Không được để trống địa chỉ');
            return false;
        }
        else if (id == "phone") {
            $("#phone-info").addClass('error').html('Không được để trống số điện thoại');
            return false;
        }
    }
    else {
        if(id == "name") {
            $("#name-info").removeClass('error').html('');
            return true;
        }
        else if (id == "province") {
            $("#province-info").removeClass('error').html('');
            return true;
        }
        else if (id == "district") {
            $("#district-info").removeClass('error').html('');
            return true;
        }
        else if (id == "ward") {
            $("#ward-info").removeClass('error').html('');
            return true;
        }
        else if (id == "address") {
            $("#address-info").removeClass('error').html('');
            return true;
        }
        else if (id == "phone") {
            //var phoneno = /^\d{10}$/;
            var phoneno = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
            if(value.match(phoneno) && value.length <= 12){
                $("#phone-info").removeClass('error').html('');
                return true;
            }
            else{
                $("#phone-info").addClass('error').html('Sai định dạng số điện thoại');
                return false;
            }
        }
    }
}

function completedClick(quantity) {
    var data = new Array();
    var ids = new Array();
    data[0] = document.getElementById('name').value;
    ids[0] = 'name';
    data[1] = document.getElementById('phone').value;
    ids[1] = 'phone';
    data[2] = document.getElementById('province').value;
    ids[2] = 'province';
    data[3] = document.getElementById('district').value;
    ids[3] = 'district';
    data[4] = document.getElementById('ward').value;
    ids[4] = 'ward';
    data[5] = document.getElementById('address').value;
    ids[5] = 'address';
    
    var radio1 = document.getElementById('online');
    var radio2 = document.getElementById('offline');

    if(quantity != '0') {
        var count = 0;
        for (i in data){
            var mcheck = check(data[i],ids[i]);
            if(mcheck == true){
                count++;
            }
        }

        if(count < 6){
            swal.fire(
                'Lỗi',
                'Thiếu thông tin thanh toán',
                'error'
              )
        }
        else {
            if(radio1.checked || radio2.checked){
                var method;
                if(radio1.checked){
                    method = radio1.value;
                }
                else{
                    method = radio2.value;
                }
                
                var name = data[0];
                var phone = data[1];
                var province = data[2];
                var district = data[3];
                var ward = data[4];
                var address = data[5];
                $.getJSON("/api/cart/save-cart", {name, phone, province, district, ward, address, method}, function(success){ 
                    if(success) {
                        swal.fire(
                            'Thành công',
                            'Bạn đã thêm đơn hàng',
                            'success'
                          )
                    }
                    else {
                        swal.fire(
                            'Lỗi',
                            'Không thể thêm đơn hàng',
                            'error'
                          )
                    }
                    window.location = "/shop";
                });

            }
            else{
                swal.fire(
                    'Lỗi',
                    'Chưa chọn phương thức thanh toán',
                    'error'
                  )
            }
        }
    }
    else {
        swal.fire(
            'Lỗi',
            'Giỏ hàng trống',
            'error'
          )
    }
}

function submitReview(id){
    var review = document.getElementById('review').value;
    var temp = review.replace(" ","");
    if (temp == ""){
        swal.fire(
            'Lỗi',
            'Chưa nhập bình luận',
            'error'
          );
    }
    else{
        $.getJSON("/api/shop/review", {id,review}, function(package){
            if(package == null) {
                swal.fire(
                    'Lỗi',
                    'Không thể thêm bình luận',
                    'error'
                  );
            }
            else{
                var reviewtemplate = Handlebars.compile($('#preview-form-template').html());
                var pagetemplate = Handlebars.compile($('#page-list').html());
                var reviewHTML = reviewtemplate(package);
                var pageHTML = pagetemplate(package.page);
                $('#preview-list').html(reviewHTML);
                $('#page').html(pageHTML);
                document.getElementById('review').value = "";
                  //scroll to top of comment
                $('html, body').animate({ scrollTop: $('#my-tab').offset().top }, 'slow');
            }
        })
    }
}

function changeReview(page,id){
    $.getJSON("/api/shop/change-review", {page, id}, function(package){
        //get template
        var reviewtemplate = Handlebars.compile($('#preview-form-template').html());
        var pagetemplate = Handlebars.compile($('#page-list').html());

        
        //get data
        var reviewHTML = reviewtemplate(package);
        var pageHTML = pagetemplate(package.page);

        //display html
        $('#preview-list').html(reviewHTML);
        $('#page').html(pageHTML);


        //scroll to top of comment
        $('html, body').animate({ scrollTop: $('#my-tab').offset().top }, 'slow');
    })
}

/*function updateCart(){
    $.getJSON("/api/cart/get-cart", {}, function(mycart){ 
        console.log(mycart);
        mycart.items.forEach(element => {
            var id = "#book" + element.item.id;
            var value = $(id).value;
            value = parseInt(value);

            var check = cart.items[i].qty - value;

            if(value == 0){
                $.getJSON("/api/cart/remove", {id}, function(cart){
                    var icontemplate = Handlebars.compile($('#icon-template').html());
                    var carttemplate = Handlebars.compile($('#cart-template').html());
                    var cartlisttemplate = Handlebars.compile($('#cart-list-template').html());
                    var iconHTML = icontemplate(cart);
                    var cartHTML = carttemplate(cart);
                    var cartlistHTML = carttemplate(cart);
                    $('#icon-cart').html(iconHTML);
                    $('#cart-detail').html(cartHTML);
                    $('#cur-cart-list').html(cartlistHTML);
                });
            }
            else if(check > 0)
            {
                value = check;
                $.getJSON("/api/cart/increase", {id,value}, function(cart){
                    var icontemplate = Handlebars.compile($('#icon-template').html());
                    var carttemplate = Handlebars.compile($('#cart-template').html());
                    var cartlisttemplate = Handlebars.compile($('#cart-list-template').html());
                    var iconHTML = icontemplate(cart);
                    var cartHTML = carttemplate(cart);
                    var cartlistHTML = carttemplate(cart);
                    $('#icon-cart').html(iconHTML);
                    $('#cart-detail').html(cartHTML);
                    $('#cur-cart-list').html(cartlistHTML);
                });
            }
            else if (check < 0){
                value = -check;
                $.getJSON("/api/cart/reduce", {id, value}, function(cart){
                    var icontemplate = Handlebars.compile($('#icon-template').html());
                    var carttemplate = Handlebars.compile($('#cart-template').html());
                    var cartlisttemplate = Handlebars.compile($('#cart-list-template').html());
                    var iconHTML = icontemplate(cart);
                    var cartHTML = carttemplate(cart);
                    var cartlistHTML = carttemplate(cart);
                    $('#icon-cart').html(iconHTML);
                    $('#cart-detail').html(cartHTML);
                    $('#cur-cart-list').html(cartlistHTML);
                });
            }
        });

    });
}*/

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

(function($,sr) {
	// debouncing function from John Hann
	// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	var debounce = function (func, threshold, execAsap) {
		var timeout;
		return function debounced () {
			var obj = this, args = arguments;
			function delayed () {
				if (!execAsap)
				                  func.apply(obj, args);
				timeout = null;
			}
			;
			if (timeout)
			              clearTimeout(timeout); else if (execAsap)
			              func.apply(obj, args);
			timeout = setTimeout(delayed, threshold || 100);
		}
		;
	}
	// smartresize 
	jQuery.fn[sr] = function(fn) {
		return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
	}
	;
}
)(jQuery,'smartresize');


$(document).ready(function() {
	///////////////////////////////
	// Set Home Slideshow Height
	///////////////////////////////
	function setHomeBannerHeight() {
		var windowHeight = jQuery(window).height();
		jQuery('#header').height(windowHeight);
	}
	///////////////////////////////
	// Center Home Slideshow Text
	///////////////////////////////
	function centerHomeBannerText() {
		var bannerText = jQuery('#header > .center');
		var bannerTextTop = (jQuery('#header').actual('height')/2) - (jQuery('#header > .center').actual('height')/2) - 20;
		bannerText.css('padding-top', bannerTextTop+'px');
		bannerText.show();
	}
	setHomeBannerHeight();
	centerHomeBannerText();
	//Resize events
	jQuery(window).smartresize(function() {
		setHomeBannerHeight();
		centerHomeBannerText();
	});
	
	function scroll() {
		if ($(window).scrollTop() == 0 ) {
			//$('.nav > li').removeClass('active');
			console.log($(window).scrollTop());
		} else {
			
		}
	}
	document.onscroll = scroll;
	var $scrollDownArrow = $('#scrollDownArrow');
	var animateScrollDownArrow = function() {
		$scrollDownArrow.animate( {
			top: 5,
		}
		, 400, "linear", function() {
			$scrollDownArrow.animate( {
				top: -5,
			}
			, 400, "linear", function() {
				animateScrollDownArrow();
			}
			);
		});
	}
	animateScrollDownArrow();
	//Set Down Arrow Button
	jQuery('#scrollDownArrow').click(function(e) {
		e.preventDefault();
		jQuery.scrollTo("#story", 1000, {
			offset:-(jQuery('#header #menu').height()), axis:'y'
		}
		);
	});
	jQuery('.nav > li > a, #logo a').click(function(e) {
		e.preventDefault();

		jQuery.scrollTo(jQuery(this).attr('href'), 400, {
			offset:-(jQuery('#header #menu').height()), axis:'y'
		}
		);
	});


});


////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

(function ($) {
    "use strict";

    /*[ Load page ]
    ===========================================================*/
    $(".animsition").animsition({
        inClass: 'fade-in',
        outClass: 'fade-out',
        inDuration: 1500,
        outDuration: 800,
        linkElement: '.animsition-link',
        loading: true,
        loadingParentElement: 'html',
        loadingClass: 'animsition-loading-1',
        loadingInner: '<div class="loader05"></div>',
        timeout: false,
        timeoutCountdown: 5000,
        onLoadEvent: true,
        browser: [ 'animation-duration', '-webkit-animation-duration'],
        overlay : false,
        overlayClass : 'animsition-overlay-slide',
        overlayParentElement : 'html',
        transition: function(url){ window.location.href = url; }
    });
    
    /*[ Back to top ]
    ===========================================================*/
    var windowH = $(window).height()/2;

    $(window).on('scroll',function(){
        if ($(this).scrollTop() > windowH) {
            $("#myBtn").css('display','flex');
        } else {
            $("#myBtn").css('display','none');
        }
    });

    $('#myBtn').on("click", function(){
        $('html, body').animate({scrollTop: 0}, 300);
    });


    /*==================================================================
    [ Fixed Header ]*/
    var headerDesktop = $('.container-menu-desktop');
    var wrapMenu = $('.wrap-menu-desktop');

    if($('.top-bar').length > 0) {
        var posWrapHeader = $('.top-bar').height();
    }
    else {
        var posWrapHeader = 0;
    }
    

    if($(window).scrollTop() > posWrapHeader) {
        $(headerDesktop).addClass('fix-menu-desktop');
        $(wrapMenu).css('top',0); 
    }  
    else {
        $(headerDesktop).removeClass('fix-menu-desktop');
        $(wrapMenu).css('top',posWrapHeader - $(this).scrollTop()); 
    }

    $(window).on('scroll',function(){
        if($(this).scrollTop() > posWrapHeader) {
            $(headerDesktop).addClass('fix-menu-desktop');
            $(wrapMenu).css('top',0); 
        }  
        else {
            $(headerDesktop).removeClass('fix-menu-desktop');
            $(wrapMenu).css('top',posWrapHeader - $(this).scrollTop()); 
        } 
    });


    /*==================================================================
    [ Menu mobile ]*/
    $('.btn-show-menu-mobile').on('click', function(){
        $(this).toggleClass('is-active');
        $('.menu-mobile').slideToggle();
    });

    var arrowMainMenu = $('.arrow-main-menu-m');

    for(var i=0; i<arrowMainMenu.length; i++){
        $(arrowMainMenu[i]).on('click', function(){
            $(this).parent().find('.sub-menu-m').slideToggle();
            $(this).toggleClass('turn-arrow-main-menu-m');
        })
    }

    $(window).resize(function(){
        if($(window).width() >= 992){
            if($('.menu-mobile').css('display') == 'block') {
                $('.menu-mobile').css('display','none');
                $('.btn-show-menu-mobile').toggleClass('is-active');
            }

            $('.sub-menu-m').each(function(){
                if($(this).css('display') == 'block') { console.log('hello');
                    $(this).css('display','none');
                    $(arrowMainMenu).removeClass('turn-arrow-main-menu-m');
                }
            });
                
        }
    });


    /*==================================================================
    [ Show / hide modal search ]*/
    $('.js-show-modal-search').on('click', function(){
        $('.modal-search-header').addClass('show-modal-search');
        $(this).css('opacity','0');
    });

    $('.js-hide-modal-search').on('click', function(){
        $('.modal-search-header').removeClass('show-modal-search');
        $('.js-show-modal-search').css('opacity','1');
    });

    $('.container-search-header').on('click', function(e){
        e.stopPropagation();
    });


    /*==================================================================
    [ Isotope ]*/
    var $topeContainer = $('.isotope-grid');
    var $filter = $('.filter-tope-group');

    // filter items on button click
    $filter.each(function () {
        $filter.on('click', 'button', function () {
            var filterValue = $(this).attr('data-filter');
            $topeContainer.isotope({filter: filterValue});
        });
        
    });

    // init Isotope
    $(window).on('load', function () {
        var $grid = $topeContainer.each(function () {
            $(this).isotope({
                itemSelector: '.isotope-item',
                layoutMode: 'fitRows',
                percentPosition: true,
                animationEngine : 'best-available',
                masonry: {
                    columnWidth: '.isotope-item'
                }
            });
        });
    });

    var isotopeButton = $('.filter-tope-group button');

    $(isotopeButton).each(function(){
        $(this).on('click', function(){
            for(var i=0; i<isotopeButton.length; i++) {
                $(isotopeButton[i]).removeClass('how-active1');
            }

            $(this).addClass('how-active1');
        });
    });

    /*==================================================================
    [ Filter / Search product ]*/
    $('.js-show-filter').on('click',function(){
        $(this).toggleClass('show-filter');
        $('.panel-filter').slideToggle(400);

        if($('.js-show-search').hasClass('show-search')) {
            $('.js-show-search').removeClass('show-search');
            $('.panel-search').slideUp(400);
        }    
    });

    $('.js-show-search').on('click',function(){
        $(this).toggleClass('show-search');
        $('.panel-search').slideToggle(400);

        if($('.js-show-filter').hasClass('show-filter')) {
            $('.js-show-filter').removeClass('show-filter');
            $('.panel-filter').slideUp(400);
        }    
    });




    /*==================================================================
    [ Cart ]*/
    $('.js-show-cart').on('click',function(){
        $('.js-panel-cart').addClass('show-header-cart');
    });

    $('.js-hide-cart').on('click',function(){
        $('.js-panel-cart').removeClass('show-header-cart');
    });

    /*==================================================================
    [ Cart ]*/
    $('.js-show-sidebar').on('click',function(){
        $('.js-sidebar').addClass('show-sidebar');
    });

    $('.js-hide-sidebar').on('click',function(){
        $('.js-sidebar').removeClass('show-sidebar');
    });

    /*==================================================================
    [ +/- num product ]*/
    $('.btn-num-product-down').on('click', function(){
        var numProduct = Number($(this).next().val());
        if(numProduct > 0) $(this).next().val(numProduct - 1);
    });

    $('.btn-num-product-up').on('click', function(){
        var numProduct = Number($(this).prev().val());
        $(this).prev().val(numProduct + 1);
    });

    /*==================================================================
    [ Rating ]*/
    $('.wrap-rating').each(function(){
        var item = $(this).find('.item-rating');
        var rated = -1;
        var input = $(this).find('input');
        $(input).val(0);

        $(item).on('mouseenter', function(){
            var index = item.index(this);
            var i = 0;
            for(i=0; i<=index; i++) {
                $(item[i]).removeClass('zmdi-star-outline');
                $(item[i]).addClass('zmdi-star');
            }

            for(var j=i; j<item.length; j++) {
                $(item[j]).addClass('zmdi-star-outline');
                $(item[j]).removeClass('zmdi-star');
            }
        });

        $(item).on('click', function(){
            var index = item.index(this);
            rated = index;
            $(input).val(index+1);
        });

        $(this).on('mouseleave', function(){
            var i = 0;
            for(i=0; i<=rated; i++) {
                $(item[i]).removeClass('zmdi-star-outline');
                $(item[i]).addClass('zmdi-star');
            }

            for(var j=i; j<item.length; j++) {
                $(item[j]).addClass('zmdi-star-outline');
                $(item[j]).removeClass('zmdi-star');
            }
        });
    });
    
    /*==================================================================
    [ Show modal1 ]*/
    $('.js-show-modal1').on('click',function(e){
        e.preventDefault();
        $('.js-modal1').addClass('show-modal1');
    });

    $('.js-hide-modal1').on('click',function(){
        $('.js-modal1').removeClass('show-modal1');
    });



})(jQuery);