import Libretto from 'Libretto'

export class Roudokuka {
  constructor(texts, options) {
    this.libretto = new Libretto(texts)
    this.voices = []
    this.currentLine = undefined
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

  start(lineIndex) {
    if(speechSynthesis.speaking) {
      this.canceled = true
    }
    if(lineIndex >= 0) {
      this.libretto.curentLineIndex = lineIndex
    }

    this._stopResumer()
    this._startResumer()
    speechSynthesis.cancel()

    if(this.libretto.isEnd()) {
      // libretto end
      this._stopResumer()
    } else {
      this.currentLine = this.libretto.getNextLine()
      speechSynthesis.speak(this.getUtterance(this.currentLine.text))
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
