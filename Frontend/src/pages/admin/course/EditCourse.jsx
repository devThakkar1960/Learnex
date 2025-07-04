import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'
import CourseTab from './CourseTab'

function EditCourse() {
  return (
    <div className='flex-1'>
        <div className='flex items-end justify-between mb-5'>
            <h1 className='font-bold text-xl'>Add detail information regarding course</h1>
            <Link to="lecture">
             <Button className="hover:bg-blue-100" variant='outline'>Go to lectures page</Button>
            </Link>
        </div>
            <CourseTab/>

    </div>
  )
}

export default EditCourse