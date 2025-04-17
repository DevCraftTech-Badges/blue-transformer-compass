
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MainEquipmentWeightItem, MainEquipmentWeightTableProps } from "@/types/mainEquipmentWeight";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";

const MainEquipmentWeightTable: React.FC<MainEquipmentWeightTableProps> = ({ items, onEdit, onDelete }) => {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>Active Part</TableHead>
            <TableHead>Bushing</TableHead>
            <TableHead>Arrester</TableHead>
            <TableHead>Oil</TableHead>
            <TableHead>OLTC</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4">
                ไม่พบข้อมูล
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.activePart}%</TableCell>
                <TableCell>{item.bushing}%</TableCell>
                <TableCell>{item.arrester}%</TableCell>
                <TableCell>{item.oil}%</TableCell>
                <TableCell>{item.oltc}%</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => onEdit(item)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700" onClick={() => onDelete(item.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default MainEquipmentWeightTable;
