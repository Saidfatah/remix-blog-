import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
  useLoaderData,
  LoaderFunction,
  
} from "remix";
import type { MetaFunction } from "remix";
import { ReactElement } from "react";
import globalStylesUrl from '~/styles/global.css'  
import { getUser } from "./utils/session.server";

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};
export const links = () => [{ rel: 'stylesheet', href: globalStylesUrl }]



export default function App() {
  return (
    <Document title="my blog" >
     <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

interface DocumentProps{
  children:ReactElement;
  title?:string;
}

function Document({children,title}:DocumentProps):ReactElement{
return (<html lang="en">
<head>
  <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>{title}</title>
  <Meta />
  <Links />
</head>
<body>
  {children}
  <ScrollRestoration />
  <Scripts />
  {process.env.NODE_ENV === "development" && <LiveReload />}
</body>
</html>)
}

interface LayoutProps{
  children:ReactElement;
}


export const loader:LoaderFunction = async ({ request }) => {
  const user = await getUser(request)
  return {
    user
  }
}

function Layout({ children }:LayoutProps) {
  const { user  } = useLoaderData()
  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='logo'>
          Remix
        </Link>

        <ul className='nav'>
          <li>
            <Link to='/posts'>Posts</Link>
          </li>
          {user ? (
            <li>
              <form action='/auth/logout' method='POST'>
                <button type='submit' className='btn'>
                  Logout {user.username}
                </button>
              </form>
            </li>
          ) : (
            <li>
              <Link to='/auth/login'>Login</Link>
            </li>
          )}
        </ul>
      </nav>

      <div className='container'>{children}</div>
    </>
  )
}
