import { Button } from '@/components/ui/button'
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useNavigate } from 'react-router-dom'
import { useGetCreatorCourseQuery } from '@/features/api/courseApi'
import { Edit } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

function CourseTable() {
    const { data, isLoading } = useGetCreatorCourseQuery();
    const navigate = useNavigate();

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <div className="p-6">
        
            <div className="flex justify-end mb-4">
                <Button onClick={() => navigate(`create`)}>Create a new course</Button>
            </div>

           
            <div className="border rounded-lg overflow-hidden shadow-md">
                <Table className="border border-gray-200">
                    <TableCaption>A list of your recent courses.</TableCaption>
                    <TableHeader className="bg-gray-100">
                        <TableRow className="text-center">
                            <TableHead className=" text-center w-[100px] border border-gray-200">Price</TableHead>
                            <TableHead className="text-center border border-gray-200">Status</TableHead>
                            <TableHead className="text-center border border-gray-200">Title</TableHead>
                            <TableHead className="text-center w-[80px] border border-gray-200">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.courses.map((course) => (
                            <TableRow key={course._id} className="text-center border border-gray-200">
                                <TableCell className="border border-gray-200">{course?.coursePrice || "NA"}</TableCell>
                                <TableCell className="border border-gray-200">
                                    <Badge>{course?.isPublished ? "Published" : "Drafted"}</Badge>
                                </TableCell>
                                <TableCell className="font-medium border border-gray-200">{course.courseTitle}</TableCell>
                                <TableCell className="border border-gray-200">
                                    <Button variant="outline" size="icon" onClick={() => navigate(`${course._id}`)}>
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default CourseTable
