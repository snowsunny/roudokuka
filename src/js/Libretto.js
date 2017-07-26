import _merge from 'lodash/merge'

export default class Libretto {
  constructor(linesInfo) {
    this.curentLineIndex = 0
    this.lines = this._createLines(linesInfo)
  }

  _createLines(linesInfo) {
    return linesInfo.map((lineInfo, index) => {
      if(Object.prototype.toString.call(lineInfo) == '[object String]') {
        return {index: index, text: lineInfo}
      } else {
        return _merge(lineInfo, {index: index})
      }
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
