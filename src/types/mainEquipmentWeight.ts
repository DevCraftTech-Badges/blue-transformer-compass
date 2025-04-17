
export interface MainEquipmentWeightItem {
  id: number;
  activePart: number;
  bushing: number;
  arrester: number;
  oil: number;
  oltc: number;
}

export interface MainEquipmentWeightTableProps {
  items: MainEquipmentWeightItem[];
  onEdit: (item: MainEquipmentWeightItem) => void;
  onDelete: (id: number) => void;
}

export interface MainEquipmentWeightModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (itemData: Omit<MainEquipmentWeightItem, "id">) => void;
  initialData?: MainEquipmentWeightItem;
  isEditing: boolean;
}
