import GetHeaders from "@/utils/GetHeaders";
import axiosInstance from "@/utils/axiosInterceptor";
import axios from "axios";

// /api/promotions/65f314993331cabe697a318f

export const APIPromotion = async (storeId: string) => {
  const headers = GetHeaders();
  let config = {} as any;
  if (headers.Authorization && headers.Authorization !== "Bearer undefined") {
    config.headers = headers;
  }

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/promotions/${storeId}`,
    config
  );
  return res;
};

// /api/promotions/65f5edefff37ad301b196cdd/voucher
export const APISaveVoucher = async (voucherId: string) => {
  const headers = GetHeaders();
  const res = await axiosInstance.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/promotions/${voucherId}/voucher`,
    {},
    { headers }
  );
  return res;
};

// /api/promotions/user
export const APIUserPromotion = async (storeIds: string[]) => {
  const headers = GetHeaders();
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/promotions/user`,
    storeIds,
    { headers }
  );
  return res;
};
