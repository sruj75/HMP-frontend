import { useEffect, useState } from 'react';

// Backend token server endpoint (only prod URL; no local fallback)
const tokenServerUrl = process.env.EXPO_PUBLIC_TOKEN_SERVER_URL;

type TokenRequest = {
  url: string;
  token: string;
};

export function useTokenRequest(): TokenRequest | undefined {
  const [tokenData, setTokenData] = useState<TokenRequest | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchToken = async () => {
      try {
        if (tokenServerUrl) {
          const response = await fetch(tokenServerUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
          });
          const json = await response.json();
          // Our backend returns snake_case keys
          if (json.server_url && json.token) {
            setTokenData({ url: json.server_url, token: json.token });
            return;
          }
          // Also support camelCase just in case
          if (json.serverUrl && json.participantToken) {
            setTokenData({ url: json.serverUrl, token: json.participantToken });
            return;
          }
        }
      } catch {
        // Intentionally no fallback in prod-only configuration
      }
    };

    fetchToken();
  }, []);

  return tokenData;
}
