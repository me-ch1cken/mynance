'use client';

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useEffect, useState } from "react";
import { addTransaction, createCategory } from "@/db/actions";

interface Category {
    id: string;
    name: string;
}

interface Transaction {
    id: string;
    transactionType: string;
    amount: number;
    categoryId: string;
    categoryName: string;
}

interface User {
    id: string;
    name: string;
}

interface AddTransactionDialogProps {
    categories: Category[];
    selectedMonth: string;
    selectedYear: number;
    user: User;
    addTransactionToList: (transaction: Transaction) => void;
    addCategoryToList: (category: Category) => void
}

export function AddTransactionDialog({categories, selectedMonth, selectedYear, user, addTransactionToList, addCategoryToList}: AddTransactionDialogProps) {

    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedType, setSelectedType] = useState<string>('NEGATIVE');
    const [amount, setAmount] = useState<number>(0);

    const [newCategory, setNewCategory] = useState<string>('');

    const handleCreateCategory = async (name: string) => {
        const category = await createCategory(name, user.id);
        addCategoryToList(category);
        setNewCategory('');
    }

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
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    const addedTransaction = await addTransaction(selectedMonth, selectedYear, selectedCategory, selectedType, amount, user.id);
                    addTransactionToList(addedTransaction);
                }} className="flex flex-col space-y-4">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Kies een categorie" />
                        </SelectTrigger>
                        <SelectContent>
                            <div className="p-2">
                                <Input
                                    type="text"
                                    placeholder="Nieuwe categorie"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleCreateCategory(newCategory)}
                                />
                            </div>
                            {categories.map(category => (
                                <SelectItem key={category.id} value={category.id}>
                                    {category.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

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
                        
                        <Input 
                            type="number" 
                            placeholder="Bedrag" 
                            className="w-[80%]" 
                            value={amount} 
                            onFocus={(e) => e.target.select()}
                            min={0.01}
                            step={0.01}
                            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)} 
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" variant={'add'}>Voeg transactie toe</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}