import Button from "../components/ui/Button";
import Input from "../components/ui/Input"

import Page from "../components/layout/Page";

import { useAppContext } from "../context/appContext";

export default function Team() {
  
  const { users } = useAppContext();

  return (
    <Page title="Team">
      
    </Page>
  );
}