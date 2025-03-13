;(function () {
	'use strict'

	function createCustomPage() {
		var html = Lampa.Template.js('dlna_client_main'),
			head = html.find('.dlna_client-main__head'),
			body = html.find('.dlna_client-main__body')
		var listener_id, server, scroll, tree, image

		scroll = new Lampa.Scroll({
			mask: true,
			over: true,
		})
		scroll.minus(head)
		body.append(scroll.render(true))

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
		'\n        <div class="dlna_client-main">\n            <div class="dlna_client-main__head dlna_client-head"></div>\n            <div class="dlna_client-main__body"></div>\n        </div>\n    '
	)
	Lampa.Template.add(
		'dlna_client_loading',
		'\n        <div class="dlna_client-loading">\n            <div class="dlna_client-loading__title"></div>\n            <div class="dlna_client-loading__loader">\n                <div class="broadcast__scan"><div></div></div>\n            </div>\n        </div>\n    '
	)
	Lampa.Template.add(
		'dlna_client_device',
		'\n        <div class="dlna_client-device selector">\n            <div class="dlna_client-device__body">\n                <div class="dlna_client-device__icon">\n                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 128 128" xml:space="preserve">\n                        <path d="M111.7 57.1V22.2c0-1.1-.5-2.3-1.4-2.9h-.1c-.6-.4-1.2-.6-2-.6H30.9c-2 0-3.5 1.5-3.5 3.5v31.9h34.9c2.8 0 5.1 2.4 5.1 5.2v15.5h27.5V61.4c0-2.4 1.9-4.2 4.2-4.2h12.6z" fill="currentColor"></path>\n                        <path d="M96.8 67.6H128v33.2H96.8zM67.3 86.1h27.5v-9.2H67.3zM65.1 59.3c0-1.8-1.3-3.1-3-3.1h-56c-1.7 0-3 1.4-3 3.1v41.9h62zM0 106.1c0 1.7 1.3 3.1 3.1 3.1h62.2c1.7 0 3.1-1.3 3.1-3.1v-2.9H0zM125.8 59.3H99c-1.2 0-2.2.9-2.2 2.2v4.1H128v-4.1c0-1.3-.9-2.2-2.2-2.2zm-9.4 4.1h-7.9c-.6 0-1-.4-1-1s.4-1 1-1h7.9c.6 0 1 .4 1 1 .1.6-.3 1-1 1zm3.8 0h-.4c-.6 0-1-.4-1-1s.4-1 1-1h.4c.6 0 1 .4 1 1s-.4 1-1 1zM96.8 107.1c0 1.2.9 2.2 2.2 2.2h26.8c1.2 0 2.2-1 2.2-2.2V103H96.8zm11.6-2h7.9c.6 0 1 .4 1 1s-.4 1-1 1h-7.9c-.6 0-1-.4-1-1s.4-1 1-1zM81.7 93.7H78v-5.6H67.3v7.6h14.3c.6 0 1-.4 1-1 .1-.6-.3-1-.9-1z" fill="currentColor"></path>\n                    </svg>\n                </div>\n                <div class="dlna_client-device__name"></div>\n                <div class="dlna_client-device__ip"></div>\n            </div>\n        </div>\n    '
	)
	Lampa.Template.add(
		'dlna_client_folder',
		'\n        <div class="dlna_client-device selector">\n            <div class="dlna_client-device__body">\n                <div class="dlna_client-device__icon">\n                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 408 408" style="enable-background:new 0 0 512 512" xml:space="preserve">\n                        <path d="M372 88.661H206.32l-33-39.24a5.001 5.001 0 0 0-4-1.8H36c-19.956.198-36.023 16.443-36 36.4v240c-.001 19.941 16.06 36.163 36 36.36h336c19.94-.197 36.001-16.419 36-36.36v-199c.001-19.941-16.06-36.162-36-36.36z" fill="currentColor"></path>\n                    </svg>\n                </div>\n                <div class="dlna_client-device__name"></div>\n            </div>\n        </div>\n    '
	)
	Lampa.Template.add(
		'dlna_client_file',
		'\n        <div class="dlna_client-file selector">\n            <div class="dlna_client-file__body">\n                <div class="dlna_client-file__icon">\n                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 477.867 477.867" xml:space="preserve">\n                        <path d="M238.933 0C106.974 0 0 106.974 0 238.933s106.974 238.933 238.933 238.933 238.933-106.974 238.933-238.933C477.726 107.033 370.834.141 238.933 0zm100.624 246.546a17.068 17.068 0 0 1-7.662 7.662v.085L195.362 322.56c-8.432 4.213-18.682.794-22.896-7.638a17.061 17.061 0 0 1-1.8-7.722V170.667c-.004-9.426 7.633-17.07 17.059-17.075a17.068 17.068 0 0 1 7.637 1.8l136.533 68.267c8.436 4.204 11.867 14.451 7.662 22.887z" fill="currentColor"></path>\n                    </svg>\n                </div>\n                <div class="dlna_client-file__name"></div>\n                <div class="dlna_client-file__size"></div>\n            </div>\n        </div>\n    '
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
