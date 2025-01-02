<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Transaction;
use App\Models\UserSubscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Str;

class PremiumController extends Controller
{
    public function index()
    {
        $products = Product::all()->map(function ($product) {
            // Memastikan features adalah array
            $product->features = is_array($product->features) ? $product->features : json_decode($product->features, true);
            return $product;
        });

        return Inertia::render('Premium/Premium', [
            'products' => $products
        ]);
    }

    public function process(Request $request)
    {
        $data = $request->all();
        $user = Auth::user();

        // Generate UUID untuk transaksi
        $transactionId = Str::uuid()->toString();

        $transaction = Transaction::create([
            'id' => $transactionId, // Tambahkan ID UUID
            'user_id' => $user->id,
            'product_id' => $data['product_id'],
            'price' => $data['price'],
            'status' => 'pending',
        ]);

        // Set your Merchant Server Key
        \Midtrans\Config::$serverKey = config('midtrans.serverKey');
        \Midtrans\Config::$isProduction = false;
        \Midtrans\Config::$isSanitized = true;
        \Midtrans\Config::$is3ds = true;

        $params = array(
            'transaction_details' => array(
                'order_id' => $transactionId, // Gunakan UUID sebagai order_id
                'gross_amount' => $data['price'],
            ),
            'customer_details' => array(
                'first_name' => $user->name,
                'email' => $user->email,
            ),
        );

        $snapToken = \Midtrans\Snap::getSnapToken($params);

        $transaction->snap_token = $snapToken;
        $transaction->save();

        return response()->json([
            'id' => $transaction->id,
            'snap_token' => $snapToken
        ]);
    }

    public function checkout($id)
    {
        // Find transaction or abort 404
        $transaction = Transaction::findOrFail($id);

        // Find product or abort 404
        $product = Product::findOrFail($transaction->product_id);

        if ($transaction->user_id !== auth()->id()) {
            abort(404);
        }

        // Ubah logika pengecekan status
        if ($transaction->status === 'completed') {
            return redirect()->route('premium.success', ['id' => $transaction->id]);
        } else if ($transaction->status === 'failed') {
            return redirect()->route('premium.failed', ['id' => $transaction]);
        }

        // Jika status failed, buat transaksi baru
        if ($transaction->status === 'failed') {
            // Buat transaksi baru dengan data yang sama
            $newTransaction = Transaction::create([
                'id' => Str::uuid()->toString(),
                'user_id' => $transaction->user_id,
                'product_id' => $transaction->product_id,
                'price' => $transaction->price,
                'status' => 'pending',
            ]);

            // Set Midtrans configuration
            \Midtrans\Config::$serverKey = config('midtrans.serverKey');
            \Midtrans\Config::$isProduction = false;
            \Midtrans\Config::$isSanitized = true;
            \Midtrans\Config::$is3ds = true;

            $params = array(
                'transaction_details' => array(
                    'order_id' => $newTransaction->id,
                    'gross_amount' => $newTransaction->price,
                ),
                'customer_details' => array(
                    'first_name' => auth()->user()->name,
                    'email' => auth()->user()->email,
                ),
            );

            $snapToken = \Midtrans\Snap::getSnapToken($params);
            $newTransaction->snap_token = $snapToken;
            $newTransaction->save();

            // Redirect ke checkout dengan transaksi baru
            return redirect()->route('checkout.checkout', ['id' => $newTransaction->id]);
        }

        return Inertia::render('Premium/Checkout', [
            'transaction' => $transaction,
            'clientKey' => config('midtrans.clientKey'),
            'plan' => [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'duration' => $product->duration,
                'features' => $product->features
            ]
        ]);
    }

    public function success($id)
    {
        $transaction = Transaction::findOrFail($id);

        if ($transaction->status !== 'completed') {
            return redirect()->route('checkout.checkout', ['id' => $transaction->id]);
        }

        return Inertia::render('Premium/Success', [
            'transaction' => $transaction
        ]);
    }

    public function failed($id)
    {
        $transaction = Transaction::findOrFail($id);

        // Ubah logika pengecekan status
        if (!in_array($transaction->status, ['failed', 'canceled', 'expired'])) {
            return redirect()->route('checkout.checkout', ['id' => $transaction->id]);
        }

        return Inertia::render('Premium/Failed', [
            'transaction' => $transaction
        ]);
    }

    public function updateTransaction(Request $request, $id)
    {
        $transaction = Transaction::findOrFail($id);

        $changedStatus = $request->transaction_status;

        if ($changedStatus == 'settlement') {
            $changedStatus = 'completed';
            // Panggil handleSuccessfulPayment saat status settlement
            $this->handleSuccessfulPayment($transaction);
        } else if (in_array($changedStatus, ['cancel', 'expire', 'deny'])) {
            $changedStatus = 'failed';
            // Panggil handleFailedPayment saat status gagal
            $this->handleFailedPayment($transaction);
        }

        $transaction->update([
            'status' => $changedStatus,
            'order_id' => $request->order_id ?? null
        ]);

        return response()->json(['message' => 'Transaction updated successfully']);
    }

    public function handleSuccessfulPayment($transaction)
    {
        $product = $transaction->product;

        // Calculate subscription duration based on product  
        $startsAt = now();
        $expiresAt = $this->getDurationFromProduct($product);

        // Create or update subscription  
        UserSubscription::updateOrCreate(
            ['user_id' => $transaction->user_id],
            [
                'product_id' => $product->id,
                'starts_at' => $startsAt,
                'expires_at' => $expiresAt,
                'status' => 'active'
            ]
        );

        // Log successful subscription  
        Log::info('Subscription created/updated for user: ' . $transaction->user_id, [
            'transaction_id' => $transaction->id,
            'product_id' => $product->id,
            'starts_at' => $startsAt,
            'expires_at' => $expiresAt
        ]);
    }

    private function getDurationFromProduct($product)
    {
        // Parsing durasi dari product  
        $duration = $product->duration;
        Log::info('Product Duration: ' . $duration);

        // Ekstrak angka dan satuan  
        preg_match('/(\d+)\s*(month|year)/i', $duration, $matches);

        if (!empty($matches)) {
            $value = (int)$matches[1];
            $unit = strtolower($matches[2]);

            switch ($unit) {
                case 'month':
                    return now()->addMonths($value);
                case 'year':
                    return now()->addYears($value);
                default:
                    return now()->addMonth(); // default to 1 month  
            }
        }

        // Fallback ke default 1 bulan jika parsing gagal  
        Log::warning('Invalid duration format, defaulting to 1 month: ' . $duration);
        return now()->addMonth();
    }

    public function handleFailedPayment($transaction)
    {
        // Check if user has existing subscription
        $existingSubscription = UserSubscription::where('user_id', $transaction->user_id)->first();

        // If there's an existing subscription that's expired, update its status
        if ($existingSubscription && $existingSubscription->expires_at < now()) {
            $existingSubscription->update([
                'status' => 'expired'
            ]);
        }

        // Log the failed transaction
        Log::info('Payment failed for transaction: ' . $transaction->id, [
            'user_id' => $transaction->user_id,
            'product_id' => $transaction->product_id,
            'amount' => $transaction->price
        ]);
    }
}
