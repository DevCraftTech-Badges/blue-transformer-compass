
import React from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock data for demonstration
const initialData = [
  { id: 1, testType: 'Main Tank', condition: 'ตรวจสอบการรั่วซึมของน้ำมัน' },
  { id: 2, testType: 'Bushing', condition: 'ตรวจสอบรอยร้าวบน Porcelain' },
  { id: 3, testType: 'Radiator and Cooling System', condition: 'ตรวจสอบพัดลมระบายความร้อน' },
];

const testTypeOptions = [
  'Conservator Tank',
  'General Condition',
  'Hot Line Oil Filter',
  'Lightning Arrester',
  'Main Tank',
  'NGR',
  'OLTC Compartment',
  'OLTC Control Cabinet',
  'Radiator and Cooling System',
  'Transformer Control Cabinet',
  'Bushing',
  'Regulating PT'
];

const VisualInspectionTopicsPage = () => {
  const [topics, setTopics] = React.useState(initialData);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [currentTopic, setCurrentTopic] = React.useState<{ id: number | null; testType: string; condition: string }>({
    id: null,
    testType: '',
    condition: '',
  });
  const [deleteId, setDeleteId] = React.useState<number | null>(null);

  // Open create modal
  const handleOpenCreateModal = () => {
    setCurrentTopic({ id: null, testType: '', condition: '' });
    setIsModalOpen(true);
  };

  // Open edit modal
  const handleOpenEditModal = (topic: { id: number; testType: string; condition: string }) => {
    setCurrentTopic(topic);
    setIsModalOpen(true);
  };

  // Open delete confirmation
  const handleOpenDeleteDialog = (id: number) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!currentTopic.testType || !currentTopic.condition) {
      // Simple validation
      return;
    }

    if (currentTopic.id === null) {
      // Create new topic
      const newTopic = {
        id: topics.length > 0 ? Math.max(...topics.map(t => t.id)) + 1 : 1,
        testType: currentTopic.testType,
        condition: currentTopic.condition,
      };
      setTopics([...topics, newTopic]);
    } else {
      // Update existing topic
      setTopics(topics.map(topic => 
        topic.id === currentTopic.id ? { ...currentTopic } : topic
      ));
    }
    
    setIsModalOpen(false);
  };

  // Handle delete confirmation
  const handleDelete = () => {
    if (deleteId !== null) {
      setTopics(topics.filter(topic => topic.id !== deleteId));
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">หัวข้อ Visual Inspection</h1>
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
                <TableHead>Name</TableHead>
                <TableHead className="w-24 text-center">จัดการ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topics.map((topic, index) => (
                <TableRow key={topic.id} className={index % 2 === 0 ? '' : 'bg-muted/20'}>
                  <TableCell className="text-center font-medium">{topic.id}</TableCell>
                  <TableCell>{topic.condition}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleOpenEditModal(topic)}
                      >
                        <Pencil size={16} className="text-blue-600" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleOpenDeleteDialog(topic.id)}
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
              {currentTopic.id === null ? 'สร้างรายการใหม่' : 'แก้ไขรายการ'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="testType">รูปแบบการทดสอบ</Label>
              <Select 
                value={currentTopic.testType} 
                onValueChange={(value) => setCurrentTopic({...currentTopic, testType: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="เลือกรูปแบบการทดสอบ" />
                </SelectTrigger>
                <SelectContent>
                  {testTypeOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="condition">ชื่อเงื่อนไขการทดสอบ</Label>
              <Textarea
                id="condition"
                value={currentTopic.condition}
                onChange={(e) => setCurrentTopic({...currentTopic, condition: e.target.value})}
                rows={3}
                placeholder="กรอกเงื่อนไขการทดสอบ"
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

export default VisualInspectionTopicsPage;
