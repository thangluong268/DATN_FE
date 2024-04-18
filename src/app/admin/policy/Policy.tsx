"use client";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
  SpeedDial,
  SpeedDialAction,
  SpeedDialContent,
  SpeedDialHandler,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Textarea,
  Tooltip,
} from "@material-tailwind/react";
import React from "react";
import CardPolicy from "./CardPolicy";
import { APIGetAllPolicy, APIUpdatePolicy } from "@/services/Policy";
import {
  BuildingStorefrontIcon,
  PlusIcon,
  Square3Stack3DIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

interface PolicyProps {
  label: string;
  value: string;
  desc: {
    _id: string;
    name: string;
    content: string;
  }[];
}

function Policy() {
  const [policies, setPolicies] = React.useState<PolicyProps[]>([]);
  const [type, setType] = React.useState("USER");
  const [isFetchData, setIsFetchData] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const dictType: Record<string, string> = {
    user: "Người dùng",
    product: "Sản phẩm",
    store: "Cửa hàng",
  };

  const handleOpen = () => setOpen(!open);
  React.useEffect(() => {
    const fetchData = async () => {
      setIsFetchData(true);
      const res = await APIGetAllPolicy(type);
      setPolicies([
        {
          label: "Người dùng",
          value: "user",
          desc: type == "USER" ? res : [],
        },
        {
          label: "Sản phẩm",
          value: "product",
          desc: type == "PRODUCT" ? res : [],
        },
        {
          label: "Cửa hàng",
          value: "store",
          desc: type == "STORE" ? res : [],
        },
      ]);
      setIsFetchData(false);
    };
    fetchData();
  }, [type]);
  const handleEdit = async (policy: any) => {
    setPolicies((cur) =>
      cur.map((item) => {
        if (item.value == type) {
          return {
            ...item,
            desc: item.desc.map((desc) => {
              if (desc._id == policy._id) {
                return policy;
              }
              return desc;
            }),
          };
        }
        return item;
      })
    );
  };
  return (
    <>
      <Tabs value="user">
        <TabsHeader>
          {policies.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              onClick={(e) => setType(value.toUpperCase())}
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {isFetchData && (
            <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
              <svg
                className="text-gray-300 animate-spin"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
              >
                <path
                  d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                  stroke="currentColor"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                  stroke="currentColor"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="text-gray-900"
                ></path>
              </svg>
            </div>
          )}
          {policies.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              <div className="flex flex-wrap">
                {desc.map((item) => (
                  <CardPolicy
                    data={item}
                    handleEdit={(data) => handleEdit(data)}
                  />
                ))}
              </div>
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
      <div className="absolute bottom-3 right-3">
        <div className="">
          <SpeedDial>
            <SpeedDialHandler>
              <IconButton size="lg" className="rounded-full">
                <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
              </IconButton>
            </SpeedDialHandler>
            <SpeedDialContent>
              <Tooltip content="Người dùng" placement="left">
                <SpeedDialAction onClick={handleOpen}>
                  <UserIcon className="h-5 w-5" />
                </SpeedDialAction>
              </Tooltip>
              <Tooltip content="Sản phẩm" placement="left">
                <SpeedDialAction onClick={handleOpen}>
                  <Square3Stack3DIcon className="h-5 w-5" />
                </SpeedDialAction>
              </Tooltip>
              <Tooltip content="Cửa hàng" placement="left">
                <SpeedDialAction onClick={handleOpen}>
                  <BuildingStorefrontIcon className="h-5 w-5" />
                </SpeedDialAction>
              </Tooltip>
            </SpeedDialContent>
          </SpeedDial>
        </div>
      </div>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Thêm chính sách</DialogHeader>
        <DialogBody>
          <Input
            label="Loại"
            value={"Người dùng"}
            crossOrigin={undefined}
            disabled
          />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default Policy;
