import { SubscribeButton } from './SubscribeButton';
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export function PaymentCard() {
    return (
        <Card size="default" className="mx-auto w-full max-w-lg">
            <CardHeader>
                <CardTitle>Subscription Info.</CardTitle>
                <CardDescription>
                    Payment information here.
                </CardDescription>
            </CardHeader>
            <CardFooter className="flex-col gap-2">
                <SubscribeButton />
            </CardFooter>
        </Card>
    )
}
