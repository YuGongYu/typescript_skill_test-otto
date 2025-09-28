import {
  AggregatedAnswerScore,
  Answer,
  CompanyAggregatedAnswersQuery,
  CompanyISIN,
  DatetimeString,
  QuestionId,
} from "../../../models";
import { answerDateRange, loadAnswers } from "../../../lib/data";
import { addDays, nextMonth, startOfMonth } from "../../../lib/date";

type ScoreKey = [CompanyISIN, QuestionId, DatetimeString, DatetimeString];

export default async (req, res) => {
  const { end, minCount }: CompanyAggregatedAnswersQuery = req.query;

  // last year
  const endDate = new Date(end);
  const startDate = addDays(endDate, -365);

  const answers = loadAnswers([answerDateRange(startDate, endDate)]);
  const scores = new Map<string, AggregatedAnswerScore>([]);

  for (const answer of answers) {
    const key = calculateScoreKey(answer);
    if (!key) {
      continue;
    }
    const keyString = scoreKeyString(key);
    let score: AggregatedAnswerScore | undefined = scores.get(keyString);
    if (score) {
      score.min = Math.min(answer.value, score.min);
      score.max = Math.max(answer.value, score.max);
      score.total += answer.value;
      score.count += 1;
      score.avg = score.total / score.count;
    } else {
      score = {
        min: answer.value,
        max: answer.value,
        avg: answer.value,
        total: answer.value,
        count: 1,
        start: key[2],
        end: key[3],
        companyIsin: key[0],
        questionId: key[1],
      };
    }
    scores.set(keyString, score);
  }

  return res
    .status(200)
    .send(
      Array.from(
        scores.values().filter((score) => score.count > (minCount || 0)),
      ),
    );
};

function calculateScoreKey(answer: Answer): ScoreKey | undefined {
  try {
    const created = new Date(answer.created);
    const startDate = startOfMonth(created);
    const endDate = nextMonth(startDate);
    return [
      answer.company.isin,
      answer.question.id,
      startDate.toISOString(),
      endDate.toISOString(),
    ];
  } catch {
    console.warn(
      `Answer without valid creation datetime: id=${answer.id}, created=${answer.created}`,
    );
    return;
  }
}

function scoreKeyString(key: ScoreKey): string {
  return key.map((v) => v.toString()).join("|");
}
