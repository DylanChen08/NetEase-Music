$(function () {
    // 根据主页传过来的id判断歌曲
    // let id = parseInt(location.search.match(/\bid=([^&]*)/)[1],10)

	// $.get('./songs.json').then(function(response){
	// 	let songs = response
	// 	let song = songs.filter(s=>s.id === id)[0]
	// 	let {url, name, lyric} = song

	// 	initPlayer.call(undefined, url)
	// 	initText(name, lyric)
	// })



    $.get('./lyrics.json').then((res) => {
        let obj = res.lrc
        let { lyric } = obj
        let array = lyric.split('\n')
        // console.log(array)
        let regex = /^\[(.+)\](.*)$/
        array = array.map((string, index) => {
            let matches = string.match(regex)
            if (matches) {
                return { time: matches[1], words: matches[2] }
            }
        })
        // console.log("array")
        // console.log(array)

        let $lyric = $(".inner-lyrics")
        // console.log($lyric)
        array.map((object) => {
            // console.log(1)

            if (!object) { return }
            let $p = $('<p/>')
            $p.attr('data-time', object.time).text(object.words)
            // console.log($p)
            $p.appendTo($lyric.children(".lines"))
        })

        let audio = document.createElement('audio')
        audio.src = "http://m10.music.126.net/20181009222248/7b3e84d460db440f13f41346b5262d97/ymusic/2087/0e9a/89c5/3a7fe466f11c872349eb792e454f77c6.mp3"
        audio.oncanplay = function () {
            audio.play()
            $(".disc-container").addClass("playing")
        }

        $(".icon-play").on('click',function(){
            audio.play()
            $(".disc-container").addClass("playing")
        })  
        $(".icon-pause").on('click',function(){
            audio.pause()
            $(".disc-container").removeClass("playing")
        })

    })
})