import { Router } from "express";
import {upload} from "../middlewares/middleware.multer.js"
import registerUser from "../controlers/register.controllers.js";
import loginUser from "../controlers/login.controllers.js"

const router = Router();

router.route("/register").post(
    upload.fields([
      { name: "avtar", maxcount: 1 },
      { name: "coverImage", maxcount: 1}
    ]),
    registerUser
)

router.get("/", async function(req,res){
  res.send("hello gu")
})
router.route("/login").get(loginUser)

export default router
