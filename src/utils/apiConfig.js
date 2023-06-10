const cohortId = "cohort-65";
const token = "d66689bd-a4b2-435a-b216-8a223a62a546";

export const config = {
  baseUrl: `https://mesto.nomoreparties.co/v1/${cohortId}`,
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  },
};
