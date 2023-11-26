import type { Token } from "./base";
import { BaseTokenizer } from "./base";

export class WordBoundaryTokenizer extends BaseTokenizer {
  tokenize() {
    const tokens: Token[] = [];
    let startAt = 0;

    this.text.split(/\b/).forEach((word) => {
      const token: Token = {
        str: word,
        range: [startAt, startAt + word.length],
      };
      tokens.push(token);

      startAt += word.length;
    });

    return tokens;
  }
}
