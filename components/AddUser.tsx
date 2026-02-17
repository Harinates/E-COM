"use client"

import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {  useForm } from "react-hook-form";

import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod"
import { Form , FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "./ui/button";


const formSchema = z.object({
  fullName:z
    .string()
    .min(2,{message:"Fullname must be at least 2 characters!"})
    .max(50),
  email: z.string().email({message:"Invalid email address!"}),
  phone: z.string().min(10).max(15),
  role: z.enum(["admin", "user"]),
});

const AddUser = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });
  return ( 
  <SheetContent>
    <SheetHeader>
        <SheetTitle className="mb-4">Add User</SheetTitle>
        <SheetDescription asChild>
            <Form {...form}>
                <form className="space-y-8">
                    <FormField control={form.control} name="fullName" render={({field}) =>(
                        <FormItem>
                          <FormLabel>fullName</FormLabel>
                          <FormControl>
                            <Input placeholder="shadcn" {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter user Fullname.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                        )} 
                    />
                    <FormField control={form.control} name="fullName" render={({field}) =>(
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="shadcn" {...field} />
                          </FormControl>
                          <FormDescription>
                            Only admin can see your Email.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                        )} 
                    />
                    <FormField control={form.control} name="fullName" render={({field}) =>(
                        <FormItem>
                          <FormLabel>Phno</FormLabel>
                          <FormControl>
                            <Input placeholder="shadcn" {...field} />
                          </FormControl>
                          <FormDescription>
                            This is your public Phno.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                        )} 
                    />
                    <FormField control={form.control} name="fullName" render={({field}) =>(
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <FormControl>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="user">User</SelectItem>
                                </SelectContent>
                            </Select>
                          </FormControl>
                          <FormDescription>
                            Only verified users can be admin.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                        )} 
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </SheetDescription>
    </SheetHeader>
  </SheetContent>
  );
};

export default AddUser;