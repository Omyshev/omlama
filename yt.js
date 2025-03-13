;(function () {
	'use strict'
	Lampa.Platform.tv()
	function add() {
		// https://omyshev.github.io/omlama/yt.js

		//
		/* Выводим кнопку возврата на экране */
		//	Lampa.SettingsApi.addParam({
		//			component: 'Multi_Menu_Component',
		//			param: {
		//				name: 'BackButton',
		//				type: 'trigger', //доступно select,input,trigger,title,static
		//				default: false
		//			},
		//				field: {
		//					name: 'Кнопка возврата на экране', //Название подпункта меню
		//					description: '' //Комментарий к подпункту
		//				},
		//				onChange: function (value) { //Действия при изменении подпункта
		//					if (Lampa.Storage.field('BackButton') == true)	{
		//						//backButton()
		//						$('#backit').removeClass('hide')
		//					}
		//					if (Lampa.Storage.field('BackButton') == false)	{
		//						$('#backit').addClass('hide')
		//					}
		//				}
		//	});

		/* Кнопка Перезагрузки */
		var my_reload =
			'<div id="RELOAD" class="head__action selector reload-screen hide"><svg fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" stroke-width="0.4800000000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M4,12a1,1,0,0,1-2,0A9.983,9.983,0,0,1,18.242,4.206V2.758a1,1,0,1,1,2,0v4a1,1,0,0,1-1,1h-4a1,1,0,0,1,0-2h1.743A7.986,7.986,0,0,0,4,12Zm17-1a1,1,0,0,0-1,1A7.986,7.986,0,0,1,7.015,18.242H8.757a1,1,0,1,0,0-2h-4a1,1,0,0,0-1,1v4a1,1,0,0,0,2,0V19.794A9.984,9.984,0,0,0,22,12,1,1,0,0,0,21,11Z" fill="currentColor"></path></g></svg></div>'
		$('#app > div.head > div > div.head__actions').append(my_reload)

		$('#RELOAD').on('hover:enter hover:click hover:touch', function () {
			// location.reload()
			try {
				openYouTubeIframe()
			} catch (e) {
				console.error('Error opening YouTube iframe: ', e)
			}
		})
		$('#RELOAD').removeClass('hide')
		/* End Кнопка Перезагрузки и Консоли*/

		/* Кнопка YouTube */
		Lampa.SettingsApi.addParam({
			component: 'Multi_Menu_Component',
			param: {
				name: 'YouTube',
				type: 'trigger',
				//доступно select,input,trigger,title,static
				default: false,
			},
			field: {
				name: 'Раздел YouTube',
				//Название подпункта меню
				description: 'Добавляет YouTube в главном меню', //Комментарий к подпункту
			},
			onChange: function (value) {
				//Действия при изменении подпункта
				if (Lampa.Storage.field('YouTube') == false) {
					$('#YouTubeButton').addClass('hide')
				}
				if (Lampa.Storage.field('YouTube') == true) {
					$('#YouTubeButton').removeClass('hide')
				}
				//Lampa.Settings.update();
			},
		})
		/* End Кнопка YouTube */

		/* Кнопка YouTube */

		var TubeSVG =
			'<svg width="256px" height="256px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff" stroke-width="0.00048000000000000007"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>youtube</title> <g id="Layer_2" data-name="Layer 2">  <g id="icons_Q2" data-name="icons Q2"> <path d="M45.1,12.8a5.5,5.5,0,0,0-3.9-3.9C37.8,8,24,8,24,8S10.2,8,6.8,8.9a5.5,5.5,0,0,0-3.9,3.9C2,16.2,2,23.4,2,23.4s0,7.2.9,10.6a5.5,5.5,0,0,0,3.9,3.9c3.4.9,17.2.9,17.2.9s13.8,0,17.2-.9A5.5,5.5,0,0,0,45.1,34c.9-3.4.9-10.6.9-10.6S46,16.2,45.1,12.8ZM19.6,30V16.8L31,23.4Z" fill="currentColor"></path> </g> </g> </g></svg>'
		var tubemenu = $(
			'<li id="YouTubeButton"  class="menu__item selector hide"><div class="menu__ico">' +
				TubeSVG +
				'</div><div class="menu__text" >YouTube</div></li>'
		)
		$('.menu .menu__list').eq(0).append(tubemenu)
		if (Lampa.Storage.field('YouTube') == true) {
			$('#YouTubeButton').removeClass('hide')
		}

		tubemenu.on('hover:enter', function () {
			try {
				openYouTubeIframe()
			} catch (e) {
				console.error('Error opening YouTube iframe: ', e)
			}
			//window.location.href = 'https://youtube.com/tv'
			// if (Lampa.Platform.is('webos')) {
			// 	webOS.service.request('luna://com.webos.applicationManager', {
			// 		method: 'launch',
			// 		parameters: { id: 'youtube.leanback.v4' },
			// 		onSuccess: function (inResponse) {
			// 			console.log('The app is launched')
			// 		},
			// 		onFailure: function (inError) {
			// 			console.log('Failed to launch the app')
			// 			console.log('[' + inError.errorCode + ']: ' + inError.errorText)
			// 			return
			// 		},
			// 	})
			// }
			// if (Lampa.Platform.is('android')) {
			// 	Lampa.Android.openYoutube('TeUQrJrfrkk')
			// } else window.location.href = 'https://youtube.com/tv' //Android.openYoutube(a.id) else YouTube.play(a.id)
		})

		function openYouTubeIframe() {
			console.log('New')
			Lampa.Modal.open({
				title: '',
				align: 'center',
				zIndex: 300,
				html: $('<div class="about"> plugins_need_reload </div>'),
			})
		}
	} // end of Add (main function)

	/* Если всё готово */
	if (window.appready) add()
	else {
		Lampa.Listener.follow('app', function (e) {
			if (e.type == 'ready') {
				add()
			}
		})
	}
})()
