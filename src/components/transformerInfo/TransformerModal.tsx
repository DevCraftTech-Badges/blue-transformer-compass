
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel 
} from '@/components/ui/form';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface TransformerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  transformer: any | null;
}

const TransformerModal: React.FC<TransformerModalProps> = ({
  isOpen,
  onClose,
  onSave,
  transformer
}) => {
  const form = useForm({
    defaultValues: {
      equipmentNo: transformer?.equipmentNo || '',
      contractNo: transformer?.contractNo || '',
      station: transformer?.station || '',
      name: transformer?.name || '',
      manufacturer: transformer?.manufacturer || '',
      manufacturerNo: transformer?.manufacturerNo || '',
      phases: transformer?.phases || '3',
      phasePosition: transformer?.phasePosition || '',
      capacity: transformer?.capacity || '',
      primaryVoltage: transformer?.primaryVoltage || '',
      secondaryVoltage: transformer?.secondaryVoltage || '',
      tertiaryVoltage: transformer?.tertiaryVoltage || '',
      firstEnergized: transformer?.firstEnergized || null,
      windingInsulation: transformer?.windingInsulation || '',
      vectorGroup: transformer?.vectorGroup || '',
      usageType: transformer?.usageType || '',
      remarks: transformer?.remarks || '',
      // Bushing
      hvBushingManufacturer: transformer?.hvBushingManufacturer || '',
      hvBushingType: transformer?.hvBushingType || '',
      hvBushingYear: transformer?.hvBushingYear || '',
      hvBushingSerialNo: transformer?.hvBushingSerialNo || '',
      lvBushingManufacturer: transformer?.lvBushingManufacturer || '',
      lvBushingType: transformer?.lvBushingType || '',
      lvBushingYear: transformer?.lvBushingYear || '',
      lvBushingSerialNo: transformer?.lvBushingSerialNo || '',
      tvBushingManufacturer: transformer?.tvBushingManufacturer || '',
      tvBushingType: transformer?.tvBushingType || '',
      tvBushingYear: transformer?.tvBushingYear || '',
      tvBushingSerialNo: transformer?.tvBushingSerialNo || '',
      // Arrester
      hvArresterManufacturer: transformer?.hvArresterManufacturer || '',
      hvArresterType: transformer?.hvArresterType || '',
      hvArresterYear: transformer?.hvArresterYear || '',
      hvArresterSerialNo: transformer?.hvArresterSerialNo || '',
      hvArresterGap: transformer?.hvArresterGap || 'gap',
      lvArresterManufacturer: transformer?.lvArresterManufacturer || '',
      lvArresterType: transformer?.lvArresterType || '',
      lvArresterYear: transformer?.lvArresterYear || '',
      lvArresterSerialNo: transformer?.lvArresterSerialNo || '',
      lvArresterGap: transformer?.lvArresterGap || 'gap',
      tvArresterManufacturer: transformer?.tvArresterManufacturer || '',
      tvArresterType: transformer?.tvArresterType || '',
      tvArresterYear: transformer?.tvArresterYear || '',
      tvArresterSerialNo: transformer?.tvArresterSerialNo || '',
      tvArresterGap: transformer?.tvArresterGap || 'gap',
      // OLTC
      oltcManufacturer: transformer?.oltcManufacturer || '',
      oltcType: transformer?.oltcType || '',
      oltcYear: transformer?.oltcYear || '',
    },
  });

  const stations = ['สถานีไฟฟ้าบางกรวย', 'สถานีไฟฟ้าบางใหญ่', 'สถานีไฟฟ้านนทบุรี', 'สถานีไฟฟ้าไทรน้อย'];
  const manufacturers = ['ABB', 'Siemens', 'GE', 'Mitsubishi Electric', 'Hitachi'];
  const phases = ['1', '3'];
  const phasePositions = ['A', 'B', 'C', 'AB', 'BC', 'CA'];
  const windingInsulationTypes = ['Paper', 'Enamel', 'Nomex', 'Other'];
  const usageTypes = ['Step-up', 'Step-down', 'Distribution', 'Auto-transformer'];

  const onSubmit = (data: any) => {
    console.log('Form data:', data);
    onSave(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-5xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{transformer ? 'แก้ไขข้อมูลหม้อแปลงไฟฟ้า' : 'เพิ่มหม้อแปลงไฟฟ้า'}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* General Transformer Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-4">ข้อมูลทั่วไป</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="equipmentNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Equipment No.</FormLabel>
                      <FormControl>
                        <Input placeholder="ระบุหมายเลขอุปกรณ์" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="contractNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>สัญญาเลขที่</FormLabel>
                      <FormControl>
                        <Input placeholder="ระบุเลขที่สัญญา" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="station"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>สถานีไฟฟ้า</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกสถานีไฟฟ้า" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {stations.map((station) => (
                            <SelectItem key={station} value={station}>
                              {station}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ชื่อหม้อแปลงไฟฟ้า</FormLabel>
                      <FormControl>
                        <Input placeholder="ระบุชื่อหม้อแปลง" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="manufacturer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ชื่อบริษัทผู้ผลิต</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกบริษัทผู้ผลิต" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {manufacturers.map((manufacturer) => (
                            <SelectItem key={manufacturer} value={manufacturer}>
                              {manufacturer}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="manufacturerNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>หมายเลขผู้ผลิต</FormLabel>
                      <FormControl>
                        <Input placeholder="ระบุหมายเลขผู้ผลิต" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phases"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>จำนวนเฟส</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกจำนวนเฟส" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {phases.map((phase) => (
                            <SelectItem key={phase} value={phase}>
                              {phase}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phasePosition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ตำแหน่งเฟส</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกตำแหน่งเฟส" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {phasePositions.map((pos) => (
                            <SelectItem key={pos} value={pos}>
                              {pos}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="capacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>พิกัดกำลังไฟฟ้าสูงสุด (MVA)</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="ระบุพิกัดกำลัง" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="primaryVoltage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>พิกัดแรงดันไฟฟ้า Primary, HV (kV)</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="ระบุแรงดัน HV" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="secondaryVoltage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>พิกัดแรงดันไฟฟ้า Secondary, LV (kV)</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="ระบุแรงดัน LV" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="tertiaryVoltage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>พิกัดแรงดันไฟฟ้า Tertiary, TV (kV)</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="ระบุแรงดัน TV" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="firstEnergized"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>วันที่นำเข้าใช้งาน</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "dd/MM/yyyy")
                              ) : (
                                <span>เลือกวันที่</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="windingInsulation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ชนิด Winding Insulation</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกชนิด Insulation" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {windingInsulationTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="vectorGroup"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vector Group</FormLabel>
                      <FormControl>
                        <Input placeholder="ระบุ Vector Group" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="usageType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ลักษณะการใช้งานหม้อแปลงไฟฟ้า</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกลักษณะการใช้งาน" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {usageTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="remarks"
                  render={({ field }) => (
                    <FormItem className="md:col-span-3">
                      <FormLabel>รายละเอียดเพิ่มเติม (Remark)</FormLabel>
                      <FormControl>
                        <Input placeholder="ระบุรายละเอียดเพิ่มเติม" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormItem className="md:col-span-3">
                  <FormLabel>ชื่อไฟล์รูปภาพที่ต้องการเก็บ</FormLabel>
                  <Input type="file" accept="image/*" />
                </FormItem>
              </div>
            </div>
            
            {/* Bushing Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Bushing</h3>
              
              {/* HV Bushing */}
              <div className="mb-6">
                <h4 className="text-md font-medium mb-3 text-blue-700">HV Bushing</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <FormField
                    control={form.control}
                    name="hvBushingManufacturer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Manufacturer</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="เลือกผู้ผลิต" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {manufacturers.map((manufacturer) => (
                              <SelectItem key={manufacturer} value={manufacturer}>
                                {manufacturer}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="hvBushingType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                          <Input placeholder="ระบุประเภท" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="hvBushingYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ปีใน Nameplate</FormLabel>
                        <FormControl>
                          <Input placeholder="ระบุปี" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="hvBushingSerialNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Serial No.</FormLabel>
                        <FormControl>
                          <Input placeholder="ระบุหมายเลข Serial" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              {/* LV Bushing */}
              <div className="mb-6">
                <h4 className="text-md font-medium mb-3 text-blue-700">LV Bushing</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <FormField
                    control={form.control}
                    name="lvBushingManufacturer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Manufacturer</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="เลือกผู้ผลิต" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {manufacturers.map((manufacturer) => (
                              <SelectItem key={manufacturer} value={manufacturer}>
                                {manufacturer}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lvBushingType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                          <Input placeholder="ระบุประเภท" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lvBushingYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ปีใน Nameplate</FormLabel>
                        <FormControl>
                          <Input placeholder="ระบุปี" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lvBushingSerialNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Serial No.</FormLabel>
                        <FormControl>
                          <Input placeholder="ระบุหมายเลข Serial" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              {/* TV Bushing */}
              <div>
                <h4 className="text-md font-medium mb-3 text-blue-700">TV Bushing</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <FormField
                    control={form.control}
                    name="tvBushingManufacturer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Manufacturer</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="เลือกผู้ผลิต" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {manufacturers.map((manufacturer) => (
                              <SelectItem key={manufacturer} value={manufacturer}>
                                {manufacturer}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="tvBushingType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                          <Input placeholder="ระบุประเภท" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="tvBushingYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ปีใน Nameplate</FormLabel>
                        <FormControl>
                          <Input placeholder="ระบุปี" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="tvBushingSerialNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Serial No.</FormLabel>
                        <FormControl>
                          <Input placeholder="ระบุหมายเลข Serial" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            
            {/* Arrester Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Arrester</h3>
              
              {/* HV Arrester */}
              <div className="mb-6">
                <h4 className="text-md font-medium mb-3 text-blue-700">HV Arrester</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
                  <FormField
                    control={form.control}
                    name="hvArresterManufacturer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Manufacturer</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="เลือกผู้ผลิต" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {manufacturers.map((manufacturer) => (
                              <SelectItem key={manufacturer} value={manufacturer}>
                                {manufacturer}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="hvArresterType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                          <Input placeholder="ระบุประเภท" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="hvArresterYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ปีใน Nameplate</FormLabel>
                        <FormControl>
                          <Input placeholder="ระบุปี" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="hvArresterSerialNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Serial No.</FormLabel>
                        <FormControl>
                          <Input placeholder="ระบุหมายเลข Serial" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="hvArresterGap"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Gap/Gapless</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="gap" id="hvGap" />
                            <FormLabel htmlFor="hvGap" className="cursor-pointer">Gap</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="gapless" id="hvGapless" />
                            <FormLabel htmlFor="hvGapless" className="cursor-pointer">Gapless</FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              {/* LV Arrester */}
              <div className="mb-6">
                <h4 className="text-md font-medium mb-3 text-blue-700">LV Arrester</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
                  <FormField
                    control={form.control}
                    name="lvArresterManufacturer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Manufacturer</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="เลือกผู้ผลิต" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {manufacturers.map((manufacturer) => (
                              <SelectItem key={manufacturer} value={manufacturer}>
                                {manufacturer}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lvArresterType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                          <Input placeholder="ระบุประเภท" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lvArresterYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ปีใน Nameplate</FormLabel>
                        <FormControl>
                          <Input placeholder="ระบุปี" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lvArresterSerialNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Serial No.</FormLabel>
                        <FormControl>
                          <Input placeholder="ระบุหมายเลข Serial" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="lvArresterGap"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Gap/Gapless</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="gap" id="lvGap" />
                            <FormLabel htmlFor="lvGap" className="cursor-pointer">Gap</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="gapless" id="lvGapless" />
                            <FormLabel htmlFor="lvGapless" className="cursor-pointer">Gapless</FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              {/* TV Arrester */}
              <div>
                <h4 className="text-md font-medium mb-3 text-blue-700">TV Arrester</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
                  <FormField
                    control={form.control}
                    name="tvArresterManufacturer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Manufacturer</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="เลือกผู้ผลิต" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {manufacturers.map((manufacturer) => (
                              <SelectItem key={manufacturer} value={manufacturer}>
                                {manufacturer}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="tvArresterType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                          <Input placeholder="ระบุประเภท" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="tvArresterYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ปีใน Nameplate</FormLabel>
                        <FormControl>
                          <Input placeholder="ระบุปี" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="tvArresterSerialNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Serial No.</FormLabel>
                        <FormControl>
                          <Input placeholder="ระบุหมายเลข Serial" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="tvArresterGap"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Gap/Gapless</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="gap" id="tvGap" />
                            <FormLabel htmlFor="tvGap" className="cursor-pointer">Gap</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="gapless" id="tvGapless" />
                            <FormLabel htmlFor="tvGapless" className="cursor-pointer">Gapless</FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            {/* OLTC Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-4">OLTC</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="oltcManufacturer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Manufacturer</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกผู้ผลิต" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {manufacturers.map((manufacturer) => (
                            <SelectItem key={manufacturer} value={manufacturer}>
                              {manufacturer}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="oltcType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <Input placeholder="ระบุประเภท" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="oltcYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ปีใน Nameplate</FormLabel>
                      <FormControl>
                        <Input placeholder="ระบุปี" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <DialogFooter className="pt-4 px-2">
              <Button type="button" variant="outline" onClick={onClose}>
                ยกเลิก
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                บันทึกข้อมูล
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TransformerModal;
