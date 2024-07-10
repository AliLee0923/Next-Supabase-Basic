import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Student } from "@/types/student";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface StudentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (student: Omit<Student, "id" | "created_at">, id?: string) => void;
  initialData?: Partial<Student>;
}

const StudentDialog: React.FC<StudentDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [student, setStudent] = useState<Omit<Student, "id" | "created_at">>({
    first_name: "",
    last_name: "",
    email: "",
    age: 0,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialData) {
      setStudent({
        first_name: initialData.first_name || "",
        last_name: initialData.last_name || "",
        email: initialData.email || "",
        age: initialData.age || 0,
      });
    } else {
      setStudent({ first_name: "", last_name: "", email: "", age: 0 });
    }
  }, [initialData]);

  const validate = () => {
    const errors: { [key: string]: string } = {};
    const namePattern = /^[A-Za-z]+$/;
    if (!student.first_name.trim()) {
      errors.first_name = "First name is required";
    } else if (!namePattern.test(student.first_name)) {
      errors.first_name = "First name can only contain letters";
    }
    if (!student.last_name.trim()) {
      errors.last_name = "Last name is required";
    } else if (!namePattern.test(student.last_name)) {
      errors.last_name = "Last name can only contain letters";
    }
    if (!student.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(student.email)) {
      errors.email = "Email is invalid";
    }
    if (student.age <= 0) errors.age = "Age must be greater than zero";
    return errors;
  };

  const handleSave = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      onSave(student, initialData?.id);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Student" : "Add Student"}
          </DialogTitle>
          <DialogDescription>Fill in the details below</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Input
              placeholder="First Name"
              value={student.first_name}
              onChange={(e) =>
                setStudent({ ...student, first_name: e.target.value })
              }
            />
            {errors.first_name && (
              <p className="text-red-500">{errors.first_name}</p>
            )}
          </div>
          <div>
            <Input
              placeholder="Last Name"
              value={student.last_name}
              onChange={(e) =>
                setStudent({ ...student, last_name: e.target.value })
              }
            />
            {errors.last_name && (
              <p className="text-red-500">{errors.last_name}</p>
            )}
          </div>
          <div>
            <Input
              placeholder="Email"
              value={student.email}
              onChange={(e) =>
                setStudent({ ...student, email: e.target.value })
              }
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div>
            <Input
              placeholder="Age"
              type="number"
              value={student.age}
              onChange={(e) =>
                setStudent({ ...student, age: parseInt(e.target.value, 10) })
              }
            />
            {errors.age && <p className="text-red-500">{errors.age}</p>}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose} className="bg-blue-500 hover:bg-blue-700">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-700"
          >
            {initialData ? "Save" : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StudentDialog;
