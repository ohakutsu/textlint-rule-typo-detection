import { calcLevenshteinDistance } from "../../src/detectors/levenshtein";
import { describe, expect, it } from "@jest/globals";

describe("calcLevenShteinDistance", () => {
  const expectDistance = (a: string, b: string, distance: number) => {
    it(`'${a}', '${b}' => ${distance}`, () => {
      expect(calcLevenshteinDistance(a, b)).toBe(distance);
    });
  };

  expectDistance("hello", "hello", 0);
  expectDistance("", "hello", 5);
  expectDistance("a", "ab", 1);
  expectDistance("abc", "ac", 1);
  expectDistance("a", "b", 1);
  expectDistance("ab", "ac", 1);
  expectDistance("ac", "bc", 1);
  expectDistance("abc", "adc", 1);

  expectDistance("xabxcdxxefxgx", "1ab2cd34ef5g6", 6);
  expectDistance("xabxcdxxefxgx", "abcdefg", 6);

  expectDistance("javawasneat", "scalaisgreat", 7);
  expectDistance("example", "samples", 3);
  expectDistance("forward", "drawrof", 6);
  expectDistance("sturgeon", "urgently", 6);
  expectDistance("levenshtein", "frankenstein", 6);
  expectDistance("distance", "difference", 5);
  expectDistance("distance", "eistancd", 2);
  expectDistance(
    "Morbi interdum ultricies neque varius condimentum. Donec volutpat turpis interdum metus ultricies vulputate. Duis ultricies rhoncus sapien, sit amet fermentum risus imperdiet vitae. Ut et lectus",
    "Duis erat dolor, cursus in tincidunt a, lobortis in odio. Cras magna sem, pharetra et iaculis quis, faucibus quis tellus. Suspendisse dapibus sapien in justo cursus",
    143,
  );
});
