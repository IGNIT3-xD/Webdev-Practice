'use client'

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardTitle, CardDescription, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginAction } from './../_actions/authActions';
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
// import { useRouter } from "next/navigation"

const LoginForm = () => {
    const [state, action, pending] = useActionState(loginAction, false)
    // const router = useRouter()

    useEffect(() => {
        if (!state)
            return

        if (!state.success) {
            toast.error(state.message)
        }

        if (state.success) {
            toast.success(state.message)
            // router.push('/')
        }

    }, [state])

    return (
        <div className="w-sm">
            <Card className="w-full shadow-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold my-2">Welcome</CardTitle>
                    <hr />
                    <CardTitle className="mt-2">Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email & password below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={action}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input name="email" type="email" placeholder="m@example.com" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input name="password" type="password" placeholder="******" required />
                            </div>
                        </div>
                        <Button type="submit" className="w-full mt-4">
                            {
                                pending ? 'Submitting...' : 'Login'
                            }
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default LoginForm