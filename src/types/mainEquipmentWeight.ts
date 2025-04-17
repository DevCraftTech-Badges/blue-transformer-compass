
export interface MainEquipmentWeightItem {
  id: number;
  name: string;
  category: string;
  weight: number;
  activePart: number;
  bushing: number;
  arrester: number;
  oil: number;
  oltc: number;
}

export interface MainEquipmentWeightModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (itemData: Omit<MainEquipmentWeightItem, "id">) => void;
  item?: MainEquipmentWeightItem;
}
