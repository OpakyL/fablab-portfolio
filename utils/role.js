const isStudent = role => role === "STUDENT" || isTeacher(role);

const isTeacher = role => role === "TEACHER" || isAdmin(role);

const isAdmin = role => role === "ADMIN";

module.exports = { isAdmin, isTeacher, isStudent };
