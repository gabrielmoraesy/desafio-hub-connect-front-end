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

export function ConfirmDialog({
  open,
  setOpen,
  onConfirm,
  onCancel,
  title,
  titleClass,
  description,
  loading,
}: ConfirmDialogProps) {
  useChangePopStateEvent({
    onReturn: () => setOpen && setOpen(false),
    type: "modal",
  });

  if (!open) return null;

  return (
    <DialogRoot open={open}>
      <DialogContent portalled backdrop>
        <DialogHeader>
          {title && <Text className={titleClass} fontWeight="bold" fontSize="lg">{title}</Text>}
        </DialogHeader>
        <DialogBody>
          {description && <Text>{description}</Text>}
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
          >
            {loading ? <Spinner size="sm" /> : "Confirmar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
