;(function () {
	'use strict'

	// Создаем компонент для кастомной страницы
	function CustomPage() {
		var html = $('<div class="custom-page">')

		html.append('<h1 style="text-align:center;">Моя кастомная страница</h1>')
		html.append(
			'<div style="text-align:center;"><button id="closePage">Закрыть</button></div>'
		)

		this.render = function () {
			return html
		}

		this.start = function () {
			// Логика при старте страницы
			html.find('#closePage').on('click', function () {
				Lampa.Activity.backward() // Закрытие страницы
			})
		}

		this.destroy = function () {
			html.remove()
		}
	}

	// Регистрируем компонент в Lampa
	Lampa.Component.add('custom_page', CustomPage)

	// Функция для открытия кастомной страницы
	function openCustomPage() {
		Lampa.Activity.push({
			url: '',
			title: 'Кастомная страница',
			component: 'custom_page', // Используем зарегистрированный компонент
			page: 1,
		})
	}

	// Добавляем кнопку в меню
	function addMenuButton() {
		var menu = $('.menu .menu__list').eq(0)
		var button = $('<li class="menu__item selector focus">')
			.append('<div class="menu__text">Моя страница</div>')
			.on('hover:enter', function () {
				openCustomPage()
			})

		menu.append(button)
	}

	// Добавляем стили для кастомной страницы
	function addStyles() {
		var styles = `
			<style>
				.custom-page {
					padding: 20px;
					color: white;
					text-align: center;
				}
				.custom-page h1 {
					font-size: 24px;
					margin-bottom: 20px;
				}
				#closePage {
					padding: 10px 20px;
					background-color: #404040;
					color: white;
					border: none;
					border-radius: 5px;
					cursor: pointer;
				}
				#closePage:hover {
					background-color: #505050;
				}
			</style>
		`
		$('body').append(styles)
	}

	// Запускаем после загрузки Lampa
	Lampa.Listener.follow('app', function (e) {
		if (e.type === 'ready') {
			addMenuButton()
			addStyles()
		}
	})
})()
