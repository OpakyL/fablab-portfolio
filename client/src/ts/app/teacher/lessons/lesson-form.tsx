import React from "react";
import Input from "Ts/components/input";
import Button from "Ts/components/button";
import { FormikErrors } from "formik";
import { SetFieldValue, HandleChange } from "./../add-edit-course/course-form";

interface Props {
    values: {
        title: string;
        videoUrl: string;
        text: string;
        files: any;
    };
    handleChange: HandleChange;
    handleSubmit: () => void;
    setFieldValue: SetFieldValue;
    errors: FormikErrors<{}>;
}

const LessonForm: React.FC<Props> = ({
    values: { title, videoUrl, text, files },
    handleChange,
    handleSubmit,
    setFieldValue,
    errors
}) => {
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.files) {
            let acceptedFiles: any = [];
            for (let i = 0; i < event.currentTarget.files.length; i++) {
                acceptedFiles.push(event.currentTarget.files[i]);
            }
            setFieldValue("files", files.concat(acceptedFiles));
        }
    };

    return (
        <div className="section">
            <div className="teacherForm__wrapper">
                <form className="teacherForm" onSubmit={handleSubmit}>
                    <Input
                        name="title"
                        placeholder="Title"
                        onChange={handleChange}
                        value={title}
                    />
                    <br />
                    <Input
                        name="videoUrl"
                        placeholder="Video url"
                        onChange={handleChange}
                        value={videoUrl}
                    />
                    <br />
                    <Input
                        name="text"
                        placeholder="Text"
                        onChange={handleChange}
                        value={text}
                    />
                    <br />
                    <Input
                        name="files"
                        type="file"
                        onChange={onChange}
                        multiple={true}
                    />
                    <br />
                    <Button type="submit">Add</Button>
                </form>
            </div>
        </div>
    );
};

export default LessonForm;
