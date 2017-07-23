import Daihon from 'Daihon'

export class Roudokuka {
  constructor(texts, options) {
    this.daihon = new Daihon(texts)
    this.voices = []
    this.currentSerifu = undefined
    this.resumer = undefined
    this.canceled = false
  }

  _startResumer() {
    this.resumer = setInterval(() => {
      speechSynthesis.resume()
    }, 5000)
  }

  _stopResumer() {
    clearInterval(this.resumer)
  }

  onReady() {
    speechSynthesis.cancel()
    return new Promise((resolve, reject) => {
      const tryInterval = setInterval(() => {
        if(this.voices.length === 0) {
          this.voices = speechSynthesis.getVoices()
        } else {
          clearInterval(tryInterval)
          resolve()
        }
      }, 0)
    })
  }

  getUtterance(text) {
    let utterance = new SpeechSynthesisUtterance(text)
    utterance.onend = () => {
      if(this.canceled) {
        this.canceled = false
      } else {
        this.start()
      }
    }
    return utterance
  }

  start(serifuIndex) {
    if(speechSynthesis.speaking) {
      this.canceled = true
    }
    if(serifuIndex >= 0) {
      this.daihon.curentSerifuIndex = serifuIndex
    }

    this._stopResumer()
    this._startResumer()
    speechSynthesis.cancel()

    if(this.daihon.isEnd()) {
      // daihon end
      this._stopResumer()
    } else {
      this.currentSerifu = this.daihon.getNextSerifu()
      speechSynthesis.speak(this.getUtterance(this.currentSerifu.text))
    }
  }

  stop() {
    if(speechSynthesis.speaking) {
      this.canceled = true
    }
    speechSynthesis.cancel()
    this._stopResumer()
  }
}
