"use client";

import { useActionState } from "react";
import { Loader2, LogIn } from "lucide-react";
import { loginAction, type LoginState } from "../actions";
import { Alert, Button } from "@/components/ui";

const INITIAL: LoginState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, INITIAL);

  return (
    <form action={formAction} className="space-y-4">
      {state.error && <Alert tone="error">{state.error}</Alert>}
      <div>
        <label htmlFor="password" className="field-label">
          Admin password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="field"
          required
          autoFocus
          autoComplete="current-password"
        />
      </div>
      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? (
          <>
            <Loader2 className="h-[18px] w-[18px] animate-spin" aria-hidden />
            Signing in…
          </>
        ) : (
          <>
            <LogIn className="h-[18px] w-[18px]" aria-hidden />
            Sign in
          </>
        )}
      </Button>
    </form>
  );
}
