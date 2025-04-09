import app from './app/app.js';
import {connectDB} from './config/database.js'
const PORT 		= process.env.PORT
const NODE_ENV  = process.env.NODE_ENV

app.listen(PORT, async () => {
	await connectDB()
	console.log(`🚀 Server running on http://localhost:${PORT}`);
	console.log(`============== ${NODE_ENV === "production" ? "production" : "developement"} =======================`)
});
