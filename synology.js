;(function () {
	'use strict'

	// Внешний прокси-сервер
	const PROXY_URL = 'http://109.107.190.231:8118' // Замените на свой прокси URL

	// Функция для создания компонента YouTube с прокси
	function createYouTubeProxyPage() {
		var pageComponent = {
			name: 'YouTubeProxyPage',
			html: `
							<div style="background-color: #333; color: #fff; padding: 20px;">
									<h1>Добро пожаловать в YouTube с прокси</h1>
									<p>Вы можете смотреть YouTube через прокси-сервер.</p>
									<input id="youtubeUrl" type="text" placeholder="Введите URL видео YouTube" style="width: 80%; padding: 10px;">
									<button id="openVideoButton" style="padding: 10px; background-color: #007bff; color: white;">Открыть видео</button>
									<iframe id="youtubeIframe" width="100%" height="400px" style="display:none;" src="" frameborder="0"></iframe>
							</div>
					`,
			events: {
				// Обработчик для кнопки "Открыть видео"
				'#openVideoButton': function () {
					var youtubeUrl = document.getElementById('youtubeUrl').value.trim()
					if (youtubeUrl) {
						var proxiedUrl = `${PROXY_URL}/${encodeURIComponent(youtubeUrl)}`
						var iframe = document.getElementById('youtubeIframe')
						iframe.style.display = 'block'
						iframe.src = proxiedUrl
					} else {
						alert('Пожалуйста, введите URL видео YouTube')
					}
				},
			},
		}

		// Добавляем компонент в систему
		Lampa.Component.add(pageComponent.name, pageComponent)
	}

	// Функция для открытия страницы YouTube с прокси
	function openYouTubeProxyPage() {
		// Получаем компонент по имени и открываем его
		var page = Lampa.Component.get('YouTubeProxyPage')
		Lampa.View.open(page.html)
	}

	// Добавляем кнопку в меню
	function addMenu() {
		var menu = Lampa.View.menu()

		var button = $('<li class="menu__item selector focus">')
			.append('<div class="menu__text">YouTube с прокси</div>')
			.on('hover:enter', openYouTubeProxyPage) // Открытие страницы при нажатии

		menu.append(button) // Добавляем кнопку в меню
	}

	// Инициализация
	function init() {
		createYouTubeProxyPage() // Создаём компонент страницы YouTube с прокси
		addMenu() // Добавляем кнопку в меню
	}

	Lampa.Listener.follow('app', function (e) {
		if (e.type === 'ready') {
			init() // Инициализация при готовности приложения
		}
	})
})()
