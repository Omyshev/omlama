;(function () {
	'use strict'

	function MyPage(object) {
		this.create = function () {
			let html = document.createElement('div')
			html.classList.add('my-page')
			html.innerHTML = `<h1 style="text-align:center; margin-top: 20%;">Привет</h1>`

			this.render = function () {
				return html
			}

			this.start = function () {}

			this.pause = function () {}

			this.stop = function () {}

			this.destroy = function () {
				html.remove()
			}
		}
	}

	function openMyPage() {
		Lampa.Activity.push({
			url: '',
			title: 'Моя страница',
			component: MyPage, // Передаём функцию конструктора
		})
	}

	function addMenuButton() {
		let menu = document.querySelector('.menu .menu__list')
		if (!menu) return

		let button = document.createElement('li')
		button.classList.add('menu__item', 'selector', 'focus')
		button.innerHTML = `<div class="menu__text">Моя страница</div>`
		button.addEventListener('hover:enter', openMyPage)

		menu.appendChild(button)
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
