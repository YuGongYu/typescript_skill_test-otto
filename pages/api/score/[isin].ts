import { ScoreByIsinQuery } from "../../../models";

import _ from "lodash";
import { answerCompany, answerDateRange, loadAnswers } from "../../../lib/data";
import { addDays } from "../../../lib/date";

export default async (req, res) => {
  const { isin, date }: ScoreByIsinQuery = req.query;

  const end = date ? new Date(date) : new Date();
  // about six months
  const start = addDays(end, -6 * 30);

  const answers = loadAnswers([
    answerDateRange(start, end),
    answerCompany(isin),
  ]);

  const company = _.first(answers)?.company;
  const score = _.meanBy(answers, "value");

  return res.status(200).send({
    company,
    score,
    date: end,
  });
};
