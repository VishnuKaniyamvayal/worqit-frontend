import { useState } from "react";
import { Steps, notification, Spin } from "antd";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { basicInfoSchema, contactInfoSchema, jobDetailsSchema, type BasicInfoFormValues, type ContactInfoFormValues, type JobDetailsFormValues } from "../../../schemas/AddEmployee";
import { StepBasicInfo } from "./steps/StepBasicInfo";
import { StepJobDetails } from "./steps/StepJobDetails";
import { StepContactInfo } from "./steps/StepContactInfo";
import { useBranches, useDesignations, useRoles } from "./hooks/fetchHooks";

const { Step } = Steps;

// ------------------------- Mocked fetch hooks (React Query) -------------------------
// These hooks use react-query to fetch lists. Replace mocked fetches with real API calls.

// ------------------------- Main Form Wrapper -------------------------

export default function AddEmployeeForm() {
  const [current, setCurrent] = useState(0);

  const rolesQuery = useRoles();
  const branchesQuery = useBranches();
  const designationsQuery = useDesignations();

  const basicMethods = useForm<BasicInfoFormValues>({
    resolver: zodResolver(basicInfoSchema),
    mode: "onChange",
    defaultValues: {
      employeeId: undefined as any,
      email: "",
      roleId: undefined as any,
      employeeName: "",
      profileImage: "",
      bloodGroup: "",
      dob: undefined as any,
      dateOfJoining: undefined as any,
      branchId: undefined as any,
      designationId: undefined as any,
      timezone: "Asia/Kolkata",
    },
  });

  const jobMethods = useForm<JobDetailsFormValues>({
    resolver: zodResolver(jobDetailsSchema),
    mode: "onChange",
    defaultValues: {
      weekOff: [],
    },
  });

  const contactMethods = useForm<ContactInfoFormValues>({
    resolver: zodResolver(contactInfoSchema),
    mode: "onChange",
    defaultValues: {
      mobileNumber: "",
      houseNumber: "",
      streetName: "",
      landmark: "",
      district: "",
      state: "",
      country: "",
      pincode: "",
      emergencyPhone: "",
      familyDetails: "",
    },
  });

  // Mutation: replace the async function with your real API call
  const mutation = useMutation({
  mutationFn: async (payload: any) => {
    // Mock: simulate network delay
    await new Promise((r) => setTimeout(r, 800));
    return { success: true };
  },
  onSuccess: () => {
    notification.success({ message: "User created successfully" });
    // reset all forms
    basicMethods.reset();
    jobMethods.reset();
    contactMethods.reset();
    setCurrent(0);
  },
  onError: () => {
    notification.error({ message: "Failed to create user" });
  }
});

const steps = [
  {
    title: "Basic Information",
    description: "Enter employee identity and work details"
  },
  {
    title: "Contact & Address",
    description: "Provide communication and residence details"
  },
  {
    title: "Review & Confirm",
    description: "Verify everything before submission"
  }
];

  const onNextBasic = (
    // data: BasicInfoFormValues
  ) => {
    setCurrent(1);
  };

  const onNextJob = (
    // data: JobDetailsFormValues
  ) => {
    setCurrent(2);
  };

  const onSubmitContact = (data: ContactInfoFormValues) => {
    // Build final payload
    const basic = basicMethods.getValues();
    const job = jobMethods.getValues();
    const contact = data;

    const finalPayload = {
      basicInfo: {
        ...basic,
        // ensure dates are ISO strings
        dob: basic.dob ? new Date(basic.dob).toISOString() : null,
        dateOfJoining: basic.dateOfJoining ? new Date(basic.dateOfJoining).toISOString() : null,
        password: "123456789", // per requirement
      },
      jobDetails: job,
      contactInfo: contact,
    };

    mutation.mutate(finalPayload);
  };

  // Loading or error handling for select lists
  const loading = rolesQuery.isLoading || branchesQuery.isLoading || designationsQuery.isLoading;

  if (loading) return <Spin />;

  if (rolesQuery.isError || branchesQuery.isError || designationsQuery.isError) {
    return <div>Error loading form options.</div>;
  }

  const roles = rolesQuery.data || [];
  const branches = branchesQuery.data || [];
  const designations = designationsQuery.data || [];

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <Steps current={current} style={{ marginBottom: 24 }}>
        {steps.map((s) => (
          <Step key={s.title} title={s.title} />
        ))}
      </Steps>

      <div style={{ padding: 24, border: "1px solid #f0f0f0", borderRadius: 8, background: "#fff" }}>
        {current === 0 && (
          <FormProvider {...basicMethods}>
            <StepBasicInfo methods={basicMethods} roles={roles} branches={branches} designations={designations} onNext={onNextBasic} />
          </FormProvider>
        )}

        {current === 1 && (
          <FormProvider {...jobMethods}>
            <StepJobDetails methods={jobMethods} onNext={onNextJob} onBack={() => setCurrent(0)} />
          </FormProvider>
        )}

        {current === 2 && (
          <FormProvider {...contactMethods}>
            <StepContactInfo methods={contactMethods} onNext={onSubmitContact} onBack={() => setCurrent(1)} />
          </FormProvider>
        )}
      </div>
    </div>
  );
}

// ------------------------- React Query Provider (Optional wrapper) -------------------------
// You can either wrap your app at a higher level with QueryClientProvider or use this wrapper when testing this file standalone.

export const AddEmployeeFormWithProvider = () => {
  const qc = new QueryClient();
  return (
    <QueryClientProvider client={qc}>
      <AddEmployeeForm />
    </QueryClientProvider>
  );
};
