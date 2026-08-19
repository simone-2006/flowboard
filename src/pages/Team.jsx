import Button from "../components/ui/Button";
import Input from "../components/ui/Input"

import Page from "../components/layout/Page";

import { listProfiles } from "../api/profiles";
import { useEffect, useState } from "react";

export default function Team() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    listProfiles()
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Page>
      <h3 className="font-bold text-2xl my-2 text-black dark:text-white flex items-center justify-between text-black dark:text-white">Team</h3>
      {loading && <p className="text-sm text-gray-500">Loading...</p>}
      {error && <p className="text-sm text-red-600">Could not load team.</p>}

    </Page>
  );
}
