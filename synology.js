;(function () {
	'use strict'

	function CustomPage(object) {
		var html = $('<div class="custom-page">')

		html.append('<h1 style="text-align:center;">Моя кастомная страница</h1>')
		html.append(
			'<div style="text-align:center;"><button id="closePage">Закрыть</button></div>'
		)

		this.create = function () {
			return html
		}

		this.start = function () {}

		this.destroy = function () {
			html.remove()
		}

		html.find('#closePage').on('click', function () {
			Lampa.Activity.backward() // Закрытие страницы
		})
	}

	Lampa.Component.add('custom_page', CustomPage) // Добавляем компонент в Lampa

	function openCustomPage() {
		Lampa.Activity.push({
			url: '',
			title: 'Кастомная страница',
			component: 'custom_page',
			page: true,
		})
	}

	function addMenuButton() {
		var menu = $('.menu .menu__list').eq(0)
		var button = $('<li class="menu__item selector focus">')
			.append('<div class="menu__text">Моя страница</div>')
			.on('hover:enter', function () {
				openCustomPage()
			})

		menu.append(button)
	}

	Lampa.Listener.follow('app', function (e) {
		if (e.type === 'ready') {
			addMenuButton()
		}
	})
})()
