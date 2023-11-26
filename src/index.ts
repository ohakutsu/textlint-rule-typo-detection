import type {
  TextlintFixableRuleModule,
  TextlintRuleReporter,
} from "@textlint/types";
import { LevenshteinDetector } from "./detectors/levenshtein";
import { WordBoundaryTokenizer } from "./tokenizers/word-boundary";

interface Options {
  dictionary?: string[];
  threshold?: number;
}

const reporter: TextlintRuleReporter<Options> = (context, options) => {
  const { Syntax, getSource, RuleError, report, locator } = context;

  const dictionary = options?.dictionary ?? [];
  const threshold = options?.threshold ?? 2;

  return {
    [Syntax.Str](node) {
      const text = getSource(node);

      const tokenizer = new WordBoundaryTokenizer({ text });
      const tokens = tokenizer.tokenize();

      const detector = new LevenshteinDetector({
        dictionary,
        threshold,
        tokens,
      });
      const detected = detector.detect();

      detected.forEach((result) => {
        const { token, candidates } = result;

        let message = `Is "${token.str}" perhaps `;
        message += candidates.map((candidate) => `"${candidate}"`).join(", ");
        message += " ?";

        const ruleError = new RuleError(message, {
          padding: locator.range(token.range),
        });
        report(node, ruleError);
      });
    },
  };
};

const rule: TextlintFixableRuleModule<Options> = {
  linter: reporter,
  fixer: reporter,
};
export default rule;
