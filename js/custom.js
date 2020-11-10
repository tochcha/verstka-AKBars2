"use strict";

/*$(window).on("load",function(){/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)?$("body").addClass("ios"):$("body").addClass("web");$("body").removeClass("loaded")});*/


document.addEventListener("DOMContentLoaded", function () {
	var body = document.body;
	body.classList.remove("loading");
});

// модальное окно
const uniOverlay = document.querySelector('.uni-overlay');
const modalButton = document.querySelectorAll("[data-modal-button]");
const closeButton = document.querySelectorAll("[data-modal-close]");

modalButton.forEach(modalHandler);
function modalHandler(item) {
	item.addEventListener("click", openModal);
};
function openModal() {
	document.getElementById(this.dataset.modalButton).classList.add("modal_box__active");
	uniOverlay.classList.add("active");
};

closeButton.forEach(function (item) {
	item.addEventListener("click", closeModal);
});
uniOverlay.addEventListener("click", closeModal);
function closeModal() {
	document.querySelectorAll(".modal_box").forEach(function (item) {
		item.classList.remove("modal_box__active");
	});
	uniOverlay.classList.remove("active");
};
// модальное окно end


// кастомный скроллбар описание: http://manos.malihu.gr/jquery-custom-content-scroller/
// кастомный скроллбар демо (theme): http://manos.malihu.gr/repository/custom-scrollbar/demo/examples/scrollbar_themes_demo.html
/*if($('.scrollY').length) {
	$(".scrollY").mCustomScrollbar({
		axis:"y",
		theme:"dark-2",
		scrollbarPosition: "inside",
		scrollInertia: "400",
		documentTouchScroll: "false",
		advanced:{
			autoExpandHorizontalScroll:"true",
		}
	});
};
if($('.scrollX').length) {
	$(".scrollX").mCustomScrollbar({
		axis:"x",
		theme:"inset",
		scrollbarPosition: "outside",
		scrollInertia: "400",
		documentTouchScroll: "false",
	});
};*/


// тень от меню при прокрутке страницы больше чем 355px
$(window).scroll(function () {
	if ($(this).scrollTop() > 355) {
		$('body').addClass('fixed');
	} else {
		$('body').removeClass('fixed');
	}
	if ($(this).scrollTop() > 255) {
		$('body').addClass('fup');
	} else {
		$('body').removeClass('fup');
	}
});

// при адаптации вырезать блок и вставить в другое место
$(window).on('resize load', function () {
	if ($(window).width() < 992) {
		$('.header__center').detach().insertAfter($('.insert_in_mobile_header'));
		$('.phonebox--header').detach().insertAfter($('.insert_in_mobile_phone'));
	}
	if ($(window).width() >= 992) {
		$('.header__center').detach().insertAfter($('.insert_in_desktop_header'));
		$('.phonebox--header').detach().insertAfter($('.insert_in_desktop_phone'));
	}
});

$('.telephone_icon').click(function () {
	$('.phonebox--header, .uni-overlay').toggleClass('active');
});
$('.uni-overlay').click(function () {
	$('.phonebox--header, .uni-overlay').removeClass('active');
});

// маска телефона
$(function () {
	$(".telmask").mask("+7(999) 999-99-99");
	$(".inp_time").mask("99:99 — 99:99");
	$(".input_inn").mask("9999999999?99");
});

$(function () {
	$('.form_callback .checkbox label').click(function () {
		if ($("#radio-2").attr("checked") !== 'checked') {
			$('.form__item--toggle').toggleClass('form__item--hidden');
		}
	})
	return true;
});

// валидация форм
$(function () {
	$(".btn-submit").on("click", validate);

	// валидация email
	function validateEmail(email) {
		var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		return re.test(String(email).toLowerCase());
	}

	// отправка формы
	/* function sendForm() {
		$(".error_email").text("Form sending").fadeIn();
	} */

	function validate() {
		var email = $(".email").val();
		var $error_email = $(".error_email");
		$error_email.text("");

		if (validateEmail(email)) {
			$error_email.fadeOut();
			$(".email").removeClass('inputtext--error');
			// отправка формы
			/* sendForm(); */
		} else {
			$error_email.fadeIn();
			$(".email").addClass('inputtext--error');
			$error_email.text('Email заполнен неверно');
		}

		// валидация имени
		var fio = $(".fio").val();
		var fioLength = fio.length;
		var $error_fio = $(".error_fio");
		$error_fio.text("");

		var per_name = /^[а-яё\s-]+$/i;
		if (!per_name.test(fio)) {
			$error_fio.fadeIn();
			$(".fio").addClass('inputtext--error');
			$error_fio.text('Введите корректное имя на русском языке');
		} else {
			$error_fio.fadeIn();
			if (fioLength > 1) {
				$error_fio.fadeOut();
				$(".fio").removeClass('inputtext--error');
			} else {
				$error_fio.fadeIn();
				$(".fio").addClass('inputtext--error');
				$error_fio.text('Слишком короткое имя');
			}
		}

		// валидация суммы
		/* var input_sum = $(".input_sum").val();
		var input_sumLength = input_sum.length;
		var $error_sum = $(".error_sum");
		$error_sum.text("");
		
		if (input_sumLength > 3) {
			$error_sum.fadeOut();
			$(".input_sum").removeClass('inputtext--error');
		} else {
			$error_sum.fadeIn();
			$(".input_sum").addClass('inputtext--error');
			$error_sum.text('Слишком маленькая сумма');
		} */

		// валидация ИНН
		var input_inn = $(".input_inn").val();
		console.log(input_inn);

		var input_innLength = input_inn.length;
		var $error_inn = $(".error_inn");
		if (input_innLength > 0) {
			$error_inn.fadeOut();
			$(".input_inn").removeClass('inputtext--error');
		} else {
			$error_inn.fadeIn();
			$(".input_inn").addClass('inputtext--error');
			$error_inn.text('ИНН должен быть 10-12 цифр');
		}

		// валидация телефонов
		var input_tel = $(".input_tel").val();
		var input_telLength = input_tel.length;
		var $error_tel = $(".error_tel");
		if (input_telLength > 0) {
			$error_tel.fadeOut();
			$(".input_tel").removeClass('inputtext--error');
		} else {
			$error_tel.fadeIn();
			$(".input_tel").addClass('inputtext--error');
			$error_tel.text('Номер телефона заполнен неверно');
		}

		var input_tel2 = $(".input_tel2").val();
		var input_telLength2 = input_tel2.length;
		var $error_tel2 = $(".error_tel2");
		if (input_telLength2 > 0) {
			$error_tel2.fadeOut();
			$(".input_tel2").removeClass('inputtext--error');
		} else {
			$error_tel2.fadeIn();
			$(".input_tel2").addClass('inputtext--error');
			$error_tel2.text('Номер телефона заполнен неверно');
		}

		return false;
	}
});

// ползунок
$(".polzunok").slider({
	animate: true,
	range: "min",
	value: 10000000,
	min: 5000000,
	max: 65000000,
	step: 1000000,
	slide: function (event, ui) {
		$("#slider-input").val(ui.value);
		var $test = $("#slider-input");
		var val = $test.prop("value");
		$test.prop("value", prettify(val));
	}
});
// пробелы в инпут между тысячами
function prettify(num) {
	var n = num.toString();
	var separator = " ";
	return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + separator);
}
