import { useEffect } from "react";

const SITE_NAME = "Evole 2 Purpose";

const usePageTitle = (title: string) => {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    return () => {
      document.title = SITE_NAME;
    };
  }, [title]);
};

export default usePageTitle;
