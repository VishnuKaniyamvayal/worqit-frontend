import z from "zod";

export const basicInfoSchema = z.object({
  employeeId: z
    .number({ error: (iss) => iss.input === undefined ? "Employee ID is required" : "Invalid employee ID" })
    .int("Employee ID must be a whole number")
    .positive("Employee ID must be a positive number"),
  
  email: z
    .string({ error: (iss) => iss.input === undefined ? "Email is required" : "Invalid email" })
    .email("Please enter a valid email address"),
  
  roleId: z
    .number({ error: (iss) => iss.input === undefined ? "Role is required" : "Invalid role" })
    .int("Invalid role selection"),
  
  employeeName: z
    .string({ error: (iss) => iss.input === undefined ? "Employee name is required" : "Invalid employee name" })
    .min(1, "Employee name cannot be empty")
    .max(35, "Employee name must not exceed 35 characters"),
  
  profileImage: z
    .string()
    .max(255, "Profile image URL is too long")
    .optional(),
  
  bloodGroup: z
    .string({ error: (iss) => iss.input === undefined ? "Blood group is required" : "Invalid blood group" })
    .max(10, "Blood group must not exceed 10 characters"),
  
  dob: z
    .date({ error: (iss) => iss.input === undefined ? "Date of birth is required" : "Invalid date" }),
  
  dateOfJoining: z
    .date({ error: (iss) => iss.input === undefined ? "Date of joining is required" : "Invalid date" }),
  
  branchId: z
    .number({ error: (iss) => iss.input === undefined ? "Branch is required" : "Invalid branch" })
    .int("Invalid branch selection"),
  
  designationId: z
    .number({ error: (iss) => iss.input === undefined ? "Designation is required" : "Invalid designation" })
    .int("Invalid designation selection"),
  
  timezone: z
    .string({ error: (iss) => iss.input === undefined ? "Timezone is required" : "Invalid timezone" }),
});

export const jobDetailsSchema = z.object({
  weekOff: z
    .array(z.string())
    .min(1, "Please select at least one week off day")
    .max(2, "You can select a maximum of 2 week off days"),
});

export const contactInfoSchema = z.object({
  mobileNumber: z
    .string({ error: (iss) => iss.input === undefined ? "Mobile number is required" : "Invalid mobile number" })
    .min(10, "Mobile number must be at least 10 digits")
    .max(20, "Mobile number must not exceed 20 digits")
    .regex(/^[0-9+\-\s()]+$/, "Mobile number can only contain digits, +, -, spaces, and parentheses"),
  
  houseNumber: z
    .string({ error: (iss) => iss.input === undefined ? "House number is required" : "Invalid house number" })
    .min(1, "House number cannot be empty")
    .max(100, "House number must not exceed 100 characters"),
  
  streetName: z
    .string({ error: (iss) => iss.input === undefined ? "Street name is required" : "Invalid street name" })
    .min(1, "Street name cannot be empty")
    .max(255, "Street name must not exceed 255 characters"),
  
  landmark: z
    .string()
    .max(255, "Landmark must not exceed 255 characters")
    .optional(),
  
  district: z
    .string({ error: (iss) => iss.input === undefined ? "District is required" : "Invalid district" })
    .min(1, "District cannot be empty")
    .max(255, "District must not exceed 255 characters"),
  
  state: z
    .string({ error: (iss) => iss.input === undefined ? "State is required" : "Invalid state" })
    .min(1, "State cannot be empty")
    .max(255, "State must not exceed 255 characters"),
  
  country: z
    .string({ error: (iss) => iss.input === undefined ? "Country is required" : "Invalid country" })
    .min(1, "Country cannot be empty")
    .max(255, "Country must not exceed 255 characters"),
  
  pincode: z
    .string({ error: (iss) => iss.input === undefined ? "Pincode is required" : "Invalid pincode" })
    .min(1, "Pincode cannot be empty")
    .max(20, "Pincode must not exceed 20 characters")
    .regex(/^[0-9A-Za-z\s-]+$/, "Pincode contains invalid characters"),
  
  emergencyPhone: z
    .string()
    .min(10, "Emergency phone must be at least 10 digits")
    .max(20, "Emergency phone must not exceed 20 digits")
    .regex(/^[0-9+\-\s()]+$/, "Emergency phone can only contain digits, +, -, spaces, and parentheses")
    .optional()
    .or(z.literal("")),
  
  familyDetails: z
    .string()
    .max(5000, "Family details must not exceed 5000 characters")
    .optional()
    .or(z.literal("")),
});

// Types
export type BasicInfoFormValues = z.infer<typeof basicInfoSchema>;
export type JobDetailsFormValues = z.infer<typeof jobDetailsSchema>;
export type ContactInfoFormValues = z.infer<typeof contactInfoSchema>;