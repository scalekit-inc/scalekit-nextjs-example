import type { NextPage } from "next";
import Container from "../components/Container";

const Home: NextPage = async () => {

  return (
    <Container title="Home">
      <div className="space-y-4">
        <h2 className="text-2xl">Scalekit Example</h2>
        <p>
          This is an example website to demonstrate how to use <strong>Scalekit SAML</strong> for SAML SSO authentication.
        </p>
      </div>
    </Container>
  );
};

export default Home;
