import TextlintTester from "textlint-tester";
import rule from "../src/index";

const tester = new TextlintTester();

tester.run("textlint-rule-typo-detection", rule, {
  valid: [
    "foo",
    {
      text: "Hello world",
      options: {
        dictionary: ["world"],
      },
    },
  ],
  invalid: [
    {
      text: "Hello wolrd",
      errors: [
        {
          message: 'Is "wolrd" perhaps "world" ?',
          line: 1,
          range: [6, 11],
        },
      ],
      options: {
        dictionary: ["world"],
      },
    },
    {
      text: "Hello word",
      errors: [
        {
          message: 'Is "word" perhaps "world" ?',
          line: 1,
          range: [6, 10],
        },
      ],
      options: {
        dictionary: ["world"],
      },
    },
    {
      text: "Hello ward",
      errors: [
        {
          message: 'Is "ward" perhaps "world", "word" ?',
          line: 1,
          range: [6, 10],
        },
      ],
      options: {
        dictionary: ["world", "word"],
      },
    },
  ],
});
