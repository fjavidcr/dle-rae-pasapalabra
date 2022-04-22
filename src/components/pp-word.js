import { html, css, LitElement } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import showdown from 'showdown'


/**
 * An example element.
 *
 */
export class PPWord extends LitElement {
  static get styles() {
    return css`
      tr {
        width:100%;
      }

      td {
        padding-inline: 1rem;
      }

      a {
        pointer-events: none;
        cursor: default;
      }
    `
  }

  static get properties() {
    return {
      /**
       * word to play.
       */
      word: { type: Object }
    }
  }

  constructor() {
    super()
  }

  render() {
    const converter = new showdown.Converter()
    const definitionHTML = converter.makeHtml(this.word.definitionMD.split(':')[0])
    // const definitionHTML = tempDefHTML.includes('.') ? tempDefHTML.split('.')[0] : tempDefHTML

    return html`
    <tr>
      <td>${this.word.letter}</td>
      <td>${this.word.name}</td>
      <td>${this.word.type}</td>
      <td>${unsafeHTML(definitionHTML)}</td>
    </tr>
    `
  }

  _printDefinition() {
    return html`<div>${this.word.definitionMD}</div>`
  }
}

window.customElements.define('pp-word', PPWord)
