import config from "./config";
import connectDB from "./config/db";
import app from './index';

const main = async () => {
    await connectDB()

    app.listen(config.PORT, () => {
        console.log(`Server is listening on port ${config.PORT}`)
    })
}

main()