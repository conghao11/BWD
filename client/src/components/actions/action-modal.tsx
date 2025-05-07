import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ActionForm from "./action-form";

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ActionModal({ isOpen, onClose }: ActionModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-primary">Ghi Nhận Hành Động Xanh</DialogTitle>
        </DialogHeader>
        <ActionForm onSuccess={onClose} />
      </DialogContent>
    </Dialog>
  );
}
