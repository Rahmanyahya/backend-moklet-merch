import Express from "express";
import helmet from "helmet";
import productAPI from "../src/router/product.router"
import loginAPI from "../src/router/login,router"

const app = Express()
app.use(helmet())
app.use(Express.json())
app.use(Express.urlencoded({extended: true}))

app.use("/product", productAPI)
app.use("/AdminMokletMerch2024", loginAPI)

app.listen(3000, () => console.log("Running on port 3000 || http://localhost:3000"))