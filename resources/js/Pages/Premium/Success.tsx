import { Head, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import { CheckCircle, Download } from 'lucide-react';
import { Button } from '@/Components/ui/button';

interface SuccessProps {
    transaction: {
        id: string;
        status: string;
        price: number;
        order_id: string;
    };
}

export default function Success({ transaction }: SuccessProps) {
    const { auth } = usePage().props

    const handleDownloadPDF = () => {
        // Menggunakan window.open untuk membuka endpoint PDF dalam tab baru
        window.open(`/transaction/${transaction.id}/pdf`, '_blank');
    };

    return (
        <>
            <Head title="Payment Success" />
            <div className="min-h-screen bg-gray-900 mt-16">
                <Navbar user={auth.user} />
                <div className="container mx-auto px-4 py-12">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="bg-gray-800 rounded-lg p-8">
                            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                            <h1 className="text-2xl font-bold text-white mb-4">
                                Payment Successful!
                            </h1>
                            <p className="text-gray-300 mb-6">
                                Your transaction has been completed successfully.
                            </p>
                            <div className="bg-gray-700 rounded p-4 mb-6">
                                <p className="text-gray-300">Order ID: {transaction.id}</p>
                                <p className="text-gray-300">
                                    Amount: Rp. {transaction.price.toLocaleString()}
                                </p>
                            </div>

                            {/* Tombol Download PDF */}
                            <Button
                                onClick={handleDownloadPDF}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Download Receipt PDF
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
} 