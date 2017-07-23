import Daihon from 'Daihon'

export class Roudokuka {
  constructor(texts, options) {
    this.daihon = new Daihon(texts)
    this.voices = []
    this.currentSerifu = undefined
    this.resumer = undefined
    this.canceled = false
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
      clearInterval(this.resumer)
      this.daihon.curentSerifuIndex = serifuIndex
    }
    speechSynthesis.cancel()

    this.resumer = setInterval(() => {
      speechSynthesis.resume()
    }, 5000)

    if(this.daihon.isEnd()) {
      clearInterval(this.resumer)
      speechSynthesis.cancel()
    } else {
      this.currentSerifu = this.daihon.getNextSerifu()
      this.currentSerifu.onend = () => {
        if(this.canceled) {
          this.canceled = false
        } else {
          clearInterval(this.resumer)
          this.start()
        }
      }
      speechSynthesis.speak(this.currentSerifu)
    }
  }
}
