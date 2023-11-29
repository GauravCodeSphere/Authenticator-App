import { getSession } from "@/lib/session";
import { useRouter } from "next/router";


export default function MyPage({ session }) {
  const router = useRouter()
  const handleLogout = async () => {
    const response = await fetch('/api/logout', {
      method: 'POST',
    });

    if (response.ok) {
      // Redirect to home page or login page after successful logout
      router.push('/login');
    } else {
      // Handle errors
      console.error('Logout failed');
    }
  };

  const { user } = session;

  return (<>
    <p>Hello, {user.name}</p>
    <button onClick={handleLogout}>Logout</button>
  </>)
}

export async function getServerSideProps({ req, res }) {
  const session = getSession(req);

  // If there is no session, redirect to the login page
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false, // This is a temporary redirect
      },
    };
  }

  // If there is a session, return it as a prop
  return { props: { session } };
}
