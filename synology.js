;(function () {
	'use strict'

	// Создаём новый компонент
	function createCustomPage(object) {
		var html = $('<div class="custom-page">')
		html.append('<h1 style="text-align:center;">Моя кастомная страница</h1>')

		var last_scroll = 0

		// Запоминаем позицию скролла
		this.start = function () {
			$('body').addClass('no-scroll')
			html.on('scroll', function () {
				last_scroll = html.scrollTop()
			})
		}

		// Удаляем при выходе
		this.destroy = function () {
			$('body').removeClass('no-scroll')
			html.remove()
		}

		// Возвращаем рендер страницы
		this.render = function () {
			return html
		}
	}

	// Добавляем компонент в систему Lampa
	Lampa.Component.add('custom_page', createCustomPage)

	// Функция для открытия страницы
	function openCustomPage() {
		Lampa.Activity.push({
			url: '',
			title: 'Кастомная страница',
			component: 'custom_page', // Правильное подключение
			page: true,
		})
	}

	// Добавляем кнопку в меню
	function addMenuButton() {
		var menu = $('.menu .menu__list').eq(0)
		var button = $('<li class="menu__item selector">')
			.append('<div class="menu__text">Моя страница</div>')
			.on('hover:enter', openCustomPage) // Вызываем открытие страницы

		menu.append(button)
	}

	// Запускаем после загрузки Lampa
	Lampa.Listener.follow('app', function (e) {
		if (e.type === 'ready') {
			addMenuButton()
		}
	})
})()
