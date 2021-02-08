const File = require("./../models/File");

const getLessonFiles = async input => {
    const output = [];
    for (let i = 0; i < input.length; i++) {
        const element = input[i];
        output.push(await File.find(element.url).exec());
    }
    return output.map(e => e._id);
};

module.exports = getLessonFiles;
