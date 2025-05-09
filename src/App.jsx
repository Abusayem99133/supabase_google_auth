import { useEffect, useState } from "react";
import "./App.css";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "./supabaseClient";
function App() {
  const [session, setSession] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);
  console.log(session);
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
  };
  const signUp = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };
  if (!session) {
    return (
      <>
        {/*     
    <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
     */}
        <button onClick={signUp}> Sign in with Google</button>
      </>
    );
  } else {
    return (
      <div>
        Logged in!
        <button onClick={signOut}> Sign Out</button>
      </div>
    );
  }
}

export default App;
