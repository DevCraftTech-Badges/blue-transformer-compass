
export interface MainEquipmentWeightItem {
  id: number;
  name: string;
  weight: number;
  category: string;
}

export interface MainEquipmentWeightTableProps {
  items: MainEquipmentWeightItem[];
  onEdit: (item: MainEquipmentWeightItem) => void;
  onDelete: (id: number) => void;
}

export interface MainEquipmentWeightModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (itemData: Omit<MainEquipmentWeightItem, "id">) => void;
  item: MainEquipmentWeightItem | null;
}
