import { AnswerScoreMap, Company } from "../models";
import { useEffect, useState } from "react";

import CompanyViewer from "../components/CompanyViewer";
import { getCompanies, getLTMCompanyAggregatedAnswersMap } from "../lib/api";

const Home = () => {
  const [companies, setCompanies] = useState(
    undefined as Company[] | undefined,
  );
  const [scoreMap, setScoreMap] = useState(
    undefined as AnswerScoreMap | undefined,
  );
  useEffect(() => {
    getCompanies().then(setCompanies);
    getLTMCompanyAggregatedAnswersMap(new Date(2020, 12)).then(setScoreMap);
  }, []);
  return (
    <div className="index">
      <h1>Home</h1>
      {companies && <CompanyViewer companies={companies} scoreMap={scoreMap} />}
    </div>
  );
};

export default Home;
