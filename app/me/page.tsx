import type { NextPage } from "next";
import Link from "next/link";
import Container from "../../components/Container";
import { getUser } from '@/service/auth';

const Me: NextPage = async () => {
  const { user } = await getUser();
  return (
    <Container title="Me">
      {!user ?
        <div className="space-y-4">
          <h2 className="text-2xl">Access Denied</h2>
          <p>
            <Link href="/login" legacyBehavior>
              <a className="underline underline-offset-4">You must be signed in to view this page</a>
            </Link>
          </p>
        </div> :
        <div className="space-y-4">
          <h1>User Logged in!</h1>
          {user.name && <h2 className="text-2xl">Welcome: {user.name}</h2>}
          {user.givenName && <h3 className="text-2xl">Your First Name: {user.givenName}</h3>}
          {user.familyName && <h3 className="text-2xl">Your Last Name: {user.familyName}</h3>}
          <h3 className="text-2xl">Your Email: {user.email}</h3>
          {user.username && <h3 className="text-2xl">Your Username: {user.username}</h3>}
          <hr></hr>
          <a href="/logout">Logout</a>
        </div>
      }
    </Container>
  );
};

export default Me;
