import type { Token } from "../tokenizers/base";

export interface DetectorOptions {
  dictionary: string[];
  threshold: number;
  tokens: Token[];
}

export interface DetectResult {
  token: Token;
  candidates: string[];
}

export abstract class BaseDetector {
  protected dictionary: DetectorOptions["dictionary"];
  protected threshold: DetectorOptions["threshold"];
  protected tokens: DetectorOptions["tokens"];

  constructor(options: DetectorOptions) {
    this.dictionary = options.dictionary;
    this.threshold = options.threshold;
    this.tokens = options.tokens;
  }

  abstract detect(): DetectResult[];
}
