import type { DetectResult } from "./base";
import { BaseDetector } from "./base";
import { debug, isDebugMode } from "../utils";

export class LevenshteinDetector extends BaseDetector {
  detect() {
    const result: DetectResult[] = [];

    this.tokens.forEach((token) => {
      if (this.dictionary.some((word) => word === token.str)) {
        return;
      }

      const candidates = this.dictionary.filter((word) => {
        const distance = calcLevenshteinDistance(token.str, word);
        return distance <= this.threshold;
      });

      if (candidates.length > 0) {
        result.push({
          token,
          candidates,
        });
      }
    });

    return result;
  }
}

export const calcLevenshteinDistance = (str1: string, str2: string): number => {
  const dp: number[][] = Array.from(new Array(str1.length + 1), () =>
    new Array(str2.length + 1).fill(0),
  );

  for (let i1 = 0; i1 <= str1.length; i1++) {
    for (let i2 = 0; i2 <= str2.length; i2++) {
      // initialize
      if (i1 === 0) {
        dp[0][i2] = i2;
        continue;
      }
      if (i2 === 0) {
        dp[i1][0] = i1;
        continue;
      }

      const cost = str1.at(i1 - 1) === str2.at(i2 - 1) ? 0 : 1;
      dp[i1][i2] = Math.min(
        dp[i1 - 1][i2] + 1, // delete
        dp[i1][i2 - 1] + 1, // insert
        dp[i1 - 1][i2 - 1] + cost, // substitute
      );
    }
  }

  debug(`===== str1: '${str1}', str2: '${str2}' =====`);
  debugDpTable(dp);

  return dp[str1.length][str2.length];
};

const debugDpTable = (table: number[][]) => {
  if (!isDebugMode()) {
    return;
  }

  let buf = "";

  table.forEach((row) => {
    buf += row.join(", ");
    buf += "\n";
  });

  debug(buf);
};
