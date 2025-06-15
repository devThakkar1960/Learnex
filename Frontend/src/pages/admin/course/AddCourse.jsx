import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-dropdown-menu'
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useCreateCourseMutation } from '@/features/api/courseApi'
import { toast } from 'sonner'

function AddCourse() {
    const [courseTitle, setCourseTitle] = useState("");
    const [category, setCategory] = useState("");
    const [createCourse, { data, isSuccess, isError, error, isLoading }] = useCreateCourseMutation();
    const navigate = useNavigate();

    const getSelectCategory = (value) => {
        setCategory(value);
    }

    const createCourseHandler = async () => {
        await createCourse({ courseTitle, category });
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "Course created");
            navigate("/admin/course")
        }

    }, [isSuccess, error]);

    return (
        <div className='flex justify-center mt-16 px-4 sm:px-6 lg:px-8'>
            <div className='bg-white dark:bg-[#020817] p-6 sm:p-8 rounded-lg shadow-lg border border-gray-200 w-full max-w-lg sm:max-w-xl md:max-w-2xl'>
                {/* Header Section */}
                <div className='mb-6 text-center'>
                    <h1 className='font-bold text-2xl text-gray-800 dark:text-white '>Add a New Course</h1>
                    <p className='text-sm text-gray-600 dark:text-white '>
                        Fill in the details below to create a new course.
                    </p>
                </div>

               
                <div className='space-y-6'>
                   
                    <div>
                        <Label className="font-medium text-gray-700 dark:text-white ">Title</Label>
                        <Input
                            type="text"
                            value={courseTitle}
                            onChange={(e) => setCourseTitle(e.target.value)}
                            placeholder="Enter course name"
                            className="mt-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 w-full"
                        />
                    </div>

                    <div>
                        <Label className="font-medium text-gray-700 dark:text-white ">Category</Label>
                        <Select onValueChange={getSelectCategory}>
                            <SelectTrigger className="mt-2 w-full border border-gray-300">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                           
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Category</SelectLabel>
                                    <SelectItem value="Next JS">Next JS</SelectItem>
                                    <SelectItem value="Data Science">Data Science</SelectItem>
                                    <SelectItem value="Frontend Development">
                                        Frontend Development
                                    </SelectItem>
                                    <SelectItem value="Fullstack Development">
                                        Fullstack Development
                                    </SelectItem>
                                    <SelectItem value="MERN Stack Development">
                                        MERN Stack Development
                                    </SelectItem>
                                    <SelectItem value="Javascript">Javascript</SelectItem>
                                    <SelectItem value="Python">Python</SelectItem>
                                    <SelectItem value="Docker">Docker</SelectItem>
                                    <SelectItem value="MongoDB">MongoDB</SelectItem>
                                    <SelectItem value="HTML">HTML</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className='flex flex-col sm:flex-row justify-between gap-3 mt-4'>
                        <Button variant="outline" onClick={() => navigate("/admin/course")} className="w-full sm:w-auto">
                            Back
                        </Button>
                        <Button disabled={isLoading} onClick={createCourseHandler} className="w-full sm:w-auto">
                            {isLoading ? (
                                <>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Please wait
                                </>
                            ) : "Create"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCourse;
