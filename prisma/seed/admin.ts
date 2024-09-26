import prisma from "../../src/db/db";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()
async  function main () {
   bcrypt.genSalt(Number(process.env.salt_round), (err,salt) => {
    if (err) return err

    bcrypt.hash(String(process.env.admin_password), salt, async (err, hash) => {
      if (err) return err
     
      const generateAdmin = await prisma.admin.create({data: {
        username: String(process.env.user_name),
        password: hash,
        role: 'ADMIN'
      }})

      if (!generateAdmin) return console.log("Can't create admin")
        console.log("Admin created successfully")
    })
   })
}

main()
