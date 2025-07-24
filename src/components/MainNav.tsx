"use client"

import React from "react"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Avatar } from "@/components/ui/avatar"

type SessionUser = {
  name?: string | null
  email?: string | null
  image?: string | null
  role?: string
}

const UserAvatar = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement> & {
    user: { name?: string | null; image?: string | null }
  }
>(({ user, className, ...props }, ref) => (
  <Button 
    variant="ghost" 
    className={cn("h-10 w-10 rounded-full p-0 relative", className)}
    ref={ref}
    {...props}
  >
    <Avatar 
      src={user.image} 
      alt={user.name || ""}
      fallback={
        user.name
          ?.split(" ")
          .map((n) => n[0])
          .join("")
      }
      className="h-10 w-10"
    />
  </Button>
))
UserAvatar.displayName = "UserAvatar"

export function MainNav() {
  const { data: session, status } = useSession()
  const isLoading = status === "loading"

  if (isLoading) {
    return (
      <div className="h-16 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b" />
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">Edenshuu</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/services"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Services
            </Link>
            <Link
              href="/portfolio"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Portfolio
            </Link>
            <Link
              href="/about"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              À propos
            </Link>
            <Link
              href="/contact"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Contact
            </Link>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {session?.user ? (
            <div className="flex items-center space-x-4">
              {(session.user as any)?.role === "ADMIN" && (
                <Button variant="outline" asChild>
                  <Link href="/admin">Tableau de bord</Link>
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
                    <Avatar 
                      src={session.user.image || undefined} 
                      alt={session.user.name || ""}
                      fallback={
                        session.user.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                      }
                      className="h-8 w-8"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" legacyBehavior>
                      <a className="w-full">Profil</a>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" legacyBehavior>
                      <a className="w-full">Tableau de bord</a>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault()
                      signOut({ callbackUrl: "/" })
                    }}
                  >
                    Se déconnecter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link href="/auth/signin">Connexion</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/signup">S'inscrire</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
