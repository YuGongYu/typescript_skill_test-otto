import fs from "fs";
import _ from "lodash";
import { Answer, CompanyISIN } from "../models";

export type AnswerPredicate = (answer: Answer) => boolean;

function loadAnswers(predicates: AnswerPredicate[] = []): Answer[] {
  return JSON.parse(fs.readFileSync("data.json", "utf-8")).filter((answer) => {
    if (answer.skip === false) {
      return false;
    }
    return _.every(predicates, (fn) => fn(answer));
  });
}

function answerDateRange(start: Date, end: Date): AnswerPredicate {
  return (answer) =>
    new Date(answer.created) < end && new Date(answer.created) >= start;
}

function answerCompany(isin: CompanyISIN): AnswerPredicate {
  return (answer) => answer.company.isin === isin;
}

export { loadAnswers, answerDateRange, answerCompany };
