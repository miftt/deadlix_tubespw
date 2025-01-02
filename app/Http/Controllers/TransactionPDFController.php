<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use PDF;

class TransactionPDFController extends Controller
{
    public function generatePDF($transactionId)
    {
        $transaction = Transaction::findOrFail($transactionId);

        $pdf = PDF::loadView('pdf.transaction', [
            'transaction' => $transaction
        ]);

        return $pdf->download('transaction-' . $transaction->id . '.pdf');
    }
}
