import { AnswerScoreMap, Company } from "../models";
import CompanyMonthlyScores from "./CompanyMonthlyScores";

interface CompanyViewerProps {
  companies: Company[];
  scoreMap: AnswerScoreMap | undefined;
}

const CompanyViewer = ({ companies, scoreMap }: CompanyViewerProps) => (
  <div className="company-viewer">
    <h2>There are a few companies:</h2>
    <div className="companies">
      {companies.map((company) => (
        <div key={company.id}>
          <h3>{company.title}</h3>
          {scoreMap && scoreMap.has(company.isin) && (
            <CompanyMonthlyScores scores={scoreMap.get(company.isin)} />
          )}
        </div>
      ))}
    </div>
  </div>
);

export default CompanyViewer;
