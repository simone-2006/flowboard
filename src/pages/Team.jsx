import Button from "../components/ui/Button";
import Input from "../components/ui/Input"

import Page from "../components/layout/Page";

import { useUsers } from "../hooks/useUsers";

export default function Team() {

  const { loading, error } = useUsers();

  return (
    <Page>
      <h3 className="font-bold text-2xl my-2 flex items-center justify-between">Team</h3>
      {loading && <p className="text-sm text-gray-500">Loading...</p>}
      {error && <p className="text-sm text-red-600">Could not load team.</p>}

    </Page>
  );
}
