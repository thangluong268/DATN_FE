import React from "react";
import {
  Collapse,
  Button,
  Card,
  Typography,
  CardBody,
  DialogHeader,
  DialogBody,
  Dialog,
  DialogFooter,
  Tooltip,
  Textarea,
} from "@material-tailwind/react";
import { APIUpdatePolicy } from "@/services/Policy";
import Toast from "@/utils/Toast";

interface CardPolicyProps {
  data: {
    _id: string;
    name: string;
    content: string;
  };
  handleEdit: (policy: any) => void;
}

function CardPolicy(props: CardPolicyProps) {
  const { data, handleEdit } = props;
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const toggleOpen = () => setOpen((cur) => !cur);
  const handleOpen = () => setOpenDialog((cur) => !cur);
  const [content, setContent] = React.useState<string[]>([]);
  const [valueChange, setValueChange] = React.useState<any>();
  React.useEffect(() => {
    setContent(data.content.split("\n"));
    setValueChange(data);
  }, [data._id]);
  const Edit = async () => {
    const res = await APIUpdatePolicy(valueChange._id, valueChange.content);
    handleOpen();
    if (res.status == 200 || res.status == 201) {
      Toast("success", res.data.message, 2000);
      setValueChange({
        ...valueChange,
        content: res.data.metadata.data.content,
      });
      setContent(res.data.metadata.data.content.split("\n"));
      handleEdit({
        _id: res.data.metadata.data._id,
        name: res.data.metadata.data.name,
        content: res.data.metadata.data.content,
      });
    } else {
      Toast("error", res.data.message, 2000);
    }
  };
  return (
    <div className="w-1/3 py-2 pr-3">
      <Tooltip
        placement="top"
        content={data.name}
        className="bg-white text-black"
      >
        <Button className={`w-full truncate ...`} onClick={toggleOpen}>
          {data.name}
        </Button>
      </Tooltip>
      <Collapse open={open}>
        <Card className="my-4">
          <CardBody className="">
            {content.map((item, index) =>
              item ? <Typography key={index}>{item}</Typography> : <br />
            )}
            <div className="flex">
              <Button
                color="yellow"
                className="w-2/3 mt-2 mr-2"
                onClick={handleOpen}
              >
                Chỉnh sửa
              </Button>
              <Button
                color="red"
                className="w-2/3 mt-2 ml-2"
                onClick={handleOpen}
              >
                Xoá
              </Button>
            </div>
          </CardBody>
        </Card>
      </Collapse>
      <Dialog open={openDialog} handler={handleOpen} size="lg">
        <DialogHeader>{valueChange?.name}</DialogHeader>
        <DialogBody>
          <Textarea
            variant="standard"
            label=""
            className="w-full min-h-[20rem]"
            value={valueChange?.content}
            onChange={(e) => {
              setValueChange({
                ...valueChange,
                content: e.target.value,
              });
            }}
          />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Đóng</span>
          </Button>
          <Button variant="gradient" color="yellow" onClick={(e) => Edit()}>
            <span>Chỉnh sửa</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default CardPolicy;
