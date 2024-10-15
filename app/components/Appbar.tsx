// "use client";

// import { signIn, signOut, useSession } from 'next-auth/react'


// export function Appbar() {
//     const session = useSession();

//     return <div>
//         <div className='flex justify-between'>
//             <div>
//                 Navbar will be placed here
//             </div>
//             <div>
//                 {session.data?.user && <button className='m-2 p-2 bg-blue-400' onClick={() => signOut()}>Sign Out</button>}
//                 {!session.data?.user && <button className='m-2 p-2 bg-blue-400' onClick={() => signIn()}>Sign In</button>}
//             </div>
//         </div>
//     </div>


// }

// export default Appbar
"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";


export function Appbar({ showThemeSwitch = true , isSpectator=false }) {
  const session = useSession();
  const router = useRouter();

  return (
    <div className="flex justify-between px-5 py-4 md:px-10 xl:px-20">
      <div
        onClick={() => {
          router.push("/home");
        }}
        className={`flex flex-col justify-center text-lg font-bold hover:cursor-pointer ${showThemeSwitch ? "" : "text-white"}`}
      >
        Muzer
      </div>
      <div className="flex items-center gap-x-2">
        {isSpectator && <WalletMultiButton/>}
        {session.data?.user && (
          <Button
            className="bg-purple-600 text-white hover:bg-purple-700"
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
          >
            Logout
          </Button>
        )}
        {!session.data?.user && (
          <div className="space-x-3">
            <Button
              className="bg-purple-600 text-white hover:bg-purple-700"
              onClick={() => router.push("/auth")}
            >
              Signin
            </Button>
            <Link
              href={{
                pathname: "/auth",
                query: {
                  authType: "signUp",
                },
              }}
            >
              <Button
                variant={"ghost"}
                className="text-white hover:bg-white/10"
              >
                Signup
              </Button>
            </Link>
          </div>
        )}
        
        {showThemeSwitch && <ThemeSwitcher />}
      </div>
    </div>
  );
}
