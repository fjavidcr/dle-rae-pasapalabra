import { html, css, LitElement } from 'lit'
import { DictionaryApi } from '../api/fjavidcr-dictionary-api'
import { PPWord } from './pp-word'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class PPWords extends LitElement {
  static get styles() {
    return css``
  }

  static get properties() {
    return {
      /**
       * words to play.
       */
      words: { type: Object }
    }
  }

  constructor() {
    super()
    this.words = {}
  }

  render() {
    return html`
      <button @click=${this._getWords} part="button">Get Words</button>
      <slot></slot>
      <table>
        ${Object.values(this.words).map(word => html`
          <pp-word .word="${word}"></pp-word>
        `)}
      </table>
    `
  }

  async _getWords() {
    // RaeApi.searchWords({
    //   query: 'ja'
    // })
    this.words = {}
    await DictionaryApi.getAllWords() 
  }

  _printWords() {
    let output = []
    for (const letter in this.words) {
      output.push(html`
        <tr>
          <td>${letter}</td>
          <td>${this.words[letter].name}</td>
          <td>${this.words[letter].type}</td>
          <td>${this.words[letter].definitionMD}</td>
        </tr>
      `)
    }
    return output
  }
}

window.customElements.define('pp-words', PPWords)
