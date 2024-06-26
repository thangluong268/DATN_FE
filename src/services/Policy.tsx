import GetHeaders from "@/utils/GetHeaders";
import axios from "axios";

// /api/policies?type=USER
export const APIGetAllPolicy = async (type: string) => {
  const headers = GetHeaders();
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/policies?type=${type}`,
    { headers }
  );
  return res.data.metadata.data;
};

// api/policies/65ddf631c4500250d92b147e
export const APIUpdatePolicy = async (id: string, content: string) => {
  const headers = GetHeaders();
  const res = await axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/policies/${id}`,
    { content },
    { headers }
  );
  console.log(res);
  return res;
};

// /api/policies
export const APIAddPolicy = async (policy: any) => {
  const headers = GetHeaders();
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/policies`,
    policy,
    { headers }
  );
  return res;
};

// /api/policies/65ddf631c4500250d92b147e
export const APIRemovePolicy = async (id: string) => {
  const headers = GetHeaders();
  const res = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/policies/${id}`,
    { headers }
  );
  console.log("APIRemovePolicy", res);
  return res;
};
