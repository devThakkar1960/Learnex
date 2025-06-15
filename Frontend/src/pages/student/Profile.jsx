import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Course from "./Course";
import { useLoadUserQuery, useUpdateUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  const { data, isLoading, refetch } = useLoadUserQuery();
  const [updateUser, { data: updateUserData, isLoading: updateUserIsLoading, isError, error, isSuccess }] = useUpdateUserMutation();

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(updateUserData?.message || "Profile updated.");
    }
    if (isError) {
      toast.error(error?.message || "Failed to update profile");
    }
  }, [updateUserData, isSuccess, isError, error]);

  if (isLoading) return <h1 className="text-center text-xl">Profile Loading...</h1>;

  const user = data?.user;

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    if (profilePhoto) formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 my-10 border border-gray-300 rounded-lg shadow-md bg-white dark:bg-gray-900 dark:border-gray-700">
      <h1 className="font-bold text-3xl text-center py-6 border-b border-gray-300 dark:border-gray-700">Profile</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 p-6">
        <div className="flex flex-col items-center border p-4 rounded-lg shadow-sm">
          <Avatar className="h-28 w-28 md:h-36 md:w-36 mb-4 mt-4">
            <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} alt="Profile" className="border rounded-full" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="w-full md:w-3/4 space-y-4">
          <div className="p-3 border rounded-md shadow-sm">
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">Name: <span className="font-normal text-gray-700 dark:text-gray-300">{user?.name}</span></h2>
          </div>
          <div className="p-3 border rounded-md shadow-sm">
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">Email: <span className="font-normal text-gray-700 dark:text-gray-300">{user?.email}</span></h2>
          </div>
          <div className="p-3 border rounded-md shadow-sm">
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">Role: <span className="font-normal text-gray-700 dark:text-gray-300">{user?.role.toUpperCase()}</span></h2>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full mt-3">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Name</Label>
                  <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Profile Photo</Label>
                  <Input onChange={onChangeHandler} type="file" accept="image/*" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button disabled={updateUserIsLoading} onClick={updateUserHandler}>
                  {updateUserIsLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</> : "Save Changes"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {/* <div className="p-6 border-t border-gray-300 dark:border-gray-700">
        <h1 className="font-semibold text-xl mb-4">Courses You're Enrolled In</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {user?.enrolledCourses.length === 0 ? (
            <p className="text-gray-500">You haven't enrolled in any courses yet.</p>
          ) : (
            user?.enrolledCourses.map((course) => <Course course={course} key={course._id} />)
          )}
        </div>
      </div> */}
    </div>
  );
};

export default Profile;
