const {Router} = require('express');
const router = Router();
const fs = require('fs');
const path = require('path');

// /api/directory
router.get(
    '/directory',
    (req, res) => {
        try {
            const fileName = req.query.path;
            const massPath = fileName.split('\\');
            const currDir = massPath.pop();
            const prevDir = (massPath != '') ? massPath.join('\\') : '';
            const absolutePathFile = `./files/${fileName}`;
            let size, fileStats, type, modification, pathFile, pathFileShort;
            const response = fs
                .readdirSync(absolutePathFile) 
                .map((file) => {
                    pathFile = path.normalize(`${absolutePathFile}/${file}`);
                    fileStats = fs.statSync(pathFile);
                    size = fileStats.isFile() ? fileStats.size : '-';
                    type = fileStats.isDirectory() ? 'Directory' : path.extname(file);
                    modification = fileStats.mtime;
                    pathFileShort = pathFile.split('files\\')[1];
                    return {file, size, type, modification, pathFileShort}
                })
            console.log(response)
            res.status(200).json({files: response, prevDir, currDir});
            }
        catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Ошибка' })
        }
    }
)

// /api/file/delete
router.get(
    '/file/delete',
    (req, res) => {
        try {
            const file = req.query.path;
            const path = `./files/${file}`;

            if (fs.existsSync(path)) {
                return fs.unlinkSync(path);
            }
            return res.status(400).json({ message: 'Ошибка при скачивании файла' })
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Ошибка при скачивании файла' })
        }
})

// /api/file/download
router.get(
    '/file/download',
    (req, res) => {
        try {
            const file = req.query.path;
            const path = `./files/${file}`;

            if (fs.existsSync(path)) {
                return res.download(path, file);
            }
            return res.status(400).json({ message: 'Ошибка при скачивании файла' })
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Ошибка при скачивании файла' })
        }
})

// /api/directory/delete
router.get(
    '/directory/delete',
    (req, res) => {
        try {
            const file = req.query.path;
            const path = `./files/${file}`;
            console.log(path)

            if (fs.existsSync(path)) {
                return fs.rmdirSync(path);
            }
            return res.status(400).json({ message: 'Ошибка при удалении файла' })
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Ошибка при удалении файла' })
        }
})

// /api/directory/create
router.get(
    '/directory/create',
    (req, res) => {
        try {
            const file = req.query.path;
            const path = `./files/${file}`;

            if (!fs.existsSync(path)) {
                return fs.mkdirSync(path);
            }
            return res.status(400).json({ message: 'Ошибка при удалении файла' })
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Ошибка при удалении файла' })
        }
})

module.exports = router;