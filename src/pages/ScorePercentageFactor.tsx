
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { Edit, Trash2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

// Define the form schema
const formSchema = z.object({
  group: z.string().min(1, { message: 'Group is required' }),
  name: z.string().min(1, { message: 'Name is required' }),
  hiFactor: z.coerce.number().min(0, { message: 'HI Factor must be a positive number' }),
  meaning: z.string().min(1, { message: 'Meaning is required' }),
  lowerBound: z.coerce.number(),
  upperBound: z.coerce.number(),
  color: z.string().min(1, { message: 'Color is required' })
});

// Define the data type
interface FactorData {
  id: number;
  group: string;
  name: string;
  hiFactor: number;
  meaning: string;
  lowerBound: number;
  upperBound: number;
  color: string;
}

// Sample data
const initialData: FactorData[] = [
  { 
    id: 1, 
    group: 'Overall Condition', 
    name: 'Excellent', 
    hiFactor: 90, 
    meaning: 'Equipment in excellent condition', 
    lowerBound: 90, 
    upperBound: 100, 
    color: '#34D399' 
  },
  { 
    id: 2, 
    group: 'Overall Condition', 
    name: 'Good', 
    hiFactor: 75, 
    meaning: 'Equipment in good condition', 
    lowerBound: 70, 
    upperBound: 89, 
    color: '#60A5FA' 
  },
  { 
    id: 3, 
    group: 'Overall Condition', 
    name: 'Fair', 
    hiFactor: 50, 
    meaning: 'Equipment shows some wear', 
    lowerBound: 50, 
    upperBound: 69, 
    color: '#FBBF24' 
  },
  { 
    id: 4, 
    group: 'Overall Condition', 
    name: 'Poor', 
    hiFactor: 25, 
    meaning: 'Equipment needs attention', 
    lowerBound: 30, 
    upperBound: 49, 
    color: '#F87171' 
  },
  { 
    id: 5, 
    group: 'Overall Condition', 
    name: 'Critical', 
    hiFactor: 10, 
    meaning: 'Equipment in critical condition', 
    lowerBound: 0, 
    upperBound: 29, 
    color: '#EF4444' 
  }
];

const ScorePercentageFactor = () => {
  // State management
  const [data, setData] = useState<FactorData[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Form setup with react-hook-form and zod validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      group: '',
      name: '',
      hiFactor: 0,
      meaning: '',
      lowerBound: 0,
      upperBound: 100,
      color: '#6E59A5' // Default color
    }
  });

  // Event handlers
  const openCreateModal = () => {
    form.reset({
      group: '',
      name: '',
      hiFactor: 0,
      meaning: '',
      lowerBound: 0,
      upperBound: 100,
      color: '#6E59A5'
    });
    setCurrentId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: FactorData) => {
    form.reset({
      group: item.group,
      name: item.name,
      hiFactor: item.hiFactor,
      meaning: item.meaning,
      lowerBound: item.lowerBound,
      upperBound: item.upperBound,
      color: item.color
    });
    setCurrentId(item.id);
    setIsModalOpen(true);
  };

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    if (currentId) {
      // Edit existing item
      setData(data.map(item => 
        item.id === currentId ? { id: currentId, ...values } : item
      ));
      toast.success("รายการถูกอัปเดตเรียบร้อยแล้ว");
    } else {
      // Create new item with new ID
      const newId = Math.max(0, ...data.map(item => item.id)) + 1;
      setData([...data, { id: newId, ...values }]);
      toast.success("สร้างรายการใหม่เรียบร้อยแล้ว");
    }
    setIsModalOpen(false);
  };

  const openDeleteDialog = (id: number) => {
    setItemToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (itemToDelete) {
      setData(data.filter(item => item.id !== itemToDelete));
      toast.success("รายการถูกลบเรียบร้อยแล้ว");
      setIsDeleteDialogOpen(false);
    }
  };

  // Pagination
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">การจัดการ - คะแนน %Factor</h1>
          <Button 
            className="bg-blue-600 hover:bg-blue-700" 
            onClick={openCreateModal}
          >
            สร้างรายการใหม่
          </Button>
        </div>

        {/* Data Table */}
        <div className="rounded-md border shadow">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Group</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>HI Factor</TableHead>
                  <TableHead>Meaning</TableHead>
                  <TableHead>Lower Bound</TableHead>
                  <TableHead>Upper Bound</TableHead>
                  <TableHead>Color</TableHead>
                  <TableHead>จัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/50">
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.group}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.hiFactor}</TableCell>
                    <TableCell>{item.meaning}</TableCell>
                    <TableCell>{item.lowerBound}</TableCell>
                    <TableCell>{item.upperBound}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-6 h-6 rounded-md" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span>{item.color}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => openEditModal(item)}
                        >
                          <Edit className="h-4 w-4 text-blue-600" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => openDeleteDialog(item.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {paginatedData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-4">
                      ไม่พบข้อมูล
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="py-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        onClick={() => setCurrentPage(i + 1)}
                        isActive={currentPage === i + 1}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {currentId ? "แก้ไขข้อมูล" : "สร้างรายการใหม่"}
            </DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="group"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hiFactor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>HI Factor</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="meaning"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meaning</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="lowerBound"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lower Bound</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="upperBound"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upper Bound</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <input 
                        type="color" 
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="h-10 w-10 rounded-md border cursor-pointer"
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="pt-4">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  บันทึกข้อมูล
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ยืนยันการลบรายการ</AlertDialogTitle>
            <AlertDialogDescription>
              คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้? การกระทำนี้ไม่สามารถย้อนกลับได้
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete} 
              className="bg-red-600 hover:bg-red-700"
            >
              ลบ
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default ScorePercentageFactor;
