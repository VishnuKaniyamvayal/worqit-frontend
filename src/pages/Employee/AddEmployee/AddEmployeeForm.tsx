import { useState } from "react";
import { Steps, notification, Spin } from "antd";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { basicInfoSchema, contactInfoSchema, jobDetailsSchema, type BasicInfoFormValues, type ContactInfoFormValues, type JobDetailsFormValues } from "../../../schemas/AddEmployee";
import { StepBasicInfo } from "./steps/StepBasicInfo";
import { StepJobDetails } from "./steps/StepJobDetails";
import { StepContactInfo } from "./steps/StepContactInfo";
import { useADMaster, useBranches, useDesignations, useIdentityMaster, useRoles } from "./hooks/fetchHooks";
import { createDynamicADSchema, createDynamicIdentitySchema } from "../../../utils/createDynamicSchema";
import { IdentityDetailsStep, type identityDetailsMaster } from "./steps/IdentityDetailsStep";
import { ADDetailsStep, type adDetailsMaster } from "./steps/ADDetailsStep";
import axiosInstance from "../../../axios/axios";

const { Step } = Steps;

export default function AddEmployeeForm() {
  const [current, setCurrent] = useState(0);
  const [identityData, setIdentityData] = useState([]);
  const [api, contextHolder] = notification.useNotification();

  const rolesQuery = useRoles();
  const branchesQuery = useBranches();
  const designationsQuery = useDesignations();
  
  // dynaimc fields
  const identityFieldsQuery = useIdentityMaster();
  const identityFields = identityFieldsQuery.data || []

  // dynaimc fields
  const ADFieldsQuery = useADMaster();
  const ADFields = ADFieldsQuery.data || []

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
  // Identity Details
  const identitySchema = createDynamicIdentitySchema(identityFields as identityDetailsMaster[]);
  const identityMethods = useForm({
  resolver: zodResolver(identitySchema),
  mode: "onChange",
  });

  // Additional Details
  const ADSchema = createDynamicADSchema(ADFields as adDetailsMaster[]);
  const ADMethods = useForm({
  resolver: zodResolver(ADSchema),
  mode: "onChange",
  });


  // Mutation: replace the async function with your real API call
  const mutation = useMutation({
  mutationFn: async (payload: any) => {
    await axiosInstance.post("/admin/create-user",payload)
    return { success: true };
  },
  onSuccess: () => {
    api.success({ message: "User created successfully", placement:"topRight" });
    // reset all forms
    basicMethods.reset();
    jobMethods.reset();
    contactMethods.reset();
    identityMethods.reset();
    ADMethods.reset();
    setCurrent(0);
  },
  onError: () => {
    api.error({ message: "Failed to create user", placement:"topRight" });
  }
});

const steps = [
  {
    title: "Basic Info",
  },
  {
    title: "Job Info",
  },
  {
    title: "Contact Info"
  },
  { 
    title: "Identity Info",
  },
  { 
    title: "Additional Info", 
  },
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

  const onNextContact = (
    // data
  ) =>{
    setCurrent(3)
  }

  const onNextIdentity = (data:any)=>{
    setIdentityData(data);
    setCurrent(4)
  }

  const onSubmitAD = (data: any) => {
  const basic = basicMethods.getValues();
  const job = jobMethods.getValues();
  const contact = contactMethods.getValues();
  const additional = data;

  const finalPayload = {
    basicDetails: {
      ...basic,
      dob: basic.dob ? new Date(basic.dob).toISOString() : null,
      dateOfJoining: basic.dateOfJoining ? new Date(basic.dateOfJoining).toISOString() : null,
      password: "123456789",
      weekOff: job.weekOff
    },
    contactInfo: contact,
    identityDetails: identityData, // <-- use formatted identity array
    additionalDetails: additional,
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
      {contextHolder}
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
            <StepContactInfo methods={contactMethods} onNext={onNextContact} onBack={() => setCurrent(1)} />
          </FormProvider>
        )}

        {current === 3 && (
          <FormProvider {...identityMethods}>
            <IdentityDetailsStep identityFields={identityFields}  methods={identityMethods} onNext={onNextIdentity} onBack={() => setCurrent(2)} />
          </FormProvider>
        )}
        {current === 4 && (
          <FormProvider {...ADMethods}>
            <ADDetailsStep adFields={ADFields}  methods={ADMethods} onNext={onSubmitAD} onBack={() => setCurrent(2)} />
          </FormProvider>
        )}
      </div>
    </div>
  );
}
