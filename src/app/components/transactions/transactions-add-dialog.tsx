'use client';

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useEffect, useState } from "react";

interface Category {
    id: string;
    name: string;
}

interface AddTransactionDialogProps {
    categories: Category[];
}

export function AddTransactionDialog({categories}: AddTransactionDialogProps) {

    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedType, setSelectedType] = useState<string>('NEGATIVE');

    useEffect(() => {
        setSelectedCategory(categories[0]?.id);
    }, [categories]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'add'}><Plus />Voeg transactie toe</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Voeg transactie toe</DialogTitle>
                    <DialogDescription>
                        Voeg een of meerdere transacties toe, dit dialoogvenster blijft open.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col space-y-4">
                    {/* Eerste Select met 100% breedte */}
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Kies een categorie" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map(category => (
                                <SelectItem key={category.id} value={category.id}>
                                    {category.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* De tweede Select en Input op dezelfde lijn */}
                    <div className="flex space-x-4">
                        <Select value={selectedType} onValueChange={setSelectedType}>
                            <SelectTrigger className="w-[20%]">
                                <SelectValue placeholder="Kies een type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="POSITIVE">+</SelectItem>
                                <SelectItem value="NEGATIVE">-</SelectItem>
                            </SelectContent>
                        </Select>
                        
                        <Input type="number" placeholder="Bedrag" className="w-[80%]" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" variant={'add'}>Voeg transactie toe</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}