'use client'
import { useRef } from 'react';
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useSearchParams } from 'next/navigation';
import { useRouter, usePathname } from 'next/navigation';

export function SearchBar() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const path = usePathname()

    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const handleChange = (value: string) => {
        // console.log(value);

        // const params = new URLSearchParams()
        // if (value) {
        //     params.set('search', value)
        // } else {
        //     params.delete('search')
        // }

        // router.replace(`${path}?${params.toString()}`)

        if (debounceRef.current) {
            clearTimeout(debounceRef.current)
        }

        debounceRef.current = setTimeout(() => {
            const params = new URLSearchParams()
            if (value) {
                params.set('search', value)
            } else {
                params.delete('search')
            }

            router.replace(`${path}?${params.toString()}`)
        }, 500)
    }

    return (
        <Field orientation="horizontal">
            <Input
                defaultValue={searchParams.get("search") ? searchParams.get('search')?.toString() : ""}
                onChange={(e) => handleChange(e.target.value)}
                type="search" placeholder="Search..." />
        </Field>
    )
}
