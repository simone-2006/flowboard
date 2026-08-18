import Button from "../components/ui/Button";
import Input from "../components/ui/Input"

import Page from "../components/layout/Page";

import { useAppContext } from "../context/appContext";

export default function Team() {

  const { users } = useAppContext();

  return (
    <Page>
      <h3 className="font-bold text-2xl my-2 text-black dark:text-white flex items-center justify-between text-black dark:text-white">Team</h3>

    </Page>
  );
}