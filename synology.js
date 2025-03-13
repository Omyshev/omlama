;(function () {
	'use strict'

	function createCustomPage() {
		let html = $('<div class="custom-page">')
			.css({
				display: 'flex',
				'align-items': 'center',
				'justify-content': 'center',
				height: '100vh',
				'font-size': '24px',
			})
			.text('Привет')

		return {
			render: function () {
				return html
			},
			start: function () {},
			pause: function () {},
			stop: function () {},
			destroy: function () {
				html.remove()
			},
		}
	}

	function openCustomPage() {
		Lampa.Activity.push({
			url: '',
			title: 'Моя страница',
			component: createCustomPage(),
		})
	}

	function addMenuButton() {
		let menu = $('.menu .menu__list').eq(0)
		let button = $('<li class="menu__item selector focus">')
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
