;(function () {
	'use strict'

	function createCustomPage() {
		var html = Lampa.Template.js('dlna_client_main')
		html.append('<h1 style="text-align:center;">Моя кастомная страница</h1>')

		return {
			render: function () {
				return html
			},
			destroy: function () {
				html.remove()
			},
		}
	}

	Lampa.Template.add(
		'dlna_client_main',
		'\n<div class="dlna_client-main">\n<div class="dlna_client-main__head dlna_client-head"></div>\n<div class="dlna_client-main__body"></div>\n</div>\n'
	)

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
