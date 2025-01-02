import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Badge } from "@/Components/ui/badge";
import { formatDate } from '@/lib/utils';
import Pagination from '@/Components/Pagination';

interface Transaction {
    id: number;
    user: {
        name: string;
        email: string;
    };
    product_id: number;
    price: string | number;
    status: 'pending' | 'success' | 'failed';
    created_at: string;
}

interface Props {
    transactions: {
        data: Transaction[];
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        current_page: number;
        last_page: number;
        from: number;
        to: number;
        total: number;
    };
    auth: {
        user: any;
    };
}

export default function Index({ transactions, auth }: Props) {
    const getStatusBadgeColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'success':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'failed':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    const formatAmount = (amount: string | number | undefined) => {
        if (!amount) return 'Rp 0';
        const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
        return `Rp ${numericAmount.toLocaleString('id-ID')}`;
    };

    const getPremiumType = (productId: number) => {
        switch (productId) {
            case 1:
                return 'Monthly Premium';
            case 2:
                return 'Yearly Premium';
            default:
                return 'Unknown';
        }
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Transactions" />

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Transactions</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Showing {transactions.from} to {transactions.to} of {transactions.total} transactions
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Premium Type</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions.data.map((transaction) => (
                                    <TableRow key={transaction.id}>
                                        <TableCell>
                                            <div>
                                                <div className="font-medium">{transaction.user.name}</div>
                                                <div className="text-sm text-gray-500">{transaction.user.email}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{formatAmount(transaction.price)}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">
                                                {getPremiumType(transaction.product_id)}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                className={getStatusBadgeColor(transaction.status)}
                                                variant="outline"
                                            >
                                                {transaction.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{formatDate(transaction.created_at)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <Pagination links={transactions.links} />
                </CardContent>
            </Card>
        </AdminLayout>
    );
} 