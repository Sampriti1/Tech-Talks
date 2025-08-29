import {app} from "./app.js";
import {connectDB} from "./config/db.js";

const port = process.env.PORT || 5000;

(async () => {
    await connectDB();
    app.listen(port, () => {
        console.log(`API server running on ${port}`);
    });
}) ();