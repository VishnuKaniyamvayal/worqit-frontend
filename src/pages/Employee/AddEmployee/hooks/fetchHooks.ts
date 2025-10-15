import { useQuery } from "@tanstack/react-query";

const fetchRoles = async () => {
  // Replace with real API call
  // const res = await fetch('/api/roles');
  // return res.json();
  await new Promise((r) => setTimeout(r, 300));
  return [
    { id: 1, name: "Admin" },
    { id: 2, name: "HR" },
    { id: 3, name: "Recruiter" },
    { id: 4, name: "Employee" },
  ];
};

const fetchBranches = async () => {
  // Replace with real API call
  // const res = await fetch('/api/branches');
  // return res.json();
  await new Promise((r) => setTimeout(r, 300));
  return [
    { id: 1, name: "Chennai Branch" },
    { id: 2, name: "Bangalore Branch" },
  ];
};

const fetchDesignations = async () => {
  // Replace with real API call
  // const res = await fetch('/api/designations');
  // return res.json();
  await new Promise((r) => setTimeout(r, 300));
  return [
    { id: 1, name: "Software Engineer" },
    { id: 2, name: "Senior Engineer" },
    { id: 3, name: "HR Manager" },
  ];
};

export const useRoles = () => {
  return useQuery({ queryKey: ["roles"], queryFn: fetchRoles, staleTime: 1000 * 60 * 5,});
};

export const useBranches = () => {
  return useQuery({queryKey: ["branches"], queryFn: fetchBranches, staleTime: 1000 * 60 * 5 });
};

export const useDesignations = () => {
  return useQuery({queryKey:["designations"], queryFn:fetchDesignations,  staleTime: 1000 * 60 * 5 });
};
