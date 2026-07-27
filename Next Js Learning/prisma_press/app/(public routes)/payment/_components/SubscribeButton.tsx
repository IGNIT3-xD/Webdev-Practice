'use client'
import { useActionState } from 'react';
import { payment } from '../_actions/getPaymentUrl';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export const SubscribeButton = () => {
    const [state, action, pending] = useActionState(payment, null)

    useEffect(() => {
        if (!state)
            return

        if (!state.success)
            toast.error(state.message)

    }, [state])

    return (
        <form action={action}>
            <Button type="submit" disabled={pending}>
                {pending ? 'Redirecting..' : 'Subscribe Now'}
            </Button>
        </form>
    )
}

export default SubscribeButton