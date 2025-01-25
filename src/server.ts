import { app } from "./app";
import { ENV } from './env'

const PORT = Number(ENV.PORT)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))