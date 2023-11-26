export interface TokenizerOptions {
  text: string;
}

export interface Token {
  str: string;
  range: [number, number];
}

export abstract class BaseTokenizer {
  protected text: TokenizerOptions["text"];

  constructor(options: TokenizerOptions) {
    this.text = options.text;
  }

  abstract tokenize(): Token[];
}
