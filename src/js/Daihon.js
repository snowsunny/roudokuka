export default class Daihon {
  constructor(serifusInfo) {
    this.curentSerifuIndex = 0
    this.serifus = this._getSerifus(serifusInfo)
  }

  _getSerifus(texts) {
    return texts.map((text) => {
      return new SpeechSynthesisUtterance(text)
    })
  }

  getNextSerifu() {
    if(this.curentSerifuIndex < this.serifus.length) {
      if(this.curentSerifuIndex == this.serifus.length - 1) {
        this.curentSerifuIndex = -1
        return this.serifus[this.serifus.length - 1]
      } else {
        return this.serifus[this.curentSerifuIndex++]
      }
    }
  }

  isEnd() {
    return this.curentSerifuIndex == -1
  }
}
