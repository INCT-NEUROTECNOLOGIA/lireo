import { useState } from "react";

const useLireMorph = () => {
  const [summaryClose, setSummaryClose] = useState<boolean>(false);

  return {
    summaryClose,
  };
};

export default useLireMorph;
