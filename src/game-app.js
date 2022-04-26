import { html, css, LitElement } from 'lit'
import { PPWords } from './components/pp-words'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class GameApp extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        border: solid 1px gray;
        padding: 16px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }
    `
  }

  static get properties() {
    return {
    }
  }

  constructor() {
    super()
  }

  render() {
    return html`
      <h1>Pasapalabra</h1>
      <pp-words>
        <p>Words to play!</p>
      </pp-words>
    `
  }
}

window.customElements.define('game-app', GameApp)
