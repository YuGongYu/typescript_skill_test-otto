import axios from "axios";
import {
  AggregatedAnswerScore,
  Answer,
  AnswerScoreMap,
  Company,
  CompanyISIN,
  QuestionId,
} from "../models";

const getCompanies = (): Promise<Company[]> =>
  axios.get("/api/companies").then((response) => response.data);
const getAnswers = (): Promise<Answer[]> =>
  axios.get("/api/answers").then((response) => response.data);
const getLTMCompanyAggregatedAnswers = (
  end: Date,
): Promise<AggregatedAnswerScore[]> =>
  axios
    .get("/api/ltm-company-answers-aggregated", {
      params: { end: end.toISOString() },
    })
    .then((response) => response.data);

const getLTMCompanyAggregatedAnswersMap = (
  end: Date,
): Promise<AnswerScoreMap> =>
  getLTMCompanyAggregatedAnswers(end).then((scores) => {
    const scoreMap = new Map<
      CompanyISIN,
      Map<QuestionId, AggregatedAnswerScore[]>
    >([]);
    for (const score of scores) {
      let companyScores = scoreMap.get(score.companyIsin);
      if (!companyScores) {
        companyScores = new Map<QuestionId, AggregatedAnswerScore[]>([
          [score.questionId, [score]],
        ]);
      } else {
        const questionScores = (
          companyScores.get(score.questionId) || []
        ).concat(score);
        companyScores.set(score.questionId, questionScores);
      }
      scoreMap.set(score.companyIsin, companyScores);
    }
    return scoreMap;
  });

export {
  getCompanies,
  getAnswers,
  getLTMCompanyAggregatedAnswers,
  getLTMCompanyAggregatedAnswersMap,
};
