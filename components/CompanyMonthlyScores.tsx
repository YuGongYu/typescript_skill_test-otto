import { AggregatedAnswerScore, QuestionId } from "../models";
import SentimentChart from "./SentimentChart";

interface CompanyMonthlyScoresProps {
  scores: Map<QuestionId, AggregatedAnswerScore[]>;
}

const visibleQuestions: { [key: QuestionId]: string } = {
  "1QLkHdQUcXd1D6h2ZqCh": "Pitkän aikavälin houkuttelevuus",
  nbDzInk3nasDGdZXsJFq: "Lähivuosien tuloskasvunäkymät",
};

const CompanyMonthlyScores = ({ scores }: CompanyMonthlyScoresProps) => (
  <div className="company-monthly-scores">
    {Object.entries(visibleQuestions).map(([questionId, question]) => (
      <div key={questionId}>
        <h4>{visibleQuestions[questionId]}</h4>
        <SentimentChart
          datapoints={(
            scores.get(questionId) || ([] as AggregatedAnswerScore[])
          ).map((score) => ({
            start: new Date(score.start),
            value: score.avg,
          }))}
          width={492}
          height={100}
        />
      </div>
    ))}
  </div>
);

export default CompanyMonthlyScores;
