import { Head, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import { XCircle } from 'lucide-react';

interface FailedProps {
    transaction: {
        id: string;
        status: string;
        price: number;
        order_id: string;
    };
}

export default function Failed({ transaction }: FailedProps) {
    const { auth } = usePage().props
    return (
        <>
            <Head title="Payment Failed" />
            <div className="min-h-screen bg-gray-900 mt-16">
                <Navbar user={auth.user} />
                <div className="container mx-auto px-4 py-12">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="bg-gray-800 rounded-lg p-8">
                            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                            <h1 className="text-2xl font-bold text-white mb-4">
                                Payment Failed
                            </h1>
                            <p className="text-gray-300 mb-6">
                                Unfortunately, your payment could not be processed.
                            </p>
                            <div className="bg-gray-700 rounded p-4 mb-6">
                                <p className="text-gray-300">Order ID: {transaction.id}</p>
                                <p className="text-gray-300">
                                    Amount: Rp. {transaction.price.toLocaleString()}
                                </p>
                            </div>
                            <a
                                href="/premium"
                                className="inline-block px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700"
                            >
                                Try Again
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
} 