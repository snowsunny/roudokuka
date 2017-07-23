import Daihon from 'Daihon'

export class Roudokuka {
  constructor(texts, options) {
    this.daihon = new Daihon(texts)
    this.voices = []
    this.currentSerifu = undefined
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
      this.daihon.curentSerifuIndex = serifuIndex
    }

    let repeater = setInterval(() => {
      speechSynthesis.pause()
      speechSynthesis.resume()
    }, 5000)

    if(this.daihon.isEnd()) {
      clearInterval(repeater)
      speechSynthesis.cancel()
    } else {
      this.currentSerifu = this.daihon.getNextSerifu()
      this.currentSerifu.onend = () => {
        clearInterval(repeater)
        this.start()
      }
      speechSynthesis.speak(this.currentSerifu)
    }
  }
}
