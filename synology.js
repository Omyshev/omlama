;(function () {
	'use strict'

	function Component(object) {
		var html = Lampa.Template.js('hello_world_main'),
			body = html.find('.hello_world-main__body')

		this.create = function () {
			this.activity.loader(true)

			// Добавляем текст "Привет" на страницу
			body.text('Привет')

			this.activity.loader(false)
		}

		this.start = function () {
			if (
				Lampa.Activity.active() &&
				Lampa.Activity.active().activity !== this.activity
			)
				return
			Lampa.Controller.add('content', {
				invisible: true,
				toggle: function toggle() {
					Lampa.Controller.collectionSet(html)
					Lampa.Controller.collectionFocus(false, html)
				},
				left: function left() {
					if (Navigator.canmove('left')) Navigator.move('left')
					else Lampa.Controller.toggle('menu')
				},
				up: function up() {
					if (Navigator.canmove('up')) Navigator.move('up')
					else Lampa.Controller.toggle('head')
				},
				right: function right() {
					Navigator.move('right')
				},
				down: function down() {
					Navigator.move('down')
				},
				back: function back() {
					Lampa.Activity.backward()
				},
			})
			Lampa.Controller.toggle('content')
		}

		this.pause = function () {}

		this.stop = function () {}

		this.render = function () {
			return html
		}

		this.destroy = function () {
			html.remove()
		}
	}

	function startPlugin() {
		window.lampa_settings.install_proxy = true // Включаем использование прокси
		window.lampa_settings.proxy_address =
			'socks5://b9Y8LO42xC:dlVt535kHl@109.107.190.231:39011' // Прокси с аутентификацией

		window.plugin_hello_world = true
		Lampa.Lang.add({
			hello_world_greeting: {
				ru: 'Привет',
				en: 'Hello',
				uk: 'Привіт',
				be: 'Прывітанне',
				zh: '你好',
				pt: 'Olá',
			},
		})

		var manifest = {
			type: 'plugin',
			version: '1.0.0',
			name: 'Hello World',
			description: 'Простое расширение, которое говорит "Привет"',
			component: 'hello_world',
		}

		Lampa.Manifest.plugins = manifest
		Lampa.Template.add(
			'hello_world_main',
			`
					<div class="hello_world-main">
							<div class="hello_world-main__body"></div>
					</div>
			`
		)

		Lampa.Template.add(
			manifest.component + '_style',
			`
					<style>
							.hello_world-main {
									padding: 20px;
									font-size: 24px;
									text-align: center;
							}
					</style>
			`
		)

		function add() {
			var button = $(`
							<li class="menu__item selector">
									<div class="menu__ico">
											<svg viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
													<path fill="currentColor" d="M256 0C114.833 0 0 114.833 0 256s114.833 256 256 256 256-114.833 256-256S397.167 0 256 0Zm0 472.341c-119.275 0-216.341-97.066-216.341-216.341S136.725 39.659 256 39.659c119.295 0 216.341 97.066 216.341 216.341S375.275 472.341 256 472.341z"/>
													<circle cx="160" cy="250" r="60" fill="currentColor"/>
													<circle cx="320" cy="150" r="60" fill="currentColor"/>
													<circle cx="320" cy="350" r="60" fill="currentColor"/>
													<path fill="currentColor" d="M35 135h270v30H35zm175.782 100h270v30h-270zM35 335h270v30H35z"/>
											</svg>
									</div>
									<div class="menu__text">${manifest.name}</div>
							</li>
					`)

			button.on('hover:enter', function () {
				Lampa.Activity.push({
					url: '',
					title: manifest.name,
					component: manifest.component,
					page: 1,
				})
			})

			$('.menu .menu__list').eq(0).append(button)
			$('body').append(
				Lampa.Template.get(manifest.component + '_style', {}, true)
			)
		}

		Lampa.Component.add(manifest.component, Component)
		if (window.appready) add()
		else {
			Lampa.Listener.follow('app', function (e) {
				if (e.type == 'ready') add()
			})
		}
	}

	if (!window.plugin_hello_world) startPlugin()
})()
