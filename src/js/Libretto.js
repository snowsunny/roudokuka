export default class Libretto {
  constructor(linesInfo) {
    this.curentLineIndex = 0
    this.lines = this._getLines(linesInfo)
  }

  _getLines(texts) {
    return texts.map((text) => {
      return new SpeechSynthesisUtterance(text)
    })
  }

  getNextLine() {
    if(this.curentLineIndex < this.lines.length) {
      if(this.curentLineIndex == this.lines.length - 1) {
        this.curentLineIndex = -1
        return this.lines[this.lines.length - 1]
      } else {
        return this.lines[this.curentLineIndex++]
      }
    }
  }

  isEnd() {
    return this.curentLineIndex == -1
  }
}
