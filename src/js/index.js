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

  start(serifuIndex) {
    if(speechSynthesis.speaking) {
      this.canceled = true
    }
    if(serifuIndex >= 0) {
      this.daihon.curentSerifuIndex = serifuIndex
    }
    speechSynthesis.cancel()
    this._stopResumer()
    this._startResumer()

    if(this.daihon.isEnd()) {
      this._stopResumer()
      speechSynthesis.cancel()
    } else {
      this.currentSerifu = this.daihon.getNextSerifu()
      this.currentSerifu.onend = () => {
        if(this.canceled) {
          this.canceled = false
        } else {
          this._stopResumer()
          this.start()
        }
      }
      speechSynthesis.speak(this.currentSerifu)
    }
  }
}
