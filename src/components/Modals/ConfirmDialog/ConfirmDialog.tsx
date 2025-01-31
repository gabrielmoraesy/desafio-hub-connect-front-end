import { Button, DialogBody, DialogFooter, DialogHeader, DialogRoot, Spinner, Text } from "@chakra-ui/react";

import { DialogContent } from "@/components/ui/dialog";
import { useChangePopStateEvent } from "@/hooks/useChangePopStateEvent";

interface ConfirmDialogProps {
  open: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
  onCancel?: () => void;
  title?: string;
  titleClass?: string;
  description?: string;
  loading?: boolean;
}

const ConfirmDialog = ({
  open,
  setOpen,
  onConfirm,
  onCancel,
  title,
  titleClass,
  description,
  loading,
}: ConfirmDialogProps) => {
  useChangePopStateEvent({
    onReturn: () => setOpen && setOpen(false),
    type: "modal",
  });

  if (!open) return null;

  return (
    <DialogRoot open={open}>
      <DialogContent
        portalled
        backdrop
        p={4}
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        className="w-[85vw] sm:max-w-[500px]"
      >
        <DialogHeader>
          {title && <Text className={titleClass} fontWeight="bold" fontSize="lg">{title}</Text>}
        </DialogHeader>
        <DialogBody>
          {description && <Text>{description}</Text>}
        </DialogBody>
        <DialogFooter w={"100%"} mt={2}>
          <Button variant="outline" onClick={onCancel} w={"50%"}>
            Cancelar
          </Button>
          <Button
            onClick={onConfirm} w={"50%"} bg={"#009FE3"} color={"#fff"}
          >
            {loading ? <Spinner size="sm" /> : "Confirmar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot >
  );
}

export default ConfirmDialog
