import path from "path"
import fs from "fs"
import { root_dir } from "../config"

export function deleteImage(fileName: any, pathFileInput: string) {
    let pathFile = path.join(root_dir,"private",pathFileInput,fileName)
    let fileExist = fs.existsSync(pathFile)
    if (fileExist && fileName !== "") return fs.unlinkSync(pathFile)
}