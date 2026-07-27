import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getMe } from '@/service/getMe'

const HomePage = async () => {
    const user = await getMe()
    // console.log(user)

    return (
        <div className='max-w-11/12 mx-auto my-6'>
            <h4>Welcome Mr. {user.data?.email || 'X'}</h4>

            <Card className="max-w-sm">
                <CardHeader>
                    <CardTitle className='text-amber-600'>Project Overview</CardTitle>
                    <CardDescription>
                        Track progress and recent activity for your Next.js app.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    Your design system is ready. Start building your next component.
                </CardContent>
            </Card>
        </div>
    )
}

export default HomePage