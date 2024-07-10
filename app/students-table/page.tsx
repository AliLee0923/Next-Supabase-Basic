"use client";

import { useState, useEffect } from "react";
import supabase from "@/lib/supabase";
import { Student } from "@/types/student";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import StudentDialog from "@/components/students-table/StudentDialog";
import ConfirmDialog from "@/components/students-table/ConfirmDialog";
import SkeletonCard from "@/components/students-table/TableSkeleton";

const StudentsTable = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isConfirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] =
    useState<Partial<Student> | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      const { data, error } = await supabase.from("students").select("*");
      if (error) {
        console.error("Error fetching students:", error);
      } else {
        setStudents(data || []);
      }
      setLoading(false);
    };

    fetchStudents();
  }, []);

  const addStudent = async (student: Omit<Student, "id" | "created_at">) => {
    const { data, error } = await supabase
      .from("students")
      .insert([student])
      .select("*");
    if (error) {
      console.error("Error adding student:", error);
    } else {
      console.log("Inserted data:", data);
      setStudents((prevStudents) => [...prevStudents, ...data]);
    }
  };

  const editStudent = async (id: string, updatedStudent: Partial<Student>) => {
    const { data, error } = await supabase
      .from("students")
      .update(updatedStudent)
      .eq("id", id);
    if (error) {
      console.error("Error editing student:", error);
    } else {
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === id ? { ...student, ...updatedStudent } : student
        )
      );
    }
  };

  const removeStudent = async (id: string) => {
    const { error } = await supabase.from("students").delete().eq("id", id);
    if (error) {
      console.error("Error removing student:", error);
    } else {
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== id)
      );
    }
  };

  const handleAdd = () => {
    setSelectedStudent(null);
    setDialogOpen(true);
  };

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      removeStudent(deleteId);
      setDeleteId(null);
    }
    setConfirmOpen(false);
  };

  return (
    <Card className="bg-white w-full min-w-[850px] overflow-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="space-y-4">
            <CardTitle>Students Table</CardTitle>
            <CardDescription>This is a table of students.</CardDescription>
          </div>
          <Button
            onClick={() => handleAdd()}
            className="bg-blue-500 hover:bg-blue-700"
          >
            Add Student
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <SkeletonCard />
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>First Name</TableHead>
                  <TableHead>Last Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">
                      {student.first_name}
                    </TableCell>
                    <TableCell>{student.last_name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.age}</TableCell>
                    <TableCell className="space-x-4">
                      <Button
                        onClick={() => handleEdit(student)}
                        className="bg-green-500 hover:bg-green-700"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(student.id)}
                        className="bg-red-500 hover:bg-red-700"
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </CardContent>
      <StudentDialog
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={(student, id) => {
          if (id) {
            editStudent(id, student);
          } else {
            addStudent(student);
          }
        }}
        initialData={selectedStudent || undefined}
      />
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this student?"
      />
    </Card>
  );
};

export default StudentsTable;
