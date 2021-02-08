import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import service from "Ts/services/service";
import { ICourse } from "Ts/redux/state-interfaces";
import Course from "./course";
import CourseDetails from "./course-details";
import Loader from "Ts/components/loader";
import Setting from "Utils/slider-settings";

interface Props {}

const Courses: React.FC<Props> = () => {
    const initCourse = {
        _id: "",
        longDescr: "",
        price: "",
        shortDescr: "",
        thumbnail: { ext: "", name: "", url: "" },
        title: ""
    };

    const ref = useRef<HTMLDivElement>(null);
    const [slider, setSlider] = useState();

    const slide = (y: any) => {
        y < 0 ? slider.slickNext() : slider.slickPrev();
    };

    useEffect(() => {
        if (ref.current) {
            ref.current.addEventListener("wheel", (e: any) => {
                slide(e.wheelDelta);
            });
        }
    }, [slider]);

    //Courses massive
    const [courses, setCourses] = useState<any[]>([]);

    //Page with slider classes
    const [coursesClasses, setCoursesClasses] = useState<string>(
        "courses__slider__wrapper"
    );

    //CourseDetails classes
    const [courseDetailsClasses, setCourseDetailsClasses] = useState<string>(
        "courseDetails"
    );

    //Boolean show course details or not
    const [showCourse, setShowCourse] = useState<boolean>(false);

    //Course states
    const [course, setCourse] = useState<ICourse>(initCourse);

    //Fetching all courses
    useEffect(() => {
        service.getCourses("").then(res => setCourses(res.courses));
    }, []);

    //Go to course details
    const onClick = (id: string) => {
        //Set class to close courses page
        setCoursesClasses(
            "courses__slider__wrapper courses__slider__wrapper-close"
        );

        setCourse(courses.find((e: ICourse) => e._id === id));

        //Time for animation
        setTimeout(() => {
            setShowCourse(true);
        }, 1000);
    };

    //Button to go back from course details
    const goBack = () => {
        //Set course details to close
        setCourseDetailsClasses("courseDetails courseDetails-close");

        //Time before details closed
        setTimeout(() => {
            setShowCourse(false);

            //Open courses page animation
            setCoursesClasses(
                "courses__slider__wrapper courses__slider__wrapper-open"
            );

            //Clear details classes
            setCourseDetailsClasses("courseDetails");

            //Clear course
            setCourse(initCourse);

            //Time before courses page opens
            setTimeout(() => {
                //Clear classes
                setCoursesClasses("courses__slider__wrapper");
            }, 1000);
        }, 1000);
    };

    if (!courses.length) {
        return <Loader />;
    }

    const hz = courses.length > 2 ? 3 : courses.length;

    const settings = Setting({
        arrows: false,
        slidesToShow: hz,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    if (showCourse) {
        return (
            <CourseDetails
                course={course}
                onClick={goBack}
                classes={courseDetailsClasses}
            />
        );
    }

    return (
        <div ref={ref} className={coursesClasses}>
            <Slider
                ref={slider => {
                    setSlider(slider);
                }}
                {...settings}
            >
                {courses.map((c: ICourse) => (
                    <Course key={c._id} course={c} onClick={onClick} />
                ))}
            </Slider>
        </div>
    );
};

export default Courses;
