;(function () {
	'use strict'

	// Создаём новый компонент
	function CustomPage(object) {
		var html = $('<div class="custom-page">')
		html.append('<h1 style="text-align:center;">Моя кастомная страница</h1>')

		this.create = function () {
			return html
		}

		this.start = function () {
			$('body').addClass('no-scroll')
		}

		this.destroy = function () {
			$('body').removeClass('no-scroll')
			html.remove()
		}
	}

	// Добавляем компонент в систему Lampa
	Lampa.Component.add('custom_page', CustomPage)

	// Функция для открытия страницы
	function openCustomPage() {
		Lampa.Activity.push({
			url: '',
			title: 'Кастомная страница',
			component: 'custom_page', // Используем имя зарегистрированного компонента
			page: true,
		})
	}

	// Добавляем кнопку в меню
	function addMenuButton() {
		var menu = $('.menu .menu__list').eq(0)
		var button = $('<li class="menu__item selector">')
			.append('<div class="menu__text">Моя страница</div>')
			.on('hover:enter', openCustomPage)

		menu.append(button)
	}

	// Запускаем после загрузки Lampa
	Lampa.Listener.follow('app', function (e) {
		if (e.type === 'ready') {
			addMenuButton()
		}
	})
})()
