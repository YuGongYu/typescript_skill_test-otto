import axios from "axios";

const getCompanies = () => axios.get("/api/companies");
const getAnswers = () => axios.get("/api/answers");
const getLTMCompanyAggregatedAnswers = () =>
  axios.get("/api/ltm-company-answers-aggregated");

export { getCompanies, getAnswers, getLTMCompanyAggregatedAnswers };
