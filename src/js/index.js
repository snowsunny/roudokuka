import Daihon from 'Daihon'

export class Roudokuka {
  constructor(texts, options) {
    this.daihon = new Daihon(texts)
    this.voices = []
    this.currentSerifu = undefined
    this.repeater = undefined
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
    if(serifuIndex >= 0) {
      clearInterval(this.repeater)
      this.daihon.curentSerifuIndex = serifuIndex
    }

    this.repeater = setInterval(() => {
      speechSynthesis.pause()
      speechSynthesis.resume()
    }, 5000)

    if(this.daihon.isEnd()) {
      clearInterval(this.repeater)
      speechSynthesis.cancel()
    } else {
      this.currentSerifu = this.daihon.getNextSerifu()
      this.currentSerifu.onend = () => {
        clearInterval(this.repeater)
        this.start()
      }
      speechSynthesis.speak(this.currentSerifu)
    }
  }
}
