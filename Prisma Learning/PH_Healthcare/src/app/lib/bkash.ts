import config from "../config"
import { redisClient } from "./redis"

export const getBkashIdToken = async () => {
    try {
        const idTokenKey = "bkash:id_token"
        const refreshTokenKey = "bkash:refresh_token"

        let bkashIdToken = await redisClient.get(idTokenKey)
        const bkashRefreshToken = await redisClient.get(refreshTokenKey)

        const bkashIdTokenTTL = await redisClient.ttl(idTokenKey)
        const bkashRefreshTokenTTL = await redisClient.ttl(refreshTokenKey)

        // If bkash id token's not found or time has less than 10 mints and bkash refresh token time has more than 10 mints
        if ((bkashIdTokenTTL < 600 || !bkashIdToken) && bkashRefreshToken && bkashRefreshTokenTTL > 600) {
            console.log("------Hit this line - 3------");
            const refrshTokenResponse = await fetch(`${config.bkash_base_url}/tokenized/checkout/token/refresh`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    username: config.bkash_username,
                    password: config.bkash_password
                },
                body: JSON.stringify(
                    {
                        app_key: config.bkash_app_key,
                        app_secret: config.bkash_app_secret,
                        refresh_token: bkashRefreshToken
                    }
                )
            })

            if (!refrshTokenResponse.ok) {
                throw new Error("Bkash refresh token grant failed.")
            }

            const refreshTokenResult = await refrshTokenResponse.json()

            await redisClient.set(idTokenKey, refreshTokenResult.id_token, {
                expiration: {
                    type: 'EX',
                    value: 60 * 60 // 1 hour
                }
            })

            bkashIdToken = refreshTokenResult.id_token
            return bkashIdToken
        }

        if (bkashIdTokenTTL > 600) {
            console.log("------Hit this line - 2------");
            return bkashIdToken
        }

        console.log("------Hit this line - 1------");
        const response = await fetch(`${config.bkash_base_url}/tokenized/checkout/token/grant`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                username: config.bkash_username,
                password: config.bkash_password
            },
            body: JSON.stringify(
                {
                    app_key: config.bkash_app_key,
                    app_secret: config.bkash_app_secret
                }
            )
        })

        if (!response.ok) {
            throw new Error("Bkash access token grant failed.")
        }

        const result = await response.json()

        await redisClient.set(idTokenKey, result.id_token, {
            expiration: {
                type: 'EX',
                value: 60 * 60 // 1 hour
            }
        })

        await redisClient.set(refreshTokenKey, result.refresh_token, {
            expiration: {
                type: 'EX',
                value: 60 * 60 * 24 * 28 // 28 days
            }
        })

        bkashIdToken = result.id_token
        return bkashIdToken
        
    } catch (error: any) {
        throw new Error(error.message)
    }
}