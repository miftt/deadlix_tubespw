<!DOCTYPE html>
<html>
<head>
    <title>Transaction Receipt</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        .container {
            padding: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .transaction-details {
            margin-bottom: 20px;
        }
        .transaction-item {
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Transaction Receipt</h1>
        </div>
        
        <div class="transaction-details">
            <div class="transaction-item">
                <strong>Transaction ID:</strong> {{ $transaction->id }}
            </div>
            <div class="transaction-item">
                <strong>Date:</strong> {{ $transaction->created_at->format('d M Y H:i') }}
            </div>
            <div class="transaction-item">
                <strong>Amount:</strong> Rp. {{ number_format($transaction->price) }}
            </div>
            <div class="transaction-item">
                <strong>Status:</strong> {{ $transaction->status }}
            </div>
        </div>
    </div>
</body>
</html> 