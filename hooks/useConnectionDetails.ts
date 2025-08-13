import { useEffect, useState } from 'react';

// Backend token server endpoint (only prod URL; no local fallback)
const tokenServerUrl = process.env.EXPO_PUBLIC_TOKEN_SERVER_URL;

/**
 * Retrieves a LiveKit token.
 *
 * Currently configured to use LiveKit's Sandbox token server.
 * When building an app for production, you should use your own token server.
 */
export function useConnectionDetails(): ConnectionDetails | undefined {
  const [details, setDetails] = useState<ConnectionDetails | undefined>(
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
            setDetails({ url: json.server_url, token: json.token });
            return;
          }
          // Also support camelCase just in case
          if (json.serverUrl && json.participantToken) {
            setDetails({ url: json.serverUrl, token: json.participantToken });
            return;
          }
        }
      } catch {
        // Intentionally no fallback in prod-only configuration
      }
    };

    fetchToken();
  }, []);

  return details;
}

type ConnectionDetails = {
  url: string;
  token: string;
};
