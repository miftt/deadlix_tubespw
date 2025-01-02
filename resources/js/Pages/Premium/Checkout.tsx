import { Head, usePage, router } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import { Lock } from 'lucide-react';
import { Midtrans } from '@/types';
import axios from 'axios';

interface TransactionType {
    id: number;
    user_id: number;
    product_id: number;
    price: number;
    status: string;
    snap_token: string;
}

interface PremiumCheckoutProps {
    transaction: TransactionType;
    plan: {
        id: number;
        name: string;
        price: number;
        duration: string;
        features: string[];
    };
}

export default function Checkout({ transaction, plan }: PremiumCheckoutProps) {
    const midtrans = usePage().props.midtrans as Midtrans;
    const auth = usePage().props.auth;
    console.log(midtrans);
    // Fungsi untuk menampilkan Snap Midtrans
    const showPaymentModal = () => {
        // @ts-ignore
        window.snap.pay(transaction.snap_token, {
            onSuccess: async function (result: any) {
                try {
                    await axios.post(`/premium/transaction/${transaction.id}`, {
                        order_id: result.order_id,
                        transaction_status: result.transaction_status
                    });
                    router.visit(`/premium/success/${transaction.id}`);
                } catch (error) {
                    console.error('Error updating transaction:', error);
                }
            },
            onPending: function (result: any) {
                console.log('pending transaction', result);
            },
            onError: async function (result: any) {
                try {
                    await axios.post(`/premium/transaction/${transaction.id}`, {
                        order_id: result.order_id,
                        transaction_status: result.transaction_status
                    });
                    router.visit(`/premium/failed/${transaction.id}`);
                } catch (error) {
                    console.error('Error updating transaction:', error);
                }
            }
        });
    };

    return (
        <>
            <Head title="Premium Checkout">
                <script
                    src="https://app.sandbox.midtrans.com/snap/snap.js"
                    data-client-key={midtrans.clientKey}
                ></script>
            </Head>
            <div className="min-h-screen bg-gray-900 mt-16">
                <Navbar user={auth.user} />

                <div className="container mx-auto px-4 py-12">
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-gray-800 rounded-lg p-8">
                            <div className="flex items-center justify-between mb-8">
                                <h1 className="text-2xl font-bold text-white">
                                    Checkout: {plan.name}
                                </h1>
                                <div className="text-right">
                                    <p className="text-gray-400">Total Amount</p>
                                    <p className="text-2xl font-bold text-white">
                                        Rp. {transaction.price.toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h2 className="text-xl font-semibold text-white mb-4">
                                    Plan Details
                                </h2>
                                <div className="bg-gray-700 rounded-lg p-4">
                                    <p className="text-gray-300 mb-2">
                                        Duration: {plan.duration}
                                    </p>
                                    <ul className="space-y-2">
                                        {plan.features.map((feature, index) => (
                                            <li
                                                key={index}
                                                className="text-gray-300 flex items-center gap-2"
                                            >
                                                <span className="text-green-500">✓</span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-6">
                                <p className="text-sm text-gray-400 flex items-center">
                                    <Lock className="h-4 w-4 mr-1" />
                                    Secure payment with Midtrans
                                </p>
                                <button
                                    onClick={showPaymentModal}
                                    className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700"
                                >
                                    Pay now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
} 