import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (
      requestConfig: {
        url?: any;
        method?: string;
        headers?: any;
        body?: object;
      },
      applyData: (props: object | undefined) => void
    ) => {
      setIsLoading(true);
      setError(null);

      try {
        const response: any = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : "GET",
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        });

        if (!response.ok) {
          throw new Error("Request failed!");
        }

        const data = await response.json();

        setTimeout(() => {
          setIsLoading(false);
          applyData(data);
        }, 2000);
      } catch (err: any) {
        setError(err.message || "Something went wrong!");
      }
    },
    []
  );

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
