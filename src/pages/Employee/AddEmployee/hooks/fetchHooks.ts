import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../../axios/axios";

const fetchRoles = async () => {
  const res = await axiosInstance.get("/config/get-roles");
  return res.data.data
};

const fetchBranches = async () => {
  const res = await axiosInstance.get("/config/get-branches");
  return res.data.data
};

const fetchDesignations = async () => {
  const res = await axiosInstance.get("/config/get-designations");
  return res.data.data
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
