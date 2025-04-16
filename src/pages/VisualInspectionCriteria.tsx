
import React from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

// Mock data for demonstration
const initialData = [
  { id: 1, visualInspection: 'Good', description: 'Condition is good', color: '#4CAF50', score: 5 },
  { id: 2, visualInspection: 'Fair', description: 'Condition is acceptable', color: '#FFC107', score: 3 },
  { id: 3, visualInspection: 'Poor', description: 'Condition needs attention', color: '#F44336', score: 1 },
];

const VisualInspectionCriteriaPage = () => {
  const [criteria, setCriteria] = React.useState(initialData);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [currentCriterion, setCurrentCriterion] = React.useState<{
    id: number | null;
    visualInspection: string;
    description: string;
    color: string;
    score: number;
  }>({
    id: null,
    visualInspection: '',
    description: '',
    color: '#4CAF50',
    score: 0,
  });
  const [deleteId, setDeleteId] = React.useState<number | null>(null);

  // Open create modal
  const handleOpenCreateModal = () => {
    setCurrentCriterion({ id: null, visualInspection: '', description: '', color: '#4CAF50', score: 0 });
    setIsModalOpen(true);
  };

  // Open edit modal
  const handleOpenEditModal = (criterion: {
    id: number;
    visualInspection: string;
    description: string;
    color: string;
    score: number;
  }) => {
    setCurrentCriterion(criterion);
    setIsModalOpen(true);
  };

  // Open delete confirmation
  const handleOpenDeleteDialog = (id: number) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!currentCriterion.visualInspection || !currentCriterion.description || isNaN(currentCriterion.score)) {
      // Simple validation
      return;
    }

    if (currentCriterion.id === null) {
      // Create new criterion
      const newCriterion = {
        id: criteria.length > 0 ? Math.max(...criteria.map(c => c.id)) + 1 : 1,
        visualInspection: currentCriterion.visualInspection,
        description: currentCriterion.description,
        color: currentCriterion.color,
        score: currentCriterion.score,
      };
      setCriteria([...criteria, newCriterion]);
    } else {
      // Update existing criterion
      setCriteria(criteria.map(criterion => 
        criterion.id === currentCriterion.id ? { ...currentCriterion } : criterion
      ));
    }
    
    setIsModalOpen(false);
  };

  // Handle delete confirmation
  const handleDelete = () => {
    if (deleteId !== null) {
      setCriteria(criteria.filter(criterion => criterion.id !== deleteId));
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">เกณฑ์ Visual Inspection</h1>
          <Button 
            onClick={handleOpenCreateModal} 
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="mr-1 h-4 w-4" />
            สร้างรายการใหม่
          </Button>
        </div>

        <div className="rounded-md border bg-white">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-16 text-center">ID</TableHead>
                <TableHead>Visual Inspection</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Color</TableHead>
                <TableHead>Score</TableHead>
                <TableHead className="w-24 text-center">จัดการ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {criteria.map((criterion, index) => (
                <TableRow key={criterion.id} className={index % 2 === 0 ? '' : 'bg-muted/20'}>
                  <TableCell className="text-center font-medium">{criterion.id}</TableCell>
                  <TableCell>{criterion.visualInspection}</TableCell>
                  <TableCell>{criterion.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div 
                        className="w-6 h-6 rounded mr-2" 
                        style={{ backgroundColor: criterion.color }} 
                      />
                      {criterion.color}
                    </div>
                  </TableCell>
                  <TableCell>{criterion.score}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleOpenEditModal(criterion)}
                      >
                        <Pencil size={16} className="text-blue-600" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleOpenDeleteDialog(criterion.id)}
                      >
                        <Trash2 size={16} className="text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Create/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {currentCriterion.id === null ? 'สร้างรายการใหม่' : 'แก้ไขรายการ'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="visualInspection">Visual Inspection</Label>
              <Input
                id="visualInspection"
                value={currentCriterion.visualInspection}
                onChange={(e) => setCurrentCriterion({...currentCriterion, visualInspection: e.target.value})}
                placeholder="กรอกชื่อเกณฑ์การตรวจสอบ"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={currentCriterion.description}
                onChange={(e) => setCurrentCriterion({...currentCriterion, description: e.target.value})}
                placeholder="กรอกรายละเอียด"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="color"
                  value={currentCriterion.color}
                  onChange={(e) => setCurrentCriterion({...currentCriterion, color: e.target.value})}
                  placeholder="#000000"
                />
                <input
                  type="color"
                  value={currentCriterion.color}
                  onChange={(e) => setCurrentCriterion({...currentCriterion, color: e.target.value})}
                  className="h-10 w-10 rounded-md border cursor-pointer"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="score">Score</Label>
              <Input
                id="score"
                type="number"
                value={currentCriterion.score.toString()}
                onChange={(e) => setCurrentCriterion({
                  ...currentCriterion, 
                  score: e.target.value ? parseInt(e.target.value, 10) : 0
                })}
                placeholder="กรอกคะแนน"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit}>บันทึกข้อมูล</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ยืนยันการลบรายการ</AlertDialogTitle>
            <AlertDialogDescription>
              คุณต้องการลบรายการนี้ใช่หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              ลบ
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default VisualInspectionCriteriaPage;
