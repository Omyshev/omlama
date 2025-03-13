;(function () {
	'use strict'

	function createCustomPage() {
		var html = $('<div class="custom-page lampa-box">')
			.append('<h1 style="text-align:center;">Моя кастомная страница</h1>')
			.append('<p style="text-align:center;">Здесь будет ваш контент...</p>')

		return {
			render: function () {
				return html
			},
			destroy: function () {
				html.remove()
			},
		}
	}

	function openCustomPage() {
		var page = createCustomPage()
		Lampa.Activity.push({
			url: '',
			title: 'Кастомная страница',
			component: page,
		})
	}

	function addMenuButton() {
		var menu = $('.menu .menu__list').eq(0)
		var button = $('<li class="menu__item selector focus">')
			.append('<div class="menu__text">Моя страница</div>')
			.on('hover:enter', openCustomPage)

		menu.append(button)
	}

	function init() {
		addMenuButton()
	}

	Lampa.Listener.follow('app', function (e) {
		if (e.type === 'ready') {
			init()
		}
	})
})()
