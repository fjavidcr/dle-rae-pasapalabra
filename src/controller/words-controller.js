import { PalabarasAleatoriasApi } from '../api/palabaras-aleatorias-api'

const ALPHABET = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
  'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 
  's', 'u', 'v', 'w', 'x', 'y', 'z'
]
const ALPHABET_CONTROL = {}
ALPHABET.forEach(letter => ALPHABET_CONTROL[letter] = false)
console.log({ALPHABET_CONTROL})

const CHOSE_TYPE = {
  1: 'STARTS__WITH',
  2: 'INCLUDES'
}


class WordsController {

  static words = []
  static prevWords = []
  static filteredWords = Object.assign({}, ALPHABET_CONTROL)
  static chosenWords = Object.assign({}, ALPHABET_CONTROL)
  static rejectedWords = []
  static missingLetters = []


  static async getChosenWords() {
    // get prev words
    let str_prevWords = localStorage.getItem('chosenWords')
    if (str_prevWords) this.prevWords = str_prevWords.split(',')
    console.log('prevWords', this.prevWords)
    // getting words from API
    await this.__searchWords()
    console.log('words', this.words)
    // filter valid words
    this.__filterValidWords()
    console.log('rejectedWords', this.rejectedWords )
    // group words by first letter
    this.__groupWordsByFirstLetter()
    console.log('filteredWords', this.filteredWords )
    // chose words starts with each letter
    this.__choseWords()
    console.log(' *** Words starts with  >>', this.chosenWords)
    // search missing words
    this.__showMissingWords()
    // complete missing words looking for words containing letter
    if (this.missingLetters.length) {
      this.__completeMissingWords()
      // search missing words
      this.__showMissingWords()
    }
    console.log(' *** All Words  >>', this.chosenWords)

    localStorage.setItem('chosenWords', this.__getChosenWordsName())
    return this.chosenWords
  }

  static __getChosenWordsName() {
    let names = []
    for (const letter in this.chosenWords) {
      names.push(this.chosenWords[letter].name)
    }
    return names
  }

  static async __searchWords() {
    this.words = await PalabarasAleatoriasApi.searchWords()
      .then(response =>
        response.map(x => {
          return {
            name: x.Word,
            definitionHTML: decodeURI(x.Definition),
            definitionMD: x.DefinitionMD
          }
        })
      )
  }

  static __filterValidWords() {
    this.words.forEach( (word, index) => {
      if (!this.__isValidWord(word)) {
        this.rejectedWords.push(word)
        this.words.splice(index, 1)
      }
    })
  }

  static __isValidWord(word) {
    return word.name.length > 2
       && !word.name.includes(' ')
       && !word.name.includes('-')
       && !word.name.includes('_')
  }

  static __groupWordsByFirstLetter() {
    for (const letter in ALPHABET_CONTROL) {
      this.__filterWordsByFirstLetter(letter)
    }
  }

  static __filterWordsByFirstLetter(letter) {
    this.filteredWords[letter] = [...this.words.filter(
      word => word.name.startsWith(letter) && !this.__isChosen(word)
    )]
  }

  static __filterWordsByIncludesLetter(letter) {
    this.filteredWords[letter] = [...this.words.filter(
      word => word.name.includes(letter) && !this.__isChosen(word)
    )]
  }

  static __isChosen(word) {
    for (const letter in this.chosenWords) {
      if (this.chosenWords[letter].name === word.name)
        return true
    }
    if (this.prevWords.find(w => w === word.name)) {
      console.log(`❌  rejected previous word ➡️ ${word.name}`);
      return true
    }
    return false
  }

  static __choseWords() {
    for (const letter in ALPHABET_CONTROL) {
      this.__choseWord(letter, { typeId: 1 })
    }
  }

  static __choseWord(letter, { typeId }) {
    if (Array.isArray(this.filteredWords[letter]) && this.filteredWords[letter].length) {
      this.chosenWords[letter] = this.__getRandomWord(this.filteredWords[letter])
      this.chosenWords[letter].letter = letter
      this.chosenWords[letter].type = CHOSE_TYPE[typeId]
      this.chosenWords[letter].typeId = typeId
      ALPHABET_CONTROL[letter] = true
    }
  }

  static __getRandomWord(list) {
    return list[Math.floor((Math.random() * list.length))]
  }

  static __showMissingWords() {
    this.missingLetters.length = 0
    for (const letter in this.chosenWords) {
      if (!this.chosenWords[letter])
        this.missingLetters.push(letter)
    }
    if (this.missingLetters.length)
      console.log(` *** Missing words 🥲 ${JSON.stringify(this.missingLetters)}`)
    else
      console.log(` *** All words ready! Let's play! 🤠 `)
  }

  static __completeMissingWords() {
    for (const letter of this.missingLetters) {
      console.log({ shearchMissingLetter: letter })
      this.__filterWordsByIncludesLetter(letter)
      this.__choseWord(letter, { typeId: 2 })
    }
    console.log({ filteredWords: this.filteredWords })
  }
}

export {
  ALPHABET_CONTROL,
  WordsController
}