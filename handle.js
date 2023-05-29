const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PLAYER_STORAGE_KEY = 'MUSIC_PLAYER'

const cd = $('.cd')
const playList = $('.list-music')
const name = $('.info-play-now .name')
const author = $('.info-play-now .singer')
const cdPlayNow = $('.music-content img')
const audio = $('.playing-area audio')
const playBtn = $('.playing-area .play')
const range = $('input[type="range"]')
const nextBtn = $('.btn.next')
const preBtn = $('.btn.pre')
const randomBtn = $('.btn.sub.random')
const repeatBtn = $('.btn.sub.repeat')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    songs: [
        {
            name: 'Wellerman',
            singer: 'Nathan Evans ',
            path: './assets/music/Nathan Evans - Wellerman (spedup).mp3',
            image: './assets/img/albums/wellerman.jpg'
        },
        {
            name: 'Tell Ur Mom II',
            singer: 'Winno ft. Heily「Cukak Remix」',
            path: './assets/music/Tell Ur Mom II - Winno ft. Heily「Cukak Remix」- Audio Lyrics Video.mp3',
            image: './assets/img/albums/Tell Ur Mom 2.jpg'
        },
        {
            name: 'Lemon - レモン',
            singer: 'Kenshi Yonezu',
            path: './assets/music/Nightcore - Lemon (레몬) - Lyrics.mp3',
            image: './assets/img/albums/lemon.jpg'
        },
        {
            name: 'Kill This Love',
            singer: 'BLACKPINK ',
            path: './assets/music/Kill This Love.mp3',
            image: './assets/img/albums/Kill_This_Love.png'
        },
        {
            name: 'Hai Mươi Hai',
            singer: 'AMEE ft. Hứa Kim Tuyền',
            path: './assets/music/Hai Mươi Hai (Speed Up) .mp3',
            image: './assets/img/albums/haiMuoiHai.jpg'
        },
        {
            name: 'Một Ngày Chẳng Nắng',
            singer: 'Pháo Northside',
            path: './assets/music/Pháo Northside - Kìa Bóng Dáng Ai (ft Sterry) - (OFFICIAL VISUALIZER MUSIC VIDEO).mp3',
            image: './assets/img/albums/motNgayChangNang.jpg'
        },
        {
            name: 'ドラえもんのうた',
            singer: 'Yamano Satoko',
            path: './assets/music/Yamano Satoko ドラえもんのうた Doraemon no uta Lyrics.mp3',
            image: './assets/img/albums/doraemon.png'
        },
        {
            name: 'Cứ Nói Yêu Lần Này',
            singer: 'Lil Z',
            path: './assets/music/Cứ Nói Yêu Lần Này - Lil Zpoet「Cukak Remix」- Audio Lyrics Video.mp3',
            image: './assets/img/albums/noiYeuLanNay.jpg'
        },
        {
            name: 'At My Worst',
            singer: 'Pink Sweat$',
            path: './assets/music/At My Worst - Pink Sweat$ ( Lyrics + Vietsub ).mp3',
            image: './assets/img/albums/atMyWorst.jpg'
        },
        {
            name: 'Build a B*tch',
            singer: 'Bella Poarch',
            path: './assets/music/buildABitch.mp3',
            image: './assets/img/albums/buildABitch.jpg'
        },
        {
            name: 'Lan Man',
            singer: 'Ronboogz', 
            path: './assets/music/LanMan.mp3',
            image: './assets/img/albums/LanMan.jpg'
        },
        {
            name: 'FIFTY FIFTY - Cupid',
            singer: 'Twin',
            path: './assets/music/FIFTY FIFTY - Cupid (Twin Version) (Lyrics).mp3',
            image: './assets/img/albums/FIFTY-FIFTY-THE-BEGINNING-CUPID-scaled.jpg'
        },
        {
            name: 'Hình như ta thích nhau',
            singer: 'Doãn Hiếu',
            path: './assets/music/[SPEED UP] HÌNH NHƯ TA THÍCH NHAU - Doãn Hiếu - Lyric Video - Putapi.mp3',
            image: './assets/img/albums/1666336378970_640.jpg'
        },
        {
            name: 'Cưới thôi',
            singer: 'Masew x Masiu x B Ray x TAP',
            path: './assets/music/Cưới Thôi - Masew x Masiu x B Ray x TAP ( Lyrics Audio ).mp3',
            image: './assets/img/albums/ab67616d0000b2737cd903c07645cda72a2d59cd.jpg'
        },
        {
            name: 'Ngày đầu tiên',
            singer: 'Đức Phúc',
            path: './assets/music/Ngày Đầu Tiên - Đức Phúc「Cukak Remix」- Audio Lyrics Video.mp3',
            image: './assets/img/albums/maxresdefault.jpg'
        },
        {
            name: 'Trời dấu trời mang đi',
            singer: 'Amee',
            path: './assets/music/TroiDauTroiMangDi.mp3',
            image: './assets/img/albums/TroiDauTroiMangDi.jpg'
        },
    ],
    
    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                    <div class="body">
                        <p class="title">${song.name}</p>
                        <p>${song.singer}</p>
                    </div>
                    <div class="option">
                        <div class="play ${index === this.currentIndex ? 'active' : ''}">
                            <button class="btn">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>
                            </button>
                            <button class="btn">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
                            </button>
                        </div>
                    </div>
                </div>
            `
        })
        playList.innerHTML = htmls.join('')
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents: function() {
        const cdWidth = cd.offsetWidth
        const cdHeight = cd.offsetHeight

        document.onscroll = function() {
            if (window.innerWidth > 1024) {
                return;
            }
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            let newCdWidth = cdWidth - scrollTop
            let newCdHeight = cdHeight - scrollTop
            if(newCdWidth < 0 || newCdWidth == 0) {
                cd.style.border = 'none'
                newCdWidth = 0
                newCdHeight = 0
            }
            cd.style.width = newCdWidth + 'px'
            cd.style.height = newCdHeight + 'px'
            cd.style.opacity = newCdWidth /cdWidth
        }

        const cdPlayNowAnimate = cdPlayNow.animate([
            { transform: 'rotate(360deg)'}
        ], {
            duration: 10000,
            iterations: Infinity
        })
        cdPlayNowAnimate.pause()

        playBtn.onclick = function() {
            if(app.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }

        audio.onplay = function() {
            app.isPlaying = true
            playBtn.classList.add('playing')
            cdPlayNowAnimate.play()
        }

        audio.onpause = function() {
            app.isPlaying = false
            playBtn.classList.remove('playing')
            cdPlayNowAnimate.pause()
        }

        audio.ontimeupdate = function() {
            if (audio.duration) {
                const progress = audio.currentTime / audio.duration * 100
                range.value = progress
            }
        }

        range.onchange = function() {
            const seekTime = range.value * audio.duration / 100;
            audio.currentTime = (seekTime >=0 ) ? seekTime : 0;
        }

        nextBtn.onclick = function() {
            if(app.isRandom) {
                app.playRandom()
            } else {
                app.nextSong()
            }
            audio.play()
            app.render()
            app.scrollToActiveSong()
        }

        preBtn.onclick = function() {
            if(app.isRandom) {
                app.playRandom()
            } else {
                app.previousSong()
            }
            audio.play()
            app.render()
            app.scrollToActiveSong()
        }
        
        randomBtn.onclick = function() {
            if(app.isRandom) {
                randomBtn.classList.remove('active')
                app.isRandom = false
            } else {
                randomBtn.classList.add('active')
                app.isRandom = true
            }
            app.setConfig('isRandom', app.isRandom)
        }

        repeatBtn.onclick = function() {
            if(app.isRepeat) {
                repeatBtn.classList.remove('active')
                app.isRepeat = false
            } else {
                repeatBtn.classList.add('active')
                app.isRepeat = true
            }
            app.setConfig('isRepeat', app.isRepeat)
        }

        audio.onended = function() {
            if(app.isRepeat) {
                audio.play()
            } else {
                nextBtn.click()
            }
        }

        playList.onclick = function(e) {
            const songElement = e.target.closest('.song:not(.active)')
            if(songElement || e.target.closest('.option')) {
                if(songElement) {
                    app.currentIndex = Number(songElement.getAttribute('data-index'))
                    app.loadCurrentSong()
                    app.render()
                    audio.play()
                }
            }
        }

    },
    loadCurrentSong: function() {
        name.textContent = this.currentSong.name
        author.textContent = this.currentSong.singer
        cdPlayNow.setAttribute('src', this.currentSong.image)
        audio.src = this.currentSong.path
    },
    loadConfig: function() {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
    },
    nextSong: function() {
        this.currentIndex ++;
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    previousSong: function() {
        this.currentIndex --;
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },
    playRandom: function() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while(newIndex === this.currentIndex)

        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    scrollToActiveSong: function() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            })
        }, 300);
    },
    start: function () {
        this.loadConfig()

        this.defineProperties()

        this.handleEvents()

        this.loadCurrentSong()

        this.render()

        if(app.isRandom) {
                randomBtn.classList.remove('active')
        } else {
            randomBtn.classList.add('active')
        }
        if(app.isRepeat) {
            repeatBtn.classList.remove('active')
        } else {
            repeatBtn.classList.add('active')
        }
    }
}

app.start()