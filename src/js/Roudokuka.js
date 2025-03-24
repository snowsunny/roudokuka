import Libretto from './Libretto'
import _merge from 'lodash/merge'

export default class Roudokuka {
  constructor(lines, options) {
    this.libretto = new Libretto(lines)
    this.voices = []
    this.currentLine = undefined

    this.defaultOptions = {
      lang: "",
      onboundary: null,
      onend: null,
      onerror: null,
      onmark: null,
      onpause: null, // still buggy any browser
      onresume: null, // still buggy any browser
      onstart: null,
      pitch: 1,
      rate: 1,
      voice: null,
      volume: 1,
      onLibrettoEnd: undefined
    }
    this.options = _merge(this.defaultOptions, options)

    // fix for chrome
    this.utterance = undefined // continuous play
    this.resumer = [] // speak with long text
  }

  _startResumer() {
    this.resumer.push(setInterval(() => {
      speechSynthesis.resume()
    }, 5000))
  }

  _stopResumer() {
    if(this.resumer.length) {
      this.resumer.forEach((id) => {
        clearInterval(id)
      })
      this.resumer = []
    }
  }

  onReady() {
    speechSynthesis.cancel()
    return new Promise((resolve, reject) => {
      const tryInterval = setInterval(() => {
        if(this.voices.length === 0) {
          this.voices = speechSynthesis.getVoices()
        } else {
          clearInterval(tryInterval)
          resolve(this)
        }
      }, 0)
    })
  }

  getUtterance(line) {
    this.utterance = new SpeechSynthesisUtterance()
    _merge(this.utterance, this.options, line)

    // fix rate for desktop chrome ubuntu
    // if(this.utterance.rate > 2) {
    //   this.utterance.rate = 2
    // }

    let advancedCallbacks = {list: ['onend', 'onpause', 'onresume']}
    advancedCallbacks.list.forEach((name) => {
      if(Object.prototype.toString.call(this.utterance[name]) == '[object Function]') {
        advancedCallbacks[name] = this.utterance[name]
      }
    })

    this.utterance.onend = (e) => {
      if(advancedCallbacks.onend) {
        advancedCallbacks.onend(e, this.currentLine)
      }
      this.start()
    }
    this.utterance.onpause = (e) => {
      this._stopResumer()
      if(advancedCallbacks.onpause) {
        advancedCallbacks.onpause(e, this.currentLine)
      }
    }
    this.utterance.onresume = (e) => {
      if(this.resumer.length == 0 && advancedCallbacks.onresume) {
        advancedCallbacks.onresume(e, this.currentLine)
        this._startResumer()
      }
    }

    return this.utterance
  }

  start(lineIndex) {
    if(lineIndex >= 0) {
      this.libretto.curentLineIndex = lineIndex
    }

    this._stopResumer()
    this._startResumer()
    speechSynthesis.cancel()

    if(this.libretto.isEnd()) {
      this.libretto.curentLineIndex = 0
      this._stopResumer()
      if(Object.prototype.toString.call(this.options.onLibrettoEnd) == '[object Function]') {
        this.options.onLibrettoEnd()
      }
    } else {
      this.currentLine = this.libretto.getNextLine()
      speechSynthesis.speak(this.getUtterance(this.currentLine))
    }
  }

  stop() {
    speechSynthesis.cancel()
    this._stopResumer()
  }
}
