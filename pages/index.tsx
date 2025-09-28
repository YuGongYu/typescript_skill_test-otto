import { Answer, Company } from "../models";
import { useEffect, useState } from "react";

import CompanyViewer from "../components/CompanyViewer";
import { getCompanies, getAnswers } from "../lib/api";

const Home = () => {
  const [companies, setCompanies] = useState(
    undefined as Company[] | undefined
  );
  const [answers, setAnswers] = useState(undefined as Answer[] | undefined);
  useEffect(() => {
    getCompanies().then((response) => setCompanies(response.data));
    getAnswers().then((response) => setAnswers(response.data));
  }, []);
  return (
    <div>
      <h1>Home</h1>
      {companies && <CompanyViewer companies={companies} />}
      {answers && (
        <p>There is a total of {answers.length} answers in the dataset.</p>
      )}
    </div>
  );
};

export default Home;
