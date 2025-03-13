;(function () {
	'use strict'

	// Создаем компонент
	function createCustomPage() {
		var html = $('<div class="custom-page">')
		html.append('<h1 style="text-align:center;">Моя кастомная страница</h1>')

		return {
			render: function () {
				return html
			},
			start: function () {},
			destroy: function () {
				html.remove()
			},
		}
	}

	// Добавляем кнопку в меню
	function addMenuButton() {
		var menu = $('.menu .menu__list').eq(0)
		var button = $('<li class="menu__item selector focus">')
			.append('<div class="menu__text">Моя страница</div>')
			.on('hover:enter', function () {
				Lampa.Component.create({
					name: 'custom_page',
					visible: true,
					// Добавляем страницу в Lampa
					onCreate: function () {
						var page = createCustomPage()
						Lampa.Activity.push({
							url: '',
							title: 'Кастомная страница',
							component: page, // Тут правильный компонент
						})
					},
				})
			})

		menu.append(button)
	}

	// Запускаем после загрузки Lampa
	Lampa.Listener.follow('app', function (e) {
		if (e.type === 'ready') {
			addMenuButton()
		}
	})
})()
