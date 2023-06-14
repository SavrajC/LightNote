import { createRoot } from "react-dom/client";
import NoteApp from "./NoteApp";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
import { Authenticator } from "@aws-amplify/ui-react";
import { withAuthenticator } from "@aws-amplify/ui-react";
// eslint-disable-next-line import/no-unresolved
import "@aws-amplify/ui-react/styles.css";
Amplify.configure({
  Auth: {
    region: awsExports.REGION,
    userPoolId: awsExports.USER_POOL_ID,
    userPoolWebClientId: awsExports.USER_POOL_APP_CLIENT_ID,
  },
});
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

const App = () => {
  return (
    <div>
      <Authenticator>
        {({ signOut, user }) => (
          <div>
            <NoteApp user={user} signOut={signOut} />
          </div>
        )}
      </Authenticator>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
export default withAuthenticator(App);
