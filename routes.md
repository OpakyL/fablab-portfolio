Every route provides status codes:

1. 401 - in case you attach token and it's expired; in case token is invalid
2. 403 - in case of trying to access not your role route

?when you creating something what should return (success msg / created object)

| Url                      | Role              | Method | Body / Query                                   | Response status | Response                   | Error status | Error response             |
| ------------------------ | ----------------- | ------ | ---------------------------------------------- | --------------- | -------------------------- | ------------ | -------------------------- |
| /api/auth/register       | Not authenticated | POST   | `{username, password, email}`                  | 201             | `{message: "Success msg"}` | 400          | `{message: "Failure msg"}` |
| /api/auth/register       | Student           | PUT    | `{user}`                                       | 200             | `{message: "Success msg"}` | 400          | `{message: "Failure msg"}` |
| /api/auth/register       | Student           | DELETE |                                                | 200             | `{message: "Success msg"}` | 400          | `{message: "Failure msg"}` |
| /api/auth/login          | Not authenticated | POST   | `{username, password}`                         | 200             | `{token, userId, role}`    | 400          | `{message: "Failure msg"}` |
| /api/auth/reset-password | Not authenticated | ?      | `{?}`                                          | 200             | `{?}`                      | 400          | `{message: "Failure msg"}` |
| /api/auth/verify-email   | Not authenticated | ?      | `{?}`                                          | 200             | `{?}`                      | 400          | `{message: "Failure msg"}` |
| /api/media/upload        | Student           | POST   | `const fd = new FormData()`                    | 200             | `{file: {url, name, ext}}` | 400          | `{message: "Failure msg"}` |
|                          |                   |        | `fd.append("file", BLOBFILE);`                 |
|                          |                   |        | body: `{fd}`                                   |
| /api/courses             | Not authenticated | GET    |                                                | 200             | `{courses}`                | 500          |                            |
| /api/course              | Not authenticated | GET    | `?courseId="courseID"`                         | 200             | `{course}`                 | 400          | `{message: "Failure msg"}` |
| /api/course              | Teacher           | POST   | `{course}`                                     | 201             | `{message: "Success msg"}` | 400          | `{message: "Failure msg"}` |
| /api/course              | Teacher           | PUT    | query: `?courseId="courseID"` body: `{course}` | 200             | `{message: "Success msg"}` | 400          | `{message: "Failure msg"}` |
| /api/course              | Teacher           | DELETE | `?courseId="courseID"`                         | 200             | `{message: "Success msg"}` | 400          | `{message: "Failure msg"}` |
| /api/lessons             | Student           | GET    | `?courseId="courseID"`                         | 200             | `{lessons}`                | 400          | `{message: "Failure msg"}` |
| /api/lesson              | Student           | GET    | `?lessonId="lessonID"`                         | 200             | `{lesson}`                 | 400          | `{message: "Failure msg"}` |
| /api/lesson              | Teacher           | POST   | `{lesson}`                                     | 201             | `{message: "Success msg"}` | 400          | `{message: "Failure msg"}` |
| /api/lesson              | Teacher           | PUT    | query: `?lessonId="lessonID"` body: `{lesson}` | 200             | `{message: "Success msg"}` | 400          | `{message: "Failure msg"}` |
| /api/lesson              | Teacher           | DELETE | `?lessonId="lessonID"`                         | 200             | `{message: "Success msg"}` | 400          | `{message: "Failure msg"}` |
| /api/reviews             | Not authenticated | GET    | `?courseId="courseID"`                         | 200             | `{reviews}`                | 400          | `{message: "Failure msg"}` |
| /api/review              | Student           | POST   | `{review}`                                     | 201             | `{message: "Success msg"}` | 400          | `{message: "Failure msg"}` |
| /api/review              | Student           | DELELE | `?reviewId="reviewID"`                         | 200             | `{message: "Success msg"}` | 400          | `{message: "Failure msg"}` |
| /api/review ?            | Student           | PUT    | query: `?reviewId="reviewID"` body: `{reivew}` | 200             | `{message: "Success msg"}` | 400          | `{message: "Failure msg"}` |
| /api/user                | Student           | GET    |                                                | 200             | `{user}`                   | 400          | `{message: "Failure msg"}` |

?every teacher got access to every course  
?create service for chat / managing messages

TODO: reset-pwd; verify-email; messages

/api/messages student GET { } {teachers}  
/api/messages student POST {teacherID} {messages}  
/api/messages teacher GET { } {students}  
/api/messages teacher POST {studentID} {messages}

TODO: creating teachers/pages from the admin role

/api/auth/register/teacher Admin POST {...teacher} {message}  
/api/page Not authenticated GET ?pageUrl="page" {page}  
/api/page Admin POST {page} {message}  
/api/page Admin PUT query: `?pageId="pageID"` body: `{page}` {message}  
/api/page Admin DELETE `?pageId="pageID"` {message}
