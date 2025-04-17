
import React from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
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
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

// Mock data for demonstration
const initialData = [
  {
    id: 1,
    testGroupName: 'Oil Test',
    minScore: 0,
    maxScore: 25,
    description: 'Poor',
    details: 'Transformer requires immediate maintenance',
    color: '#F44336'
  },
  {
    id: 2,
    testGroupName: 'Electrical Test',
    minScore: 26,
    maxScore: 50,
    description: 'Fair',
    details: 'Transformer needs attention soon',
    color: '#FFC107'
  },
  {
    id: 3,
    testGroupName: 'Visual Inspection',
    minScore: 51,
    maxScore: 75,
    description: 'Good',
    details: 'Transformer is in acceptable condition',
    color: '#4CAF50'
  },
  {
    id: 4,
    testGroupName: 'Combined Tests',
    minScore: 76,
    maxScore: 100,
    description: 'Excellent',
    details: 'Transformer is in optimal condition',
    color: '#2196F3'
  },
];

const ScorePercentageHIPage = () => {
  const [scores, setScores] = React.useState(initialData);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;
  
  const [currentScore, setCurrentScore] = React.useState<{
    id: number | null;
    testGroupName: string;
    minScore: number;
    maxScore: number;
    description: string;
    details: string;
    color: string;
  }>({
    id: null,
    testGroupName: '',
    minScore: 0,
    maxScore: 0,
    description: '',
    details: '',
    color: '#4CAF50'
  });
  
  const [deleteId, setDeleteId] = React.useState<number | null>(null);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = scores.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(scores.length / itemsPerPage);

  // Open create modal
  const handleOpenCreateModal = () => {
    setCurrentScore({
      id: null,
      testGroupName: '',
      minScore: 0,
      maxScore: 0,
      description: '',
      details: '',
      color: '#4CAF50'
    });
    setIsModalOpen(true);
  };

  // Open edit modal
  const handleOpenEditModal = (score: typeof currentScore) => {
    setCurrentScore(score);
    setIsModalOpen(true);
  };

  // Open delete confirmation
  const handleOpenDeleteDialog = (id: number) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  // Handle form submission
  const handleSubmit = () => {
    // Basic validation
    if (
      !currentScore.testGroupName || 
      isNaN(currentScore.minScore) || 
      isNaN(currentScore.maxScore) || 
      !currentScore.description || 
      !currentScore.color
    ) {
      return;
    }

    if (currentScore.id === null) {
      // Create new score
      const newScore = {
        id: scores.length > 0 ? Math.max(...scores.map(s => s.id)) + 1 : 1,
        testGroupName: currentScore.testGroupName,
        minScore: currentScore.minScore,
        maxScore: currentScore.maxScore,
        description: currentScore.description,
        details: currentScore.details,
        color: currentScore.color
      };
      setScores([...scores, newScore]);
    } else {
      // Update existing score
      setScores(scores.map(score => 
        score.id === currentScore.id ? { ...currentScore } : score
      ));
    }
    
    setIsModalOpen(false);
  };

  // Handle delete confirmation
  const handleDelete = () => {
    if (deleteId !== null) {
      setScores(scores.filter(score => score.id !== deleteId));
      setIsDeleteDialogOpen(false);
    }
  };

  // Change page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">การจัดการ - คะแนน %HI</h1>
          <Button 
            onClick={handleOpenCreateModal} 
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="mr-1 h-4 w-4" />
            สร้างรายการใหม่
          </Button>
        </div>

        <div className="rounded-md border bg-white overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-16 text-center">ID</TableHead>
                <TableHead>ชื่อกลุ่มการทดสอบ</TableHead>
                <TableHead>ชื่อคะแนนต่ำสุด</TableHead>
                <TableHead>ชื่อคะแนนสูงสุด</TableHead>
                <TableHead>คำอธิบาย</TableHead>
                <TableHead>รายละเอียด</TableHead>
                <TableHead>สี</TableHead>
                <TableHead className="w-24 text-center">จัดการ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((score, index) => (
                <TableRow key={score.id} className={index % 2 === 0 ? '' : 'bg-muted/20'}>
                  <TableCell className="text-center font-medium">{score.id}</TableCell>
                  <TableCell>{score.testGroupName}</TableCell>
                  <TableCell>{score.minScore}</TableCell>
                  <TableCell>{score.maxScore}</TableCell>
                  <TableCell>{score.description}</TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate" title={score.details}>
                      {score.details}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div 
                        className="w-6 h-6 rounded mr-2" 
                        style={{ backgroundColor: score.color }} 
                      />
                      {score.color}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleOpenEditModal(score)}
                      >
                        <Pencil size={16} className="text-blue-600" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleOpenDeleteDialog(score.id)}
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

        {/* Pagination */}
        {scores.length > itemsPerPage && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className="cursor-pointer"
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }).map((_, index) => {
                const page = index + 1;
                // Show first page, last page, and pages around current page
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={page === currentPage}
                        onClick={() => handlePageChange(page)}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                } else if (
                  page === currentPage - 2 ||
                  page === currentPage + 2
                ) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                return null;
              })}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  className="cursor-pointer"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>

      {/* Create/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {currentScore.id === null ? 'สร้างรายการใหม่' : 'แก้ไขรายการ'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="testGroupName">ชื่อกลุ่มการทดสอบ</Label>
              <Input
                id="testGroupName"
                value={currentScore.testGroupName}
                onChange={(e) => setCurrentScore({...currentScore, testGroupName: e.target.value})}
                placeholder="กรอกชื่อกลุ่มการทดสอบ"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minScore">ชื่อคะแนนต่ำสุด</Label>
                <Input
                  id="minScore"
                  type="number"
                  value={currentScore.minScore.toString()}
                  onChange={(e) => setCurrentScore({
                    ...currentScore, 
                    minScore: e.target.value ? parseInt(e.target.value, 10) : 0
                  })}
                  placeholder="กรอกคะแนนต่ำสุด"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxScore">ชื่อคะแนนสูงสุด</Label>
                <Input
                  id="maxScore"
                  type="number"
                  value={currentScore.maxScore.toString()}
                  onChange={(e) => setCurrentScore({
                    ...currentScore, 
                    maxScore: e.target.value ? parseInt(e.target.value, 10) : 0
                  })}
                  placeholder="กรอกคะแนนสูงสุด"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">คำอธิบาย</Label>
              <Input
                id="description"
                value={currentScore.description}
                onChange={(e) => setCurrentScore({...currentScore, description: e.target.value})}
                placeholder="กรอกคำอธิบาย"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="details">รายละเอียด</Label>
              <Textarea
                id="details"
                value={currentScore.details}
                onChange={(e) => setCurrentScore({...currentScore, details: e.target.value})}
                placeholder="กรอกรายละเอียดเพิ่มเติม"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="color">สี</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="color"
                  value={currentScore.color}
                  onChange={(e) => setCurrentScore({...currentScore, color: e.target.value})}
                  placeholder="#000000"
                  className="flex-1"
                />
                <input
                  type="color"
                  value={currentScore.color}
                  onChange={(e) => setCurrentScore({...currentScore, color: e.target.value})}
                  className="h-10 w-10 rounded-md border cursor-pointer"
                />
              </div>
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

export default ScorePercentageHIPage;
