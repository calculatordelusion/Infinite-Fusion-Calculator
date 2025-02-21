import { ErrorHandler } from "@/components/theme/ErrorHandler";

const notFoundErrorPage = () => {
  return <ErrorHandler errorType="not_found" />;
};

export default notFoundErrorPage;
