import React from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
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
import Pagination from '@/Components/Pagination';
import { Button } from "@/Components/ui/button";
import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

interface Transaction {
    id: string;
    product: {
        name: string;
        price: number;
        duration: string;
    };
    status: string;
    created_at: string;
    snap_token?: string;
}

interface Props {
    transactions: {
        data: Transaction[];
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
    };
}

export default function History({ transactions }: Props) {
    const { auth } = usePage().props;

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
            case 'pending':
                return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
            case 'failed':
                return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
            default:
                return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
        }
    };

    return (
        <>
            <Navbar user={auth.user} />
            <Head title="Purchase History" />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => router.visit(route('dashboard'))}
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                                <CardTitle className="text-2xl font-bold">Purchase History</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {transactions.data.length > 0 ? (
                                <>
                                    <div className="rounded-md border">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Transaction ID</TableHead>
                                                    <TableHead>Date</TableHead>
                                                    <TableHead>Plan</TableHead>
                                                    <TableHead>Duration</TableHead>
                                                    <TableHead>Amount</TableHead>
                                                    <TableHead>Status</TableHead>
                                                    <TableHead>Action</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {transactions.data.map((transaction) => (
                                                    <TableRow key={transaction.id}>
                                                        <TableCell className="font-mono text-sm">
                                                            {transaction.id}
                                                        </TableCell>
                                                        <TableCell>
                                                            {formatDate(transaction.created_at)}
                                                        </TableCell>
                                                        <TableCell className="font-medium">
                                                            {transaction.product.name}
                                                        </TableCell>
                                                        <TableCell>
                                                            {transaction.product.duration}
                                                        </TableCell>
                                                        <TableCell>
                                                            {formatPrice(transaction.product.price)}
                                                        </TableCell>
                                                        <TableCell>
                                                            {getStatusBadge(transaction.status)}
                                                        </TableCell>
                                                        <TableCell>
                                                            {transaction.status.toLowerCase() === 'pending' && (
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    asChild
                                                                >
                                                                    <Link href={route('checkout.checkout', transaction.id)}>
                                                                        Pay Now
                                                                    </Link>
                                                                </Button>
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                    <Pagination links={transactions.links} />
                                </>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 dark:text-gray-400">
                                        No purchase history found
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
