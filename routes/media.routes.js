const { Router } = require("express");
const { body } = require("express-validator");
const router = Router();
const uuid = require("uuid");
const fs = require("fs").promises;
const f = require("fs");
const File = require("./../models/File");

const createDir = dir => {
    if (!f.existsSync(dir)) {
        f.mkdirSync(dir);
    }
};

createDir("./uploads");

//upload images
//TODO validate files

router.post(
    "/upload",
    // body().custom(async (value, { req }) => {
    //     const { file } = req.files;
    // }),
    require("./../middleware/auth.middleware")({ isStudent: true }),
    async (req, res) => {
        try {
            const { file } = req.files;
            // console.log(file);
            // throw new Error("message ");
            const sp = file.name.split(".");
            const ext = sp[sp.length - 1];
            const url = `/uploads/${uuid()}.${ext}`;
            await fs.writeFile(`.${url}`, file.data);
            const newFile = new File({ url, name: sp[0], ext });
            const respFile = await newFile.save();
            res.status(200).send({ file: respFile });
        } catch (error) {
            res.status(500).send({ message: `Server error ${error.message}` });
        }
    }
);

module.exports = router;
